/**
 * Featured Projects Section
 * Displays 4 featured engineering projects in responsive grid (4 on desktop, 2 on tablet, 1 on mobile).
 * Subtle hover elevation, image zoom, status tag, category chip, and link to detail page.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Layers, ExternalLink, CheckCircle2 } from 'lucide-react';
import { sampleProjects } from '../../data/projects';

export const FeaturedProjectsSection: React.FC = () => {
  const featured = sampleProjects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-1.5">
              <span>🍃</span>
              <span>Featured Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
              A Selection of Engineering Builds
            </h2>
            <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1">
              [Sample Engineering Projects for Layout &amp; Architecture Testing]
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#184E46] dark:text-[#4DD0B6] hover:underline group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Card Grid (4 desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col bg-white dark:bg-[#17342F] rounded-3xl overflow-hidden border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-xl transition-all"
            >
              {/* Thumbnail Container with subtle zoom */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category & Status Overlay Chips */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#184E46]/90 text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 dark:bg-[#112320]/90 text-[#184E46] dark:text-[#4DD0B6] backdrop-blur-sm border border-[#A7D7B7]/40">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#184E46] dark:text-[#E9F6F1] group-hover:text-[#4DD0B6] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech stack chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#F5EDE2] dark:bg-[#1A3833] text-[10px] font-bold text-[#184E46] dark:text-[#A7D7B7] border border-[#E2D9CC]/60 dark:border-[#294F47]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-gray-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-5 pt-3 border-t border-[#E2D9CC]/50 dark:border-[#294F47]/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] group-hover:underline">
                    View Project
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F5EDE2] dark:bg-[#1A3833] group-hover:bg-[#184E46] group-hover:text-white dark:group-hover:bg-[#4DD0B6] dark:group-hover:text-[#112320] flex items-center justify-center text-[#184E46] dark:text-[#4DD0B6] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`View details for ${project.title}`}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
