export interface RegistryAccount {
  bankName: string;
  accountName: string;
  accountNumber?: string;
  accountType?: string;
  routingNumber?: string;
  sortCode?: string;
  iban?: string;
  bic?: string;
  bankAddress?: string;
}

export const TOLU_MOYO_CONFIG = {
  couple: {
    bride: "Toluwani",
    groom: "Moyosore",
    shortName: "T & M",
    eyebrow: "You are invited to celebrate",
    tagline: "We're Getting Married 💍",
    hashtag: "#TM26 #MeetTheAdebanjo2026",
    weddingDateText: "19th December 2026",
    locationText: "Ile-Ife, Osun State, Nigeria",
    isoTargetDate: "2026-12-19T10:00:00",
    // heroImage:
    //   "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    heroImage: "/shot/Meet The Adebanjo_s1797-Recovered.jpg",
  },
  details: {
    eventName: "Wedding Ceremony",
    date: "19th December 2026",
    time: "10:00 AM",
    venue: "Rhema Chapel International Churches, Ile-Ife",
    dressCode: "Color of the day (English/Trad - whatever floats your boat)",
  },
  story: {
    poem: [
      "We met in church,",
      "not face to face at first",
      "but through a glowing screen.",
      "",
      "He was serving behind the cameras,",
      "in the control room,",
      "while I was dancing away in the congregation.",
      "",
      "Somewhere between the lights, the lens,",
      "and the moments flashing on the church screen,",
      "he noticed me.",
      "",
      "Too shy to approach right away,",
      "he whispered a small prayer—",
      "that somehow, some way,",
      "I would come his way.",
      "",
      "And I did.",
      "",
      "After service,",
      "a simple conversation began",
      "between two people who were almost strangers.",
      "",
      "Then came the surprising twist:",
      "he wasn't just a familiar face from church—",
      "he was my pastor's brother.",
      "",
      "What started with a prayer and a little courage",
      "slowly became something deeper.",
      "Now we're stepping into a new chapter together,",
      "walking hand in hand toward a journey",
      "that leads us to forever. 💚",
    ],
    highlight:
      "He first saw me on a church screen, from behind a camera lens. He whispered a small prayer: let her come my way. And somehow, our paths crossed. From that moment, two curious hearts found each other—both lovers of journeys, both drawn to new horizons. Now we travel the world side by side, beginning our greatest adventure yet — forever. ✨",
  },
  schedule: [
    { time: "12:00 PM", title: "Guests' Arrival" },
    { time: "12:30 PM", title: "Opening Prayer" },
    { time: "12:35 PM", title: "Traditional Introduction" },
    { time: "1:30 PM", title: "Family Blessings" },
    { time: "2:00 PM", title: "Reception Starts" },
  ],
  gallery: [
    {
      // url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      url: "/shot/Meet The Adebanjo_s1797-Recovered.jpg",
      alt: "Tolu & Moyo - Moments",
    },
    {
      // url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      url: "/shot/Meet The Adebanjo_s1666-Recovered.jpg",
      alt: "Tolu & Moyo - Celebration",
    },
    {
      // url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
      url: "/shot/Meet The Adebanjo_s1919-Recovered.jpg",
      alt: "Tolu & Moyo - Love Story",
    },
    {
      // url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
      url: "/shot/Meet The Adebanjo_s1853-Recovered.jpg",
      alt: "Tolu & Moyo - Together",
    },
    {
      url: "/shot/Meet The Adebanjo_s1647-Recovered.jpg",
      alt: "Tolu & Moyo - Together",
    },
    {
      url: "/shot/Meet The Adebanjo_s1871-Recovered.jpg",
      alt: "Tolu & Moyo - Together",
    },
    /* {
      url: "/shot/Meet The Adebanjo_s1919-Recovered.jpg",
      alt: "Tolu & Moyo - Together",
    }, */
  ],
  registry: {
    intro:
      "Your presence is the greatest gift of all. Is it? Please bless us, here are our account details across currencies.",
    wishlistUrl: "https://giftdice.com/wishlist/k5i7Och8BT",
    accounts: {
      ngn: {
        currencyName: "🇳🇬 Naira",
        bankName: "Stanbic IBTC Bank",
        accountName: "Adebanjo Moyosore Enoch",
        accountNumber: "0058754631",
      },
      /* usd: {
        currencyName: "🇺🇸 Dollar",
        bankName: "Wells Fargo",
        accountName: "Atinuke Kayode",
        accountNumber: "40630227584311729",
        accountType: "Checking",
        routingNumber: "121000248",
        bankAddress: "651 N Broad St, Suite 206, Middletown, 19709 Delaware, US",
      }, */
      /* gbp: {
        currencyName: "🇬🇧 Pounds",
        bankName: "Clear Junction Limited",
        accountName: "Atinuke Christianah Kayode",
        accountNumber: "69712145",
        sortCode: "041307",
        iban: "GB33CLJU04130769712145",
        bankAddress: "307 Euston Rd, London, NW1 3AD",
      }, */
      /* eur: {
        currencyName: "🇪🇺 Euro",
        bankName: "Clear Junction Limited",
        accountName: "Atinuke Christianah Kayode",
        iban: "GB33CLJU04130769712145",
        bic: "CLJUGB21XXX",
        bankAddress: "307 Euston Rd, London, NW1 3AD",
      }, */
    },
  },
  rsvp: {
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbyokwfUoWjQvBUAVeKgPIQLLAN_EIhzToxgI8M-udaIh8VknXW-71WLMBEJHx5CIYat/exec",
    asoEbiFormUrl:
      "https://docs.google.com/forms/d/1TsoShLiqukqZ3_Kk9rcU__C7aqm5As29YTZbullhFrw/preview",
    categories: [
      { id: "grooms-family", label: "Groom's family" },
      { id: "brides-family", label: "Bride's family" },
      { id: "friends-of-the-bride", label: "Friends of the bride" },
      { id: "friends-of-the-groom", label: "Friends of the groom" },
      { id: "friends-of-couple", label: "Friends of the couple" },
      { id: "rhema-chapel", label: "Rhemites (RCIC, Ile-Ife)" },
      { id: "redeemed-christian-church", label: "Redeemers (RCCG)" },
      // { id: "tech-people", label: "Tech bro and tech sis" },
      { id: "friends-brides-family", label: "Friends of Bride's family" },
      { id: "friends-grooms-family", label: "Friends of Groom's family" },
      // { id: "hicc", label: "HICC Members" },
      // { id: "fuoye-alumni", label: "FUOYE Alumni" },
      // { id: "maxima-media-group", label: "Maxima Media Group" },
      // { id: "oyscatech-alumni", label: "OYSCATECH Alumni" },
      { id: "vendors", label: "Vendors" },
    ],
  },
};

// export const TOLU_MOYO_CONFIG;
