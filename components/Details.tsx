import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";
import Reveal from "./Reveal";

const icons = {
  date: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  ),
  time: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  venue: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
};

export default function ToluMoyoDetails() {
  const { details } = TOLU_MOYO_CONFIG;

  const items = [
    { label: "Date", value: details.date, icon: icons.date },
    { label: "Time", value: details.time, icon: icons.time },
    { label: "Venue", value: details.venue, icon: icons.venue },
  ];

  return (
    <section
      id="details"
      className="section overflow-hidden bg-ivory text-ink"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-wine/6 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        {/* Header */}
        <Reveal className="text-center">
          <p className="eyebrow mb-5 text-wine">Save the Date</p>
          <h2 className="section-title">
            Wedding <em className="italic text-wine">Details</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-ink-muted sm:text-base sm:leading-8">
            With joyful hearts, we invite you to celebrate this beautiful
            beginning with us.
          </p>
        </Reveal>

        {/* Details list */}
        <Reveal delay={150} className="mt-12 sm:mt-14">
          <dl className="border-t border-line">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-5 border-b border-line py-6 sm:gap-6 sm:py-7"
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 text-wine">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <dt className="eyebrow text-[10px] text-wine/80">{item.label}</dt>
                  <dd className="mt-1.5 font-serif-display text-[1.45rem] leading-snug text-ink sm:text-[1.7rem]">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Dress code */}
          <div className="mt-10 flex items-start gap-5 rounded-2xl bg-champagne-tint px-6 py-6 ring-1 ring-gold/25 sm:gap-6 sm:px-7">
            <span aria-hidden="true" className="mt-1 flex shrink-0 -space-x-2">
              <span className="h-7 w-7 rounded-full bg-champagne ring-2 ring-champagne-tint shadow-[inset_0_0_0_1px_rgba(212,175,55,0.5)]" />
              <span className="h-7 w-7 rounded-full bg-wine ring-2 ring-champagne-tint" />
            </span>
            <div className="min-w-0">
              <p className="eyebrow text-[10px] text-wine/80">Dress Code</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink sm:text-base">
                {details.dressCode}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}