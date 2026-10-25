'use client';

// components/sections/HeroSection.tsx
// Section 1 Overlay: Hero section displaying the developer's name, role, tagline,
// primary CTA buttons, and a "Scroll to explore" hint.

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Compass, Rocket } from 'lucide-react';
import { PortfolioData, SectionId } from '@/types/portfolio';

interface HeroSectionProps {
  data: PortfolioData;
  onNavigate: (sectionId: SectionId, index: number) => void;
}

export default function HeroSection({ data, onNavigate }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-28 pb-10 px-6 md:px-12 pointer-events-none select-none"
    >
      {/* Top coordinates metadata */}
      <div className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-slate-400">
        <span>01. ORIGIN BEACON</span>
        <span className="hidden sm:inline">00.00 · +00.00 · +00.00</span>
      </div>

      {/* Central Hero Content positioned below the 3D Holographic Nameplate & Astrolabe */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto pt-44 md:pt-52 flex flex-col items-center text-center max-w-3xl pointer-events-auto select-auto"
      >
        <p className="text-xs md:text-sm font-mono tracking-wider text-cyan-300 mb-3">
          {data.role}
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
          style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
        >
          {data.name}
        </h1>

        <p
          className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          {data.tagline}
        </p>

        {/* Primary CTA & Secondary Navigation */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('projects', 3)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-sm font-semibold text-white shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-all whitespace-nowrap cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Explore Projects Galaxy</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about', 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0b1026]/90 hover:bg-[#111838] border border-white/15 text-sm font-medium text-slate-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Begin Space Journey</span>
          </button>
        </div>
      </motion.div>

      {/* Subtle "Scroll to explore" hint */}
      <button
        type="button"
        onClick={() => onNavigate('about', 1)}
        className="pointer-events-auto flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-7 rounded-full border border-white/15 group-hover:border-cyan-400/50 flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </button>
    </section>
  );
}
