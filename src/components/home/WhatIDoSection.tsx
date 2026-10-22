/**
 * What I Do Section
 * Recreating the 4-card technical capability grid from the reference image.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Code2, Layers, Cpu, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

export const WhatIDoSection: React.FC = () => {
  const capabilities = [
    {
      icon: Cpu,
      title: 'Embedded Systems',
      description: 'Firmware design for ARM Cortex-M, ESP32, and AVR with FreeRTOS and real-time sensor processing.',
      color: 'bg-emerald-50 dark:bg-emerald-950/30 text-[#184E46] dark:text-[#4DD0B6]',
    },
    {
      icon: Layers,
      title: 'Circuit & PCB Design',
      description: 'Multi-layer schematics, low-noise analog routing, SMPS layouts, and rapid board bring-up.',
      color: 'bg-amber-50 dark:bg-amber-950/30 text-[#B45309] dark:text-[#F6C85F]',
    },
    {
      icon: Code2,
      title: 'Robotics & Control',
      description: 'Differential-drive kinematic modeling, closed-loop PID loops, encoder feedback, and LiDAR SLAM.',
      color: 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-[#4DD0B6]',
    },
    {
      icon: Lightbulb,
      title: 'Power & Energy Systems',
      description: 'High-efficiency buck converters, solar tracking MPPT, and non-invasive AC power instrumentation.',
      color: 'bg-lime-50 dark:bg-lime-950/30 text-lime-800 dark:text-lime-300',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Introduction */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6]">
              <span>🍃</span>
              <span>What I Do</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#184E46] dark:text-[#E9F6F1] leading-tight">
              Turning Ideas into <br className="hidden sm:inline" />
              Tangible Engineering Solutions
            </h2>

            <p className="text-base text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
              I am passionate about the intersection of electrical hardware, deterministic firmware, and creative problem solving. From bench prototypes to complete embedded systems, I enjoy building tools that solve real challenges.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#184E46] dark:bg-[#4DD0B6] text-white dark:text-[#112320] text-sm font-bold shadow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                <span>Learn More About My Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Cards with "Ideas + Code = Magic" accent */}
          <div className="lg:col-span-7 relative">
            
            {/* Playful Hand-drawn Annotation matching reference */}
            <div className="absolute -top-10 -right-2 hidden sm:flex flex-col items-center text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] pointer-events-none select-none">
              <span className="italic font-serif text-sm">Ideas + Code = Magic</span>
              <Sparkles className="w-4 h-4 text-[#F6C85F] mt-0.5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${cap.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-[#184E46] dark:text-[#E9F6F1] mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                      {cap.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
