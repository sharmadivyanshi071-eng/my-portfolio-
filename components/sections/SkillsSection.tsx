'use client';

// components/sections/SkillsSection.tsx
// Section 3 Overlay: Displays the interactive Skills HUD synchronized with the 3D orbiting orbs.
// Hovering a skill button here or hovering an orb in 3D highlights the orb and shows details.

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '@/types/portfolio';

interface SkillsSectionProps {
  data: PortfolioData;
  hoveredSkill: string | null;
  onHoverSkill: (skillName: string | null) => void;
}

export default function SkillsSection({
  data,
  hoveredSkill,
  onHoverSkill,
}: SkillsSectionProps) {
  const activeSkillObj =
    data.skills.find((s) => s.name === hoveredSkill) || null;

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-24 px-6 md:px-12 pointer-events-none"
    >
      {/* Top Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center pointer-events-auto"
      >
        <div className="text-xs font-mono text-cyan-400 tracking-wider mb-1">
          03. HELIOS CORE SYSTEM · ORBITING SKILLS
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Technical Stack & Orbiting Orbs
        </h2>
        <p className="text-sm text-slate-300 mt-1.5">
          Hover over any orbiting planet in 3D space or select a skill below to inspect its orbit.
        </p>
      </motion.div>

      {/* Unobstructed center viewport for the 3D Sun and 7 Orbiting Skill Orbs */}
      <div className="my-auto h-64 md:h-80" />

      {/* Bottom Unified Dock for Skill Orbs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl pointer-events-auto rounded-2xl bg-[#090d24]/92 border border-white/15 p-5 md:p-6 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
      >
        {/* Interactive Skill Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {data.skills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => onHoverSkill(skill.name)}
                onMouseLeave={() => onHoverSkill(null)}
                onClick={() =>
                  onHoverSkill(isHovered ? null : skill.name)
                }
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                  isHovered
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.45)] -translate-y-0.5'
                    : 'bg-[#050816] text-slate-300 border-white/10 hover:border-cyan-400/50 hover:text-white'
                }`}
              >
                {skill.name}
              </button>
            );
          })}
        </div>

        {/* Live Telemetry Details for the Hovered Skill Orb */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          {activeSkillObj ? (
            <>
              <div className="flex items-center gap-2 font-medium text-cyan-300">
                <span>{activeSkillObj.name}</span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span className="text-purple-300">{activeSkillObj.category}</span>
              </div>
              <div className="text-slate-300 text-center sm:text-right">
                {activeSkillObj.description}
              </div>
            </>
          ) : (
            <>
              <span className="font-mono text-slate-400">
                7 Active Skill Orbs: Next.js · React · TypeScript · PostgreSQL · Prisma · Node.js · Git
              </span>
              <span className="font-mono text-cyan-400">
                Hover an orb to amplify glow
              </span>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
