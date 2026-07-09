"use server";

import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllAsRead,
} from "@/services/notification.service";

const getNotificationsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional().default(10),
});

export const getNotificationsAction = authActionClient
  .inputSchema(getNotificationsSchema)
  .action(async ({ parsedInput, ctx }) => {
    return getNotifications(ctx.user.id, parsedInput.cursor, parsedInput.limit);
  });

export const getUnreadNotificationCountAction = authActionClient.action(async ({ ctx }) => {
  return getUnreadNotificationCount(ctx.user.id);
});

export const markAllNotificationsAsReadAction = authActionClient.action(async ({ ctx }) => {
  return markAllAsRead(ctx.user.id);
});
