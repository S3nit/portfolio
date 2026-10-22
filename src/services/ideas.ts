/**
 * Project Ideas Service
 * Stores collaborative community proposals in 'projectIdeas' collection.
 * Includes standardized Firestore error handling.
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

export interface ProjectIdea {
  id: string;
  projectId: string;
  userId: string;
  displayName: string;
  photoURL?: string;
  title: string;
  body: string;
  createdAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

const LOCAL_IDEAS_KEY = 'gizmo_portfolio_ideas_store';

const initialSampleIdeas: ProjectIdea[] = [
  {
    id: 'idea-sample-1',
    projectId: 'autonomous-indoor-rover',
    userId: 'user-sample-3',
    displayName: 'Marcus Chen',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    title: 'Suggestion: Add UWB Anchor support for GPS-denied absolute localization',
    body: 'Integrating 3x Decawave DWM1000 Ultra-Wideband modules would provide centimeter-level absolute positioning to complement wheel odometry and reduce SLAM drift during long corridor transits.',
    createdAt: Date.now() - 86400000 * 4,
    status: 'approved',
  },
  {
    id: 'idea-sample-2',
    projectId: 'dual-axis-solar-tracker',
    userId: 'user-sample-4',
    displayName: 'Elena Rostova',
    photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    title: 'Rain Wash Mode using tilt angles',
    body: 'During rainstorms detected by an optical rain sensor, pitch the solar panel to 60 degrees to allow rainwater runoff to naturally wash dust off the glass face without manual maintenance.',
    createdAt: Date.now() - 86400000 * 6,
    status: 'approved',
  },
];

function getLocalIdeas(): ProjectIdea[] {
  try {
    const raw = safeLocalStorage.getItem(LOCAL_IDEAS_KEY);
    if (!raw) {
      safeLocalStorage.setItem(LOCAL_IDEAS_KEY, JSON.stringify(initialSampleIdeas));
      return initialSampleIdeas;
    }
    return JSON.parse(raw);
  } catch {
    return initialSampleIdeas;
  }
}

function saveLocalIdeas(ideas: ProjectIdea[]) {
  try {
    safeLocalStorage.setItem(LOCAL_IDEAS_KEY, JSON.stringify(ideas));
  } catch (e) {
    console.error('Failed to save ideas locally:', e);
  }
}

export async function fetchProjectIdeas(
  projectId: string,
  includePendingForUserId?: string
): Promise<ProjectIdea[]> {
  const path = 'projectIdeas';
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, path);
      const q = query(
        colRef,
        where('projectId', '==', projectId),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        limit(30)
      );
      const snapshot = await getDocs(q);
      const list: ProjectIdea[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          projectId: d.projectId,
          userId: d.userId,
          displayName: d.displayName,
          photoURL: d.photoURL,
          title: d.title,
          body: d.body,
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
          if (!list.some((i) => i.id === docSnap.id)) {
            list.push({
              id: docSnap.id,
              projectId: d.projectId,
              userId: d.userId,
              displayName: d.displayName,
              photoURL: d.photoURL,
              title: d.title,
              body: d.body,
              createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now(),
              status: d.status,
            });
          }
        });
      }
      return list;
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
    }
  }

  const all = getLocalIdeas();
  return all.filter(
    (item) =>
      item.projectId === projectId &&
      (item.status === 'approved' || (includePendingForUserId && item.userId === includePendingForUserId))
  );
}

export async function addProjectIdea(params: {
  projectId: string;
  userId: string;
  displayName: string;
  photoURL?: string;
  title: string;
  body: string;
}): Promise<ProjectIdea> {
  const path = 'projectIdeas';
  const sanitizedTitle = params.title.trim();
  const sanitizedBody = params.body.trim();

  if (!sanitizedTitle || sanitizedTitle.length < 5) {
    throw new Error('Title must be at least 5 characters.');
  }
  if (!sanitizedBody || sanitizedBody.length < 10) {
    throw new Error('Idea details must be at least 10 characters.');
  }

  const newIdea: ProjectIdea = {
    id: 'idea-' + Math.random().toString(36).substring(2, 9),
    projectId: params.projectId,
    userId: params.userId,
    displayName: params.displayName || 'Contributor',
    photoURL: params.photoURL || '',
    title: sanitizedTitle,
    body: sanitizedBody,
    createdAt: Date.now(),
    status: 'pending',
  };

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, path);
      const docRef = await addDoc(colRef, {
        projectId: newIdea.projectId,
        userId: newIdea.userId,
        displayName: newIdea.displayName,
        photoURL: newIdea.photoURL || null,
        title: newIdea.title,
        body: newIdea.body,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      newIdea.id = docRef.id;
      return newIdea;
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }
  }

  const current = getLocalIdeas();
  current.unshift(newIdea);
  saveLocalIdeas(current);
  return newIdea;
}

export async function deleteProjectIdea(ideaId: string, currentUserId: string): Promise<void> {
  const path = `projectIdeas/${ideaId}`;
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projectIdeas', ideaId);
      await deleteDoc(docRef);
      return;
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes('permission-denied') || errMessage.includes('Missing or insufficient permissions')) {
        handleFirestoreError(err, OperationType.DELETE, path);
      }
    }
  }

  const current = getLocalIdeas();
  const filtered = current.filter((i) => !(i.id === ideaId && i.userId === currentUserId));
  saveLocalIdeas(filtered);
}
