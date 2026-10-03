import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor - Exact replication of The Smart Library Admin Cursor, customized in Black.
 * Source reference: https://the-smart-library.onrender.com/admin
 * 
 * Features:
 * - Direct HTML5 2D Canvas rendering for smooth 60-120fps tracking
 * - Identical 0.45 spring physics and 20-frame ribbon trail
 * - Responsive dynamic line-width tapering (Math.max(0.5, prog * (isHover ? 5 : 3.5)))
 * - Deep sleek Obsidian/Black styling with subtle dark aura shadows
 * - Hover detection on interactive elements (links, buttons, inputs, selects)
 * - Safe touch-device bypass
 */
export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if touch device
    if (typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cW = (canvas.width = window.innerWidth);
    let cH = (canvas.height = window.innerHeight);

    const handleResize = () => {
      cW = canvas.width = window.innerWidth;
      cH = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pointer state matching https://the-smart-library.onrender.com/admin
    const pointer = {
      x: cW / 2,
      y: cH / 2,
      targetX: cW / 2,
      targetY: cH / 2,
      isHover: false,
      hasMoved: false,
      isVisible: true
    };
    const trail = [];

    const handleMouseMove = (e) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.isVisible = true;

      if (!pointer.hasMoved) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.hasMoved = true;
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target &&
        e.target.closest('a, button, input, select, textarea, [role="button"], label, .cursor-pointer, summary')
      ) {
        pointer.isHover = true;
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target &&
        e.target.closest('a, button, input, select, textarea, [role="button"], label, .cursor-pointer, summary')
      ) {
        pointer.isHover = false;
      }
    };

    const handleMouseLeave = () => {
      pointer.isVisible = false;
    };

    const handleMouseEnter = () => {
      pointer.isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId;

    function renderCursor() {
      ctx.clearRect(0, 0, cW, cH);

      if (pointer.hasMoved && pointer.isVisible) {
        // Easing interpolation (0.45 coefficient from the Smart Library admin)
        pointer.x += (pointer.targetX - pointer.x) * 0.45;
        pointer.y += (pointer.targetY - pointer.y) * 0.45;

        trail.unshift({ x: pointer.x, y: pointer.y });
        if (trail.length > 20) trail.pop();

        // 1. Draw ribbon trail
        if (trail.length > 2) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          ctx.shadowBlur = 10;

          for (let i = 0; i < trail.length - 1; i++) {
            const p1 = trail[i];
            const p2 = trail[i + 1];
            const prog = 1 - i / trail.length;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Black trailing ribbon with progressive opacity
            ctx.strokeStyle = `rgba(10, 10, 10, ${prog * 0.8})`;
            ctx.lineWidth = Math.max(0.5, prog * (pointer.isHover ? 5 : 3.5));
            ctx.stroke();
          }
          ctx.restore();
        }

        // 2. Core sleek black dot
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = pointer.isHover ? 14 : 7;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.isHover ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0a0a';
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(renderCursor);
    }

    animationFrameId = requestAnimationFrame(renderCursor);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="portfolio-cursor-canvas"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
