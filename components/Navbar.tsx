"use client";

import { useEffect, useState } from "react";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-4.5 flex items-center justify-between ${
        scrolled
          ? "bg-[#FAF9F6]/95 shadow-sm backdrop-blur-md text-[#2f2a24]"
          : "bg-transparent text-white"
      }`}
    >
      <a
        href="#hero"
        className="font-serif-display text-xl sm:text-2xl tracking-wider font-semibold"
      >
        {scrolled
          ? <img src={TOLU_MOYO_CONFIG.couple.logo} className="w-15 h-15" />
          : <img src={TOLU_MOYO_CONFIG.couple.logo2} className="w-15 h-15" />
        }
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase">
        {/* <li>
          <a
            href="#story"
            className="transition-colors hover:text-[#D4AF37]"
          >
            Our Story
          </a>
        </li> */}
        <li>
          <a
            href="#details"
            className="transition-colors hover:text-[#D4AF37]"
          >
            Details
          </a>
        </li>
        {/* <li>
          <a
            href="#schedule"
            className="transition-colors hover:text-[#D4AF37]"
          >
            Schedule
          </a>
        </li> */}
        <li>
          <a
            href="#gallery"
            className="transition-colors hover:text-[#D4AF37]"
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            href="#registry"
            className="transition-colors hover:text-[#D4AF37]"
          >
            Registry
          </a>
        </li>
        <li>
          <a
            href="#rsvp"
            className="px-4 py-2 rounded-full font-bold transition-all shadow-sm hover:opacity-95"
            style={{
              background: "#722F37",
              color: "#F7E7CE",
              border: "1px solid rgba(212, 175, 55, 0.45)",
            }}
          >
            RSVP
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-sm focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
      </button>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF9F6] text-[#2f2a24] shadow-lg border-t border-[#ede9e1] py-5 px-6 flex flex-col gap-4 text-xs font-semibold tracking-widest uppercase">
          {/* <a
            href="#story"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-[#722F37]"
          >
            Our Story
          </a> */}
          <a
            href="#details"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-[#722F37]"
          >
            Details
          </a>
          {/* <a
            href="#schedule"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-[#722F37]"
          >
            Schedule
          </a> */}
          <a
            href="#gallery"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-[#722F37]"
          >
            Gallery
          </a>
          <a
            href="#registry"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-[#722F37]"
          >
            Registry
          </a>
          <a
            href="#rsvp"
            onClick={() => setMenuOpen(false)}
            className="py-2.5 text-center rounded-full font-bold mt-2"
            style={{
              background: "#722F37",
              color: "#F7E7CE",
              border: "1px solid rgba(212, 175, 55, 0.45)",
            }}
          >
            RSVP Now
          </a>
        </div>
      )}
    </nav>
  );
}
