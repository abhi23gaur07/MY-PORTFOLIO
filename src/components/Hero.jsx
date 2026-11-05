import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Shield, 
  Code2, 
  Play, 
  Pause,
  Box,
  Film,
  Sparkles,
  X,
  Quote,
  Radio,
  Trophy,
  Download,
  Compass
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroAvatar = lazy(() => import('./HeroAvatar'));

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero - 1:1 Recreation of the Cinematic Editorial Portfolio Mockup
 * 
 * Composition:
 * - Full viewport background video (/hero_video.mp4) of Abhishek walking & posing on the circular pedestal
 * - Poster fallback (/hero_mockup.jpg) for instantaneous rendering
 * - Left: "HI, I'M ABHISHEK GAUR", "ELECTRONICS ENGINEER \n DEFENCE TECHNOLOGY", horizontal rule, "EXPLORE MY WORK →"
 * - Right: "BUILDING INTELLIGENT SYSTEMS FOR A SMARTER TOMORROW", Cyber HUD card with HARDWARE & IoT, DEFENCE TECH, EMBEDDED SYSTEMS
 * - Center Bottom: Mouse capsule + "SCROLL TO EXPLORE" with vertical guideline
 * - Interactive: Smooth mouse parallax, GSAP ScrollTrigger transitions, optional 3D avatar switch
 */
export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('video'); // 'video' | 'avatar'
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const bottomBarRef = useRef(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  // Video Autoplay & Play/Pause Handler
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Hero video autoplay muted fallback:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [viewMode]);

  const toggleVideoPlayback = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Smooth Lerped Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetMouse.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;
      setMouseParallax({
        x: currentMouse.current.x,
        y: currentMouse.current.y
      });
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // GSAP ScrollTrigger Parallax & Fade
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Left Typography drifts up and fades
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -100,
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 45%',
            scrub: 1.2
          }
        });
      }

      // 2. Right HUD Card drifts up and fades
      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: -120,
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 45%',
            scrub: 1.4
          }
        });
      }

      // 3. Bottom Scroll Indicator fades early
      if (bottomBarRef.current) {
        gsap.to(bottomBarRef.current, {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'top -20%',
            scrub: 0.8
          }
        });
      }

      // 4. Background video subtle scale & push-in
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.12,
          opacity: 0.35,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [viewMode]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[720px] max-h-[1200px] flex flex-col justify-between overflow-hidden bg-[#05070c] select-none z-10"
    >
      {/* ======================================================== */}
      {/* CINEMATIC HERO BACKGROUND (VIDEO / 3D AVATAR)            */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        
        {viewMode === 'video' ? (
          <>
            {/* Real Background Video of Abhishek walking & posing on circular pedestal */}
            <video
              ref={videoRef}
              src="/hero_video.mp4"
              poster="/hero_mockup.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] lg:object-center transform transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `scale(${1.03 + Math.abs(mouseParallax.x) * 0.02}) translate3d(${mouseParallax.x * 12}px, ${mouseParallax.y * 10}px, 0)`
              }}
            />

            {/* Subtle Vignettes & Seamless Background Blending */}
            {/* Top Vignette for Navbar legibility */}
            <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#05070c]/90 via-[#05070c]/40 to-transparent pointer-events-none" />
            
            {/* Bottom Vignette for seamless merge into AboutMe */}
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#05070c] via-[#05070c]/75 to-transparent pointer-events-none" />

            {/* Left Vignette for Typography Contrast */}
            <div className="absolute top-0 bottom-0 left-0 w-1/3 sm:w-1/2 bg-gradient-to-r from-[#05070c]/80 via-[#05070c]/30 to-transparent pointer-events-none" />

            {/* Right Vignette for HUD Card Contrast */}
            <div className="absolute top-0 bottom-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-[#05070c]/70 via-[#05070c]/20 to-transparent pointer-events-none" />
            
            {/* Subtle Ambient Golden Glow matching the stage rim lights */}
            <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          </>
        ) : (
          /* 3D WebGL Avatar Mode (Alternate view) */
          <div className="absolute inset-0 w-full h-full flex items-center justify-end pr-[10%]">
            <Suspense fallback={null}>
              <HeroAvatar />
            </Suspense>
          </div>
        )}
      </div>

      {/* Spacer for Top Navbar */}
      <div className="h-20 sm:h-24 pointer-events-none" />

      {/* ======================================================== */}
      {/* MAIN HERO CONTENT GRID (LEFT TYPOGRAPHY | RIGHT HUD)     */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 w-full flex-1 flex items-center pointer-events-none">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & CALL TO ACTION   */}
          {/* ==================================================== */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 flex flex-col items-start text-left pointer-events-auto transform transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mouseParallax.x * -8}px, ${mouseParallax.y * -6}px, 0)`
            }}
          >
            {/* Eyebrow Label */}
            <p className="text-xs sm:text-sm font-mono font-medium tracking-[0.28em] text-neutral-400 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2 sm:mb-3">
              HI, I'M
            </p>

            {/* Massive Bold Slanted Chiseled Metallic Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] xl:text-[94px] font-black italic tracking-[-0.035em] leading-[0.88] text-white">
              <span className="block bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                ABHISHEK
              </span>
              <span className="block bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                GAUR
              </span>
            </h1>

            {/* Subtitle: ELECTRONICS ENGINEER \n DEFENCE TECHNOLOGY */}
            <div className="mt-4 sm:mt-5">
              <p className="text-xs sm:text-sm font-mono font-semibold tracking-[0.26em] text-neutral-300 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                ELECTRONICS ENGINEER
              </p>
              <p className="text-xs sm:text-sm font-mono font-semibold tracking-[0.26em] text-neutral-300 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                DEFENCE TECHNOLOGY
              </p>
            </div>

            {/* Subtle Horizontal Divider Line */}
            <div className="w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-amber-400/80 via-neutral-500/40 to-transparent my-6 sm:my-8" />

            {/* Call to Action Button: EXPLORE MY WORK → */}
            <div className="flex items-center gap-4">
              <a
                href="#doors"
                className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#0a0f18]/85 backdrop-blur-md border border-amber-400/50 hover:border-cyan-400/90 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                {/* Golden Lens Flare Accent Dot on Left Border */}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_#38bdf8] transition-colors" />

                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                  EXPLORE MY WORK
                </span>

                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-cyan-300 group-hover:translate-x-1.5 transition-all" />
              </a>

              {/* Quick Info Modal Trigger */}
              <button
                type="button"
                onClick={() => setShowIntroModal(true)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all hover:border-cyan-400/50 cursor-pointer"
                title="View Engineering Profile"
                aria-label="View Engineering Profile"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: VISION STATEMENT & FLOATING HUD CARD   */}
          {/* ==================================================== */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 flex flex-col items-start lg:items-end text-left lg:text-right pointer-events-auto transform transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mouseParallax.x * -12}px, ${mouseParallax.y * -8}px, 0)`
            }}
          >
            {/* Vision Statement Typography */}
            <div className="mb-6 lg:mb-8 max-w-sm">
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-neutral-300 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                BUILDING
              </p>
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-neutral-300 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                INTELLIGENT SYSTEMS
              </p>
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-neutral-300 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                FOR A SMARTER TOMORROW
              </p>
            </div>

            {/* Futuristic Glass HUD Card matching reference screenshot */}
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl bg-[#070b14]/75 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              
              {/* Cyber Corner Notches / Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg pointer-events-none" />

              <div className="space-y-4 text-left">
                
                {/* Row 1: HARDWARE & IoT */}
                <a
                  href="#skills"
                  className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 group-hover/item:border-cyan-300 transition-colors">
                    <Cpu className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.16em] text-neutral-200 group-hover/item:text-cyan-300 transition-colors uppercase">
                    HARDWARE &amp; IoT
                  </span>
                </a>

                {/* Row 2: DEFENCE TECH */}
                <a
                  href="#about"
                  className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 group-hover/item:border-cyan-300 transition-colors">
                    <Shield className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.16em] text-neutral-200 group-hover/item:text-cyan-300 transition-colors uppercase">
                    DEFENCE TECH
                  </span>
                </a>

                {/* Row 3: EMBEDDED SYSTEMS */}
                <a
                  href="#doors"
                  className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 group-hover/item:border-cyan-300 transition-colors">
                    <Code2 className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.16em] text-neutral-200 group-hover/item:text-cyan-300 transition-colors uppercase">
                    EMBEDDED SYSTEMS
                  </span>
                </a>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM BAR: SCROLL TO EXPLORE & VIEW SWITCHER            */}
      {/* ======================================================== */}
      <div
        ref={bottomBarRef}
        className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 w-full pb-6 pt-2 flex items-center justify-between pointer-events-auto"
      >
        {/* Left: Video Play/Pause Control */}
        <div className="flex items-center gap-2">
          {viewMode === 'video' && (
            <button
              type="button"
              onClick={toggleVideoPlayback}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-300 hover:text-white text-[11px] font-mono transition-all backdrop-blur-md cursor-pointer"
              title={isPlaying ? "Pause cinematic background" : "Play cinematic background"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">CINEMATIC VIDEO</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="hidden sm:inline">PAUSED</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Center: Mouse Outline + SCROLL TO EXPLORE with Guideline */}
        <div className="flex flex-col items-center">
          <a
            href="#about"
            className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono font-medium tracking-[0.28em] text-neutral-400 hover:text-cyan-300 transition-colors uppercase group cursor-pointer"
          >
            {/* Mouse Icon Capsule with bouncing scroll wheel */}
            <div className="w-4 h-6 rounded-full border border-neutral-400/70 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </a>

          {/* Vertical Guideline extending downward */}
          <div className="w-[1px] h-6 bg-gradient-to-b from-neutral-500/60 to-transparent mt-2" />
        </div>

        {/* Right: Switch Mode (Cinematic Video vs 3D Avatar) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode(prev => prev === 'video' ? 'avatar' : 'video')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-300 hover:text-white text-[11px] font-mono transition-all backdrop-blur-md cursor-pointer"
            title="Toggle between cinematic video and interactive 3D WebGL avatar"
          >
            {viewMode === 'video' ? (
              <>
                <Box className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">SWITCH TO 3D AVATAR</span>
              </>
            ) : (
              <>
                <Film className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">SWITCH TO VIDEO</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* ENGINEERING SPOTLIGHT MODAL                              */}
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
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Enter 3D Doors Hallway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={resumeHref}
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
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
