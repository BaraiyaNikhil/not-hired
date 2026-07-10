"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BrainCircuit, Sparkles, Send } from "lucide-react";
import { LandingInsightCard } from "./InsightCard";
import { LANDING_AI_INSIGHTS, LANDING_CHAT_PREVIEW } from "@/data/landing/ai-insights.data";

export function HonestySection() {
  return (
    <section id="honesty" className="py-[90px] bg-black/[0.14] border-t border-b border-white/22">
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
            Live on your dashboard · AI-powered
          </span>
          <h2
            className="font-sketch font-bold text-white/90 mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2 }}
          >
            Put in your stats. Get back the truth.
          </h2>
          <p
            className="text-[15px] text-white/50 mt-2 max-w-[500px] mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            NotHired reads your real application data and surfaces exactly what&apos;s broken — no
            sugarcoating, no guesses. Your AI mentor lives in your dashboard, ready when you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[44px] items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-36px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="chalk-card p-5 flex flex-col gap-3" style={{ animationDelay: "200ms" }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-sketch chalk-text text-xl tracking-wide">AI Insights</h3>
                  <p
                    className="text-xs font-body mt-0.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    brutally honest feedback
                  </p>
                </div>
                <div
                  className="relative flex items-center justify-center w-8 h-8 rounded-sm"
                  style={{
                    background: "rgba(192,132,252,0.12)",
                    border: "2px dashed rgba(192,132,252,0.4)",
                    borderRadius: "4px 10px 4px 8px",
                  }}
                >
                  <BrainCircuit size={16} style={{ color: "#c084fc" }} />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {LANDING_AI_INSIGHTS.map((insight, i) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                  >
                    <LandingInsightCard insight={insight} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-36px" }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col h-full"
          >
            <div className="chalk-card p-5 flex flex-col gap-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sketch chalk-text text-xl tracking-wide">AI Mentor</h3>
                  <p
                    className="text-xs font-body mt-0.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    ask anything about your job search
                  </p>
                </div>
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute w-10 h-10 rounded-full animate-ping"
                    style={{ background: "rgba(192,132,252,0.1)", animationDuration: "2.4s" }}
                  />
                  <div
                    className="relative flex items-center justify-center w-8 h-8"
                    style={{
                      background: "rgba(192,132,252,0.12)",
                      border: "2px dashed rgba(192,132,252,0.4)",
                      borderRadius: "4px 10px 4px 8px",
                    }}
                  >
                    <BrainCircuit size={16} style={{ color: "#c084fc" }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {LANDING_CHAT_PREVIEW.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.18 }}
                  >
                    {msg.role === "mentor" && (
                      <div className="flex items-start gap-2 max-w-[88%]">
                        <div
                          className="shrink-0 flex items-center justify-center w-6 h-6 mt-0.5"
                          style={{
                            background: "rgba(192,132,252,0.15)",
                            border: "1px dashed rgba(192,132,252,0.4)",
                            borderRadius: "3px 6px 3px 5px",
                          }}
                        >
                          <BrainCircuit size={11} style={{ color: "#c084fc" }} />
                        </div>
                        <div
                          className="rounded-sm px-3 py-2.5 text-xs font-body leading-relaxed"
                          style={{
                            background: "rgba(192,132,252,0.08)",
                            border: "1px dashed rgba(192,132,252,0.25)",
                            borderRadius: "3px 8px 8px 3px",
                            color: "rgba(255,255,255,0.82)",
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div
                        className="max-w-[80%] px-3 py-2.5 text-xs font-body leading-relaxed"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px dashed rgba(255,255,255,0.22)",
                          borderRadius: "8px 3px 3px 8px",
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        {msg.text}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Second user message before thinking indicator */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.66 }}
                >
                  <div
                    className="max-w-[80%] px-3 py-2.5 text-xs font-body leading-relaxed"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px dashed rgba(255,255,255,0.22)",
                      borderRadius: "8px 3px 3px 8px",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    What should I focus on this week?
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 mt-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  <div
                    className="flex items-center justify-center w-6 h-6 shrink-0"
                    style={{
                      background: "rgba(192,132,252,0.15)",
                      border: "1px dashed rgba(192,132,252,0.4)",
                      borderRadius: "3px 6px 3px 5px",
                    }}
                  >
                    <BrainCircuit size={11} style={{ color: "#c084fc" }} />
                  </div>
                  <div
                    className="flex gap-1 items-center px-3 py-2"
                    style={{
                      background: "rgba(192,132,252,0.06)",
                      border: "1px dashed rgba(192,132,252,0.2)",
                      borderRadius: "3px 8px 8px 3px",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400/60"
                        style={{ animation: `dust-pulse 1.4s ${i * 0.22}s infinite` }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              <div
                className="flex items-center gap-2 mt-1 px-3 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "2px dashed rgba(255,255,255,0.18)",
                  borderRadius: "4px 8px 4px 7px",
                }}
              >
                <input
                  readOnly
                  placeholder="Ask your mentor anything..."
                  className="flex-1 bg-transparent text-xs font-body text-white/50 outline-none placeholder:text-white/30 cursor-default"
                />
                <div
                  className="flex items-center justify-center w-6 h-6 shrink-0"
                  style={{
                    background: "rgba(192,132,252,0.15)",
                    border: "1px dashed rgba(192,132,252,0.4)",
                    borderRadius: "3px 6px 3px 5px",
                  }}
                >
                  <Send size={11} style={{ color: "#c084fc" }} />
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-3">
                {["Analysing pipeline", "Reading patterns", "Preparing feedback"].map((step, i) => (
                  <span
                    key={step}
                    className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.35)",
                      border: "1px dashed rgba(255,255,255,0.1)",
                      animationDelay: `${i * 200}ms`,
                    }}
                  >
                    <Sparkles size={10} style={{ color: "#c084fc", opacity: 0.7 }} />
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="flex flex-col gap-3 mt-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.5 }}
            >
              <Link
                href="/dashboard"
                className="text-base font-medium text-white/90 px-[30px] py-[13px] border-2 border-dashed border-white/65 bg-white/4 hover:bg-white/13 hover:scale-[1.02] transition-all no-underline inline-block text-center"
                style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
              >
                Open my dashboard →
              </Link>
              <p className="text-[11px] text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                AI mentor available in dashboard · Chat, ask, get coached
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
