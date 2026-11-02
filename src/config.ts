// ✏️ EDIT THIS FILE — every name, date, venue and link on the site comes from here.
// All values below are realistic PLACEHOLDERS. Replace them with your own.

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
};

export const config = {
  couple: { bride: "Aarohi", groom: "Vihaan", hashtag: "#VihaanWedsAarohi" },
  timeZone: "Asia/Kolkata", // used to display times
  weddingDate: "2027-02-14T19:30:00+05:30",
  hero: { tagline: "Together with their families, joyfully invite you", venueName: "Umaid Palace, Jodhpur" },
  events: [
    { id: "mehendi", title: "Mehendi", date: "2027-02-12", time: "11:00 AM", start: "2027-02-12T11:00:00+05:30", venue: "Zenana Courtyard", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Greens & Yellows", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🌿" },
    { id: "haldi", title: "Haldi", date: "2027-02-13", time: "10:00 AM", start: "2027-02-13T10:00:00+05:30", venue: "Garden Pavilion", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Shades of Yellow", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🌼" },
    { id: "sangeet", title: "Sangeet", date: "2027-02-13", time: "7:30 PM", start: "2027-02-13T19:30:00+05:30", venue: "Durbar Hall", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Indo-Western Glam", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🎶" },
    { id: "wedding", title: "Wedding", date: "2027-02-14", time: "7:30 PM", start: "2027-02-14T19:30:00+05:30", venue: "Baradari Lawns", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Royal Traditional", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "🔥" },
    { id: "reception", title: "Reception", date: "2027-02-15", time: "8:00 PM", start: "2027-02-15T20:00:00+05:30", venue: "The Grand Terrace", address: "Umaid Palace, Jodhpur, Rajasthan", dressCode: "Black Tie / Bandhgala", mapUrl: "https://maps.google.com/?q=Umaid+Bhawan+Palace+Jodhpur", icon: "✨" },
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
    hero: "/assets/hero.png",
    couple: "/assets/couple.png",
    arch: "/assets/arch.png",
    scroll: "/assets/scroll.png",
    tassel: "/assets/tassel.png",
  },
  music: { src: "", autoplayOnOpen: true },
};
