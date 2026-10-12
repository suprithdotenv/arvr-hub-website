import React from 'react';
import { ArrowUp, Sparkles, MapPin, Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/20 bg-[#070311] text-purple-300 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand Block */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <img src="/assets/logo.png" alt="AR VR HUB" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-black text-xl text-white">
              <span>AR VR</span>
              <span className="text-pink-400 font-serif italic">Hub</span>
            </div>
            <p className="text-xs text-purple-400 font-medium">
              BMS Institute of Technology & Management
            </p>
            <p className="text-[11px] text-purple-400/60 mt-0.5">
              Yelahanka, Bengaluru - 560119, Karnataka
            </p>
          </div>
        </div>

        {/* Archival Note */}
        <div className="text-center md:text-right text-xs text-purple-300/70 space-y-1">
          <div className="flex items-center justify-center md:justify-end gap-1.5 text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Built from Official AR VR HUB Activity Report</span>
          </div>
          <p className="text-[11px] text-purple-400/60">
            Departments of Computer Science & Engineering and Artificial Intelligence & Machine Learning
          </p>
          <p className="text-[10px] text-purple-500/50 font-mono">
            Powered by Three.js & WebGL 2.0 • 2024–2026
          </p>
        </div>

        {/* Back to top button */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/60 transition-all cursor-pointer shadow-lg"
            title="Return to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
