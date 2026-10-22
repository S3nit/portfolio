/**
 * Blog Detail Page (/blogs/:slug)
 * Displays technical article with table of contents, syntax-highlighted code,
 * author credit to Senithu Sethmin Warnakulasooriya, and social sharing.
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  Terminal,
  Bookmark,
  Sparkles,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { sampleBlogs, type BlogPost } from '../data/blogs';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const blog: BlogPost | undefined = sampleBlogs.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!blog) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-[#184E46] dark:text-[#E9F6F1]">
          Article Not Found
        </h2>
        <Link
          to="/blogs"
          className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const relatedArticles = sampleBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 2);

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184E46] dark:text-[#4DD0B6] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] hover:bg-[#A7D7B7]/20 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#184E46] text-white">
              {blog.category}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F6C85F]" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#4DD0B6]" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#184E46] dark:text-[#E9F6F1] leading-tight">
            {blog.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 py-3 border-y border-[#E2D9CC]/60 dark:border-[#294F47]/60">
            <div className="w-10 h-10 rounded-full bg-[#184E46] text-[#A7D7B7] flex items-center justify-center text-sm font-black">
              SW
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1]">
                {blog.author}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                {blog.authorRole}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2D9CC] dark:border-[#294F47] mt-6">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Table of Contents for Long Articles */}
        <nav
          aria-label="Table of contents"
          className="my-8 p-5 rounded-2xl bg-[#F5EDE2]/80 dark:bg-[#1A3833]/80 border border-[#A7D7B7]/40"
        >
          <div className="font-bold text-xs uppercase tracking-wider text-[#184E46] dark:text-[#4DD0B6] mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Table of Contents</span>
          </div>
          <ul className="space-y-1.5 text-xs">
            {blog.sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="font-semibold text-[#486962] dark:text-[#B9D6CD] hover:text-[#184E46] dark:hover:text-white hover:underline"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Article Body Sections */}
        <div className="space-y-10 my-10">
          {blog.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#184E46] dark:text-[#E9F6F1] pt-4">
                {section.title}
              </h2>

              <p className="text-sm sm:text-base text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                {section.content}
              </p>

              {/* Callout Box */}
              {section.callout && (
                <div className="p-4 rounded-2xl bg-[#E8F4EC] dark:bg-[#17342F] border-l-4 border-[#52A478] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-[#F6C85F] shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{section.callout.text}</span>
                </div>
              )}

              {/* Syntax Highlighted Code Block */}
              {section.codeBlock && (
                <div className="rounded-2xl overflow-hidden bg-[#0E1F1C] border border-[#294F47] text-white my-4">
                  <div className="px-4 py-2 bg-[#152E2A] border-b border-[#294F47] flex items-center justify-between text-xs font-mono text-[#A7D7B7]">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Code Excerpt</span>
                    </span>
                    <span className="uppercase text-[10px] font-bold text-gray-400">
                      {section.codeBlock.language}
                    </span>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto text-[#E9F6F1] leading-relaxed">
                    <code>{section.codeBlock.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-[#E2D9CC] dark:border-[#294F47]">
          <h3 className="text-xl font-black text-[#184E46] dark:text-[#E9F6F1] mb-6">
            Related Technical Write-ups
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/blogs/${rel.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-[#184E46] dark:text-[#4DD0B6]">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] truncate group-hover:text-[#4DD0B6]">
                    {rel.title}
                  </h4>
                  <span className="text-[10px] text-gray-400">{rel.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
