"use client";

import { useState } from "react";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoRsvpSection() {
  const { rsvp } = TOLU_MOYO_CONFIG;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    attend: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attend || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await fetch(rsvp.appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or reach out to us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 px-6 text-white text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #283723 0%, #384b32 50%, #3e2a52 100%)",
      }}
    >
      {/* Decorative Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(206, 162, 253, 0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#cea2fd" }}
        >
          Don&apos;t Miss It
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-3">
          Will You Join <em className="italic font-normal">Us?</em>
        </h2>

        {/* Adults-only Notice */}
        <p className="font-serif-display italic text-sm sm:text-base text-white/75 max-w-md mx-auto mb-10 leading-relaxed">
          A Small Request 🤍
          <br />
          As much as we love your little ones, we have decided to keep our wedding
          celebrations as an adults-only event. We hope this gives you enough
          time to make arrangements, and we truly appreciate your
          understanding.
          <br />
          We can&apos;t wait to celebrate with you.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 text-center animate-fadeUp">
            <span className="text-4xl mb-3 inline-block">🎉</span>
            <h3 className="font-serif-display italic text-2xl sm:text-3xl text-white mb-2">
              You&apos;re on the list!
            </h3>
            <p className="text-sm text-white/75">
              We can&apos;t wait to celebrate with you in Ile-Ife!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left mb-8"
          >
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-xs text-red-200 text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#cea2fd] transition-all text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="rsvp-phone"
                  className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+234 000 000 0000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#cea2fd] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-email"
                className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="rsvp-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#cea2fd] transition-all text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-attend"
                className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
              >
                Will You Attend? *
              </label>
              <select
                id="rsvp-attend"
                required
                value={formData.attend}
                onChange={(e) =>
                  setFormData({ ...formData, attend: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#cea2fd] transition-all text-sm"
              >
                <option value="" disabled className="bg-[#283723] text-white">
                  Select an option
                </option>
                <option value="yes" className="bg-[#283723] text-white">
                  Yes, I&apos;ll be there 🎉
                </option>
                <option value="maybe" className="bg-[#283723] text-white">
                  Maybe — still figuring it out
                </option>
                <option value="no" className="bg-[#283723] text-white">
                  Sorry, I can&apos;t make it
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rsvp-category"
                className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
              >
                Category *
              </label>
              <select
                id="rsvp-category"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#cea2fd] transition-all text-sm"
              >
                <option value="" disabled className="bg-[#283723] text-white">
                  Select your category
                </option>
                {rsvp.categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-[#283723] text-white"
                  >
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200 mt-3 cursor-pointer"
              style={{
                background: "#cea2fd",
                color: "#251137",
                boxShadow: "0 8px 30px rgba(206, 162, 253, 0.4)",
              }}
            >
              {loading ? "Sending RSVP…" : "Send RSVP →"}
            </button>
          </form>
        )}

        {/* Asoebi Link */}
        <div className="flex justify-center mt-6">
          <a
            href={rsvp.asoEbiFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 hover:text-white hover:border-[#cea2fd] hover:bg-[#cea2fd]/10 transition-all duration-200"
          >
            Get Your Asoebi →
          </a>
        </div>
      </div>
    </section>
  );
}
