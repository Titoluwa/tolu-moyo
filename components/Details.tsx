import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoDetails() {
  const { details } = TOLU_MOYO_CONFIG;

  const items = [
    { label: "Date", value: details.date, icon: "♡" },
    { label: "Time", value: details.time, icon: "◷" },
    { label: "Venue", value: details.venue, icon: "⌖" },
  ];

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24 text-[#2f2a24] sm:py-28"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#722F37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header — left aligned, editorial */}
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#722F37] sm:text-xs">
              Save the Date
            </p>
            <h2 className="font-serif-display text-4xl font-normal leading-[1.05] sm:text-5xl md:text-6xl">
              Wedding
              <br />
              <em className="italic text-[#722F37]">Details</em>
            </h2>
          </div>

          <div className="sm:pb-2">
            <p className="max-w-sm text-sm leading-7 text-[#756c62] sm:text-base">
              With joyful hearts, we invite you to celebrate this beautiful
              beginning with us.
            </p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-[#722F37] via-[#D4AF37]/60 to-transparent" />
          </div>
        </div>

        {/* Event name banner */}
        {/* <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#2f2a24] px-8 py-10 text-center sm:px-14 sm:py-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          <p className="relative mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#DFBA73]">
            You Are Invited To
          </p>
          <h3 className="relative font-serif-display text-3xl font-normal leading-tight text-[#FAF9F6] sm:text-4xl md:text-5xl">
            {details.eventName}
          </h3>
        </div> */}

        {/* Details — vertical list with connecting line */}
        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[#722F37] via-[#e5dfd6] to-[#D4AF37] sm:left-[31px]" />

          <div className="flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.label} className="relative flex items-start gap-6">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#e8e2d8] bg-white text-xl text-[#722F37] shadow-[0_8px_24px_rgba(47,42,36,0.06)]">
                  {item.icon}
                </div>
                <div className="flex-1 rounded-2xl border border-[#e8e2d8] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(47,42,36,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#722F37]">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-serif-display text-xl leading-relaxed text-[#2f2a24] sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dress code — full width strip */}
        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-dashed border-[#D4AF37]/50 px-6 py-7 text-center sm:flex-row sm:text-left">
          <span
            className="h-5 w-5 shrink-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #F7E7CE 50%, #722F37 50%)",
              boxShadow: "0 0 0 5px rgba(114, 47, 55, 0.12)",
            }}
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] px-2 py-1 w-32 text-center rounded-full bg-[#F7E7CE] text-[#722F37]">
              Dress Code
            </p>
            <p className="mt-1 text-sm font-medium sm:text-base text-[#722F37]">
              Champagne Gold & Wine
             {/*  <br />
              <span className="text-[#722F37]">English Wear or Traditional Outfit</span> */}
            </p>
          </div>
        </div>

        {/* Bottom ornament */}
        {/* <div className="mt-14 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#d8e3d1]" />
          <span className="text-xs text-[#722F37]">✦</span>
          <span className="h-px w-10 bg-[#d8e3d1]" />
        </div> */}
      </div>
    </section>
  );
}