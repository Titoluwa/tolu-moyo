import Image from "next/image";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoFooter() {
  const { couple } = TOLU_MOYO_CONFIG;

  return (
    <footer className="relative overflow-hidden bg-[#1A070C] px-6 pt-16 pb-12 text-center text-white/70">
      {/* Decorative top hairline with subtle gold accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        {/* Monogram */}
        <div className="relative mb-5 h-12 w-12 opacity-85 transition-opacity hover:opacity-100">
          <Image
            src={couple.logo2}
            alt={`${couple.shortName} monogram`}
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        {/* Names */}
        <p className="font-serif-display text-2xl font-normal text-white sm:text-3xl">
          {couple.bride} <span className="text-gold-soft">&amp;</span> {couple.groom}
        </p>

        <p className="mt-2 text-[11px] tracking-[0.3em] uppercase text-white/60">
          {couple.weddingDateText} · {couple.locationText}
        </p>

        <div className="my-6 h-px w-16 bg-white/10" aria-hidden="true" />

        <p className="text-xs tracking-wider text-white/50">
          Made with <span className="text-gold-soft">💛</span> for{" "}
          <span className="font-medium text-white/90">
            {couple.bride} &amp; {couple.groom}
          </span>{" "}
          — <span className="italic text-gold-soft/90">{couple.hashtag}</span>
        </p>
      </div>
    </footer>
  );
}
