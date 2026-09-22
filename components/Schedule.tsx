"use client";

import { SCHEDULE_ITEMS, ScheduleItem } from "@/lib/wedding-data";

interface TimelineItemProps {
  readonly item: ScheduleItem;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const handleAddToCalendar = () => {
    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" +
      encodeURIComponent(item.calTitle) +
      "&dates=" +
      item.calStartUTC +
      "/" +
      item.calEndUTC +
      "&location=" +
      encodeURIComponent(item.location) +
      "&details=" +
      encodeURIComponent(`Join us! ${item.calTitle}`);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-10 items-start pl-8 md:pl-0">
      {/* Timeline Indicator Dot */}
      <div
        className="absolute -left-1.25 md:left-1/2 md:-translate-x-1/2 top-1.5 w-3 h-3 rounded-full ring-4 ring-(--lilac-tint)"
        style={{ background: item.themeColor }}
      />

      {/* Date & Title */}
      <div className="md:text-right md:pr-10">
        <p
          className="text-xs font-semibold tracking-wide"
          style={{ color: item.accentColor }}
        >
          {item.dateTime}
        </p>
        <h3 className="serif text-3xl mt-1 text-(--ink)">{item.title}</h3>
      </div>

      {/* Details & Action */}
      <div className="mt-3 md:mt-0 md:pl-10">
        <p className="text-sm opacity-80">{item.location}</p>
        <p className="text-sm opacity-80 mt-1">{item.attireNote}</p>

        {item.swatches && item.swatches.length > 0 && (
          <div className="flex gap-2 mt-3">
            {item.swatches.map((color) => (
              <span
                key={`${item.id}-${color}`}
                className="swatch w-8! h-8! border border-black/10"
                style={{ background: color }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCalendar}
          className="mt-4 text-xs font-semibold px-4 py-2 rounded-sm border transition-colors hover:bg-black/5 cursor-pointer"
          style={{
            borderColor: item.accentColor,
            color: item.accentColor,
          }}
        >
          Add to Google Calendar
        </button>
      </div>
    </div>
  );
}

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="py-24 md:py-32"
      style={{ background: "var(--lilac-tint)" }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <h2
          className="serif text-4xl sm:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          The Schedule
        </h2>
        <p className="mt-3 max-w-lg opacity-75">
          Two days, four moments — join us for as many as you can.
        </p>

        <div className="timeline-rail mt-16 space-y-16">
          {SCHEDULE_ITEMS.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
