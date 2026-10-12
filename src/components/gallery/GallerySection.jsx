import React, { useState, useEffect } from 'react';
import { galleryData } from '../../data/galleryData';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Filter, Maximize2, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categories = ['All', 'Milestones', 'Workshops', 'Hackathons', 'Awards', 'Hands-on Lab', 'Outreach'];

  const filteredPhotos = activeFilter === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === activeFilter);

  // Keyboard navigation for modal lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Visual Heritage</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text-purple">
          Real Club Moments & Lab Heritage
        </h2>

        <p className="mt-4 text-base sm:text-lg text-purple-200/80 font-light">
          Photographic documentation directly from BMSIT&M's official AR VR HUB report, featuring student innovators, keynote events, and lab milestones.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-purple-950/40 text-purple-300/80 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid with Dimensional Floating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b0d36] to-[#0d061c] border border-purple-500/30 shadow-xl cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Aspect Ratio Box */}
            <div className="aspect-[16/11] relative overflow-hidden bg-black/60">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-purple-400/30 text-[10px] font-semibold text-purple-200">
                {photo.category}
              </div>

              {/* Hover Inspect Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-purple-900/80 border border-purple-400/40 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-4 sm:p-5">
              <div className="text-[10px] font-mono text-cyan-400 mb-1">
                REF: {photo.reportPage}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-xs text-purple-300/80 mt-1 line-clamp-2 font-light">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL WITH KEYBOARD NAVIGATION
          ======================================================== */}
      <AnimatePresence>
        {selectedIndex !== null && filteredPhotos[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
              }}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white transition cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
              }}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white transition cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center text-center space-y-4"
            >
              <div className="rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl bg-black max-h-[60vh] flex items-center justify-center">
                <img
                  src={filteredPhotos[selectedIndex].image}
                  alt={filteredPhotos[selectedIndex].title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="max-w-2xl px-4 text-white">
                <div className="flex items-center justify-center gap-3 text-xs font-mono text-cyan-400 mb-1">
                  <span>PHOTO {selectedIndex + 1} OF {filteredPhotos.length}</span>
                  <span>•</span>
                  <span>{filteredPhotos[selectedIndex].reportPage}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {filteredPhotos[selectedIndex].title}
                </h3>
                <p className="text-sm text-purple-200/80 mt-1 font-light">
                  {filteredPhotos[selectedIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
