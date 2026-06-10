"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InsightCard } from "./InsightCard";
import { HONESTY_TERMINAL_ROWS, HONESTY_INSIGHTS } from "@/data/landing/stats.data";

export function HonestySection() {
  return (
    <section id="honesty" className="py-[90px] bg-black/[0.14] border-t border-b border-white/22">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-[52px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-36px" }}
          transition={{ duration: 0.65 }}
        >
          <span
            className="block text-[10px] tracking-[0.22em] uppercase text-white/50 mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Brutal honesty, not polite guesses
          </span>
          <h2
            className="font-sketch font-bold text-white/90 mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
          >
            Put in your stats. Get back the truth.
          </h2>
          <p
            className="text-[15px] text-white/50 mt-2 max-w-[460px] mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            This is what NotHired tells you after 30 days of tracking. No sugarcoating.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] items-start">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-36px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="bg-black/35 border border-dashed border-white/22 rounded-[8px] overflow-hidden">
              <div className="bg-white/5 px-[14px] py-[10px] flex gap-[6px] items-center border-b border-white/22">
                <span className="w-[10px] h-[10px] rounded-full inline-block bg-red-400" />
                <span className="w-[10px] h-[10px] rounded-full inline-block bg-yellow-300" />
                <span className="w-[10px] h-[10px] rounded-full inline-block bg-green-400" />
                <span
                  className="text-[10px] text-white/50 ml-2 tracking-widest"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  your job search · 30 day snapshot
                </span>
              </div>
              <div className="p-[18px_20px] font-mono text-[12px] leading-[1.9]">
                {HONESTY_TERMINAL_ROWS.map(([lbl, val, color]) => (
                  <div key={lbl} className="text-white/50">
                    <span className="text-white/70">{lbl}</span>{" "}
                    <span style={color ? { color } : { color: "rgba(255,255,255,0.9)" }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p
              className="text-center mt-[10px] text-[11px] text-white/50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              ↓ NotHired analyzes this in real time
            </p>
          </motion.div>

          {/* Insights */}
          <div>
            {HONESTY_INSIGHTS.map((ins) => (
              <motion.div
                key={ins.sev}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-36px" }}
                transition={{ duration: 0.65, delay: ins.delay }}
              >
                <InsightCard {...ins} />
              </motion.div>
            ))}

            <motion.div
              className="mt-[22px]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ duration: 0.65, delay: 0.44 }}
            >
              <Link
                href="/insights"
                className="text-base font-medium text-white/90 px-[30px] py-[13px] border-2 border-dashed border-white/65 bg-white/4 hover:bg-white/13 hover:scale-[1.02] transition-all no-underline inline-block"
                style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
              >
                Analyze my job search →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
