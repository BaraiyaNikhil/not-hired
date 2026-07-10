"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { useMentorStore } from "@/store/mentorStore";

export function MentorFloatingButton() {
  const { isOpen, toggle } = useMentorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          id="mentor-floating-btn"
          key="mentor-fab"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggle}
          aria-label="Open AI Mentor"
          className="fixed bottom-6 right-6 z-40 chalk-button flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "4px 10px 4px 8px",
          }}
        >
          <BrainCircuit size={20} style={{ color: "rgba(255,255,255,0.85)" }} strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
}
