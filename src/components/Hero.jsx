import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Shield, 
  Code2, 
  Wifi,
  Globe,
  Play, 
  Pause,
  Sparkles,
  X,
  Quote,
  Radio,
  Trophy,
  Download,
  Compass,
  Terminal
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero - 1:1 Recreation of the Cinematic Editorial Portfolio Mockup
 * 
 * Features:
 * - High-definition crystal-clear background video (/hero_video.mp4) of Abhishek walking & posing on the circular pedestal
 * - Crisp contrast, hardware-accelerated rendering and high-quality filtering
 * - Full Dark & Light Mode styling support
 * - Left: "HI, I'M ABHISHEK GAUR", "ELECTRONICS & DEFENCE ENGINEER · FULL-STACK & IoT DEVELOPER", "EXPLORE MY WORK →" + "RESUME ⤓"
 * - Right: Complete Technical Matrix:
 *   1. SOFTWARE & FRONTEND (React, Next.js, TypeScript, 3D WebGL)
 *   2. IoT WEBSITES & CLOUD (Real-Time Sensor Telemetry, MQTT, Dashboards)
 *   3. HARDWARE PROFICIENCY (ESP32, Arduino, Raspberry Pi, STM32)
 *   4. EMBEDDED C/C++ & IoT (C/C++ Architecture · SIH #1 Hardware Category)
 * - Center Bottom: Mouse capsule + "SCROLL TO EXPLORE" with vertical guideline
 * - Interactive: Smooth mouse parallax, GSAP ScrollTrigger transitions, optional 3D avatar switch
 */
export default function Hero({ mode = 'dark' }) {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';
  const isDark = mode === 'dark';
  
  const [isPlaying, setIsPlaying] = useState(true);
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
  }, []);

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

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.08,
          opacity: isDark ? 0.45 : 0.6,
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
  }, [isDark]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[720px] max-h-[1200px] flex flex-col justify-between overflow-hidden select-none z-10 bg-[#05070c]"
    >
      {/* ======================================================== */}
      {/* CINEMATIC HERO BACKGROUND (HIGH RESOLUTION VIDEO)         */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Real Background Video of Abhishek walking on circular stage */}
        <video
          ref={videoRef}
          src="/hero_video.mp4"
          poster="/hero_mockup.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] lg:object-center select-none will-change-transform"
          style={{
            filter: 'contrast(1.08) brightness(1.03) saturate(1.08)',
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            transform: `translate3d(${mouseParallax.x * 6}px, ${mouseParallax.y * 5}px, 0)`
          }}
        />

        {/* Seamless Edge Blending - Subtle dark vignettes so video is 100% visible in all modes */}
        {/* Top Vignette for Navbar legibility */}
        <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-[#05070c]/70 via-[#05070c]/20 to-transparent" />
        
        {/* Bottom Vignette for seamless merge into AboutMe */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#05070c]/90 via-[#05070c]/40 to-transparent" />

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none bg-amber-500/10" />
      </div>

      {/* Spacer for Top Navbar */}
      <div className="h-20 sm:h-24 pointer-events-none" />

      {/* ======================================================== */}
      {/* MAIN HERO CONTENT (LEFT TYPOGRAPHY | RIGHT HUD)          */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex-1 flex items-center pointer-events-none">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & CALL TO ACTION   */}
          {/* Shifted to the left, completely transparent box      */}
          {/* ==================================================== */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-start text-left pointer-events-auto transform transition-transform duration-500 ease-out bg-transparent border-none shadow-none p-0 lg:-translate-x-2 xl:-translate-x-4"
            style={{
              transform: `translate3d(${mouseParallax.x * -6}px, ${mouseParallax.y * -5}px, 0)`
            }}
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase mb-3 bg-white/10 border border-white/20 text-cyan-300 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>FULL-STACK &amp; HARDWARE INNOVATOR</span>
            </div>

            {/* Massive Bold Slanted Chiseled Metallic Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[76px] xl:text-[88px] font-black italic tracking-[-0.035em] leading-[0.88]">
              <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                ABHISHEK
              </span>
              <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                GAUR
              </span>
            </h1>

            {/* Subtitles: ELECTRONICS ENGINEER · DEFENCE TECHNOLOGY (Matching Mockup 1:1) */}
            <div className="mt-4 sm:mt-5 space-y-1.5">
              <p className="text-xs sm:text-sm font-mono font-bold tracking-[0.24em] uppercase text-neutral-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                ELECTRONICS ENGINEER
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold tracking-[0.24em] uppercase text-cyan-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                DEFENCE TECHNOLOGY
              </p>
            </div>

            {/* Subtle Horizontal Divider Line */}
            <div className="w-36 sm:w-48 h-[2px] rounded-full my-5 sm:my-6 bg-gradient-to-r from-amber-400 via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8]" />

            {/* Call to Action: Primary Button & Social Links Below */}
            <div className="flex flex-col items-start gap-3 w-full">
              {/* Primary Action Button: EXPLORE MY WORK */}
              <div>
                <a
                  href="#doors"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-cyan-400/90 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-white font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:bg-cyan-300 transition-colors" />
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                    EXPLORE MY WORK
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-cyan-300 transition-all group-hover:translate-x-1.5" />
                </a>
              </div>

              {/* Sub-row Directly Below EXPLORE MY WORK: RESUME, GITHUB, LINKEDIN (Same style as RESUME) */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5">
                {/* Direct Resume Download */}
                <a
                  href={resumeHref}
                  download="Abhishek_Gaur_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-cyan-300 hover:text-white border border-cyan-400/40 hover:border-cyan-300 font-mono text-xs font-bold tracking-[0.16em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  title="Download Abhishek Gaur's Resume"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>RESUME</span>
                </a>

                {/* GitHub Symbol / Pill */}
                <a
                  href={personal.github || "https://github.com/abhi23gaur07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/20 hover:border-cyan-400/60 font-mono text-xs font-bold tracking-[0.16em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                  title="Abhishek Gaur's GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>GITHUB</span>
                </a>

                {/* LinkedIn Symbol / Pill */}
                <a
                  href={personal.linkedin || "https://www.linkedin.com/in/abhishek-gaur-855a3b388/?isSelfProfile=true"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-sky-400 hover:text-white border border-sky-400/40 hover:border-sky-300 font-mono text-xs font-bold tracking-[0.16em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  title="Abhishek Gaur's LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LINKEDIN</span>
                </a>

                {/* Quick Info Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setShowIntroModal(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/15 border border-white/20 text-neutral-300 hover:text-white hover:border-cyan-400/60 backdrop-blur-md"
                  title="View Engineering Profile"
                  aria-label="View Engineering Profile"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: VISION STATEMENT & EXPANDED CYBER HUD  */}
          {/* Completely transparent box - only text & icons visible*/}
          {/* ==================================================== */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9 flex flex-col items-start lg:items-end text-left lg:text-right pointer-events-auto transform transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mouseParallax.x * -10}px, ${mouseParallax.y * -7}px, 0)`
            }}
          >
            {/* Vision Statement Typography */}
            <div className="mb-4 lg:mb-5 max-w-sm">
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase leading-relaxed text-neutral-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                BUILDING
              </p>
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase leading-relaxed text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                INTELLIGENT SYSTEMS
              </p>
              <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase leading-relaxed text-neutral-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                FOR A SMARTER TOMORROW
              </p>
            </div>

            {/* Completely Transparent Cyber HUD Card (Only text, brackets & icons visible) */}
            <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-transparent border border-white/15 p-4 sm:p-5 group transition-colors duration-300">
              
              {/* Cyber Corner Notches / Brackets (matching Image 1) */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm pointer-events-none" />

              <div className="space-y-2 text-left">
                
                {/* Row 1: HARDWARE & IoT */}
                <a
                  href="#skills"
                  className="flex items-center gap-3 p-2 rounded-xl transition-all group/item cursor-pointer bg-transparent hover:bg-white/10 border border-transparent hover:border-cyan-400/30"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-cyan-500/10 border border-cyan-400/40 group-hover/item:border-cyan-300 transition-colors">
                    <Cpu className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase block text-white group-hover/item:text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors">
                      HARDWARE &amp; IoT
                    </span>
                    <span className="text-[10px] font-mono font-semibold block text-cyan-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      ESP32 · Arduino · Raspberry Pi · STM32
                    </span>
                  </div>
                </a>

                {/* Row 2: DEFENCE TECH */}
                <a
                  href="#about"
                  className="flex items-center gap-3 p-2 rounded-xl transition-all group/item cursor-pointer bg-transparent hover:bg-white/10 border border-transparent hover:border-amber-400/30"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-amber-500/10 border border-amber-400/40 group-hover/item:border-amber-300 transition-colors">
                    <Shield className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase block text-white group-hover/item:text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors">
                      DEFENCE TECH
                    </span>
                    <span className="text-[10px] font-mono font-semibold block text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      Tactical Systems · SIH #1 Hardware Category
                    </span>
                  </div>
                </a>

                {/* Row 3: EMBEDDED SYSTEMS */}
                <a
                  href="#achievements"
                  className="flex items-center gap-3 p-2 rounded-xl transition-all group/item cursor-pointer bg-transparent hover:bg-white/10 border border-transparent hover:border-emerald-400/30"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-400/40 group-hover/item:border-emerald-300 transition-colors">
                    <Terminal className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase block text-white group-hover/item:text-emerald-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors">
                      EMBEDDED SYSTEMS
                    </span>
                    <span className="text-[10px] font-mono font-semibold block text-emerald-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      Bare-Metal C/C++ · RTOS · Telemetry
                    </span>
                  </div>
                </a>

                {/* Row 4: SOFTWARE & FRONTEND */}
                <a
                  href="#about"
                  className="flex items-center gap-3 p-2 rounded-xl transition-all group/item cursor-pointer bg-transparent hover:bg-white/10 border border-transparent hover:border-blue-400/30"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10 border border-blue-400/40 group-hover/item:border-blue-300 transition-colors">
                    <Code2 className="w-4 h-4 text-blue-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase block text-white group-hover/item:text-blue-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors">
                      SOFTWARE &amp; FRONTEND DEV
                    </span>
                    <span className="text-[10px] font-mono font-semibold block text-blue-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      React · Next.js · TypeScript · WebGL
                    </span>
                  </div>
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono transition-all backdrop-blur-md cursor-pointer bg-black/40 hover:bg-black/60 text-neutral-200 hover:text-white"
              title={isPlaying ? "Pause cinematic background" : "Play cinematic background"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">CINEMATIC VIDEO</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
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
            className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono font-medium tracking-[0.28em] transition-colors uppercase group cursor-pointer text-neutral-300 hover:text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            <div className="w-4 h-6 rounded-full border border-neutral-400/80 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
              <span className="w-1 h-1.5 rounded-full animate-bounce bg-cyan-400" />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </a>

          <div className="w-[1px] h-6 mt-2 bg-gradient-to-b from-neutral-400/80 to-transparent" />
        </div>

        {/* Right: Quick Action to Featured Projects */}
        <div className="flex items-center gap-1.5">
          <a
            href="#doors"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono transition-all backdrop-blur-md cursor-pointer bg-black/40 hover:bg-black/60 text-neutral-200 hover:text-cyan-300 shadow-sm"
            title="Explore 3D Architectural Doors & Projects"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">VIEW PROJECTS</span>
          </a>
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
                  Creative Hardware &amp; Full-Stack IoT Developer
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
                <Code2 className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Full-Stack</div>
                <div className="text-[10px] font-mono text-neutral-400">React &amp; WebGL</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Wifi className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">IoT Websites</div>
                <div className="text-[10px] font-mono text-neutral-400">Live Dashboards</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Cpu className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Microcontrollers</div>
                <div className="text-[10px] font-mono text-neutral-400">ESP32 &amp; STM32</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">SIH Winner</div>
                <div className="text-[10px] font-mono text-neutral-400">#1 Hardware Category</div>
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
