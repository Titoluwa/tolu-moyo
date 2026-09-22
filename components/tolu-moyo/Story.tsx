import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoStory() {
  const { story } = TOLU_MOYO_CONFIG;

  return (
    <section id="story" className="py-24 px-6 bg-white text-[#2f2a24]">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#cea2fd" }}
        >
          The Beginning
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-4 text-[#2f2a24]">
          How We <em className="italic" style={{ color: "#587b46" }}>Met</em>
        </h2>

        {/* Botanical Leaf Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #b9d1aa)",
            }}
          />
          <span className="text-xl" style={{ color: "#87AE73" }}>
            🌿
          </span>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, #b9d1aa)",
            }}
          />
        </div>

        {/* Poem */}
        <div className="font-serif-display italic text-lg sm:text-xl leading-relaxed sm:leading-loose text-[#675e54] max-w-xl mx-auto mb-12">
          {story.poem.map((line, idx) =>
            line === "" ? (
              <div key={idx} className="h-4" />
            ) : (
              <p key={idx}>{line}</p>
            )
          )}
        </div>

        {/* Short Highlight Card */}
        <div
          className="p-7 sm:p-9 rounded-r-2xl max-w-xl mx-auto text-left shadow-sm border-l-4"
          style={{
            background: "#FAF9F6",
            borderLeftColor: "#87AE73",
          }}
        >
          <p className="font-serif-display italic text-base sm:text-lg leading-relaxed text-[#675e54]">
            {story.highlight}
          </p>
        </div>
      </div>
    </section>
  );
}
