import React, { useEffect, useState } from 'react';

/**
 * KineticHeadline - 3D Thrown-Name Kinetic Entrance
 * Inspired by @_code_and_chill_ viral portfolio intro animation.
 * 
 * Features:
 * - 3D perspective space with per-character/word explosive fly-in
 * - Staggered spring settling with cubic-bezier elastic overshoot
 * - Interactive hover wobble/ripple physics
 * - High-contrast editorial typography with cyber accents
 */
export default function KineticHeadline({
  text = "Hi, I'm Abhishek.",
  highlightWord = "Abhishek",
  className = ""
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Split into words, then handle highlight
  const words = text.split(' ');

  return (
    <h1
      className={`text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] perspective-1000 ${className}`}
    >
      {words.map((word, wordIdx) => {
        const isHighlight = word.includes(highlightWord);
        const chars = word.split('');

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
            {chars.map((char, charIdx) => {
              const globalIdx = wordIdx * 10 + charIdx;
              const delayMs = 120 + globalIdx * 35;

              // Randomize 3D throw vectors for realistic physical dispersion
              const rx = ((globalIdx * 17) % 50) - 25;
              const ry = ((globalIdx * 29) % 50) - 25;
              const tz = -180 + ((globalIdx * 31) % 120);
              const ty = -60 + ((globalIdx * 23) % 40);

              return (
                <span
                  key={charIdx}
                  style={{
                    display: 'inline-block',
                    transition: `transform 0.85s cubic-bezier(0.34, 1.4, 0.64, 1) ${delayMs}ms, opacity 0.85s ease ${delayMs}ms, filter 0.85s ease ${delayMs}ms`,
                    transform: mounted
                      ? 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)'
                      : `translate3d(0px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(0.65)`,
                    opacity: mounted ? 1 : 0,
                    filter: mounted ? 'blur(0px)' : 'blur(8px)',
                    transformStyle: 'preserve-3d'
                  }}
                  className={`transition-transform hover:scale-125 hover:-translate-y-2 hover:rotate-6 cursor-default duration-200 ${
                    isHighlight
                      ? 'text-slate-900 dark:text-white underline decoration-blue-500 decoration-wavy decoration-3 underline-offset-8'
                      : ''
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
