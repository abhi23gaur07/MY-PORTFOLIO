import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { 
  Play, 
  ArrowRight, 
  X, 
  Quote, 
  Trophy, 
  Cpu, 
  Radio, 
  Shield, 
  Compass, 
  Download, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroAvatar = lazy(() => import('./HeroAvatar'));

gsap.registerPlugin(ScrollTrigger);

// Custom Precision SVG Icons matching the reference mockup
function RoboticArmIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="26" cy="52" rx="14" ry="5" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
      <path d="M16 52 C16 48, 36 48, 36 52" stroke="#38bdf8" strokeWidth="1.5" />
      <rect x="23" y="44" width="6" height="8" rx="2" stroke="#38bdf8" strokeWidth="1.5" fill="rgba(56,189,248,0.15)" />
      <circle cx="26" cy="42" r="3.5" stroke="#38bdf8" strokeWidth="1.5" fill="#090d16" />
      <path d="M26 38.5 L24 24" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="23" r="3" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.4" />
      <path d="M27 23 L44 32" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="33" r="2.5" stroke="#38bdf8" strokeWidth="1.5" />
      <path d="M47 31 L54 27 M47 35 L54 39" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="54" cy="27" r="1.5" fill="#38bdf8" />
      <circle cx="54" cy="39" r="1.5" fill="#38bdf8" />
    </svg>
  );
}

/**
 * Hero - Cinematic Split Composition (Left 55% Typography | Right 45% Large 3D Avatar).
 * 
 * Exact specifications:
 * - Left 55%: Name, Description, Buttons, Status
 * - Right 45%: Dedicated clear space where the LARGE 3D character stands in real WebGL
 * - Floating cards frame the character with depth without obscuring face/body
 * - GSAP ScrollTrigger: text moves/fades, camera pushes toward character, smooth transition
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const heroRef = useRef(null);
  const leftColRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // GSAP ScrollTrigger Parallax & Fade
  useEffect(() => {
    if (!heroRef.current || !leftColRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text fades & gently drifts upward on scroll
      gsap.to(leftColRef.current, {
        y: -90,
        opacity: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 1.2
        }
      });

      // 2. Floating cards drift at independent parallax depths
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          y: -140,
          opacity: 0.1,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom 50%', scrub: 1 }
        });
      }
      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          y: -180,
          opacity: 0.1,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom 50%', scrub: 1.4 }
        });
      }
      if (card3Ref.current) {
        gsap.to(card3Ref.current, {
          y: -100,
          opacity: 0.1,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom 50%', scrub: 0.8 }
        });
      }
      if (card4Ref.current) {
        gsap.to(card4Ref.current, {
          y: -120,
          opacity: 0.1,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom 50%', scrub: 1.1 }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen lg:min-h-[105vh] w-full flex flex-col justify-between select-none pt-28 pb-10 z-10 pointer-events-none"
    >
      {/* Subtle Volumetric Center-Right Spotlight Glow */}
      <div className="absolute top-[42%] right-[10%] w-[650px] h-[750px] bg-radial from-cyan-500/10 via-blue-600/5 to-transparent blur-[130px] rounded-full pointer-events-none" />

      {/* Main Split Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center w-full">
          
          {/* ==================================================== */}
          {/* LEFT 55%: EDITORIAL PORTFOLIO TYPOGRAPHY (7 COLS)     */}
          {/* ==================================================== */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 flex flex-col items-start text-left pointer-events-auto space-y-5 pt-2 lg:pt-0 z-20"
          >
            
            {/* Eyebrow with Cyan Accent Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase">
                ELECTRONICS ENGINEER · DEFENCE TECHNOLOGY
              </span>
              <div className="w-10 h-[2.5px] rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
            </div>

            {/* Massive Chiseled 3D Chrome Typography */}
            <div>
              <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-black tracking-[-0.04em] leading-[0.92] text-white">
                <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  ABHISHEK
                </span>
                <span className="inline-flex items-baseline bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  GAUR
                </span>
                {/* Pulsing Cyan Cursor */}
                <span className="inline-block w-[4px] h-[0.78em] bg-cyan-400 ml-2 align-baseline translate-y-1 shadow-[0_0_12px_#38bdf8] animate-[pulse_1s_infinite]" />
              </h1>
            </div>

            {/* Subline Tracker: CREATIVE ENGINEER */}
            <div className="pt-0.5">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.38em] text-neutral-400 uppercase block">
                CREATIVE ENGINEER · B.TECH ECE
              </span>
            </div>

            {/* Editorial Lede Description */}
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1 max-w-lg">
              Hardware &amp; IoT innovator building intelligent systems where engineering meets imagination.
              Undergraduate at <strong className="text-white font-semibold">Rashtriya Raksha University (RRU)</strong>,
              specializing in mission-critical silicon, low-latency firmware, and edge defence telemetry.
            </p>

            {/* Action Buttons: VIEW MY WORK ↗ + WATCH INTRO + RESUME */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              
              {/* Primary Action: VIEW MY WORK ↗ */}
              <a
                href="#doors"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/25 via-blue-600/35 to-indigo-600/25 hover:from-cyan-500/40 hover:to-blue-600/50 text-white font-bold text-xs sm:text-sm tracking-wide border-2 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary Action: ▶ WATCH INTRO */}
              <button
                type="button"
                onClick={() => setShowIntroModal(true)}
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm border border-white/15 hover:border-cyan-400/50 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.3)] group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all">
                  <Play className="w-3 h-3 fill-current translate-x-0.5" />
                </div>
                <span>WATCH INTRO</span>
              </button>

              {/* Resume download */}
              <a
                href={resumeHref}
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs border border-white/10 hover:border-white/20 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>RESUME</span>
              </a>

            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT 45%: LARGE 3D CHARACTER CLEAR SPACE (5 COLS)   */}
          {/* Dedicated WebGL HeroAvatar (abhishek.glb)            */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 relative min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center justify-center pointer-events-none">
            
            {/* 3D WebGL Canvas Layer (below cards) */}
            <Suspense fallback={null}>
              <HeroAvatar onLoaded={() => setAvatarLoaded(true)} />
            </Suspense>

            {/* Floating Cards Layered AROUND the 3D Character (No obstruction of face/body) */}
            <div className="relative w-full h-full min-h-[520px] pointer-events-none z-10">
              
              {/* Card 1: Embedded Systems (Top-Left of right zone, beside shoulder) */}
              <a
                ref={card1Ref}
                href="#skills"
                className="absolute top-[8%] -left-6 sm:-left-10 lg:-left-12 z-10 pointer-events-auto hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#09101d]/85 backdrop-blur-xl border border-cyan-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-cyan-300 hover:scale-105 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0">
                  <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 leading-tight">
                    Embedded Systems
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400">
                    Build. Integrate. Innovate.
                  </div>
                </div>
              </a>

              {/* Card 2: Defence Technology (Top-Right, behind upper right) */}
              <a
                ref={card2Ref}
                href="#about"
                className="absolute top-[12%] right-0 sm:-right-4 z-10 pointer-events-auto hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#09101d]/85 backdrop-blur-xl border border-cyan-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-cyan-300 hover:scale-105 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 leading-tight">
                    Defence Technology
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400">
                    For a Safer Tomorrow.
                  </div>
                </div>
              </a>

              {/* Card 3: IoT & Smart Systems (Bottom-Left, near waist height) */}
              <a
                ref={card3Ref}
                href="#doors"
                className="absolute bottom-[24%] -left-8 sm:-left-12 lg:-left-16 z-20 pointer-events-auto hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#09101d]/85 backdrop-blur-xl border border-cyan-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-cyan-300 hover:scale-105 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0">
                  <RoboticArmIcon className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 leading-tight">
                    IoT &amp; Smart Systems
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400">
                    Connect. Automate. Evolve.
                  </div>
                </div>
              </a>

              {/* Card 4: SIH 2026 Winner (Bottom-Right, near platform base) */}
              <a
                ref={card4Ref}
                href="#achievements"
                className="absolute bottom-[16%] right-0 sm:-right-4 z-20 pointer-events-auto hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#09101d]/85 backdrop-blur-xl border border-amber-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-amber-300 hover:scale-105 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-400/50 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 leading-tight">
                    SIH 2026 Winner
                  </div>
                  <div className="text-[10px] font-mono text-amber-400">
                    #1 Hardware · #8 Overall
                  </div>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM SCROLL INDICATOR                                  */}
      {/* ======================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 z-20 flex justify-between items-center pointer-events-auto">
        <a
          href="#about"
          className="inline-flex items-center gap-2.5 text-xs font-mono text-neutral-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <div className="w-4 h-6 rounded-full border border-neutral-500 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <span className="tracking-wider">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className={`w-2 h-2 rounded-full ${avatarLoaded ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-400'} animate-pulse`} />
          <span>{avatarLoaded ? '3D WebGL Avatar Active' : 'Loading 3D Avatar...'}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CINEMATIC INTRO SPOTLIGHT MODAL                          */}
      {/* ======================================================== */}
      {showIntroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in pointer-events-auto">
          <div className="absolute inset-0" onClick={() => setShowIntroModal(false)} />

          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#101524] to-[#070912] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(56,189,248,0.35)] text-white z-10">
            
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Engineering Spotlight · Abhishek Gaur
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Creative Hardware &amp; Defence Technology Lead
                </h3>
              </div>

              <button
                onClick={() => setShowIntroModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-6 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Quote className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mb-1.5">
                    Circuit Philosophy
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 italic font-medium leading-relaxed">
                    "{personal.quote}"
                  </p>
                  <p className="text-right text-[11px] font-mono text-cyan-400/80 mt-1">
                    — Abhishek Gaur · RRU Gandhinagar
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">SIH Winner</div>
                <div className="text-[10px] font-mono text-neutral-400">#1 Hardware</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Cpu className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">ARM &amp; STM32</div>
                <div className="text-[10px] font-mono text-neutral-400">Firmware</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Radio className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">IoT Systems</div>
                <div className="text-[10px] font-mono text-neutral-400">Telemetry</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Defence Tech</div>
                <div className="text-[10px] font-mono text-neutral-400">RRU Major</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href="#doors"
                onClick={() => setShowIntroModal(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Enter 3D Doors Hallway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={resumeHref}
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Download Resume</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
