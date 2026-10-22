/**
 * Dedicated Timeline Page (/timeline)
 * Full interactive timeline view of engineering achievements and milestones.
 */

import React from 'react';
import { TimelineSection } from '../components/home/TimelineSection';
import { Clock } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronicle</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#184E46] dark:text-[#E9F6F1]">
            Engineering Timeline
          </h1>
          <p className="mt-3 text-sm text-[#486962] dark:text-[#B9D6CD]">
            A documented chronological record of laboratory experiments, prototype completions, academic coursework, and system deployments.
          </p>
        </div>
      </div>
      <TimelineSection />
    </div>
  );
};
