"use client";

import { useDroppable } from "@dnd-kit/react";
import { KanbanCard } from "./KanbanCard";
import { AppWithContacts, KanbanColumn } from "@/types/kanban";
import { Plus, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useApplicationStore } from "@/store";
import { useState, useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import { useAction } from "next-safe-action/hooks";
import { loadMoreApplicationsAction } from "@/actions/application/application.actions";
import { toast } from "sonner";

interface KanbanColumnProps {
  column: KanbanColumn;
  apps: AppWithContacts[];
  totalCount: number;
}

export const KanbanColumnView = memo(function KanbanColumnView({
  column,
  apps,
  totalCount,
}: KanbanColumnProps) {
  // Attach droppable ref to the entire column wrapper so drag hover detects even when collapsed
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    type: "column",
    accept: "card",
  });

  const { setApplicationFormOpen, appendApplications } = useApplicationStore();

  // Collapse state for mobile only
  const [isOpen, setIsOpen] = useState(apps.length > 0);

  // Pagination state
  const [hasMore, setHasMore] = useState(apps.length >= 10);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: "50px",
  });

  const { execute: loadMore, isExecuting } = useAction(loadMoreApplicationsAction, {
    onSuccess: ({ data }) => {
      if (data) {
        appendApplications(data);
        if (data.length < 10) {
          setHasMore(false);
        }
      }
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Failed to load more applications");
    },
  });

  useEffect(() => {
    if (inView && hasMore && !isExecuting && apps.length > 0) {
      const cursorId = apps[apps.length - 1]?.id;
      if (cursorId) {
        loadMore({ status: column.id, cursorId });
      }
    }
  }, [inView, hasMore, isExecuting, apps, column.id, loadMore]);

  // Auto-expand on mobile when dragging a card over this column
  useEffect(() => {
    if (isDropTarget) {
      setIsOpen(true);
    }
  }, [isDropTarget]);

  return (
    <div
      ref={ref}
      className={`flex flex-col shrink-0 w-full md:w-auto md:min-w-0 xl:w-[260px] xl:min-w-[260px] transition-all duration-300 ${
        isOpen ? "h-[350px]" : "h-auto"
      } md:h-[42dvh] xl:h-[60dvh]`}
    >
      {/* Column header */}
      <div
        className={`flex items-center gap-2 px-1 transition-all duration-300 ${isOpen ? "mb-3" : "mb-0 md:mb-3"}`}
        style={{ borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 8 }}
      >
        <span className="text-lg">{column.emoji}</span>
        <span className="font-sketch chalk-text text-lg tracking-wide">{column.label}</span>

        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="text-sm font-mono"
            style={{
              color: "rgba(255,255,255,0.4)",
              border: "1px dashed rgba(255,255,255,0.25)",
              borderRadius: "2px",
              padding: "0 6px",
              fontFamily: "var(--font-body, inherit)",
            }}
          >
            {totalCount}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-white/10 rounded-sm text-white/50 hover:text-white transition-colors cursor-pointer md:hidden"
            title={isOpen ? "Collapse column" : "Expand column"}
          >
            {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`relative flex flex-col gap-3 rounded-sm overflow-hidden scroll-smooth transition-all duration-300 scrollbar-none ${
          isOpen
            ? "flex-1 py-2 px-1 border-2 opacity-100 overflow-y-auto"
            : "h-0 min-h-0 py-0 px-1 border-0 opacity-0 flex-none md:h-auto md:min-h-0 md:flex-1 md:py-2 md:border-2 md:opacity-100 md:overflow-y-auto"
        }`}
        style={{
          background: isDropTarget ? "rgba(255,255,255,0.06)" : column.color,
          borderColor: isDropTarget ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
          borderRadius: "3px 6px 4px 5px",
          borderStyle: "dashed",
        }}
      >
        <div
          className={`flex flex-col gap-3 h-full ${isOpen ? "visible" : "invisible md:visible"}`}
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
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-body, inherit)",
                }}
              >
                Drop here
              </p>
            </div>
          )}

          {/* Observer Element / Loading Indicator */}
          {hasMore && apps.length > 0 && (
            <div
              ref={inViewRef}
              className="flex items-center justify-center p-4 mt-2"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-body, inherit)",
              }}
            >
              {isExecuting ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-xs font-sketch tracking-wide">Drawing more...</span>
                </div>
              ) : (
                <div className="h-5" />
              )}
            </div>
          )}

          {/* Add card shortcut in Applied column */}
          {column.id === "applied" && apps.length === 0 && (
            <button
              onClick={() => setApplicationFormOpen(true)}
              className="absolute bottom-2 left-1 right-1 flex items-center justify-center gap-1 mt-1 hover:scale-[1.02] active:scale-[0.98] transition-transform"
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
