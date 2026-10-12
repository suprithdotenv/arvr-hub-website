import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Box, Calendar, Award, Image as ImageIcon, Cpu, Users, ChevronRight } from 'lucide-react';

export function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '3D Headset', icon: Box },
    { id: 'events', label: 'Exhibits & Events', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Award },
    { id: 'gallery', label: 'Club Moments', icon: ImageIcon },
    { id: 'hardware', label: 'Lab Hardware', icon: Cpu },
    { id: 'about', label: 'About & Faculty', icon: Users },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080313]/90 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
            <img
              src="/assets/logo.png"
              alt="AR VR HUB"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-lg tracking-wider text-white">
              <span>AR VR</span>
              <span className="text-pink-400 font-serif italic text-base">Hub</span>
            </div>
            <p className="text-[10px] text-purple-300/70 tracking-widest uppercase font-medium">
              BMSIT&M • BENGALURU
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-white bg-purple-600/30 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'text-purple-200/70 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-purple-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button: Explore Virtual Lab */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('events')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Explore 20+ Exhibits</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0515]/95 backdrop-blur-xl border-b border-purple-500/30 px-4 pt-3 pb-6 mt-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600/40 text-white border border-purple-400/40'
                    : 'text-purple-200/80 hover:bg-purple-950/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-pink-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400/50" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
