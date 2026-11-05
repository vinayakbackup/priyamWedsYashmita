// ✏️ EDIT THIS FILE — every name, date, venue and link on the site comes from here.
// All values below are realistic PLACEHOLDERS. Replace them with your own.

import combinedArt from "@/assets/couple_arch_scroll.png.asset.json";
import mandapArt from "@/assets/couple_arch.png.asset.json";
import mehendiArt from "@/assets/couple_mehendi.png";
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
  couple: { bride: "Aarohi", groom: "Vihaan", hashtag: "#VihaanWedsAarohi" },
  timeZone: "Asia/Kolkata", // used to display times
  weddingDate: "2027-02-14T19:30:00+05:30",
  hero: { tagline: "Together with their families, joyfully invite you", venueName: "Umaid Palace, Jodhpur" },
  events: [
    { id: "mehendi", title: "Mehendi", date: "2027-02-12", time: "11:00 AM", start: "2027-02-12T11:00:00+05:30", venue: "Zenana Courtyard", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Greens & Yellows", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🌿", subtitle: "Ceremony", banner: "green", description: "Henna, music and marigolds. Join us as intricate mehendi adorns the bride’s hands.", art: mehendiArt },
    { id: "haldi", title: "Haldi", date: "2027-02-13", time: "10:00 AM", start: "2027-02-13T10:00:00+05:30", venue: "Garden Pavilion", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Shades of Yellow", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🌼", subtitle: "Ceremony", banner: "cream", description: "Celebrate love and laughter as we kick off the festivities with the joyful Haldi ceremony.", art: haldiArt },
    { id: "sangeet", title: "Sangeet", date: "2027-02-13", time: "7:30 PM", start: "2027-02-13T19:30:00+05:30", venue: "Durbar Hall", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Indo-Western Glam", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🎶", subtitle: "& Musical Night", banner: "night", description: "Get ready to dance the night away as we celebrate an evening of music, love and lively performances.", art: sangeetArt },
    { id: "wedding", title: "Wedding", date: "2027-02-14", time: "7:30 PM", start: "2027-02-14T19:30:00+05:30", venue: "Baradari Lawns", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Royal Traditional", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🔥", subtitle: "& Phere", banner: "arch", description: "From the grand baraat to sacred vows, join us as we take the holy pheras around the fire.", art: pherasArt },
    { id: "reception", title: "Reception", date: "2027-02-15", time: "8:00 PM", start: "2027-02-15T20:00:00+05:30", venue: "The Grand Terrace", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Black Tie / Bandhgala", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "✨", subtitle: "", banner: "royal", description: "Raise a toast with us as we begin our new journey together." },
  ] as WeddingEvent[],
  families: {
    bride: { father: "Mr. Rajendra Singh Rathore", mother: "Mrs. Meenakshi Rathore", extra: "Granddaughter of Late Thakur Bhawani Singh" },
    groom: { father: "Mr. Arvind Malhotra", mother: "Mrs. Sunita Malhotra", extra: "Grandson of Sh. Kailash Malhotra" },
  },
  venue: {
    name: "Umaid Palace",
    address: "Circuit House Road, Jodhpur, Rajasthan 342006",
    lat: 26.2809,
    lng: 73.0473,
    mapsEmbedUrl: "https://maps.google.com/maps?q=26.2809,73.0473&z=15&output=embed",
    mapsLinkUrl: "https://www.google.com/maps/dir/?api=1&destination=26.2809,73.0473",
  },
  rsvp: {
    mode: "whatsapp" as "whatsapp" | "form",
    whatsappNumber: "919876543210",
    message: "Namaste! I/We will joyfully attend the wedding of {groom} & {bride}. Name: ___ Guests: ___",
    deadline: "2027-01-20",
    formEndpoint: "",
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
  music: { src: "", autoplayOnOpen: true },
};
