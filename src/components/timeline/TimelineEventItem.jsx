import React, { useRef, useEffect } from 'react';
import { Calendar, CheckCircle2, Award, Cpu } from 'lucide-react';

/**
 * TimelineEventItem:
 * Clean, editorial technology-club documentary showcase for each milestone event.
 * Uses high-performance GPU 3D perspective transforms synchronized with vertical scroll.
 */
export function TimelineEventItem({ event, isReversed = false }) {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateTransforms = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Distance of container center from viewport center (-1 to 1 range across viewport)
      const containerCenter = rect.top + rect.height * 0.5;
      const viewportCenter = viewportH * 0.5;
      const distFromCenter = (containerCenter - viewportCenter) / (viewportH * 0.6);

      // Clamped normalized progress (0 = below viewport, 0.5 = centered, 1 = above viewport)
      const scrollProgress = (viewportH - rect.top) / (viewportH + rect.height);

      if (prefersReducedMotion) {
        // Fallback: gentle opacity fade only
        const opacity = Math.min(Math.max((scrollProgress - 0.1) / 0.3, 0), 1);
        if (photoRef.current) {
          photoRef.current.style.opacity = `${opacity}`;
          photoRef.current.style.transform = 'none';
        }
        if (textRef.current) {
          textRef.current.style.opacity = `${opacity}`;
          textRef.current.style.transform = 'none';
        }
        return;
      }

      // --- PHASE 1: ENTERING FROM BOTTOM (distFromCenter > 0) ---
      if (distFromCenter > 0) {
        // Normalized entry progress: 0 when entering bottom, 1 when centered
        const enterT = Math.max(0, Math.min(1, 1 - distFromCenter));
        // Cubic ease out for smooth deceleration into center
        const ease = 1 - Math.pow(1 - enterT, 3);

        const photoOpacity = Math.min(1, ease * 1.5);
        const textOpacity = Math.min(1, ease * 1.3);

        // Subtle 3D perspective tilt & scale
        const rotY = (1 - ease) * (isReversed ? 8 : -8);
        const rotX = (1 - ease) * 5;
        const transX = (1 - ease) * (isReversed ? -35 : 35);
        const transY = (1 - ease) * 45;
        const transZ = (1 - ease) * -60;
        const scale = 0.92 + ease * 0.08;

        const textY = (1 - ease) * 35;

        if (photoRef.current) {
          photoRef.current.style.opacity = `${photoOpacity}`;
          photoRef.current.style.transform = `perspective(1200px) translate3d(${transX.toFixed(
            1
          )}px, ${transY.toFixed(1)}px, ${transZ.toFixed(1)}px) rotateY(${rotY.toFixed(
            2
          )}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        }
        if (textRef.current) {
          textRef.current.style.opacity = `${textOpacity}`;
          textRef.current.style.transform = `translate3d(0, ${textY.toFixed(1)}px, 0)`;
        }
      }
      // --- PHASE 2: CENTERED IN FULL FOCUS (distFromCenter ≈ 0) ---
      else if (distFromCenter >= -0.2 && distFromCenter <= 0) {
        if (photoRef.current) {
          photoRef.current.style.opacity = '1';
          photoRef.current.style.transform =
            'perspective(1200px) translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg) scale(1)';
        }
        if (textRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
      }
      // --- PHASE 3: EXITING TOWARD TOP (distFromCenter < -0.2) ---
      else {
        // Normalized exit progress: 0 when just leaving center, 1 when exiting top
        const exitT = Math.max(0, Math.min(1, (-distFromCenter - 0.2) / 0.8));
        const easeOut = Math.pow(exitT, 2);

        const photoOpacity = Math.max(0.12, 1 - easeOut * 0.88);
        const textOpacity = Math.max(0.15, 1 - easeOut * 0.85);

        const transY = -easeOut * 35;
        const transZ = -easeOut * 40;
        const scale = 1.0 - easeOut * 0.05;

        if (photoRef.current) {
          photoRef.current.style.opacity = `${photoOpacity}`;
          photoRef.current.style.transform = `perspective(1200px) translate3d(0, ${transY.toFixed(
            1
          )}px, ${transZ.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        }
        if (textRef.current) {
          textRef.current.style.opacity = `${textOpacity}`;
          textRef.current.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0)`;
        }
      }
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial calculation on mount
    updateTransforms();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isReversed]);

  return (
    <div
      ref={containerRef}
      id={`timeline-event-${event.id}`}
      className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Responsive Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Typography Column */}
          <div
            ref={textRef}
            className={`space-y-6 ${
              isReversed
                ? 'lg:col-span-6 lg:order-2 text-left'
                : 'lg:col-span-6 lg:order-1 text-left'
            } transition-[transform,opacity] duration-75 will-change-[transform,opacity]`}
          >
            {/* Theme & Category Pill Header */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-[#1a1724] text-[#c8b9db] border border-[#9d85b5]/30 shadow-sm">
                THEME // {event.theme}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a92]">
                MILESTONE {event.number} OF 02
              </span>
            </div>

            {/* Date Pill */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#e6e6dc]">
              <Calendar className="w-4 h-4 text-[#9d85b5] shrink-0" />
              <span className="tracking-wider uppercase font-medium">{event.date}</span>
            </div>

            {/* Event Headline */}
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-editorial text-[#f7f7f4] leading-[1.08] tracking-tight">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#9d85b5] font-semibold">
                {event.subtitle}
              </p>
            </div>

            {/* Event Documentary Narrative */}
            <p className="text-base sm:text-lg text-[#b8b8be] font-light leading-relaxed max-w-xl">
              {event.description}
            </p>

            {/* Verified Technical Detail Card */}
            <div className="pt-5 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d1d1d8]">
                {event.id === 1 ? (
                  <Cpu className="w-3.5 h-3.5 text-[#9d85b5] shrink-0" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#9d85b5] shrink-0" />
                )}
                <span>{event.stats}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#787882]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9d85b5] shrink-0" />
                <span>Verified from {event.pdfReference}</span>
              </div>
            </div>
          </div>

          {/* Photograph Column (Documentary Portfolio Card) */}
          <div
            className={`w-full ${
              isReversed
                ? 'lg:col-span-6 lg:order-1'
                : 'lg:col-span-6 lg:order-2'
            }`}
            style={{ perspective: '1200px' }}
          >
            <div
              ref={photoRef}
              className="relative rounded-2xl overflow-hidden bg-[#121216] border border-white/12 shadow-2xl shadow-black/80 group transition-[transform,opacity] duration-75 will-change-[transform,opacity]"
            >
              {/* Top Documentary Identifier Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#16161c]/90 border-b border-white/[0.06] text-[11px] font-mono">
                <span className="text-[#9d85b5] tracking-widest uppercase font-semibold">
                  BMSIT&M ARCHIVE • {event.category}
                </span>
                <span className="text-[#686872] uppercase">
                  IMG // {event.number}
                </span>
              </div>

              {/* The Actual Event Photograph */}
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] overflow-hidden bg-[#0a0a0c]">
                <img
                  src={event.image}
                  alt={event.alt}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient for photographic depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/85 via-transparent to-black/20 pointer-events-none" />

                {/* Corner Stamp */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#e0e0e8] pointer-events-none">
                  <span className="bg-[#0a0a0c]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    {event.date}
                  </span>
                  <span className="bg-[#0a0a0c]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[#c8b9db]">
                    {event.theme}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
