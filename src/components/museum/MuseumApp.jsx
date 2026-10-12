import React, { useState, useEffect, useRef } from 'react';
import { MuseumScene } from './MuseumScene';
import { MuseumOpening } from './MuseumOpening';
import { MuseumClosing } from './MuseumClosing';
import { MuseumPlacard } from './MuseumPlacard';
import { MuseumGuideBar } from './MuseumGuideBar';
import { curatedExhibits } from '../../data/curatedExhibits';

export function MuseumApp() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeExhibitIndex, setActiveExhibitIndex] = useState(-1);
  const scrollContainerRef = useRef(null);

  const totalSteps = curatedExhibits.length + 2; // Vestibule (1) + Exhibits (4) + Rotunda (1)

  // Track window scroll progress smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const p = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific scroll progress
  const scrollToProgress = (targetProgress) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    });
  };

  // Jump to specific exhibit index (0 to 3)
  const handleJumpToIndex = (index) => {
    const targetP = (index + 1) / totalSteps;
    scrollToProgress(targetP);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const stepDistance = maxScroll / totalSteps;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        window.scrollBy({ top: stepDistance, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        window.scrollBy({ top: -stepDistance, behavior: 'smooth' });
      } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: maxScroll, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSteps]);

  const activeEvent =
    activeExhibitIndex >= 0 && activeExhibitIndex < curatedExhibits.length
      ? curatedExhibits[activeExhibitIndex]
      : null;

  const isEvenWall = activeExhibitIndex >= 0 ? activeExhibitIndex % 2 === 0 : true;

  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* 1. Persistent 3D Three.js Museum Scene */}
      <MuseumScene
        progress={scrollProgress}
        onActiveExhibitChange={(idx) => setActiveExhibitIndex(idx)}
      />

      {/* 2. Top & Bottom Curatorial Guide Bar */}
      <MuseumGuideBar
        progress={scrollProgress}
        activeIndex={activeExhibitIndex}
        onJumpToIndex={handleJumpToIndex}
        onJumpToSection={(target) => scrollToProgress(target)}
      />

      {/* 3. Opening Vestibule Landing Slide (At scroll = 0, frames the 3D VR Headset) */}
      {scrollProgress < 0.08 && (
        <MuseumOpening onStartScroll={() => scrollToProgress(1 / totalSteps)} />
      )}

      {/* 4. Museum Placard (Adjacent to active physical framed exhibit) */}
      {scrollProgress >= 0.08 && scrollProgress <= 0.92 && activeEvent && (
        <MuseumPlacard
          event={activeEvent}
          index={activeExhibitIndex}
          totalEvents={curatedExhibits.length}
          isEvenWall={isEvenWall}
        />
      )}

      {/* 5. Closing Rotunda Hall Overlay (At end of exhibition) */}
      {scrollProgress > 0.92 && (
        <MuseumClosing onReturnToTop={() => scrollToProgress(0)} />
      )}

      {/* 6. Virtual Scroll Track Controller */}
      <div
        ref={scrollContainerRef}
        style={{ height: `${totalSteps * 130}vh` }}
        className="relative pointer-events-none w-full"
      />
    </div>
  );
}
