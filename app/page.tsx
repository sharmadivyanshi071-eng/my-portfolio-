'use client';

// app/page.tsx
// Main entry page for "Space Journey Portfolio".
// Coordinates the 3D Galaxy Canvas, scroll-based camera flight, fixed Navbar,
// section overlays (Hero, About, Skills, Projects, Contact), and modals.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  GALAXY_STATIONS,
  INITIAL_PORTFOLIO_DATA,
  PortfolioData,
  ProjectPlanetData,
  SectionId,
} from '@/types/portfolio';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import ProjectModal from '@/components/ProjectModal';
import CustomizeModal from '@/components/CustomizeModal';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamically import the Three.js scene with SSR disabled
const SpaceScene = dynamic(() => import('@/components/3d/SpaceScene'), {
  ssr: false,
});

export default function SpaceJourneyPortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(
    INITIAL_PORTFOLIO_DATA
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<ProjectPlanetData | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  // Mutable ref storing normalized scroll progress (0.0 -> 1.0) read by the 3D camera loop
  const scrollProgressRef = useRef<number>(0);

  // Synchronize window scroll position with the 3D camera progress and active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0
          ? Math.min(Math.max(window.scrollY / docHeight, 0), 1)
          : 0;

      scrollProgressRef.current = progress;

      // Determine which of the 5 stations is closest to current scroll progress
      const stationIdx = Math.min(
        Math.round(progress * (GALAXY_STATIONS.length - 1)),
        GALAXY_STATIONS.length - 1
      );
      const nextActive = GALAXY_STATIONS[stationIdx].id;
      setActiveSection((prev) => (prev !== nextActive ? nextActive : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Fallback safety timer so loading screen always clears even on slow devices
    const fallbackTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  // Smoothly scroll to a target section when clicking navbar links or CTA buttons
  const handleNavigate = useCallback((sectionId: SectionId, index: number) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const targetY = (index / (GALAXY_STATIONS.length - 1)) * docHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  const handleSceneReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const currentStation =
    GALAXY_STATIONS.find((s) => s.id === activeSection) || GALAXY_STATIONS[0];

  return (
    <div className="relative min-h-screen bg-[#050510] text-slate-100">
      {/* Loading Screen while 3D scene initializes */}
      <LoadingScreen isLoading={isLoading} />

      {/* Fixed Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      {/* Persistent 3D Galaxy Viewport (Fixed in background) */}
      <SpaceScene
        scrollProgressRef={scrollProgressRef}
        portfolioData={portfolioData}
        hoveredSkill={hoveredSkill}
        onHoverSkill={setHoveredSkill}
        onSelectProject={setSelectedProject}
        onSceneReady={handleSceneReady}
      />

      {/* Semantic Scrollable Sections Layered over the 3D Scene */}
      <main className="relative z-10">
        <HeroSection data={portfolioData} onNavigate={handleNavigate} />
        <AboutSection data={portfolioData} onNavigate={handleNavigate} />
        <SkillsSection
          data={portfolioData}
          hoveredSkill={hoveredSkill}
          onHoverSkill={setHoveredSkill}
        />
        <ProjectsSection
          data={portfolioData}
          onSelectProject={setSelectedProject}
        />
        <ContactSection data={portfolioData} onNavigate={handleNavigate} />
      </main>

      {/* Collapsible Bottom Flight Dock (Zen / Cinema Mode Toggle) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center max-w-[94vw]">
        <button
          type="button"
          onClick={() => setIsHudCollapsed((prev) => !prev)}
          className="px-3 py-1 rounded-t-lg bg-[#090d24] border border-b-0 border-white/15 text-[11px] font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
        >
          {isHudCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-cyan-400" />
              <span>Show Flight Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
              <span>Hide Flight Dock</span>
            </>
          )}
        </button>

        {!isHudCollapsed && (
          <div className="flex items-center gap-2 sm:gap-4 px-4 py-2 rounded-xl bg-[#090d24]/95 border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.65)]">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 pr-2 border-r border-white/10 whitespace-nowrap">
              <span className="text-cyan-400">
                0{currentStation.index + 1}.
              </span>
              <span>{currentStation.planetName}</span>
            </div>

            <div className="flex items-center gap-1">
              {GALAXY_STATIONS.map((station) => {
                const active = activeSection === station.id;
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => handleNavigate(station.id, station.index)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {station.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Animated Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Portfolio Customization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        data={portfolioData}
        onSave={setPortfolioData}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </div>
  );
}
