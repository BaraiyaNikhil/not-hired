"use client";

import { MARQUEE_ITEMS } from "@/data/landing/marquee.data";

export function MarqueeStrip() {
  const all = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden bg-white/3 border-t border-b border-white/22 py-[11px]">
      <div className="flex w-max" style={{ animation: "lp-marquee 30s linear infinite" }}>
        {all.map((item, i) => (
          <span
            key={i}
            className="text-[10px] tracking-[0.18em] uppercase text-white/50 whitespace-nowrap px-[30px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-yellow-300 mr-[4px]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
