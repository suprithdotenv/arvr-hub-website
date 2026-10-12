import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Users, Award, Calendar, MapPin, Building, ArrowRight } from 'lucide-react';

export function MuseumPlacard({ event, index, totalEvents, isEvenWall }) {
  if (!event) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-30 pointer-events-auto max-w-md xl:max-w-lg p-6 sm:p-8 text-[#ececf1] transition-all ${
          isEvenWall
            ? 'bottom-8 sm:bottom-12 right-6 sm:right-12 text-left'
            : 'bottom-8 sm:bottom-12 left-6 sm:left-12 text-left'
        }`}
      >
        {/* Understated Architectural Placard Card */}
        <div className="relative p-6 sm:p-8 rounded-xl bg-[#111116]/85 backdrop-blur-md border border-[#24242c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-4">
          {/* Subtle archival label header */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#9090a2] pb-3 border-b border-[#24242e]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              EXHIBIT {String(index + 1).padStart(2, '0')} OF {String(totalEvents).padStart(2, '0')}
            </span>
            <span className="text-[#a1a1b5]">{event.year}</span>
          </div>

          {/* Category & Verified Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide uppercase bg-[#1d1b26] text-[#c4b5fd] border border-[#3b3252]">
              {event.category}
            </span>
            {event.studentsAttended && (
              <span className="text-[11px] font-mono text-[#9494a8]">
                {typeof event.studentsAttended === 'number'
                  ? `${event.studentsAttended} Participants`
                  : event.studentsAttended}
              </span>
            )}
          </div>

          {/* Event Title in Elegant Editorial Typography */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-white leading-snug tracking-tight">
              {event.title}
            </h3>
            {event.subtitle && (
              <p className="text-xs font-sans text-[#a78bfa] mt-1 tracking-wide">
                {event.subtitle}
              </p>
            )}
            <div className="text-xs font-mono text-[#78788c] mt-1">
              {event.date}
            </div>
          </div>

          {/* Curatorial Text / Description from Report */}
          <p className="text-xs sm:text-sm text-[#b8b8c8] font-sans leading-relaxed font-light">
            {event.description}
          </p>

          {/* Association & Partner Metadata */}
          {event.association && (
            <div className="pt-2 text-xs border-t border-[#22222b] text-[#8e8e9f]">
              <span className="font-medium text-[#c0c0d2] block mb-0.5">
                Collaboration / Partner:
              </span>
              <p className="text-[#a4a4b8] font-light">{event.association}</p>
            </div>
          )}

          {/* Official Source Reference */}
          <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[#5c5c6e]">
            <span>ARCHIVE REFERENCE: {event.reportPage}</span>
            <span>BMSIT&M AR VR HUB</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
