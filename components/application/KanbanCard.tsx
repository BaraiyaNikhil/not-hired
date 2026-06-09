"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Edit, Trash2, Users, GripVertical, ExternalLink, MoreVertical } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteApplicationAction } from "@/actions/application/application.actions";
import { toast } from "sonner";
import { useApplicationStore } from "@/store";
import { AppWithContacts } from "@/types/kanban";
import { useSortable } from "@dnd-kit/react/sortable";

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

export function KanbanCard({ app, index, columnId }: KanbanCardProps) {
  const [showActions, setShowActions] = useState(false);
  const { setEditingApp, setContactsApp, deleteApplication } = useApplicationStore();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };
    if (showActions) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showActions]);

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

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setShowActions(true), 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setShowActions(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="kanban-card group relative rounded-sm"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "2px dashed rgba(255,255,255,0.35)",
          borderRadius: "2px 6px 3px 5px",
          padding: "12px 14px",
          cursor: isDragging ? "grabbing" : "grab",
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="md:hidden opacity-40 hover:opacity-80 transition-opacity p-1"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <MoreVertical size={14} />
              </button>
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

            {app.contacts.length > 0 && (
              <span
                className="text-xs flex items-center gap-1"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <Users size={10} />
                {app.contacts.length}
              </span>
            )}

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
              {new Date(app.appliedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Hover action buttons */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -5 }}
              transition={{ duration: 0.12 }}
              className="absolute top-8 lg:-top-8 lg:right-[28%] right-2 flex justify-end gap-1 z-30"
              style={{ transformOrigin: "top right" }}
            >
              <div
                className="flex items-center gap-1 px-2 py-1"
                style={{
                  background: "#2a3439",
                  border: "2px dashed rgba(255,255,255,0.5)",
                  borderRadius: "3px 6px 3px 5px",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingApp(app);
                  }}
                  className="chalk-action-btn"
                  title="Edit"
                >
                  <Edit size={13} />
                </button>
                <div
                  style={{
                    width: 1,
                    height: 14,
                    background: "rgba(255,255,255,0.2)",
                    margin: "0 2px",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContactsApp(app);
                  }}
                  className="chalk-action-btn"
                  title="Contacts"
                >
                  <Users size={13} />
                </button>
                <div
                  style={{
                    width: 1,
                    height: 14,
                    background: "rgba(255,255,255,0.2)",
                    margin: "0 2px",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExecuting) deleteApp({ id: app.id });
                  }}
                  className="chalk-action-btn"
                  style={{ color: "rgba(248,113,113,0.85)" }}
                  title="Delete"
                  disabled={isExecuting}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
