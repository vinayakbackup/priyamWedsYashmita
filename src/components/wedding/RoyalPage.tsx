import { useRef, useState } from "react";
import { config } from "@/config";
import musicianArt from "@/assets/musician_banner.png.asset.json";
import attendantLeft from "@/assets/attendant_left.png.asset.json";
import attendantRight from "@/assets/attendant_right.png.asset.json";

const { couple } = config;
const initials = `${couple.groom[0]}${couple.bride[0]}`;

function Seal({ className = "" }: { className?: string }) {
  return (
    <div className={`wax-seal grid place-items-center rounded-full font-script text-2xl text-ivory ${className}`} aria-hidden>
      {initials}
    </div>
  );
}

function Vinyl() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const toggle = () => {
    const a = audio.current;
    if (a) { if (playing) a.pause(); else a.play().catch(() => {}); }
    setPlaying((p) => !p);
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={playing} aria-label={playing ? "Pause music" : "Play music"} className="group flex flex-col items-center">
      {config.music?.src && <audio ref={audio} src={config.music.src} loop preload="none" />}
      <div className={`vinyl relative aspect-square w-32 rounded-full sm:w-40 ${playing ? "spin" : ""}`}>
        <div className="absolute inset-[34%] grid place-items-center rounded-full border border-gold bg-wood font-display text-bright-gold">♪</div>
      </div>
      <span className="mt-2 font-serif text-xs tracking-[0.3em] text-ivory">{playing ? "Tap to pause" : "Tap to play"}</span>
    </button>
  );
}

function DateCard() {
  const days = [...new Set(config.events.map((e) => +e.date.slice(8, 10)))];
  const d = new Date(config.weddingDate);
  const month = d.toLocaleDateString("en-IN", { month: "long", timeZone: config.timeZone });
  const year = d.toLocaleDateString("en-IN", { year: "numeric", timeZone: config.timeZone });
  const wedding = config.events.find((e) => e.id === "wedding") ?? config.events[0];
  return (
    <div className="relative">
      <div className="date-card rounded-sm px-3 pb-12 pt-8 text-center text-ivory">
        <p className="font-serif text-4xl sm:text-5xl">{days.length > 1 ? `${days[0]}–${days[days.length - 1]}` : days[0]}</p>
        <p className="font-script text-4xl leading-tight text-ivory sm:text-5xl">{month}</p>
        <p className="font-serif text-2xl tracking-widest">{year}</p>
        <p className="mt-6 font-display text-[10px] tracking-[0.25em] text-muted-foreground">{wedding?.time} ONWARDS</p>
        <p className="mt-2 font-display text-xs leading-relaxed tracking-widest">AT {config.venue.name.toUpperCase()}<br />{config.hero.venueName.split(",").pop()?.trim().toUpperCase()}</p>
      </div>
      <Seal className="absolute -right-2 -top-5 h-14 w-14" />
    </div>
  );
}

export function RoyalPage() {
  const msg = config.rsvp.message.replace("{groom}", couple.groom).replace("{bride}", couple.bride);
  const rsvpHref = config.rsvp.mode === "whatsapp" ? `https://wa.me/${config.rsvp.whatsappNumber}?text=${encodeURIComponent(msg)}` : "#rsvp";
  return (
    <section className="relative overflow-hidden pt-10 text-center">
      <p className="rise font-serif text-sm tracking-[0.25em] text-muted-foreground">We cordially invite you to the wedding of</p>
      <h1 className="rise mt-2 font-script text-6xl leading-tight text-gold-grad sm:text-7xl" style={{ animationDelay: ".2s" }}>
        {couple.groom} <span className="text-4xl text-ivory">&amp;</span> {couple.bride}
      </h1>

      <div className="rise mx-auto mt-4 w-full max-w-md" style={{ animationDelay: ".4s" }}>
        <img src={config.assets.combined} alt={`${couple.groom} and ${couple.bride} beneath a carved arch`} decoding="async" className="mx-auto w-full" />
      </div>

      <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 items-center gap-5 px-3">
        <div className="flex flex-col items-center gap-8">
          <div className="rise" style={{ animationDelay: ".6s" }}><Vinyl /></div>
          <a href="#details" className="rise block w-full transition-transform hover:scale-105" style={{ animationDelay: ".8s" }} aria-label="For wedding details, click here">
            <img src={musicianArt.url} alt="Shehnai player beside a 'For Wedding Details — Click Here' sign" loading="lazy" className="w-full" />
          </a>
        </div>
        <div className="rise" style={{ animationDelay: ".7s" }}><DateCard /></div>
      </div>

      <div className="mx-auto mt-12 grid max-w-xl grid-cols-[1.1fr_1fr] items-center gap-3">
        <img src={config.assets.printArt} alt={`${couple.groom} and ${couple.bride} beneath a mandap`} loading="lazy" className="w-full" />
        <p className="text-left font-serif text-xl leading-snug text-ivory sm:text-2xl">
          <span className="float-left mr-1 font-script text-6xl leading-none text-gold-grad">W</span>e can't wait to celebrate with you!
        </p>
      </div>

      <div className="stage-floor relative mx-auto mt-10 flex max-w-xl items-end justify-center gap-1 pb-6">
        <img src={attendantLeft.url} alt="" loading="lazy" className="sway-slow w-[26%]" />
        <a href={rsvpHref} target={config.rsvp.mode === "whatsapp" ? "_blank" : undefined} rel="noreferrer" className="envelope group relative mb-2 block w-[46%]" aria-label="Kindly RSVP here">
          <div className="envelope-letter absolute inset-x-[8%] -top-[6%] h-[50%] rounded-sm px-2 pt-3 transition-transform duration-500 group-hover:-translate-y-4">
            <p className="whitespace-nowrap font-serif text-xs text-maroon sm:text-sm"><span className="font-script text-3xl">K</span>indly RSVP here</p>
          </div>
          <div className="envelope-body relative aspect-[4/3.6] rounded-b-md" />
          <Seal className="absolute left-1/2 top-[55%] h-14 w-14 -translate-x-1/2" />
        </a>
        <img src={attendantRight.url} alt="" loading="lazy" className="sway-slow w-[26%]" style={{ animationDelay: "-2s" }} />
      </div>
    </section>
  );
}
