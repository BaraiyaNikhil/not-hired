"use client";

import { motion } from "motion/react";
import { HOW_STEPS, UPCOMING_FEATURES } from "@/data/landing/stats.data";
import Image from "next/image";

export function StatsAndStepsSection() {
  return (
    <>
      {/* How it works */}
      <section id="how" className="py-[90px]">
        <div className="max-w-[1080px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-36px" }}
            transition={{ duration: 0.65 }}
          >
            <h2
              className="font-sketch font-bold text-white/90"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
            >
              How it works
            </h2>
          </motion.div>

          {/* Steps — use a wrapper with relative + a pseudo-line via absolute div */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Dashed connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-[34px] h-0 border-t-2 border-dashed border-white/18"
              style={{ left: "calc(16.67% + 20px)", right: "calc(16.67% + 20px)" }}
            />
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                className="px-7 text-center"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-36px" }}
                transition={{ duration: 0.65, delay: i * 0.11 }}
              >
                <div className="font-sketch font-bold text-[60px] leading-none text-white/50 mb-4 relative z-1">
                  {s.num}
                </div>
                <div className="font-sketch text-[21px] text-white/90 mb-[10px]">{s.title}</div>
                <p
                  className="text-[14px] text-white/50 leading-[1.68]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon — replaces testimonials */}
      <section id="coming-soon" className="py-[90px] border-t border-white/22">
        <div className="max-w-[1080px] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-36px" }}
            transition={{ duration: 0.65 }}
          >
            <span
              className="block text-[10px] tracking-[0.22em] uppercase text-white/50 mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              What&apos;s next
            </span>
            <h2
              className="font-sketch font-bold text-white/90 mb-3"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
            >
              We&apos;re just getting started
            </h2>
            <p
              className="text-[15px] text-white/50 mt-2 max-w-[500px] mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              NotHired is actively being built. Here&apos;s what&apos;s coming next — and you can
              help shape it.
            </p>
          </motion.div>

          {/* Feature roadmap grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {UPCOMING_FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                className="bg-white/4 border border-dashed border-white/18 rounded-[7px] p-[24px_20px] text-center hover:bg-white/8 hover:border-white/30 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-36px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                {/* Coming soon badge */}
                <span
                  className="absolute top-2 right-2 text-[8px] tracking-[0.12em] uppercase text-white/30 px-1.5 py-[2px] border border-dashed border-white/15 rounded-[2px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Soon
                </span>

                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image src={f.icon} alt={f.label} />
                </div>
                <div className="font-sketch text-[17px] text-white/85 mb-2">{f.label}</div>
                <p
                  className="text-[12px] text-white/45 leading-[1.55]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
