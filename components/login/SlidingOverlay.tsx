"use client";

import { motion, Transition } from "motion/react";
import { Rocket, Pencil } from "lucide-react";

const transitionConfig: Transition = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

export function SlidingOverlay({
  mode,
  toggleMode,
}: {
  mode: "login" | "signup";
  toggleMode: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ x: mode === "signup" ? "0%" : "100%" }}
      transition={transitionConfig}
      className="hidden lg:block absolute top-0 left-0 w-1/2 h-full z-30"
    >
      <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center p-12 sm:p-16 text-center">
        {/* The animated content that changes based on mode */}
        <div className="relative z-10 flex flex-col items-center transform -rotate-2">
          <div className="relative mb-8 h-24 w-24">
            <motion.div
              initial={false}
              animate={{
                opacity: mode === "login" ? 1 : 0,
                rotate: mode === "login" ? 0 : -90,
                scale: mode === "login" ? 1 : 0.5,
              }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Rocket className="w-24 h-24 text-white/80" />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                opacity: mode === "signup" ? 1 : 0,
                rotate: mode === "signup" ? 0 : 90,
                scale: mode === "signup" ? 1 : 0.5,
              }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Pencil className="w-24 h-24 text-white/80" />
            </motion.div>
          </div>

          <h1 className="font-sketch text-7xl font-bold chalk-text leading-none mb-6 tracking-widest text-center whitespace-nowrap">
            Not Hired
          </h1>
          <div className="w-full border-b-4 border-dashed border-white/50 mb-8"></div>

          {/* Dynamic text based on mode */}
          <div className="relative h-24 w-full mb-10">
            <motion.p
              initial={false}
              animate={{
                opacity: mode === "login" ? 1 : 0,
                y: mode === "login" ? 0 : 32,
              }}
              transition={{ duration: 0.5, delay: mode === "login" ? 0.2 : 0 }}
              className="absolute inset-0 font-sketch text-3xl chalk-text text-white/80"
            >
              New here? Draw your own career path today.
            </motion.p>
            <motion.p
              initial={false}
              animate={{
                opacity: mode === "signup" ? 1 : 0,
                y: mode === "signup" ? 0 : -32,
              }}
              transition={{ duration: 0.5, delay: mode === "signup" ? 0.2 : 0 }}
              className="absolute inset-0 font-sketch text-3xl chalk-text text-white/80"
            >
              Already have an account? Keep on tracking.
            </motion.p>
          </div>

          <button
            onClick={toggleMode}
            className="py-3 px-12 chalk-button chalk-text font-sketch text-3xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all mt-4 relative z-50 cursor-pointer"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </div>

        {/* Sketchy decorative elements */}
        <div className="absolute top-12 left-12 font-sketch text-white/20 text-6xl transform -rotate-12">
          *
        </div>
        <div className="absolute bottom-16 right-16 font-sketch text-white/10 text-7xl transform rotate-12">
          +
        </div>
      </div>
    </motion.div>
  );
}
