/**
 * Authentication Modal
 * Appears when an unauthenticated visitor attempts to post a comment, reply, or idea.
 * Supports Google Sign-In and instant Guest Demo sign-in for preview testing.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GizmoAvatar } from '../gizmo/GizmoAvatar';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  reason = 'Join the engineering discussion and share suggestions.',
}) => {
  const { signInWithGoogle, signInDemoUser, isFirebaseReady, error, clearError } = useAuth();
  const [guestName, setGuestName] = useState('');
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch {
      // Handled in context
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = guestName.trim() || 'Visiting Engineer';
    signInDemoUser(finalName);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white dark:bg-[#152E2A] rounded-3xl shadow-2xl border border-[#A7D7B7]/50 p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gizmo Mascot Greeting */}
          <div className="flex flex-col items-center text-center mb-6">
            <GizmoAvatar mode="welcome" size="lg" />
            <h3 className="text-xl font-extrabold text-[#184E46] dark:text-[#E9F6F1] mt-3">
              Welcome to the Workshop!
            </h3>
            <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] mt-1.5 max-w-xs">
              {reason}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                <button
                  onClick={clearError}
                  className="block font-bold underline mt-1 text-[11px]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Real Firebase Google Sign-In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#1A3833] border-2 border-[#E2D9CC] dark:border-[#294F47] hover:border-[#184E46] dark:hover:border-[#4DD0B6] text-sm font-bold text-[#184E46] dark:text-[#E9F6F1] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{submitting ? 'Signing in...' : 'Sign In with Google'}</span>
            </button>

            {/* Instant Demo Sign-In for testing without Firebase setup */}
            <div className="pt-2">
              {!showGuestInput ? (
                <button
                  onClick={() => setShowGuestInput(true)}
                  className="w-full text-center text-xs font-bold text-[#486962] dark:text-[#A7D7B7] hover:underline py-1.5"
                >
                  Or continue as a Demo Guest Engineer →
                </button>
              ) : (
                <form onSubmit={handleGuestSignIn} className="space-y-2 pt-1 animate-in fade-in">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name (e.g. Maya Lin)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D9CC] dark:border-[#294F47] bg-white dark:bg-[#112320] text-xs font-semibold text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:border-[#4DD0B6]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35]"
                    >
                      Start Guest Session
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowGuestInput(false)}
                      className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 pt-4 border-t border-[#E2D9CC]/60 dark:border-[#294F47]/60 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#52A478]" />
            <span>Public visitors can browse all projects without an account.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
