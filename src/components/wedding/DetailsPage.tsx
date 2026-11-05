import { config, type WeddingEvent } from "@/config";

const { couple } = config;
const initials = `${couple.groom[0]}${couple.bride[0]}`;

const fmt = (d: string, o: Intl.DateTimeFormatOptions) =>
  new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("en-IN", { ...o, timeZone: config.timeZone });

const gcal = (e: WeddingEvent) => {
  const s = new Date(e.start); const en = new Date(s.getTime() + 3 * 36e5);
  const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: `${e.title} — ${couple.groom} & ${couple.bride}`, dates: `${f(s)}/${f(en)}`, location: `${e.venue}, ${e.address}`, details: `Dress code: ${e.dressCode}` });
  return `https://calendar.google.com/calendar/render?${q}`;
};

function DayBadge({ n }: { n: number }) {
  return (
    <div className="day-badge mx-auto my-12 grid h-16 w-14 place-items-center font-display text-3xl text-bright-gold" aria-label={`Day ${n}`}>{n}</div>
  );
}

function EventBlock({ e, i }: { e: WeddingEvent; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="reveal-soft mt-8">
      <div className="event-banner mx-auto flex max-w-md items-center justify-center gap-4 px-6 py-3">
        <span className="text-2xl" aria-hidden>{e.icon}</span>
        <h3 className="font-script text-5xl leading-none text-gold-grad">{e.title}</h3>
        <span className="text-2xl" aria-hidden>{e.icon}</span>
      </div>
      <div className={`mt-8 grid items-center gap-6 sm:grid-cols-[1fr_auto] ${flip ? "sm:[direction:rtl]" : ""}`}>
        <div className="[direction:ltr]">
          <ul className="event-line space-y-6 pl-8 text-left">
            <li><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{fmt(e.date, { weekday: "long", day: "numeric", month: "long" })}</span><span className="block font-serif text-lg text-ivory">{e.time} onwards</span></li>
            <li><span className="block font-serif text-lg text-ivory">{e.venue}</span><span className="text-sm text-muted-foreground">{e.address}</span></li>
            <li><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Dress code</span><span className="block font-serif text-lg text-ivory">{e.dressCode}</span></li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 pl-8">
            <a className="btn-outline-gold" href={gcal(e)} target="_blank" rel="noreferrer">Add to calendar</a>
            <a className="btn-outline-gold" href={e.mapUrl} target="_blank" rel="noreferrer">Map</a>
          </div>
        </div>
        <div className="event-medallion mx-auto hidden h-32 w-32 place-items-center rounded-full text-5xl sm:grid" aria-hidden>{e.icon}</div>
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
        <div className="photo-frame p-3"><img src={config.assets.printArt} alt={`${couple.groom} and ${couple.bride}`} loading="lazy" className="w-full bg-background" /></div>
        <div className="wax-seal absolute -right-6 -top-6 grid h-16 w-16 place-items-center rounded-full font-script text-2xl text-ivory" aria-hidden>{initials}</div>
      </div>

      {days.map((d, di) => (
        <div key={d}>
          <DayBadge n={di + 1} />
          {config.events.filter((e) => e.date === d).map((e) => <EventBlock key={e.id} e={e} i={config.events.indexOf(e)} />)}
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
