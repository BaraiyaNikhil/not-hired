import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getApplications } from "@/services/application/application.service";
import { KanbanBoard } from "@/components/application/KanbanBoard";

export const metadata = {
  title: "Applications — Not Hired",
  description: "Track your job applications on the chalkboard Kanban board.",
};

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const applications = await getApplications(user.id);

  return (
    <div
      className="overflow-auto px-4 py-6 md:px-7 md:py-7 md:pb-10"
      style={{
        minHeight: "calc(100vh - 52px)",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <KanbanBoard initialApplications={applications} />
      </div>
    </div>
  );
}
