"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Generate random positions once in state to prevent strict mode rerender jumps
  const [particles] = useState(() => {
    return [...Array(12)].map(() => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      xOffset: Math.random() * 40 - 20,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
    }));
  });

  return (
    <div className="min-h-screen board-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Crack SVG */}
      {mounted && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
            className="max-w-full max-h-full"
          >
            {/* Main Crack */}
            <motion.path
              d="M 200 50 Q 220 100 280 220 T 350 320 T 450 450 T 420 550"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0px 0px 4px rgba(255,255,255,0.6))" }}
            />
            {/* Branches */}
            <motion.path
              d="M 280 220 Q 320 180 380 200"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0px 0px 2px rgba(255,255,255,0.5))" }}
            />
            <motion.path
              d="M 350 320 Q 420 300 480 340"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            />
            <motion.path
              d="M 450 450 Q 520 480 550 440"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      )}

      <div className="z-10 text-center flex flex-col items-center">
        <div className="relative animate-fade-in-up">
          <h1 className="text-9xl md:text-[14rem] font-bold chalk-text tracking-tighter font-sketch leading-none">
            404
          </h1>
          {/* Chalk dust effect behind text */}
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />
        </div>

        <h2 className="text-2xl md:text-4xl font-medium text-white mt-6 chalk-text animate-fade-in-up animation-delay-100 font-sans">
          Oops! You&apos;ve drawn outside the lines.
        </h2>

        <p className="text-white/70 mt-4 max-w-md text-center text-lg animate-fade-in-up animation-delay-200 font-sans">
          This section of the board has been erased or never existed.
        </p>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Link
            href="/applications"
            className="chalk-button px-8 py-4 text-lg font-medium text-white flex items-center gap-3 group bg-white/5 hover:bg-white/15 font-sans"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Board
          </Link>
        </div>
      </div>

      {/* Floating chalk particles */}
      {mounted &&
        particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full z-0"
            style={{
              top: particle.top,
              left: particle.left,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
