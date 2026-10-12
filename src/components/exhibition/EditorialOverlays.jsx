import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Compass, Award, ShieldCheck } from 'lucide-react';
import { threeEvents } from '../../data/threeEventsData';

export function EditorialOverlays({ progress, onStart, onReturn }) {
  // Determine active view mode based on progress
  let activeState = 'intro';
  let activeEvent = null;

  if (progress < 0.14) {
    activeState = 'intro';
  } else if (progress < 0.42) {
    activeState = 'exhibit-1';
    activeEvent = threeEvents[0];
  } else if (progress < 0.70) {
    activeState = 'exhibit-2';
    activeEvent = threeEvents[1];
  } else if (progress < 0.92) {
    activeState = 'exhibit-3';
    activeEvent = threeEvents[2];
  } else {
    activeState = 'outro';
  }

  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none flex flex-col justify-between p-6 sm:p-12">
      {/* ========================================================
          1. INTRO OVERLAY (scroll < 0.14)
          ======================================================== */}
      {activeState === 'intro' && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-between items-center text-center max-w-4xl mx-auto w-full"
        >
          {/* Top Institutional Header */}
          <div className="pointer-events-auto flex items-center gap-2 text-xs font-mono tracking-widest text-[#9494a6] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            <span>BMS Institute of Technology & Management • Bengaluru</span>
          </div>

          {/* Center Brand Identity (Positioned above the 3D VR Headset) */}
          <div className="pointer-events-auto space-y-3 -mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181724]/80 border border-[#302c42] text-[11px] font-mono text-[#c4b5fd]">
              <span>SPATIAL COMPUTING // 3D TIMELINE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
              AR VR <span className="font-serif italic font-normal text-[#c4b5fd]">Hub</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#a3a3b5] font-light max-w-md mx-auto leading-relaxed">
              Beyond Reality — An editorial 3D journey through our flagship milestones, national awards, and virtual reality deployments.
            </p>
          </div>

          {/* Bottom Action Prompt */}
          <div className="pointer-events-auto space-y-2">
            <button
              onClick={onStart}
              className="px-6 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#1d1b28] hover:bg-[#282538] text-white border border-[#3b364e] transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Exhibition</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#8b5cf6]" />
            </button>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#6f6f82]">
              Scroll down to travel along the timeline
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          2. EXHIBIT LABELS (0.14 <= scroll < 0.92)
          ======================================================== */}
      {activeEvent && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto absolute my-auto top-1/4 max-w-md xl:max-w-lg p-6 sm:p-8 rounded-xl bg-[#111116]/85 backdrop-blur-md border border-[#23232c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-[#dedee8] space-y-3.5 ${
              activeState === 'exhibit-2'
                ? 'left-6 sm:left-14 text-left' // Exhibit 2 3D frame is on right, label is on left
                : 'right-6 sm:right-14 text-left' // Exhibit 1 & 3 3D frames are on left, label is on right
            }`}
          >
            {/* Header / Number */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#88889c] pb-2 border-b border-[#21212b]">
              <span className="flex items-center gap-2 text-[#c4b5fd]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                EXHIBIT {activeEvent.number} // 03
              </span>
              <span>{activeEvent.year}</span>
            </div>

            {/* Category */}
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1c1a27] text-[#c4b5fd] border border-[#352f48]">
                {activeEvent.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white leading-snug tracking-tight">
                {activeEvent.title}
              </h2>
              {activeEvent.subtitle && (
                <p className="text-xs text-[#a78bfa] mt-1 font-light tracking-wide">
                  {activeEvent.subtitle}
                </p>
              )}
              <div className="text-xs font-mono text-[#747488] mt-1">
                {activeEvent.date}
              </div>
            </div>

            {/* Description from official report */}
            <p className="text-xs sm:text-sm text-[#b2b2c2] font-sans leading-relaxed font-light">
              {activeEvent.description}
            </p>

            {/* Metrics & Association */}
            <div className="pt-2 border-t border-[#1e1e28] text-xs text-[#9a9aa8] space-y-1">
              <div className="font-mono text-[11px] text-[#c4b5fd]">
                {activeEvent.metrics}
              </div>
              <div className="text-[10px] font-mono text-[#666678] flex items-center justify-between pt-1">
                <span>{activeEvent.association}</span>
                <span>REF: {activeEvent.reportPage}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ========================================================
          3. OUTRO / CONCLUDING OVERLAY (scroll >= 0.92)
          ======================================================== */}
      {activeState === 'outro' && (
        <motion.div
          key="outro"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto my-auto max-w-xl mx-auto w-full p-8 rounded-2xl bg-[#111116]/90 backdrop-blur-md border border-[#24242e] shadow-2xl text-center space-y-5 text-[#dedee8]"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#8b5cf6]">
            TIMELINE CONCLUDED
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Beyond Reality — The Future of AR VR HUB
          </h2>

          <p className="text-xs sm:text-sm text-[#9c9cb0] font-light leading-relaxed max-w-md mx-auto">
            From hands-on MetaQuest development to national awards at SRISHTI '24 and state honors at ANVESHANA '25, our club continues to advance spatial computing at BMSIT&M.
          </p>

          <div className="p-4 rounded-xl bg-[#16151f] border border-[#272535] text-xs text-left space-y-1.5 text-[#9e9eb2]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#c4b5fd] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8b5cf6]" />
              <span>Executive Faculty Coordinators</span>
            </div>
            <p className="font-light">
              <strong>Dr. Srivani P</strong> (AIML) & <strong>Prof. Bharathi R</strong> (CSE), Chief Faculty Advisor <strong>Dr. Durga Bhavani A</strong> (CSE), with Convenors <strong>Dr. Thippeswamy G</strong> (HoD CSE) & <strong>Dr. Anupama H S</strong> (HoD AIML).
            </p>
          </div>

          <div>
            <button
              onClick={onReturn}
              className="px-6 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[#1d1b28] hover:bg-[#2b273d] text-white border border-[#3b364e] transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#8b5cf6]" />
              <span>Return to Intro</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
