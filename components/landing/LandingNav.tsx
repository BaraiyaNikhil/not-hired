"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export function LandingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] px-7 flex items-center justify-between backdrop-blur-[14px] bg-[rgba(42,52,57,0.82)] border-b border-white/22"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <Image
          src="/Logo.png"
          alt="NotHired Logo"
          width={40}
          height={40}
          quality={1}
          className="rounded"
        />
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
