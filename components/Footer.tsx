import { WEDDING_CONFIG } from "@/lib/wedding-data";

export default function Footer() {
  const { couple } = WEDDING_CONFIG;

  return (
    <footer className="py-14 text-center border-t border-black/5 bg-(--cream)">
      <p className="serif text-2xl font-medium" style={{ color: "var(--ink)" }}>
        {couple.bride} &amp; {couple.groom}
      </p>
      <p className="mt-2 text-sm opacity-60 px-4">
        {couple.subHashtags.join("  ·  ")}
      </p>
      <p className="mt-6 text-xs opacity-40">
        {couple.dateDisplay} · {couple.locationDisplay}
      </p>
    </footer>
  );
}
