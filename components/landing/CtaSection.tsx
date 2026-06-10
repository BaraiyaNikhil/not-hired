"use client";

import Link from "next/link";
import { motion } from "motion/react";

const DUST = [
  { w: 4, top: "22%", left: "9%", dur: "3.1s", delay: "0s" },
  { w: 5, top: "68%", left: "89%", dur: "4.3s", delay: "1.2s" },
  { w: 3, top: "42%", left: "4%", dur: "3.6s", delay: "2.1s" },
  { w: 6, top: "28%", left: "93%", dur: "5s", delay: "0.6s", blur: true },
];

export function CtaSection() {
  return (
    <section id="cta" className="py-[90px]">
      <div className="max-w-[1080px] mx-auto px-6">
        <motion.div
          className="relative text-center overflow-hidden rounded-[8px] py-[76px] px-10"
          style={{
            backgroundColor: "#222d31",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            border: "11px solid #5a4b3c",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.5), 0 18px 55px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-36px" }}
          transition={{ duration: 0.65 }}
        >
          {/* Chalk dust */}
          {DUST.map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/18 pointer-events-none"
              style={{
                width: d.w,
                height: d.w,
                top: d.top,
                left: d.left,
                animation: `dust-pulse ${d.dur} ${d.delay} infinite`,
                filter: d.blur ? "blur(1px)" : undefined,
              }}
            />
          ))}

          <span
            className="block text-[10px] tracking-[0.22em] uppercase text-white/50 mb-[18px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Stop guessing. Start knowing.
          </span>

          <h2
            className="font-sketch font-bold text-white/90 mb-[18px]"
            style={{ fontSize: "clamp(30px, 5vw, 58px)", lineHeight: 1.15 }}
          >
            Your job search deserves
            <br />
            more than a{" "}
            <span className="text-white/50 line-through decoration-white/30">spreadsheet</span>.
          </h2>

          <p className="text-white/50 text-base mb-9" style={{ fontFamily: "var(--font-body)" }}>
            Start tracking. Get honest. Get hired.
          </p>

          <Link
            href="/applications"
            className="text-base font-medium text-white/90 px-[30px] py-[13px] border-2 border-dashed border-white/65 bg-white/4 hover:bg-white/13 hover:scale-[1.02] transition-all no-underline inline-block"
            style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
          >
            Start for free →
          </Link>

          <p
            className="text-[12px] text-white/50 mt-[14px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            No credit card. No account required to explore.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
