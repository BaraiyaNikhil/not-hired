import { prisma } from "@/lib/db";
import { CreateContactInput, UpdateContactInput } from "@/types/contact";

export async function createContact(userId: string, data: CreateContactInput) {
  const app = await prisma.application.findUnique({ where: { id: data.applicationId } });
  if (!app || app.userId !== userId) throw new Error("Unauthorized");

  return prisma.contact.create({
    data: {
      applicationId: data.applicationId,
      name: data.name,
      role: data.role,
      email: data.email,
      notes: data.notes,
    },
  });
}

export async function updateContact(userId: string, data: UpdateContactInput) {
  const contact = await prisma.contact.findUnique({
    where: { id: data.id },
    include: { application: true },
  });
  if (!contact || contact.application.userId !== userId) throw new Error("Unauthorized");

  return prisma.contact.update({
    where: { id: data.id },
    data: {
      name: data.name,
      role: data.role,
      email: data.email,
      notes: data.notes,
    },
  });
}

export async function deleteContact(userId: string, id: string) {
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: { application: true },
  });
  if (!contact || contact.application.userId !== userId) throw new Error("Unauthorized");

  return prisma.contact.delete({ where: { id } });
}
