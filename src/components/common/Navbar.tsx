/**
 * Sticky Navigation Bar
 * Matching reference image:
 * - Gizmo logo with dual gears and leaf detail
 * - Links: Home, Projects, Blogs, Timeline, About
 * - Dark / Light theme toggle switch
 * - 'Let's Build ->' CTA button
 * - Mobile responsive drawer menu
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight, Sparkles, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { siteConfig } from '../../config/site';

export const Navbar: React.FC<{ onOpenAuthModal?: () => void }> = ({ onOpenAuthModal }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5EDE2]/90 dark:bg-[#0E1F1C]/90 backdrop-blur-md shadow-sm border-b border-[#E2D9CC]/60 dark:border-[#294F47]/60 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Gear & Leaf Motif matching Reference */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-[#4DD0B6] rounded-xl px-1"
          aria-label="Gizmo Engineering Showcase Home"
        >
          {/* Dual Gear + Leaf vector mark */}
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-8 h-8 fill-[#184E46] dark:fill-[#4DD0B6] transition-transform duration-500 group-hover:rotate-45">
              {/* Main gear */}
              <path d="M18 4L22 4L22.5 7.5C23.6 7.9 24.6 8.5 25.5 9.2L28.8 7.7L31.6 10.5L30.1 13.8C30.8 14.7 31.4 15.7 31.8 16.8L35.3 17.3L35.3 21.3L31.8 21.8C31.4 22.9 30.8 23.9 30.1 24.8L31.6 28.1L28.8 30.9L25.5 29.4C24.6 30.1 23.6 30.7 22.5 31.1L22 34.6L18 34.6L17.5 31.1C16.4 30.7 15.4 30.1 14.5 29.4L11.2 30.9L8.4 28.1L9.9 24.8C9.2 23.9 8.6 22.9 8.2 21.8L4.7 21.3L4.7 17.3L8.2 16.8C8.6 15.7 9.2 14.7 9.9 13.8L8.4 10.5L11.2 7.7L14.5 9.2C15.4 8.5 16.4 7.9 17.5 7.5L18 4Z" />
              <circle cx="20" cy="19.3" r="6" className="fill-[#F5EDE2] dark:fill-[#0E1F1C]" />
            </svg>
            {/* Small leaf on corner */}
            <span className="absolute -top-1 -right-1 text-[11px] leading-none select-none text-[#52A478]">
              🍃
            </span>
          </div>

          <div>
            <div className="font-extrabold text-xl tracking-tight text-[#184E46] dark:text-[#E9F6F1] flex items-center gap-1 leading-none">
              <span>Gizmo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DD0B6]" />
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#6B4E3F] dark:text-[#A7D7B7] leading-none mt-0.5">
              The Workshop Wizard
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  active
                    ? 'text-[#184E46] dark:text-[#4DD0B6] bg-[#A7D7B7]/25 dark:bg-[#1A3833]'
                    : 'text-[#486962] dark:text-[#B9D6CD] hover:text-[#184E46] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#184E46] dark:bg-[#4DD0B6]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Theme Toggle, User Avatar/Login, Let's Build CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Light/Dark Mode Toggle Switch */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="p-2 rounded-full text-[#184E46] dark:text-[#F6C85F] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* User Profile or Sign-in button */}
          {user ? (
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 p-1 rounded-full bg-white dark:bg-[#17342F] border border-[#A7D7B7]/50 focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                title={`Signed in as ${user.displayName}`}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#184E46] text-white flex items-center justify-center text-xs font-bold">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
              </button>
              {/* Dropdown menu */}
              <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-[#152E2A] rounded-2xl shadow-xl border border-[#E2D9CC] dark:border-[#294F47] hidden group-hover:block transition-all z-50">
                <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] truncate">
                    {user.displayName}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={signOut}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#184E46] dark:text-[#A7D7B7] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )
          )}

          {/* Let's Build / Contact CTA matching reference */}
          <Link
            to="/about"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#184E46] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#123B35] transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
          >
            <span>Let's Build</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-[#184E46] dark:text-[#E9F6F1] hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5EDE2] dark:bg-[#112320] border-b border-[#E2D9CC] dark:border-[#294F47] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                isActive(link.path)
                  ? 'bg-[#A7D7B7]/30 text-[#184E46] dark:text-[#4DD0B6]'
                  : 'text-[#486962] dark:text-[#B9D6CD] hover:bg-black/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E2D9CC] dark:border-[#294F47] flex flex-col gap-2">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#184E46] text-white text-sm font-bold shadow text-center"
            >
              <span>Let's Build Together</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
