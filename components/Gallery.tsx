"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, GalleryItem } from "@/lib/wedding-data";

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeImage]);

  return (
    <section
      id="gallery"
      className="py-24 md:py-32"
      style={{ background: "var(--ink)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <h2 className="serif text-4xl sm:text-5xl text-white font-medium">
          Pre-Wedding Gallery
        </h2>
        <p className="mt-3 max-w-lg text-white/60">
          A few of our favourites from the shoot.
        </p>

        <div className="masonry mt-14">
          {GALLERY_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="w-full text-left cursor-pointer group overflow-hidden rounded-sm relative block p-0 bg-transparent border-0"
              aria-label={`View full photo: ${item.alt}`}
            >
              <div className="relative w-full aspect-4/5 sm:aspect-auto">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  width={700}
                  height={875}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full rounded-sm object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xs transition-opacity">
                    View Photo
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Dialog */}
      {activeImage && (
        <dialog
          open
          aria-label="Photo Preview"
          className="fixed inset-0 z-50 m-0 h-screen w-screen max-h-none max-w-none border-0 bg-black/90 p-4 flex items-center justify-center backdrop-blur-xs"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="self-end mb-3 text-white/80 hover:text-white text-sm font-semibold flex items-center gap-1.5 py-1.5 px-3 rounded-sm bg-white/10 cursor-pointer"
              aria-label="Close image preview"
            >
              ✕ Close
            </button>
            <div className="relative w-full h-[75vh] rounded-sm overflow-hidden">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm text-center">
              {activeImage.alt}
            </p>
          </div>
        </dialog>
      )}
    </section>
  );
}
