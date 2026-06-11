import "server-only";

import { prisma } from "@/lib/db";
import {
  CreateApplicationInput,
  UpdateApplicationInput,
  ChangeStatusInput,
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
    include: { contacts: true, reminders: true },
  });
  if (!app || app.userId !== userId) return null;
  return app;
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
    },
    include: { contacts: true },
  });
}

export async function updateApplication(userId: string, data: UpdateApplicationInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

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
    },
    include: { contacts: true },
  });
}

export async function updateApplicationStatus(userId: string, data: ChangeStatusInput) {
  const app = await prisma.application.findUnique({ where: { id: data.id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.application.update({
    where: { id: data.id },
    data: { status: data.status as ApplicationStatus },
  });
}

export async function deleteApplication(userId: string, id: string) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.application.delete({ where: { id } });
}
