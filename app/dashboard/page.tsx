import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { ApplicationList } from "@/components/application/ApplicationList";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { getApplications } from "@/services/application/application.service";

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

  const applications = await getApplications(user.id);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-sketch text-5xl chalk-text">Dashboard</h1>
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

        <div className="border border-white/20 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <div className="grid grid-cols-3 gap-4">
            <span className="text-white/60">Name:</span>
            <span className="col-span-2 font-medium">{dbUser?.name || "N/A"}</span>

            <span className="text-white/60">Email:</span>
            <span className="col-span-2 font-medium">{dbUser?.email || "N/A"}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-sketch chalk-text">My Applications</h2>
            <ApplicationForm />
          </div>
          <ApplicationList applications={applications} />
        </div>
      </div>
    </div>
  );
}
