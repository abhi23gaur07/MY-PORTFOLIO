import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * FlipCalendar - Spiral-bound 3D desk flip-calendar role ticker.
 * 
 * Features:
 * - Sequentially rotates through ALL 4 roles:
 *   1. Embedded Systems Engineer
 *   2. Defence Tech Innovator
 *   3. Hardware Architect (SIH #1)
 *   4. Full-Stack Software Lead
 * - 3D forward flip animation (no reverse pendulum glitches)
 * - Clickable manual navigation controls (prev/next chevrons & click-to-flip)
 * - Wire binding rings & punched holes
 * - Dynamic 01/04 counter indicator
 */
export default function FlipCalendar() {
  const ROLES = [
    'Embedded Systems Engineer',
    'Defence Tech Innovator',
    'Hardware Architect (SIH #1)',
    'Full-Stack Software Lead'
  ];

  const total = ROLES.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'

  // Auto-advance through ALL 4 roles continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2800);

    return () => clearInterval(timer);
  }, [total]);

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goToPrev = (e) => {
    if (e) e.stopPropagation();
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div 
      onClick={goToNext}
      title="Click to flip to next role"
      className="relative inline-block align-baseline font-mono select-none my-1 sm:my-2 cursor-pointer group"
    >
      <div className="relative inline-flex items-center perspective-1000">
        
        {/* Calendar Body Base Plate */}
        <div className="relative px-3 sm:px-4 pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#eaf2fc] dark:from-[#25201e] dark:to-[#171413] border-2 border-blue-200/90 dark:border-[#4a3f3a] shadow-lg shadow-blue-500/10 dark:shadow-black/40 overflow-hidden min-w-[280px] sm:min-w-[380px] md:min-w-[440px] lg:min-w-[480px] transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-cyan-500/50">
          
          {/* Top Spiral Wire Binding Rings */}
          <div className="absolute -top-2 left-0 right-0 flex justify-around px-3 pointer-events-none z-30">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-full bg-gradient-to-r from-[#94a3b8] via-[#e2e8f0] to-[#64748b] dark:from-[#403530] dark:via-[#8a766a] dark:to-[#2b221d] border border-black/10 shadow-xs"
              />
            ))}
          </div>

          {/* Punched Holes Row */}
          <div className="flex justify-around px-3 mb-2 pt-0.5 opacity-50">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-900/25 dark:bg-black/60 inline-block" />
            ))}
          </div>

          {/* Role Display Container (3D Flip Viewport) */}
          <div className="relative h-8 sm:h-9 overflow-hidden flex items-center justify-between gap-3">
            
            {/* Animated Roles List */}
            <div className="relative w-full h-full flex items-center">
              {ROLES.map((role, idx) => {
                const isActive = idx === currentIndex;
                const isPrev = idx === (currentIndex - 1 + total) % total;
                const isNext = idx === (currentIndex + 1) % total;

                // Compute 3D transform position
                let transformClass = 'opacity-0 pointer-events-none translate-y-full rotate-x-45 scale-95';
                if (isActive) {
                  transformClass = 'opacity-100 translate-y-0 rotate-x-0 scale-100 z-10';
                } else if (direction === 'next' && isPrev) {
                  transformClass = 'opacity-0 pointer-events-none -translate-y-full -rotate-x-45 scale-95';
                } else if (direction === 'prev' && isNext) {
                  transformClass = 'opacity-0 pointer-events-none translate-y-full rotate-x-45 scale-95';
                }

                return (
                  <div
                    key={role}
                    className={`absolute inset-0 flex items-center justify-between gap-2.5 text-slate-800 dark:text-neutral-100 font-bold tracking-tight text-sm sm:text-lg md:text-xl lg:text-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass}`}
                  >
                    <span className="whitespace-nowrap truncate">{role}</span>
                    
                    {/* Role Counter Indicator (e.g. 01 / 04) */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md bg-blue-500/10 dark:bg-white/10 text-blue-700 dark:text-cyan-400 font-bold border border-blue-500/20 dark:border-white/10">
                        0{idx + 1} / 0{total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Navigation Chevrons on Hover */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous role"
                className="w-5 h-5 rounded flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-neutral-300 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next role"
                className="w-5 h-5 rounded flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-neutral-300 text-xs"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Paper Texture Bottom Edge Line */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500/20 dark:bg-white/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
