/**
 * Footer Component
 * Dark forest green background with organic wave divider matching the reference design.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#184E46] text-[#E9F6F1] pt-16 pb-12 mt-20 overflow-hidden">
      {/* Gentle Organic Wave Top Border matching reference mockup */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          className="w-full h-12 sm:h-16 lg:h-20 fill-[#184E46] preserve-3d"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C280,75 520,10 720,40 C980,80 1200,15 1440,35 L1440,90 L0,90 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#29665B]">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {/* Gear + Leaf logo mark */}
            <div className="w-12 h-12 rounded-2xl bg-[#123B35] border border-[#4DD0B6]/30 flex items-center justify-center shrink-0 shadow-inner">
              <svg viewBox="0 0 40 40" className="w-7 h-7 fill-[#4DD0B6]">
                <path d="M18 4L22 4L22.5 7.5C23.6 7.9 24.6 8.5 25.5 9.2L28.8 7.7L31.6 10.5L30.1 13.8C30.8 14.7 31.4 15.7 31.8 16.8L35.3 17.3L35.3 21.3L31.8 21.8C31.4 22.9 30.8 23.9 30.1 24.8L31.6 28.1L28.8 30.9L25.5 29.4C24.6 30.1 23.6 30.7 22.5 31.1L22 34.6L18 34.6L17.5 31.1C16.4 30.7 15.4 30.1 14.5 29.4L11.2 30.9L8.4 28.1L9.9 24.8C9.2 23.9 8.6 22.9 8.2 21.8L4.7 21.3L4.7 17.3L8.2 16.8C8.6 15.7 9.2 14.7 9.9 13.8L8.4 10.5L11.2 7.7L14.5 9.2C15.4 8.5 16.4 7.9 17.5 7.5L18 4Z" />
                <circle cx="20" cy="19.3" r="6" fill="#123B35" />
              </svg>
            </div>

            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Gizmo</span>
                <span className="text-[#A7D7B7] text-xs uppercase tracking-widest font-bold">
                  The Workshop Wizard
                </span>
              </div>
              <p className="text-xs text-[#A7D7B7] mt-1">
                Portfolio of <span className="text-white font-bold">{siteConfig.ownerName}</span>
              </p>
              <p className="text-[11px] text-[#B9D6CD]/80 mt-0.5">
                {siteConfig.ownerRole}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-[#B9D6CD]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <Link to="/timeline" className="hover:text-white transition-colors">Timeline</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>

          {/* Social Links & Back-To-Top */}
          <div className="flex items-center gap-3">
            {siteConfig.githubUrl && (
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-[#123B35] hover:bg-[#4DD0B6] hover:text-[#184E46] flex items-center justify-center transition-all text-[#E9F6F1]"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {siteConfig.linkedinUrl && (
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-[#123B35] hover:bg-[#4DD0B6] hover:text-[#184E46] flex items-center justify-center transition-all text-[#E9F6F1]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                aria-label="Contact Email"
                className="w-9 h-9 rounded-full bg-[#123B35] hover:bg-[#4DD0B6] hover:text-[#184E46] flex items-center justify-center transition-all text-[#E9F6F1]"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-9 h-9 rounded-full bg-[#123B35] hover:bg-[#F6C85F] hover:text-[#184E46] flex items-center justify-center transition-all text-[#E9F6F1] ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A7D7B7] gap-4">
          <div className="flex items-center gap-1.5">
            <span>🌿</span>
            <span>&copy; {currentYear} {siteConfig.ownerName}. Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>and a lot of curiosity.</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-[11px] tracking-wider uppercase text-[#E9F6F1]">
            <span>Explore</span>
            <span>•</span>
            <span>Engineer</span>
            <span>•</span>
            <span>Innovate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
