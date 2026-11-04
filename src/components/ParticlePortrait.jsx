import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Image as ImageIcon, Zap, RefreshCw } from 'lucide-react';

/**
 * ParticlePortrait - Interactive 3D Particle Face Matrix
 * Inspired by @_code_and_chill_ viral portfolio intro animation (codeandchill.store/product/portfolio).
 * 
 * Features:
 * - HTML5 Canvas 60-120fps particle physics engine
 * - Initial 3D explosion & magnetic assembly on page load
 * - Real-time cursor repulsion field (particles dynamically scatter away from pointer)
 * - Elastic spring-back physics with damped harmonic oscillation
 * - Click-to-shockwave radial blast
 * - Toggleable between "Particle Hologram" and "HD Portrait" modes
 * - Cybernetic HUD overlays (scanning radar, corner targeting brackets, node telemetry)
 */
export default function ParticlePortrait({
  imageSrc = '/profile.jpg',
  alt = 'Abhishek Gaur — Embedded Systems & Defence Tech',
  className = ''
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false, radius: 95 });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [viewMode, setViewMode] = useState('particles'); // 'particles' | 'photo'
  const [shockwaveKey, setShockwaveKey] = useState(0);

  // Initialize and sample image pixels into particles
  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      if (isCancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Target canvas resolution (sharp 3:4 aspect ratio)
      const targetWidth = 360;
      const targetHeight = Math.round(targetWidth * (img.naturalHeight / img.naturalWidth)) || 480;

      // Set canvas display and internal buffer dimensions
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = targetWidth * dpr;
      canvas.height = targetHeight * dpr;
      ctx.scale(dpr, dpr);

      // Offscreen buffer for pixel extraction
      const offCanvas = document.createElement('canvas');
      offCanvas.width = targetWidth;
      offCanvas.height = targetHeight;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      // Draw image scaled to buffer
      offCtx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imgData = offCtx.getImageData(0, 0, targetWidth, targetHeight).data;

      // Sampling step: 5px provides ~2,800 to 3,500 particles for silky 60fps & rich detail
      const step = 5;
      const particles = [];

      for (let y = 0; y < targetHeight; y += step) {
        for (let x = 0; x < targetWidth; x += step) {
          const index = (y * targetWidth + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          // Skip completely transparent or extremely dark empty boundary
          if (a < 30) continue;

          // Initial 3D exploded spawn position (thrown from deep space)
          const angle = Math.random() * Math.PI * 2;
          const spread = 250 + Math.random() * 450;
          const startX = x + Math.cos(angle) * spread;
          const startY = y + Math.sin(angle) * spread;

          particles.push({
            originX: x,
            originY: y,
            x: startX,
            y: startY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: `rgb(${r},${g},${b})`,
            size: step * 0.88, // slightly rounded mosaic tile
            friction: 0.86 + Math.random() * 0.05,
            ease: 0.055 + Math.random() * 0.035,
            brightness: (r + g + b) / 3
          });
        }
      }

      particlesRef.current = particles;
      setParticleCount(particles.length);
      setIsLoaded(true);
    };

    return () => {
      isCancelled = true;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [imageSrc]);

  // Main Physics & Render Loop
  useEffect(() => {
    if (!isLoaded || viewMode !== 'particles') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = canvas.width / dpr;
    const targetHeight = canvas.height / dpr;

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const radius = mouse.radius;
      const radiusSq = radius * radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse Repulsion Physics
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / radius) * 22; // Repulsion strength
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force;
            p.vy -= Math.sin(angle) * force;
          }
        }

        // 2. Elastic Return Spring (toward origin)
        const homeX = p.originX - p.x;
        const homeY = p.originY - p.y;
        p.vx += homeX * p.ease;
        p.vy += homeY * p.ease;

        // 3. Velocity & Friction damping
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;

        // 4. Subtle cyber shimmer / electric idle pulse
        const shimmer = Math.sin(frame * 0.03 + i) * 0.15;

        // Render Particle
        ctx.fillStyle = p.color;
        // Draw crisp rounded rect or mini tile
        ctx.fillRect(p.x, p.y, p.size + shimmer, p.size + shimmer);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isLoaded, viewMode, shockwaveKey]);

  // Mouse / Pointer handlers
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scaleX = (canvas.width / dpr) / rect.width;
    const scaleY = (canvas.height / dpr) / rect.height;

    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    mouseRef.current.isActive = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  // Click Shockwave Burst
  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scaleX = (canvas.width / dpr) / rect.width;
    const scaleY = (canvas.height / dpr) / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Apply blast impulse outward from click point
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.hypot(dx, dy) || 1;
      const maxBlastDist = 260;

      if (dist < maxBlastDist) {
        const force = (1 - dist / maxBlastDist) * 36;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    }
  }, []);

  // Trigger manual explosion / re-assembly
  const triggerExplosion = useCallback(() => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const angle = Math.random() * Math.PI * 2;
      const force = 15 + Math.random() * 25;
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;
    }
    setShockwaveKey((prev) => prev + 1);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-sm sm:max-w-md select-none group ${className}`}
    >
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Glass Frame Card */}
      <div className="relative p-2.5 sm:p-3 rounded-3xl bg-white/90 dark:bg-[#181615]/90 backdrop-blur-xl border-2 border-slate-200/90 dark:border-neutral-700/80 shadow-2xl shadow-black/20 overflow-hidden transition-all duration-500 group-hover:border-cyan-500/60">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-2.5 px-2 border-b border-black/5 dark:border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-bold text-slate-800 dark:text-neutral-200 uppercase tracking-wider">
              {viewMode === 'particles' ? 'Particle Matrix' : 'HD Portrait'}
            </span>
            {particleCount > 0 && viewMode === 'particles' && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold">
                {particleCount.toLocaleString()} nodes
              </span>
            )}
          </div>

          {/* Interactive Mode & Shockwave Controls */}
          <div className="flex items-center gap-1.5">
            {viewMode === 'particles' && (
              <button
                type="button"
                onClick={triggerExplosion}
                title="Pulse shockwave across particles"
                className="p-1 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-700 dark:text-neutral-200 transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'particles' ? 'photo' : 'particles')}
              title={viewMode === 'particles' ? 'Switch to HD Photo' : 'Switch to Particle Matrix'}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/20 text-blue-700 dark:text-cyan-400 text-[11px] font-bold border border-blue-200/60 dark:border-white/10 transition-all hover:scale-105"
            >
              {viewMode === 'particles' ? (
                <>
                  <ImageIcon className="w-3 h-3" />
                  <span>Photo</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Particles</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Viewport Container */}
        <div className="relative rounded-[20px] overflow-hidden bg-slate-900 aspect-[3/4] max-h-[500px] flex items-center justify-center cursor-crosshair">
          
          {/* 1. Particle Canvas Engine */}
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              viewMode === 'particles' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
            }`}
          />

          {/* 2. Fallback / Switchable Crisp Real Photo */}
          <img
            src={imageSrc}
            alt={alt}
            className={`w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03] transition-all duration-700 ${
              viewMode === 'photo' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'
            }`}
          />

          {/* Cyber Scanning Line Animation (active in particle mode) */}
          {viewMode === 'particles' && (
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none animate-[scanline_4s_ease-in-out_infinite]" />
          )}

          {/* Targeting Corner Brackets HUD */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none transition-all group-hover:scale-110" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none transition-all group-hover:scale-110" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-500 pointer-events-none transition-all group-hover:scale-110" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-500 pointer-events-none transition-all group-hover:scale-110" />

          {/* Interactive Hint Pill on Bottom of Viewport */}
          {viewMode === 'particles' && (
            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 font-medium flex items-center gap-1.5 shadow-lg group-hover:border-cyan-400/40 transition-colors">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Move cursor to scatter · Click to blast</span>
              </span>
            </div>
          )}

        </div>

        {/* Telemetry Footer Status */}
        <div className="pt-2.5 px-2 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-400 border-t border-black/5 dark:border-white/10 mt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Silicon & Defence Ready</span>
          </span>
          <span className="text-slate-600 dark:text-neutral-400 font-semibold">
            RRU · Gandhinagar
          </span>
        </div>

      </div>
    </div>
  );
}
