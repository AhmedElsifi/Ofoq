import { useEffect, useState } from "react";

// SVG circle circumference for the progress ring.
const CIRCUMFERENCE = 2 * Math.PI * 45;

// Animated circular progress indicator for today's completion.
export default function ReportProgressRing({ percent, statusMessage }) {
  const [count, setCount] = useState(0);

  // Animate the count from 0 to percent using requestAnimationFrame.
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(percent * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  const offset = CIRCUMFERENCE * (1 - count / 100);

  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-12">
      <div className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
        <svg
          className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="rgba(30, 41, 59, 0.6)"
            strokeWidth="12"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="#6366F1"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.9s ease-in-out",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl md:text-6xl font-bold text-primary">
            {count}%
          </span>
          <span className="text-xs text-text-muted tracking-widest mt-1">
            اكتمال اليوم
          </span>
        </div>
      </div>
      <div className="mt-8 text-center max-w-lg">
        <p className="text-lg text-text leading-relaxed">{statusMessage}</p>
      </div>
    </section>
  );
}
