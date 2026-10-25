'use client';

// components/ProjectModal.tsx
// Smooth animated Framer Motion modal that opens when a user clicks a Project Planet.
// Shows project description, tech stack metadata, and GitHub / Live action buttons.

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Globe } from 'lucide-react';
import { ProjectPlanetData } from '@/types/portfolio';

interface ProjectModalProps {
  project: ProjectPlanetData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            key="project-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-2xl bg-[#0a0e24] border border-cyan-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.22)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Planetary Header Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>PLANETARY MISSION LOG</span>
            </div>

            {/* Project Title */}
            <h3
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>

            {/* Short subtitle */}
            <p className="text-sm font-medium text-purple-300 mt-1">
              {project.shortDescription}
            </p>

            {/* Detailed description */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-4">
              {project.longDescription}
            </p>

            {/* Tech Stack (Clean unboxed metadata with typographic separators per Zero-Pill rule) */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400 mb-2">
                Tech Stack & Architecture
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-mono text-cyan-300">
                {project.techStack.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {idx < project.techStack.length - 1 && (
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Action Buttons: GitHub & Live Link */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={
                  project.githubUrl.startsWith('http')
                    ? project.githubUrl
                    : `https://github.com`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-medium text-white transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4 text-cyan-300" />
                <span>GitHub: {project.githubUrl}</span>
              </a>

              <a
                href={
                  project.liveUrl.startsWith('http')
                    ? project.liveUrl
                    : `https://nextjs.org`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-sm font-semibold text-white shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-all whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo: {project.liveUrl}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
