/**
 * Application Entry Point
 * Configures HashRouter for rock-solid GitHub Pages deployment and deep-linking,
 * AuthProvider, ThemeProvider, Navbar, GizmoGuide, and Footer.
 */

import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GizmoGuide } from './components/gizmo/GizmoGuide';
import { AuthModal } from './components/auth/AuthModal';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { TimelinePage } from './pages/TimelinePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-[#F5EDE2] dark:bg-[#0E1F1C] text-[#184E46] dark:text-[#E9F6F1] transition-colors duration-300">
            {/* Top Navigation */}
            <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />

            {/* Routed View Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            {/* Gizmo Interactive Floating Guide */}
            <GizmoGuide />

            {/* Global Auth Modal */}
            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
            />

            {/* Footer */}
            <Footer />
          </div>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
