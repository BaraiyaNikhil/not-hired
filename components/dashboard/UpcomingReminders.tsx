import { UpcomingReminderItem } from "@/types/dashboard";
import { memo } from "react";

interface Props {
  reminders: UpcomingReminderItem[];
}

import { ReminderRow } from "./ReminderRow";
export const UpcomingReminders = memo(function UpcomingReminders({ reminders }: Props) {
  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: "400ms" }}
    >
      <div>
        <h2 className="font-sketch chalk-text text-xl tracking-wide">Upcoming Reminders</h2>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          follow up before they forget you
        </p>
      </div>

      {reminders.length === 0 ? (
        <p
          className="h-full flex text-sm font-body py-4 justify-center items-center"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Good job, no upcoming reminders.
        </p>
      ) : (
        <div className="flex flex-col">
          {reminders.map((r) => (
            <ReminderRow key={r.id} reminder={r} />
          ))}
        </div>
      )}
    </div>
  );
});
