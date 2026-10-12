import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Award, Users, Cpu, ShieldCheck } from 'lucide-react';
import { clubInfo } from '../../data/clubInfo';

export function MuseumClosing({ onReturnToTop }) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center p-6 sm:p-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-auto max-w-3xl w-full p-8 sm:p-10 rounded-2xl bg-[#0f0f15]/90 backdrop-blur-xl border border-[#242430] shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-6 text-[#dedee8]"
      >
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8b5cf6]">
            ROTUNDA // CONCLUDING GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white mt-1">
            The Journey Continues
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9eb0] font-light mt-2 max-w-xl mx-auto leading-relaxed">
            From our founding on January 1, 2024, through over twenty workshops, hackathons, and state honors, the AR VR HUB remains dedicated to advancing spatial computing at BMSIT&M.
          </p>
        </div>

        {/* Impact Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#20202a]">
          {clubInfo.stats.map((stat, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#14141c]">
              <div className="text-2xl font-serif text-white font-medium">{stat.value}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#88889a] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Curatorial & Faculty Leadership Notice */}
        <div className="text-left p-4 rounded-xl bg-[#14131d] border border-[#252433] text-xs text-[#a0a0b2] space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#c4b5fd] uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>Executive Faculty Leadership</span>
          </div>
          <p className="font-light leading-relaxed">
            Coordinated by <strong>Dr. Srivani P</strong> (AIML) and <strong>Prof. Bharathi R</strong> (CSE), with Chief Faculty Advisor <strong>Dr. Durga Bhavani A</strong> (CSE) and Convenors <strong>Dr. Thippeswamy G</strong> (HoD CSE), <strong>Dr. Anupama H S</strong> (HoD AIML), and <strong>Dr. Satish Kumar T</strong>.
          </p>
          <div className="text-[10px] font-mono text-[#68687a]">
            Verified archive documentation from the official report submitted to the Principal of BMSIT&M.
          </div>
        </div>

        {/* Return to Vestibule Button */}
        <div>
          <button
            onClick={onReturnToTop}
            className="px-6 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[#1e1c2a] hover:bg-[#2b273d] text-[#e0e0ee] border border-[#37324b] transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg hover:border-[#8b5cf6]"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>Return to Museum Vestibule</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
