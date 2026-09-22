"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface CountdownProps {
  readonly targetDate: string;
}

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function computeTimeLeft(targetDate: string): TimeRemaining {
  const targetTimestamp = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, targetTimestamp - now);

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(d).padStart(2, "0"),
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

const emptySubscribe = () => () => {};

export default function Countdown({ targetDate }: CountdownProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    computeTimeLeft(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isClient) {
    return (
      <div className="hero-rise d4 mt-10 flex gap-6 sm:gap-10">
        <div>
          <div className="num-cell text-3xl sm:text-4xl font-semibold text-(--blue)">
            --
          </div>
          <div className="text-xs mt-1 opacity-70">Days</div>
        </div>
        <div>
          <div className="num-cell text-3xl sm:text-4xl font-semibold text-(--blue)">
            --
          </div>
          <div className="text-xs mt-1 opacity-70">Hours</div>
        </div>
        <div>
          <div className="num-cell text-3xl sm:text-4xl font-semibold text-(--blue)">
            --
          </div>
          <div className="text-xs mt-1 opacity-70">Minutes</div>
        </div>
        <div>
          <div className="num-cell text-3xl sm:text-4xl font-semibold text-(--blue)">
            --
          </div>
          <div className="text-xs mt-1 opacity-70">Seconds</div>
        </div>
      </div>
    );
  }

  return (
    <div id="countdown" className="hero-rise d4 mt-10 flex gap-6 sm:gap-10">
      <div>
        <div
          id="cd-days"
          className="num-cell text-3xl sm:text-4xl font-semibold"
          style={{ color: "var(--blue)" }}
        >
          {timeLeft.days}
        </div>
        <div className="text-xs mt-1 opacity-70">Days</div>
      </div>
      <div>
        <div
          id="cd-hours"
          className="num-cell text-3xl sm:text-4xl font-semibold"
          style={{ color: "var(--blue)" }}
        >
          {timeLeft.hours}
        </div>
        <div className="text-xs mt-1 opacity-70">Hours</div>
      </div>
      <div>
        <div
          id="cd-mins"
          className="num-cell text-3xl sm:text-4xl font-semibold"
          style={{ color: "var(--blue)" }}
        >
          {timeLeft.minutes}
        </div>
        <div className="text-xs mt-1 opacity-70">Minutes</div>
      </div>
      <div>
        <div
          id="cd-secs"
          className="num-cell text-3xl sm:text-4xl font-semibold"
          style={{ color: "var(--blue)" }}
        >
          {timeLeft.seconds}
        </div>
        <div className="text-xs mt-1 opacity-70">Seconds</div>
      </div>
    </div>
  );
}
