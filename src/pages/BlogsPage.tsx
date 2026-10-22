/**
 * Blogs Showcase Page (/blogs)
 * Search, filter by category, and read engineering write-ups.
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { sampleBlogs } from '../data/blogs';

export const BlogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Circuit Design', 'Embedded Systems', 'Power Systems', 'Prototyping'];

  const filteredBlogs = useMemo(() => {
    return sampleBlogs.filter((b) => {
      const matchesCategory =
        selectedCategory === 'All' || b.category === selectedCategory;
      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Lab Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#184E46] dark:text-[#E9F6F1]">
            Technical Articles &amp; Insights
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
            Practical reflections on circuit design, embedded debugging, real-time operating systems, and power electronics by Senithu Sethmin Warnakulasooriya.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-2">
            [Sample Technical Articles for Demonstration]
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword, chip, or theory..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-white dark:bg-[#17342F] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
              />
            </div>

            <div className="text-xs font-bold text-[#486962] dark:text-[#A7D7B7]">
              Showing {filteredBlogs.length} articles
            </div>
          </div>

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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col bg-white dark:bg-[#17342F] rounded-3xl overflow-hidden border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#184E46]/90 text-white backdrop-blur-sm">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#A7D7B7]" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F6C85F]" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#184E46] dark:text-[#E9F6F1] group-hover:text-[#4DD0B6] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#F5EDE2] dark:bg-[#1A3833] text-[10px] font-bold text-[#184E46] dark:text-[#A7D7B7]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2D9CC]/50 dark:border-[#294F47]/50 flex items-center justify-between text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <Link
                to={`/blogs/${blog.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Read article: ${blog.title}`}
              />
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
};
