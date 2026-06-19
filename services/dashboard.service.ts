import "server-only";

import { prisma } from "@/lib/db";
import {
  DashboardHeaderStats,
  PipelineFunnelStats,
  SourceBreakdownRow,
  HeatmapDay,
  StaleApplication,
  RecentActivityItem,
  UpcomingReminderItem,
} from "@/types/dashboard";

const ACTIVE_STATUSES = ["applied", "screening", "interview"] as const;
const RESPONDED_STATUSES = ["screening", "interview", "offer", "rejected"] as const;
const FUNNEL_STATUSES = ["applied", "screening", "interview", "offer"] as const;

function formatSource(source: string): string {
  const map: Record<string, string> = {
    linkedin: "LinkedIn",
    referral: "Referral",
    cold_email: "Cold Email",
    job_portal: "Job Portal",
    other: "Other",
  };
  return map[source] ?? source;
}

export async function getDashboardHeaderStats(userId: string): Promise<DashboardHeaderStats> {
  const [totalApplied, activePipeline, respondedCount, avgDaysRaw] = await Promise.all([
    // Total Applied
    prisma.application.count({ where: { userId } }),

    // Active Pipeline: not rejected, ghosted, or offer
    prisma.application.count({
      where: { userId, status: { in: [...ACTIVE_STATUSES] } },
    }),

    // Responded: moved past "applied"
    prisma.application.count({
      where: { userId, status: { in: [...RESPONDED_STATUSES] } },
    }),

    // Avg days to first response: avg of (first statusLog after initial - appliedDate)
    prisma.$queryRaw<{ avg_days: number | null }[]>`
      SELECT AVG(EXTRACT(EPOCH FROM (first_log.created_at - a.applied_date)) / 86400) AS avg_days
      FROM applications a
      INNER JOIN LATERAL (
        SELECT sl.created_at
        FROM application_status_logs sl
        WHERE sl.application_id = a.id
          AND sl.from_status = 'applied'
        ORDER BY sl.created_at ASC
        LIMIT 1
      ) first_log ON true
      WHERE a.user_id = ${userId}
        AND a.applied_date IS NOT NULL
    `,
  ]);

  const total = totalApplied;
  const responseRate = total > 0 ? (respondedCount / total) * 100 : 0;
  const avgDays = avgDaysRaw[0]?.avg_days ?? null;

  return {
    totalApplied: total,
    activePipeline,
    responseRate: Math.round(responseRate * 10) / 10,
    avgDaysToResponse: avgDays !== null ? Math.round(avgDays * 10) / 10 : null,
  };
}

export async function getPipelineFunnelStats(userId: string): Promise<PipelineFunnelStats> {
  const counts = await prisma.application.groupBy({
    by: ["status"],
    where: { userId, status: { in: [...FUNNEL_STATUSES] } },
    _count: { status: true },
  });

  const map = Object.fromEntries(counts.map((c) => [c.status, c._count.status]));

  return {
    applied: map["applied"] ?? 0,
    screening: map["screening"] ?? 0,
    interview: map["interview"] ?? 0,
    offer: map["offer"] ?? 0,
  };
}

export async function getSourceBreakdownStats(userId: string): Promise<SourceBreakdownRow[]> {
  const allApps = await prisma.application.findMany({
    where: { userId },
    select: { source: true, status: true },
  });

  const sourceMap: Record<string, { applied: number; responses: number }> = {};

  for (const app of allApps) {
    const src = app.source;
    if (!sourceMap[src]) sourceMap[src] = { applied: 0, responses: 0 };
    sourceMap[src].applied++;
    if (RESPONDED_STATUSES.includes(app.status as (typeof RESPONDED_STATUSES)[number])) {
      sourceMap[src].responses++;
    }
  }

  return Object.entries(sourceMap)
    .map(([source, { applied, responses }]) => ({
      source: formatSource(source),
      applied,
      responses,
      responseRate: applied > 0 ? Math.round((responses / applied) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.responseRate - a.responseRate);
}

export async function getActivityHeatmapStats(userId: string): Promise<HeatmapDay[]> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const apps = await prisma.application.findMany({
    where: {
      userId,
      appliedDate: { gte: thirtyDaysAgo },
    },
    select: { appliedDate: true },
  });

  // Build a full 30-day grid of zeroes
  const heatmapMap: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().split("T")[0];
    heatmapMap[key] = 0;
  }

  for (const app of apps) {
    if (!app.appliedDate) continue;
    const key = app.appliedDate.toISOString().split("T")[0];
    if (key in heatmapMap) heatmapMap[key]++;
  }

  return Object.entries(heatmapMap).map(([date, count]) => ({ date, count }));
}

export async function getStaleApplications(userId: string): Promise<StaleApplication[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const apps = await prisma.application.findMany({
    where: {
      userId,
      status: { in: [...ACTIVE_STATUSES] },
      lastActivityDate: { lte: sevenDaysAgo },
    },
    include: {
      reminders: {
        where: { isDone: false },
        select: { id: true },
        take: 1,
      },
    },
    orderBy: { lastActivityDate: "asc" },
    take: 10,
  });

  const now = Date.now();
  return apps.map((app) => {
    const daysSince = Math.floor((now - app.lastActivityDate.getTime()) / 86_400_000);
    return {
      id: app.id,
      companyName: app.companyName,
      roleTitle: app.roleTitle,
      status: app.status,
      lastActivityDate: app.lastActivityDate,
      daysSinceActivity: daysSince,
      hasReminder: app.reminders.length > 0,
    };
  });
}

export async function getRecentActivity(userId: string): Promise<RecentActivityItem[]> {
  const logs = await prisma.applicationStatusLog.findMany({
    where: { application: { userId } },
    include: {
      application: { select: { companyName: true, roleTitle: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return logs.map((log) => ({
    id: log.id,
    applicationId: log.applicationId,
    companyName: log.application.companyName,
    roleTitle: log.application.roleTitle,
    fromStatus: log.fromStatus,
    toStatus: log.toStatus,
    createdAt: log.createdAt,
  }));
}

export async function getUpcomingReminders(userId: string): Promise<UpcomingReminderItem[]> {
  const reminders = await prisma.reminder.findMany({
    where: { userId, isDone: false },
    include: {
      application: { select: { companyName: true, roleTitle: true } },
    },
    orderBy: { dueDate: "asc" },
    take: 5,
  });

  return reminders.map((r) => ({
    id: r.id,
    applicationId: r.applicationId,
    companyName: r.application.companyName,
    roleTitle: r.application.roleTitle,
    message: r.message,
    dueDate: r.dueDate,
  }));
}
