'use client';

// components/sections/AboutSection.tsx
// Section 2 Overlay: Displays the developer's About text in a glassmorphism-styled card
// positioned next to the slowly rotating glowing planet "Aurelia Prime".

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layers, ArrowRight } from 'lucide-react';
import { PortfolioData, SectionId } from '@/types/portfolio';

interface AboutSectionProps {
  data: PortfolioData;
  onNavigate: (sectionId: SectionId, index: number) => void;
}

export default function AboutSection({ data, onNavigate }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 pointer-events-none"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column stays open so the rotating 3D About Planet is 100% unobstructed */}
        <div className="hidden lg:block lg:col-span-6" />

        {/* Right column: Glass-style card next to the glowing planet */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 pointer-events-auto rounded-2xl bg-[#090d24]/90 border border-cyan-500/25 p-7 md:p-9 shadow-[0_0_45px_rgba(6,182,212,0.16)]"
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
            <span>02. PLANET AURELIA PRIME · ABOUT</span>
            <span className="text-slate-500 tabular-nums">Z: -32.00</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
          >
            About {data.name}
          </h2>

          <p className="mt-2 text-sm font-medium text-purple-300">
            {data.role} · {data.tagline}
          </p>

          {/* Primary user about text */}
          <div className="mt-5 p-4 rounded-xl bg-[#050816] border border-white/10">
            <p className="text-base text-slate-100 leading-relaxed font-medium">
              {data.about}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {data.aboutExtended}
            </p>
          </div>

          {/* Core engineering pillars */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Code2 className="w-4 h-4 shrink-0" />
                <span>Frontend Craft</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Next.js, React & TypeScript interfaces with smooth motion.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                <Database className="w-4 h-4 shrink-0" />
                <span>Data & ORM</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                PostgreSQL relational schemas powered by Prisma ORM.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Backend Systems</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Node.js APIs, clean Git workflows, and scalable architecture.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-slate-400">
              Next Stop: Helios Skills Solar System
            </span>
            <button
              type="button"
              onClick={() => onNavigate('skills', 2)}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Inspect Skills Orbit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
