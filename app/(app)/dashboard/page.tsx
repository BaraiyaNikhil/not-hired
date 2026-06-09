import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 52px)" }}>
      <div className="text-center space-y-6 px-8">
        {/* Chalk scribble decoration */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "rgba(255,255,255,0.3)",
            margin: "0 auto",
            transform: "rotate(-1deg)",
            filter: "blur(0.5px)",
          }}
        />
        <h1 className="font-sketch text-7xl chalk-text tracking-wide">Welcome Back</h1>
        <p
          className="text-xl"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body, inherit)" }}
        >
          Your job search, organized on the board.
        </p>
        <div
          style={{
            width: 80,
            height: 3,
            background: "rgba(255,255,255,0.15)",
            margin: "0 auto",
            transform: "rotate(0.5deg)",
            filter: "blur(0.5px)",
          }}
        />
        <div className="pt-2">
          <Link
            href="/applications"
            className="chalk-button chalk-text font-sketch text-xl px-6 py-3 inline-flex items-center gap-2"
          >
            → View Board
          </Link>
        </div>
      </div>
    </div>
  );
}
