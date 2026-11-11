import { config } from "@/config";
import musicianArt from "@/assets/musician_banner.png";
import { Divider } from "@/components/wedding/Art";
import standingArt from "@/assets/couple_standing.png";

const { couple } = config;
const initials = `${couple.groom[0]}${couple.bride[0]}`;

function Seal({ className = "" }: { className?: string }) {
  return (
    <div className={`wax-seal grid place-items-center rounded-full font-script text-2xl text-ivory ${className}`} aria-hidden>
      {initials}
    </div>
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
        <div className="flex flex-col items-center justify-center">
          <a href="#details" className="rise block w-full transition-transform hover:scale-105" style={{ animationDelay: ".6s" }} aria-label="For wedding details, click here">
            <img src={musicianArt.url} alt="Shehnai player beside a 'For Wedding Details — Click Here' sign" loading="lazy" className="w-full" />
          </a>
        </div>
        <div className="rise" style={{ animationDelay: ".7s" }}><DateCard /></div>
      </div>

      <div className="mx-auto mt-12 grid max-w-xl grid-cols-[1.1fr_1fr] items-center gap-3">
        <img src={standingArt} alt={`${couple.groom} and ${couple.bride} in their wedding attire`} loading="lazy" className="w-full" />
        <p className="text-left font-script text-4xl leading-tight text-gold-grad sm:text-5xl">
          We can't wait to celebrate with you!
        </p>
      </div>
      <Divider className="mt-10" />
      <p className="mt-6 font-script text-4xl text-gold-grad">{couple.groom} & {couple.bride}</p>
    </section>
  );
}
