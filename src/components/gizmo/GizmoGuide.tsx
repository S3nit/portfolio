/**
 * GizmoGuide Component
 * Interactive floating workshop guide providing helpful shortcuts, engineering trivia,
 * and mood-based interactions. Dismissible and session-respecting.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, FolderGit2, BookOpen, Clock, User, Compass, HelpCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { GizmoAvatar, type GizmoMode } from './GizmoAvatar';

import { safeSessionStorage } from '../../utils/storage';

const SESSION_DISMISS_KEY = 'gizmo_guide_dismissed_session';

const engineeringTrivia = [
  'Did you know? The first operational stored-program computer, the Manchester Baby, ran its first program in 1948!',
  'Fun Fact: The term "bug" in computing was popularized when Grace Hopper found a real moth trapped in the Harvard Mark II relay.',
  'Hardware note: Copper traces on a PCB have parasitic inductance of ~1 nH per millimeter. Every millimeter counts at high frequencies!',
  'Green Tech: Dual-axis solar tracking can increase annual photovoltaic yield by up to 30-40% compared to fixed panels.',
  'Microcontroller magic: Modern ARM Cortex-M processors can wake from deep sleep in just a few microseconds to sample sensors.',
];

export const GizmoGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<GizmoMode>('helping');
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);

  useEffect(() => {
    // Show welcoming toast only once per session
    const isDismissed = safeSessionStorage.getItem(SESSION_DISMISS_KEY);
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setShowWelcomeBubble(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissWelcome = () => {
    setShowWelcomeBubble(false);
    safeSessionStorage.setItem(SESSION_DISMISS_KEY, 'true');
  };

  const handleOpenGuide = () => {
    setShowWelcomeBubble(false);
    setMode('helping');
    setIsOpen(true);
  };

  const handleNextTrivia = () => {
    setTriviaIndex((prev) => (prev + 1) % engineeringTrivia.length);
    setMode('thinking');
    setTimeout(() => setMode('helping'), 800);
  };

  const navigateTo = (anchor: string) => {
    setIsOpen(false);
    if (window.location.hash.startsWith('#/')) {
      // If we are on subpage, link to homepage anchor
      window.location.hash = `#/${anchor}`;
    } else {
      const elem = document.querySelector(anchor);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Welcome Bubble (First-visit subtle greeting) */}
      <AnimatePresence>
        {showWelcomeBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="fixed bottom-24 right-5 sm:right-8 z-40 max-w-xs bg-white dark:bg-[#1A3833] rounded-2xl p-4 shadow-xl border border-[#A7D7B7] text-[#184E46] dark:text-[#E9F6F1]"
          >
            <div className="flex items-start gap-3">
              <GizmoAvatar mode="welcome" size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-[#184E46] dark:text-[#4DD0B6]">
                    Gizmo says
                  </span>
                  <button
                    onClick={handleDismissWelcome}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-0.5 rounded-full"
                    aria-label="Dismiss greeting"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-semibold mt-1">
                  Hey there, inventor! Ready to explore?
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={handleOpenGuide}
                    className="text-xs bg-[#184E46] dark:bg-[#4DD0B6] text-white dark:text-[#112320] font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Need a Hand?
                  </button>
                  <button
                    onClick={handleDismissWelcome}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white px-2 py-1"
                  >
                    Explore freely
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Small Gizmo icon) */}
      <div className="fixed bottom-6 right-5 sm:right-8 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open Gizmo the Workshop Guide"
          className="relative group p-2.5 bg-white dark:bg-[#17342F] rounded-full shadow-lg border-2 border-[#A7D7B7] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
        >
          {/* Subtle magical glowing aura ring */}
          <span className="absolute inset-0 rounded-full bg-[#4DD0B6]/20 animate-ping group-hover:block" />
          <GizmoAvatar mode={isOpen ? 'thinking' : mode} size="sm" />

          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4DD0B6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#4DD0B6]"></span>
          </span>
        </motion.button>
      </div>

      {/* Compact Interactive Help Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end sm:p-6 pointer-events-none">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/25 dark:bg-black/50 pointer-events-auto"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full sm:max-w-md bg-white dark:bg-[#152E2A] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#A7D7B7]/60 overflow-hidden pointer-events-auto z-10 m-0 sm:mr-4 mb-0 sm:mb-12"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#F5EDE2] to-[#E8F4EC] dark:from-[#17342F] dark:to-[#1A3833] border-b border-[#E2D9CC] dark:border-[#294F47] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GizmoAvatar mode={mode} size="md" />
                  <div>
                    <h3 className="font-extrabold text-base text-[#184E46] dark:text-[#E9F6F1] flex items-center gap-1.5">
                      <span>Gizmo the Wizard</span>
                      <Sparkles className="w-4 h-4 text-[#F6C85F]" />
                    </h3>
                    <p className="text-xs text-[#486962] dark:text-[#A7D7B7]">
                      Workshop Guide &amp; Engineering Navigator
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#486962] dark:text-[#A7D7B7]"
                  aria-label="Close guide"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Greeting Bubble */}
                <div className="bg-[#F5EDE2]/70 dark:bg-[#1A3833]/70 p-3.5 rounded-2xl border border-[#A7D7B7]/30 text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] leading-relaxed">
                  "Need a hand exploring Senithu's showcase? I can teleport you straight to the key workshops or share a curious engineering fact!"
                </div>

                {/* Quick Navigation Shortcuts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B4E3F] dark:text-[#F6C85F] mb-2">
                    Quick Portals
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('#projects')}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#1D3F39] hover:bg-[#A7D7B7]/20 border border-[#E2D9CC] dark:border-[#294F47] text-left transition-all group"
                    >
                      <FolderGit2 className="w-4 h-4 text-[#184E46] dark:text-[#4DD0B6]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">Projects</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Rovers, Power &amp; IoT</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigateTo('#skills')}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#1D3F39] hover:bg-[#A7D7B7]/20 border border-[#E2D9CC] dark:border-[#294F47] text-left transition-all group"
                    >
                      <Compass className="w-4 h-4 text-[#F6C85F]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">Skills</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Artifact badges</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigateTo('#blogs')}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#1D3F39] hover:bg-[#A7D7B7]/20 border border-[#E2D9CC] dark:border-[#294F47] text-left transition-all group"
                    >
                      <BookOpen className="w-4 h-4 text-[#4DD0B6]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">Articles</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Engineering write-ups</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigateTo('#timeline')}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#1D3F39] hover:bg-[#A7D7B7]/20 border border-[#E2D9CC] dark:border-[#294F47] text-left transition-all group"
                    >
                      <Clock className="w-4 h-4 text-[#A7D7B7]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">Timeline</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Milestones &amp; Journey</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Engineering Trivia / Fun Fact Box */}
                <div className="p-3.5 rounded-2xl bg-[#E8F4EC] dark:bg-[#17342F] border border-[#A7D7B7]/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#F6C85F]" />
                      Workshop Trivia
                    </span>
                    <button
                      onClick={handleNextTrivia}
                      className="text-[11px] font-bold text-[#184E46] dark:text-[#A7D7B7] hover:underline"
                    >
                      Next fact →
                    </button>
                  </div>
                  <p className="text-xs text-[#486962] dark:text-[#B9D6CD] italic">
                    "{engineeringTrivia[triviaIndex]}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3.5 bg-gray-50 dark:bg-[#17342F] border-t border-[#E2D9CC] dark:border-[#294F47] text-center text-[11px] text-gray-500 dark:text-gray-400">
                Small wizard. Big ideas. Made with curiosity.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
