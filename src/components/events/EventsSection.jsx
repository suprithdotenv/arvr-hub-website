import React, { useState, useMemo } from 'react';
import { eventsData } from '../../data/eventsData';
import { EventExhibit } from './EventExhibit';
import { Filter, Calendar, Search, Sparkles, Award, X, Users, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EventsSection({ onOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = ['All', 'Workshop', 'Hackathon', 'MoU', 'Award', 'Outreach', 'Initiative'];
  const years = ['All', '2023', '2024', '2025'];

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesYear = selectedYear === 'All' || event.year === selectedYear;
      const matchesQuery =
        searchQuery.trim() === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.association.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesYear && matchesQuery;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  return (
    <section id="events" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Signature Archive</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text-purple">
          Events & Spatial Exhibits
        </h2>

        <p className="mt-4 text-base sm:text-lg text-purple-200/80 font-light">
          Chronological 3D exhibitions of workshops, hackathons, MoUs, and award-winning breakthroughs conducted by AR VR HUB at BMSIT&M.
        </p>
      </div>

      {/* Filter and Search Navigation Bar */}
      <div className="sticky top-20 z-30 mb-12 p-4 rounded-2xl bg-[#0c051a]/85 backdrop-blur-xl border border-purple-500/25 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-purple-950/40 text-purple-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* Year selector */}
            <div className="flex items-center gap-1 bg-purple-950/40 p-1 rounded-xl border border-purple-500/20">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedYear === y
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-purple-300/70 hover:text-white'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Search events, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-pink-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs text-purple-300/70">
          <span>
            Displaying <strong className="text-white">{filteredEvents.length}</strong> of{' '}
            <strong className="text-white">{eventsData.length}</strong> documented events
          </span>
          <span className="font-mono text-[11px] text-pink-400">
            Source: BMSIT&M AR VR HUB Official Report
          </span>
        </div>
      </div>

      {/* Events Stream */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map((event, idx) => (
            <EventExhibit
              key={event.id}
              event={event}
              index={idx}
              onSelectEvent={(ev) => setActiveModalEvent(ev)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 rounded-3xl bg-purple-950/20 border border-purple-500/20">
          <Calendar className="w-12 h-12 text-purple-400/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No exhibits matched your criteria</h3>
          <p className="text-sm text-purple-300/70 mt-1 max-w-sm mx-auto">
            Try clearing your search query or selecting "All" categories to view all documented activities.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedYear('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================
          MODAL INSPECTION DIALOG
          ======================================================== */}
      <AnimatePresence>
        {activeModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveModalEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#120824] border border-purple-500/40 shadow-2xl p-6 sm:p-8 text-white space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-1">
                  <span>EXHIBIT #{activeModalEvent.id}</span>
                  <span>•</span>
                  <span>{activeModalEvent.date}</span>
                  <span>•</span>
                  <span>{activeModalEvent.reportPage}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeModalEvent.title}
                </h3>
                {activeModalEvent.subtitle && (
                  <p className="text-sm text-purple-300 mt-1 font-medium">
                    {activeModalEvent.subtitle}
                  </p>
                )}
              </div>

              {/* Large Image Showcase */}
              <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-black/60 aspect-[16/10]">
                <img
                  src={activeModalEvent.image}
                  alt={activeModalEvent.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Full Description & Verified Data */}
              <div className="space-y-4 text-purple-200/90 text-sm leading-relaxed">
                <p>{activeModalEvent.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                    <span className="text-xs text-purple-400 font-medium block">Key Association</span>
                    <strong className="text-white text-sm">{activeModalEvent.association}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                    <span className="text-xs text-purple-400 font-medium block">Participation / Attendance</span>
                    <strong className="text-cyan-300 text-sm">
                      {typeof activeModalEvent.studentsAttended === 'number'
                        ? `${activeModalEvent.studentsAttended} Registered Students`
                        : activeModalEvent.studentsAttended}
                    </strong>
                  </div>
                </div>

                {/* Verified Metadata source badge */}
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>
                    Verified from official activity report on <strong>{activeModalEvent.reportPage}</strong> signed by BMSIT&M coordinators and principal.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
