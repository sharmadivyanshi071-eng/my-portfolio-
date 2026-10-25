'use client';

// components/LoadingScreen.tsx
// Displays a smooth animated loading screen while the Three.js galaxy initializes.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="space-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] text-white px-6"
        >
          {/* Orbiting rings graphic */}
          <div className="relative w-24 h-24 flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-2 border-purple-500/30 border-b-purple-400"
            />
            <Rocket className="w-8 h-8 text-cyan-300" />
          </div>

          <h2
            className="text-2xl font-bold tracking-tight text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Initializing Galaxy Coordinates
          </h2>
          <p className="text-sm text-slate-400 font-mono">
            Generating procedural planets & starfield...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
