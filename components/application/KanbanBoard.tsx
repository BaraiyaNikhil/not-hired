"use client";

import { useEffect, useRef, useCallback, startTransition, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useApplicationStore } from "@/store";
import { changeApplicationStatusAction } from "@/actions/application/application.actions";
import { KanbanColumnView } from "./KanbanColumn";
import { AppWithContacts, KANBAN_COLUMNS } from "@/types/kanban";
import { Application } from "@prisma/client";
import { Plus } from "lucide-react";

interface KanbanBoardProps {
  initialApplications: AppWithContacts[];
}

export function KanbanBoard({ initialApplications }: KanbanBoardProps) {
  const storeApps = useApplicationStore((state) => state.applications);
  const setApplications = useApplicationStore((state) => state.setApplications);
  const moveApplication = useApplicationStore((state) => state.moveApplication);
  const setApplicationFormOpen = useApplicationStore((state) => state.setApplicationFormOpen);

  const [isHydrated, setIsHydrated] = useState(false);

  // Sync store with server data
  useEffect(() => {
    setApplications(initialApplications);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, [initialApplications, setApplications]);

  const applications = isHydrated ? storeApps : initialApplications;

  const previousApplications = useRef(applications);

  const { execute: changeStatus } = useAction(changeApplicationStatusAction, {
    onSuccess: ({ input }) => {
      toast.success("Status updated", { id: `status-update-${input.id}` });
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Failed to update status");
      // Revert optimistic move on server error
      setApplications(previousApplications.current);
    },
  });

  const handleDragStart = useCallback(() => {
    previousApplications.current = applications;
  }, [applications]);

  const handleDragOver = useCallback(
    (event: {
      operation: {
        source: { id: string | number } | null;
        target: { id: string | number; sortable?: { group: string } } | null;
      };
    }) => {
      const { source, target } = event.operation;
      if (!source || !target) return;

      const cardId = String(source.id);
      const newStatus = (
        target.sortable ? String(target.sortable.group) : String(target.id)
      ) as Application["status"];

      if (!newStatus || !KANBAN_COLUMNS.find((c) => c.id === newStatus)) return;

      // startTransition defers the update outside useInsertionEffect's phase
      // so React doesn't warn, and the card still moves immediately.
      startTransition(() => moveApplication(cardId, newStatus));
    },
    [moveApplication]
  );

  const handleDragEnd = useCallback(
    (event: {
      operation: {
        source: { id: string | number } | null;
        target: { id: string | number; sortable?: { group: string } } | null;
      };
      canceled?: boolean;
    }) => {
      const { operation, canceled } = event;

      if (canceled) {
        startTransition(() => setApplications(previousApplications.current));
        return;
      }

      if (!operation.source || !operation.target) return;

      const cardId = String(operation.source.id);
      const newStatus = (
        operation.target.sortable
          ? String(operation.target.sortable.group)
          : String(operation.target.id)
      ) as Application["status"];

      if (!newStatus || !KANBAN_COLUMNS.find((c) => c.id === newStatus)) return;

      const previousApp = previousApplications.current.find((a) => a.id === cardId);
      if (previousApp && previousApp.status === newStatus) {
        return; // Don't call changeStatus if the status is the same
      }

      // Persist to DB — optimistic move already happened in onDragOver
      startTransition(() => changeStatus({ id: cardId, status: newStatus }));
    },
    [changeStatus, setApplications]
  );

  const columnApps = (colId: Application["status"]) =>
    applications.filter((a) => a.status === colId);

  return (
    <div className="flex flex-col h-full">
      {/* Board header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
        <div>
          <h1 className="font-sketch text-3xl md:text-5xl chalk-text tracking-wide">
            Applications
          </h1>
          <p
            className="mt-1 text-xs md:text-sm"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body, inherit)" }}
          >
            {applications.length} application{applications.length !== 1 ? "s" : ""} tracked
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setApplicationFormOpen(true)}
          className="chalk-button flex items-center justify-center gap-2 px-3 py-2 md:px-4 font-sketch text-base md:text-lg chalk-text"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Application</span>
        </motion.button>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto scrollbar-none">
        <DragDropProvider
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row gap-5 h-full xl:min-w-max">
            {KANBAN_COLUMNS.map((col) => (
              <KanbanColumnView key={col.id} column={col} apps={columnApps(col.id)} />
            ))}
          </div>
        </DragDropProvider>
      </div>
    </div>
  );
}
