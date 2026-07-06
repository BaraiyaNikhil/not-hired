import "server-only";

import { prisma } from "@/lib/db";
import {
  CreateApplicationInput,
  UpdateApplicationInput,
  ChangeStatusInput,
  SearchApplicationsInput,
} from "@/types/application";
import { ApplicationStatus, ApplicationSource, ReminderTrigger } from "@prisma/client";
import { addDays } from "@/utils/date";

type AutoReminderConfig = {
  days: number;
  message: string;
  trigger: ReminderTrigger;
};

const AUTO_REMINDER_MAP: Partial<Record<ApplicationStatus, AutoReminderConfig>> = {
  applied: {
    days: 7,
    message: "No response in 7 days. Follow up or move on.",
    trigger: "AUTO_APPLIED",
  },
  screening: {
    days: 3,
    message: "Send a thank you email to your recruiter.",
    trigger: "AUTO_SCREENING",
  },
  interview: {
    days: 2,
    message: "Send post-interview thank you note.",
    trigger: "AUTO_INTERVIEW",
  },
  offer: {
    days: 5,
    message: "Offer deadline approaching. Have you decided?",
    trigger: "AUTO_OFFER",
  },
};

export async function getApplicationCounts(userId: string) {
  const grouped = await prisma.application.groupBy({
    by: ["status"],
    where: { userId },
    _count: true,
  });

  const counts: Record<string, number> = {};
  let total = 0;

  grouped.forEach((group) => {
    counts[group.status] = group._count;
    total += group._count;
  });

  return { total, counts };
}

export async function getApplications(userId: string) {
  const statuses: ApplicationStatus[] = [
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "ghosted",
  ];

  const results = await Promise.all(
    statuses.map((status) =>
      prisma.application.findMany({
        where: { userId, status },
        orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
        take: 10,
        include: { contacts: true },
      })
    )
  );

  return results.flat();
}

export async function getMoreApplications(
  userId: string,
  status: ApplicationStatus,
  cursorId: string
) {
  return prisma.application.findMany({
    where: { userId, status },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: 10,
    skip: 1, // skip the cursor record
    cursor: { id: cursorId },
    include: { contacts: true },
  });
}

export async function getApplicationById(userId: string, id: string) {
  const app = await prisma.application.findUnique({
    where: { id },
    include: {
      contacts: true,
      reminders: {
        where: { isDone: false },
        orderBy: { dueDate: "asc" },
      },
      statusLogs: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!app || app.userId !== userId) return null;
  return app;
}

export async function searchApplications(userId: string, data: SearchApplicationsInput) {
  const { query } = data;
  return prisma.application.findMany({
    where: {
      userId,
      ...(query.length > 0
        ? {
            OR: [
              { companyName: { contains: query, mode: "insensitive" } },
              { roleTitle: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      companyName: true,
      roleTitle: true,
      status: true,
      updatedAt: true,
    },
    take: 20,
  });
}

export async function createApplication(userId: string, data: CreateApplicationInput) {
  const initialStatus = (data.status as ApplicationStatus) ?? "applied";
  const autoConfig = AUTO_REMINDER_MAP[initialStatus];

  return prisma.$transaction(async (tx) => {
    const app = await tx.application.create({
      data: {
        userId,
        companyName: data.companyName,
        roleTitle: data.roleTitle,
        status: initialStatus,
        source: data.source as ApplicationSource,
        appliedDate: data.appliedDate ? new Date(data.appliedDate) : null,
        salaryRange: data.salaryRange,
        jobUrl: data.jobUrl,
        notes: data.notes,
        contacts:
          data.contacts && data.contacts.length > 0
            ? {
                create: data.contacts.map((c) => ({
                  name: c.name,
                  role: c.role,
                  email: c.email,
                  mobile: c.mobile,
                  notes: c.notes,
                })),
              }
            : undefined,
        statusLogs: {
          create: {
            fromStatus: null,
            toStatus: initialStatus,
          },
        },
      },
      include: { contacts: true },
    });

    if (autoConfig) {
      await tx.reminder.create({
        data: {
          userId,
          applicationId: app.id,
          message: autoConfig.message,
          dueDate: addDays(new Date(), autoConfig.days),
          trigger: autoConfig.trigger,
        },
      });
    }

    return app;
  });
}

export async function updateApplication(userId: string, data: UpdateApplicationInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  const newStatus = data.status as ApplicationStatus;
  const statusChanged = data.status && newStatus !== app.status;
  const autoConfig = statusChanged ? AUTO_REMINDER_MAP[newStatus] : undefined;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.application.update({
      where: { id: data.id },
      data: {
        companyName: data.companyName,
        roleTitle: data.roleTitle,
        status: newStatus,
        source: data.source as ApplicationSource,
        appliedDate: data.appliedDate ? new Date(data.appliedDate) : null,
        salaryRange: data.salaryRange,
        jobUrl: data.jobUrl,
        notes: data.notes,
        contacts: {
          deleteMany: {},
          create:
            data.contacts?.map((c) => ({
              name: c.name,
              role: c.role,
              email: c.email,
              mobile: c.mobile,
              notes: c.notes,
            })) || [],
        },
        ...(statusChanged
          ? {
              statusLogs: {
                create: {
                  fromStatus: app.status,
                  toStatus: newStatus,
                },
              },
            }
          : {}),
      },
      include: { contacts: true },
    });

    if (statusChanged) {
      await tx.reminder.updateMany({
        where: {
          applicationId: data.id,
          isDone: false,
          trigger: { not: "MANUAL" },
        },
        data: { isDone: true, doneAt: new Date() },
      });

      if (autoConfig) {
        await tx.reminder.create({
          data: {
            userId,
            applicationId: data.id,
            message: autoConfig.message,
            dueDate: addDays(new Date(), autoConfig.days),
            trigger: autoConfig.trigger,
          },
        });
      }
    }

    return updated;
  });
}

export async function updateApplicationStatus(userId: string, data: ChangeStatusInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  const newStatus = data.status as ApplicationStatus;
  const autoConfig = AUTO_REMINDER_MAP[newStatus];

  return prisma.$transaction(async (tx) => {
    const updated = await tx.application.update({
      where: { id: data.id },
      data: {
        status: newStatus,
        statusLogs: {
          create: {
            fromStatus: app.status,
            toStatus: newStatus,
          },
        },
      },
    });

    await tx.reminder.updateMany({
      where: {
        applicationId: data.id,
        isDone: false,
        trigger: { not: "MANUAL" },
      },
      data: { isDone: true, doneAt: new Date() },
    });

    if (autoConfig) {
      await tx.reminder.create({
        data: {
          userId,
          applicationId: data.id,
          message: autoConfig.message,
          dueDate: addDays(new Date(), autoConfig.days),
          trigger: autoConfig.trigger,
        },
      });
    }

    return updated;
  });
}

export async function deleteApplication(userId: string, id: string) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.application.delete({ where: { id } });
}
