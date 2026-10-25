'use client';

// components/sections/ProjectsSection.tsx
// Section 4 Overlay: Displays the Projects Galaxy header and interactive planetary cards.
// Clicking either a 3D planet or its card below opens the animated ProjectModal.

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Github, Sparkles } from 'lucide-react';
import { PortfolioData, ProjectPlanetData } from '@/types/portfolio';

interface ProjectsSectionProps {
  data: PortfolioData;
  onSelectProject: (project: ProjectPlanetData) => void;
}

export default function ProjectsSection({
  data,
  onSelectProject,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-24 px-6 md:px-12 pointer-events-none"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl text-center pointer-events-auto"
      >
        <div className="text-xs font-mono text-purple-300 tracking-wider mb-1">
          04. NEBULA FORGE SECTOR · FEATURED PROJECTS
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Planetary Project Showcase
        </h2>
        <p className="text-sm text-slate-300 mt-1.5">
          Click on any floating project planet in 3D space or select a mission card below to open full details.
        </p>
      </motion.div>

      {/* Center space left open for the floating 3D Project Planets */}
      <div className="my-auto h-64 md:h-80" />

      {/* Bottom Interactive Project Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            onClick={() => onSelectProject(project)}
            className="group rounded-2xl bg-[#090d24]/92 border border-white/15 hover:border-cyan-400/60 p-6 transition-all cursor-pointer shadow-[0_0_35px_rgba(6,182,212,0.12)] hover:shadow-[0_0_35px_rgba(6,182,212,0.28)]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span>0{index + 1}. PLANETARY ARCHIVE</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">
                Open Modal →
              </span>
            </div>

            <h3
              className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>

            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Unboxed tech stack metadata with middle dot separators */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {i < project.techStack.length - 1 && (
                    <span aria-hidden="true" className="text-slate-600">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                <span>{project.githubUrl}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="flex items-center gap-1.5 text-purple-300">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{project.liveUrl}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
