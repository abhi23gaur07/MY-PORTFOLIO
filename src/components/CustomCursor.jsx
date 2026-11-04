import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor - Exact replication of The Smart Library Admin Cursor, customized in Pure White.
 * Source reference: https://the-smart-library.onrender.com/admin
 * 
 * Features:
 * - Direct HTML5 2D Canvas rendering for smooth 60-120fps tracking
 * - Identical 0.45 spring physics and 20-frame ribbon trail
 * - Responsive dynamic line-width tapering (Math.max(0.75, prog * (isHover ? 5.5 : 4)))
 * - Pure White styling with subtle contrast drop-shadows (visible on both light and dark backgrounds)
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

        // 1. Draw pure white ribbon trail with dual contrast shadow
        if (trail.length > 2) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          // Soft contrast shadow so white trail is visible even on white/light blue backgrounds
          ctx.shadowColor = 'rgba(15, 23, 42, 0.35)';
          ctx.shadowBlur = 6;

          for (let i = 0; i < trail.length - 1; i++) {
            const p1 = trail[i];
            const p2 = trail[i + 1];
            const prog = 1 - i / trail.length;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Pure White trailing ribbon with smooth progressive opacity
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, prog * 1.1)})`;
            ctx.lineWidth = Math.max(0.75, prog * (pointer.isHover ? 5.5 : 4));
            ctx.stroke();
          }
          ctx.restore();
        }

        // 2. Core sleek pure white dot with crisp contrast boundary
        ctx.save();
        ctx.shadowColor = 'rgba(15, 23, 42, 0.45)';
        ctx.shadowBlur = pointer.isHover ? 12 : 6;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.isHover ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Fine hairline border so the white dot has crisp contrast on pure white surfaces
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.3)';
        ctx.stroke();
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
