import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Compass, Sparkles, Orbit } from 'lucide-react';

export function MuseumOpening({ onStartScroll }) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Header Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <img
              src="/assets/logo.png"
              alt="AR VR HUB"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-lg tracking-wider text-white">
              <span>AR VR</span>
              <span className="text-pink-400 font-serif italic text-base">Hub</span>
            </div>
            <p className="text-[10px] font-mono text-[#a5a5bb] uppercase tracking-widest">
              BMS Institute of Technology & Management • Bengaluru
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181622]/80 border border-[#3b3252] text-xs font-mono text-[#c4b5fd]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>VIRTUAL 3D ARCHITECTURAL EXHIBITION</span>
        </div>
      </motion.div>

      {/* Center Screen: Pure negative space so the 3D VR Headset on the pedestal is fully visible! */}
      <div className="flex-1 flex items-center justify-center pointer-events-none" />

      {/* Bottom Stage: Clear Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-auto max-w-xl mx-auto w-full text-center space-y-3 pb-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Spatial Computing & Immersive Heritage
          </h1>
          <p className="text-xs sm:text-sm text-[#9e9eb0] font-light mt-1">
            Explore 20+ documented workshops, hackathons, and research breakthroughs in an architectural 3D museum.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            onClick={onStartScroll}
            className="px-7 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span>Enter Exhibition Tour</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#78788c] uppercase tracking-widest pt-1">
          <span>Scroll down to walk forward</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#8b5cf6] animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
}
