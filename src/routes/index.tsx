import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { config, type WeddingEvent } from "@/config";
import { Divider, InviteArt, Swirls } from "@/components/wedding/Art";
import { Particles } from "@/components/wedding/Particles";

const { couple } = config;
const title = `${couple.groom} & ${couple.bride} — Wedding Invitation`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: `${config.hero.tagline} — ${config.hero.venueName}` },
      { property: "og:title", content: title },
      { property: "og:description", content: config.hero.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fmtDate = (d: string, o: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }) =>
  new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("en-IN", o);

function Index() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  useEffect(() => { document.body.classList.toggle("locked", !open); return () => document.body.classList.remove("locked"); }, [open]);
  const openInvite = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => setGone(true), 800);
    if (config.music?.src && config.music.autoplayOnOpen) audio.current?.play().catch(() => {});
  };
  return (
    <div className="argyle min-h-screen">
      {config.music?.src && <audio ref={audio} src={config.music.src} loop preload="none" />}
      {!gone && (
        <div
          role="button" tabIndex={0} aria-label="Open the wedding invitation"
          onClick={openInvite}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInvite(); } }}
          className="argyle fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-between overflow-hidden px-6 py-10 transition-opacity duration-[800ms] focus:outline-none"
          style={{ opacity: open ? 0 : 1 }}
        >
          <Particles className="pointer-events-none absolute inset-0 h-full w-full" />
          <p className="rise relative font-display text-sm italic uppercase tracking-[0.5em] text-ivory sm:text-base">You're Invited</p>
          <div className="rise relative w-[78vw] max-w-sm" style={{ animationDelay: ".4s" }}><InviteArt /></div>
          <div className="relative w-full text-center">
            <Swirls className="mx-auto w-full max-w-md" />
            <p className="pulse-soft mt-2 font-display text-xs uppercase tracking-[0.4em] text-gold">Click to Open</p>
          </div>
        </div>
      )}
      {open && <Main />}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (<div className="mb-10 text-center"><h2 className="font-display text-2xl italic tracking-widest text-gold-grad sm:text-3xl">{children}</h2><Divider className="mt-3" /></div>);
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  const diff = Math.max(0, new Date(config.weddingDate).getTime() - (now ?? 0));
  const parts = now === null ? [0, 0, 0, 0] : [diff / 864e5, (diff / 36e5) % 24, (diff / 6e4) % 60, (diff / 1e3) % 60].map(Math.floor);
  return (
    <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-3" aria-live="off">
      {["Days", "Hours", "Mins", "Secs"].map((l, i) => (
        <div key={l} className="gold-frame rounded-lg py-3 text-center">
          <div className="font-display text-2xl text-bright-gold tabular-nums sm:text-3xl">{String(parts[i]).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

const gcal = (e: WeddingEvent) => {
  const s = new Date(e.start); const en = new Date(s.getTime() + 3 * 36e5);
  const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: `${e.title} — ${couple.groom} & ${couple.bride}`, dates: `${f(s)}/${f(en)}`, location: `${e.venue}, ${e.address}`, details: `Dress code: ${e.dressCode}` });
  return `https://calendar.google.com/calendar/render?${q}`;
};

function Main() {
  const { families, venue, rsvp } = config;
  const msg = rsvp.message.replace("{groom}", couple.groom).replace("{bride}", couple.bride);
  return (
    <main className="mx-auto max-w-3xl px-5 pb-16" id="top">
      <section className="flex min-h-[92vh] flex-col items-center justify-center pt-12 text-center">
        <p className="rise font-serif text-lg italic text-muted-foreground">{config.hero.tagline}</p>
        <h1 className="rise mt-6 font-script text-6xl leading-tight text-gold-grad sm:text-8xl" style={{ animationDelay: ".2s" }}>
          {couple.groom}<span className="mx-3 block font-display text-2xl text-ivory sm:inline">&amp;</span>{couple.bride}
        </h1>
        <Divider className="rise mt-6" />
        <p className="rise mt-6 font-display text-lg tracking-[0.2em] text-ivory sm:text-xl" style={{ animationDelay: ".4s" }}>{fmtDate(config.weddingDate)}</p>
        <p className="rise mt-2 italic text-muted-foreground" style={{ animationDelay: ".5s" }}>{config.hero.venueName}</p>
        <div className="rise w-full" style={{ animationDelay: ".7s" }}><Countdown /></div>
      </section>

      <section className="py-16">
        <Reveal><H2>Celebrations</H2></Reveal>
        <ol className="relative space-y-10 border-l border-gold/40 pl-6 sm:mx-auto sm:max-w-xl">
          {config.events.map((e) => (
            <li key={e.id}>
              <Reveal>
                <span className="absolute -left-[9px] mt-6 h-4 w-4 rotate-45 border border-bright-gold bg-maroon" aria-hidden />
                <article className="gold-frame rounded-xl p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl italic text-gold">{e.icon} {e.title}</h3>
                    <span className="text-sm text-muted-foreground">{e.time}</span>
                  </div>
                  <p className="mt-1 font-display text-sm tracking-widest text-ivory">{fmtDate(e.date)}</p>
                  <p className="mt-3">{e.venue}<span className="block text-sm text-muted-foreground">{e.address}</span></p>
                  <p className="mt-2 text-sm"><span className="text-gold">Dress code · </span>{e.dressCode}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a className="btn-outline-gold" href={gcal(e)} target="_blank" rel="noreferrer">Add to calendar</a>
                    <a className="btn-outline-gold" href={e.mapUrl} target="_blank" rel="noreferrer">Map</a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-16">
        <Reveal><H2>With the Blessings of</H2></Reveal>
        <Reveal className="grid gap-8 text-center sm:grid-cols-2">
          {([["Bride's Family", families.bride], ["Groom's Family", families.groom]] as const).map(([t, f]) => (
            <div key={t} className="gold-frame rounded-xl p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.3em] text-gold">{t}</h3>
              <p className="mt-4 text-lg">{f.father}</p><p className="text-lg">{f.mother}</p>
              {f.extra && <p className="mt-3 text-sm italic text-muted-foreground">{f.extra}</p>}
            </div>
          ))}
        </Reveal>
      </section>

      <section className="py-16">
        <Reveal><H2>The Venue</H2></Reveal>
        <Reveal className="gold-frame overflow-hidden rounded-xl text-center">
          <div className="p-6"><h3 className="font-display text-xl italic text-gold">{venue.name}</h3><p className="mt-2 text-muted-foreground">{venue.address}</p></div>
          <iframe title={`Map of ${venue.name}`} src={venue.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0 grayscale-[40%]" />
          <div className="p-6"><a className="btn-gold" href={venue.mapsLinkUrl} target="_blank" rel="noreferrer">Get Directions</a></div>
        </Reveal>
      </section>

      <section className="py-16 text-center">
        <Reveal><H2>Kindly RSVP</H2></Reveal>
        <Reveal>
          <p className="text-muted-foreground">Please respond by <span className="text-ivory">{fmtDate(rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}</span></p>
          {rsvp.mode === "whatsapp" ? (
            <a className="btn-gold mt-6" href={`https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">RSVP on WhatsApp</a>
          ) : (
            <form action={rsvp.formEndpoint} method="POST" className="mx-auto mt-6 grid max-w-sm gap-3 text-left">
              {["name", "guests", "message"].map((n) => (
                <input key={n} name={n} required={n === "name"} placeholder={n[0].toUpperCase() + n.slice(1)} className="rounded-md border bg-transparent px-4 py-3 text-ivory placeholder:text-muted-foreground" />
              ))}
              <button className="btn-gold justify-center">Send RSVP</button>
            </form>
          )}
        </Reveal>
      </section>

      <footer className="pt-10 text-center">
        <Divider />
        {couple.hashtag && <p className="mt-6 font-display tracking-[0.2em] text-gold-grad">{couple.hashtag}</p>}
        <p className="mt-3 font-script text-3xl text-ivory">Thank you</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#top" className="btn-outline-gold">Back to top</a>
          <Link to="/print" className="btn-outline-gold">Printable card</Link>
        </div>
      </footer>
    </main>
  );
}
