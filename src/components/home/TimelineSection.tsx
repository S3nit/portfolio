/**
 * Engineering Timeline Section
 * Vertical timeline featuring project milestones, academic achievements, and deployments.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, GraduationCap, Rocket, Wrench, Trophy, ArrowRight } from 'lucide-react';
import { sampleTimeline, type TimelineEntry } from '../../data/timeline';

const categoryIconMap: Record<string, React.ElementType> = {
  'Prototype Completed': Wrench,
  'Project Deployed': Rocket,
  'Education': GraduationCap,
  'Achievement': Trophy,
  'Project Started': Clock,
};

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-2">
            <span>⏳</span>
            <span>Path &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
            Engineering Journey
          </h2>
          <p className="mt-2 text-sm text-[#486962] dark:text-[#B9D6CD]">
            A chronicle of hands-on builds, laboratory validations, academic milestones, and engineering discoveries.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1">
            [Sample Academic &amp; Project Milestones for Testing]
          </p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative">
          {/* Central spine line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#A7D7B7] via-[#4DD0B6] to-[#184E46] -translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12">
            {sampleTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = categoryIconMap[item.category] || Wrench;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#152E2A] border-2 border-[#184E46] dark:border-[#4DD0B6] flex items-center justify-center z-10 shadow">
                    <IconComponent className="w-4 h-4 text-[#184E46] dark:text-[#4DD0B6]" />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-md transition-shadow">
                      
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A7D7B7]/25 dark:bg-[#1A3833] text-[#184E46] dark:text-[#4DD0B6]">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base sm:text-lg text-[#184E46] dark:text-[#E9F6F1]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Optional preview thumbnail */}
                      {item.image && (
                        <div className="mt-3 aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Link to related project if available */}
                      {item.relatedProjectUrl && (
                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <Link
                            to={item.relatedProjectUrl}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] hover:underline"
                          >
                            <span>Inspect Project Architecture</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
