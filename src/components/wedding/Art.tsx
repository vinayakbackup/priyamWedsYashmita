import { useEffect, useRef, useState } from "react";

/** Image with ornamental SVG fallback when the asset is missing. */
export function Asset({ src, alt, className, fallback }: { src: string; alt: string; className?: string; fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setFailed(true); }, []);
  if (failed) return <>{fallback}</>;
  return <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" className={className} onError={() => setFailed(true)} />;
}

export function ArchFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 380" className={className} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="var(--gold)" /><stop offset=".5" stopColor="var(--bright-gold)" /><stop offset="1" stopColor="var(--gold)" /></linearGradient>
      </defs>
      <path d="M20 380V150Q20 40 150 12Q280 40 280 150V380Z" fill="var(--wood)" stroke="url(#g)" strokeWidth="3" />
      <path d="M45 380V160Q45 70 150 42Q255 70 255 160V380Z" fill="var(--maroon)" opacity=".35" stroke="url(#g)" strokeWidth="1.5" />
      <path d="M70 380V170Q70 95 150 70Q230 95 230 170V380" fill="none" stroke="url(#g)" strokeWidth="1" strokeDasharray="2 6" />
      {[60, 110, 160, 210, 260, 310].map((y) => (
        <g key={y}><circle cx="32" cy={y + 40} r="3" fill="var(--ivory)" /><circle cx="268" cy={y + 40} r="3" fill="var(--ivory)" /></g>
      ))}
      <g transform="translate(150 120)" fill="none" stroke="url(#g)" strokeWidth="1.5">
        <path d="M0 -30C14 -14 14 14 0 30C-14 14 -14 -14 0 -30Z" /><path d="M-30 0C-14 -14 14 -14 30 0C14 14 -14 14 -30 0Z" />
        <circle r="5" fill="var(--bright-gold)" />
      </g>
    </svg>
  );
}

export function ScrollFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" className={className} aria-hidden>
      <rect x="20" y="12" width="280" height="16" rx="3" fill="var(--maroon)" stroke="var(--gold)" />
      <rect x="4" y="8" width="18" height="24" rx="9" fill="var(--gold)" />
      <rect x="298" y="8" width="18" height="24" rx="9" fill="var(--gold)" />
    </svg>
  );
}

export function TasselFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 140" className={className} aria-hidden>
      <line x1="15" y1="0" x2="15" y2="70" stroke="var(--gold)" strokeWidth="1.5" />
      {[20, 35, 50].map((y) => <circle key={y} cx="15" cy={y} r="3.5" fill="var(--ivory)" />)}
      <path d="M8 70h14l-2 10H10Z" fill="var(--gold)" />
      <path d="M9 80h12l4 55H5Z" fill="var(--maroon)" stroke="var(--gold)" strokeWidth=".6" />
    </svg>
  );
}

export function CoupleFallback({ className }: { className?: string }) {
  // Abstract silhouettes — no faces.
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path d="M60 200C60 140 70 110 90 100C80 90 80 70 92 64C104 70 104 90 94 100C112 110 118 150 118 200Z" fill="var(--ivory)" opacity=".85" />
      <path d="M100 200C96 150 112 112 130 104C120 94 122 74 134 70C146 76 146 96 136 104C160 116 170 160 168 200Z" fill="var(--maroon)" stroke="var(--gold)" strokeWidth="1" />
      <path d="M86 112Q100 140 140 116" fill="none" stroke="var(--maroon)" strokeWidth="5" opacity=".9" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 24" className={`mx-auto h-6 w-64 ${className}`} aria-hidden>
      <path d="M0 12H120M180 12H300" stroke="var(--gold)" strokeWidth="1" />
      <path d="M150 2L162 12L150 22L138 12Z" fill="none" stroke="var(--bright-gold)" />
      <circle cx="150" cy="12" r="3" fill="var(--bright-gold)" />
      <circle cx="128" cy="12" r="2" fill="var(--ivory)" /><circle cx="172" cy="12" r="2" fill="var(--ivory)" />
    </svg>
  );
}

export function Swirls({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 80" className={`draw ${className ?? ""}`} fill="none" stroke="var(--gold)" strokeWidth="1.4" aria-hidden>
      <path d="M200 60C160 60 150 20 120 30C95 38 110 62 90 62C60 62 50 30 10 40" />
      <path d="M200 60C240 60 250 20 280 30C305 38 290 62 310 62C340 62 350 30 390 40" />
      <path d="M200 70C180 70 170 50 150 52M200 70C220 70 230 50 250 52" stroke="var(--bright-gold)" />
    </svg>
  );
}

export function InviteArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[300/400] w-full ${className}`}>
      <div className="absolute inset-x-0 bottom-0 top-[5%]">
        <ArchAsset />
      </div>
      <div className="absolute inset-x-[-4%] top-0"><ScrollAsset /></div>
      <div className="sway absolute left-[2%] top-[6%] w-[9%]"><TasselAsset /></div>
      <div className="sway absolute right-[2%] top-[6%] w-[9%]" style={{ animationDelay: "-1.6s" }}><TasselAsset /></div>
      <div className="absolute inset-x-[18%] bottom-[2%]"><CoupleAsset /></div>
    </div>
  );
}

import { config } from "@/config";
const ArchAsset = () => <Asset src={config.assets.arch} alt="Carved jharokha arch" className="h-full w-full object-contain" fallback={<ArchFallback className="h-full w-full" />} />;
const ScrollAsset = () => <Asset src={config.assets.scroll} alt="" className="w-full" fallback={<ScrollFallback className="w-full" />} />;
const TasselAsset = () => <Asset src={config.assets.tassel} alt="" className="w-full" fallback={<TasselFallback className="w-full" />} />;
const CoupleAsset = () => <Asset src={config.assets.couple} alt={`${config.couple.groom} and ${config.couple.bride}`} className="w-full" fallback={<CoupleFallback className="w-full" />} />;
