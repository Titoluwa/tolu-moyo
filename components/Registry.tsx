"use client";

import { useState } from "react";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";
import Reveal from "./Reveal";

type TabKey = "ngn" | "usd" | "gbp" | "eur" | "crypto";

const TABS: { key: TabKey; label: string }[] = [
  { key: "ngn", label: "🇳🇬 Naira" },
  // { key: "usd", label: "🇳🇬 Naira" },
  // { key: "usd", label: "🇺🇸 Dollar" },
  // { key: "gbp", label: "🇬🇧 Pounds" },
  // { key: "eur", label: "🇪🇺 Euro" },
  // { key: "crypto", label: "₿ Crypto" },
];

/** Account fields, in display order. Only fields present on an account render. */
const FIELDS: { key: string; label: string; copy?: boolean; muted?: boolean }[] = [
  { key: "accountName", label: "Account Name" },
  { key: "accountNumber", label: "Account Number", copy: true },
  { key: "accountType", label: "Account Type" },
  { key: "routingNumber", label: "Routing Number", copy: true },
  { key: "sortCode", label: "Sort Code", copy: true },
  { key: "iban", label: "IBAN", copy: true },
  { key: "bic", label: "BIC / SWIFT", copy: true },
  { key: "bankAddress", label: "Bank Address", muted: true },
];

export default function ToluMoyoRegistry() {
  const { registry } = TOLU_MOYO_CONFIG;
  const accounts = registry.accounts as Record<string, Record<string, string>>;
  const [activeTab, setActiveTab] = useState<TabKey>("ngn");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      })
      .catch(() => {
        /* Clipboard unavailable (e.g. insecure context) — the number stays selectable. */
      });
  };

  const account = activeTab !== "crypto" ? accounts[activeTab] : undefined;

  return (
    <section
      id="registry"
      className="section overflow-hidden bg-champagne-tint text-ink"
    >
      {/* Soft hairline where the section meets the one above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow mb-5 text-wine">Gift Registry</p>

          <h2 className="section-title">
            Send a <em className="italic text-wine">Gift</em>
          </h2>

          <div className="ornament my-8" aria-hidden="true">
            <span />
          </div>

          <p className="lede mx-auto max-w-xl text-ink-muted">
            {registry.intro}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          {/* Currency Tabs */}
          <div
            role="tablist"
            aria-label="Account details"
            className="mx-auto inline-flex max-w-full flex-wrap justify-center gap-1.5 rounded-full bg-white/70 p-1.5 ring-1 ring-line"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const bank = accounts[tab.key]?.bankName;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`registry-tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls="registry-panel"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-wine text-champagne shadow-[0_6px_18px_-8px_rgba(114,47,55,0.6)]"
                      : "text-ink-muted hover:text-wine"
                  }`}
                >
                  <span>{tab.label}</span>
                  {/* Both tabs are Naira, so the bank name tells them apart */}
                  {bank && (
                    <span
                      className={`hidden font-normal sm:inline ${
                        isActive ? "text-champagne/70" : "text-ink-muted/70"
                      }`}
                    >
                      · {bank}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Panel */}
          <div
            key={activeTab}
            id="registry-panel"
            role="tabpanel"
            aria-labelledby={`registry-tab-${activeTab}`}
            className="animate-fadeIn mx-auto mt-8 max-w-xl text-left"
          >
            {account && (
              <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 shadow-[0_24px_50px_-30px_rgba(74,21,33,0.35)] ring-1 ring-line sm:px-10 sm:py-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-xl border border-gold/20"
                />
                <p className="eyebrow relative text-[10px] text-gold">Bank</p>
                <h3 className="relative mt-1 font-serif-display text-2xl text-ink sm:text-[1.75rem]">
                  {account.bankName}
                </h3>

                <dl className="relative mt-6 border-t border-line-soft">
                  {FIELDS.filter((f) => account[f.key]).map((field) => {
                    const copyKey = `${activeTab}-${field.key}`;
                    const copied = copiedKey === copyKey;
                    const isNumber = field.key === "accountNumber";
                    let typographyClass = "font-serif-display text-lg text-ink";
                    if (field.muted) {
                      typographyClass = "text-sm leading-relaxed text-ink-muted";
                    } else if (isNumber) {
                      typographyClass = "num-cell font-serif-display text-2xl font-medium tracking-[0.06em] text-ink select-all";
                    }

                    return (
                      <div
                        key={field.key}
                        className="flex flex-col gap-1.5 border-b border-line-soft py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      >
                        <dt className="eyebrow shrink-0 text-[10px] text-wine/80">
                          {field.label}
                        </dt>
                        <dd className="flex min-w-0 items-center justify-between gap-4 sm:justify-end">
                          <span
                            className={`min-w-0 wrap-break-word sm:text-right ${typographyClass}`}
                          >
                            {account[field.key]}
                          </span>
                          {field.copy && (
                            <button
                              type="button"
                              onClick={() => handleCopy(account[field.key], copyKey)}
                              aria-label={`Copy ${field.label}`}
                              className={`inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[10px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                                copied
                                  ? "border-wine bg-wine text-champagne"
                                  : "border-line text-wine hover:border-wine/50 hover:bg-wine/5"
                              }`}
                            >
                              {copied ? (
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3 w-3" aria-hidden="true">
                                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-3 w-3" aria-hidden="true">
                                  <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
                                  <path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5H5" />
                                </svg>
                              )}
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}

            {activeTab === "crypto" && (
              <div className="relative rounded-2xl bg-white p-10 text-center shadow-[0_24px_50px_-30px_rgba(74,21,33,0.35)] ring-1 ring-line">
                <span className="mb-4 inline-block text-4xl">₿</span>
                <p className="font-serif-display mb-4 text-lg italic leading-relaxed text-ink-muted">
                  We accept crypto gifts!
                  <br />
                  Reach out to us directly and we&apos;ll send you our wallet
                  address.
                </p>
              </div>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            {copiedKey ? "Copied to clipboard" : ""}
          </p>
        </Reveal>

        {/* Wishlist Link */}
        <Reveal delay={150} className="mt-16 text-center">
          <p className="font-serif-display mb-5 text-lg italic text-ink-muted">
            Love gifts?
          </p>
          <a
            href={registry.wishlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wine"
          >
            View Our Registry
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-3 w-3" aria-hidden="true">
              <path d="M5 11l6-6M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
