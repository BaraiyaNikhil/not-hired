import { UpcomingReminderItem } from "@/types/dashboard";
import Link from "next/link";
import { Clock } from "lucide-react";
import { memo } from "react";

function getDueLabelAndColor(dueDate: Date): { label: string; color: string } {
  const now = Date.now();
  const due = new Date(dueDate).getTime();
  const diffMs = due - now;
  const diffDays = Math.ceil(diffMs / 86_400_000);

  if (diffDays < 0) return { label: "Overdue!", color: "#f87171" };
  if (diffDays === 0) return { label: "Due today", color: "#f87171" };
  if (diffDays === 1) return { label: "Due tomorrow", color: "#fcd34d" };
  return { label: `Due in ${diffDays}d`, color: "#4ade80" };
}

export const ReminderRow = memo(function ReminderRow({
  reminder,
}: {
  reminder: UpcomingReminderItem;
}) {
  const { label, color } = getDueLabelAndColor(reminder.dueDate);

  return (
    <Link
      href={`/applications/${reminder.applicationId}`}
      className="flex items-start gap-2.5 py-2.5 group"
      style={{ borderBottom: "1px dashed rgba(255,255,255,0.07)" }}
    >
      <Clock size={14} style={{ color, marginTop: 2, flexShrink: 0 }} />
      <div className="min-w-0 flex-1">
        <p
          className="text-sm chalk-text font-body truncate group-hover:underline"
          style={{ textDecorationColor: "rgba(255,255,255,0.4)" }}
        >
          {reminder.message}
        </p>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {reminder.companyName} · {reminder.roleTitle}
        </p>
      </div>
      <span
        className="font-sketch text-xs shrink-0 px-1.5 py-0.5 rounded-sm mt-0.5"
        style={{
          color,
          background: `${color}18`,
          border: `1px dashed ${color}55`,
        }}
      >
        {label}
      </span>
    </Link>
  );
});
