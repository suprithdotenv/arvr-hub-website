import React, { useState, useEffect, useRef } from 'react';
import { CinematicScene } from './CinematicScene';
import { EditorialOverlays } from './EditorialOverlays';
import { MinimalNav } from './MinimalNav';

export function ExhibitionMaster() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Smooth native window scroll tracking
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const stepDistance = maxScroll / 4.2;

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
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0c0c10] text-slate-100 selection:bg-purple-600 selection:text-white font-sans overflow-x-hidden">
      {/* 1. Persistent 3D Three.js Cinematic Scene */}
      <CinematicScene progress={scrollProgress} />

      {/* 2. Top & Bottom Minimalist Curatorial Navigation */}
      <MinimalNav progress={scrollProgress} onJump={scrollToProgress} />

      {/* 3. HTML Editorial Typography Overlays */}
      <EditorialOverlays
        progress={scrollProgress}
        onStart={() => scrollToProgress(0.28)}
        onReturn={() => scrollToProgress(0)}
      />

      {/* 4. Virtual Scroll Height Controller (450vh total travel distance) */}
      <div
        ref={containerRef}
        style={{ height: '460vh' }}
        className="relative pointer-events-none w-full"
      />
    </div>
  );
}
