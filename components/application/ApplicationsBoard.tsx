import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getApplications, getApplicationCounts } from "@/services/application.service";
import { KanbanBoard } from "./KanbanBoard";

export default async function ApplicationsBoard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const [applications, applicationCounts] = await Promise.all([
    getApplications(user.id),
    getApplicationCounts(user.id),
  ]);

  return <KanbanBoard initialApplications={applications} initialCounts={applicationCounts} />;
}
