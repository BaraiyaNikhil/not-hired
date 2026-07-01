import { KanbanBoardSkeleton } from "@/components/skeleton/application/KanbanBoardSkeleton";

export default function ApplicationsLoading() {
  return (
    <div className="overflow-auto px-4 py-6 md:px-7 md:py-7 md:pb-10 h-full">
      <div style={{ maxWidth: "1660px", margin: "0 auto" }}>
        <KanbanBoardSkeleton />
      </div>
    </div>
  );
}
