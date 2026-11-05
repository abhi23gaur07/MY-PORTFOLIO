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
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * AboutMe - Cinematic Storytelling Section.
 * 
 * Flow:
 * - As user scrolls down from Hero, the camera pushes in closer to the 3D avatar
 * - Character subtly rotates to face the user
 * - Narrative and credentials fade in alongside the real 3D model
 */
export default function AboutMe() {
  const { personal } = portfolioData;

  const highlights = [
    {
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      title: "Defence Tech Specialization",
      subtitle: "Rashtriya Raksha University",
      desc: "Tactical edge computing, encrypted telemetry, and low-latency hardware architectures."
    },
    {
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      title: "SIH 2026 Winner",
      subtitle: "#1 Hardware · #8 Overall",
      desc: "National champions delivering functional smart-infrastructure prototypes."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      title: "Firmware & Embedded",
      subtitle: "ARM Cortex & STM32",
      desc: "Deterministic C/C++ firmware, bare-metal hardware registers, and sensor fusion."
    },
    {
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      title: "Edge IoT Architecture",
      subtitle: "Autonomous Nodes",
      desc: "Bridging physical silicon to cloud dashboards with military-grade fail-safes."
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 sm:py-36 text-white overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-2xl leading-[1.08]">
            Engineering Silicon, Hardware &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Edge Intelligence
            </span>
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Glass Narrative Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-5">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                I am an Electronics and Communication Engineering undergraduate at{' '}
                <strong className="text-cyan-300 font-semibold">Rashtriya Raksha University (RRU)</strong>,
                specializing in <strong className="text-white font-semibold">Defence Technology</strong>.
                My work bridges the physical reality of circuits and microcontrollers with high-level distributed systems.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether architecting acoustic sensor nodes for national hackathons, writing real-time register-level firmware for ARM chips, or leading hardware engineering teams, I build deterministic systems designed for zero-failure operational environments.
              </p>

              {/* Status List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Rashtriya Raksha University</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Defence Tech Specialization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Smart India Hackathon #1</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Available for 2026 Roles</span>
                </div>
              </div>
            </div>

            {/* Circuit Philosophy Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c1424]/90 via-[#090f1b]/90 to-[#060a12]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group hover:border-cyan-400/60 transition-all duration-300">
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

            {/* Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
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

          {/* Right Column: Clear Space where 3D Avatar is positioned during scroll (5 cols) */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col items-center justify-center min-h-[420px] pointer-events-none">
            {/* Ambient telemetry badge floating beside character */}
            <div className="p-4 rounded-2xl bg-[#09101d]/75 backdrop-blur-xl border border-cyan-400/30 text-left space-y-1 shadow-2xl max-w-xs ml-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Live 3D Telemetry
              </span>
              <div className="text-xs font-bold text-white">
                Abhishek Gaur Avatar
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Camera tracking active · Dynamic lighting responding to scroll position
              </p>
            </div>
          </div>

        </div>

        {/* 4 Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-[#080d18]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-lg transition-all duration-300 group hover:-translate-y-1"
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
