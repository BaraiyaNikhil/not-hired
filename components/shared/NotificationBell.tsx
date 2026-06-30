"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { formatDistanceToNow } from "@/utils/date";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getNotificationsAction,
  getUnreadNotificationCountAction,
  markAllNotificationsAsReadAction,
} from "@/actions/notification/notification.actions";
import { NotificationType } from "@prisma/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  // Actions
  const { execute: fetchCount } = useAction(getUnreadNotificationCountAction, {
    onSuccess: ({ data }) => {
      if (typeof data === "number") setUnreadCount(data);
    },
  });

  const { execute: fetchNotifications, isExecuting: isFetching } = useAction(
    getNotificationsAction,
    {
      onSuccess: ({ data }) => {
        if (data) {
          setNotifications((prev) => {
            // Avoid duplicates
            const newIds = data.notifications.map((n) => n.id);
            const filteredPrev = prev.filter((n) => !newIds.includes(n.id));
            return [...filteredPrev, ...data.notifications];
          });
          setCursor(data.nextCursor);
          setHasMore(!!data.nextCursor);
        }
      },
    }
  );

  const { execute: markAsRead } = useAction(markAllNotificationsAsReadAction, {
    onSuccess: () => {
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    },
  });

  // Intersection Observer for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Initial load
  useEffect(() => {
    fetchCount();
    fetchNotifications({ cursor: undefined, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more when sentinel is in view
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchNotifications({ cursor, limit: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, isFetching, cursor]);

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

        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm font-body text-white/40">
            No notifications yet.
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notification) => {
              const content = (
                <div
                  className={`px-4 py-3 border-b border-dashed border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-white/3" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-sketch text-white/90 text-md">{notification.title}</span>
                    <span className="text-[10px] font-body text-white/40">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm font-body text-white/60">{notification.message}</p>
                </div>
              );

              return notification.link ? (
                <Link
                  key={notification.id}
                  href={notification.link}
                  onClick={() => setIsOpen(false)}
                >
                  {content}
                </Link>
              ) : (
                <div key={notification.id}>{content}</div>
              );
            })}

            {hasMore && (
              <div ref={ref} className="p-4 flex justify-center text-sm font-body text-white/40">
                {isFetching ? "Loading more..." : ""}
              </div>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
