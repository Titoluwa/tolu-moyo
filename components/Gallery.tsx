import Image from "next/image";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoGallery() {
  const { gallery } = TOLU_MOYO_CONFIG;

  return (
    <section id="gallery" className="py-24 px-6  bg-white text-[#2f2a24]">
      <div className="max-w-7xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#722F37" }}
        >
          Captured Moments
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-4">
          Our <em className="italic" style={{ color: "#722F37" }}>Gallery</em>
        </h2>

        {/* Camera Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #D4AF37)",
            }}
          />
          <span className="text-xl">📸</span>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, #D4AF37)",
            }}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
          {gallery.map((photo) => (
            <div
              key={photo.url}
              className="group relative aspect-4/5 rounded-2xl overflow-hidden shadow-sm bg-[#ede9e1] border border-[#ede9e1]/80"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-xs tracking-widest uppercase text-white font-medium">
                  {photo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
