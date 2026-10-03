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
    plusOne: "no",
    plusOneName: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.attend || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (formData.plusOne === "yes" && !formData.plusOneName.trim()) {
      setError("Please provide the name of your plus one.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedCat = rsvp.categories.find(
        (c) => c.id === formData.category
      );

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categoryLabel: selectedCat?.label || formData.category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit RSVP.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or reach out to us.";
      setError(message);
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
          "linear-gradient(135deg, #2D0C14 0%, #3D121B 50%, #1F070C 100%)",
      }}
    >
      {/* Decorative Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(212, 175, 55, 0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#DFBA73" }}
        >
          Don&apos;t Miss It
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-3">
          Will You Join <em className="italic font-normal text-[#DFBA73]">Us?</em>
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
            <span className="text-4xl mb-3 inline-block">
              {formData.attend === "no" ? "🤍" : "🎉"}
            </span>
            <h3 className="font-serif-display italic text-2xl sm:text-3xl text-white mb-2">
              {formData.attend === "no"
                ? "Thank you for letting us know!"
                : "You're on the list!"}
            </h3>
            <p className="text-sm text-white/75 mb-3">
              {formData.attend === "no"
                ? "We'll miss you in Ile-Ife, but we deeply appreciate your love and prayers."
                : "We can't wait to celebrate with you in Ile-Ife!"}
            </p>
            {formData.email && (
              <p className="text-xs text-[#DFBA73]/90">
                A confirmation email has been sent to <strong>{formData.email}</strong>.
              </p>
            )}
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rsvp-email"
                  className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
                >
                  <option value="" disabled className="bg-[#2D0C14] text-white">
                    Select an option
                  </option>
                  <option value="yes" className="bg-[#2D0C14] text-white">
                    Yes, I&apos;ll be there 🎉
                  </option>
                  <option value="maybe" className="bg-[#2D0C14] text-white">
                    Maybe — still figuring it out
                  </option>
                  <option value="no" className="bg-[#2D0C14] text-white">
                    Sorry, I can&apos;t make it
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
                >
                  <option value="" disabled className="bg-[#2D0C14] text-white">
                    Select your category
                  </option>
                  {rsvp.categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-[#2D0C14] text-white"
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="rsvp-plus-one"
                  className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
                >
                  Plus One?
                </label>
                <select
                  id="rsvp-plus-one"
                  value={formData.plusOne}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      plusOne: e.target.value,
                      plusOneName: e.target.value === "no" ? "" : formData.plusOneName,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
                >
                  <option value="no" className="bg-[#2D0C14] text-white">
                    No
                  </option>
                  <option value="yes" className="bg-[#2D0C14] text-white">
                    Yes
                  </option>
                </select>
              </div>
            </div>

            {formData.plusOne === "yes" && (
              <div className="animate-fadeIn">
                <label
                  htmlFor="rsvp-plus-one-name"
                  className="block text-[11px] font-semibold tracking-widest uppercase text-white/60 mb-1.5"
                >
                  Name of Plus One *
                </label>
                <input
                  id="rsvp-plus-one-name"
                  type="text"
                  required={formData.plusOne === "yes"}
                  value={formData.plusOneName}
                  onChange={(e) =>
                    setFormData({ ...formData, plusOneName: e.target.value })
                  }
                  placeholder="Full name of your plus one"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:border-[#DFBA73] transition-all text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200 mt-3 cursor-pointer disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #E5C378 0%, #D4AF37 100%)",
                color: "#2D0C14",
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.35)",
              }}
            >
              {loading ? "Sending RSVP…" : "Send RSVP →"}
            </button>
          </form>
        )}

        {/* Asoebi Link */}
        {/* <div className="flex justify-center mt-6">
          <a
            href={rsvp.asoEbiFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 hover:text-white hover:border-[#DFBA73] hover:bg-[#DFBA73]/10 transition-all duration-200"
          >
            Get Your Asoebi →
          </a>
        </div> */}
      </div>
    </section>
  );
}

