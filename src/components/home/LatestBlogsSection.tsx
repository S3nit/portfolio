/**
 * Latest Engineering Blogs Section
 * Displays 4 latest technical engineering articles on the homepage.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { sampleBlogs } from '../../data/blogs';

export const LatestBlogsSection: React.FC = () => {
  const blogs = sampleBlogs.slice(0, 4);

  return (
    <section id="blogs" className="py-16 sm:py-24 relative bg-[#F5EDE2]/50 dark:bg-[#0E1F1C]/40 border-y border-[#E2D9CC]/60 dark:border-[#294F47]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-1.5">
              <span>🍃</span>
              <span>Engineering Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#184E46] dark:text-[#E9F6F1]">
              Latest Technical Write-ups
            </h2>
            <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1">
              [Sample Markdown Articles for Demonstration]
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#184E46] dark:text-[#4DD0B6] hover:underline group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col bg-white dark:bg-[#17342F] rounded-3xl overflow-hidden border border-[#E2D9CC] dark:border-[#294F47] shadow-sm hover:shadow-lg transition-all"
            >
              {/* Cover thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
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

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2">
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

                  <h3 className="font-extrabold text-base text-[#184E46] dark:text-[#E9F6F1] group-hover:text-[#4DD0B6] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#486962] dark:text-[#B9D6CD] line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2D9CC]/50 dark:border-[#294F47]/50 flex items-center justify-between text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
    </section>
  );
};
