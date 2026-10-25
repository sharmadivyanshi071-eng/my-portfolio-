'use client';

// components/sections/ContactSection.tsx
// Section 5 Overlay: Positioned beside the floating 3D Rocket/Satellite ("Relay Voyager IX").
// Displays glowing buttons for Email, GitHub, and LinkedIn along with a return-to-origin control.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, ArrowUp } from 'lucide-react';
import { PortfolioData, SectionId } from '@/types/portfolio';

interface ContactSectionProps {
  data: PortfolioData;
  onNavigate: (sectionId: SectionId, index: number) => void;
}

export default function ContactSection({
  data,
  onNavigate,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 pointer-events-none"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Glassmorphic Contact Command Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 pointer-events-auto rounded-2xl bg-[#090d24]/92 border border-cyan-500/30 p-7 md:p-10 shadow-[0_0_50px_rgba(6,182,212,0.18)]"
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
            <span>05. RELAY VOYAGER IX · DEEP SPACE COMMS</span>
            <span className="text-slate-500 tabular-nums">Z: -138.00</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
          >
            Establish Transmission with {data.name}
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
            Ready to collaborate on modern full-stack web applications with Next.js, TypeScript, and PostgreSQL? Connect via any channel below.
          </p>

          {/* Glowing Contact Buttons */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Email Glowing Button */}
            <a
              href={`mailto:${data.email}`}
              className="group flex flex-col justify-between p-4 rounded-xl bg-[#050816] hover:bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all"
            >
              <div className="flex items-center justify-between text-cyan-300">
                <Mail className="w-5 h-5" />
                <span className="text-[11px] font-mono">EMAIL</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-white truncate">
                  {data.email}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Direct inbox link
                </div>
              </div>
            </a>

            {/* 2. GitHub Glowing Button */}
            <a
              href={
                data.github.startsWith('http')
                  ? data.github
                  : 'https://github.com'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 rounded-xl bg-[#050816] hover:bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-all"
            >
              <div className="flex items-center justify-between text-purple-300">
                <Github className="w-5 h-5" />
                <span className="text-[11px] font-mono">GITHUB</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-white truncate">
                  {data.github}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Source repositories
                </div>
              </div>
            </a>

            {/* 3. LinkedIn Glowing Button */}
            <a
              href={
                data.linkedin.startsWith('http')
                  ? data.linkedin
                  : 'https://linkedin.com'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 rounded-xl bg-[#050816] hover:bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] transition-all"
            >
              <div className="flex items-center justify-between text-blue-300">
                <Linkedin className="w-5 h-5" />
                <span className="text-[11px] font-mono">LINKEDIN</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-white truncate">
                  {data.linkedin}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Professional network
                </div>
              </div>
            </a>
          </div>

          {/* Footer utilities inside Contact card */}
          <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied {data.email}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Email: {data.email}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('hero', 0)}
              className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Return to Origin Beacon</span>
            </button>
          </div>
        </motion.div>

        {/* Right column stays open so the 3D Rocket & Satellite are 100% unobstructed */}
        <div className="hidden lg:block lg:col-span-5" />
      </div>
    </section>
  );
}
