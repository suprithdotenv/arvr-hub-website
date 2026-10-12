import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './sections/Hero';
import { EventsSection } from './sections/EventsSection';
import { AboutSection } from './sections/About';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track global scroll for active nav section state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'events', 'about'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f7f7f4] selection:bg-[#7a6691] selection:text-white font-sans antialiased overflow-x-clip">
      {/* 1. Fast, dignified intro loading screen */}
      <LoadingScreen />

      {/* 2. Fixed Minimalist Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <EventsSection />
        <AboutSection />
      </main>

      {/* 4. Minimalist Institutional Footer */}
      <Footer />
    </div>
  );
}
