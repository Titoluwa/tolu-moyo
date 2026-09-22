"use client";

import { useState } from "react";
import { WEDDING_CONFIG } from "@/lib/wedding-data";

interface FormDataState {
  fullName: string;
  whatsapp: string;
  email: string;
  attending: string;
  plusOnes: string;
  plusOneName1: string;
  plusOneName2: string;
  meal: string;
  songRequest: string;
  message: string;
}

const initialFormData: FormDataState = {
  fullName: "",
  whatsapp: "",
  email: "",
  attending: "",
  plusOnes: "0",
  plusOneName1: "",
  plusOneName2: "",
  meal: "",
  songRequest: "",
  message: "",
};

export default function RsvpForm() {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const plusOnesCount = Number.parseInt(formData.plusOnes, 10) || 0;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setHasError(false);

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      attending: formData.attending,
      plusOnes: formData.plusOnes,
      plusOneName1: formData.plusOneName1.trim(),
      plusOneName2: formData.plusOneName2.trim(),
      meal: formData.meal,
      songRequest: formData.songRequest.trim(),
      message: formData.message.trim(),
    };

    try {
      await fetch(WEDDING_CONFIG.googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setFormData(initialFormData);
      setIsSuccessModalOpen(true);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="py-24 md:py-32"
      style={{ background: "var(--lilac-tint)" }}
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-10">
        <h2
          className="serif text-4xl sm:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          RSVP
        </h2>
        <p className="mt-3 opacity-75">
          Kindly reply by 20 November 2026 so we can plan properly.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold mb-1.5"
            >
              Full Name
            </label>
            <input
              required
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-semibold mb-1.5"
              >
                WhatsApp Number
              </label>
              <input
                required
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="+234 8xx xxx xxxx"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1.5"
              >
                Email Address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="attending"
              className="block text-sm font-semibold mb-1.5"
            >
              Attending
            </label>
            <select
              required
              id="attending"
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            >
              <option value="">Select an option</option>
              <option value="Traditional Wedding">Traditional Wedding</option>
              <option value="White Wedding">White Wedding</option>
              <option value="Both Events">Both Events</option>
              <option value="Regretfully Decline">Regretfully Decline</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="plusOnes"
              className="block text-sm font-semibold mb-1.5"
            >
              Plus-One Count
            </label>
            <select
              id="plusOnes"
              name="plusOnes"
              value={formData.plusOnes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>

          {/* Conditional Plus-One Inputs */}
          {plusOnesCount >= 1 && (
            <div className="space-y-4 pt-1">
              <div>
                <label
                  htmlFor="plusOneName1"
                  className="block text-sm font-semibold mb-1.5"
                >
                  Plus-One Name
                </label>
                <input
                  required
                  id="plusOneName1"
                  name="plusOneName1"
                  type="text"
                  value={formData.plusOneName1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
                />
              </div>

              {plusOnesCount >= 2 && (
                <div>
                  <label
                    htmlFor="plusOneName2"
                    className="block text-sm font-semibold mb-1.5"
                  >
                    Second Plus-One Name
                  </label>
                  <input
                    required
                    id="plusOneName2"
                    name="plusOneName2"
                    type="text"
                    value={formData.plusOneName2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label htmlFor="meal" className="block text-sm font-semibold mb-1.5">
              Meal Preference
            </label>
            <select
              required
              id="meal"
              name="meal"
              value={formData.meal}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            >
              <option value="">Select an option</option>
              <option value="Jollof & Small Chops">Jollof &amp; Small Chops</option>
              <option value="Ofada Special">Ofada Special</option>
              <option value="Pounded Yam & Egusi">Pounded Yam &amp; Egusi</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="songRequest"
              className="block text-sm font-semibold mb-1.5"
            >
              DJ Song Request
            </label>
            <input
              id="songRequest"
              name="songRequest"
              type="text"
              placeholder="What will get you on the dance floor?"
              value={formData.songRequest}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1.5"
            >
              Message / Prayers for Aderonke &amp; Adediwura
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm border border-stone-300 bg-white focus:outline-(--blue)"
            />
          </div>

          <button
            id="submitBtn"
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm text-white font-semibold transition-opacity disabled:opacity-60 cursor-pointer"
            style={{ background: "var(--blue)" }}
          >
            {isSubmitting && (
              <svg
                id="spinner"
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            <span id="submitLabel">
              {isSubmitting ? "Sending…" : "Send RSVP"}
            </span>
          </button>

          {hasError && (
            <p id="formError" className="text-sm" style={{ color: "#b34747" }}>
              Something went wrong — please try again, or reach us on WhatsApp.
            </p>
          )}
        </form>
      </div>

      {/* Accessible Success Dialog */}
      {isSuccessModalOpen && (
        <dialog
          open
          aria-label="RSVP Received Confirmation"
          className="fixed inset-0 z-50 m-0 h-screen w-screen max-h-none max-w-none border-0 bg-black/60 p-6 flex items-center justify-center backdrop-blur-xs"
        >
          <div className="modal-enter bg-white rounded-sm max-w-sm w-full p-8 text-center shadow-xl">
            <div
              className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--sage-tint)" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--sage-deep)"
                strokeWidth="2.5"
              >
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="serif text-2xl mt-5 font-medium">Thank you!</h3>
            <p className="text-sm mt-2 opacity-75">
              Your RSVP has been received. We can&apos;t wait to celebrate with you.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-6 px-6 py-2.5 rounded-sm text-white font-semibold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--blue)" }}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </section>
  );
}
