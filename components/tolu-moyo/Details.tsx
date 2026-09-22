import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoDetails() {
  const { details } = TOLU_MOYO_CONFIG;

  return (
    <section id="details" className="py-24 px-6 bg-[#FAF9F6] text-[#2f2a24]">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#cea2fd" }}
        >
          Save the Date
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-4">
          Wedding <em className="italic" style={{ color: "#587b46" }}>Details</em>
        </h2>

        {/* Ring Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #b9d1aa)",
            }}
          />
          <span className="text-xl">💍</span>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, #b9d1aa)",
            }}
          />
        </div>

        {/* Card */}
        <div className="relative bg-white rounded-2xl p-8 sm:p-14 shadow-sm border border-[#ede9e1] max-w-xl mx-auto overflow-hidden">
          {/* Top Sage to Lilac Gradient Stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background: "linear-gradient(to right, #87AE73, #cea2fd)",
            }}
          />

          <h3 className="font-serif-display text-2xl sm:text-3xl font-normal mb-8">
            {details.eventName}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#ede9e1]">
            <div>
              <p
                className="text-[11px] tracking-widest uppercase font-semibold mb-1"
                style={{ color: "#cea2fd" }}
              >
                Date
              </p>
              <p className="font-serif-display text-lg text-[#2f2a24]">
                {details.date}
              </p>
            </div>

            <div>
              <p
                className="text-[11px] tracking-widest uppercase font-semibold mb-1"
                style={{ color: "#cea2fd" }}
              >
                Time
              </p>
              <p className="font-serif-display text-lg text-[#2f2a24]">
                {details.time}
              </p>
            </div>

            <div>
              <p
                className="text-[11px] tracking-widest uppercase font-semibold mb-1"
                style={{ color: "#cea2fd" }}
              >
                Venue
              </p>
              <p className="font-serif-display text-lg text-[#2f2a24]">
                {details.venue}
              </p>
            </div>
          </div>

          {/* Dress Code Badge */}
          <div className="inline-flex items-center gap-3 bg-[#FAF9F6] px-5 py-3 rounded-full text-xs sm:text-sm text-[#675e54] border border-[#ede9e1]">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0"
              style={{
                background: "linear-gradient(135deg, #87AE73 50%, #cea2fd 50%)",
                boxShadow: "0 0 0 3px rgba(206, 162, 253, 0.25)",
              }}
            />
            <strong>
              Dress Code: English Wear or Traditional outfit{" "}
              {/* <br /> */}
              {/* <strong className="text-[#2f2a24]">Sage &amp; Lilac Theme</strong> */}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
