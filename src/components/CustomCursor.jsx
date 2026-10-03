import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trailingPosition, setTrailingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const mousePosRef = useRef({ x: -100, y: -100 });
  const trailingPosRef = useRef({ x: -100, y: -100 });
  const sparklesRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });

  // Flame and Sparkle Colors: Fiery Crimson, Vivid Red, Ember Orange & Twinkle Gold
  const flameColors = [
    '#ff2a2a', // Vibrant Red
    '#ef4444', // Crimson Red
    '#dc2626', // Deep Flame Red
    '#f97316', // Ember Orange
    '#ff6b4a', // Bright Coral Flame
    '#fef08a'  // Sparkle Gold Core
  ];

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const spawnSparkle = (x, y, count = 1, isBurst = false) => {
      const newSparkles = [];
      for (let i = 0; i < count; i++) {
        const angle = isBurst
          ? (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
          : Math.random() * Math.PI * 2;
        const speed = isBurst
          ? 1.5 + Math.random() * 3.5
          : 0.4 + Math.random() * 1.8;
        const color = flameColors[Math.floor(Math.random() * flameColors.length)];
        const isStar = Math.random() > 0.5;

        newSparkles.push({
          id: Date.now() + Math.random(),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isBurst ? 0 : 0.8), // float upwards like flame embers
          size: isBurst ? 4 + Math.random() * 4 : 3 + Math.random() * 3.5,
          color,
          life: 1,
          decay: isBurst ? 0.04 + Math.random() * 0.02 : 0.03 + Math.random() * 0.02,
          isStar,
          rotation: Math.random() * 360
        });
      }

      sparklesRef.current = [...sparklesRef.current.slice(-35), ...newSparkles];
    };

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check distance from last spawn to generate flame embers
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);
      const now = performance.now();

      if (distance > 8 && now - lastSpawnTime.current > 24) {
        spawnSparkle(e.clientX, e.clientY, distance > 25 ? 2 : 1, false);
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastSpawnTime.current = now;
      }

      // Check if hovering over clickable elements
      const target = e.target;
      if (target) {
        const isClickable = Boolean(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.group') ||
          target.closest('.cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovering(isClickable);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Burst of red flame sparkles on click!
      spawnSparkle(e.clientX, e.clientY, 10, true);

      // Click ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for trailing ring and flame sparkles
    const animate = () => {
      // 1. Lerp trailing ring
      const factor = 0.18;
      trailingPosRef.current.x += (mousePosRef.current.x - trailingPosRef.current.x) * factor;
      trailingPosRef.current.y += (mousePosRef.current.y - trailingPosRef.current.y) * factor;

      setTrailingPosition({
        x: trailingPosRef.current.x,
        y: trailingPosRef.current.y
      });

      // 2. Animate and decay flame particles
      if (sparklesRef.current.length > 0) {
        const surviving = [];
        for (let i = 0; i < sparklesRef.current.length; i++) {
          const s = sparklesRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy -= 0.05; // flame buoyancy: sparks float upwards
          s.life -= s.decay;
          s.rotation += 4;
          if (s.life > 0) {
            surviving.push(s);
          }
        }
        sparklesRef.current = surviving;
        setSparkles([...surviving]);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  // If on mobile or touch screen, don't render custom cursor
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300" style={{ opacity: isVisible ? 1 : 0 }}>
      
      {/* Red Flame Embers & Sparkles Trail */}
      {sparkles.map((s) => {
        const opacity = Math.max(0, s.life);
        const scale = Math.max(0.2, s.life);

        return (
          <div
            key={s.id}
            className="fixed pointer-events-none rounded-full will-change-transform flex items-center justify-center"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${s.rotation}deg)`,
              backgroundColor: s.isStar ? 'transparent' : s.color,
              boxShadow: s.isStar
                ? 'none'
                : `0 0 6px ${s.color}, 0 0 12px rgba(255, 42, 42, 0.75)`,
              opacity
            }}
          >
            {s.isStar && (
              <span
                style={{
                  color: s.color,
                  fontSize: `${s.size * 2}px`,
                  lineHeight: 1,
                  textShadow: `0 0 8px ${s.color}, 0 0 14px rgba(239, 68, 68, 0.8)`
                }}
              >
                ✦
              </span>
            )}
          </div>
        );
      })}

      {/* Click ripples (Red Glowing Wave) */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '34px',
            height: '34px',
            transform: 'translate(-50%, -50%)',
            border: '2px solid rgba(255, 42, 42, 0.85)',
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            boxShadow: '0 0 15px rgba(255, 42, 42, 0.6)'
          }}
        />
      ))}

      {/* Trailing Outer Ring (Vivid Red Flame Halo) */}
      <div
        className="fixed pointer-events-none rounded-full will-change-transform"
        style={{
          left: `${trailingPosition.x}px`,
          top: `${trailingPosition.y}px`,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.25 : 1})`,
          border: isHovering ? '1.5px solid #ff2a2a' : '1.5px solid rgba(239, 68, 68, 0.7)',
          backgroundColor: isHovering ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.05)',
          boxShadow: isHovering
            ? '0 0 20px rgba(255, 42, 42, 0.55), inset 0 0 10px rgba(239, 68, 68, 0.3)'
            : '0 0 10px rgba(239, 68, 68, 0.25)',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease-out, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
        }}
      />

      {/* Center Precision Flame Core Dot (Electric Crimson #ff2a2a) */}
      <div
        className="fixed pointer-events-none rounded-full will-change-transform"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: isHovering ? '6px' : '8px',
          height: isHovering ? '6px' : '8px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ff2a2a',
          boxShadow: '0 0 8px #ff2a2a, 0 0 16px rgba(239, 68, 68, 0.9), 0 0 24px rgba(249, 115, 22, 0.6)',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.2s ease'
        }}
      />
    </div>
  );
}
