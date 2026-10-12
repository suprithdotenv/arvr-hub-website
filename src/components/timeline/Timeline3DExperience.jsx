import React, { useRef, useState, useEffect } from 'react';
import { TimelineScene3D } from './TimelineScene3D';
import { threeEvents } from '../../data/threeEventsData';
import { Calendar, CheckCircle } from 'lucide-react';

export function Timeline3DExperience() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgressDisplay, setScrollProgressDisplay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Native window scroll tracker linked directly to the 360vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalTravel = rect.height - window.innerHeight;
      if (totalTravel <= 0) return;

      let p = 0;
      if (rect.top <= 0) {
        p = Math.min(Math.max(-rect.top / totalTravel, 0), 1);
      }
      progressRef.current = p;
      setScrollProgressDisplay(p);

      // Determine active event index with clean thresholding
      let nextIdx = 0;
      if (p < 0.33) nextIdx = 0;
      else if (p < 0.67) nextIdx = 1;
      else nextIdx = 2;

      setActiveIdx((prev) => (prev !== nextIdx ? nextIdx : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentEvent = threeEvents[activeIdx];

  // Jump to specific event index
  const jumpToEvent = (targetIdx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalTravel = rect.height - window.innerHeight;
    const targetP = targetIdx === 0 ? 0.05 : targetIdx === 1 ? 0.50 : 0.88;

    window.scrollTo({
      top: scrollTop + targetP * totalTravel,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id="timeline"
      ref={containerRef}
      className="relative w-full bg-[#0a0a0c]"
      style={{ height: '380vh' }}
    >
      {/* Pinned Sticky 3D Exhibition Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_40%,transparent,rgba(10,10,12,0.85))] pointer-events-none z-10" />

        {/* Top Minimalist Timeline Progress Bar */}
        <div className="relative z-30 pt-20 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Section Breadcrumb */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9d85b5]">
              01 // 3D TIMELINE ARCHIVE
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#55555c]">
              • OFFICIAL CLUB MILESTONES
            </span>
          </div>

          {/* Three Chapter Selector Pills */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#131317]/80 backdrop-blur-md p-1.5 rounded-full border border-white/[0.08]">
            {threeEvents.map((evt, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={evt.id}
                  onClick={() => jumpToEvent(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#f7f7f4] text-[#0a0a0c] font-semibold shadow-md'
                      : 'text-[#8a8a92] hover:text-[#f7f7f4] hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="mr-1 opacity-70">0{idx + 1}</span>
                  <span>{evt.theme}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area: Split 3D Canvas & Integrated Typography */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Synchronized Animated Typography */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6 text-left py-4">
            {/* Theme Badge & Number */}
            <div className="flex items-center gap-3 animate-subtle-float">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-[#181822] text-[#c8b9db] border border-[#9d85b5]/30">
                THEME // {currentEvent.theme}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a92]">
                EXHIBIT {currentEvent.number} OF 03
              </span>
            </div>

            {/* Date Pill */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#9d85b5]">
              <Calendar className="w-4 h-4 text-[#9d85b5]" />
              <span>{currentEvent.date}</span>
            </div>

            {/* Event Title with smooth transition */}
            <div className="space-y-2">
              <h2
                key={`title-${currentEvent.id}`}
                className="text-2xl sm:text-4xl lg:text-5xl font-medium font-editorial text-[#f7f7f4] leading-[1.1] transition-all duration-500 ease-out"
              >
                {currentEvent.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#7a7a82]">
                {currentEvent.subtitle}
              </p>
            </div>

            {/* Event Description */}
            <p
              key={`desc-${currentEvent.id}`}
              className="text-sm sm:text-base text-[#b0b0b8] font-light leading-relaxed max-w-lg transition-opacity duration-500"
            >
              {currentEvent.description}
            </p>

            {/* Verified Source Tagline */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-[#787880]">
              <CheckCircle className="w-3.5 h-3.5 text-[#9d85b5] shrink-0" />
              <span>{currentEvent.pdfReference}</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Spatial Exhibition Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-[320px] sm:h-[420px] lg:h-[540px] w-full relative">
            <TimelineScene3D
              progressRef={progressRef}
              activeIndex={activeIdx}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <div className="relative z-30 pb-8 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#7a7a82]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
            <span className="uppercase tracking-wider">
              SCROLL DRIVEN 3D CAMERA // TIMELINE ENGINE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#9d85b5]">
              PROGRESS: {Math.round(scrollProgressDisplay * 100)}%
            </span>
            <div className="w-20 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9d85b5] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgressDisplay * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
