import React, { useEffect, useRef, useState } from 'react';

/**
 * PullCord - Authentic Verlet physics ceiling pull-cord light switch.
 * Replicates the viral pull-cord from Rishi Thakor's portfolio (therishithakor.com).
 * 
 * Features:
 * - 26-node Verlet rope physics simulation with gravity, spring elasticity, and wind
 * - Canvas 2D rendering of braided cotton cord texture, drop shadow, turned walnut knob & brass ferrule
 * - Drag resistance with rubbery stop and quick-tap toggle detection
 * - Web Audio API synthesized mechanical switch click
 * - Toggles between Editorial Warm Sand (Light) and Obsidian Charcoal (Dark) mode
 */
export default function PullCord({ mode, onToggle }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const hitRef = useRef(null);
  const [isDark, setIsDark] = useState(mode === 'dark');

  useEffect(() => {
    setIsDark(mode === 'dark');
  }, [mode]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const hit = hitRef.current;
    if (!wrap || !cv || !hit) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const N = 26; // 26 segments for fluid rope bending
    const G = 4600; // gravity, px/s^2
    const STEP = 1 / 120; // fixed physics step
    const ITER = 16; // constraint passes

    let dpr = 1;
    let W = 320;
    let H = 480;
    let L = 190;
    let EXT_MAX = 60;
    let HIDDEN = 70;
    let seg = 10;
    let ax = 220;
    let thick = 3.4;
    let knobS = 1.2;
    let pts = [];
    let ext = 0;
    let extV = 0;
    let armed = true;
    let grab = -1;
    let grabOff = { x: 0, y: 0 };
    let target = null;
    let ptr = null;
    let ptrPrev = null;
    let downAt = 0;
    let downPos = null;
    let moved = 0;
    let acc = 0;
    let lastT = 0;
    let t = 0;
    let sleeping = false;
    let still = 0;
    let animId = null;

    // Web Audio mechanical click sound
    const playClick = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, actx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.3, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.05);
      } catch (e) {}
    };

    function layout() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let offset = 4.5 * 16;
      if (vw >= 1024) {
        offset = 5.2 * 16;
        L = Math.min(250, Math.max(180, vh * 0.28));
        EXT_MAX = 70;
        thick = 3.6;
        knobS = 1.25;
      } else if (vw >= 640) {
        offset = 4.8 * 16;
        L = Math.min(210, Math.max(160, vh * 0.22));
        EXT_MAX = 60;
        thick = 3.3;
        knobS = 1.15;
      } else {
        offset = 3.2 * 16;
        L = 90;
        EXT_MAX = 52;
        thick = 3.0;
        knobS = 1.05;
      }

      HIDDEN = EXT_MAX + 18;
      W = Math.min(vw, 340);
      H = Math.round(L + EXT_MAX + 150);
      wrap.style.height = `${H}px`;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);

      const newAx = W - offset;
      const total = L + HIDDEN;
      seg = total / N;

      if (!pts.length) {
        for (let i = 0; i <= N; i++) {
          const x = newAx;
          const y = -HIDDEN + i * seg;
          pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : i === N ? 0.28 : 1 });
        }
      } else {
        const dx = newAx - ax;
        for (const p of pts) {
          p.x += dx;
          p.px += dx;
        }
      }
      ax = newAx;
    }

    function step(dt) {
      t += dt;
      if (grab < 0) {
        const K = 760;
        const C = 21;
        extV += (-K * ext - C * extV) * dt;
        ext += extV * dt;
      }

      if (ext > EXT_MAX * 0.8 && armed) {
        armed = false;
        playClick();
        if (onToggle) onToggle();
        try {
          if (navigator.vibrate) navigator.vibrate(12);
        } catch (e) {}
      }
      if (ext < EXT_MAX * 0.22) armed = true;

      const a = pts[0];
      a.x = a.px = ax;
      a.y = a.py = -HIDDEN + ext;

      const wind = Math.sin(t * 0.63) * 12 + Math.sin(t * 1.71 + 1.3) * 5;
      const damp = grab >= 0 ? 0.992 : 0.9875;
      for (let i = 1; i <= N; i++) {
        if (i === grab) continue;
        const p = pts[i];
        const vx = (p.x - p.px) * damp;
        const vy = (p.y - p.py) * damp;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + wind * dt * dt * (i / N);
        p.y += vy + G * dt * dt;
      }

      if (grab >= 0 && target) {
        const g = pts[grab];
        g.px = g.x;
        g.py = g.y;
        g.x = target.x;
        g.y = target.y;
      }

      for (let k = 0; k < ITER; k++) {
        for (let i = 0; i < N; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const w1 = i === grab ? 0 : p1.w;
          const w2 = i + 1 === grab ? 0 : p2.w;
          const sw = w1 + w2;
          if (!sw) continue;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - seg) / d / sw;
          p1.x += dx * diff * w1;
          p1.y += dy * diff * w1;
          p2.x -= dx * diff * w2;
          p2.y -= dy * diff * w2;
        }
      }

      for (let i = 1; i <= N; i++) {
        const p = pts[i];
        if (p.x < 14) p.x = 14;
        else if (p.x > W - 14) p.x = W - 14;
        if (p.y > H - 46) p.y = H - 46;
      }
    }

    function updateDrag() {
      if (grab < 0 || !ptr) return;
      let tx = ptr.x - grabOff.x;
      let ty = ptr.y - grabOff.y;
      const bx = ax;
      const by = -HIDDEN;
      const reach = grab * seg;
      let dx = tx - bx;
      let dy = ty - by;
      let d = Math.hypot(dx, dy) || 1e-6;
      let need = d - reach;
      if (need > EXT_MAX) {
        const over = need - EXT_MAX;
        const allowed = reach + EXT_MAX + (over * 0.14) / (1 + over / 160);
        tx = bx + (dx / d) * allowed;
        ty = by + (dy / d) * allowed;
        need = EXT_MAX;
      }
      const targetExt = Math.max(0, need);
      const prevExt = ext;
      ext += (targetExt - ext) * 0.55;
      extV = (ext - prevExt) * 60;
      target = { x: Math.max(14, Math.min(W - 14, tx)), y: Math.min(H - 46, ty) };
    }

    function pathThrough(c, ps) {
      c.beginPath();
      c.moveTo(ps[0].x, ps[0].y);
      for (let i = 1; i < ps.length - 1; i++) {
        const mx = (ps[i].x + ps[i + 1].x) / 2;
        const my = (ps[i].y + ps[i + 1].y) / 2;
        c.quadraticCurveTo(ps[i].x, ps[i].y, mx, my);
      }
      const l = ps[ps.length - 1];
      c.lineTo(l.x, l.y);
    }

    function samples(ps, spacing) {
      const out = [];
      let carry = 0;
      for (let i = 0; i < ps.length - 1; i++) {
        const a = ps[i];
        const b = ps[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1e-6;
        let s = carry;
        while (s < len) {
          out.push({ x: a.x + (dx * s) / len, y: a.y + (dy * s) / len, tx: dx / len, ty: dy / len });
          s += spacing;
        }
        carry = s - len;
      }
      return out;
    }

    function knobPath(c) {
      c.beginPath();
      c.moveTo(-3.1, 6.2);
      c.bezierCurveTo(-3.6, 10.5, -9.6, 13.5, -9.6, 22.5);
      c.bezierCurveTo(-9.6, 30.5, -5.4, 35, 0, 35);
      c.bezierCurveTo(5.4, 35, 9.6, 30.5, 9.6, 22.5);
      c.bezierCurveTo(9.6, 13.5, 3.6, 10.5, 3.1, 6.2);
      c.closePath();
    }

    function drawKnob(c, x, y, ang, shadowOnly) {
      c.save();
      c.translate(x, y);
      c.rotate(ang - Math.PI / 2);
      c.scale(knobS, knobS);

      if (shadowOnly) {
        knobPath(c);
        c.fill();
        c.fillRect(-3.4, -0.5, 6.8, 7.5);
        c.restore();
        return;
      }

      // Brass ferrule where the cord is crimped
      const fg = c.createLinearGradient(-3.6, 0, 3.6, 0);
      fg.addColorStop(0, '#5b4a2c');
      fg.addColorStop(0.3, '#e8d59e');
      fg.addColorStop(0.55, '#b0924f');
      fg.addColorStop(1, '#4a3a1f');
      c.fillStyle = fg;
      c.beginPath();
      if (c.roundRect) c.roundRect(-3.5, -0.6, 7, 7.6, 1.2);
      else c.rect(-3.5, -0.6, 7, 7.6);
      c.fill();
      c.fillStyle = 'rgba(0,0,0,0.25)';
      c.fillRect(-3.5, 2.6, 7, 0.7);
      c.fillRect(-3.5, 4.4, 7, 0.6);

      // Turned walnut wood body
      knobPath(c);
      const bg = c.createLinearGradient(-9.6, 0, 9.6, 0);
      bg.addColorStop(0, '#24150c');
      bg.addColorStop(0.22, '#6b3f22');
      bg.addColorStop(0.4, '#a8693d');
      bg.addColorStop(0.58, '#7c4828');
      bg.addColorStop(0.85, '#3b2213');
      bg.addColorStop(1, '#1d110a');
      c.fillStyle = bg;
      c.fill();

      c.save();
      knobPath(c);
      c.clip();

      // Wood grain lines
      c.strokeStyle = 'rgba(30,14,6,0.28)';
      c.lineWidth = 0.55;
      for (let k = -3; k <= 3; k++) {
        c.beginPath();
        c.moveTo(k * 2.4 - 0.6, 8);
        c.bezierCurveTo(k * 2.9 + 1, 16, k * 2.2 - 1, 26, k * 1.6, 35);
        c.stroke();
      }

      // Soft light + occlusion
      const hl = c.createRadialGradient(-3.6, 17, 0.5, -3.6, 17, 9);
      hl.addColorStop(0, 'rgba(255,226,190,0.42)');
      hl.addColorStop(1, 'rgba(255,226,190,0)');
      c.fillStyle = hl;
      c.fillRect(-10, 6, 20, 30);

      const bo = c.createLinearGradient(0, 24, 0, 35.5);
      bo.addColorStop(0, 'rgba(0,0,0,0)');
      bo.addColorStop(1, 'rgba(0,0,0,0.35)');
      c.fillStyle = bo;
      c.fillRect(-10, 6, 20, 30);
      c.restore();

      // Specular streak
      c.fillStyle = 'rgba(255,240,220,0.38)';
      c.beginPath();
      c.ellipse(-4.4, 20.5, 1.1, 5.2, -0.08, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function draw() {
      const c = ctx;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      const ps = pts;
      if (ps.length <= N) return;
      const last = ps[N];
      const prev = ps[N - 1];
      const ang = Math.atan2(last.y - prev.y, last.x - prev.x);

      // Cast shadow
      const sa = 0.28;
      c.save();
      c.translate(7, 11);
      c.strokeStyle = `rgba(0,0,0,${sa * 0.8})`;
      c.lineWidth = thick + 1;
      c.lineCap = 'round';
      pathThrough(c, ps);
      c.stroke();
      c.fillStyle = `rgba(0,0,0,${sa})`;
      drawKnob(c, last.x, last.y, ang, true);
      c.restore();

      // Braided cotton cord
      c.lineCap = 'round';
      c.lineJoin = 'round';
      pathThrough(c, ps);
      c.strokeStyle = '#6f6455';
      c.lineWidth = thick + 1.3;
      c.stroke();
      c.strokeStyle = '#d6ccba';
      c.lineWidth = thick;
      c.stroke();

      const sm = samples(ps, thick * 1.05);
      c.lineWidth = Math.max(0.6, thick * 0.24);
      c.strokeStyle = 'rgba(96,82,64,0.55)';
      c.beginPath();
      for (const q of sm) {
        if (q.y < -2) continue;
        const nx = -q.ty;
        const ny = q.tx;
        const h = thick * 0.5;
        c.moveTo(q.x - nx * h - q.tx * h * 0.7, q.y - ny * h - q.ty * h * 0.7);
        c.lineTo(q.x + nx * h + q.tx * h * 0.7, q.y + ny * h + q.ty * h * 0.7);
      }
      c.stroke();

      // Light streak along cord
      c.save();
      c.translate(-thick * 0.2, -thick * 0.05);
      pathThrough(c, ps);
      c.strokeStyle = 'rgba(255,252,244,0.55)';
      c.lineWidth = thick * 0.28;
      c.stroke();
      c.restore();

      drawKnob(c, last.x, last.y, ang, false);

      // Hit area positioning
      const kx = last.x + Math.cos(ang) * 20 * knobS;
      const ky = last.y + Math.sin(ang) * 20 * knobS;
      hit.style.transform = `translate(${kx}px, ${ky}px)`;
    }

    function wake() {
      still = 0;
      if (!sleeping) return;
      sleeping = false;
      lastT = 0;
      acc = 0;
      requestAnimationFrame(loop);
    }

    function loop(now) {
      if (!lastT) lastT = now;
      let dt = Math.min((now - lastT) / 1000, 1 / 20);
      lastT = now;
      updateDrag();
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      draw();

      let motion = Math.abs(extV) + Math.abs(ext);
      for (const q of pts) motion = Math.max(motion, Math.abs(q.x - q.px) + Math.abs(q.y - q.py));
      if (grab < 0 && motion < 0.06) {
        if (++still > 30) {
          for (const q of pts) {
            q.px = q.x;
            q.py = q.y;
          }
          sleeping = true;
          return;
        }
      } else {
        still = 0;
      }

      animId = requestAnimationFrame(loop);
    }

    const local = (e) => {
      const r = wrap.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    function startDrag(e, idx) {
      wake();
      grab = idx;
      const p = local(e);
      const g = pts[idx];
      grabOff = { x: p.x - g.x, y: p.y - g.y };
      ptr = ptrPrev = p;
      target = { x: g.x, y: g.y };
      downAt = performance.now();
      downPos = p;
      moved = 0;
      wrap.classList.add('dragging');
      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    }

    function onMove(e) {
      if (grab < 0) return;
      e.preventDefault();
      ptrPrev = ptr;
      ptr = local(e);
      moved = Math.max(moved, Math.hypot(ptr.x - downPos.x, ptr.y - downPos.y));
    }

    function endDrag() {
      if (grab < 0) return;
      const g = pts[grab];
      if (ptr && ptrPrev) {
        const vx = ptr.x - ptrPrev.x;
        const vy = ptr.y - ptrPrev.y;
        g.px = g.x - vx * 0.5;
        g.py = g.y - vy * 0.5;
      }
      const tap = moved < 6 && performance.now() - downAt < 300;
      grab = -1;
      target = null;
      ptr = ptrPrev = null;
      wrap.classList.remove('dragging');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      if (tap) tug();
    }

    function tug() {
      wake();
      extV = EXT_MAX * 44;
      if (pts[N]) pts[N].px = pts[N].x + 2;
    }

    const handlePointerDown = (e) => {
      e.preventDefault();
      try {
        hit.setPointerCapture(e.pointerId);
      } catch (_) {}
      startDrag(e, N);
    };

    hit.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', layout);

    layout();
    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      hit.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', layout);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, [onToggle]);

  return (
    <div
      ref={wrapRef}
      id="cord"
      className="fixed top-0 right-0 z-50 pointer-events-none select-none transition-opacity duration-300"
      style={{ width: 'min(100%, 340px)', height: '480px' }}
      title="Pull cord to toggle light / dark mode"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <button
        ref={hitRef}
        id="cordHit"
        role="switch"
        aria-checked={isDark}
        aria-label="Light switch cord (pull or tap to switch modes)"
        className="absolute left-0 top-0 w-16 h-16 -ml-8 -mt-8 rounded-full pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
