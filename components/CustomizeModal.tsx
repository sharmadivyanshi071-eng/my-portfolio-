'use client';

// components/CustomizeModal.tsx
// Allows the developer or visitor to live-edit the placeholder fields ([Tumhara Naam], etc.)
// and immediately see the 3D holographic nameplate and glass cards update in real time.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check } from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA, PortfolioData } from '@/types/portfolio';

interface CustomizeModalProps {
  isOpen: boolean;
  data: PortfolioData;
  onSave: (updated: PortfolioData) => void;
  onClose: () => void;
}

export default function CustomizeModal({
  isOpen,
  data,
  onSave,
  onClose,
}: CustomizeModalProps) {
  const [formState, setFormState] = useState<PortfolioData>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    onClose();
  };

  const handleReset = () => {
    setFormState(INITIAL_PORTFOLIO_DATA);
    onSave(INITIAL_PORTFOLIO_DATA);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="customize-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            key="customize-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-[#0a0e24] border border-cyan-500/30 p-6 md:p-7 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Customize Portfolio Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your name, bio, and links in real time across the 3D galaxy.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={formState.role}
                    onChange={(e) =>
                      setFormState({ ...formState, role: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) =>
                    setFormState({ ...formState, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  About (2–3 lines)
                </label>
                <textarea
                  rows={2}
                  value={formState.about}
                  onChange={(e) =>
                    setFormState({ ...formState, about: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="text"
                    value={formState.github}
                    onChange={(e) =>
                      setFormState({ ...formState, github: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    LinkedIn Link
                  </label>
                  <input
                    type="text"
                    value={formState.linkedin}
                    onChange={(e) =>
                      setFormState({ ...formState, linkedin: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-xs font-semibold text-slate-950 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Changes</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
