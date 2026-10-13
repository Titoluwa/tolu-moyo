"use client";

import { useState } from "react";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";
import Reveal from "./Reveal";

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
      className="section overflow-hidden text-center text-white"
      style={{
        background:
          "linear-gradient(140deg, #2D0C14 0%, #3D121B 45%, #1F070C 100%)",
      }}
    >
      {/* Decorative Radial Glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(212, 175, 55, 0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(114, 47, 55, 0.4) 0%, transparent 60%)",
        }}
      />

      {/* Hairline inset frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-gold-soft/10 sm:inset-6"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-2">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-soft">
            Don&apos;t Miss It
          </p>

          <h2 className="section-title text-white">
            Will You Join{" "}
            <em className="italic font-normal text-gold-soft">Us?</em>
          </h2>

          <div className="ornament my-7 text-gold-soft" aria-hidden="true">
            <span />
          </div>

          {/* Adults-only Notice: gracefully styled note */}
          <div className="mx-auto mb-10 max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-sm sm:p-6">
            <p className="eyebrow text-[10px] text-gold-soft">
              A Small Request
            </p>
            <p className="font-serif-display mt-2 text-sm italic leading-relaxed text-white/80 sm:text-[15px]">
              As much as we love your little ones, we have decided to keep our
              wedding celebrations as an adults-only event. We hope this gives
              you enough time to make arrangements, and we truly appreciate your
              understanding.
            </p>
            <p className="mt-2 text-xs tracking-wider uppercase text-white/50">
              We can&apos;t wait to celebrate with you.
            </p>
          </div>
        </Reveal>

        {submitted ? (
          <Reveal className="animate-fadeUp relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-gold-soft/30 bg-white/[0.08] p-8 text-center backdrop-blur-md sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-xl border border-gold-soft/15"
            />
            <div className="relative">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-soft/40 bg-gold-soft/15 text-gold-soft text-xl">
                {formData.attend === "no" ? "🤍" : "✓"}
              </span>

              <h3 className="font-serif-display mt-5 text-3xl font-normal italic text-white sm:text-4xl">
                {formData.attend === "no"
                  ? "Thank you for letting us know"
                  : "You're on the guest list"}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {formData.attend === "no"
                  ? "We'll miss you in Ile-Ife, but we deeply appreciate your love, blessings, and prayers."
                  : "We can't wait to celebrate this special day with you in Ile-Ife!"}
              </p>

              {formData.email && (
                <p className="mt-5 text-xs text-gold-soft/90">
                  A confirmation email has been sent to{" "}
                  <strong className="underline decoration-gold-soft/40 underline-offset-2">
                    {formData.email}
                  </strong>
                </p>
              )}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto flex max-w-xl flex-col gap-5 text-left"
            >
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/40 bg-red-950/60 p-4 text-center text-xs tracking-wide text-red-200"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rsvp-name" className="field-label">
                    Full Name <span className="req">*</span>
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
                    autoComplete="name"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-phone" className="field-label">
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
                    autoComplete="tel"
                    className="field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rsvp-email" className="field-label">
                    Email Address <span className="req">*</span>
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
                    autoComplete="email"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-attend" className="field-label">
                    Will You Attend? <span className="req">*</span>
                  </label>
                  <select
                    id="rsvp-attend"
                    required
                    value={formData.attend}
                    onChange={(e) =>
                      setFormData({ ...formData, attend: e.target.value })
                    }
                    className="field"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="yes">
                      Yes, I&apos;ll be there 🎉
                    </option>
                    <option value="maybe">
                      Maybe — still figuring it out
                    </option>
                    <option value="no">
                      Sorry, I can&apos;t make it
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rsvp-category" className="field-label">
                    Category <span className="req">*</span>
                  </label>
                  <select
                    id="rsvp-category"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="field"
                  >
                    <option value="" disabled>
                      Select your category
                    </option>
                    {rsvp.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="rsvp-plus-one" className="field-label">
                    Plus One?
                  </label>
                  <select
                    id="rsvp-plus-one"
                    value={formData.plusOne}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        plusOne: e.target.value,
                        plusOneName:
                          e.target.value === "no" ? "" : formData.plusOneName,
                      })
                    }
                    className="field"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              {formData.plusOne === "yes" && (
                <div className="animate-fadeIn">
                  <label htmlFor="rsvp-plus-one-name" className="field-label">
                    Name of Plus One <span className="req">*</span>
                  </label>
                  <input
                    id="rsvp-plus-one-name"
                    type="text"
                    required={formData.plusOne === "yes"}
                    value={formData.plusOneName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        plusOneName: e.target.value,
                      })
                    }
                    placeholder="Full name of your plus one"
                    className="field"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold mt-4 w-full"
              >
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    <span>Sending RSVP…</span>
                  </>
                ) : (
                  <>
                    <span>Send RSVP</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
          </Reveal>
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
