import "server-only";
import { prisma } from "@/lib/db";
import { CreateFeatureFlagInput, UpdateFeatureFlagInput } from "@/types/feature_flag";

export function getAllFeatureFlags() {
  return prisma.featureFlag.findMany();
}

export async function getFeatureFlagByName(name: string) {
  return prisma.featureFlag.findUnique({
    where: { name },
  });
}

export async function toggleFeatureFlag(userId: string, data: UpdateFeatureFlagInput) {
  const featureFlag = await prisma.featureFlag.findUnique({
    where: { id: data.id },
  });

  const admin = await prisma.user.findUnique({ where: { id: userId, isAdmin: true } });

  if (!admin || !featureFlag) throw new Error("Unauthorized");

  return prisma.featureFlag.update({
    where: { id: data.id },
    data: {
      isEnabled: data.isEnabled,
    },
  });
}

export async function createFeatureFlag(userId: string, data: CreateFeatureFlagInput) {
  const admin = await prisma.user.findUnique({ where: { id: userId, isAdmin: true } });

  if (!admin) throw new Error("Unauthorized");

  return prisma.featureFlag.create({
    data: {
      name: data.name,
      description: data.description,
      isEnabled: data.isEnabled,
    },
  });
}

export async function deleteFeatureFlag(userId: string, id: string) {
  const featureFlag = await prisma.featureFlag.findUnique({
    where: { id },
  });

  const admin = await prisma.user.findUnique({ where: { id: userId, isAdmin: true } });

  if (!admin || !featureFlag) throw new Error("Unauthorized");

  return prisma.featureFlag.delete({ where: { id } });
}
