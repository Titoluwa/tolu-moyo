"use client";

import { useState } from "react";
import Link from "next/link";
import { WEDDING_CONFIG } from "@/lib/wedding-data";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#story", label: "Our Story" },
    { href: "#schedule", label: "Schedule" },
    { href: "#aso-ebi", label: "Aso-Ebi" },
    { href: "#gallery", label: "Gallery" },
    { href: "#gifts", label: "Gifts" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#fafaf9]/90 backdrop-blur border-b border-black/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="#top"
          className="serif text-lg tracking-tight font-medium"
          style={{ color: "var(--ink)" }}
        >
          {WEDDING_CONFIG.couple.shortName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-(--blue) transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#rsvp"
            className="text-sm font-semibold px-4 py-2 rounded-sm text-white transition-opacity hover:opacity-95"
            style={{ background: "var(--blue)" }}
          >
            RSVP
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black/70 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fafaf9] border-b border-black/10 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-(--blue) transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
