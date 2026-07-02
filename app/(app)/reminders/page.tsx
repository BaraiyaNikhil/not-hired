import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTodayReminders, getUpcomingReminders } from "@/services/reminder.service";
import { ReminderList } from "@/components/reminder/ReminderList";
import { Bell } from "lucide-react";

export const metadata = {
  title: "Reminders · NotHired",
  description: "View and manage your job search reminders — today, upcoming, and completed.",
};

export default async function RemindersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [
    { items: today, nextCursor: todayCursor },
    { items: upcoming, nextCursor: upcomingCursor },
  ] = await Promise.all([
    getTodayReminders(user.id, undefined, 10),
    getUpcomingReminders(user.id, undefined, 10),
  ]);

  const totalActive = today.length + upcoming.length;

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-8">
      {/* ── Page Header ── */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-sketch chalk-text text-4xl md:text-5xl tracking-wide">Reminders</h1>
          {totalActive > 0 && (
            <span
              className="flex items-center gap-1.5 text-sm font-sketch px-2.5 py-1 rounded-sm"
              style={{
                background: "rgba(248,113,113,0.12)",
                border: "1px dashed rgba(248,113,113,0.4)",
                color: "#f87171",
              }}
            >
              <Bell size={13} />
              {totalActive} active
            </span>
          )}
        </div>
        <p className="text-sm font-body" style={{ color: "rgba(255,255,255,0.4)" }}>
          stay on top of your job search, one follow-up at a time.
        </p>
      </div>

      {/* ── Sections ── */}
      <ReminderList section="today" initialReminders={today} initialCursor={todayCursor} />
      <ReminderList section="upcoming" initialReminders={upcoming} initialCursor={upcomingCursor} />
      <ReminderList
        section="completed"
        initialReminders={[]}
        initialCursor={undefined}
        collapsible
      />
    </div>
  );
}
