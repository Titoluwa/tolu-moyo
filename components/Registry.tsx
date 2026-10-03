"use client";

import { useState } from "react";
import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

type TabKey = "ngn" | "usd" | "gbp" | "eur" | "crypto";

export default function ToluMoyoRegistry() {
  const { registry } = TOLU_MOYO_CONFIG;
  const accounts = registry.accounts as Record<string, Record<string, string>>;
  const [activeTab, setActiveTab] = useState<TabKey>("ngn");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <section id="registry" className="py-24 px-6 bg-[#FAF9F6] text-[#2f2a24]">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#722F37" }}
        >
          Gift Registry
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-4">
          Send a <em className="italic" style={{ color: "#722F37" }}>Gift</em>
        </h2>

        {/* Gift Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #D4AF37)",
            }}
          />
          <span className="text-xl">🎁</span>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, #D4AF37)",
            }}
          />
        </div>

        <p className="font-serif-display italic text-base sm:text-lg text-[#675e54] max-w-lg mx-auto mb-10 leading-relaxed">
          {registry.intro}
        </p>

        {/* Currency Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {(
            [
              { key: "ngn", label: "🇳🇬 Naira" },
              { key: "usd", label: "🇳🇬 Naira" },
              // { key: "usd", label: "🇺🇸 Dollar" },
              // { key: "gbp", label: "🇬🇧 Pounds" },
              // { key: "eur", label: "🇪🇺 Euro" },
              // { key: "crypto", label: "₿ Crypto" },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "shadow-sm"
                    : "bg-[#FAF9F6] text-[#675e54] border border-[#ede9e1] hover:border-[#722F37]"
                }`}
                style={
                  isActive
                    ? {
                        background: "#722F37",
                        color: "#ffffff",
                        borderColor: "#722F37",
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="max-w-xl mx-auto text-left">
          {activeTab === "ngn" && (
            <div className="relative bg-[#FAF9F6] rounded-2xl p-7 sm:p-10 border border-[#ede9e1] shadow-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(to right, #722F37, #D4AF37)",
                }}
              />
              <h3 className="font-serif-display text-xl text-[#2f2a24] mb-6 flex items-center gap-2">
                <span>🏦</span> {accounts.ngn.bankName}
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Name
                  </span>
                  <span className="font-serif-display text-base text-[#2f2a24]">
                    {accounts.ngn.accountName}
                  </span>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Number
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-base font-semibold text-[#2f2a24]">
                      {accounts.ngn.accountNumber}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          accounts.ngn.accountNumber,
                          "ngn-acc"
                        )
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "ngn-acc" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "ngn-acc" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "ngn-acc" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "ngn-acc" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usd" && (
            <div className="relative bg-[#FAF9F6] rounded-2xl p-7 sm:p-10 border border-[#ede9e1] shadow-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(to right, #722F37, #D4AF37)",
                }}
              />
              <h3 className="font-serif-display text-xl text-[#2f2a24] mb-6 flex items-center gap-2">
                <span>🏦</span> {accounts.usd.bankName}
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Name
                  </span>
                  <span className="font-serif-display text-base text-[#2f2a24]">
                    {accounts.usd.accountName}
                  </span>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Number
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-base text-[#2f2a24]">
                      {accounts.usd.accountNumber}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          accounts.usd.accountNumber,
                          "usd-acc"
                        )
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "usd-acc" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "usd-acc" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "usd-acc" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "usd-acc" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Type
                  </span>
                  <span className="font-serif-display text-base text-[#2f2a24]">
                    {accounts.usd.accountType}
                  </span>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Routing Number
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-base text-[#2f2a24]">
                      {accounts.usd.routingNumber}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          accounts.usd.routingNumber,
                          "usd-route"
                        )
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "usd-route" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "usd-route" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "usd-route" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "usd-route" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-start py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Bank Address
                  </span>
                  <span className="text-xs text-[#675e54] text-right max-w-xs">
                    {accounts.usd.bankAddress}
                  </span>
                </div> */}
              </div>
            </div>
          )}

          {activeTab === "gbp" && (
            <div className="relative bg-[#FAF9F6] rounded-2xl p-7 sm:p-10 border border-[#ede9e1] shadow-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(to right, #722F37, #D4AF37)",
                }}
              />
              <h3 className="font-serif-display text-xl text-[#2f2a24] mb-6 flex items-center gap-2">
                <span>🏦</span> {accounts.gbp.bankName}
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Name
                  </span>
                  <span className="font-serif-display text-base text-[#2f2a24]">
                    {accounts.gbp.accountName}
                  </span>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Number
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-base text-[#2f2a24]">
                      {accounts.gbp.accountNumber}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          accounts.gbp.accountNumber,
                          "gbp-acc"
                        )
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "gbp-acc" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "gbp-acc" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "gbp-acc" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "gbp-acc" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Sort Code
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-base text-[#2f2a24]">
                      {accounts.gbp.sortCode}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          accounts.gbp.sortCode,
                          "gbp-sort"
                        )
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "gbp-sort" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "gbp-sort" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "gbp-sort" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "gbp-sort" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    IBAN
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-sm text-[#2f2a24]">
                      {accounts.gbp.iban}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(accounts.gbp.iban, "gbp-iban")
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "gbp-iban" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "gbp-iban" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "gbp-iban" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "gbp-iban" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-start py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Bank Address
                  </span>
                  <span className="text-xs text-[#675e54] text-right max-w-xs">
                    {accounts.gbp.bankAddress}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "eur" && (
            <div className="relative bg-[#FAF9F6] rounded-2xl p-7 sm:p-10 border border-[#ede9e1] shadow-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(to right, #722F37, #D4AF37)",
                }}
              />
              <h3 className="font-serif-display text-xl text-[#2f2a24] mb-6 flex items-center gap-2">
                <span>🏦</span> {accounts.eur.bankName}
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Account Name
                  </span>
                  <span className="font-serif-display text-base text-[#2f2a24]">
                    {accounts.eur.accountName}
                  </span>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    IBAN
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-sm text-[#2f2a24]">
                      {accounts.eur.iban}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(accounts.eur.iban, "eur-iban")
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "eur-iban" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "eur-iban" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "eur-iban" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "eur-iban" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-center py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    BIC / SWIFT
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-sm text-[#2f2a24]">
                      {accounts.eur.bic}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(accounts.eur.bic, "eur-bic")
                      }
                      className="px-3 py-1 rounded text-xs tracking-wider uppercase font-semibold border transition-all"
                      style={{
                        background:
                          copiedKey === "eur-bic" ? "#722F37" : "#ffffff",
                        color:
                          copiedKey === "eur-bic" ? "#ffffff" : "#722F37",
                        borderColor:
                          copiedKey === "eur-bic" ? "#722F37" : "#ede9e1",
                      }}
                    >
                      {copiedKey === "eur-bic" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#ede9e1]" />

                <div className="flex justify-between items-start py-1">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#722F37" }}
                  >
                    Bank Address
                  </span>
                  <span className="text-xs text-[#675e54] text-right max-w-xs">
                    {accounts.eur.bankAddress}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "crypto" && (
            <div className="relative bg-[#FAF9F6] rounded-2xl p-10 border border-[#ede9e1] shadow-sm text-center">
              <span className="text-4xl mb-4 inline-block">₿</span>
              <p className="font-serif-display italic text-lg text-[#675e54] mb-4 leading-relaxed">
                We accept crypto gifts!
                <br />
                Reach out to us directly and we&apos;ll send you our wallet
                address.
              </p>
            </div>
          )}
        </div>

        {/* Wishlist Link */}
        <div className="mt-12 text-center">
          <p className="font-serif-display italic text-[#675e54] mb-4">
            Love gifts?
          </p>
          <a
            href={registry.wishlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#722F37",
              color: "#F7E7CE",
              border: "1px solid rgba(212, 175, 55, 0.45)",
              boxShadow: "0 6px 20px rgba(114, 47, 55, 0.3)",
            }}
          >
            <span>🎁</span> View Our Registry
          </a>
        </div>
      </div>
    </section>
  );
}
