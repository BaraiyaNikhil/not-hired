import { ChalkNav } from "@/components/shared/ChalkNav";
import { NotificationBell } from "@/components/shared/NotificationBell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-svh flex flex-col board-bg">
      <ChalkNav notificationBell={<NotificationBell />} />
      <main className="h-[calc(100svh-60px)] overflow-y-auto scrollbar-none">{children}</main>
    </div>
  );
}
