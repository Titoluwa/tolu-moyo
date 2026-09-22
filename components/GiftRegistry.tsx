"use client";

import { useState } from "react";
import { WEDDING_CONFIG } from "@/lib/wedding-data";

interface BankCardProps {
  readonly accountName: string;
  readonly accountNumber: string;
  readonly bankName: string;
}

export function BankCard({
  accountName,
  accountNumber,
  bankName,
}: BankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="mt-10 max-w-sm rounded-sm p-7 text-white relative overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, var(--blue), var(--blue-deep))",
      }}
    >
      <div
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,.08)" }}
      />
      <p className="text-xs uppercase tracking-wider opacity-80 font-medium">
        Account Name
      </p>
      <p className="serif text-xl mt-0.5 font-medium">{accountName}</p>

      <p className="text-xs uppercase tracking-wider opacity-80 mt-5 font-medium">
        Account Number
      </p>
      <div className="flex items-center justify-between mt-0.5">
        <p className="text-2xl font-semibold tracking-wider font-mono">
          {accountNumber}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
          style={{
            background: copied
              ? "rgba(255,255,255,.35)"
              : "rgba(255,255,255,.18)",
          }}
          aria-label="Copy account number to clipboard"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <p className="text-xs uppercase tracking-wider opacity-80 mt-5 font-medium">
        Bank
      </p>
      <p className="text-sm mt-0.5">{bankName}</p>
    </div>
  );
}

export default function GiftRegistry() {
  const { bankDetails } = WEDDING_CONFIG;

  return (
    <section
      id="gifts"
      className="max-w-4xl mx-auto px-6 sm:px-10 py-24 md:py-32"
    >
      <h2
        className="serif text-4xl sm:text-5xl"
        style={{ color: "var(--ink)" }}
      >
        Gift Registry
      </h2>
      <p className="mt-4 max-w-lg opacity-80 text-sm leading-relaxed">
        Your presence is the gift we&apos;re most looking forward to. If you&apos;d
        like to bless us further, cash gifts are warmly welcome — see the details
        below.
      </p>

      <BankCard
        accountName={bankDetails.accountName}
        accountNumber={bankDetails.accountNumber}
        bankName={bankDetails.bankName}
      />
    </section>
  );
}
