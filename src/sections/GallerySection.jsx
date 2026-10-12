import React from 'react';
import { Camera } from 'lucide-react';

export function GallerySection() {
  return (
    <section id="gallery" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0a0a0c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#9d85b5] mb-6">
          <span className="w-8 h-[1px] bg-[#9d85b5]/50" />
          <span>04 // VISUAL DOCUMENTATION & ARCHIVE</span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f7f7f4] font-editorial leading-[1.1]">
              Club Gallery & Moments
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#b0b0b8] font-light max-w-2xl leading-relaxed">
              Photographic archives from physical lab installations, hardware demonstrations,
              hackathons, and guest expert interactions.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <span className="text-xs font-mono text-[#8a8a92] uppercase tracking-widest">
              OFFICIAL ARCHIVE
            </span>
          </div>
        </div>

        {/* Gallery Placeholder Frame */}
        <div className="p-12 sm:p-16 rounded-3xl bg-[#111115] border border-white/[0.06] flex flex-col items-center justify-center text-center space-y-5">
          <div className="w-13 h-13 rounded-2xl bg-[#17171d] border border-white/10 flex items-center justify-center text-[#c8b9db]">
            <Camera className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold font-editorial text-[#f7f7f4]">
              Official Photographic Archive
            </h3>
            <p className="text-xs sm:text-sm text-[#95959e] leading-relaxed font-light">
              High-resolution event photography extracted from the verified club activity report
              will be integrated here to preserve club history and student engagement.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16161c] border border-white/10 text-xs font-mono text-[#8a8a92]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
            <span>Curated Image Staging Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
