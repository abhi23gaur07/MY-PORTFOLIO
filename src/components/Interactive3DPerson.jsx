import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cpu, Radio, Shield, Sparkles } from 'lucide-react';

/**
 * Interactive3DPerson - Multi-angle 3D cinematic interactive portrait.
 * Replicates the 3D rotating person effect from Sushmita's viral portfolio screen recording.
 * 
 * Features:
 * - Multi-angle head turns using user-provided photos:
 *   1. Forward / Front angle (/abhishek-forward.jpg)
 *   2. Left angle (/abhishek-left.jpg)
 *   3. Right angle (/abhishek-right.jpg)
 * - Automatic angle turning synced with role ticker
 * - Cursor-tracking interactive turn: moving mouse across turns Abhishek to look towards pointer
 * - 3D perspective depth, card tilt, and floating holographic chips
 * - Feathered cinematic bottom mask blending seamlessly into background
 */
export default function Interactive3DPerson({
  activeRoleIndex = 0,
  className = ""
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovering: false });
  const [currentAngle, setCurrentAngle] = useState('forward'); // 'forward' | 'left' | 'right'

  // Preload all 3 images for instantaneous smooth cross-fades
  useEffect(() => {
    ['/abhishek-forward.jpg', '/abhishek-left.jpg', '/abhishek-right.jpg'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Sync angle with role index when user is not actively hovering with mouse
  useEffect(() => {
    if (mousePos.isHovering) return;
    const angles = ['forward', 'right', 'left', 'forward'];
    setCurrentAngle(angles[activeRoleIndex % angles.length]);
  }, [activeRoleIndex, mousePos.isHovering]);

  // Handle pointer tracking across the viewport
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized coordinates from -1 (far left) to +1 (far right)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setMousePos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
      isHovering: true
    });

    // Switch photo angle according to cursor horizontal position
    if (normX < -0.22) {
      setCurrentAngle('left');
    } else if (normX > 0.22) {
      setCurrentAngle('right');
    } else {
      setCurrentAngle('forward');
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0, isHovering: false });
    const angles = ['forward', 'right', 'left', 'forward'];
    setCurrentAngle(angles[activeRoleIndex % angles.length]);
  }, [activeRoleIndex]);

  // Global window pointer move to allow turning even when hovering over headline/buttons
  useEffect(() => {
    const onWindowMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to center of person
      const centerX = rect.left + rect.width / 2;
      const distFromCenter = e.clientX - centerX;
      const normalized = distFromCenter / (window.innerWidth / 2);

      // Subtle turn when cursor moves anywhere on the hero screen
      if (normalized < -0.3) {
        setCurrentAngle('left');
      } else if (normalized > 0.3) {
        setCurrentAngle('right');
      } else {
        setCurrentAngle('forward');
      }
    };

    window.addEventListener('pointermove', onWindowMove, { passive: true });
    return () => window.removeEventListener('pointermove', onWindowMove);
  }, []);

  // Calculate 3D tilt angles
  const tiltY = mousePos.isHovering ? mousePos.x * 12 : 0;
  const tiltX = mousePos.isHovering ? mousePos.y * -9 : 0;
  const parallaxX = mousePos.isHovering ? mousePos.x * -16 : 0;
  const parallaxY = mousePos.isHovering ? mousePos.y * -12 : 0;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] aspect-[3/4.2] flex items-center justify-center select-none perspective-[1400px] ${className}`}
    >
      {/* 3D Tilting Stage Card */}
      <div
        style={{
          transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
          transformStyle: 'preserve-3d',
          transition: mousePos.isHovering ? 'transform 0.15s ease-out' : 'transform 0.8s cubic-bezier(0.16,1,0.3,1)'
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Cinematic Ethereal Spotlight Halo behind head */}
        <div
          style={{
            transform: `translateZ(-60px) translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`
          }}
          className="absolute w-[80%] h-[75%] rounded-full bg-radial from-cyan-500/25 via-blue-600/15 to-transparent blur-3xl pointer-events-none"
        />

        {/* Central Portrait Container with Feathered Mask & 3D Depth */}
        <div
          style={{
            transform: `translateZ(35px) translate(${parallaxX}px, ${parallaxY}px)`,
            maskImage: 'linear-gradient(to top, transparent 0%, black 22%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 22%, black 92%, transparent 100%)'
          }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center"
        >
          {/* Layer 1: Forward / Center Pose */}
          <img
            src="/abhishek-forward.jpg"
            alt="Abhishek Gaur — Electronics Engineer"
            className={`absolute inset-0 w-full h-full object-cover object-[center_20%] transition-opacity duration-700 ease-in-out filter brightness-[1.04] contrast-[1.03] ${
              currentAngle === 'forward' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            }`}
          />

          {/* Layer 2: Looking Left Profile */}
          <img
            src="/abhishek-left.jpg"
            alt="Abhishek Gaur — Left Perspective"
            className={`absolute inset-0 w-full h-full object-cover object-[center_28%] transition-opacity duration-700 ease-in-out filter brightness-[1.03] contrast-[1.03] ${
              currentAngle === 'left' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            }`}
          />

          {/* Layer 3: Looking Right Profile */}
          <img
            src="/abhishek-right.jpg"
            alt="Abhishek Gaur — Right Perspective"
            className={`absolute inset-0 w-full h-full object-cover object-[center_30%] transition-opacity duration-700 ease-in-out filter brightness-[1.03] contrast-[1.03] ${
              currentAngle === 'right' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            }`}
          />
        </div>

        {/* Floating 3D Holographic Chips (Forward z-plane) */}
        <div
          style={{ transform: 'translateZ(75px)' }}
          className="absolute top-[14%] -left-2 sm:-left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-black/85 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold shadow-xl shadow-cyan-500/10 pointer-events-none transition-transform duration-300 hover:scale-105"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>EMBEDDED SYSTEMS</span>
        </div>

        <div
          style={{ transform: 'translateZ(85px)' }}
          className="absolute bottom-[20%] -right-2 sm:-right-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-black/85 backdrop-blur-md border border-blue-400/40 text-blue-300 font-mono text-[11px] font-bold shadow-xl shadow-blue-500/10 pointer-events-none transition-transform duration-300 hover:scale-105"
        >
          <Radio className="w-3.5 h-3.5 text-blue-400" />
          <span>DEFENCE TELEMETRY</span>
        </div>

        {/* Top-Right Active HUD Telemetry Chip */}
        <div
          style={{ transform: 'translateZ(65px)' }}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="uppercase font-bold tracking-wider">
            3D ANGLE: {currentAngle.toUpperCase()}
          </span>
        </div>

        {/* Bottom Coordinates Caption */}
        <div
          style={{ transform: 'translateZ(55px)' }}
          className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between font-mono text-[10px] text-slate-400 dark:text-neutral-400 tracking-wider pointer-events-none"
        >
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>GANDHINAGAR · RRU</span>
          </span>
          <span>23° 12' N · 72° 41' E</span>
        </div>

      </div>
    </div>
  );
}
