/**
 * 404 Not Found Page
 * Displays Gizmo in surprised mode wondering where the schematic vanished.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { GizmoAvatar } from '../components/gizmo/GizmoAvatar';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-xl space-y-5">
        
        <GizmoAvatar mode="surprised" size="lg" className="mx-auto" />

        <div className="space-y-1.5">
          <span className="text-xs font-black tracking-widest uppercase text-[#F6C85F]">
            Error 404 • Lost in the Workshop
          </span>
          <h1 className="text-3xl font-black text-[#184E46] dark:text-[#E9F6F1]">
            Schematic Missing!
          </h1>
          <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
            "Hmm... I searched the workbench and couldn't find this page. Let me guide you back to the main workshop!"
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35] shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Workshop</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-[#1A3833] text-[#184E46] dark:text-[#E9F6F1] text-xs font-bold hover:bg-gray-200"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Projects</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
