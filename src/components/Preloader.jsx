import React, { useState, useEffect } from 'react';
import { Cpu, Shield } from 'lucide-react';

export default function Preloader() {
  const [phase, setPhase] = useState('revealing'); // 'revealing' -> 'sliding' -> 'done'
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    // Start clip reveal and progress bar
    const progressTimer = setTimeout(() => {
      setFillWidth(100);
    }, 100);

    // Trigger upward slide transition after text finishes filling
    const slideTimer = setTimeout(() => {
      setPhase('sliding');
    }, 2200);

    // Unmount after upward slide animation completes
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 3400);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(slideTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 w-full h-screen z-[100000] flex flex-col items-center justify-center overflow-hidden transition-transform duration-[1100ms] will-change-transform ${
        phase === 'sliding' ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
        background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 45%, #bfdbfe 100%)'
      }}
    >
      {/* Decorative Light Circuit Traces & Ambient Light */}
      <div className="absolute inset-0 bg-circuit-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Center Branding Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Top Emblem */}
        <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200/90 shadow-sm backdrop-blur-md animate-in fade-in duration-700">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-widest">
            ECE · Defence Technology
          </span>
        </div>

        {/* Name Reveal Layered Structure */}
        <div className="relative text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter select-none">
          
          {/* Base Ghost Text */}
          <div className="text-blue-900/15">
            Abhishek Gaur
            <span className="text-blue-900/20">.</span>
          </div>

          {/* Animated Filled Foreground Text */}
          <div
            className="absolute top-0 left-0 text-slate-900 overflow-hidden whitespace-nowrap transition-all duration-[1600ms] ease-in-out"
            style={{
              clipPath: `inset(${100 - fillWidth}% 0 0 0)`
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
              Abhishek Gaur
            </span>
            <span className="text-blue-600">.</span>
          </div>
        </div>

        {/* Subtitle credentials */}
        <p className="mt-4 text-xs sm:text-sm font-mono font-semibold text-slate-600 uppercase tracking-widest flex items-center gap-2">
          <span>Rashtriya Raksha University</span>
          <span className="text-blue-400">·</span>
          <span className="text-blue-700">School of Engineering & Technology</span>
        </p>

        {/* Sleek Progress Loading Indicator */}
        <div className="mt-8 w-48 sm:w-64 h-1.5 bg-blue-200/60 rounded-full overflow-hidden p-0.5 border border-blue-300/40 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full transition-all duration-[2000ms] ease-out"
            style={{ width: `${fillWidth}%` }}
          />
        </div>

        {/* Live Electronics Pulse Status */}
        <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-blue-800/80">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>INITIALIZING DEFENCE TECH & HARDWARE PORTFOLIO...</span>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-6 text-[11px] font-mono text-slate-500">
        © 2026 Abhishek Gaur
      </div>
    </div>
  );
}
