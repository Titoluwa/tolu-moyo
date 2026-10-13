"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

const NAV_LINKS = [
  // { href: "#story", label: "Our Story" },
  { href: "#details", label: "Details" },
  // { href: "#schedule", label: "Schedule" },
  // { href: "#gallery", label: "Gallery" },
  { href: "#registry", label: "Registry" },
];

export default function ToluMoyoNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Solid bar whenever scrolled or the mobile menu is open, so the
  // drawer never floats beneath a transparent bar on top of the hero.
  const solid = scrolled || menuOpen;
  const { couple } = TOLU_MOYO_CONFIG;

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding,color] duration-500 ease-out px-5 sm:px-10 lg:px-14 flex items-center justify-between ${
        solid
          ? "bg-ivory/90 backdrop-blur-md text-ink py-2.5 shadow-[0_1px_0_rgba(47,42,36,0.06),0_10px_30px_-20px_rgba(47,42,36,0.25)]"
          : "bg-transparent text-white py-4 sm:py-5"
      }`}
    >
      <a
        href="#hero"
        aria-label={`${couple.shortName} — back to top`}
        className="relative block shrink-0"
        onClick={() => setMenuOpen(false)}
      >
        <span
          className={`relative block transition-all duration-500 ease-out ${
            solid ? "h-11 w-11 sm:h-12 sm:w-12" : "h-14 w-14 sm:h-15 sm:w-15"
          }`}
        >
          <Image
            src={couple.logo2}
            alt=""
            fill
            sizes="60px"
            preload
            className={`object-contain transition-opacity duration-500 ${
              solid ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src={couple.logo}
            alt=""
            fill
            sizes="60px"
            className={`object-contain transition-opacity duration-500 ${
              solid ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-9 text-[11px] font-semibold tracking-[0.24em] uppercase">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`link-underline transition-colors duration-300 ${
                solid ? "hover:text-wine" : "text-white/90 hover:text-gold-soft"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#rsvp"
            className={`btn min-h-0 px-6 py-2.5 ${
              solid
                ? "btn-wine"
                : "border border-gold-soft/60 text-champagne hover:bg-gold-soft hover:text-wine-dark"
            }`}
          >
            RSVP
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden -mr-2 flex h-11 w-11 items-center justify-center rounded-full"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className="relative block h-3 w-6" aria-hidden="true">
          <span
            className={`absolute left-0 h-px w-6 bg-current transition-transform duration-400 ease-out ${
              menuOpen ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-px bg-current transition-all duration-400 ease-out ${
              menuOpen ? "top-1/2 w-6 -rotate-45" : "top-full w-4"
            }`}
          />
        </span>
      </button>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden bg-ivory text-ink border-t border-line shadow-[0_24px_40px_-24px_rgba(47,42,36,0.35)] transition-[max-height,opacity] duration-500 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        inert={!menuOpen}
      >
        <div className="flex flex-col px-6 pt-3 pb-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-line-soft py-4 font-serif-display text-2xl text-ink transition-colors hover:text-wine"
            >
              {link.label}
              <span className="text-gold text-sm" aria-hidden="true">
                →
              </span>
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={() => setMenuOpen(false)}
            className="btn btn-wine mt-6 w-full"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </nav>
  );
}
