import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Schedule from "@/components/Schedule";
import AsoEbi from "@/components/AsoEbi";
import Gallery from "@/components/Gallery";
import GiftRegistry from "@/components/GiftRegistry";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aderonke & Adediwura — #MeetTheAdebanjos",
  description:
    "Join Aderonke & Adediwura as they become the Adebanjos. RSVP, event schedule, aso-ebi details and more.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Story />
      <Schedule />
      <AsoEbi />
      <Gallery />
      <GiftRegistry />
      <RsvpForm />
      <Footer />
    </main>
  );
}
