// ✏️ EDIT THIS FILE — every name, date, venue and link on the site comes from here.
// All content lives here. Update names, dates, venues and links in one place.

import combinedArt from "@/assets/couple_arch_scroll.png.asset.json";
import aajSajeya from "@/assets/aaj_sajeya_song.mp3.asset.json";
import mandapArt from "@/assets/couple_arch.png.asset.json";
import haldiArt from "@/assets/couple_haldi.png";
import sangeetArt from "@/assets/couple_sangeet.png";
import pherasArt from "@/assets/couple_pheras.png";

export type WeddingEvent = {
  id: string;
  title: string;
  date: string; // ISO date, e.g. 2027-02-12
  time: string; // display time, e.g. "4:00 PM"
  start: string; // ISO datetime used for calendar links
  venue: string;
  address: string;
  dressCode: string;
  mapUrl: string;
  icon?: string;
  description?: string;
  subtitle?: string; // small line under the title banner
  banner?: "cream" | "green" | "night" | "arch" | "royal";
  art?: string; // illustration beside the details
};

export const config = {
  couple: { bride: "Yashmita", groom: "Priyam", hashtag: "#PriyamWedsYashmita" },
  timeZone: "Asia/Kolkata", // used to display times
  weddingDate: "2026-12-03T19:30:00+05:30",
  hero: { tagline: "Together with their families, joyfully invite you", venueName: "The Cherry Blossom, Indore" },
  events: [
    { id: "haldi", title: "Haldi", date: "2026-12-02", time: "11:00 AM", start: "2026-12-02T11:00:00+05:30", venue: "The Cherry Blossom", address: "Indore, Madhya Pradesh", dressCode: "", mapUrl: "https://maps.google.com/?q=Cherry+Blossom+Indore", icon: "🌼", subtitle: "Ceremony", banner: "cream", description: "Celebrate love and laughter as we kick off the festivities with the joyful Haldi ceremony.", art: haldiArt },
    { id: "sangeet", title: "Sangeet", date: "2026-12-02", time: "6:00 PM", start: "2026-12-02T18:00:00+05:30", venue: "The Cherry Blossom", address: "Indore, Madhya Pradesh", dressCode: "", mapUrl: "https://maps.google.com/?q=Cherry+Blossom+Indore", icon: "🎶", subtitle: "& Musical Night", banner: "night", description: "Get ready to dance the night away as we celebrate an evening of music, love and lively performances.", art: sangeetArt },
    { id: "wedding", title: "Wedding", date: "2026-12-03", time: "9:00 AM", start: "2026-12-03T09:00:00+05:30", venue: "The Cherry Blossom", address: "Indore, Madhya Pradesh", dressCode: "", mapUrl: "https://maps.google.com/?q=Cherry+Blossom+Indore", icon: "🔥", subtitle: "& Phere", banner: "arch", description: "From the grand baraat to sacred vows, join us as we take the holy pheras around the fire.", art: pherasArt },
    { id: "reception", title: "Reception", date: "2026-12-03", time: "7:30 PM", start: "2026-12-03T19:30:00+05:30", venue: "The Cherry Blossom", address: "Indore, Madhya Pradesh", dressCode: "", mapUrl: "https://maps.google.com/?q=Cherry+Blossom+Indore", icon: "✨", subtitle: "", banner: "royal", description: "Raise a toast with us as we begin our new journey together." },
] as WeddingEvent[],
  families: {
    bride: { father: "Mr. Rajendra Singh Rathore", mother: "Mrs. Meenakshi Rathore", extra: "Granddaughter of Late Thakur Bhawani Singh" },
    groom: { father: "Mr. Arvind Malhotra", mother: "Mrs. Sunita Malhotra", extra: "Grandson of Sh. Kailash Malhotra" },
  },
  venue: {
    name: "The Cherry Blossom",
    address: "Indore, Madhya Pradesh",
    lat: 22.7041,
    lng: 75.8577,
    mapsEmbedUrl: "https://maps.google.com/maps?q=22.7041,75.8577&z=15&output=embed",
    mapsLinkUrl: "https://www.google.com/maps/dir/?api=1&destination=22.7041,75.8577",
  },

  // Drop transparent PNGs into /public/assets. Missing files fall back to an ornamental frame.
  assets: {
    // Combined artwork (arch + scroll + tassels + couple). Set to "" to use the separate layers below.
    combined: combinedArt.url,
    printArt: mandapArt.url,
    hero: "/assets/hero.png",
    couple: "/assets/couple.png",
    arch: "/assets/arch.png",
    scroll: "/assets/scroll.png",
    tassel: "/assets/tassel.png",
  },
  music: { src: aajSajeya.url, autoplayOnOpen: true },
};
