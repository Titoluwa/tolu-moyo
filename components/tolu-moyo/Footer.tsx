import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoFooter() {
  const { couple } = TOLU_MOYO_CONFIG;

  return (
    <footer className="py-9 px-6 bg-[#251e28] text-white/50 text-center text-xs tracking-wider border-t border-white/5">
      <p>
        Made with <span className="text-[#cea2fd]">💜</span> for{" "}
        <span className="font-semibold text-white/90">
          {couple.bride} &amp; {couple.groom}
        </span>{" "}
        — <span className="italic">{couple.hashtag}</span> ·{" "}
        {/* <a
          href="https://twitter.com/titoolu_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-[#cea2fd] transition-colors underline decoration-white/20 underline-offset-4"
        >
          Built by the Bride
        </a> */}
      </p>
    </footer>
  );
}
