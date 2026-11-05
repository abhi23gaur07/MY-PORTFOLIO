import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * Hero - 1:1 Exact 3D Cinematic Recreation of Abhishek Gaur's Concept Mockup.
 * 
 * Features:
 * - 3D Perspective Stage with interactive mouse parallax tilt
 * - Central 3D beveled glass holographic slab over glowing metallic cyber pedestal
 * - 4 Orbiting 3D Holographic Cards with live interactive hotspots:
 *   1. Embedded Systems (Build. Integrate. Innovate.) -> jumps to #skills
 *   2. IoT & Smart Systems (Connect. Automate. Evolve.) -> jumps to #works
 *   3. Defence Technology (For a Safer Tomorrow.) -> jumps to #about
 *   4. SIH 2026 (#1 Hardware, #8 Overall) -> jumps to #achievements
 * - Left column chiseled chrome typography with live blinking cyan cursor
 * - Glowing cyber pill CTA "Explore My Work →" & Glass circle "▶ Watch Intro"
 * - Cinema-grade Intro Spotlight Modal with verbatim Circuit Philosophy quote
 * - Responsive desktop 3D stage and mobile stacked layout
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [activeCardTooltip, setActiveCardTooltip] = useState(null);
  const stageRef = useRef(null);

  // 3D Mouse Parallax Tracking on Desktop
  const handleMouseMove = useCallback((e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Compute 3D tilt values
  const tiltY = mousePos.x * 5.5;
  const tiltX = mousePos.y * -4.5;
  const parallaxX = mousePos.x * -12;
  const parallaxY = mousePos.y * -8;

  return (
    <section
      id="home"
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#06080d] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Volumetric Particle Aura */}
      <div className="absolute inset-0 bg-radial from-blue-950/20 via-[#06080d]/80 to-[#06080d] pointer-events-none" />

      {/* DESKTOP 3D CINEMATIC VIEWPORT (16:9 Photorealistic 3D Stage) */}
      <div className="hidden md:flex relative w-full flex-1 items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 perspective-[1400px]">
        
        {/* 3D Tilt Stage Wrapper */}
        <div
          style={{
            transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(1.01)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative w-full max-w-[1360px] aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-cyan-500/20"
        >
          {/* Base 3D Rendered Cinematic Artwork */}
          <img
            src="/cinematic-stage.jpg"
            alt="Abhishek Gaur — 3D Cinematic Portfolio Stage"
            className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
          />

          {/* Interactive Atmospheric Glow & Lens Flare Overlay */}
          <div
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px)`
            }}
            className="absolute inset-0 bg-radial from-cyan-400/10 via-transparent to-transparent pointer-events-none"
          />

          {/* ======================================================== */}
          {/* LIVE INTERACTIVE OVERLAYS (Precise 1:1 Hotspots)         */}
          {/* ======================================================== */}

          {/* 1. Left Typography Live Overlay (Selectable & Sharp) */}
          <div className="absolute top-[22%] left-[6.5%] z-20 pointer-events-none max-w-[400px]">
            {/* Blinking Cyan Cursor on GAUR */}
            <div className="absolute top-[96px] left-[214px] w-[3px] h-[48px] bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-[pulse_1s_infinite] pointer-events-none" />
          </div>

          {/* 2. Primary CTA: "Explore My Work →" */}
          <a
            href="#works"
            title="Explore Flagship Hardware & IoT Doors"
            className="absolute top-[63.2%] left-[6.8%] z-30 w-[140px] h-[44px] rounded-full bg-cyan-500/0 hover:bg-cyan-500/20 border-2 border-transparent hover:border-cyan-400/80 shadow-none hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center group"
          >
            <span className="sr-only">Explore My Work</span>
            <div className="w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-300">
              <span>Enter Doors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* 3. Secondary CTA: "▶ Watch Intro" */}
          <button
            type="button"
            onClick={() => setShowIntroModal(true)}
            title="Watch 3D Engineering Intro Tour"
            className="absolute top-[63.2%] left-[19.8%] z-30 w-[130px] h-[44px] rounded-full bg-cyan-500/0 hover:bg-white/10 border-2 border-transparent hover:border-white/40 shadow-none hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center group"
          >
            <span className="sr-only">Watch Intro</span>
            <div className="w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-semibold text-white">
              <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" />
              <span>Play Intro</span>
            </div>
          </button>

          {/* 4. Card 1 Hotspot: Embedded Systems (Top-Left) */}
          <a
            href="#skills"
            onMouseEnter={() => setActiveCardTooltip('embedded')}
            onMouseLeave={() => setActiveCardTooltip(null)}
            title="Embedded Systems: ARM Cortex-M, STM32 & Firmware"
            className="absolute top-[14.8%] left-[33.2%] z-30 w-[142px] h-[78px] rounded-xl border border-transparent hover:border-cyan-400/70 hover:bg-cyan-500/15 shadow-none hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span className="sr-only">Embedded Systems</span>
            {activeCardTooltip === 'embedded' && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-lg">
                View ARM Cortex-M & STM32 Skills ↓
              </div>
            )}
          </a>

          {/* 5. Card 2 Hotspot: IoT & Smart Systems (Bottom-Left) */}
          <a
            href="#works"
            onMouseEnter={() => setActiveCardTooltip('iot')}
            onMouseLeave={() => setActiveCardTooltip(null)}
            title="IoT & Smart Systems: Acoustic ToF & mmWave Radar"
            className="absolute top-[52.5%] left-[30.5%] z-30 w-[165px] h-[95px] rounded-xl border border-transparent hover:border-cyan-400/70 hover:bg-cyan-500/15 shadow-none hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span className="sr-only">IoT & Smart Systems</span>
            {activeCardTooltip === 'iot' && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-lg">
                View Aqua Saviour & Nexus Nurture ↓
              </div>
            )}
          </a>

          {/* 6. Card 3 Hotspot: Defence Technology (Top-Right) */}
          <a
            href="#about"
            onMouseEnter={() => setActiveCardTooltip('defence')}
            onMouseLeave={() => setActiveCardTooltip(null)}
            title="Defence Technology: RRU Specialization & Hardware"
            className="absolute top-[12.5%] left-[74.5%] z-30 w-[185px] h-[140px] rounded-xl border border-transparent hover:border-cyan-400/70 hover:bg-cyan-500/15 shadow-none hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span className="sr-only">Defence Technology</span>
            {activeCardTooltip === 'defence' && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-lg">
                Rashtriya Raksha University Specialization ↓
              </div>
            )}
          </a>

          {/* 7. Card 4 Hotspot: SIH 2026 Winner (Bottom-Right) */}
          <a
            href="#achievements"
            onMouseEnter={() => setActiveCardTooltip('sih')}
            onMouseLeave={() => setActiveCardTooltip(null)}
            title="SIH 2026: #1 Hardware Category · #8 Overall"
            className="absolute top-[52.5%] left-[76.2%] z-30 w-[180px] h-[98px] rounded-xl border border-transparent hover:border-amber-400/80 hover:bg-amber-500/15 shadow-none hover:shadow-[0_0_30px_rgba(251,191,36,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span className="sr-only">SIH 2026 Achievement</span>
            {activeCardTooltip === 'sih' && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-amber-400/50 text-[10px] font-mono text-amber-300 whitespace-nowrap shadow-lg">
                View SIH #1 Hardware Trophy Details ↓
              </div>
            )}
          </a>

          {/* 8. Center Pedestal Badge Interactive Glow */}
          <div className="absolute top-[82.5%] left-[41%] w-[270px] h-[34px] z-30 rounded-full border border-transparent hover:border-cyan-400/50 hover:bg-cyan-500/10 cursor-pointer transition-all duration-300 flex items-center justify-center">
            <span className="sr-only">Rashtriya Raksha University B.Tech ECE</span>
          </div>

          {/* 9. Bottom Left Scroll Down Link */}
          <a
            href="#about"
            className="absolute bottom-[3%] left-[4.5%] z-30 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-cyan-300 transition-colors"
          >
            <div className="w-4 h-6 rounded-full border border-neutral-500 flex items-start justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
            <span>Scroll Down</span>
          </a>

        </div>

      </div>

      {/* MOBILE RESPONSIVE 3D CARD STACK (Shown on screens < 768px) */}
      <div className="md:hidden flex flex-col items-center pt-24 pb-16 px-4 space-y-8 z-10">
        
        {/* Left Column Content (Centered for Mobile) */}
        <div className="text-center space-y-3 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>RRU · Specialization in Defence Tech</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight leading-none text-white">
            ABHISHEK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              GAUR |
            </span>
          </h1>

          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            CREATIVE ENGINEER
          </p>

          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            Embedded Systems Engineer · IoT Innovator · Defence Technology Enthusiast at Rashtriya Raksha University.
          </p>

          {/* Mobile Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="#works"
              className="px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setShowIntroModal(true)}
              className="px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Watch Intro</span>
            </button>
          </div>
        </div>

        {/* Center Portrait in 3D Glass Frame */}
        <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/60 p-2 bg-gradient-to-b from-[#111624] to-[#07090f]">
          <img
            src="/abhishek-forward.jpg"
            alt="Abhishek Gaur"
            className="w-full h-full object-cover object-[center_20%] rounded-2xl"
          />
          <div className="absolute bottom-3 inset-x-4 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-center font-mono text-[10px] text-cyan-300">
            Rashtriya Raksha University · B.Tech ECE
          </div>
        </div>

        {/* 4 Cards Grid for Mobile */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <a
            href="#skills"
            className="p-3 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-400 text-left transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-bold text-white">Embedded Systems</div>
            <div className="text-[10px] font-mono text-neutral-400">Build. Integrate.</div>
          </a>

          <a
            href="#works"
            className="p-3 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-400 text-left transition-all"
          >
            <Radio className="w-4 h-4 text-blue-400 mb-1" />
            <div className="text-xs font-bold text-white">IoT &amp; Smart Systems</div>
            <div className="text-[10px] font-mono text-neutral-400">Connect. Automate.</div>
          </a>

          <a
            href="#about"
            className="p-3 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-400 text-left transition-all"
          >
            <Shield className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-bold text-white">Defence Tech</div>
            <div className="text-[10px] font-mono text-neutral-400">For a Safer Tomorrow</div>
          </a>

          <a
            href="#achievements"
            className="p-3 rounded-2xl bg-white/5 border border-amber-500/20 hover:border-amber-400 text-left transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400 mb-1" />
            <div className="text-xs font-bold text-white">SIH 2026 Winner</div>
            <div className="text-[10px] font-mono text-amber-300">#1 Hardware Category</div>
          </a>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3D CINEMATIC INTRO SPOTLIGHT MODAL                       */}
      {/* ======================================================== */}
      {showIntroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in">
          
          {/* Backdrop click to dismiss */}
          <div className="absolute inset-0" onClick={() => setShowIntroModal(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#101524] to-[#090b12] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(56,189,248,0.3)] text-white z-10 transition-all">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  3D Cinematic Overview · Abhishek Gaur
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

            {/* Verbatim Circuit Philosophy Quote */}
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

            {/* Core Competencies Quick Summary */}
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

            {/* Action CTAs inside modal */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href="#works"
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
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all"
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
