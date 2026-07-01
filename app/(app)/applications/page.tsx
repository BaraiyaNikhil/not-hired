import { KanbanDialogs } from "@/components/application/KanbanDialogs";
import ApplicationsBoard from "@/components/application/ApplicationsBoard";

export const metadata = {
  title: "Applications — Not Hired",
  description: "Track your job applications on the chalkboard Kanban board.",
};

export default function ApplicationsPage() {
  return (
    <div className="overflow-auto px-4 py-6 md:px-7 md:py-7 md:pb-10 h-full">
      <div style={{ maxWidth: "1660px", margin: "0 auto" }}>
        <ApplicationsBoard />
      </div>
      <KanbanDialogs />
    </div>
  );
}
