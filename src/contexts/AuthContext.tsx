/**
 * Authentication Context
 * Supports real Google Sign-In with Firebase Auth and a seamless local demo mode.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  fbSignOut,
  onAuthStateChanged,
  isFirebaseConfigured,
  type User,
} from '../lib/firebase';
import { safeLocalStorage } from '../utils/storage';

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isDemoUser?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isFirebaseReady: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInDemoUser: (name?: string) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'gizmo_portfolio_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      try {
        const unsubscribe = onAuthStateChanged(
          auth,
          (fbUser: User | null) => {
            if (fbUser) {
              setUser({
                uid: fbUser.uid,
                displayName: fbUser.displayName || 'Engineering Explorer',
                email: fbUser.email,
                photoURL: fbUser.photoURL,
                isDemoUser: false,
              });
            } else {
              setUser(null);
            }
            setLoading(false);
          },
          (authErr) => {
            console.warn('Auth state change warning:', authErr);
            setError(authErr.message);
            setLoading(false);
          }
        );
        return () => unsubscribe();
      } catch (err) {
        console.warn('onAuthStateChanged setup warning:', err);
        setLoading(false);
      }
    } else {
      // Check for saved simulated demo user
      const savedDemo = safeLocalStorage.getItem(DEMO_USER_KEY);
      if (savedDemo) {
        try {
          setUser(JSON.parse(savedDemo));
        } catch {
          safeLocalStorage.removeItem(DEMO_USER_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      signInDemoUser();
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      console.warn('Popup sign in failed, attempting redirect if appropriate:', errorObj);
      if (
        errorObj.code === 'auth/popup-blocked' ||
        errorObj.code === 'auth/popup-closed-by-user' ||
        (typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr: unknown) {
          const rErr = redirectErr as { message?: string };
          setError(rErr.message || 'Authentication error. Please try again.');
        }
      } else {
        setError(errorObj.message || 'Sign in with Google failed.');
      }
    }
  };

  const signInDemoUser = (name = 'Guest Engineer') => {
    const demoUser: AppUser = {
      uid: 'demo-user-' + Math.random().toString(36).substring(2, 9),
      displayName: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      isDemoUser: true,
    };
    setUser(demoUser);
    safeLocalStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
  };

  const signOut = async () => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (err: unknown) {
        const errorObj = err as { message?: string };
        setError(errorObj.message || 'Sign out failed.');
      }
    } else {
      safeLocalStorage.removeItem(DEMO_USER_KEY);
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseReady: isFirebaseConfigured,
        error,
        signInWithGoogle,
        signOut,
        signInDemoUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
