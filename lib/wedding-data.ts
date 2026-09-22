export interface StoryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  titleColor: string;
  offset?: boolean;
}

export interface ScheduleItem {
  id: string;
  dateTime: string;
  title: string;
  location: string;
  attireNote: string;
  swatches?: string[];
  themeColor: string;
  accentColor: string;
  calTitle: string;
  calStartUTC: string;
  calEndUTC: string;
}

export interface PaletteItem {
  id: string;
  title: string;
  description: string;
  swatches: string[];
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
}

export const WEDDING_CONFIG = {
  couple: {
    bride: "Aderonke",
    groom: "Adediwura",
    shortName: "A & A",
    familyAnnouncement: "Together with their families",
    hashtag: "#MeetTheAdebanjos",
    subHashtags: [
      "#MeetTheAdebanjos",
      "#TM26",
      "#AdedTogether26",
      "#RonkeFoundHerDiwura",
      "#ToluMoyoForever",
    ],
    tagline:
      "We're becoming the Adebanjos, and we'd love for you to be part of it — traditional engagement, church, and the party after.",
    dateDisplay: "18 – 19 December 2026",
    locationDisplay: "Lagos, Nigeria",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    isoTargetDate: "2026-12-18T09:00:00+01:00",
  },
  bankDetails: {
    accountName: "Adediwura & Aderonke",
    accountNumber: "0123456789",
    bankName: "Guaranty Trust Bank (GTB)",
  },
  asoEbiCoordinator: {
    title: "Aso-Ebi Package & Fabric",
    description:
      "Fabric and cap/gele packages are available for collection ahead of the trad. For enquiries and payment details, reach out to:",
    contact: "Aunty Yemi (Aso-Ebi Coordinator) — WhatsApp +234 801 234 5678",
    whatsappLink: "https://wa.me/2348012345678?text=Hello%20Aunty%20Yemi,%20I'd%20like%20to%20enquire%20about%20the%20Aso-Ebi%20package%20for%20Aderonke%20and%20Adediwura's%20wedding.",
  },
  googleScriptUrl:
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
    "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
};

export const STORY_ITEMS: StoryItem[] = [
  {
    id: "how-we-met",
    title: "How We Met",
    description:
      "A mutual friend's birthday dinner in Lekki, a seat that happened to be free next to his, and a conversation about jollof that ran three hours too long.",
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80",
    imageAlt: "How Aderonke and Adediwura met",
    titleColor: "var(--blue)",
  },
  {
    id: "proposal",
    title: "The Proposal",
    description:
      "A quiet Sunday walk at the Lekki Conservation Centre turned into the loudest yes, with both families waiting — not so secretly — just around the corner.",
    imageUrl:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=80",
    imageAlt: "The proposal",
    titleColor: "var(--sage-deep)",
    offset: true,
  },
  {
    id: "road-to-forever",
    title: "Road to Forever",
    description:
      "Two families, one aso-ebi group chat, and a wedding list that keeps growing — all leading to the day we finally become the Adebanjos.",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Road to forever",
    titleColor: "var(--lilac-deep)",
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "trad",
    dateTime: "Friday · 18 December 2026 · 4:00 PM",
    title: "Traditional Engagement",
    location: "The Balmoral Events Centre, Ikeja, Lagos",
    attireNote: "Aso-ebi: Sage Green & Lilac. See the full palette below.",
    swatches: ["var(--sage)", "var(--lilac)"],
    themeColor: "var(--sage)",
    accentColor: "var(--sage-deep)",
    calTitle: "Traditional Engagement — Adebanjo Wedding",
    calStartUTC: "20261218T150000Z",
    calEndUTC: "20261218T190000Z",
  },
  {
    id: "church",
    dateTime: "Saturday · 19 December 2026 · 10:00 AM",
    title: "Church Ceremony",
    location: "House on the Rock, Lekki, Lagos",
    attireNote: "White wedding attire — come as you are, no aso-ebi required.",
    themeColor: "var(--blue)",
    accentColor: "var(--blue)",
    calTitle: "Church Ceremony — Adebanjo Wedding",
    calStartUTC: "20261219T090000Z",
    calEndUTC: "20261219T110000Z",
  },
  {
    id: "reception",
    dateTime: "Saturday · 19 December 2026 · 1:00 PM",
    title: "Reception",
    location: "Eko Convention Centre, Victoria Island, Lagos",
    attireNote: "Aso-ebi: Ultramarine Blue accent, worn however you like.",
    themeColor: "var(--blue)",
    accentColor: "var(--blue)",
    calTitle: "Reception — Adebanjo Wedding",
    calStartUTC: "20261219T120000Z",
    calEndUTC: "20261219T170000Z",
  },
  {
    id: "after-party",
    dateTime: "Saturday · 19 December 2026 · 7:00 PM",
    title: "After-Party",
    location: "The Rooftop, Victoria Island, Lagos",
    attireNote: "Dancing shoes, not aso-ebi.",
    themeColor: "var(--lilac-deep)",
    accentColor: "var(--lilac-deep)",
    calTitle: "After-Party — Adebanjo Wedding",
    calStartUTC: "20261219T180000Z",
    calEndUTC: "20261219T220000Z",
  },
];

export const PALETTE_ITEMS: PaletteItem[] = [
  {
    id: "bride-family",
    title: "Bride's Family",
    description: "Lilac, in any shade — lace, aso-oke or plain.",
    swatches: ["#c8b6e2", "#dccbef", "#a186c6"],
  },
  {
    id: "groom-family",
    title: "Groom's Family",
    description: "Sage green, in any shade — same guidance as above.",
    swatches: ["#87ae73", "#a9c99a", "#5e8049"],
  },
  {
    id: "friends-guests",
    title: "Friends & Guests",
    description: "A touch of ultramarine blue — an accessory, agbada or gown.",
    swatches: ["#4166f5", "#7d97f8", "#2c48c9"],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "img-1",
    imageUrl:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80",
    alt: "Aderonke and Adediwura pre-wedding portrait",
  },
  {
    id: "img-2",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80",
    alt: "Pre-wedding moment sharing a smile",
  },
  {
    id: "img-3",
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80",
    alt: "Pre-wedding romantic outdoor scene",
  },
  {
    id: "img-4",
    imageUrl:
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=700&q=80",
    alt: "Walking together holding hands",
  },
  {
    id: "img-5",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    alt: "Couple golden hour pre-wedding",
  },
  {
    id: "img-6",
    imageUrl:
      "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=700&q=80",
    alt: "Joyful pre-wedding laughter",
  },
];
