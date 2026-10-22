/**
 * Firebase Client Initialization
 * Fully guarded against sandbox/iframe restrictions and storage partitioning.
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  type Auth,
  type User,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  doc,
  getDocFromServer,
  type Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const currentAuth = auth;
  const currentUser = currentAuth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo:
        currentUser?.providerData?.map((p) => ({
          providerId: p.providerId,
          email: p.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'AIzaSyExampleKey'
);

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // Initialize Firestore with auto-detect long polling
    try {
      dbInstance = initializeFirestore(
        appInstance,
        {
          experimentalAutoDetectLongPolling: true,
        },
        firebaseConfig.firestoreDatabaseId
      );
    } catch {
      // If already initialized, get existing instance
      dbInstance = getFirestore(appInstance, firebaseConfig.firestoreDatabaseId);
    }

    // Initialize Auth
    try {
      authInstance = getAuth(appInstance);
      googleProviderInstance = new GoogleAuthProvider();
      googleProviderInstance.setCustomParameters({ prompt: 'select_account' });

      // Attempt local persistence safely
      setPersistence(authInstance, browserLocalPersistence).catch((err) => {
        console.warn('Firebase persistence warning:', err);
      });
    } catch (authErr) {
      console.warn('Firebase Auth initialization warning:', authErr);
    }
  } catch (error) {
    console.error('Firebase initialization error caught:', error);
  }
}

export const app = appInstance;
export const db = dbInstance;
export const auth = authInstance;
export const googleProvider = googleProviderInstance;

// Test connection safely after slight delay so app renders first
if (typeof window !== 'undefined' && dbInstance) {
  setTimeout(async () => {
    try {
      if (dbInstance) {
        await getDocFromServer(doc(dbInstance, 'test', 'connection'));
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.info('Firestore initial offline notice (will sync automatically).');
      }
    }
  }, 1000);
}

export { fbSignOut, signInWithPopup, signInWithRedirect, onAuthStateChanged };
export type { User };
