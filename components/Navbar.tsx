'use client';

// components/Navbar.tsx
// Fixed top navigation bar with section links that smoothly move the 3D camera
// between planets. Follows the 3-zone Top Bar Contract.

import React from 'react';
import { GALAXY_STATIONS, SectionId } from '@/types/portfolio';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId, index: number) => void;
  onOpenCustomize: () => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
  onOpenCustomize,
}: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-8 px-6 md:px-10 py-4 bg-[#050510]/90 border-b border-white/10">
      {/* Zone 1: Single-line Brand Wordmark */}
      <button
        type="button"
        onClick={() => onNavigate('hero', 0)}
        className="text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Space Journey Portfolio
      </button>

      {/* Zone 2: 5 Single-Line Navigation Links */}
      <nav
        aria-label="Galaxy Sections"
        className="hidden md:flex items-center gap-7 text-sm font-medium"
      >
        {GALAXY_STATIONS.map((station) => {
          const isActive = activeSection === station.id;
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onNavigate(station.id, station.index)}
              className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {station.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenCustomize}
          className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.35)]"
        >
          Customize Details
        </button>
      </div>
    </header>
  );
}
