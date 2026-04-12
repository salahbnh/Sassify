"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 99.99, decimals: 2, suffix: "%",   label: "Uptime SLA",          desc: "Guaranteed availability" },
  { value: 50,    decimals: 0, suffix: "ms",  label: "Avg response time",    desc: "Across all edge regions" },
  { value: 10,    decimals: 0, suffix: "M+",  label: "Requests per day",     desc: "Processed at peak load"  },
  { value: 4.9,   decimals: 1, suffix: "★",   label: "Developer rating",     desc: "From 2,400+ reviews"     },
];

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] rounded-full bg-primary opacity-5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-gradient mb-1">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="text-sm font-semibold text-foreground mb-1">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
