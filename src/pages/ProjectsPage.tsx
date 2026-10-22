/**
 * Projects Showcase Page (/projects)
 * Search, filter by category, view status, and browse all engineering builds.
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, ArrowRight, FolderGit2, Sparkles } from 'lucide-react';
import { sampleProjects } from '../data/projects';

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Robotics',
    'IoT',
    'Power Electronics',
    'Renewable Energy',
    'Embedded Systems',
    'Control Systems',
  ];

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#184E46] dark:text-[#E9F6F1]">
            All Projects &amp; Experiments
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
            Detailed schematics, microcontroller firmware, test methodologies, and mechanical assemblies built by Senithu Sethmin Warnakulasooriya.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-2">
            [Sample Engineering Data for Demonstration]
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, sensor, chip, or technology..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-white dark:bg-[#17342F] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
              />
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-bold text-[#486962] dark:text-[#A7D7B7]">
              Showing {filteredProjects.length} of {sampleProjects.length} projects
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#184E46] text-white shadow-sm'
                    : 'bg-white dark:bg-[#17342F] text-[#486962] dark:text-[#B9D6CD] border border-[#E2D9CC] dark:border-[#294F47] hover:bg-[#A7D7B7]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47]">
            <FolderGit2 className="w-12 h-12 text-[#A7D7B7] mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#184E46] dark:text-[#E9F6F1]">
              No projects found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-gray-500 mt-1">Try clearing your search query or selecting "All" categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#184E46] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col bg-white dark:bg-[#17342F] rounded-3xl overflow-hidden border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-xl transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
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

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#184E46] dark:text-[#E9F6F1] group-hover:text-[#4DD0B6] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-[#F5EDE2] dark:bg-[#1A3833] text-[10px] font-bold text-[#184E46] dark:text-[#A7D7B7] border border-[#E2D9CC]/60 dark:border-[#294F47]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-[#E2D9CC]/50 dark:border-[#294F47]/50 flex items-center justify-between text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]">
                    <span>Inspect Full Project</span>
                    <div className="w-8 h-8 rounded-full bg-[#F5EDE2] dark:bg-[#1A3833] group-hover:bg-[#184E46] group-hover:text-white dark:group-hover:bg-[#4DD0B6] dark:group-hover:text-[#112320] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
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
        )}

      </div>
    </div>
  );
};
