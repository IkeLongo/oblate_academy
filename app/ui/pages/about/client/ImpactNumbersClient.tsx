"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatItem = {
  target: number;
  suffix: string;
  label: string;
};

const STATS: StatItem[] = [
  { target: 500, suffix: "+", label: "Families Served" },
  { target: 200, suffix: "+", label: "Resources Available" },
  { target: 3, suffix: " yrs", label: "Years of Formation" },
];

function CountUpStat({ target, suffix, label, inView }: StatItem & { inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <span className="font-fredoka font-extrabold text-5xl sm:text-6xl text-white leading-none">
        {count}{suffix}
      </span>
      <span className="font-poppins font-medium text-sm uppercase tracking-widest text-blue-100">
        {label}
      </span>
    </div>
  );
}

export function ImpactNumbersClient() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
      {STATS.map((stat) => (
        <CountUpStat key={stat.label} {...stat} inView={inView} />
      ))}
    </div>
  );
}
