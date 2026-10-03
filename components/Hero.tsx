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
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 text-center text-white"
    >
      {/* Background with Champagne Gold and Wine Atmosphere */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #2D0C14 0%, #1A070C 45%, #3B121A 100%)",
        }}
      />

      {/* Decorative Radial Glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 80% at 20% 60%, rgba(212, 175, 55, 0.22) 0%, transparent 70%), radial-gradient(ellipse 55% 65% at 80% 30%, rgba(114, 47, 55, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Image Backdrop Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <Image
          src={couple.heroImage}
          alt={`${couple.bride} & ${couple.groom}`}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/25 via-black/10 to-black/55" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <p
          className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase mb-4"
          style={{ color: "#DFBA73" }}
        >
          {couple.eyebrow}
        </p>

        <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight mb-3">
          {couple.bride}{" "}
          <span
            className="italic font-normal text-[0.85em]"
            style={{ color: "#DFBA73" }}
          >
            <br />
            &amp;
            <br />
          </span>{" "}
          {couple.groom}
        </h1>

        <p className="font-serif-display italic text-xl sm:text-2xl text-white/85 mb-6">
          {couple.tagline}
        </p>

        {/* Date & Location Meta */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm tracking-widest uppercase text-white/80 mb-9">
          <span>{couple.weddingDateText}</span>
          <span style={{ color: "#DFBA73" }}>◆</span>
          <span>📍 {couple.locationText}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="#rsvp"
            className="px-9 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #E5C378 0%, #D4AF37 100%)",
              color: "#2D0C14",
              boxShadow: "0 6px 24px rgba(212, 175, 55, 0.35)",
            }}
          >
            RSVP Now
          </a>
          {/* <a
            href="#story"
            className="px-9 py-3.5 rounded-full text-xs tracking-widest uppercase transition-all duration-200 border border-white/50 hover:bg-white/10 hover:border-white text-white hover:-translate-y-0.5"
          >
            Our Story
          </a> */}
        </div>

        {/* Live Countdown */}
        <div className="flex items-center gap-4 sm:gap-7 pt-4 border-t border-white/15">
          <div className="flex flex-col items-center">
            <span className="font-serif-display text-3xl sm:text-5xl font-medium leading-none text-white">
              {mounted ? timeLeft.days : "000"}
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mt-1">
              Days
            </span>
          </div>

          <span className="font-serif-display text-2xl sm:text-3xl text-[#DFBA73] pb-3">
            :
          </span>

          <div className="flex flex-col items-center">
            <span className="font-serif-display text-3xl sm:text-5xl font-medium leading-none text-white">
              {mounted ? timeLeft.hours : "00"}
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mt-1">
              Hours
            </span>
          </div>

          <span className="font-serif-display text-2xl sm:text-3xl text-[#DFBA73] pb-3">
            :
          </span>

          <div className="flex flex-col items-center">
            <span className="font-serif-display text-3xl sm:text-5xl font-medium leading-none text-white">
              {mounted ? timeLeft.minutes : "00"}
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mt-1">
              Minutes
            </span>
          </div>

          <span className="font-serif-display text-2xl sm:text-3xl text-[#DFBA73] pb-3">
            :
          </span>

          <div className="flex flex-col items-center">
            <span className="font-serif-display text-3xl sm:text-5xl font-medium leading-none text-white">
              {mounted ? timeLeft.seconds : "00"}
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mt-1">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
