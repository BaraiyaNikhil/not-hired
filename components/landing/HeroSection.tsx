"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeroBgAnimation } from "./HeroBgAnimation";
import { HeroBoardColumn } from "./HeroBoardColumn";
import { HERO_BOARD_COLUMNS } from "@/data/landing/hero.data";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center overflow-hidden min-h-screen"
      style={{ padding: "110px 24px 70px" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated workflow background */}
      <HeroBgAnimation />

      {/* H1 — Cabin Sketch */}
      <h1
        className="font-sketch font-bold text-white/90 max-w-[840px] mb-6 relative z-10 animate-fade-in-up"
        style={{ fontSize: "clamp(46px, 8.5vw, 90px)", lineHeight: 1.05 }}
      >
        Stop guessing why
        <br />
        you&apos;re getting{" "}
        <span className="text-red-400 relative inline-block">
          ghosted.
          <svg
            viewBox="0 0 220 12"
            preserveAspectRatio="none"
            className="absolute left-0 w-full"
            style={{ bottom: -10, height: 12 }}
          >
            <path
              d="M0,6 C36,1 72,11 110,6 C148,1 184,11 220,6"
              stroke="#f87171"
              fill="none"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      {/* Subheading — Sniglet */}
      <p
        className="text-white/50 max-w-[500px] mb-9 relative z-10 animate-fade-in-up animation-delay-200"
        style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          lineHeight: 1.75,
          fontFamily: "var(--font-body)",
        }}
      >
        NotHired tracks every application, reminds you to follow up, and tells you — without
        sugarcoating — exactly what&apos;s broken in your job search.
      </p>

      {/* CTAs */}
      <div className="flex gap-4 items-center flex-wrap justify-center mb-[18px] relative z-10 animate-fade-in-up animation-delay-200">
        <Link
          href="/applications"
          className="text-base font-medium text-white/90 px-[30px] py-[13px] border-2 border-dashed border-white/65 bg-white/4 hover:bg-white/13 hover:scale-[1.02] transition-all no-underline"
          style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
        >
          Start tracking free →
        </Link>
        <a
          href="#how"
          className="text-sm text-white/50 hover:text-white/90 transition-colors no-underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          See how it works ↓
        </a>
      </div>

      {/* Social proof */}
      <div
        className="flex gap-5 justify-center flex-wrap text-[11px] text-white/50 relative z-10 animate-fade-in-up animation-delay-200"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {["No resume required", "Free to start", "No fluff"].map((t) => (
          <span key={t} className="before:content-['✦_'] before:text-yellow-300">
            {t}
          </span>
        ))}
      </div>

      {/* Kanban board mockup */}
      <motion.div
        className="relative mt-[60px] w-full max-w-[1100px] board-bg p-4 md:p-5 z-10 scrollbar-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Board header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <div className="font-sketch text-[18px] md:text-[22px] chalk-text tracking-wide">
              Applications
            </div>
            <div className="text-[10px] text-white/40" style={{ fontFamily: "var(--font-body)" }}>
              9 applications tracked
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 text-[11px] text-white/60 px-3 py-1.5"
            style={{
              border: "2px dashed rgba(255,255,255,0.4)",
              borderRadius: "4px 8px 3px 6px",
              background: "rgba(255,255,255,0.04)",
              fontFamily: "var(--font-sketch)",
            }}
          >
            <span className="text-[14px]">+</span> New Application
          </div>
        </div>

        {/* 6-column grid */}
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}
        >
          {HERO_BOARD_COLUMNS.map((col, colIdx) => (
            <HeroBoardColumn key={col.id} {...col} colIdx={colIdx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
