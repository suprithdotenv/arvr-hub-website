import React from 'react';
import { threeEvents } from '../../data/threeEventsData';

export function MinimalNav({ progress, onJump }) {
  return (
    <>
      {/* Top Understated Editorial Bar */}
      <header className="fixed top-0 inset-x-0 z-40 pointer-events-auto bg-[#0c0c10]/80 backdrop-blur-md border-b border-[#1c1c24] py-3 px-6 sm:px-10 flex items-center justify-between text-xs text-[#8a8a9c] font-mono select-none">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-[#3b3252]">
            <img src="/assets/logo.png" alt="AR VR HUB" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white font-medium tracking-wider">AR VR HUB</span>
            <span className="text-[#5e5e70] ml-2 hidden sm:inline">• BMSIT&M</span>
          </div>
        </div>

        {/* 3 Exhibit Jump Anchors */}
        <nav className="flex items-center gap-2 sm:gap-3 text-[11px]">
          <button
            onClick={() => onJump(0)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress < 0.14 ? 'text-white bg-[#1e1c28]' : 'text-[#747486] hover:text-white'
            }`}
          >
            Intro
          </button>
          <button
            onClick={() => onJump(0.28)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress >= 0.14 && progress < 0.42 ? 'text-white bg-[#1e1c28] font-bold' : 'text-[#747486] hover:text-white'
            }`}
          >
            01 Launch
          </button>
          <button
            onClick={() => onJump(0.56)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress >= 0.42 && progress < 0.70 ? 'text-white bg-[#1e1c28] font-bold' : 'text-[#747486] hover:text-white'
            }`}
          >
            02 Srishti
          </button>
          <button
            onClick={() => onJump(0.81)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress >= 0.70 && progress < 0.92 ? 'text-white bg-[#1e1c28] font-bold' : 'text-[#747486] hover:text-white'
            }`}
          >
            03 Honors
          </button>
        </nav>
      </header>

      {/* Bottom Fine 2px Progress Line */}
      <footer className="fixed bottom-0 inset-x-0 z-40 pointer-events-none pb-2 px-6 sm:px-10 flex flex-col justify-end select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#6c6c7e] mb-1">
          <div>
            {progress < 0.14
              ? 'INTRODUCTION // 3D ARTIFACT'
              : progress < 0.42
              ? 'EXHIBIT 01: OFFICIAL LAUNCH & VR FACTORY'
              : progress < 0.70
              ? 'EXHIBIT 02: SRISHTI 2024 NATIONAL 3RD PRIZE'
              : progress < 0.92
              ? 'EXHIBIT 03: META LLM & ANVESHANA HONORS'
              : 'CONCLUSION // AR VR HUB'}
          </div>
          <div>{Math.round(progress * 100)}%</div>
        </div>

        <div className="w-full h-[2px] bg-[#171720] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#c4b5fd] transition-all duration-100"
            style={{ width: `${Math.max(1, progress * 100)}%` }}
          />
        </div>
      </footer>
    </>
  );
}
