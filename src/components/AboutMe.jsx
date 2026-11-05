import React from 'react';
import { 
  Shield, 
  Cpu, 
  Wifi, 
  Code2, 
  Trophy, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  Compass,
  CheckCircle2,
  Activity,
  Download,
  Layers,
  Terminal,
  Globe
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * AboutMe - Cinematic Storytelling & Comprehensive Engineering Matrix
 * 
 * Features:
 * - Left: Narrative biography, RRU Defence specialization, circuit philosophy & credentials
 * - Right: Complete Engineering Matrix showcasing:
 *   1. Software Development & Modern Frontend (React, Next.js, TypeScript, 3D WebGL)
 *   2. IoT-Based Websites & Cloud Telemetry (Real-time MQTT, WebSockets, Sensor Dashboards)
 *   3. Hardware & Silicon Proficiency (ARM Cortex, STM32, ESP32, KiCad PCB, Bare-Metal Firmware)
 *   4. Defence Technology & Mission-Critical Reliability (RRU Major, SIH National Winner)
 * - 4 Detailed highlight metric cards below
 */
export default function AboutMe() {
  const { personal } = portfolioData;

  const domains = [
    {
      id: "software",
      icon: <Code2 className="w-4 h-4 text-cyan-300" />,
      badgeColor: "border-cyan-400/40 bg-cyan-500/10 text-cyan-300",
      title: "Software & Frontend Development",
      tech: "React · Next.js · TypeScript · Tailwind · WebGL",
      desc: "Architecting high-performance, responsive web applications with interactive 3D WebGL (Three.js), smooth GSAP animations, and clean full-stack architectural design."
    },
    {
      id: "iot",
      icon: <Wifi className="w-4 h-4 text-emerald-300" />,
      badgeColor: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
      title: "IoT-Based Websites & Cloud Dashboards",
      tech: "MQTT · WebSockets · Live Sensor Telemetry",
      desc: "Building real-time IoT monitoring platforms and responsive telemetry web dashboards that visualize physical sensor streams and edge hardware status with sub-second latency."
    },
    {
      id: "hardware",
      icon: <Cpu className="w-4 h-4 text-blue-300" />,
      badgeColor: "border-blue-400/40 bg-blue-500/10 text-blue-300",
      title: "Hardware & Silicon Proficiency",
      tech: "ARM Cortex · STM32 · ESP32 · KiCad PCB · C/C++",
      desc: "Mastery in bare-metal register-level programming, deterministic embedded firmware, custom multi-layer PCB design in KiCad, and low-latency hardware-silicon integration."
    },
    {
      id: "defence",
      icon: <Shield className="w-4 h-4 text-amber-300" />,
      badgeColor: "border-amber-400/40 bg-amber-500/10 text-amber-300",
      title: "Defence Tech & Mission-Critical Reliability",
      tech: "RRU Major · SIH 2026 Winner · Tactical Telemetry",
      desc: "Specialized in zero-failure operational systems, encrypted edge communication nodes, and national-level award-winning hardware-software architectures."
    }
  ];

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
      desc: "National champions delivering functional smart-infrastructure and IoT prototypes."
    },
    {
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      title: "Full-Stack & WebGL",
      subtitle: "Frontend & Software",
      desc: "Interactive 3D WebGL web experiences, responsive React architectures, and modern web apps."
    },
    {
      icon: <Wifi className="w-5 h-5 text-emerald-400" />,
      title: "Edge IoT Architecture",
      subtitle: "Live Web Telemetry",
      desc: "Bridging physical silicon to cloud dashboards with military-grade fail-safes."
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 sm:py-32 text-white overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-3xl leading-[1.08]">
            Bridging Silicon Hardware &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Modern Full-Stack Software
            </span>
          </h2>
        </div>

        {/* 2-Column Content Grid: Left Narrative | Right Engineering Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: NARRATIVE BIOGRAPHY & CREDENTIALS (6 COLS) */}
          {/* ==================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-5">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                I am an Electronics and Communication Engineering undergraduate at{' '}
                <strong className="text-cyan-300 font-semibold">Rashtriya Raksha University (RRU)</strong>,
                specializing in <strong className="text-white font-semibold">Defence Technology</strong>.
                My work uniquely bridges the physical reality of circuits, microcontrollers, and custom PCBs with high-level modern software development and IoT-based websites.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether architecting acoustic sensor nodes for national hackathons, writing real-time register-level firmware for ARM chips, designing custom multi-layer circuit boards, or engineering interactive full-stack web platforms with 3D WebGL, I build deterministic systems designed for zero-failure operational environments.
              </p>

              {/* Status List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono text-slate-300">
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
                  <span>Frontend &amp; IoT Web Engineer</span>
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
                    Engineering Philosophy
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

            {/* Navigation & Resume Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#doors"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore The 3D Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/Abhishek_Gaur_Resume.pdf"
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white font-mono font-bold text-xs sm:text-sm border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: CORE ENGINEERING MATRIX (6 COLS)       */}
          {/* Software Dev, Frontend, IoT Websites, Hardware       */}
          {/* ==================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-[#080d1a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-4">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                    Core Technical Domains
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  ● 4/4 PROFICIENCY
                </span>
              </div>

              {/* 4 Technical Domain Modules */}
              <div className="space-y-3.5">
                {domains.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 shadow-sm transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        {d.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {d.title}
                          </h4>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${d.badgeColor}`}>
                            {d.tech}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tech Stack Tags */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  Stack:
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-semibold">
                  ⚡ React &amp; Next.js
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-semibold">
                  🛰️ IoT Web Dashboards
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 font-semibold">
                  🔬 STM32 &amp; KiCad PCB
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold">
                  🏆 SIH Winner
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Detailed Highlights Grid */}
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
