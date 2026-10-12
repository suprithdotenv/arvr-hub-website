import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, ChevronRight, Eye, ShieldCheck, Zap } from 'lucide-react';

export function OpeningSequence({ onEnter }) {
  const [isEntering, setIsEntering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05020a] text-white overflow-hidden select-none"
      >
        {/* Background Cybernetic Grid & Ambient Nebula Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(236,72,153,0.15),rgba(255,255,255,0))]" />
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Ambient Floating Dust / Light Beams */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Top Institutional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-0 right-0 flex flex-col items-center text-center px-4"
        >
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-widest text-purple-300/80 uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>BMS Institute of Technology & Management</span>
          </div>
          <p className="text-[11px] text-purple-400/60 tracking-wider mt-0.5">
            Dept. of CSE & Dept. of AIML • Bengaluru
          </p>
        </motion.div>

        {/* Central Logo & Exhibition Gateway */}
        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto px-6 text-center">
          {/* Animated 3D Logo Container */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.3 }}
            className="relative mb-6 cursor-pointer group"
            onClick={handleStart}
          >
            {/* Holographic Glowing Aura Rings */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur-2xl group-hover:opacity-60 transition duration-700 animate-pulse" />
            
            {/* Spinning decorative orbit ring */}
            <div className="absolute -inset-3 rounded-full border border-purple-500/30 border-dashed animate-spin" style={{ animationDuration: '24s' }} />
            <div className="absolute -inset-6 rounded-full border border-pink-500/20 border-dotted animate-spin" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />

            {/* Official AR VR HUB Logo */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
              <img
                src="/assets/logo.png"
                alt="AR VR HUB Official Logo"
                className="w-full h-full object-cover rounded-full shadow-inner transform group-hover:scale-105 transition duration-500"
              />
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>SPATIAL COMPUTING & VIRTUAL WORLDS</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white glow-text-purple">
              AR VR <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">HUB</span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-purple-200/90 font-light max-w-md mx-auto">
              Beyond Reality — Immersive 3D Exhibition & Innovation Portal
            </p>
          </motion.div>

          {/* Enter Experience Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={handleStart}
              disabled={isEntering}
              className="relative group px-8 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] transition-all duration-300 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Compass className={`w-4 h-4 ${isEntering ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
                {isEntering ? 'Entering Dimension...' : 'Enter 3D Experience'}
              </span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={onEnter}
              className="px-4 py-2 text-xs text-purple-400/80 hover:text-purple-200 underline underline-offset-4 transition cursor-pointer"
            >
              Skip Intro & Jump to Portal
            </button>
          </motion.div>
        </div>

        {/* Footer Technical Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 md:px-12 text-[11px] text-purple-400/50"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>WebGL 2.0 & Three.js Engine Ready</span>
          </div>
          <div>BMSIT&M • Established 2024</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
