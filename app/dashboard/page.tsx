import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="font-sketch text-5xl chalk-text">Dashboard</h1>

        <div className="border border-white/20 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <div className="grid grid-cols-3 gap-4">
            <span className="text-white/60">Username:</span>
            <span className="col-span-2 font-medium">{dbUser?.username || "N/A"}</span>

            <span className="text-white/60">Email:</span>
            <span className="col-span-2 font-medium">{dbUser?.email || "N/A"}</span>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await logoutAction();
          }}
        >
          <button
            type="submit"
            className="py-2 px-4 chalk-button chalk-text font-sketch text-xl shadow-lg hover:shadow-xl transition-all"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
