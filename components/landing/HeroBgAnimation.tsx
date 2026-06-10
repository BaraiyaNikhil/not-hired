"use client";

import { motion } from "motion/react";
import {
  HERO_STAGES,
  HERO_FLOAT_CARDS,
  HERO_PULSE_DOTS,
  HERO_CHALK_DUST,
} from "@/data/landing/hero.data";

export function HeroBgAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ── Floating company cards ── */}
      {HERO_FLOAT_CARDS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-2 font-sketch text-[9px]"
          style={{
            top: c.top,
            left: c.left,
            background: c.color,
            border: `1px dashed ${c.color.replace(/[\d.]+\)$/, "0.5)")}`,
            borderRadius: "2px 6px 3px 5px",
            color: "rgba(255,255,255,0.4)",
          }}
          initial={{ opacity: 0, y: 0, rotate: -2 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: [0, -14, -14, 0],
            rotate: [-2, 1, 1, -1],
            x: [0, 8, 8, 0],
          }}
          transition={{
            duration: 6,
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
            times: [0, 0.15, 0.85, 1],
          }}
        >
          {c.company}
          <div
            className="text-[7px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          >
            {c.stage}
          </div>
        </motion.div>
      ))}

      {/* ── Pipeline stage labels ── */}
      {HERO_STAGES.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute bottom-[8%] font-sketch text-[9px] tracking-[0.14em] uppercase"
          style={{ left: s.x, color: s.color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.18, 0.18, 0] }}
          transition={{
            duration: 4,
            delay: i * 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          <span className="mr-1">{s.emoji}</span>
          {s.label}
        </motion.div>
      ))}

      {/* ── Dashed stage arrows ── */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`arrow-${i}`}
          className="absolute text-[13px] select-none"
          style={{
            bottom: "8.8%",
            left: `${15 + i * 16.5}%`,
            color: "rgba(255,255,255,0.12)",
          }}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: [0, 0.6, 0], x: [-6, 0, 6] }}
          transition={{
            duration: 2.5,
            delay: i * 0.5 + 0.3,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
        >
          →
        </motion.div>
      ))}

      {/* ── Pulse dots ── */}
      {HERO_PULSE_DOTS.map((d, i) => (
        <motion.span
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 5,
            top: d.top,
            left: d.left,
            backgroundColor: d.color,
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: [0, 0.55, 0.55, 0],
            scale: [1, 2, 1.2, 1],
          }}
          transition={{
            duration: 3,
            delay: d.delay,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Chalk dust particles ── */}
      {HERO_CHALK_DUST.map((d, i) => (
        <motion.span
          key={`dust-${i}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: d.w,
            height: d.w,
            top: d.top,
            left: d.left,
            filter: d.blur ? "blur(1px)" : undefined,
          }}
          initial={{ opacity: 0.08, scale: 1 }}
          animate={{ opacity: [0.08, 0.35, 0.08], scale: [1, 1.5, 1] }}
          transition={{
            duration: 3 + i * 0.3,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
