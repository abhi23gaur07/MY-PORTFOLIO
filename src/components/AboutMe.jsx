import React from 'react';
import { 
  Shield, 
  Cpu, 
  Radio, 
  Trophy, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Layers, 
  Terminal,
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * AboutMe - Cinematic About Section directly following the 3D Hero.
 * 
 * Features:
 * - Clean editorial presentation matching high-end 3D portfolio standard
 * - Verbatim Circuit Philosophy quote
 * - Defence Technology specialization at Rashtriya Raksha University
 * - Interactive photo showcase & technical focus cards
 */
export default function AboutMe() {
  const { personal } = portfolioData;

  const highlights = [
    {
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      title: "Defence Tech Specialization",
      subtitle: "Rashtriya Raksha University",
      desc: "Undergraduate research and engineering in mission-critical hardware, secure communications, and tactical edge systems."
    },
    {
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      title: "SIH 2026 Hardware Winner",
      subtitle: "#1 Hardware Category · #8 Overall",
      desc: "National hackathon champions delivering functional IoT & hardware solutions for real-world infrastructure challenges."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      title: "Firmware & Embedded Systems",
      subtitle: "ARM Cortex, STM32 & ESP32",
      desc: "Low-latency C/C++ firmware, bare-metal hardware registers, real-time sensor fusion, and industrial telemetry."
    },
    {
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      title: "Edge Intelligence & IoT",
      subtitle: "Distributed Autonomous Nodes",
      desc: "Connecting physical hardware to modern cloud dashboards with robust fail-safes and end-to-end security."
    }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#05070d] text-white overflow-hidden">
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
            Turning Raw Silicon &amp; Code Into{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Mission-Ready Technology
            </span>
          </h2>
        </div>

        {/* Main Content Grid: Story + Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          
          {/* Left Column: Narrative & Circuit Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              I am an Electronics and Communication Engineering undergraduate at{' '}
              <strong className="text-white font-semibold">Rashtriya Raksha University (RRU)</strong>,
              specializing in <strong className="text-cyan-300 font-semibold">Defence Technology</strong>.
              My work lives at the exact intersection of bare-metal silicon, mission-critical embedded firmware, and modern distributed systems.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Whether architecting sensor nodes for national-level hackathons like SIH 2026, writing deterministic firmware for microcontrollers, or designing responsive real-time platforms, I build systems engineered for absolute reliability under demanding conditions.
            </p>

            {/* Circuit Philosophy Feature Card */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c1220] via-[#090e1a] to-[#060912] border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] mt-8 group hover:border-cyan-400/60 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:scale-105 transition-transform">
                  <Quote className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-1.5">
                    Circuit Philosophy
                  </span>
                  <blockquote className="text-sm sm:text-base text-slate-200 italic font-medium leading-relaxed">
                    "{personal.quote}"
                  </blockquote>
                  <p className="text-xs font-mono text-cyan-300/80 mt-2 font-semibold">
                    — Abhishek Gaur · RRU Gandhinagar
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Quick Nav to Doors Section */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#doors"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300"
              >
                <Compass className="w-4 h-4" />
                <span>Step Into The 3D Doors</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf'}
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm border border-white/15 hover:border-cyan-400/40 transition-all duration-300"
              >
                <span>Download Resume</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Portrait Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop Frame */}
            <div className="relative w-full max-w-[380px] rounded-3xl p-3 bg-gradient-to-b from-white/10 via-white/[0.03] to-cyan-500/10 backdrop-blur-xl border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2)]">
              
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#090d18] border border-white/10">
                <img
                  src="/abhishek_stage_render.jpg"
                  alt="Abhishek Gaur — Editorial Stage Portrait"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                />

                {/* Cyber HUD Overlays */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">Abhishek Gaur</span>
                    <span className="text-cyan-400 font-semibold">RRU · B.Tech ECE</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Defence Tech · SIH 2026 Winner
                  </div>
                </div>

                {/* Corner reticles */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              </div>

              {/* Status Pill Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#090d16] border border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-2 text-[11px] font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for 2026 Engineering Roles</span>
              </div>

            </div>

          </div>

        </div>

        {/* Highlights 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-400/50 shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 font-medium mt-0.5">
                {item.subtitle}
              </p>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

