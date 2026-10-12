import React from 'react';
import { Eye, Layers, Cpu, Users, Compass, Sparkles, Building } from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      number: '01',
      title: 'Spatial Computing & Interaction',
      description:
        'Architecting intuitive 3D user interfaces, hand-tracking interactions, and physical-digital continuum models.',
      icon: Eye,
    },
    {
      number: '02',
      title: 'Extended Reality Platforms',
      description:
        'Building native and WebXR applications across virtual reality headsets, mobile augmented reality, and pass-through headsets.',
      icon: Layers,
    },
    {
      number: '03',
      title: 'Real-Time Graphics & Simulation',
      description:
        'Leveraging Three.js, WebGL, Unity, and modern graphics pipelines to create responsive, photorealistic interactive simulations.',
      icon: Cpu,
    },
    {
      number: '04',
      title: 'Collaborative Community Lab',
      description:
        'Cultivating a collaborative ecosystem for interdisciplinary research, student experimentation, workshops, and project development.',
      icon: Users,
    },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0c0c0f] border-t border-white/[0.06]">
      {/* Restrained ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[rgba(157,133,181,0.03)] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#9d85b5] mb-6">
          <span className="w-8 h-[1px] bg-[#9d85b5]/50" />
          <span>02 // CLUB CHARTER & PHILOSOPHY</span>
        </div>

        {/* Section Heading & Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-20">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f7f7f4] font-editorial leading-[1.1]">
              Pioneering the boundary between physical and digital reality.
            </h2>
          </div>
          <div className="lg:col-span-5 text-[#b0b0b8] font-light text-base sm:text-lg leading-relaxed">
            <p>
              AR VR HUB at BMS Institute of Technology & Management provides students with hands-on
              immersion into spatial computing, real-time 3D pipelines, and interactive hardware technologies.
            </p>
          </div>
        </div>

        {/* Editorial Content Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Institutional Context Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#121216] border border-white/[0.07] relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#c8b9db]">
                <Building className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL FOUNDATION</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#f7f7f4]">
                  BMS Institute of Technology & Management
                </h3>
                <p className="text-xs sm:text-sm text-[#888890] font-mono">
                  Autonomous Institute Under VTU • Accredited NBA & NAAC
                </p>
              </div>

              <p className="text-sm text-[#b8b8be] leading-relaxed font-light">
                Supported jointly by the Department of Computer Science & Engineering and the
                Department of Artificial Intelligence & Machine Learning to foster spatial computing
                literacy across engineering disciplines.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#808088]">
              <span>LOCATION: YELAHANKA, BENGALURU</span>
              <span className="text-[#9d85b5]">EST. 2024</span>
            </div>
          </div>

          {/* Mission & Vision Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-[#141419] border border-white/[0.06] flex flex-col justify-between space-y-6 hover:border-white/15 transition-colors">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#9d85b5] block">
                  OUR MISSION
                </span>
                <h4 className="text-xl font-bold text-[#f7f7f4] font-editorial">
                  Cultivate Practical Mastery
                </h4>
                <p className="text-sm text-[#a0a0a8] leading-relaxed font-light">
                  To democratize spatial technologies by providing students with hands-on access to
                  virtual reality hardware, graphics pipelines, and technical mentorship.
                </p>
              </div>
              <div className="text-xs font-mono text-[#707078] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#9d85b5]" />
                <span>Mentorship • Prototyping</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#141419] border border-white/[0.06] flex flex-col justify-between space-y-6 hover:border-white/15 transition-colors">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#9d85b5] block">
                  OUR VISION
                </span>
                <h4 className="text-xl font-bold text-[#f7f7f4] font-editorial">
                  Center of Spatial Excellence
                </h4>
                <p className="text-sm text-[#a0a0a8] leading-relaxed font-light">
                  To establish BMSIT&M as a renowned academic center for extended reality innovation,
                  fostering student-led research and industry-grade interactive systems.
                </p>
              </div>
              <div className="text-xs font-mono text-[#707078] flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#9d85b5]" />
                <span>Innovation • Research</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Technological Pillars */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#b0b0b8]">
              Core Technical Focus Areas
            </h3>
            <span className="text-xs font-mono text-[#686870]">CURRICULUM & INITIATIVES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="p-6 rounded-2xl bg-[#121216] border border-white/[0.06] hover:border-[#9d85b5]/30 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#9d85b5]">{pillar.number}</span>
                      <Icon className="w-4 h-4 text-[#757580]" />
                    </div>
                    <h4 className="text-base font-semibold text-[#f7f7f4] font-editorial">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#95959e] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discrete archival notice */}
        <div className="mt-14 p-4 rounded-2xl bg-[#121216] border border-white/[0.06] text-xs font-mono text-[#8a8a92] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#c8b9db]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d85b5]" />
            <span>ARCHIVE NOTICE // VERIFIED CONTENT INTEGRATION</span>
          </div>
          <span className="text-[#686870] text-[11px]">
            Official club activity report, member rosters, and archival data synchronizing for 2024–2026 session.
          </span>
        </div>
      </div>
    </section>
  );
}
