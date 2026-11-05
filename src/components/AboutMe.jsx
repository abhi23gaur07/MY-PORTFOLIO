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
  Terminal,
  Layers,
  Flame,
  MessageSquare
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * AboutMe - Full Stack & Embedded IoT Developer Storytelling & Architecture Matrix
 * 
 * Features:
 * - Left: Bio ("Full Stack & Embedded IoT Developer..."), RRU background, structured Circuit Philosophy
 * - Right: Core Technical Matrix:
 *   1. Software & Frontend Development (React, Next.js, TypeScript, 3D WebGL)
 *   2. IoT-Based Websites & Cloud Dashboards (MQTT, WebSockets, Live Sensor Telemetry)
 *   3. Hardware Proficiency & Microcontrollers (ESP32, Arduino, Raspberry Pi, STM32, KiCad PCB)
 *   4. Embedded C/C++ Architecture & IoT Proficiency (Bare-Metal C/C++, RTOS, SIH #1 Hardware Category)
 * - "🔭 About Me & Current Focus" Engineering Radar Section
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
      title: "Hardware Proficiency & Microcontrollers",
      tech: "ESP32 · Arduino · Raspberry Pi · STM32 · KiCad PCB",
      desc: "Hands-on engineering with ESP32, Arduino, Raspberry Pi, and ARM Cortex/STM32 microcontrollers. Custom multi-layer PCB design in KiCad, sensor integration, and deterministic embedded control."
    },
    {
      id: "embedded",
      icon: <Terminal className="w-4 h-4 text-amber-300" />,
      badgeColor: "border-amber-400/40 bg-amber-500/10 text-amber-300",
      title: "Embedded C/C++ Architecture & IoT Proficiency",
      tech: "Bare-Metal C/C++ · RTOS · MQTT · #1 Hardware Category",
      desc: "Architecting robust embedded C/C++ firmware, modular hardware drivers, and scalable IoT telemetry pipelines that bridge physical microcontrollers directly with modern web dashboards."
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
      subtitle: "#1 Hardware Category · #8 Overall",
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
            Bridging Hardware &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Modern Full-Stack Software
            </span>
          </h2>
        </div>

        {/* 2-Column Content Grid: Left Narrative | Right Engineering Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: NARRATIVE BIOGRAPHY & CREDENTIALS (6 COLS) */}
          {/* ==================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-4">
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
                <strong className="text-cyan-300 font-semibold">Full Stack &amp; Embedded IoT Developer</strong> bridging physical hardware and web applications. Experienced in developing responsive, real-time dashboards and interfacing microcontrollers with scalable cloud backends using modern JavaScript, C/C++, and IoT protocols. Committed to building robust, data-driven connected products that deliver measurable real-world impact.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Electronics Engineering undergraduate at <strong className="text-white font-semibold">Rashtriya Raksha University (RRU)</strong>, specializing in <strong className="text-white font-semibold">Defence Technology</strong>. Whether architecting acoustic sensor nodes for national hackathons, writing real-time register-level firmware for ARM, ESP32, and Arduino chips, designing custom circuit boards in KiCad, or engineering interactive full-stack web platforms with 3D WebGL, I build deterministic systems designed for zero-failure operational environments.
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
                  <span>SIH #1 Hardware Category</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Frontend &amp; IoT Web Engineer</span>
                </div>
              </div>
            </div>

            {/* Structured Circuit Philosophy Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c1424]/90 via-[#090f1b]/90 to-[#060a12]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group hover:border-cyan-400/60 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:scale-105 transition-transform mt-1">
                  <Quote className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                    Circuit Philosophy
                  </span>
                  
                  <div className="text-xs sm:text-sm font-mono leading-relaxed space-y-1.5 text-slate-200">
                    <p className="font-semibold text-white">
                      "Be a living electronic circuit:
                    </p>
                    <ul className="space-y-1 pl-1 text-slate-300">
                      <li>• Practice resistance where needed, like a <span className="text-cyan-300 font-semibold">Resistor</span>.</li>
                      <li>• Preserve energy where needed, like a <span className="text-cyan-300 font-semibold">Capacitor</span>.</li>
                      <li>• Direct energy where needed, like a <span className="text-cyan-300 font-semibold">Diode</span>.</li>
                      <li>• And above all, be driven by a purpose, like an <span className="text-amber-300 font-semibold">Integrated Circuit</span>."</li>
                    </ul>
                  </div>

                  <p className="text-xs font-mono text-cyan-300/80 pt-1 font-semibold">
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
          {/* Software Dev, IoT Websites, Hardware, Embedded C/C++ */}
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
                  🔬 ESP32, Arduino &amp; RPi
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold">
                  🏆 #1 Hardware Category
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 🔭 ABOUT ME & CURRENT FOCUS (ENGINEERING RADAR)          */}
        {/* Added directly after IoT-based websites / Domains       */}
        {/* ======================================================== */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#090f20]/90 via-[#060a16]/90 to-[#040710]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                🔭
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  About Me &amp; Current Focus
                </h3>
                <p className="text-xs font-mono text-cyan-300 font-semibold tracking-wider uppercase mt-0.5">
                  Live Engineering Radar &amp; Collaborative Initiatives
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              OPEN TO INNOVATIVE COLLABORATION
            </span>
          </div>

          {/* 6 High-Impact Focus Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            
            {/* 1. Currently working on */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">🔭</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    I’m currently working on:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Scalable IoT systems and full-stack web dashboards connecting smart hardware (<strong className="text-white font-semibold">ESP32/Arduino</strong>) with modern cloud APIs.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Looking to collaborate on */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">👯</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    I’m looking to collaborate on:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Open-source IoT frameworks, smart automation solutions, and data-driven full-stack applications.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Looking for help with */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">🤝</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    I’m looking for help with:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Advanced RTOS concepts, edge computing optimization, and large-scale MQTT/WebSocket pipeline architectures.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Currently learning */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">🌱</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    I’m currently learning:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Embedded C/C++ architecture, MQTT broker integrations, and Next.js for high-performance dashboard interfaces.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Ask me about */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">💬</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    Ask me about:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Sensor integration, Microcontrollers (<strong className="text-white font-semibold">ESP32, Arduino</strong>), RESTful IoT backends, and React-driven control dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Fun fact */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 group">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 mt-0.5">⚡</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                    Fun fact:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    I enjoy making hardware and software talk to each other—turning physical sensor signals into real-time web metrics is <span className="text-amber-300 font-semibold">pure magic!</span>
                  </p>
                </div>
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
