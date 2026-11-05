import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Cpu, 
  ArrowRight, 
  Mail, 
  Radio, 
  Shield, 
  Quote, 
  Download, 
  Compass,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import FlipCalendar from './FlipCalendar';
import Interactive3DPerson from './Interactive3DPerson';
import { portfolioData } from '../data/portfolioData';

/**
 * Hero - 3D Cinematic Hero matching Sushmita's viral video portfolio.
 * 
 * Features:
 * - 3D Multi-Angle interactive person portrait (switches angles with mouse tracking & role cycling)
 * - Kinetic large role titles & 3D Flip-Calendar
 * - Dual-column editorial framing with narrative & action pills
 * - Verbatim Circuit Philosophy card
 * - Seamless support for both Light Blue/White and Dark themes
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  const [activeRoleIdx, setActiveRoleIdx] = useState(0);

  // Auto-cycle active role index to synchronize 3D person head turns
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[95vh] pt-28 sm:pt-32 pb-14 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#e8f4fd] via-[#f3f8fe] to-white dark:from-[#0b1329] dark:via-[#0f172a] dark:to-[#111827] transition-colors duration-500"
    >
      
      {/* Radiant Light-Blue Ambient Orbs & Atmospheric Spotlight */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 via-sky-300/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/20 via-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Precision Circuit Trace Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full">
          
          {/* Left Column: Greeting + Flip Calendar + Circuit Quote (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left space-y-5 order-2 lg:order-1">
            <ScrollReveal animation="fade-right" delay={100} className="w-full">
              
              {/* Status hairline badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-blue-200/80 dark:border-white/10 text-slate-800 dark:text-neutral-200 text-xs font-semibold shadow-xs backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs">
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>RRU · Electronics Engineer (Specialization in Defence Tech)</span>
                </span>
              </div>

              {/* Headline with 3D Flip Calendar */}
              <div className="space-y-1 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                  HI, I'M ABHISHEK
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                  Abhishek <span className="underline decoration-blue-500 decoration-wavy decoration-3 underline-offset-8">Gaur</span>.
                </h1>
                
                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                    CURRENTLY ARCHITECTING:
                  </span>
                  <FlipCalendar />
                </div>
              </div>

              {/* Circuit Philosophy Card - VERBATIM QUOTE */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 dark:bg-[#181615]/95 backdrop-blur-md border border-blue-200/90 dark:border-neutral-700 shadow-xl shadow-blue-500/10">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5">
                    <Quote className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-white/10 px-2 py-0.5 rounded border border-blue-200 dark:border-neutral-700 inline-block mb-1">
                      Circuit Philosophy
                    </span>
                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-neutral-300 italic font-medium leading-relaxed">
                      "{personal.quote}"
                    </p>
                  </div>
                </div>
              </div>

            </ScrollReveal>
          </div>

          {/* Center Column: 3D Person Image from Multiple Images (4 cols) */}
          <div className="lg:col-span-4 flex justify-center items-center relative order-1 lg:order-2 my-4 lg:my-0">
            <ScrollReveal animation="fade-up" delay={200} className="w-full flex justify-center">
              <Interactive3DPerson activeRoleIndex={activeRoleIdx} />
            </ScrollReveal>
          </div>

          {/* Right Column: Bio Narrative + Actions + Badges (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right space-y-5 order-3">
            <ScrollReveal animation="fade-left" delay={300} className="w-full flex flex-col items-start lg:items-end">
              
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                  TURNING SILICON INTO REALITY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Hardware &amp; IoT Innovator
                </h2>
              </div>

              {/* Narrative Bio */}
              <p className="text-slate-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal pt-2 max-w-md">
                Undergraduate at <strong className="text-slate-900 dark:text-white font-bold">{personal.university}</strong>. Keen learner and deep thinker turning raw silicon, low-latency firmware, and edge intelligence into robust real-world defence and institutional systems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-slate-900 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-500/15 transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#works"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/95 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border border-blue-200/80 dark:border-white/10 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs"
                >
                  <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>See the Doors</span>
                </a>

                <a
                  href={resumeHref}
                  download="Abhishek_Gaur_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-full bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 text-xs sm:text-sm font-semibold border border-slate-200 dark:border-neutral-700 hover:border-slate-400 transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Resume</span>
                </a>
              </div>

              {/* Verified Credentials Pills */}
              <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 pt-3 text-xs font-mono text-slate-700 dark:text-neutral-400">
                <span className="px-3 py-1 rounded-md bg-amber-50/90 dark:bg-white/5 border border-amber-200 dark:border-white/10 flex items-center gap-1.5 font-bold shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> SIH #1 Hardware Category
                </span>
                <span className="px-3 py-1 rounded-md bg-blue-50/90 dark:bg-white/5 border border-blue-200 dark:border-white/10 flex items-center gap-1.5 font-semibold shadow-xs">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Embedded Systems
                </span>
                <span className="px-3 py-1 rounded-md bg-emerald-50/90 dark:bg-white/5 border border-emerald-200 dark:border-white/10 flex items-center gap-1.5 font-semibold shadow-xs">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Telemetry & Firmware
                </span>
              </div>

            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Hero Hairline Status Bar (bottom) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
        <div className="pt-4 border-t border-blue-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Defence & Hardware R&D</span>
          </span>
          <span className="hidden sm:inline">Rashtriya Raksha University · Gandhinagar, Gujarat</span>
          <a href="#works" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span>Scroll to scrub timeline</span>
            <span>↓</span>
          </a>
        </div>
      </div>

    </section>
  );
}
