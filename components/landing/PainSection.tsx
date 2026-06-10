"use client";

import { motion } from "motion/react";
import { PROBLEM_ITEMS } from "@/data/landing/features.data";
import type { ProblemItem } from "@/data/landing/types";
import Image from "next/image";
import messySpreadsheetIcon from "@/assets/icons/messy-spreadsheet.svg";
import emptyInboxIcon from "@/assets/icons/empty-inbox.svg";
import brokenChartIcon from "@/assets/icons/broken-chart.svg";

const ICONS = [
  <Image src={messySpreadsheetIcon} alt="Messy Spreadsheet" className="mb-3" key="spreadsheet" />,
  <Image src={emptyInboxIcon} alt="Empty Inbox" className="mb-3" key="inbox" />,
  <Image src={brokenChartIcon} alt="Broken Chart" className="mb-3" key="chart" />,
];

function ProblemCard({ p, icon, i }: { p: ProblemItem; icon: React.ReactNode; i: number }) {
  return (
    <motion.div
      className="bg-white/4 border border-dashed rounded-[7px] p-[28px_24px] hover:bg-white/8 transition-all duration-300 relative overflow-hidden group"
      style={{ borderColor: p.borderColor }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-36px" }}
      transition={{ duration: 0.65, delay: i * 0.13 }}
    >
      {/* Subtle corner glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: p.borderColor }}
      />

      {/* Icon */}
      <div className="relative z-1">{icon}</div>

      {/* Severity badge */}
      <span
        className="inline-block text-[9px] tracking-[0.15em] uppercase px-2 py-[3px] rounded-[3px] mb-3"
        style={{
          background: p.badgeColor,
          color: p.badgeTextColor,
          border: `1px solid ${p.borderColor}`,
          fontFamily: "var(--font-body)",
        }}
      >
        {p.badge}
      </span>

      <div className="font-sketch text-[20px] text-white/90 mb-[10px] leading-[1.3]">{p.title}</div>
      <p
        className="text-[14px] text-white/50 leading-[1.72]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {p.body}
      </p>
    </motion.div>
  );
}

export function ProblemSection() {
  return (
    <section id="problem" className="py-[90px]">
      <div className="max-w-[1080px] mx-auto px-6">
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
            Why most job searches fail
          </span>
          <h2
            className="font-sketch font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
          >
            The job hunt is broken. Here&apos;s proof.
          </h2>
          <p className="text-white/50 text-[15px] mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Most people aren&apos;t failing because they&apos;re unqualified. They have no system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEM_ITEMS.map((p, i) => (
            <ProblemCard key={i} p={p} icon={ICONS[i]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
