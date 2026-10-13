"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

const emptySubscribe = () => () => {};

export default function ToluMoyoHero() {
  const { couple } = TOLU_MOYO_CONFIG;
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [timeLeft, setTimeLeft] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date(couple.isoTargetDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: "000",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(3, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [couple.isoTargetDate]);

  const units = [
    { label: "Days", value: mounted ? timeLeft.days : "000" },
    { label: "Hours", value: mounted ? timeLeft.hours : "00" },
    { label: "Minutes", value: mounted ? timeLeft.minutes : "00" },
    { label: "Seconds", value: mounted ? timeLeft.seconds : "00" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-28 pb-8 text-center text-white sm:pt-32"
    >
      {/* Background with Champagne Gold and Wine Atmosphere */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #2D0C14 0%, #1A070C 45%, #3B121A 100%)",
        }}
      />

      {/* Image Backdrop Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 mix-blend-overlay">
        <Image
          src={couple.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-drift object-cover object-[center_32%]"
        />
      </div>

      {/* Decorative Radial Glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 80% at 20% 60%, rgba(212, 175, 55, 0.18) 0%, transparent 70%), radial-gradient(ellipse 55% 65% at 80% 30%, rgba(114, 47, 55, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/30 via-black/5 to-black/60" />

      {/* Fine inset frame, like the border of a printed invitation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-0 rounded-[1.25rem] border border-gold-soft/15 sm:inset-5"
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
        <p className="hero-rise d1 eyebrow mb-6 text-gold-soft sm:mb-7">
          {couple.eyebrow}
        </p>

        <h1 className="hero-rise d2 font-serif-display font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(3.4rem,12vw,7.5rem)]">
          <span className="block">{couple.bride}</span>
          <span
            className="my-1 block font-normal italic leading-none text-gold-soft text-[0.5em] sm:my-2"
            aria-label="and"
          >
            &amp;
          </span>
          <span className="block">{couple.groom}</span>
        </h1>

        <p className="hero-rise d3 font-serif-display mt-6 text-xl italic text-white/85 sm:mt-8 sm:text-2xl">
          {couple.tagline}
        </p>

        {/* Date & Location Meta */}
        <div className="hero-rise d3 mt-7 flex flex-col items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white/80 sm:mt-8 sm:flex-row sm:gap-5 sm:text-xs">
          <span>{couple.weddingDateText}</span>
          <span aria-hidden="true" className="h-px w-6 bg-gold-soft/60 sm:hidden" />
          <span aria-hidden="true" className="hidden h-1.5 w-1.5 rotate-45 border border-gold-soft sm:block" />
          <span>{couple.locationText}</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-rise d4 mt-10 flex flex-wrap justify-center gap-4">
          <a href="#rsvp" className="btn btn-gold px-10">
            RSVP Now
          </a>
        </div>

        {/* Live Countdown */}
        <div
          role="timer"
          aria-label="Countdown to the wedding"
          className="hero-rise d5 mt-12 grid w-full max-w-md grid-cols-4 border-t border-white/12 pt-6 sm:mt-14 sm:max-w-lg sm:pt-7"
        >
          {units.map((unit, i) => (
            <div
              key={unit.label}
              className={`flex flex-col items-center ${
                i > 0 ? "border-l border-white/10" : ""
              }`}
            >
              <span className="num-cell font-serif-display text-[2rem] font-medium leading-none text-white sm:text-5xl">
                {unit.value}
              </span>
              <span className="mt-2 text-[9px] tracking-[0.3em] uppercase text-white/55 sm:text-[10px]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#details"
        className="hero-rise d5 relative z-10 mx-auto mt-10 flex flex-col items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-white/45 transition-colors hover:text-gold-soft"
      >
        Scroll
        <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/10">
          <span className="scroll-cue absolute inset-0 bg-gold-soft" />
        </span>
      </a>
    </section>
  );
}
