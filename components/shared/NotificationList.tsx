"use client";

import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { formatDistanceToNow } from "@/utils/date";

import { getNotificationsAction } from "@/actions/notification/notification.actions";
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

export function NotificationList({ closeMenu }: { closeMenu: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const { execute: fetchNotifications, isExecuting: isFetching } = useAction(
    getNotificationsAction,
    {
      onSuccess: ({ data }) => {
        if (data) {
          setNotifications((prev) => {
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

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    fetchNotifications({ cursor: undefined, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchNotifications({ cursor, limit: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, isFetching, cursor]);

  if (notifications.length === 0 && !isFetching) {
    return (
      <div className="p-6 text-center text-sm font-body text-white/40">No notifications yet.</div>
    );
  }

  return (
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
          <Link key={notification.id} href={notification.link} onClick={closeMenu}>
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
  );
}
