import ToluMoyoNavbar from "./Navbar";
import ToluMoyoHero from "./Hero";
// import ToluMoyoStory from "./Story";
import ToluMoyoDetails from "./Details";
// import ToluMoyoSchedule from "./Schedule";
// import ToluMoyoGallery from "./Gallery";
import ToluMoyoRegistry from "./Registry";
import ToluMoyoRsvpSection from "./RsvpSection";
import ToluMoyoFooter from "./Footer";

export default function ToluMoyoPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2f2a24] selection:bg-[#F7E7CE] selection:text-[#722F37]">
      <ToluMoyoNavbar />
      <ToluMoyoHero />
      {/* <ToluMoyoStory />  */}
      <ToluMoyoDetails />
      {/* <ToluMoyoSchedule /> */}
      {/* <ToluMoyoGallery /> */}
      <ToluMoyoRegistry />
      <ToluMoyoRsvpSection />
      <ToluMoyoFooter />
    </main>
  );
}
