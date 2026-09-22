import { PALETTE_ITEMS, PaletteItem, WEDDING_CONFIG } from "@/lib/wedding-data";

interface PaletteCardProps {
  readonly item: PaletteItem;
}

export function PaletteCard({ item }: PaletteCardProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5">
        {item.swatches.map((colorHex) => (
          <span
            key={`${item.id}-${colorHex}`}
            className="swatch shadow-xs"
            style={{ background: colorHex }}
          />
        ))}
      </div>
      <h3 className="serif text-2xl mt-4 font-medium">{item.title}</h3>
      <p className="text-sm opacity-80 mt-1">{item.description}</p>
    </div>
  );
}

export default function AsoEbi() {
  const { asoEbiCoordinator } = WEDDING_CONFIG;

  return (
    <section
      id="aso-ebi"
      className="max-w-6xl mx-auto px-6 sm:px-10 py-24 md:py-32"
    >
      <h2
        className="serif text-4xl sm:text-5xl"
        style={{ color: "var(--ink)" }}
      >
        Aso-Ebi &amp; Dress Code
      </h2>
      <p className="mt-3 max-w-lg opacity-75">
        Wear the colour of the family you&apos;re standing with — or the blue if
        you&apos;re standing with us both.
      </p>

      <div className="mt-16 grid md:grid-cols-3 gap-10">
        {PALETTE_ITEMS.map((item) => (
          <PaletteCard key={item.id} item={item} />
        ))}
      </div>

      {/* Package & Coordinator Banner */}
      <div
        className="mt-14 p-6 sm:p-8 rounded-sm border border-black/5"
        style={{ background: "var(--sage-tint)" }}
      >
        <h3 className="serif text-xl font-semibold">
          {asoEbiCoordinator.title}
        </h3>
        <p className="text-sm mt-2 opacity-80">
          {asoEbiCoordinator.description}
        </p>
        <p className="text-sm mt-3 font-semibold">
          <a
            href={asoEbiCoordinator.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:underline text-(--sage-deep)"
          >
            <span>💬</span>
            <span>{asoEbiCoordinator.contact}</span>
          </a>
        </p>
      </div>
    </section>
  );
}
