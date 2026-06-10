"use client";

import { motion } from "motion/react";
import { PipelinePreview } from "./PipelinePreview";
import { RemindersPreview } from "./RemindersPreview";
import { AI_INSIGHTS } from "@/data/landing/features.data";
import { InsightCard } from "./InsightCard";

export function FeaturesSection() {
  return (
    <section id="features" className="py-[90px] border-t border-white/22">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-[72px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-36px" }}
          transition={{ duration: 0.65 }}
        >
          <span
            className="block text-[10px] tracking-[0.22em] uppercase text-white/50 mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Core features
          </span>
          <h2
            className="font-sketch font-bold text-white/90"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
          >
            Everything your spreadsheet can&apos;t do
          </h2>
        </motion.div>

        {/* Feature 1 — Pipeline */}
        <FeatureRow
          label="[ Pipeline ]"
          title="See your entire job search at a glance"
          body="Drag applications across stages. Applied → Screening → Interview → Offer → Rejected → Ghosted. Know exactly where every opportunity stands, without opening 12 browser tabs."
          visual={<PipelinePreview />}
        />

        {/* Feature 2 — AI Insights */}
        <FeatureRow
          label="[ Brutal Honesty Mode ]"
          title="Your AI coach that won't baby you"
          body="Not encouragement. Not a pep talk. Specific, actionable insights about what's blocking you — derived from your real data, not guesses."
          reverse
          visual={
            <div>
              <div
                className="text-[10px] tracking-[0.18em] uppercase text-white/50 mb-[14px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                AI analysis
              </div>
              {AI_INSIGHTS.map((ins) => (
                <InsightCard key={ins.sev} {...ins} />
              ))}
            </div>
          }
        />

        {/* Feature 3 — Reminders */}
        <FeatureRow
          label="[ Follow-ups ]"
          title="Never let a warm lead go cold"
          body='NotHired watches your timelines. No response in 5 days? It tells you. One click to log the follow-up. No more "I meant to reach out."'
          visual={<RemindersPreview />}
        />
      </div>
    </section>
  );
}

function FeatureRow({
  label,
  title,
  body,
  visual,
  reverse = false,
}: {
  label: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-[56px] items-center mb-[80px] last:mb-0"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-36px" }}
      transition={{ duration: 0.65 }}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-white/50 border border-white/22 inline-block px-[10px] py-[3px] rounded-[3px] mb-[14px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
        <h3
          className="font-sketch text-white/90 mb-[14px]"
          style={{ fontSize: "clamp(22px, 2.8vw, 32px)", lineHeight: 1.2 }}
        >
          {title}
        </h3>
        <p
          className="text-[15px] text-white/50 leading-[1.78]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {body}
        </p>
      </div>
      <div
        className={`bg-black/22 border border-dashed border-white/22 rounded-[8px] p-5 min-h-[270px] relative overflow-hidden ${reverse ? "md:order-1" : ""}`}
      >
        {visual}
      </div>
    </motion.div>
  );
}
