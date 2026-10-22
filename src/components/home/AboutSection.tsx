/**
 * About Section (Meet the Creator)
 * Features Senithu Sethmin Warnakulasooriya with bio, education, engineering interests,
 * social links, and the cozy Gizmo reading book illustration inspired by the reference mockup.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, FileText, GraduationCap, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow */}
        <div className="text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-1.5">
            <span>🍃</span>
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
            Meet the Creator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Creator Profile & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Identity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                
                {/* Owner Portrait Placeholder (Professional Avatar with Initials) */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#184E46] to-[#4DD0B6] p-1 shadow-md">
                    <div className="w-full h-full rounded-[22px] bg-[#F5EDE2] dark:bg-[#112320] flex items-center justify-center text-2xl font-black text-[#184E46] dark:text-[#4DD0B6]">
                      SSW
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#52A478] border-2 border-white dark:border-[#17342F] flex items-center justify-center text-white text-[10px]" title="Engineering Undergraduate">
                    ⚡
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-black text-[#184E46] dark:text-[#E9F6F1]">
                    {siteConfig.ownerName}
                  </h3>
                  <p className="text-sm font-bold text-[#6B4E3F] dark:text-[#F6C85F] mt-0.5">
                    {siteConfig.ownerRole}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                    "{siteConfig.creatorTagline}"
                  </p>
                </div>
              </div>

              {/* Biography */}
              <div className="mt-6 pt-6 border-t border-[#E2D9CC]/60 dark:border-[#294F47]/60">
                <p className="text-sm sm:text-base text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                  {siteConfig.ownerBio}
                </p>
              </div>

              {/* Education details */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#184E46] dark:text-[#4DD0B6] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Focus</span>
                </h4>
                {siteConfig.education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#F5EDE2]/60 dark:bg-[#1A3833]/60 border border-[#A7D7B7]/30 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
                      {edu.degree}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 font-semibold text-xs mt-0.5">
                      {edu.institution} • {edu.period}
                    </div>
                    <div className="text-[11px] text-[#486962] dark:text-[#A7D7B7] mt-1 font-medium">
                      Focus: {edu.focus}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Interests */}
              <div className="mt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-3">
                  Core Engineering Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-[#A7D7B7]/25 dark:bg-[#1A3833] text-[#184E46] dark:text-[#E9F6F1] border border-[#A7D7B7]/40"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact CTA & Social Profiles */}
              <div className="mt-8 pt-6 border-t border-[#E2D9CC]/60 dark:border-[#294F47]/60 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]">
                    Have an idea or want to collaborate?
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Let's connect and discuss circuits, robotics, or firmware.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {siteConfig.contactEmail && (
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35] transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Me</span>
                    </a>
                  )}

                  {siteConfig.githubUrl && (
                    <a
                      href={siteConfig.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="p-2 rounded-full bg-gray-100 dark:bg-[#1A3833] text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/30 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {siteConfig.linkedinUrl && (
                    <a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="p-2 rounded-full bg-gray-100 dark:bg-[#1A3833] text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/30 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}

                  {siteConfig.resumePath && (
                    <a
                      href={siteConfig.resumePath}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-[#1A3833] text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/30 transition-colors"
                      title="Download Resume"
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Cozy Gizmo Workshop Illustration & Community Quote Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cozy Workshop Illustration Frame matching reference */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm relative overflow-hidden text-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#F5EDE2] dark:bg-[#112320]">
                {/* Cozy reading illustration from brand sheet */}
                <img
                  src="/assets/aistudio/Gizmo__Workshop_Wizard_Brand_Sheet_60c331ec.png"
                  alt="Gizmo studying technical books"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: '90% 88%', // Centers on the book-reading Gizmo
                  }}
                />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-[#A7D7B7]/25 text-[#184E46] dark:text-[#4DD0B6] text-xs font-bold">
                Workshop Research Notes
              </div>
              <p className="text-xs text-[#486962] dark:text-[#B9D6CD] mt-2 font-medium">
                "Small ideas... Big builds! Thanks for exploring the workshop."
              </p>
              <div className="mt-2 text-xs font-serif italic text-[#184E46] dark:text-[#4DD0B6]">
                Thanks for being here! ♡
              </div>
            </div>

            {/* Engineering Values Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#E8F4EC] to-[#F5EDE2] dark:from-[#1A3833] dark:to-[#17342F] border border-[#A7D7B7]/50 text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] space-y-2">
              <div className="font-extrabold flex items-center gap-1.5 text-base">
                <span>✦ Engineering Principles</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#486962] dark:text-[#B9D6CD]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52A478] shrink-0" />
                  <span>Measure twice, simulate first, solder clean.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52A478] shrink-0" />
                  <span>Deterministic firmware over complex black-boxes.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52A478] shrink-0" />
                  <span>Document failures and lessons as thoroughly as successes.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
