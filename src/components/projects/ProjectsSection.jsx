import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, Cpu, Layers, ExternalLink, CheckCircle, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [modalProject, setModalProject] = useState(null);

  const triggerCelebrate = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#ec4899', '#06b6d4']
    });
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/50 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Innovations & Breakthroughs</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text-purple">
          Documented Research & Projects
        </h2>

        <p className="mt-4 text-base sm:text-lg text-purple-200/80 font-light">
          Real student and departmental innovations validated by national juries, industry mentors, and research grants.
        </p>
      </div>

      {/* Interactive Project Showcase Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {projectsData.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  setSelectedProject(project);
                  if (project.id === 'wonderlens') triggerCelebrate();
                }}
                className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-900/60 to-pink-950/40 border-pink-500/50 shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                    : 'bg-purple-950/20 hover:bg-purple-900/30 border-purple-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-900/80 text-pink-300 mb-1.5 border border-purple-500/30">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs text-amber-300/90 font-medium mt-1">
                      {project.award}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isSelected ? 'text-pink-400 translate-x-1' : 'text-purple-400/50'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Active Project Holographic Detail Card */}
        <div className="lg:col-span-7">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#130926]/90 border border-purple-500/40 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />

            {/* Project Image Frame */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-purple-500/30">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130926] via-transparent to-transparent opacity-80" />

              {/* Award Ribbon */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/50 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{selectedProject.award}</span>
              </div>
            </div>

            {/* Project Title & Department */}
            <div>
              <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                Source Verified: {selectedProject.reportPage}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-purple-300/80 mt-0.5">
                Developed under: {selectedProject.department}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-light">
              {selectedProject.description}
            </p>

            {/* Key Highlights Bullet points */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Key Accomplishments & Outcomes
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-purple-200/80">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Inspection Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setModalProject(selectedProject)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Full Project Blueprint</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blueprint Inspection Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#140828] border border-purple-500/40 p-6 sm:p-8 text-white space-y-5"
            >
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-mono text-pink-400">{modalProject.category}</span>
                <h3 className="text-2xl font-black mt-1">{modalProject.title}</h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">{modalProject.award}</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-purple-500/30 aspect-[16/10]">
                <img src={modalProject.image} alt={modalProject.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-sm text-purple-200/90 leading-relaxed">
                {modalProject.description}
              </p>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-purple-300">
                <strong>Archive Verification: </strong> Documented in BMSIT&M AR VR HUB report ({modalProject.reportPage}) with live student deployment.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
