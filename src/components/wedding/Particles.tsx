import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };
const COLORS = ["255,215,0", "212,175,55", "255,236,170", "255,180,80"];

/** Firecracker-style golden bursts with crackling sparks. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, last = performance.now(), nextBurst = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); window.addEventListener("resize", resize);
    const ps: P[] = [];
    const burst = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.2;
        const s = 60 + Math.random() * 160;
        ps.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 0.9 + Math.random() * 0.9, size: 1 + Math.random() * 1.6, hue: Math.floor(Math.random() * COLORS.length) });
      }
    };
    const small = () => w < 600;
    const randomBurst = () => burst(w * (0.1 + Math.random() * 0.8), h * (0.08 + Math.random() * 0.55), small() ? 40 : 70);

    if (reduce) {
      // Static scatter of sparks.
      for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(${COLORS[i % 4]},${Math.random()})`; ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5); }
      return () => window.removeEventListener("resize", resize);
    }
    burst(w / 2, h / 2, small() ? 70 : 110);
    const draw = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (t > nextBurst) { randomBurst(); nextBurst = t + 600 + Math.random() * 900; }
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]!;
        p.life += dt;
        if (p.life > p.max) { ps.splice(i, 1); continue; }
        p.vx *= 0.97; p.vy = p.vy * 0.97 + 60 * dt;
        const px = p.x, py = p.y;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const k = 1 - p.life / p.max;
        const flicker = Math.random() > 0.15 ? 1 : 0.2;
        const col = COLORS[p.hue];
        ctx.strokeStyle = `rgba(${col},${k * 0.5 * flicker})`;
        ctx.lineWidth = p.size * 0.8;
        ctx.beginPath(); ctx.moveTo(px - p.vx * dt * 3, py - p.vy * dt * 3); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.fillStyle = `rgba(${col},${k * flicker})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * k + 0.3, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden />;
}
