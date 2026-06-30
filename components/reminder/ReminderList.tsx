"use client";

import { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useAction } from "next-safe-action/hooks";
import { ReminderWithApplication } from "@/types/reminder";
import { ReminderCard } from "./ReminderCard";
import { ReminderSectionHeader } from "./ReminderSectionHeader";
import {
  getTodayRemindersAction,
  getUpcomingRemindersAction,
  getCompletedRemindersAction,
} from "@/actions/reminder/reminder.actions";

interface ReminderListProps {
  section: "today" | "upcoming" | "completed";
  initialReminders?: ReminderWithApplication[];
  initialCursor?: string;
  collapsible?: boolean;
}

export const ReminderList = memo(function ReminderList({
  section,
  initialReminders = [],
  initialCursor,
  collapsible = false,
}: ReminderListProps) {
  const [isOpen, setIsOpen] = useState(!collapsible);
  const [reminders, setReminders] = useState<ReminderWithApplication[]>(initialReminders);
  const [cursor, setCursor] = useState<string | undefined>(initialCursor);
  const [hasMore, setHasMore] = useState(
    initialReminders.length > 0 && initialCursor !== undefined
  );
  const [hasLoaded, setHasLoaded] = useState(initialReminders.length > 0);

  const action =
    section === "today"
      ? getTodayRemindersAction
      : section === "upcoming"
        ? getUpcomingRemindersAction
        : getCompletedRemindersAction;

  const { execute: fetchReminders, isExecuting: isFetching } = useAction(action, {
    onSuccess: ({ data }) => {
      if (data) {
        setReminders((prev) => {
          const newIds = data.items.map((r) => r.id);
          const filteredPrev = prev.filter((r) => !newIds.includes(r.id));
          return [...filteredPrev, ...(data.items as ReminderWithApplication[])];
        });
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
        setHasLoaded(true);
      }
    },
  });

  const { ref, inView } = useInView({ threshold: 0 });

  // Initial load for lazy loaded sections (e.g., Completed)
  useEffect(() => {
    if (isOpen && !hasLoaded && !isFetching) {
      fetchReminders({ cursor: undefined, limit: 10 });
    }
  }, [isOpen, hasLoaded, isFetching, fetchReminders]);

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && isOpen && !isFetching) {
      fetchReminders({ cursor, limit: 10 });
    }
  }, [inView, hasMore, isOpen, isFetching, cursor, fetchReminders]);

  const isEmpty = hasLoaded && reminders.length === 0;

  const emptyMessages = {
    today: "No reminders due today. You're all caught up! 🎉",
    upcoming: "Nothing coming up in the next 7 days.",
    completed: "No completed reminders.",
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <ReminderSectionHeader section={section} count={reminders.length} />

        {collapsible && (
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center gap-1 text-xs font-body cursor-pointer transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <span>{isOpen ? "Collapse" : "Show"}</span>
            <motion.span animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={collapsible ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="chalk-card px-4 py-1"
              style={{ minHeight: isEmpty ? "64px" : undefined }}
            >
              {!hasLoaded ? (
                <p
                  className="text-sm font-body py-4 text-center"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Loading...
                </p>
              ) : isEmpty ? (
                <p
                  className="text-sm font-body py-4 text-center"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {emptyMessages[section]}
                </p>
              ) : (
                <div className="flex flex-col">
                  {reminders.map((r, i) => (
                    <ReminderCard key={r.id} reminder={r} section={section} index={i} />
                  ))}
                  {hasMore && (
                    <div ref={ref} className="py-4 text-center text-sm font-body text-white/30">
                      {isFetching ? "Loading more..." : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});
