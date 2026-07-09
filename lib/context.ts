import { prisma } from "@/lib/db";
import { differenceInDays } from "@/utils/date";

export type UserContext = {
  totalApplications: number;
  responseRate: number;
  sourceBreakdown: Record<string, number>;
  stageBreakdown: Record<string, number>;
  avgDaysToFirstResponse: number;
  followUpRate: number;
  referralResponseRate: number | null;
  weeklyApplicationRate: number;
  oldestPendingApplication: { company: string; daysAgo: number } | null;
  upcomingInterviews: { company: string; role: string; date: string }[] | null;
};

export const buildUserContext = async (userId: string): Promise<UserContext> => {
  const apps = await prisma.application.findMany({
    where: { userId },
    include: { reminders: true },
  });

  const total = apps.length;
  const responded = apps.filter((a) =>
    ["screening", "interview", "offer", "rejected"].includes(a.status)
  ).length;

  const sourceBreakdown = apps.reduce(
    (acc, app) => {
      acc[app.source] = (acc[app.source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const stageBreakdown = apps.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const referralApps = apps.filter((a) => a.source === "referral");
  const referralResponded = referralApps.filter((a) =>
    ["screening", "interview", "offer"].includes(a.status)
  ).length;

  const pending = apps
    .filter((a) => a.status === "applied")
    .sort(
      (a, b) =>
        new Date(a.appliedDate || a.createdAt).getTime() -
        new Date(b.appliedDate || b.createdAt).getTime()
    );

  const oldest = pending[0];

  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const recentApps = apps.filter((a) => new Date(a.appliedDate || a.createdAt) > fourWeeksAgo);

  return {
    totalApplications: total,
    responseRate: total > 0 ? Math.round((responded / total) * 100) : 0,
    sourceBreakdown,
    stageBreakdown,
    avgDaysToFirstResponse: 0,
    followUpRate: 0,
    referralResponseRate:
      referralApps.length > 0 ? Math.round((referralResponded / referralApps.length) * 100) : null,
    weeklyApplicationRate: Math.round(recentApps.length / 4),
    oldestPendingApplication: oldest
      ? {
          company: oldest.companyName,
          daysAgo: differenceInDays(new Date(), new Date(oldest.appliedDate || oldest.createdAt)),
        }
      : null,
    upcomingInterviews: null,
  };
};
