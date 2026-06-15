import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getApplications } from "@/services/application/application.service";
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

  const applications = await getApplications(user.id);

  return <KanbanBoard initialApplications={applications} />;
}
