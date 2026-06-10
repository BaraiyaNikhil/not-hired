"use client";

interface InsightCardProps {
  color: string;
  sev: string;
  emoji: string;
  text: string;
  delay?: number;
}

export function InsightCard({ color, sev, emoji, text }: InsightCardProps) {
  return (
    <div
      className="rounded-[6px] p-[12px_14px] mb-[9px] flex gap-[10px] items-start bg-black/[0.28]"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <span className="text-[14px] shrink-0">{emoji}</span>
      <div>
        <div
          className="text-[9px] tracking-[0.14em] uppercase mb-[2px]"
          style={{ color, fontFamily: "var(--font-body)" }}
        >
          {sev}
        </div>
        <div
          className="text-[12px] text-white/80 leading-normal"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
