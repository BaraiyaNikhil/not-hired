"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getUnreadNotificationCountAction,
  markAllNotificationsAsReadAction,
} from "@/actions/notification.actions";
import { NotificationList } from "./NotificationList";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Actions
  const { execute: fetchCount } = useAction(getUnreadNotificationCountAction, {
    onSuccess: ({ data }) => {
      if (typeof data === "number") setUnreadCount(data);
    },
  });

  const { execute: markAsRead } = useAction(markAllNotificationsAsReadAction, {
    onSuccess: () => {
      setUnreadCount(0);
    },
  });

  // Initial load
  useEffect(() => {
    fetchCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && unreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none">
          <Bell size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
          {unreadCount > 0 && (
            <span
              className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: "#f87171",
                color: "#0f0f14",
                border: "1.5px solid rgba(0,0,0,0.4)",
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 md:w-96 max-h-[400px] overflow-y-auto p-0 scrollbar-thin"
        style={{
          background: "var(--board-bg, #1a1a24)",
          border: "2px dashed rgba(255,255,255,0.15)",
        }}
      >
        <div className="sticky top-0 z-10 px-4 py-3 border-b border-dashed border-white/10 bg-[#1a1a24]/95 backdrop-blur">
          <h3 className="font-sketch chalk-text text-lg">Notifications</h3>
        </div>

        {/* The list will mount and fetch only when the dropdown is open */}
        {isOpen && <NotificationList closeMenu={() => setIsOpen(false)} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
