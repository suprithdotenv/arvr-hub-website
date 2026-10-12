import React from 'react';

export function ProjectsSection() {
  const projectTracks = [
    {
      code: 'TRACK-01',
      title: 'WebXR & Browser Spatial Interfaces',
      summary: 'Exploring browser-native 3D immersive web experiences using Three.js and WebXR device APIs.',
      status: 'Prototyping',
    },
    {
      code: 'TRACK-02',
      title: 'Real-Time Spatial Simulation',
      summary: 'Engineering physics-driven interactive scenarios for training, education, and experiential learning.',
      status: 'Research',
    },
    {
      code: 'TRACK-03',
      title: 'Computer Vision & Optical Tracking',
      summary: 'Investigating hand-pose estimation, markerless spatial anchoring, and object registration in AR.',
      status: 'Active Lab',
    },
  ];

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0c0c0f] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#9d85b5] mb-6">
          <span className="w-8 h-[1px] bg-[#9d85b5]/50" />
          <span>03 // STUDENT RESEARCH & DEVELOPMENT</span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f7f7f4] font-editorial leading-[1.1]">
              Projects & Prototypes
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#b0b0b8] font-light max-w-2xl leading-relaxed">
              Student-led experimentation spanning spatial computing software, interactive simulation,
              and cross-platform extended reality tooling.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <span className="text-xs font-mono text-[#8a8a92] uppercase tracking-widest">
              BMSIT&M RESEARCH PIPELINE
            </span>
          </div>
        </div>

        {/* Project Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectTracks.map((track) => (
            <div
              key={track.code}
              className="p-8 rounded-3xl bg-[#121216] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#9d85b5] uppercase tracking-wider">
                    {track.code}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[10px] font-mono text-[#8a8a92] border border-white/5">
                    {track.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-editorial text-[#f7f7f4]">
                  {track.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#95959e] font-light leading-relaxed">
                  {track.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-[#686870]">
                <span>VERIFIED REGISTRY</span>
                <span className="text-[#9d85b5]">PENDING PDF</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
