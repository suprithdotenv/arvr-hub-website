import React from 'react';
import { curatedExhibits } from '../../data/curatedExhibits';

export function MuseumGuideBar({ progress, activeIndex, onJumpToIndex, onJumpToSection }) {
  const currentEvent =
    activeIndex >= 0 && activeIndex < curatedExhibits.length ? curatedExhibits[activeIndex] : null;

  const getRoomName = () => {
    if (progress < 0.08) return 'Vestibule // 3D VR Artifact';
    if (progress > 0.92) return 'Rotunda // Concluding Hall';
    if (!currentEvent) return 'Exhibition Gallery';
    return currentEvent.room;
  };

  return (
    <>
      {/* Top Curatorial Bar */}
      <header className="fixed top-0 inset-x-0 z-40 pointer-events-auto bg-[#0a0a0e]/85 backdrop-blur-md border-b border-[#1c1c24] py-3 px-6 sm:px-10 flex items-center justify-between text-xs text-[#9090a2] font-mono">
        {/* Brand Plaque */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#3b3252]">
            <img src="/assets/logo.png" alt="AR VR HUB" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white font-medium tracking-wider">AR VR HUB</span>
            <span className="text-[#646476] ml-2 hidden sm:inline">• BMSIT&M</span>
          </div>
        </div>

        {/* Current Gallery Room Indicator */}
        <div className="hidden md:flex items-center gap-2 text-[#c4b5fd] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
          <span>{getRoomName()}</span>
        </div>

        {/* Quick Gallery Leap Links (4 Curated Exhibits) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onJumpToSection(0)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress < 0.08 ? 'text-white bg-[#201d2c]' : 'text-[#7e7e90] hover:text-white'
            }`}
          >
            Entrance
          </button>
          {curatedExhibits.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => onJumpToIndex(idx)}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                activeIndex === idx ? 'text-white bg-[#201d2c] font-bold' : 'text-[#7e7e90] hover:text-white'
              }`}
            >
              Ex. {ex.id}
            </button>
          ))}
          <button
            onClick={() => onJumpToSection(1)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              progress > 0.92 ? 'text-white bg-[#201d2c]' : 'text-[#7e7e90] hover:text-white'
            }`}
          >
            Rotunda
          </button>
        </nav>
      </header>

      {/* Bottom Curatorial Progress */}
      <footer className="fixed bottom-0 inset-x-0 z-40 pointer-events-none pb-2 sm:pb-3 px-6 sm:px-10 flex flex-col justify-end">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#747488] mb-1.5">
          <div className="truncate max-w-xs sm:max-w-md">
            {currentEvent ? (
              <span className="text-[#c0c0d2]">
                EXHIBIT {currentEvent.id} OF {curatedExhibits.length}: {currentEvent.title}
              </span>
            ) : progress < 0.08 ? (
              <span className="text-[#a78bfa]">ENTRANCE // 3D VR HEADSET HERO</span>
            ) : (
              <span>CONCLUDING ROTUNDA // SUMMARY</span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#8a8a9e]">
            <span>SCROLL OR USE ARROW KEYS</span>
            <span className="text-[#a78bfa]">{Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Minimalist 2px Museum Progress Line */}
        <div className="w-full h-[2px] bg-[#1a1a24] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-150"
            style={{ width: `${Math.max(1, progress * 100)}%` }}
          />
        </div>
      </footer>
    </>
  );
}
