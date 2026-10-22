/**
 * Skills & Tools Section (Compact Artifact-Style Row)
 * Inspired by small collectible magical engineering artifacts.
 * Horizontal scrollable row on mobile with left/right navigation buttons and interactive hover tooltips.
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
  Layers,
  Compass,
  BatteryCharging,
  Radio,
  Code2,
  Binary,
  Activity,
  Box,
  Wrench,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { skillArtifacts, type SkillArtifact } from '../../data/skills';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Zap,
  Layers,
  Compass,
  BatteryCharging,
  Radio,
  Code2,
  Binary,
  Activity,
  Box,
  Wrench,
  Gauge,
};

export const SkillsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<SkillArtifact | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-1">
              <span>✦</span>
              <span>Engineering Workshop Artifacts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
              Skills, Instruments &amp; Tools
            </h2>
          </div>

          {/* Left/Right scroll buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll skills left"
              className="p-2 rounded-full bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] hover:bg-[#A7D7B7]/25 text-[#184E46] dark:text-[#E9F6F1] shadow-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll skills right"
              className="p-2 rounded-full bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] hover:bg-[#A7D7B7]/25 text-[#184E46] dark:text-[#E9F6F1] shadow-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compact Horizontal Artifact Row */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-center gap-3.5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {skillArtifacts.map((skill) => {
              const IconComponent = iconMap[skill.artifactIcon] || Cpu;
              return (
                <div
                  key={skill.id}
                  className="relative snap-start shrink-0"
                  onMouseEnter={() => setActiveTooltip(skill)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onFocus={() => setActiveTooltip(skill)}
                  onBlur={() => setActiveTooltip(null)}
                  tabIndex={0}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="w-32 sm:w-36 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-md flex flex-col items-center text-center cursor-pointer transition-colors relative group"
                  >
                    {/* Magical Rune Symbol / Accent Emblem */}
                    <div className="absolute top-2 right-2 text-[10px] font-mono opacity-50 text-[#6B4E3F] dark:text-[#F6C85F]">
                      {skill.runeSymbol}
                    </div>

                    {/* Miniature Artifact Sphere/Gem */}
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:rotate-6 shadow-inner"
                      style={{
                        backgroundColor: `${skill.accentColor}20`,
                        border: `1.5px solid ${skill.accentColor}50`,
                      }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: skill.accentColor }}
                      />
                    </div>

                    <span className="font-extrabold text-xs text-[#184E46] dark:text-[#E9F6F1] truncate w-full">
                      {skill.name}
                    </span>

                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate w-full mt-0.5">
                      {skill.category.split('&')[0]}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Active Tooltip Drawer */}
          <AnimatePresence>
            {activeTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="mt-2 p-3 rounded-2xl bg-[#184E46] text-white text-xs max-w-md mx-auto shadow-xl border border-[#4DD0B6]/40 flex items-center gap-3 text-left"
              >
                <div
                  className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm bg-white/10"
                  style={{ color: activeTooltip.accentColor }}
                >
                  {activeTooltip.runeSymbol}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-[#F6C85F]">
                    <span>{activeTooltip.name}</span>
                    <span className="text-[10px] text-white/70">({activeTooltip.category})</span>
                  </div>
                  <p className="text-[#E9F6F1] text-[11px] mt-0.5 leading-snug">
                    {activeTooltip.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
