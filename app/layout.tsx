import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tolu & Moyo — December 19, 2026 | #TM26 #MeetTheAdebanjo2026",
  description:
    "Join Tolu & Moyo as they celebrate their wedding in Ile-Ife, Osun State, Nigeria. RSVP, schedule, registry, and more.",
  keywords: [
    "Tolu and Moyo",
    "Toluwani and Moyosore",
    "Adebanjo wedding",
    "TM26",
    "MeetTheAdebanjo2026",
    "Ile-Ife wedding",
  ],
  openGraph: {
    title: "Tolu & Moyo — December 19, 2026 | #TM26 #MeetTheAdebanjo2026",
    description:
      "Join Tolu & Moyo as they celebrate their wedding in Ile-Ife, Osun State, Nigeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
