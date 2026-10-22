/**
 * Hero Section
 * Faithfully recreating the aesthetic and layout of reference image 1:
 * - Left: Eyebrow, headline, friendly introduction to Senithu's work, CTA buttons, and feature pill trio
 * - Right: Large Gizmo the Workshop Wizard with glowing magic aura, staff crystal, and floating chips
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, User, Lightbulb, Sparkles, Star } from 'lucide-react';
import { GizmoHeroIllustration } from '../gizmo/GizmoHeroIllustration';
import { siteConfig } from '../../config/site';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#A7D7B7]/15 dark:bg-[#4DD0B6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F6C85F]/15 dark:bg-[#F6C85F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Eyebrow matching reference hand-drawn vibe */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A7D7B7]/25 dark:bg-[#1A3833] border border-[#A7D7B7]/50 text-xs sm:text-sm font-extrabold text-[#184E46] dark:text-[#4DD0B6]"
            >
              <span className="text-base">🍃</span>
              <span>Dream it • Build it • Together</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs uppercase font-extrabold tracking-widest text-[#6B4E3F] dark:text-[#F6C85F]">
                <span>HELLO, I'M GIZMO</span>
                <span>•</span>
                <span>WORKSHOP GUIDE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#184E46] dark:text-[#E9F6F1] leading-[1.12]">
                Your Friendly <br className="hidden sm:inline" />
                <span className="text-[#184E46] dark:text-[#4DD0B6] relative inline-block">
                  Engineering Guide
                  {/* Gentle curved underline accent */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#A7D7B7] dark:text-[#3A7367]"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path d="M2,8 C60,2 140,2 198,8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Description introducing Senithu Sethmin Warnakulasooriya */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#486962] dark:text-[#B9D6CD] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Welcome to <strong className="text-[#184E46] dark:text-white font-bold">{siteConfig.ownerName}</strong>'s engineering project showcase! I'm Gizmo, your little workshop guide. Come explore innovative projects, engineering experiments, lessons learned, and ideas brought to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#184E46] hover:bg-[#123B35] text-white text-sm sm:text-base font-extrabold shadow-lg shadow-[#184E46]/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
              >
                <Compass className="w-5 h-5 text-[#4DD0B6]" />
                <span>Explore Projects</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#17342F] hover:bg-[#F5EDE2] dark:hover:bg-[#1D3F39] text-[#184E46] dark:text-[#E9F6F1] border-2 border-[#184E46]/20 dark:border-[#294F47] text-sm sm:text-base font-extrabold transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
              >
                <User className="w-5 h-5 text-[#6B4E3F] dark:text-[#F6C85F]" />
                <span>Meet the Creator</span>
              </Link>
            </motion.div>

            {/* Feature Trio Pill Row matching reference ("Build • Create • Explore") */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 border-t border-[#E2D9CC]/70 dark:border-[#294F47]/70 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs sm:text-sm font-bold text-[#486962] dark:text-[#B9D6CD]"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F6C85F]/20 flex items-center justify-center text-[#B45309] dark:text-[#F6C85F]">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span>Build</span>
              </div>

              <span className="text-[#A7D7B7]">•</span>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#A7D7B7]/30 flex items-center justify-center text-[#184E46] dark:text-[#4DD0B6]">
                  <span>🍃</span>
                </div>
                <span>Create</span>
              </div>

              <span className="text-[#A7D7B7]">•</span>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#4DD0B6]/20 flex items-center justify-center text-[#184E46] dark:text-[#4DD0B6]">
                  <Star className="w-4 h-4" />
                </div>
                <span>Explore</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Gizmo the Workshop Wizard */}
          <div className="lg:col-span-5 flex justify-center">
            <GizmoHeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
