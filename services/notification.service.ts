import "server-only";

import { prisma } from "@/lib/db";
import { NotificationType } from "@prisma/client";

export async function getNotifications(userId: string, cursor?: string, limit: number = 10) {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (notifications.length > limit) {
    const nextItem = notifications.pop();
    nextCursor = nextItem?.id;
  }

  return {
    notifications,
    nextCursor,
  };
}

export async function getUnreadNotificationCount(userId: string) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

export async function markAllAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: NotificationType,
  link?: string
) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
      link,
    },
  });
}
