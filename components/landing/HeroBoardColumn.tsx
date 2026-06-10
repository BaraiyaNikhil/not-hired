"use client";

import { motion } from "motion/react";
import type { BoardCard } from "@/data/landing/types";

interface HeroBoardCardProps {
  card: BoardCard;
}

export function HeroBoardCard({ card }: HeroBoardCardProps) {
  return (
    <div
      className="relative"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "2px dashed rgba(255,255,255,0.25)",
        borderRadius: "2px 6px 3px 5px",
        padding: "8px 10px 8px 14px",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.25)",
      }}
    >
      {/* Grip dots */}
      <div
        className="absolute left-[3px] top-1/2 -translate-y-1/2 opacity-20"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <svg width="6" height="16" viewBox="0 0 6 16" fill="currentColor">
          <circle cx="2" cy="2" r="1" />
          <circle cx="2" cy="6" r="1" />
          <circle cx="2" cy="10" r="1" />
          <circle cx="2" cy="14" r="1" />
        </svg>
      </div>

      <div className="font-sketch text-[11px] text-white/85 leading-tight truncate">{card.co}</div>
      <div
        className="text-[9px] text-white/50 mt-px truncate"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {card.role}
      </div>

      <div className="flex items-center gap-1.5 mt-1.5">
        <span
          className="text-[8px] px-1.5 py-px"
          style={{
            border: "1px dashed rgba(255,255,255,0.25)",
            borderRadius: "2px 4px 2px 4px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-body)",
          }}
        >
          {card.source}
        </span>
        <span
          className="text-[8px] text-white/25 ml-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {card.date}
        </span>
      </div>
    </div>
  );
}

interface HeroBoardColumnProps {
  id: string;
  label: string;
  emoji: string;
  bg: string;
  border: string;
  cards: BoardCard[];
  colIdx: number;
}

export function HeroBoardColumn({
  id,
  label,
  emoji,
  bg,
  border,
  cards,
  colIdx,
}: HeroBoardColumnProps) {
  return (
    <motion.div
      className="flex flex-col shrink-0 w-[155px] md:w-[162px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.85 + colIdx * 0.09, ease: "easeOut" }}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-1.5 mb-2 pb-1.5 px-1"
        style={{ borderBottom: "2px dashed rgba(255,255,255,0.15)" }}
      >
        <span className="text-[13px]">{emoji}</span>
        <span className="font-sketch chalk-text text-[12px] tracking-wide">{label}</span>
        <span
          className="ml-auto text-[10px]"
          style={{
            color: "rgba(255,255,255,0.35)",
            border: "1px dashed rgba(255,255,255,0.2)",
            borderRadius: "2px",
            padding: "0 4px",
            fontFamily: "var(--font-body)",
          }}
        >
          {cards.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        className="flex-1 flex flex-col gap-2 rounded-sm"
        style={{
          padding: "6px 4px",
          background: bg,
          border: `1px dashed ${border}`,
          borderRadius: "3px 6px 4px 5px",
          minHeight: 100,
        }}
      >
        {cards.map((card, cardIdx) => (
          <motion.div
            key={`${id}-${card.co}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.35,
              delay: 1 + colIdx * 0.09 + cardIdx * 0.07,
              ease: "easeOut",
            }}
          >
            <HeroBoardCard card={card} />
          </motion.div>
        ))}

        {cards.length === 0 && (
          <div className="flex items-center justify-center flex-1 min-h-[60px]">
            <span className="text-[9px] text-white/18" style={{ fontFamily: "var(--font-body)" }}>
              Drop here
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
