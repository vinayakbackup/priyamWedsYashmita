import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { config } from "@/config";
import { Divider, InviteArt, Swirls } from "@/components/wedding/Art";
import { Particles } from "@/components/wedding/Particles";
import { RoyalPage } from "@/components/wedding/RoyalPage";
import { DetailsPage } from "@/components/wedding/DetailsPage";

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
  new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("en-IN", { ...o, timeZone: config.timeZone });

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
      {config.music?.src && <audio id="bg-music" ref={audio} src={config.music.src} loop preload="auto" />}
      {!gone && (
        <div
          role="button" tabIndex={0} aria-label="Open the wedding invitation"
          onClick={openInvite}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInvite(); } }}
          className="argyle fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-between overflow-hidden px-2 py-6 transition-opacity duration-[800ms] focus:outline-none"
          style={{ opacity: open ? 0 : 1 }}
        >
          <Particles className="pointer-events-none absolute inset-0 h-full w-full" />
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <p className="rise mb-3 font-display text-sm italic uppercase tracking-[0.5em] text-ivory sm:text-base">You're Invited</p>
            <div className="rise flex w-[94vw] max-w-[560px] justify-center" style={{ animationDelay: ".4s" }}><InviteArt className="max-h-[60dvh] w-auto max-w-full" /></div>
          </div>
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
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
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


function Main() {
  const { families, venue } = config;
  return (
    <main className="mx-auto max-w-3xl px-5 pb-16" id="top">
      <RoyalPage />
      <section className="pt-16 text-center">
        <p className="font-display text-lg tracking-[0.2em] text-ivory sm:text-xl">{fmtDate(config.weddingDate)}</p>
        <Countdown />
      </section>

      <DetailsPage />

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
