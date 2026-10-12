import React, { useState, useEffect } from 'react';
import { twoEvents } from '../../data/twoEventsData';
import { TimelineEventItem } from './TimelineEventItem';
import { ArrowDown } from 'lucide-react';

export function ModernTimeline() {
  const [activeEventId, setActiveEventId] = useState(1);

  // Monitor which event is currently closest to the center of the viewport
  useEffect(() => {
    const handleScroll = () => {
      const vCenter = window.innerHeight * 0.5;
      const el1 = document.getElementById('timeline-event-1');
      const el2 = document.getElementById('timeline-event-2');

      if (el1 && el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const dist1 = Math.abs(rect1.top + rect1.height * 0.5 - vCenter);
        const dist2 = Math.abs(rect2.top + rect2.height * 0.5 - vCenter);

        setActiveEventId(dist1 < dist2 ? 1 : 2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEvent = (id) => {
    const target = document.getElementById(`timeline-event-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative w-full bg-[#0a0a0c] overflow-hidden">
      {/* Restrained Architectural Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[rgba(157,133,181,0.025)] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-[rgba(122,102,145,0.025)] rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Vertical Timeline Connector Spine */}
      <div className="absolute top-44 bottom-32 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 relative z-10">
        {/* Timeline Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#9d85b5]">
              <span className="w-8 h-[1px] bg-[#9d85b5]/50" />
              <span>01 // OFFICIAL CLUB TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#f7f7f4] font-editorial leading-[1.1]">
              Pivotal Milestones & Hands-On Deployments
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8a8a92] uppercase tracking-wider">
              Documented achievements from the official BMSIT&M activity report
            </p>
          </div>

          {/* Quick Chapter Navigation Pills */}
          <div className="flex items-center gap-2 bg-[#121217] p-1.5 rounded-full border border-white/[0.08] self-start md:self-auto shrink-0">
            {twoEvents.map((evt) => {
              const isActive = activeEventId === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => scrollToEvent(evt.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#1e1b29] text-[#f7f7f4] border border-[#9d85b5]/40 shadow-sm font-semibold'
                      : 'text-[#85858d] hover:text-[#d1d1d6] border border-transparent'
                  }`}
                >
                  <span>{evt.number} • {evt.theme}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Sequential Presentation */}
      <div className="relative z-10 divide-y divide-white/[0.04]">
        {twoEvents.map((event, index) => (
          <TimelineEventItem
            key={event.id}
            event={event}
            isReversed={index % 2 === 1} // Alternate layout for Event 2!
          />
        ))}
      </div>

      {/* Subtle Scroll Hint Indicator at Timeline Foot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6 flex items-center justify-between text-xs font-mono text-[#686872] relative z-10 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
          <span className="uppercase tracking-wider">2 VERIFIED MILESTONES ARCHIVED</span>
        </div>
        <div className="flex items-center gap-2 text-[#888892]">
          <span>CONTINUE SCROLLING</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#9d85b5]" />
        </div>
      </div>
    </div>
  );
}
