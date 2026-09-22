import { TOLU_MOYO_CONFIG } from "@/lib/tolu-moyo-data";

export default function ToluMoyoSchedule() {
  const { schedule } = TOLU_MOYO_CONFIG;

  return (
    <section id="schedule" className="py-24 px-6 bg-white text-[#2f2a24]">
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
          style={{ color: "#cea2fd" }}
        >
          The Big Day
        </p>

        <h2 className="font-serif-display text-4xl sm:text-5xl font-normal mb-4">
          Wedding <em className="italic" style={{ color: "#587b46" }}>Schedule</em>
        </h2>

        {/* Dove Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #b9d1aa)",
            }}
          />
          <span className="text-xl">🕊</span>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, #b9d1aa)",
            }}
          />
        </div>

        {/* Timeline */}
        <div className="relative max-w-md mx-auto text-left mt-12 pl-4 sm:pl-0">
          {/* Vertical Rail */}
          <div
            className="absolute left-24 top-2 bottom-4 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, #87AE73, #cea2fd, transparent)",
            }}
          />

          <div className="flex flex-col gap-9">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 sm:gap-7"
              >
                {/* Time */}
                <div
                  className="font-serif-display text-sm sm:text-base font-semibold min-w-[75px] sm:min-w-[90px] text-right pt-0.5"
                  style={{ color: "#587b46" }}
                >
                  {item.time}
                </div>

                {/* Dot */}
                <div className="relative flex items-center justify-center pt-1.5 flex-shrink-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                    style={{
                      background: "#87AE73",
                      boxShadow: "0 0 0 2px #cea2fd",
                    }}
                  />
                </div>

                {/* Event Name */}
                <div className="flex-1 pt-0.5">
                  <h4 className="font-serif-display text-lg sm:text-xl font-normal text-[#2f2a24]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
