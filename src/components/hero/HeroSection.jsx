import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { clubInfo } from '../../data/clubInfo';
import { motion } from 'framer-motion';
import { Compass, Award, Box, ArrowDown, Sparkles, Globe, Orbit, ShieldCheck } from 'lucide-react';
import { cyberAudio } from '../../utils/cyberAudio';

export function HeroSection({ onExploreTimeline, onExploreProjects, onExploreHardware }) {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#06020c]">
      {/* ========================================================
          SCI-FI OBSERVATION BRIDGE & PANORAMIC SPACE WINDOWS
          (Direct visual translation of user's reference mockup Image 1)
          ======================================================== */}
      {/* Panoramic Celestial Nebula & Distant Planet Atmosphere */}
      <div className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_90%_70%_at_50%_10%,rgba(147,51,234,0.25),rgba(5,2,14,0.95))] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-36 right-1/4 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid Floor & Station Curved Windows Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Station HUD Callouts */}
        <div className="flex items-center justify-between text-xs text-purple-300/70 mb-4 px-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono uppercase tracking-widest text-cyan-300">
              ORBITAL OBSERVATION DECK // BMSIT&M
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-pink-400 uppercase tracking-wider mx-auto sm:mx-0">
            <Orbit className="w-3.5 h-3.5" />
            <span>VTU AUTONOMOUS • SPATIAL LAB 2024–2026</span>
          </div>
        </div>

        {/* Central Brand Typography Header (Image 1 Style) */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>BMS INSTITUTE OF TECHNOLOGY & MANAGEMENT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white glow-text-purple uppercase"
          >
            AR VR{' '}
            <span className="font-serif italic font-normal text-pink-400 lowercase tracking-normal">
              Hub
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-purple-300 uppercase tracking-widest"
          >
            <span className="text-cyan-400">EXPLORE</span>
            <span className="text-pink-500">•</span>
            <span className="text-purple-300">CREATE</span>
            <span className="text-pink-500">•</span>
            <span className="text-cyan-400">COLLABORATE</span>
            <span className="text-pink-500">•</span>
            <span className="text-white font-bold">BEYOND REALITY</span>
          </motion.div>
        </div>

        {/* ========================================================
            3D INTERACTIVE VR HEADSET ON SCI-FI PEDESTAL
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative my-2"
        >
          {/* Floating Right Holographic Banner (Image 1 Style) */}
          <div className="hidden xl:block absolute right-6 top-1/3 z-20 max-w-xs p-4 rounded-2xl bg-[#170a30]/80 border border-purple-500/40 backdrop-blur-xl shadow-2xl text-left pointer-events-none">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              MISSION CHARTER
            </span>
            <p className="text-xs font-bold uppercase tracking-wider text-white leading-relaxed">
              IMMERSIVE TECHNOLOGY FOR A BRIGHTER TOMORROW
            </p>
          </div>

          {/* Floating Left "Scroll to Explore" Prompt (Image 1 Style) */}
          <div className="hidden xl:flex flex-col items-center absolute left-6 top-1/3 z-20 text-purple-400 text-xs font-mono tracking-widest uppercase">
            <span className="[writing-mode:vertical-lr] mb-2 tracking-widest text-purple-300/80">
              SCROLL TO EXPLORE
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-pink-400" />
          </div>

          {/* 3D Canvas with Headset */}
          <HeroCanvas />
        </motion.div>

        {/* Action Buttons to Jump Directly into the 3D Experience */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onExploreTimeline();
            }}
            className="px-8 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
          >
            <Compass className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Launch 3D Timeline Journey</span>
          </button>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onExploreProjects();
            }}
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 hover:border-pink-500/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Verified Projects</span>
          </button>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onExploreHardware();
            }}
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Box className="w-4 h-4 text-cyan-400" />
            <span>Lab Hardware</span>
          </button>
        </div>

        {/* High-Level Impact Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 max-w-5xl mx-auto">
          {clubInfo.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-[#130728]/70 border border-purple-500/25 text-center shadow-lg relative overflow-hidden group hover:border-purple-400/50 transition-colors"
            >
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-600/10 rounded-full blur-xl group-hover:bg-pink-600/20 transition-all" />
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300">
                {stat.value}
              </div>
              <div className="text-xs text-purple-300/80 font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
