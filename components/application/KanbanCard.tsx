"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { Edit, Trash2, Users, GripVertical, ExternalLink, MoreVertical } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteApplicationAction } from "@/actions/application.actions";
import { toast } from "sonner";
import { useApplicationStore } from "@/store";
import { AppWithContacts } from "@/types/kanban";
import { useSortable } from "@dnd-kit/react/sortable";
import { useRouter } from "next/navigation";
import { formatRelativeDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KanbanCardProps {
  app: AppWithContacts;
  index: number;
  columnId: string;
}

const SOURCE_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  referral: "Referral",
  cold_email: "Cold Email",
  job_portal: "Job Portal",
  other: "Other",
};

export const KanbanCard = memo(function KanbanCard({ app, index, columnId }: KanbanCardProps) {
  const { setEditingApp, setContactsApp, deleteApplication } = useApplicationStore();
  const router = useRouter();

  const { ref, isDragging } = useSortable({
    id: app.id,
    index,
    group: columnId,
    type: "card",
  });

  const { execute: deleteApp, isExecuting } = useAction(deleteApplicationAction, {
    onSuccess: () => {
      deleteApplication(app.id);
      toast.success("Application deleted");
    },
    onError: (e) => {
      toast.error("Failed to delete");
      console.error(e);
    },
  });

  return (
    <div ref={ref} className="relative" style={{ opacity: isDragging ? 0.4 : 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="kanban-card group relative rounded-sm"
        onClick={(e) => {
          // If we clicked a button or link, don't navigate
          if ((e.target as HTMLElement).closest("button, a")) return;
          router.push(`/applications/${app.id}`);
        }}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "2px dashed rgba(255,255,255,0.35)",
          borderRadius: "2px 6px 3px 5px",
          padding: "12px 14px",
          cursor: isDragging ? "grabbing" : "pointer",
          boxShadow: isDragging ? "4px 4px 0 rgba(255,255,255,0.2)" : "2px 2px 0 rgba(0,0,0,0.3)",
          transition: "box-shadow 0.15s ease, transform 0.15s ease",
        }}
      >
        {/* Drag handle */}
        <div
          className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <GripVertical size={14} />
        </div>

        {/* Card content */}
        <div className="pl-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3
                className="font-sketch text-base leading-tight chalk-text truncate"
                title={app.companyName}
              >
                {app.companyName}
              </h3>
              <p
                className="text-sm mt-0.5 truncate"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body, inherit)" }}
                title={app.roleTitle}
              >
                {app.roleTitle}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0 -mt-1 -mr-1">
              {app.jobUrl && (
                <a
                  href={app.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-40 hover:opacity-80 transition-opacity p-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <ExternalLink size={12} />
                </a>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="opacity-40 md:opacity-0 group-hover:opacity-40 hover:opacity-85! transition-opacity p-1 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <MoreVertical size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-[#2a3439] text-white border-2 border-dashed border-white/40 shadow-[2px_2px_0_rgba(0,0,0,0.4)] p-1 rounded-sm z-50"
                >
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingApp(app);
                    }}
                    className="cursor-pointer hover:bg-white/10 focus:bg-white/10 flex items-center gap-2 text-xs font-sketch text-white uppercase tracking-wider"
                  >
                    <Edit size={12} />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setContactsApp(app);
                    }}
                    className="cursor-pointer hover:bg-white/10 focus:bg-white/10 flex items-center gap-2 text-xs font-sketch text-white uppercase tracking-wider"
                  >
                    <Users size={12} />
                    <span>Contacts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isExecuting) deleteApp({ id: app.id });
                    }}
                    className="cursor-pointer text-red-400 hover:bg-white/10 focus:bg-white/10 hover:text-red-300 flex items-center gap-2 text-xs font-sketch uppercase tracking-wider"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className="text-xs px-2 py-0.5"
              style={{
                border: "1px dashed rgba(255,255,255,0.3)",
                borderRadius: "2px 4px 2px 4px",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-body, inherit)",
              }}
            >
              {SOURCE_LABELS[app.source] || app.source}
            </span>

            {app.salaryRange && (
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body, inherit)" }}
              >
                {app.salaryRange}
              </span>
            )}
          </div>

          {app.appliedDate && (
            <p
              className="text-xs mt-1.5"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body, inherit)" }}
              suppressHydrationWarning
            >
              {formatRelativeDate(app.appliedDate)}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
});
