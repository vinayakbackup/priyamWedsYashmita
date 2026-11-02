import { createFileRoute, Link } from "@tanstack/react-router";
import { config } from "@/config";
import { Divider, InviteArt } from "@/components/wedding/Art";

const { couple, venue, rsvp } = config;
const title = `Printable Card — ${couple.groom} & ${couple.bride}`;

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: `Print-ready invitation card for ${couple.groom} & ${couple.bride}` },
      { property: "og:title", content: title },
      { property: "og:description", content: "Print-ready A5 portrait wedding invitation card." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrintPage,
});

const d = (s: string, o: Intl.DateTimeFormatOptions) => new Date(s.length === 10 ? s + "T12:00:00" : s).toLocaleDateString("en-IN", { ...o, timeZone: config.timeZone });

function PrintPage() {
  return (
    <div className="argyle flex min-h-screen flex-col items-center gap-6 px-3 py-8">
      <div className="no-print flex gap-3">
        <Link to="/" className="btn-outline-gold">Back</Link>
        <button className="btn-gold" onClick={() => window.print()}>Download / Print</button>
      </div>
      <article className="print-card argyle relative flex aspect-[148/210] w-full max-w-[560px] flex-col items-center p-[5%] text-center">
        <div className="pointer-events-none absolute inset-[3%] border-2 border-gold" />
        <div className="pointer-events-none absolute inset-[4.5%] border border-gold/50" />
        <div className="relative flex h-full flex-col items-center justify-between py-[4%]">
          <p className="font-display text-[clamp(8px,1.8vw,11px)] uppercase italic tracking-[0.4em] text-ivory">{config.hero.tagline}</p>
          <div className="w-[40%]"><InviteArt src={config.assets.printArt} /></div>
          <h1 className="font-script text-[clamp(30px,8vw,52px)] leading-none text-gold-grad">{couple.groom} &amp; {couple.bride}</h1>
          <Divider />
          <div>
            <p className="font-display text-[clamp(10px,2.4vw,15px)] tracking-[0.2em] text-ivory">{d(config.weddingDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            <p className="text-[clamp(10px,2.2vw,14px)] text-muted-foreground">{new Date(config.weddingDate).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: config.timeZone })}</p>
            <p className="mt-1 font-display text-[clamp(10px,2.4vw,15px)] italic text-gold">{venue.name}</p>
            <p className="text-[clamp(9px,2vw,12px)] text-muted-foreground">{venue.address}</p>
          </div>
          <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-[clamp(8px,1.9vw,12px)] sm:grid-cols-3">
            {config.events.map((e) => (
              <li key={e.id}><span className="font-display text-gold">{e.title}</span><br /><span className="text-muted-foreground">{d(e.date, { day: "numeric", month: "short" })} · {e.time}</span></li>
            ))}
          </ul>
          <p className="text-[clamp(8px,1.9vw,12px)] text-ivory">
            RSVP by {d(rsvp.deadline, { day: "numeric", month: "long" })} · WhatsApp +{rsvp.whatsappNumber}
            {couple.hashtag && <span className="block font-display text-gold">{couple.hashtag}</span>}
          </p>
        </div>
      </article>
    </div>
  );
}
