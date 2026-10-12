import React, { useRef } from 'react';
import { HeroScene } from '../three/HeroScene';
import { ArrowRight, Compass } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef(null);

  const scrollToTimeline = () => {
    const el = document.querySelector('#events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Interactive letter breakdown for "AR VR"
  const renderInteractiveWord = (word) => {
    return word.split('').map((char, index) => (
      <span
        key={index}
        className="interactive-letter cursor-default select-none"
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-[#0a0a0c]"
    >
      {/* Restrained architectural ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(157,133,181,0.08),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[350px] bg-[rgba(122,102,145,0.03)] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center my-auto">
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Typographic & Editorial Focus with Prominent Logo */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Prominent Official Club Logo & Institutional Emblem */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141418] border border-white/12 p-2 shadow-xl flex items-center justify-center shrink-0">
                <img
                  src="/assets/logo.png"
                  alt="AR VR HUB Official Club Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#9d85b5] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
                  <span>BMSIT&M • SPATIAL LAB</span>
                </div>
                <span className="text-xs sm:text-sm font-mono tracking-wider text-[#b0b0b8] uppercase font-medium">
                  BMS Institute of Technology & Management
                </span>
              </div>
            </div>

            {/* Interactive Main Headline: "AR VR hub" */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-[#f7f7f4] font-editorial uppercase leading-[0.98]">
                <span className="inline-block mr-3 sm:mr-4">
                  {renderInteractiveWord('AR')}
                </span>
                <span className="inline-block mr-3 sm:mr-4">
                  {renderInteractiveWord('VR')}
                </span>
                <span className="font-serif-accent italic font-normal text-[#c8b9db] lowercase tracking-normal inline-block hover:-translate-y-1 hover:text-[#ebe4f5] transition-all duration-300 cursor-default select-none">
                  hub
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#88888f] max-w-md">
                Department of CSE & AIML • Autonomous VTU
              </p>
            </div>

            {/* Concise Mission Statement */}
            <p className="text-base sm:text-lg text-[#b8b8be] font-light leading-relaxed max-w-lg">
              An academic student laboratory exploring spatial computing, augmented reality,
              virtual reality simulation, and real-time interactive 3D media.
            </p>

            {/* Refined Editorial Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToTimeline}
                className="btn-editorial-primary group px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2.5 cursor-pointer"
              >
                <span>3D Animated Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0d0d10] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToAbout}
                className="btn-editorial-secondary group px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#9c9ca1] group-hover:text-[#f7f7f4] transition-colors" />
                <span>Club Charter</span>
              </button>
            </div>

            {/* Foundational Editorial Anchor Metadata */}
            <div className="grid grid-cols-3 gap-6 pt-7 border-t border-white/[0.07] max-w-md text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#68686e] block">
                  Domain
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#dcdcd8] font-editorial">
                  Spatial XR
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#68686e] block">
                  Campus
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#dcdcd8] font-editorial">
                  Yelahanka, BLR
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#68686e] block">
                  Charter
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#dcdcd8] font-editorial">
                  Est. 2024
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 360° Continuous Turntable Exhibition */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
            {/* 3D Scene Viewport */}
            <div className="w-full h-full relative rounded-3xl overflow-hidden">
              <HeroScene />
            </div>

            {/* Discrete exhibition placard label */}
            <div className="absolute bottom-2 right-4 z-20 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#606068]">
                EXHIBIT // 360° TURNTABLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pt-4 flex flex-col items-center justify-center text-center">
        <button
          onClick={scrollToTimeline}
          className="group flex flex-col items-center gap-2 text-[#787880] hover:text-[#f7f7f4] transition-colors cursor-pointer"
          aria-label="Scroll to timeline section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase transition-colors">
            SCROLL TO EXPLORE 3D TIMELINE
          </span>
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center p-1 group-hover:border-white/30 transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-[#9d85b5] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
