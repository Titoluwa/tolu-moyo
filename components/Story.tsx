import Image from "next/image";
import { STORY_ITEMS, StoryItem } from "@/lib/wedding-data";

interface StoryCardProps {
  readonly item: StoryItem;
}

export function StoryCard({ item }: StoryCardProps) {
  return (
    <div className={item.offset ? "md:mt-14" : ""}>
      <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-black/5">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <h3
        className="serif text-2xl mt-5 font-medium"
        style={{ color: item.titleColor }}
      >
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">
        {item.description}
      </p>
    </div>
  );
}

export default function Story() {
  return (
    <section
      id="story"
      className="max-w-6xl mx-auto px-6 sm:px-10 py-24 md:py-32"
    >
      <h2 className="serif text-4xl sm:text-5xl" style={{ color: "var(--ink)" }}>
        Our Story
      </h2>
      <p className="mt-3 max-w-lg opacity-75">
        Three moments that brought us here.
      </p>

      <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8">
        {STORY_ITEMS.map((item) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
