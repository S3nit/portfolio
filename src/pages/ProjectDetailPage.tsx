/**
 * Project Detail Page (/projects/:slug)
 * Comprehensive 19-section engineering breakdown:
 * Overview, Problem Statement, Objectives, Architecture, Bill of Materials,
 * Circuit & PCB, Implementation, Firmware snippets, Testing & Results,
 * Challenges, Learnings, Lightbox Gallery, Related Projects, and Community Discussion.
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Tag,
  Github,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Code2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Terminal,
} from 'lucide-react';
import { sampleProjects, type Project, type GalleryItem } from '../data/projects';
import { CommentSection } from '../components/comments/CommentSection';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project: Project | undefined = sampleProjects.find((p) => p.slug === slug);

  // Gallery lightbox state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Keyboard accessibility for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null || !project) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev! + 1) % project.gallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev! === 0 ? project.gallery.length - 1 : prev! - 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, project]);

  if (!project) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-[#184E46] dark:text-[#E9F6F1]">
          Project not found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          The requested engineering project does not exist.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#184E46] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  // Related projects in the same category or other featured
  const relatedProjects = sampleProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* 1. Project Title, Metadata & Cover Image */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#184E46] text-white">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A7D7B7]/30 dark:bg-[#1A3833] text-[#184E46] dark:text-[#A7D7B7] border border-[#A7D7B7]/40">
              {project.status}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1 ml-2">
              <Calendar className="w-3.5 h-3.5 text-[#F6C85F]" />
              {project.startDate} {project.completionDate ? `— ${project.completionDate}` : ''}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#184E46] dark:text-[#E9F6F1] leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#486962] dark:text-[#B9D6CD] font-medium leading-relaxed">
            {project.summary}
          </p>

          {/* External links: GitHub, Docs, Demo (only shown when provided) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35] transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Firmware &amp; Schematics</span>
              </a>
            )}

            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/20 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* Cover Hero Image */}
          <div className="mt-6 aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2D9CC] dark:border-[#294F47] bg-gray-100 dark:bg-gray-800">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* 2 & 3. Project Overview & Problem Statement */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <h2 className="text-lg font-black text-[#184E46] dark:text-[#E9F6F1] mb-2.5 flex items-center gap-2">
              <span>✦</span>
              <span>Project Overview</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <h2 className="text-lg font-black text-[#184E46] dark:text-[#E9F6F1] mb-2.5 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Problem Statement</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
        </section>

        {/* 4. Objectives */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#E8F4EC]/60 dark:bg-[#17342F]/60 border border-[#A7D7B7]/50 my-10">
          <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#52A478]" />
            <span>Key Engineering Objectives</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {project.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1]">
                <span className="w-5 h-5 rounded-full bg-[#184E46] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-snug">{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. System Architecture */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
          <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-3 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#4DD0B6]" />
            <span>System Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed mb-6">
            {project.architecture.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.architecture.subsystems.map((sub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F5EDE2]/70 dark:bg-[#1A3833]/70 border border-[#A7D7B7]/30"
              >
                <div className="font-extrabold text-xs sm:text-sm text-[#184E46] dark:text-[#4DD0B6] mb-1">
                  {sub.name}
                </div>
                <div className="text-xs text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                  {sub.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Bill of Materials / Components & Technologies */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
          <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#F6C85F]" />
            <span>Components &amp; Hardware Bill of Materials</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2D9CC] dark:border-[#294F47] text-[#184E46] dark:text-[#A7D7B7] uppercase text-[10px] font-extrabold tracking-wider">
                  <th className="py-2.5 pr-4">Component</th>
                  <th className="py-2.5 pr-4">Part / Spec</th>
                  <th className="py-2.5">Subsystem Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9CC]/50 dark:divide-[#294F47]/50 text-[#486962] dark:text-[#B9D6CD]">
                {project.components.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-bold text-[#184E46] dark:text-[#E9F6F1]">
                      {c.name}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[#6B4E3F] dark:text-[#F6C85F]">
                      {c.partNumber || c.specs || 'Standard'}
                    </td>
                    <td className="py-2.5 text-xs">{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7, 8, 9, 10, 11: Circuit Design, Implementation & Firmware */}
        <section className="my-10 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#4DD0B6]" />
              <span>Implementation &amp; Firmware Logic</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed mb-4">
              {project.implementation}
            </p>

            {/* Code Snippet if present */}
            {project.codeSnippet && (
              <div className="rounded-2xl overflow-hidden bg-[#0D1F1C] border border-[#294F47] text-white">
                <div className="px-4 py-2.5 bg-[#142C27] border-b border-[#294F47] flex items-center justify-between text-xs font-mono text-[#A7D7B7]">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{project.codeSnippet.title}</span>
                  </span>
                  <span className="uppercase text-[10px] font-bold text-gray-400">
                    {project.codeSnippet.language}
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto text-[#E9F6F1] leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* 13. Testing and Results */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
          <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-3">
            Testing Methodology &amp; Bench Results
          </h2>
          <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed mb-4">
            {project.testing.methodology}
          </p>
          <div className="space-y-2 mb-4">
            {project.testing.results.map((res, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1]">
                <CheckCircle2 className="w-4 h-4 text-[#52A478] shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-[#E8F4EC] dark:bg-[#1A3833] border border-[#A7D7B7]/40 text-xs sm:text-sm font-semibold text-[#184E46] dark:text-[#A7D7B7]">
            Outcome Summary: {project.results}
          </div>
        </section>

        {/* 14, 15, 16: Challenges, Lessons Learned & Future Work */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {/* Challenges & Solutions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <h3 className="text-base font-black text-[#184E46] dark:text-[#E9F6F1] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Challenges Overcome</span>
            </h3>
            <div className="space-y-3">
              {project.challenges.map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-xs">
                  <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">
                    Problem: {c.problem}
                  </div>
                  <div className="text-amber-800 dark:text-amber-300">
                    Solution: {c.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons & Future Improvements */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-black text-[#184E46] dark:text-[#E9F6F1] mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#F6C85F]" />
                <span>Lessons Learned</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#486962] dark:text-[#B9D6CD]">
                {project.learnings.map((l, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-black text-[#184E46] dark:text-[#E9F6F1] mb-2">
                Future Improvements
              </h3>
              <ul className="space-y-1.5 text-xs text-[#486962] dark:text-[#B9D6CD]">
                {project.futureWork.map((fw, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#4DD0B6]">→</span>
                    <span>{fw}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 17. Project Gallery with Lightbox */}
        {project.gallery.length > 0 && (
          <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <h2 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-4">
              Project Gallery &amp; Bench Captures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-[#E2D9CC] dark:border-[#294F47]"
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-[10px] text-white truncate">
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close image viewer"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev! === 0 ? project.gallery.length - 1 : prev! - 1
                  )
                }
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
                <img
                  src={project.gallery[activeLightboxIndex].url}
                  alt={project.gallery[activeLightboxIndex].caption}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl"
                />
                <p className="mt-3 text-xs sm:text-sm text-gray-200 text-center max-w-xl">
                  {project.gallery[activeLightboxIndex].caption}
                </p>
                <div className="text-[11px] text-gray-400 mt-1">
                  {activeLightboxIndex + 1} of {project.gallery.length}
                </div>
              </div>

              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    (prev! + 1) % project.gallery.length
                  )
                }
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* 18. Related Projects */}
        <section className="my-12">
          <h3 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-4">
            Related Engineering Builds
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-[#184E46] dark:text-[#4DD0B6]">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] truncate group-hover:text-[#4DD0B6]">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {rel.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 19. Comments and Suggestions Section */}
        <CommentSection
          projectId={project.slug}
          projectTitle={project.title}
        />

      </div>
    </article>
  );
};
