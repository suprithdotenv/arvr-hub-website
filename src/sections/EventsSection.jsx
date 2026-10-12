import React from 'react';
import { ModernTimeline } from '../components/timeline/ModernTimeline';

/**
 * EventsSection:
 * Clean, modern technology-club timeline featuring exactly two verified milestone events
 * from the BMSIT&M official activity report, animated with scroll-synchronized 3D perspective.
 */
export function EventsSection() {
  return (
    <section id="events" className="relative w-full">
      <ModernTimeline />
    </section>
  );
}
