/**
 * Gizmo Hero Illustration
 * Renders Gizmo the Workshop Wizard with glowing teal crystal, floating leaves,
 * workshop gear motifs, and subtle desktop-only mouse parallax.
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Compass, Lightbulb, Code2 } from 'lucide-react';
import { GizmoAvatar } from './GizmoAvatar';

export const GizmoHeroIllustration: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState("Hey there, inventor! Ready to explore?");

  // Desktop mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [4, -4]);
  const rotateY = useTransform(smoothX, [-200, 200], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on wide screens
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const speechOptions = [
    "Hey there, inventor! Ready to explore?",
    "Check out the autonomous rover!",
    "Circuits + Code = Engineering Magic!",
    "Ask me about any project schematics!",
    "Small ideas... Big builds!",
  ];

  const handlePokeGizmo = () => {
    const next = speechOptions[Math.floor(Math.random() * speechOptions.length)];
    setSpeechBubble(next);
  };

  return (
    <div
      className="relative w-full max-w-[500px] mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePokeGizmo}
    >
      {/* Background Soft Glow & Magic Aura */}
      <div className="absolute inset-0 bg-radial from-[#4DD0B6]/25 via-[#A7D7B7]/15 to-transparent blur-3xl pointer-events-none rounded-full transform scale-110" />

      {/* Floating Interactive Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute -top-12 right-2 sm:right-6 z-30 bg-white/95 dark:bg-[#1A3833]/95 backdrop-blur-md px-4 py-2 rounded-2xl rounded-bl-none shadow-md border border-[#A7D7B7]/50 text-xs sm:text-sm font-semibold text-[#184E46] dark:text-[#A7D7B7] flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
      >
        <Sparkles className="w-4 h-4 text-[#F6C85F] shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{speechBubble}</span>
      </motion.div>

      {/* Parallax Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6"
      >
        {/* Floating Decorative Workshop Badges */}
        <motion.div
          animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-2 top-16 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#152E2A]/90 backdrop-blur-sm border border-[#E2D9CC] dark:border-[#294F47] shadow-sm text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]"
        >
          <Code2 className="w-3.5 h-3.5 text-[#4DD0B6]" />
          <span>&lt;/&gt; Code</span>
        </motion.div>

        <motion.div
          animate={{ y: [4, -5, 4], rotate: [2, -2, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -right-3 top-28 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#152E2A]/90 backdrop-blur-sm border border-[#E2D9CC] dark:border-[#294F47] shadow-sm text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]"
        >
          <Lightbulb className="w-3.5 h-3.5 text-[#F6C85F]" />
          <span>Idea = Magic</span>
        </motion.div>

        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute left-6 bottom-8 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#152E2A]/90 backdrop-blur-sm border border-[#E2D9CC] dark:border-[#294F47] shadow-sm text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]"
        >
          <Compass className="w-3.5 h-3.5 text-[#184E46] dark:text-[#4DD0B6]" />
          <span>Explore</span>
        </motion.div>

        {/* Floating Organic Leaves (Reference styling) */}
        <motion.span
          animate={{ y: [-6, 6, -6], x: [-3, 3, -3], rotate: [-8, 8, -8] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 left-12 text-[#A7D7B7] text-xl pointer-events-none select-none opacity-80"
        >
          🍃
        </motion.span>
        <motion.span
          animate={{ y: [6, -6, 6], x: [3, -3, 3], rotate: [10, -10, 10] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-16 right-4 text-[#A7D7B7] text-lg pointer-events-none select-none opacity-70"
        >
          🌿
        </motion.span>

        {/* Main Character Graphic Frame */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full aspect-square max-w-[380px] sm:max-w-[420px] rounded-3xl p-3 bg-gradient-to-b from-[#F5EDE2]/80 to-[#E8F4EC]/40 dark:from-[#17342F]/60 dark:to-[#112320]/60 border border-[#A7D7B7]/40 shadow-xl overflow-hidden flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle spinning workshop gear backdrop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-5">
            <svg
              className="w-80 h-80 animate-spin"
              style={{ animationDuration: '40s' }}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="30" strokeWidth="8" strokeDasharray="6 8" />
              <circle cx="50" cy="50" r="15" strokeWidth="4" />
            </svg>
          </div>

          {/* Central Hero Character Artwork */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* High quality rendered visual from brand asset */}
            <img
              src="/assets/aistudio/Gizmo__Workshop_Wizard_Brand_Sheet_60c331ec.png"
              alt="Gizmo the Workshop Wizard"
              className="w-full h-full object-cover object-top rounded-2xl filter drop-shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                // Focusing on the front-facing 3D character illustration
                objectPosition: '16% 25%',
              }}
            />
          </div>

          {/* Teal Crystal Pulse Highlight Overlay */}
          <div className="absolute bottom-6 right-8 w-12 h-12 rounded-full bg-[#4DD0B6]/30 blur-lg animate-pulse-glow pointer-events-none" />

          {/* Bottom Badge Tag */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-[#152E2A]/90 backdrop-blur-sm px-3.5 py-1 rounded-full border border-[#E2D9CC] dark:border-[#294F47] shadow text-[11px] font-bold tracking-wider uppercase text-[#184E46] dark:text-[#A7D7B7] flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#4DD0B6] animate-ping" />
            <span>Workshop Wizard • Guide</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
