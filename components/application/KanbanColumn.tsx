"use client";

import { useDroppable } from "@dnd-kit/react";
import { motion } from "motion/react";
import { KanbanCard } from "./KanbanCard";
import { AppWithContacts, KanbanColumn } from "@/types/kanban";
import { Plus } from "lucide-react";
import { useApplicationStore } from "@/store";

interface KanbanColumnProps {
  column: KanbanColumn;
  apps: AppWithContacts[];
}

export function KanbanColumnView({ column, apps }: KanbanColumnProps) {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    type: "column",
    accept: "card",
  });

  const { setApplicationFormOpen } = useApplicationStore();

  return (
    <div className="flex flex-col shrink-0 w-full md:w-[260px] md:min-w-[260px]">
      {/* Column header */}
      <div
        className="flex items-center gap-2 mb-3 px-1"
        style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 8 }}
      >
        <span className="text-lg">{column.emoji}</span>
        <span className="font-sketch chalk-text text-lg tracking-wide">{column.label}</span>
        <span
          className="ml-auto text-sm font-mono"
          style={{
            color: "rgba(255,255,255,0.4)",
            border: "1px dashed rgba(255,255,255,0.25)",
            borderRadius: "2px",
            padding: "0 6px",
            fontFamily: "var(--font-body, inherit)",
          }}
        >
          {apps.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={ref}
        className="flex-1 flex flex-col gap-3 min-h-[250px] rounded-sm transition-all duration-200"
        style={{
          padding: "8px 4px",
          background: isDropTarget ? "rgba(255,255,255,0.06)" : column.color,
          border: isDropTarget
            ? "2px dashed rgba(255,255,255,0.5)"
            : "2px dashed rgba(255,255,255,0.12)",
          borderRadius: "3px 6px 4px 5px",
          minHeight: 250,
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {apps.map((app, index) => (
          <KanbanCard key={app.id} app={app} index={index} columnId={column.id} />
        ))}

        {apps.length === 0 && (
          <div
            className="flex flex-col items-center justify-center flex-1 gap-2"
            style={{ minHeight: 80 }}
          >
            <p
              className="text-xs text-center"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body, inherit)" }}
            >
              Drop here
            </p>
          </div>
        )}

        {/* Add card shortcut in Applied column */}
        {column.id === "applied" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setApplicationFormOpen(true)}
            className="flex items-center justify-center gap-1 w-full mt-1"
            style={{
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: "2px 5px 3px 4px",
              padding: "6px",
              color: "rgba(255,255,255,0.3)",
              background: "transparent",
              fontFamily: "var(--font-body, inherit)",
              fontSize: 12,
              cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <Plus size={12} />
            Add application
          </motion.button>
        )}
      </div>
    </div>
  );
}
