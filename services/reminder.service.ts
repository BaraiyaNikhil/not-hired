import "server-only";

import { prisma } from "@/lib/db";
import { ReminderWithApplication } from "@/types/reminder";
import { endOfDay, addDays } from "@/utils/date";

const reminderInclude = {
  application: {
    select: {
      id: true,
      companyName: true,
      roleTitle: true,
      status: true,
    },
  },
} as const;

export async function getTodayReminders(userId: string, cursor?: string, limit = 10) {
  const todayEnd = endOfDay(new Date());

  const items = await prisma.reminder.findMany({
    where: {
      userId,
      isDone: false,
      dueDate: { lte: todayEnd },
    },
    include: reminderInclude,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { dueDate: "asc" },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem?.id;
  }

  return { items: items as ReminderWithApplication[], nextCursor };
}

export async function getUpcomingReminders(userId: string, cursor?: string, limit = 10) {
  const now = new Date();
  const todayEnd = endOfDay(now);
  const sevenDaysOut = endOfDay(addDays(now, 7));

  const items = await prisma.reminder.findMany({
    where: {
      userId,
      isDone: false,
      dueDate: { gt: todayEnd, lte: sevenDaysOut },
    },
    include: reminderInclude,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { dueDate: "asc" },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem?.id;
  }

  return { items: items as ReminderWithApplication[], nextCursor };
}

export async function getCompletedReminders(userId: string, cursor?: string, limit = 10) {
  const items = await prisma.reminder.findMany({
    where: {
      userId,
      isDone: true,
    },
    include: reminderInclude,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { doneAt: "desc" },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem?.id;
  }

  return { items: items as ReminderWithApplication[], nextCursor };
}

export async function getTodayReminderCount(userId: string): Promise<number> {
  const todayEnd = endOfDay(new Date());

  return prisma.reminder.count({
    where: {
      userId,
      isDone: false,
      dueDate: { lte: todayEnd },
    },
  });
}

export async function createReminder(
  userId: string,
  data: { applicationId: string; message: string; dueDate: Date }
) {
  // Verify ownership
  const app = await prisma.application.findUnique({ where: { id: data.applicationId } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.reminder.create({
    data: {
      userId,
      applicationId: data.applicationId,
      message: data.message,
      dueDate: data.dueDate,
      trigger: "MANUAL",
    },
  });
}

export async function markReminderDone(userId: string, id: string) {
  const reminder = await prisma.reminder.findUnique({ where: { id } });
  if (!reminder || reminder.userId !== userId) throw new Error("Unauthorized");

  return prisma.reminder.update({
    where: { id },
    data: { isDone: true, doneAt: new Date() },
  });
}

export async function getDueRemindersForDigest() {
  const todayEnd = endOfDay(new Date());

  const reminders = await prisma.reminder.findMany({
    where: {
      isDone: false,
      digestSent: false,
      dueDate: { lte: todayEnd },
    },
    include: {
      application: {
        select: { companyName: true, roleTitle: true },
      },
      user: {
        select: { id: true, email: true, name: true },
      },
    },
    orderBy: { dueDate: "asc" },
  });

  return reminders;
}

export async function markDigestSent(ids: string[]) {
  return prisma.reminder.updateMany({
    where: { id: { in: ids } },
    data: { digestSent: true, digestSentAt: new Date() },
  });
}
