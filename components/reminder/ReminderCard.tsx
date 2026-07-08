"use client";

import { memo, useTransition } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CheckCircle2, Loader2, Bell, Zap } from "lucide-react";
import { ReminderWithApplication } from "@/types/reminder";
import { markReminderDoneAction } from "@/actions/reminder.actions";
import { toast } from "sonner";
import { ReminderTrigger } from "@prisma/client";
import { formatDistanceToNow, format, isToday, isPast } from "@/utils/date";

function getDueDateDisplay(dueDate: Date): { label: string; color: string } {
  const d = new Date(dueDate);
  if (isPast(d) && !isToday(d)) return { label: "Overdue", color: "#f87171" };
  if (isToday(d)) return { label: "Due today", color: "#f87171" };
  return {
    label: `Due ${formatDistanceToNow(d, { addSuffix: true })}`,
    color: "#fbbf24",
  };
}

function getTriggerBadge(trigger: ReminderTrigger): { label: string; show: boolean } {
  if (trigger === "MANUAL") return { label: "Manual", show: false };
  const map: Record<string, string> = {
    AUTO_APPLIED: "Auto",
    AUTO_SCREENING: "Auto",
    AUTO_INTERVIEW: "Auto",
    AUTO_OFFER: "Auto",
  };
  return { label: map[trigger] ?? "Auto", show: true };
}

interface ReminderCardProps {
  reminder: ReminderWithApplication;
  section: "today" | "upcoming" | "completed";
  index: number;
}

export const ReminderCard = memo(function ReminderCard({
  reminder,
  section,
  index,
}: ReminderCardProps) {
  const [isPending, startTransition] = useTransition();
  const { label: dueLabel, color: dueColor } = getDueDateDisplay(reminder.dueDate);
  const { label: triggerLabel, show: showTrigger } = getTriggerBadge(reminder.trigger);
  const isDone = section === "completed";

  function handleMarkDone() {
    startTransition(async () => {
      const result = await markReminderDoneAction({ id: reminder.id });
      if (result?.serverError) {
        toast.error("Failed to mark as done");
      } else {
        toast.success("Reminder marked as done ✓");
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-start gap-3 py-3.5 group"
      style={{
        borderBottom: "1px dashed rgba(255,255,255,0.07)",
        opacity: isDone ? 0.65 : 1,
      }}
    >
      {/* Status icon */}
      <div className="mt-0.5 shrink-0">
        {isDone ? (
          <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
        ) : (
          <Bell
            size={16}
            style={{
              color: section === "today" ? "#f87171" : "#fbbf24",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-body leading-snug"
          style={{
            color: isDone ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.9)",
            textDecoration: isDone ? "line-through" : "none",
          }}
        >
          {reminder.message}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Link
            href={`/applications/${reminder.applicationId}`}
            className="text-xs font-body hover:underline transition-colors"
            style={{
              color: "rgba(255,255,255,0.4)",
              textDecorationColor: "rgba(255,255,255,0.25)",
            }}
          >
            {reminder.application.companyName} · {reminder.application.roleTitle}
          </Link>
          {showTrigger && (
            <span
              className="flex items-center gap-0.5 text-xs font-body px-1.5 py-px rounded-sm"
              style={{
                background: "rgba(124,106,247,0.12)",
                border: "1px dashed rgba(124,106,247,0.35)",
                color: "#a89cf8",
              }}
            >
              <Zap size={9} />
              {triggerLabel}
            </span>
          )}
        </div>
        {isDone && reminder.doneAt && (
          <p className="text-xs font-body mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            Completed {format(new Date(reminder.doneAt), "MMM d, h:mm a")}
          </p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 shrink-0">
        {!isDone && (
          <span
            className="text-xs font-sketch px-2 py-0.5 rounded-sm"
            style={{
              color: dueColor,
              background: `${dueColor}15`,
              border: `1px dashed ${dueColor}45`,
            }}
          >
            {dueLabel}
          </span>
        )}

        {section === "today" && (
          <motion.button
            onClick={handleMarkDone}
            disabled={isPending}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1.5 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px dashed rgba(74,222,128,0.35)",
              color: "#4ade80",
            }}
            title="Mark as done"
          >
            {isPending ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <CheckCircle2 size={13} />
            )}
            <span className="hidden sm:inline">{isPending ? "Saving…" : "Done"}</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
});
