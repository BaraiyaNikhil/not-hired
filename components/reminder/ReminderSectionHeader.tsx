import { memo } from "react";
import { Clock, CalendarClock, CheckCheck } from "lucide-react";

type Section = "today" | "upcoming" | "completed";

const sectionConfig = {
  today: {
    label: "Today",
    icon: Clock,
    color: "#f87171",
    emptyMsg: "No reminders due today. You're all caught up! 🎉",
  },
  upcoming: {
    label: "Upcoming",
    icon: CalendarClock,
    color: "#fbbf24",
    emptyMsg: "Nothing in the next 7 days.",
  },
  completed: {
    label: "Completed",
    icon: CheckCheck,
    color: "#4ade80",
    emptyMsg: "No completed reminders in the last 30 days.",
  },
} as const;

interface ReminderSectionHeaderProps {
  section: Section;
  count: number;
}

export const ReminderSectionHeader = memo(function ReminderSectionHeader({
  section,
  count,
}: ReminderSectionHeaderProps) {
  const { label, icon: Icon, color } = sectionConfig[section];

  return (
    <div className="flex items-center gap-2.5">
      <Icon size={15} style={{ color }} />
      <span
        className="font-sketch text-sm tracking-wide"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        {label}
      </span>
      {count > 0 && (
        <span
          className="text-xs font-body px-2 py-0.5 rounded-full"
          style={{
            background: `${color}18`,
            border: `1px dashed ${color}55`,
            color,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
});

export { sectionConfig };
