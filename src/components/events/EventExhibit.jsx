import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, ExternalLink, Bookmark, CheckCircle2, Sparkles, Maximize2 } from 'lucide-react';

export function EventExhibit({ event, index, onSelectEvent }) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  // Category color accents
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Award':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MoU':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Hackathon':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'Workshop':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Outreach':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative my-16 md:my-24 flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } items-center gap-8 lg:gap-14`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Spatial Index Indicator */}
      <div
        className={`absolute -top-12 ${
          isEven ? 'left-2 lg:left-8' : 'right-2 lg:right-8'
        } text-7xl md:text-9xl font-black text-purple-900/15 select-none pointer-events-none tracking-tighter`}
      >
        EXHIBIT #{String(event.id).padStart(2, '0')}
      </div>

      {/* ========================================================
          A. 3D FLOATING PHOTOGRAPH EXHIBIT FRAME
          ======================================================== */}
      <div className="w-full lg:w-1/2 relative group">
        {/* Holographic Glowing Border Underlay */}
        <div
          className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${
            isHovered
              ? 'from-purple-600 via-pink-600 to-cyan-500 opacity-60 blur-xl'
              : 'from-purple-800/30 to-pink-900/20 opacity-30 blur-lg'
          } transition-all duration-700`}
        />

        {/* Outer 3D Dimensional Frame */}
        <div
          className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b0d36] to-[#0d061c] p-2 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform transition-transform duration-500 lg:group-hover:scale-[1.02] cursor-pointer"
          onClick={() => onSelectEvent(event)}
        >
          {/* Top Frame Status Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 mb-1.5 text-[10px] tracking-wider uppercase text-purple-300/70 border-b border-purple-500/20">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              ARCHIVE REF: {event.reportPage}
            </span>
            <span className="font-mono text-purple-400/90">{event.date}</span>
          </div>

          {/* Authentic Photograph Container with Depth Vignette */}
          <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-xl overflow-hidden bg-black/60">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            
            {/* Expand / Inspect Pill */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-purple-400/40 text-xs text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3 text-cyan-300" />
              <span>Inspect Exhibit</span>
            </div>

            {/* Poster thumbnail if available */}
            {event.poster && (
              <div className="absolute top-3 right-3 w-16 h-20 rounded border border-purple-400/40 overflow-hidden shadow-lg hidden sm:block">
                <img src={event.poster} alt="Event Poster" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          B. FACTUAL EVENT INFORMATION EXHIBIT CARD
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
        {/* Category & Verified Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadge(event.category)}`}>
            {event.category}
          </span>

          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-500/30">
            {event.year}
          </span>

          {event.studentsAttended && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
              <Users className="w-3 h-3" />
              <span>{typeof event.studentsAttended === 'number' ? `${event.studentsAttended} Students` : event.studentsAttended}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-purple-200 transition-colors">
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="text-sm font-medium text-pink-400/90 mt-1">
              {event.subtitle}
            </p>
          )}
        </div>

        {/* Description grounded in PDF */}
        <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed font-light">
          {event.description}
        </p>

        {/* Institutional & Partner Association Callout */}
        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Collaboration / Association:</span>
          </div>
          <p className="pl-5 text-purple-300/80">{event.association}</p>
        </div>

        {/* Interactive Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#1e1038] text-purple-300/90 border border-purple-500/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Inspection CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => onSelectEvent(event)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-900/50 hover:bg-purple-800/70 border border-purple-400/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Full Archive Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
