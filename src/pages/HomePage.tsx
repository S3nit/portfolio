/**
 * Homepage
 * Orchestrating all 7 main sections in order:
 * 1. Hero
 * 2. What I Do
 * 3. Featured Projects
 * 4. Skills & Tools (Artifacts)
 * 5. Latest Blogs
 * 6. Timeline
 * 7. About
 */

import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WhatIDoSection } from '../components/home/WhatIDoSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { LatestBlogsSection } from '../components/home/LatestBlogsSection';
import { TimelineSection } from '../components/home/TimelineSection';
import { AboutSection } from '../components/home/AboutSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    // If there's a hash in the URL like #projects, scroll to it
    const hash = window.location.hash;
    if (hash && hash.includes('#')) {
      const id = hash.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <WhatIDoSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <LatestBlogsSection />
      <TimelineSection />
      <AboutSection />
    </main>
  );
};
