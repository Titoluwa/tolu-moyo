import type { Metadata } from "next";
import ToluMoyoPage from "@/components/tolu-moyo/ToluMoyoPage";

export const metadata: Metadata = {
  title: "Tolu & Moyo — December 19, 2026 | #TM26 #MeetTheAdebanjo2026",
  description:
    "Join Tolu & Moyo as they celebrate their wedding in Ile-Ife, Osun State, Nigeria. RSVP, schedule, registry, and more.",
  openGraph: {
    title: "Tolu & Moyo — December 19, 2026 | #TM26 #MeetTheAdebanjo2026",
    description:
      "Join Tolu & Moyo as they celebrate their wedding in Ile-Ife, Osun State, Nigeria.",
    type: "website",
  },
};

export default function Page() {
  return <ToluMoyoPage />;
}
