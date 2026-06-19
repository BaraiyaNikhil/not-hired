import "server-only";

import { prisma } from "@/lib/db";
import {
  CreateApplicationInput,
  UpdateApplicationInput,
  ChangeStatusInput,
  SearchApplicationsInput,
} from "@/types/application";
import { ApplicationStatus, ApplicationSource } from "@prisma/client";

export async function getApplications(userId: string) {
  return prisma.application.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: { contacts: true },
  });
}

export async function getApplicationById(userId: string, id: string) {
  const app = await prisma.application.findUnique({
    where: { id },
    include: {
      contacts: true,
      reminders: true,
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
  return prisma.application.create({
    data: {
      userId,
      companyName: data.companyName,
      roleTitle: data.roleTitle,
      status: data.status as ApplicationStatus,
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
          toStatus: (data.status as ApplicationStatus) ?? "applied",
        },
      },
    },
    include: { contacts: true },
  });
}

export async function updateApplication(userId: string, data: UpdateApplicationInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  const needsStatusLog = data.status && data.status !== app.status;

  return prisma.application.update({
    where: { id: data.id },
    data: {
      companyName: data.companyName,
      roleTitle: data.roleTitle,
      status: data.status as ApplicationStatus,
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
      ...(needsStatusLog
        ? {
            statusLogs: {
              create: {
                fromStatus: app.status,
                toStatus: data.status as ApplicationStatus,
              },
            },
          }
        : {}),
    },
    include: { contacts: true },
  });
}

export async function updateApplicationStatus(userId: string, data: ChangeStatusInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.application.update({
    where: { id: data.id },
    data: {
      status: data.status as ApplicationStatus,
      statusLogs: {
        create: {
          fromStatus: app.status,
          toStatus: data.status as ApplicationStatus,
        },
      },
    },
  });
}

export async function deleteApplication(userId: string, id: string) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.application.delete({ where: { id } });
}
