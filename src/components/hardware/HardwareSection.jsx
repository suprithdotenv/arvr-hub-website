import React from 'react';
import { clubInfo } from '../../data/clubInfo';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Zap, Wind, Monitor, Shield, Layers, Box, CheckCircle } from 'lucide-react';

export function HardwareSection() {
  const { labHardware } = clubInfo;

  return (
    <section id="hardware" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Research Infrastructure</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text-purple">
          AR VR Lab System Specifications
        </h2>

        <p className="mt-4 text-base sm:text-lg text-purple-200/80 font-light">
          Dedicated high-performance graphics workstations and spatial computing gear officially commissioned at the Department of CSE & AIML at BMSIT&M.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* AMWIN GPU High-Performance Workstation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 rounded-3xl bg-[#120826]/90 border border-purple-500/35 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          {/* Top accent light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                REPORT SPECIFICATION: PAGE 19
              </span>
              <span className="text-xs text-purple-400 font-mono">BMSIT&M Dedicated Lab</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Cpu className="w-7 h-7 text-pink-400" />
              <span>{labHardware.workstation.model}</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
              Engineered for real-time 3D rendering, Unity shader compilation, and AI spatial training.
            </p>

            {/* Hardware Specification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {labHardware.workstation.specs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/40 transition-colors"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400/90 block">
                    {item.label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white mt-0.5 leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300/70">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Active in AR/VR Research & Development Lab
            </span>
            <span className="font-mono text-cyan-400">AM5 Socket / 5200MHz DDR5</span>
          </div>
        </motion.div>

        {/* Meta Quest 2 Hardware System Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 rounded-3xl bg-[#120826]/90 border border-purple-500/35 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-950/60 text-pink-300 border border-pink-500/40">
                REPORT SPECIFICATION: PAGE 20
              </span>
              <span className="text-xs text-pink-400 font-mono">Immersive Spatial Unit</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Box className="w-7 h-7 text-cyan-400" />
              <span>{labHardware.immersiveGear.model}</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
              Untethered 6DOF spatial computing headset deployed for student projects and VR factories.
            </p>

            {/* Gear Image */}
            <div className="my-6 rounded-2xl overflow-hidden border border-purple-500/30 bg-black/60 aspect-[16/9] flex items-center justify-center p-2">
              <img
                src="/assets/events/page_20_img_1.jpeg"
                alt="Meta Quest 2 Gear"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Package Contents List */}
            <ul className="space-y-2">
              {labHardware.immersiveGear.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-200/90">
                  <CheckCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/20 text-xs text-purple-300/70">
            <span>Used across workshops, hackathons, and capstone research deployments.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
