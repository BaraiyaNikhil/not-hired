import { ChalkNav } from "@/components/shared/ChalkNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col board-bg">
      <ChalkNav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
