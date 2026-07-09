import { ChalkNav } from "@/components/shared/ChalkNav";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { createClient } from "@/utils/supabase/server";
import { getUserProfileService } from "@/services/auth.service";
import { MentorFloatingButton } from "@/components/mentor/MentorFloatingButton";
import { MentorPanel } from "@/components/mentor/MentorPanel";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userName = null;
  let isAdmin = false;

  if (user) {
    const profile = await getUserProfileService(user.id);
    userName = profile.name;
    isAdmin = profile.isAdmin;
  }

  return (
    <div className="w-full h-svh flex flex-col board-bg">
      <ChalkNav
        notificationBell={<NotificationBell />}
        initialUserName={userName}
        initialIsAdmin={isAdmin}
      />
      <main className="h-[calc(100svh-60px)] overflow-y-auto scrollbar-none">{children}</main>
      <MentorFloatingButton />
      <MentorPanel />
    </div>
  );
}
