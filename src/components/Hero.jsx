import React from 'react';
import { 
  Trophy, 
  Cpu, 
  ArrowRight, 
  Mail, 
  Radio, 
  Shield, 
  Quote, 
  Download, 
  Compass 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import FlipCalendar from './FlipCalendar';
import { portfolioData } from '../data/portfolioData';

/**
 * Hero - High-impact editorial hero section with luminous light-blue & white initial background.
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#e8f4fd] via-[#f3f8fe] to-white dark:from-[#0b1329] dark:via-[#0f172a] dark:to-[#111827] transition-colors duration-500"
    >
      
      {/* Radiant Light-Blue Ambient Orbs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-sky-300/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-bl from-cyan-400/20 via-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Precision Circuit Trace Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Greeting + Flip Calendar + Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <ScrollReveal animation="fade-right" delay={100} className="w-full">
              
              {/* Status hairline badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-blue-200/80 dark:border-white/10 text-slate-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>RRU · Electronics Engineer (Specialization in Defence Tech)</span>
                </span>
              </div>

              {/* Main Headline with Flip-Calendar */}
              <div className="space-y-1 pt-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                  Hi, I'm <span className="underline decoration-blue-500 decoration-wavy decoration-3 underline-offset-8">Abhishek</span>.
                </h1>
                
                <div className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-neutral-200 tracking-tight flex flex-wrap items-baseline gap-x-3 pt-1">
                  <span>I am an</span>
                  <FlipCalendar />
                </div>
              </div>

              {/* Narrative Bio */}
              <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal pt-2">
                Undergraduate at <strong className="text-slate-900 dark:text-white font-bold">{personal.university}</strong>. Keen learner and deep thinker turning raw silicon, low-latency firmware, and edge intelligence into robust real-world defence and institutional systems.
              </p>

              {/* Action Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-slate-900 font-bold text-sm tracking-wide shadow-lg shadow-blue-500/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#works"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold text-sm border border-blue-200/80 dark:border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs"
                >
                  <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>See the Doors</span>
                </a>

                <a
                  href={resumeHref}
                  download="Abhishek_Gaur_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 text-sm font-semibold border border-slate-200 dark:border-neutral-700 hover:border-slate-400 transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              </div>

              {/* Verified Credentials Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-700 dark:text-neutral-400">
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

          {/* Right Column: Abhishek's Photo + Circuit Quote */}
          <div className="lg:col-span-5 flex justify-center items-center relative pb-8 sm:pb-12">
            <ScrollReveal animation="fade-left" delay={200} className="w-full flex justify-center">
              
              {/* Soft Ambient Glow */}
              <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-tr from-blue-400/25 to-cyan-400/25 dark:from-blue-600/15 dark:to-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Main Portrait Frame */}
              <div className="relative group w-full max-w-sm sm:max-w-md">
                
                <div className="relative p-2.5 rounded-3xl bg-white dark:bg-[#1e293b] border-2 border-blue-200/90 dark:border-neutral-700 shadow-2xl shadow-blue-500/10 transition-all duration-500 group-hover:border-blue-500">
                  
                  {/* Photo Container */}
                  <div className="relative rounded-[20px] overflow-hidden bg-slate-100 dark:bg-neutral-800 aspect-[3/4] max-h-[500px]">
                    <img
                      src={personal.avatar}
                      alt={`${personal.name} — Electronics Engineer`}
                      className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Target Corner Accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-500 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-500 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
                  </div>
                </div>

                {/* Top-Right Circuit Philosophy Quote Card */}
                <div className="absolute -top-10 -right-4 sm:-right-8 lg:-right-12 max-w-[280px] sm:max-w-[320px] bg-white/95 dark:bg-[#1a2234]/95 backdrop-blur-md border border-blue-200/90 dark:border-neutral-700 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-blue-500/10 z-20 transition-all duration-300 hover:border-blue-400">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5">
                      <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-white/10 px-2 py-0.5 rounded border border-blue-200 dark:border-neutral-700">
                          Circuit Philosophy
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-700 dark:text-neutral-300 italic font-medium leading-relaxed">
                        "{personal.quote}"
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Hero Hairline Status Bar (bottom) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="pt-4 border-t border-blue-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Defence & Hardware R&D</span>
          </span>
          <span className="hidden sm:inline">Rashtriya Raksha University · Gandhinagar, Gujarat</span>
          <a href="#works" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span>Scroll to explore</span>
            <span>↓</span>
          </a>
        </div>
      </div>

    </section>
  );
}
