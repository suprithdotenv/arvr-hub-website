import React, { useState, useEffect, useRef } from 'react';
import { eventsData } from '../../data/eventsData';
import { TimelineCanvas3D } from '../3d/TimelineCanvas3D';
import { cyberAudio } from '../../utils/cyberAudio';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Compass,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  Users,
  Award,
  Eye,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
  BookOpen
} from 'lucide-react';

export function Dynamic3DTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('kiosk'); // 'kiosk' or 'tunnel'
  const [isMuted, setIsMuted] = useState(false);
  const [inspectModal, setInspectModal] = useState(null);

  const containerRef = useRef(null);
  const activeEvent = eventsData[currentIndex];

  // Auto-advance timeline if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % eventsData.length);
      cyberAudio.playSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (inspectModal) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, inspectModal]);

  const goToNext = () => {
    cyberAudio.playSlide();
    setCurrentIndex((prev) => (prev + 1) % eventsData.length);
  };

  const goToPrev = () => {
    cyberAudio.playSlide();
    setCurrentIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);
  };

  const selectIndex = (idx) => {
    cyberAudio.playClick();
    setCurrentIndex(idx);
  };

  const toggleSound = () => {
    const muted = cyberAudio.toggleMute();
    setIsMuted(muted);
  };

  // Group years for timeline milestones
  const years = ['2023', '2024', '2025'];

  return (
    <section id="events" className="relative py-20 sm:py-28 overflow-hidden bg-[#06020c]">
      {/* Sci-Fi Space Station Panoramic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(168,85,247,0.2),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cybernetic Grid Floor Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #c084fc 1px, transparent 1px), linear-gradient(to bottom, #c084fc 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* ========================================================
            TOP HEADER (Inspired by Reference Mockup Image 1)
            ======================================================== */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-xs font-semibold text-pink-300 uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive 3D Journey</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white glow-text-purple">
              Our <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Journey</span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-light max-w-xl">
              A dynamic timeline of workshops, exhibitions, collaborations, and immersive experiences popping in 3D along our spatial path.
            </p>
          </div>

          {/* Mode Switcher & Audio Controls */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Holographic Kiosk vs 3D Tunnel */}
            <div className="flex items-center p-1 rounded-xl bg-purple-950/60 border border-purple-500/30">
              <button
                onClick={() => {
                  setViewMode('kiosk');
                  cyberAudio.playClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'kiosk'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] font-semibold'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Kiosk</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('tunnel');
                  cyberAudio.playClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'tunnel'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)] font-semibold'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-cyan-300" />
                <span>3D Spline Tunnel</span>
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white transition-all cursor-pointer shadow-lg"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
            </button>

            {/* Play/Pause Autoplay */}
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                cyberAudio.playClick();
              }}
              className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white transition-all cursor-pointer shadow-lg"
              title={isPlaying ? 'Pause Auto-Advance' : 'Play Auto-Advance'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-pink-400" /> : <Play className="w-4 h-4 text-cyan-300" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            VIEW MODE A: 3D SPLINE TUNNEL (Three.js WebGL canvas)
            ======================================================== */}
        {viewMode === 'tunnel' ? (
          <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#120726] to-[#080214] p-3 shadow-2xl relative mb-12 overflow-hidden">
            <TimelineCanvas3D activeIndex={currentIndex} onSelectIndex={selectIndex} />

            {/* Quick overlay controls in 3D Tunnel */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-purple-200 bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-purple-500/30">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan-400 font-bold">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(eventsData.length).padStart(2, '0')}
                </span>
                <span className="font-semibold text-white line-clamp-1">{activeEvent.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             VIEW MODE B: DYNAMIC 3D HOLOGRAPHIC KIOSK SHOWCASE
             (Direct translation of Image 1 bottom + Image 2 Unseen Studio)
             ======================================================== */
          <div className="relative mb-14">
            {/* Giant Background Kinetic Parallax Typography (Image 2 style) */}
            <div className="absolute -top-14 left-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.14] flex justify-center">
              <motion.span
                key={activeEvent.year}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="text-[120px] sm:text-[220px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-300 via-pink-400 to-transparent uppercase font-mono"
              >
                {activeEvent.year}
              </motion.span>
            </div>

            {/* Curving 3D Glowing Laser Track across middle (Image 1 style) */}
            <div className="relative w-full h-10 my-4 flex items-center justify-center">
              <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 40">
                <defs>
                  <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="30%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M 0 20 Q 250 5, 500 20 T 1000 20"
                  fill="none"
                  stroke="url(#neonGrad)"
                  strokeWidth="3.5"
                  filter="url(#neonGlow)"
                />
              </svg>

              {/* Pulsing playhead along the curve */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_18px_#22d3ee] transition-all duration-500"
                style={{
                  left: `${((currentIndex + 0.5) / eventsData.length) * 100}%`,
                }}
              />
            </div>

            {/* 3D KIOSK CAROUSEL STAGE */}
            <div className="relative flex items-center justify-center min-h-[500px] sm:min-h-[560px] perspective-[1400px]">
              {/* Previous Slide Ghost (Tilted in 3D space on left) */}
              {eventsData[currentIndex - 1] && (
                <div
                  onClick={goToPrev}
                  className="hidden lg:block absolute left-4 xl:left-8 w-72 h-[380px] rounded-2xl overflow-hidden opacity-35 hover:opacity-70 transition-all duration-500 cursor-pointer border border-purple-500/30 transform -rotate-y-[28deg] translate-z-[-120px] scale-90 shadow-2xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={eventsData[currentIndex - 1].image}
                    alt="Previous Event"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-end">
                    <span className="text-[10px] text-pink-400 font-mono">
                      PREV // {eventsData[currentIndex - 1].year}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">
                      {eventsData[currentIndex - 1].title}
                    </h4>
                  </div>
                </div>
              )}

              {/* Next Slide Ghost (Tilted in 3D space on right) */}
              {eventsData[currentIndex + 1] && (
                <div
                  onClick={goToNext}
                  className="hidden lg:block absolute right-4 xl:right-8 w-72 h-[380px] rounded-2xl overflow-hidden opacity-35 hover:opacity-70 transition-all duration-500 cursor-pointer border border-purple-500/30 transform rotate-y-[28deg] translate-z-[-120px] scale-90 shadow-2xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={eventsData[currentIndex + 1].image}
                    alt="Next Event"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-end">
                    <span className="text-[10px] text-pink-400 font-mono">
                      NEXT // {eventsData[currentIndex + 1].year}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">
                      {eventsData[currentIndex + 1].title}
                    </h4>
                  </div>
                </div>
              )}

              {/* Active Central 3D Futuristic Holographic Kiosk */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, scale: 0.92, y: 20, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20, rotateY: -10 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full max-w-4xl relative z-20"
                >
                  {/* Outer Beveled Sci-Fi Frame with Glowing Pedestal */}
                  <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#2a1352] via-[#15072e] to-[#0a0319] border-2 border-purple-400/50 shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden group">
                    {/* Corner Tech Brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-30" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-30" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-30" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-30" />

                    {/* Frame Top Status Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-purple-500/25 text-xs text-purple-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span className="font-mono text-cyan-300 font-bold">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(eventsData.length).padStart(2, '0')}
                        </span>
                        <span className="text-purple-400 hidden sm:inline">• ARCHIVE REF: {activeEvent.reportPage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-pink-300">
                        <span>{activeEvent.year}</span>
                        <span>•</span>
                        <span>{activeEvent.date}</span>
                      </div>
                    </div>

                    {/* Kiosk Content Grid (Image + Information) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6 items-center">
                      {/* Left: Authentic Report Photograph in 3D Depth Frame */}
                      <div
                        className="md:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden bg-black/80 border border-purple-500/40 shadow-inner group/img cursor-pointer"
                        onClick={() => setInspectModal(activeEvent)}
                      >
                        <img
                          src={activeEvent.image}
                          alt={activeEvent.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-108"
                        />
                        {/* Holographic Scanline Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent opacity-40 pointer-events-none" />
                        
                        {/* Hover Inspect Pill */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/50 text-xs text-white shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Inspect Exhibit</span>
                        </div>
                      </div>

                      {/* Right: Rich Event Factual Details */}
                      <div className="md:col-span-5 flex flex-col justify-center space-y-3.5">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                            {activeEvent.category}
                          </span>
                          {activeEvent.studentsAttended && (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
                              <Users className="w-3 h-3" />
                              <span>{activeEvent.studentsAttended}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {activeEvent.title}
                        </h3>

                        {activeEvent.subtitle && (
                          <p className="text-xs text-pink-300 font-medium">
                            {activeEvent.subtitle}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-light line-clamp-4">
                          {activeEvent.description}
                        </p>

                        <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/25 text-xs text-purple-300">
                          <div className="font-semibold text-white flex items-center gap-1.5 mb-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Association / Collaboration</span>
                          </div>
                          <p className="text-[11px] text-purple-300/80">{activeEvent.association}</p>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            onClick={() => setInspectModal(activeEvent)}
                            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition cursor-pointer flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-300" />
                            <span>View Full Exhibit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3D Illuminated Pedestal Base Beneath Monitor (Image 1 style) */}
                  <div className="relative mx-auto w-48 sm:w-64 h-7 -mt-2 bg-gradient-to-b from-[#3d1976] to-[#0d041e] rounded-b-2xl border-x-2 border-b-2 border-purple-500/40 shadow-[0_15px_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
                    <div className="w-32 h-1 bg-cyan-400/80 rounded-full blur-[2px] animate-pulse" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Floating Navigation Buttons */}
              <button
                onClick={goToPrev}
                className="absolute left-0 sm:-left-4 z-30 p-3 sm:p-4 rounded-full bg-purple-950/80 border border-purple-400/40 text-white hover:bg-purple-800 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Exhibit"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 sm:-right-4 z-30 p-3 sm:p-4 rounded-full bg-purple-950/80 border border-purple-400/40 text-white hover:bg-purple-800 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next Exhibit"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM INTERACTIVE TIMELINE SCRUBBER (Image 2 style)
            ======================================================== */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-[#0e051c]/90 border border-purple-500/30 shadow-2xl">
          {/* Year Milestone Tags */}
          <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300 mb-3 px-2">
            {years.map((year) => {
              const isActiveYear = activeEvent.year === year;
              return (
                <button
                  key={year}
                  onClick={() => {
                    const firstIdx = eventsData.findIndex((e) => e.year === year);
                    if (firstIdx !== -1) selectIndex(firstIdx);
                  }}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    isActiveYear
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.6)] font-black text-sm'
                      : 'text-purple-400/70 hover:text-white'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Dotted Track with Interactive Click Nodes */}
          <div className="relative w-full h-8 flex items-center">
            {/* Background line */}
            <div className="absolute inset-x-0 h-1 bg-purple-950/90 rounded-full" />
            
            {/* Active progress track */}
            <div
              className="absolute left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{
                width: `${(currentIndex / (eventsData.length - 1)) * 100}%`,
              }}
            />

            {/* Individual Event Nodes */}
            <div className="relative w-full flex items-center justify-between z-10">
              {eventsData.map((ev, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={ev.id}
                    onClick={() => selectIndex(idx)}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className={`group relative flex items-center justify-center cursor-pointer transition-transform ${
                      isActive ? 'scale-150' : 'hover:scale-125'
                    }`}
                    title={`${ev.year}: ${ev.title}`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-cyan-300 shadow-[0_0_12px_#38bdf8] ring-2 ring-pink-500'
                          : 'bg-purple-800 group-hover:bg-purple-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Thumbnail Strip Preview below scrubber */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {eventsData.map((ev, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={ev.id}
                  onClick={() => selectIndex(idx)}
                  className={`relative shrink-0 w-20 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    isActive
                      ? 'border-pink-500 ring-2 ring-purple-400 scale-105 shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                      : 'border-purple-500/20 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-center text-purple-200 truncate px-0.5">
                    #{ev.id}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN EXHIBIT LIGHTBOX MODAL
          ======================================================== */}
      <AnimatePresence>
        {inspectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setInspectModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-[#140828] border border-purple-500/40 p-6 sm:p-8 text-white space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setInspectModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-mono text-cyan-400">
                  EXHIBIT #{inspectModal.id} • {inspectModal.date} • {inspectModal.reportPage}
                </span>
                <h3 className="text-2xl font-black mt-1">{inspectModal.title}</h3>
                {inspectModal.subtitle && (
                  <p className="text-sm text-pink-300 mt-0.5">{inspectModal.subtitle}</p>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-purple-500/30 aspect-[16/10] bg-black">
                <img
                  src={inspectModal.image}
                  alt={inspectModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-sm text-purple-200/90 leading-relaxed">
                {inspectModal.description}
              </p>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Verified source from official AR VR HUB report on <strong>{inspectModal.reportPage}</strong>.
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
