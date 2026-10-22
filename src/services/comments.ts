/**
 * Comments Service
 * Supports Firestore collection 'projectComments' and 'commentReports'.
 * Complies with strict error handling specifications.
 */

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  limit,
} from 'firebase/firestore';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType } from '../lib/firebase';
import { safeLocalStorage } from '../utils/storage';

export interface ProjectComment {
  id: string;
  projectId: string;
  userId: string;
  displayName: string;
  photoURL?: string;
  body: string;
  parentId?: string | null;
  createdAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

const LOCAL_COMMENTS_KEY = 'gizmo_portfolio_comments_store';

const initialSampleComments: ProjectComment[] = [
  {
    id: 'sample-comm-1',
    projectId: 'autonomous-indoor-rover',
    userId: 'user-sample-1',
    displayName: 'Alex Carter',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    body: 'The FreeRTOS task partition between the 100Hz PID loop and DMA LiDAR packet parsing is really clean. Did you evaluate CAN bus for motor controller communications?',
    parentId: null,
    createdAt: Date.now() - 86400000 * 3,
    status: 'approved',
  },
  {
    id: 'sample-comm-2',
    projectId: 'autonomous-indoor-rover',
    userId: 'user-sample-author',
    displayName: 'Senithu Sethmin (Creator)',
    photoURL: '',
    body: 'Thanks Alex! For the current iteration, UART with DMA buffers met our throughput needs without adding CAN transceiver ICs, but CAN or CAN-FD is definitely on the roadmap for our next multi-axis version.',
    parentId: 'sample-comm-1',
    createdAt: Date.now() - 86400000 * 2,
    status: 'approved',
  },
  {
    id: 'sample-comm-3',
    projectId: 'high-efficiency-synchronous-buck-converter',
    userId: 'user-sample-2',
    displayName: 'Priya Sharma',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    body: 'Impressive efficiency curve (>94% at 8A). How did you optimize the gate loop PCB inductance to suppress the switch node ringing before placing the RC snubber?',
    parentId: null,
    createdAt: Date.now() - 86400000 * 5,
    status: 'approved',
  },
];

function getLocalComments(): ProjectComment[] {
  try {
    const raw = safeLocalStorage.getItem(LOCAL_COMMENTS_KEY);
    if (!raw) {
      safeLocalStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(initialSampleComments));
      return initialSampleComments;
    }
    return JSON.parse(raw);
  } catch {
    return initialSampleComments;
  }
}

function saveLocalComments(comments: ProjectComment[]) {
  try {
    safeLocalStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(comments));
  } catch (e) {
    console.error('Failed to save comments locally:', e);
  }
}

export async function fetchProjectComments(
  projectId: string,
  includePendingForUserId?: string
): Promise<ProjectComment[]> {
  const path = 'projectComments';
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, path);
      const q = query(
        colRef,
        where('projectId', '==', projectId),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'asc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      const list: ProjectComment[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          projectId: d.projectId,
          userId: d.userId,
          displayName: d.displayName,
          photoURL: d.photoURL,
          body: d.body,
          parentId: d.parentId || null,
          createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now(),
          status: d.status,
        };
      });

      if (includePendingForUserId) {
        const userQ = query(
          colRef,
          where('projectId', '==', projectId),
          where('userId', '==', includePendingForUserId),
          where('status', '==', 'pending'),
          limit(10)
        );
        const userSnap = await getDocs(userQ);
        userSnap.docs.forEach((docSnap) => {
          const d = docSnap.data();
          if (!list.some((c) => c.id === docSnap.id)) {
            list.push({
              id: docSnap.id,
              projectId: d.projectId,
              userId: d.userId,
              displayName: d.displayName,
              photoURL: d.photoURL,
              body: d.body,
              parentId: d.parentId || null,
              createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now(),
              status: d.status,
            });
          }
        });
      }
      return list;
    } catch (err: unknown) {
      console.warn('Firestore fetch query caught:', err);
      // If permission error, use handleFirestoreError, else fall back to local store
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
    }
  }

  // Fallback
  const all = getLocalComments();
  return all.filter(
    (c) =>
      c.projectId === projectId &&
      (c.status === 'approved' || (includePendingForUserId && c.userId === includePendingForUserId))
  );
}

export async function addProjectComment(params: {
  projectId: string;
  userId: string;
  displayName: string;
  photoURL?: string;
  body: string;
  parentId?: string | null;
}): Promise<ProjectComment> {
  const path = 'projectComments';
  const sanitizedBody = params.body.trim();
  if (!sanitizedBody || sanitizedBody.length < 3) {
    throw new Error('Comment must be at least 3 characters long.');
  }
  if (sanitizedBody.length > 1000) {
    throw new Error('Comment exceeds 1000 character limit.');
  }

  const newComment: ProjectComment = {
    id: 'comm-' + Math.random().toString(36).substring(2, 9),
    projectId: params.projectId,
    userId: params.userId,
    displayName: params.displayName || 'Anonymous Engineer',
    photoURL: params.photoURL || '',
    body: sanitizedBody,
    parentId: params.parentId || null,
    createdAt: Date.now(),
    status: 'pending',
  };

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, path);
      const docRef = await addDoc(colRef, {
        projectId: newComment.projectId,
        userId: newComment.userId,
        displayName: newComment.displayName,
        photoURL: newComment.photoURL || null,
        body: newComment.body,
        parentId: newComment.parentId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending',
      });
      newComment.id = docRef.id;
      return newComment;
    } catch (err: unknown) {
      console.warn('Firestore addDoc write caught:', err);
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }
  }

  const current = getLocalComments();
  current.push(newComment);
  saveLocalComments(current);
  return newComment;
}

export async function deleteProjectComment(commentId: string, currentUserId: string): Promise<void> {
  const path = `projectComments/${commentId}`;
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projectComments', commentId);
      await deleteDoc(docRef);
      return;
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.DELETE, path);
      }
    }
  }

  const current = getLocalComments();
  const filtered = current.filter((c) => !(c.id === commentId && c.userId === currentUserId));
  saveLocalComments(filtered);
}

export async function reportComment(commentId: string, reporterId: string, reason: string): Promise<void> {
  const path = 'commentReports';
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, path);
      await addDoc(colRef, {
        commentId,
        reporterId,
        reason: reason.trim(),
        createdAt: serverTimestamp(),
      });
      return;
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }
  }

  console.info(`[Report Recorded Locally] Comment ID: ${commentId}, Reason: ${reason}`);
}
