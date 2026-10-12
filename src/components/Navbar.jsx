import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ activeSection = 'hero' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly the implemented sections for this MVP
  const navLinks = [
    { href: '#hero', label: 'Overview' },
    { href: '#events', label: '3D Timeline' },
    { href: '#about', label: 'About Club' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/92 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-2xl'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity with noticeably larger, prominent logo */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9d85b5] rounded-xl"
        >
          {/* Increased logo container size */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#141418] border border-white/12 p-1.5 flex items-center justify-center group-hover:border-white/25 transition-all shadow-lg shrink-0">
            <img
              src="/assets/logo.png"
              alt="AR VR HUB Official Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-base sm:text-lg text-[#f7f7f4] font-editorial">
              <span>AR VR</span>
              <span className="text-[#c8b9db] font-serif-accent italic font-normal">hub</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#8a8a92] font-mono">
              BMSIT&M • BENGALURU
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Smooth Underline Reveal */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionKey = link.href.replace('#', '');
            const isActive = activeSection === sectionKey || (sectionKey === 'events' && activeSection === 'timeline');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`editorial-nav-link text-xs uppercase tracking-wider font-medium py-1 ${
                  isActive ? 'text-[#f7f7f4] active font-semibold' : 'text-[#9c9ca1] hover:text-[#f7f7f4]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Institutional Label */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#8a8a92]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
          <span className="uppercase tracking-widest text-[11px]">BMSIT&M YELAHANKA</span>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl bg-[#141418] border border-white/10 text-[#d1d1d6] hover:text-[#f7f7f4]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#0c0c0e]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium text-[#d1d1d6] hover:text-[#f7f7f4] hover:bg-white/[0.04] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#9d85b5]" />
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#68686e]">
              <span>BMSIT&M • AUTONOMOUS VTU</span>
              <span className="text-[#9d85b5]">EST. 2024</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
