import React from 'react';
import { clubInfo } from '../../data/clubInfo';
import { motion } from 'framer-motion';
import { Shield, Users, CheckCircle, GraduationCap, MapPin, Building2, Calendar, Award, FileText } from 'lucide-react';

export function AboutSection() {
  const { leadership, objectives, stats } = clubInfo;

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Institutional Charter</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text-purple">
          About AR VR HUB
        </h2>

        <p className="mt-4 text-base sm:text-lg text-purple-200/80 font-light">
          Founded on January 1, 2024, at BMS Institute of Technology & Management to empower students with hands-on mastery over spatial computing and immersive technologies.
        </p>
      </div>

      {/* Institutional Credentials Banner */}
      <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#170a30] via-[#100624] to-[#170a30] border border-purple-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-2xl bg-black/50 border border-purple-400/40 p-2 flex items-center justify-center shrink-0">
              <img src="/assets/events/page_1_img_1.jpeg" alt="BMSIT Logo" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                BMS Institute of Technology & Management
              </h3>
              <p className="text-xs sm:text-sm text-purple-300/80 mt-0.5">
                An Autonomous Institute Under VTU, Accredited by NBA and NAAC
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-cyan-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Yelahanka, Bengaluru - 560119, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-900/60 text-purple-200 border border-purple-500/30">
              Dept. of CSE
            </span>
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-pink-900/60 text-pink-200 border border-pink-500/30">
              Dept. of AIML
            </span>
          </div>
        </div>
      </div>

      {/* Core Objectives (Verbatim from Page 1 of Report) */}
      <div className="mb-20">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-pink-400" />
          <span>Core Club Objectives</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#120826]/70 border border-purple-500/20 hover:border-purple-400/40 transition-colors flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-900/50 border border-purple-400/40 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-light">
                {obj}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Roles & Leadership (Verbatim from Page 1, 20 & 21 of Report) */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <span>Faculty Leadership & Coordinators</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leadership.map((person, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#1b0c36] to-[#0f0620] border border-purple-500/30 shadow-lg space-y-3"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-950/80 text-pink-300 border border-purple-500/30">
                {person.role}
              </span>
              <div>
                <h4 className="text-lg font-bold text-white">{person.name}</h4>
                <p className="text-xs text-purple-300/80 mt-0.5">{person.designation}</p>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">{person.department}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Official Sign-off & Archival Stamp */}
      <div className="mt-16 p-6 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/70">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>
            Certified from AR VR HUB Official Report signed by Faculty Coordinator & Principal, BMSIT&M.
          </span>
        </div>
        <div className="font-mono text-pink-400">
          VTU Autonomous • Bengaluru
        </div>
      </div>
    </section>
  );
}
