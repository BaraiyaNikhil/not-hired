"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useMentorStore } from "@/store/mentorStore";
import { MentorPanelHeader } from "@/components/mentor/MentorPanelHeader";
import { MentorChat } from "@/components/mentor/MentorChat";

export function MentorPanel() {
  const { isOpen, close, resetChat } = useMentorStore();
  const [chatKey, setChatKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleReset = useCallback(() => {
    resetChat();
    setChatKey((k) => k + 1);
  }, [resetChat]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="mentor-panel"
          id="mentor-panel"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed right-0 top-0 w-[100dvw] md:w-[385px] h-svh z-50 flex flex-col bg-background border-11 border-board-border"
          style={{
            borderRight: "1px dashed rgba(255,255,255,0.2)",
          }}
          aria-label="AI Mentor Panel"
        >
          <MentorPanelHeader onClose={close} onReset={handleReset} />
          <div className="flex-1 overflow-hidden flex flex-col">
            <MentorChat key={chatKey} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
