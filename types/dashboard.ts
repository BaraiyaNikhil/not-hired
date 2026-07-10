export interface DashboardHeaderStats {
  totalApplied: number;
  activePipeline: number;
  responseRate: number;
  avgDaysToResponse: number | null;
}

export interface PipelineFunnelStats {
  applied: number;
  screening: number;
  interview: number;
  offer: number;
}

export interface SourceBreakdownRow {
  source: string;
  applied: number;
  responses: number;
  responseRate: number;
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface StaleApplication {
  id: string;
  companyName: string;
  roleTitle: string;
  status: string;
  lastActivityDate: Date;
  daysSinceActivity: number;
  hasReminder: boolean;
}

export interface RecentActivityItem {
  id: string;
  applicationId: string;
  companyName: string;
  roleTitle: string;
  fromStatus: string | null;
  toStatus: string;
  createdAt: Date;
}

export interface UpcomingReminderItem {
  id: string;
  applicationId: string;
  companyName: string;
  roleTitle: string;
  message: string;
  dueDate: Date;
}

export interface AiInsight {
  id: string;
  type: "critical" | "warning" | "info";
  text: string;
  action: string;
}

export interface DashboardData {
  headerStats: DashboardHeaderStats;
  pipelineFunnel: PipelineFunnelStats;
  sourceBreakdown: SourceBreakdownRow[];
  heatmap: HeatmapDay[];
  staleApplications: StaleApplication[];
  recentActivity: RecentActivityItem[];
  upcomingReminders: UpcomingReminderItem[];
}

export type AiInsightType = "info" | "warning" | "critical";

export interface AiInsight {
  id: string;
  type: AiInsightType;
  text: string;
  action: string;
}

export interface InsightResponse {
  insights: AiInsight[];
  isLocked: boolean;
  generatedAt: string | null;
  refreshesToday: number;
}
