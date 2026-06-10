"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function LandingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] px-7 flex items-center justify-between backdrop-blur-[14px] bg-[rgba(42,52,57,0.82)] border-b border-white/22"
    >
      {/* Logo — board icon with 6-column colors */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect
            x="1.5"
            y="4.5"
            width="27"
            height="21"
            rx="2.5"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="3 1.8"
          />
          {/* 6-column dividers */}
          <line
            x1="6"
            y1="4.5"
            x2="6"
            y2="25.5"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <line
            x1="10.5"
            y1="4.5"
            x2="10.5"
            y2="25.5"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <line
            x1="15"
            y1="4.5"
            x2="15"
            y2="25.5"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <line
            x1="19.5"
            y1="4.5"
            x2="19.5"
            y2="25.5"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <line
            x1="24"
            y1="4.5"
            x2="24"
            y2="25.5"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          {/* Applied — blue */}
          <rect x="2.5" y="8" width="3" height="3" rx="0.5" fill="rgba(96,165,250,0.65)" />
          <rect x="2.5" y="12.5" width="3" height="2.5" rx="0.5" fill="rgba(96,165,250,0.35)" />
          {/* Screening — amber */}
          <rect x="7" y="8" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.6)" />
          {/* Interview — purple */}
          <rect x="11.5" y="8" width="3" height="3" rx="0.5" fill="rgba(167,139,250,0.6)" />
          {/* Offer — green */}
          <rect x="16" y="8" width="3" height="2.5" rx="0.5" fill="rgba(74,222,128,0.5)" />
          {/* Rejected — red */}
          <rect x="20.5" y="8" width="3" height="3" rx="0.5" fill="rgba(248,113,113,0.55)" />
          <rect x="20.5" y="12.5" width="3" height="2.5" rx="0.5" fill="rgba(248,113,113,0.3)" />
          {/* Ghosted — gray */}
          <rect x="25" y="8" width="2.5" height="3" rx="0.5" fill="rgba(156,163,175,0.4)" />
        </svg>
        <span className="font-sketch text-[22px] text-white/90">NotHired</span>
      </Link>

      <div className="flex items-center gap-7">
        <a
          href="#how"
          className="hidden sm:block text-sm text-white/50 hover:text-white/90 transition-colors no-underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          How it works
        </a>
        <a
          href="#features"
          className="hidden sm:block text-sm text-white/50 hover:text-white/90 transition-colors no-underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Features
        </a>
        <Link
          href="/applications"
          className="text-sm font-medium text-white/90 px-[22px] py-[10px] border-2 border-dashed border-white/65 bg-white/4 hover:bg-white/13 hover:scale-[1.02] transition-all no-underline"
          style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
        >
          Start free →
        </Link>
      </div>
    </motion.nav>
  );
}
