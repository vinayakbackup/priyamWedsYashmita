import { config, type WeddingEvent } from "@/config";

const { couple } = config;
const initials = `${couple.groom[0]}${couple.bride[0]}`;

const fmt = (d: string, o: Intl.DateTimeFormatOptions) =>
  new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("en-IN", { ...o, timeZone: config.timeZone });

import archBanner from "@/assets/banner_arch.jpg";
import couplePhoto from "@/assets/priyam_yashmita_photo.jpg";

function DayBadge({ n }: { n: number }) {
  return (
    <div className="day-badge mx-auto my-14 grid h-16 w-14 place-items-center font-display text-3xl font-bold text-bright-gold" aria-label={`Day ${n}`}>{n}</div>
  );
}

function Banner({ e }: { e: WeddingEvent }) {
  const v = e.banner ?? "royal";
  if (v === "arch")
    return (
      <div className="relative mx-auto max-w-lg overflow-hidden">
        <img src={archBanner} alt="" width={1536} height={672} loading="lazy" className="w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[9%]">
          <h3 className="font-script text-4xl leading-none text-wood sm:text-6xl">{e.title}</h3>
          {e.subtitle && <span className="font-script text-2xl text-wood sm:text-4xl">{e.subtitle}</span>}
        </div>
      </div>
    );
  if (v === "royal")
    return (
      <div className="banner-royal relative mx-auto max-w-lg overflow-hidden px-6 py-8 sm:px-10">
        <span className="absolute left-3 top-2 z-10 text-3xl text-gold" aria-hidden>❧</span>
        <span className="absolute right-3 top-2 z-10 -scale-x-100 text-3xl text-gold" aria-hidden>❧</span>
        <span className="absolute bottom-2 left-3 z-10 -scale-y-100 text-3xl text-gold" aria-hidden>❧</span>
        <span className="absolute bottom-2 right-3 z-10 -scale-x-100 -scale-y-100 text-3xl text-gold" aria-hidden>❧</span>
        <div className="relative z-10">
          <div className="royal-crest mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full text-sm text-bright-gold" aria-hidden>✦</div>
          <p className="font-display text-[9px] uppercase tracking-[0.35em] text-ivory/80 sm:text-[10px]">An evening of dinner & dancing</p>
          <div className="mx-auto my-3 flex items-center justify-center gap-3 text-gold" aria-hidden>
            <span className="royal-rule h-px w-14" />❧<span className="royal-rule h-px w-14" />
          </div>
          <h3 className="royal-title font-script text-6xl leading-none text-gold-grad sm:text-7xl">{e.title}</h3>
          <p className="mt-4 font-display text-[9px] uppercase tracking-[0.3em] text-ivory/70">Dinner · Music · Celebrations</p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gold" aria-hidden>
            <span className="royal-rule h-px w-12" />❦<span className="royal-rule h-px w-12" />
          </div>
        </div>
      </div>
    );
  return (
    <div className={`banner-${v} mx-auto flex max-w-lg items-center justify-center gap-4 px-6 py-3`}>
      {v !== "night" && <span className="text-3xl" aria-hidden>☂</span>}
      <div className="leading-none">
        <h3 className="inline font-script text-4xl sm:text-6xl">{e.title}</h3>
        {e.subtitle && <span className={`font-script text-2xl sm:text-3xl ${v === "night" ? "ml-1 inline" : "block"}`}>{e.subtitle}</span>}
      </div>
      {v !== "night" && <span className="text-3xl" aria-hidden>☂</span>}
    </div>
  );
}

function EventBlock({ e }: { e: WeddingEvent }) {
  return (
    <article className="mt-10">
      <Banner e={e} />
      <div className={`mx-auto mt-8 grid max-w-lg items-center gap-4 text-left ${e.art ? "grid-cols-[1.1fr_1fr]" : ""}`}>
        <div>
          {e.description && <p className="font-serif text-sm leading-snug text-ivory sm:text-base">{e.description}</p>}
          <ul className="event-line mt-6 space-y-7 pl-6 font-serif text-sm text-ivory">
            <li>{e.time} onwards<span className="block text-sm text-muted-foreground">{fmt(e.date, { weekday: "short", day: "numeric", month: "short" })}</span></li>
          </ul>

        </div>
        {e.art && <img src={e.art} alt={`${couple.groom} and ${couple.bride} at the ${e.title}`} width={1024} height={1024} loading="lazy" className="w-full" />}
      </div>
    </article>
  );
}

export function DetailsPage() {
  const days = [...new Set(config.events.map((e) => e.date))];
  const last = config.events[config.events.length - 1]!;
  return (
    <section className="scroll-mt-6 py-16 text-center" id="details">
      <svg viewBox="0 0 40 50" className="mx-auto h-12 w-10" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
        <path d="M20 4c-6 0-9 5-9 10 0 4 3 6 3 9s-4 5-4 10 4 10 10 10 10-4 10-9" /><path d="M14 14c2-3 10-3 12 0M20 22v20M26 33c3 0 6-2 6-6" /><circle cx="20" cy="9" r="2" />
      </svg>
      <h2 className="mt-4 font-script text-6xl text-gold-grad sm:text-7xl">The Details</h2>
      <p className="mx-auto mt-3 max-w-xs font-serif text-sm tracking-[0.2em] text-muted-foreground">Everything you need to celebrate with us — from ceremonies and timings to the venue and festivities.</p>

      <div className="relative mx-auto mt-10 w-64 -rotate-3 sm:w-72">
        <div className="photo-frame p-3"><img src={couplePhoto} alt={`${couple.groom} and ${couple.bride}`} loading="lazy" className="h-auto w-full object-contain" /></div>
        <div className="wax-seal absolute -right-6 -top-6 grid h-16 w-16 place-items-center rounded-full font-script text-2xl text-ivory" aria-hidden>{initials}</div>
      </div>

      {days.map((d, di) => (
        <div key={d}>
          <DayBadge n={di + 1} />
          {config.events.filter((e) => e.date === d).map((e) => <EventBlock key={e.id} e={e} />)}
        </div>
      ))}

      <div className="relative mx-auto mt-16 w-60">
        <div className="date-card rounded-sm px-4 pb-10 pt-8 text-ivory">
          <p className="font-serif text-6xl">{fmt(last.date, { day: "numeric" })}</p>
          <p className="font-script text-5xl">{fmt(last.date, { month: "long" })}</p>
          <p className="font-serif text-2xl">{fmt(last.date, { year: "numeric" })}</p>
          <p className="mt-5 font-display text-[10px] tracking-[0.25em] text-muted-foreground">{last.time} ONWARDS</p>
          <p className="mt-2 font-display text-xs tracking-widest">AT {last.venue.toUpperCase()}</p>
        </div>
        <div className="wax-seal absolute -right-5 -top-6 grid h-16 w-16 place-items-center rounded-full font-script text-2xl text-ivory" aria-hidden>{initials}</div>
      </div>
      <a href="#top" className="mt-12 inline-block font-script text-3xl text-ivory hover:text-bright-gold">Back to Invitation</a>
    </section>
  );
}
