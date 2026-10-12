import React from 'react';
import { ArrowUp, MapPin, Globe } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08080a] border-t border-white/[0.07] text-[#9c9ca1] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Identity column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#141418] border border-white/10 p-1 flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="AR VR HUB Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-bold text-base font-editorial text-[#f7f7f4] tracking-wider">
                  AR VR <span className="font-serif-accent italic font-normal text-[#c8b9db]">hub</span>
                </span>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#787880]">
                  Immersive Technology Laboratory
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#95959e] max-w-md leading-relaxed font-light">
              Dedicated to pioneering spatial computing, augmented reality, virtual reality simulation, and interactive human-computer interfaces at BMS Institute of Technology & Management.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a92] pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#9d85b5] shrink-0" />
              <span>Yelahanka, Bengaluru – 560064, Karnataka, India</span>
            </div>
          </div>

          {/* Institutional Affiliation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#dcdcd8]">
              Institution
            </h4>
            <div className="text-xs text-[#8a8a92] space-y-1.5 leading-relaxed">
              <p className="font-medium text-[#f7f7f4]">
                BMS Institute of Technology & Management
              </p>
              <p>Autonomous Institution under VTU</p>
              <p>Department of Computer Science & Engineering</p>
              <p>Department of Artificial Intelligence & Machine Learning</p>
            </div>
          </div>

          {/* Channels & Official Links Placeholder */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#dcdcd8]">
              Connect
            </h4>
            <div className="flex flex-col gap-2 text-xs text-[#8a8a92]">
              <div className="flex items-center gap-2 hover:text-[#f7f7f4] transition-colors cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-[#9d85b5]" />
                <span>BMSIT&M Official Portal</span>
              </div>
              <p className="text-[11px] text-[#606068] italic mt-2">
                Official club social channels and member registry will be linked following the verified club charter.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#686870]">
          <p>© 2024–2026 AR VR HUB, BMS Institute of Technology & Management. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#8a8a92] hover:text-[#f7f7f4] transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#9d85b5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
