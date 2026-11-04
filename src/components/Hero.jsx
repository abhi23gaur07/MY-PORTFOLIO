import React from 'react';
import { 
  Trophy, 
  Cpu, 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Radio, 
  Shield, 
  Quote, 
  Download, 
  Compass, 
  Activity,
  Layers
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import FlipCalendar from './FlipCalendar';
import KineticHeadline from './KineticHeadline';
import ParticlePortrait from './ParticlePortrait';
import { portfolioData } from '../data/portfolioData';

/**
 * Hero - High-impact editorial hero section with @_code_and_chill_ viral animations.
 * 
 * Features:
 * - 3D Thrown-Name kinetic entrance typography
 * - Interactive HTML5 Canvas Particle Face Matrix (disperse on hover, blast on click)
 * - Anti-overlap placement of Circuit Philosophy quote badge
 * - 3D Flip-Calendar role switcher without text clipping
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      
      {/* Background Ambient Cyber Field */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Kinetic Greeting + Flip Calendar + Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <ScrollReveal animation="fade-right" delay={100} className="w-full">
              
              {/* Defence Status Hairline Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-slate-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>RRU · Specialization in Defence Technology</span>
                </span>
              </div>

              {/* Main Headline with 3D Thrown-Name Kinetic Entrance */}
              <div className="space-y-2 pt-2">
                <KineticHeadline
                  text="Hi, I'm Abhishek."
                  highlightWord="Abhishek"
                />
                
                <div className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-neutral-200 tracking-tight flex flex-wrap items-baseline gap-x-3 pt-1">
                  <span>I am an</span>
                  <FlipCalendar />
                </div>
              </div>

              {/* Narrative Bio */}
              <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal pt-2">
                Undergraduate at <strong className="text-slate-900 dark:text-white font-bold">{personal.university}</strong>. Keen learner and deep thinker turning raw silicon, low-latency firmware, and edge intelligence into robust real-world defence and institutional systems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-slate-900 font-bold text-sm tracking-wide shadow-xl shadow-blue-500/10 transition-all hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#works"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold text-sm border border-black/10 dark:border-white/10 transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>See the Doors</span>
                </a>

                <a
                  href={resumeHref}
                  download="Abhishek_Gaur_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 text-sm font-semibold border border-slate-200 dark:border-neutral-700 hover:border-slate-400 dark:hover:border-neutral-500 transition-all shadow-xs hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              </div>

              {/* Verified Credentials Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-600 dark:text-neutral-400">
                <span className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-1.5 font-bold shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> SIH #1 Hardware Category
                </span>
                <span className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-1.5 shadow-xs">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Embedded Systems
                </span>
                <span className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-1.5 shadow-xs">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Telemetry & Firmware
                </span>
              </div>

            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Particle Face + Unobstructed Philosophy Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative pb-12 sm:pb-16 pt-4">
            <ScrollReveal animation="fade-left" delay={200} className="w-full flex justify-center">
              
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* 3D Particle Face Matrix Component */}
                <ParticlePortrait
                  imageSrc={personal.avatar}
                  alt={`${personal.name} — Electronics Engineer`}
                />

                {/* Circuit Philosophy Card - Positioned Elegantly Below/Torso Area so Abhishek's Face is 100% Unobstructed */}
                <div className="absolute -bottom-8 -right-2 sm:-right-6 lg:-right-8 max-w-[280px] sm:max-w-[320px] bg-white/95 dark:bg-[#181615]/95 backdrop-blur-xl border border-cyan-500/40 dark:border-cyan-500/30 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/25 z-20 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/30 dark:border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 shadow-inner">
                      <Quote className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          Circuit Philosophy
                        </span>
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-2 rounded-full bg-cyan-500 animate-pulse" />
                          <span className="w-1 h-3 rounded-full bg-cyan-400 animate-pulse delay-75" />
                          <span className="w-1 h-1.5 rounded-full bg-blue-500 animate-pulse delay-150" />
                        </div>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-700 dark:text-neutral-300 italic font-medium leading-relaxed">
                        "{personal.quote}"
                      </p>
                      <div className="mt-1.5 text-right">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 font-semibold">
                          — Abhishek Gaur
                        </span>
                      </div>
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
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Defence & Hardware R&D</span>
          </span>
          <span className="hidden sm:inline">Rashtriya Raksha University · Gandhinagar, Gujarat</span>
          <a href="#works" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
            <span>Scroll to explore</span>
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </div>

    </section>
  );
}
