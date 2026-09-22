import Image from "next/image";
import Countdown from "./Countdown";
import { WEDDING_CONFIG } from "@/lib/wedding-data";

export default function Hero() {
  const { couple } = WEDDING_CONFIG;

  return (
    <section
      id="top"
      className="relative pt-16 md:pt-0 grid md:grid-cols-2 min-h-[92vh] md:min-h-screen"
    >
      <div className="order-2 md:order-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-14 md:py-0">
        <p
          className="hero-rise d1 text-xs font-semibold tracking-wide uppercase"
          style={{ color: "var(--sage-deep)" }}
        >
          {couple.familyAnnouncement}
        </p>

        <h1
          className="hero-rise d2 serif mt-4 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
          style={{ color: "var(--ink)" }}
        >
          {couple.bride}{" "}
          <span className="italic font-normal" style={{ color: "var(--blue)" }}>
            &amp;
          </span>
          <br />
          {couple.groom}
        </h1>

        <p className="hero-rise d3 mt-6 text-base sm:text-lg max-w-md text-[#1e1e24]/80">
          {couple.tagline}
        </p>

        <p
          className="hero-rise d3 mt-3 serif italic text-lg"
          style={{ color: "var(--lilac-deep)" }}
        >
          {couple.hashtag}
        </p>

        {/* Live Countdown */}
        <Countdown targetDate={couple.isoTargetDate} />

        <div className="hero-rise d4 mt-10">
          <a
            href="#rsvp"
            className="inline-block px-7 py-3.5 rounded-sm text-white font-semibold transition-opacity hover:opacity-95 shadow-sm"
            style={{ background: "var(--blue)" }}
          >
            RSVP Now
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2 relative min-h-[46vh] md:min-h-0 overflow-hidden">
        <Image
          src={couple.heroImage}
          alt={`${couple.bride} and ${couple.groom}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,30,36,0) 55%, rgba(30,30,36,.35) 100%)",
          }}
        />
      </div>
    </section>
  );
}
