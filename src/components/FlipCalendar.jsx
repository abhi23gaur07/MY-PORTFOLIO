import React, { useEffect, useState, useRef } from 'react';

/**
 * FlipCalendar - Spiral-bound 3D desk flip-calendar.
 * Replicates the viral calendar skill switcher from Rishi Thakor's portfolio (therishithakor.com).
 * 
 * Features:
 * - 3D leaf flip animation with perspective and shadows
 * - Spiral metallic binder rings and punched notebook holes
 * - Dynamic role ticker showcasing Abhishek's core domains
 */
export default function FlipCalendar() {
  const ROLES = [
    'Embedded Systems Engineer',
    'Defence Tech Innovator',
    'Hardware Architect (SIH #1)',
    'Full-Stack Software Lead'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const total = ROLES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
        setIsFlipping(false);
      }, 700);
    }, 2800);

    return () => clearInterval(timer);
  }, [total]);

  const nextIndex = (currentIndex + 1) % total;

  return (
    <div className="relative inline-block align-baseline font-mono select-none my-1 sm:my-2">
      <div className="relative inline-flex items-center perspective-1000">
        
        {/* Calendar Body Base Plate */}
        <div className="relative px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-gradient-to-b from-[#f5eee6] to-[#e4d8cc] dark:from-[#2a2422] dark:to-[#1b1716] border-2 border-[#cbb9a8] dark:border-[#4a3f3a] shadow-lg shadow-black/10 dark:shadow-black/40 overflow-hidden min-w-[240px] sm:min-w-[340px] md:min-w-[420px] transition-colors duration-500">
          
          {/* Top Spiral Wire Binding Rings */}
          <div className="absolute -top-2 left-0 right-0 flex justify-around px-3 pointer-events-none z-30">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-full bg-gradient-to-r from-[#9c8978] via-[#e2d5c8] to-[#6e5d4e] dark:from-[#403530] dark:via-[#8a766a] dark:to-[#2b221d] border border-black/20 shadow-xs"
              />
            ))}
          </div>

          {/* Punched Holes Row */}
          <div className="flex justify-around px-3 mb-1.5 pt-1 opacity-50">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#3d322a]/30 dark:bg-black/60 inline-block" />
            ))}
          </div>

          {/* Under Page (Revealed next) */}
          <div className="relative flex items-center justify-between gap-3 text-slate-800 dark:text-neutral-100 font-bold tracking-tight text-base sm:text-xl md:text-2xl">
            <span className="truncate">{ROLES[nextIndex]}</span>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-semibold shrink-0">
              0{nextIndex + 1} / 0{total}
            </span>
          </div>

          {/* Flipping Leaf (3D Transform over the top) */}
          <div
            className={`absolute inset-x-0 bottom-0 top-[22px] px-3 sm:px-4 flex items-center justify-between gap-3 bg-gradient-to-b from-[#f9f4ee] to-[#ecd9c7] dark:from-[#312a28] dark:to-[#221c1a] text-slate-900 dark:text-white font-bold tracking-tight text-base sm:text-xl md:text-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top z-20 ${
              isFlipping
                ? 'rotate-x-90 opacity-0 scale-95 shadow-2xl'
                : 'rotate-x-0 opacity-100 scale-100'
            }`}
          >
            <span className="truncate">{ROLES[currentIndex]}</span>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-semibold shrink-0">
              0{currentIndex + 1} / 0{total}
            </span>
          </div>

          {/* Paper Texture Noise / Line */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/10 dark:bg-white/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
