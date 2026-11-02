import { useEffect, useRef } from "react";

export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); window.addEventListener("resize", resize);
    const N = w < 500 ? 90 : 160;
    const ps = Array.from({ length: N }, () => ({ a: Math.random() * Math.PI * 2, r: 0, max: 0.25 + Math.random() * 0.4, s: 0.6 + Math.random() * 1.6, p: Math.random() * 6, z: 0.6 + Math.random() * 1.8 }));
    const t0 = performance.now();
    const draw = (t: number) => {
      const el = (t - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h);
      for (const p of ps) {
        const prog = reduce ? 1 : Math.min(1, el / p.s);
        const ease = 1 - Math.pow(1 - prog, 3);
        const rad = ease * p.max * R;
        const x = w / 2 + Math.cos(p.a + el * 0.02) * rad;
        const y = h / 2 + Math.sin(p.a + el * 0.02) * rad;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(el * 1.5 + p.p));
        ctx.globalAlpha = tw * ease;
        ctx.fillStyle = p.z > 1.8 ? "#ffd700" : "#d4af37";
        ctx.beginPath(); ctx.arc(x, y, p.z, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden />;
}
