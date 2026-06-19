import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import * as dashboardService from "@/services/dashboard.service";
import { HeaderStrip } from "@/components/dashboard/HeaderStrip";
import { PipelineFunnel } from "@/components/dashboard/PipelineFunnel";
import { SourceBreakdown } from "@/components/dashboard/SourceBreakdown";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { StaleApplications } from "@/components/dashboard/StaleApplications";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingReminders } from "@/components/dashboard/UpcomingReminders";
import { AiInsights } from "@/components/dashboard/AiInsights";
import { AiMentorComingSoon } from "@/components/dashboard/AiMentorComingSoon";
import FeatureGuard from "@/components/shared/FeatureGuard";

export const metadata = {
  title: "Dashboard — NotHired",
  description: "Brutally honest stats on your job search pipeline.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const userId = user.id;

  const [
    headerStats,
    pipelineFunnel,
    sourceBreakdown,
    heatmap,
    staleApplications,
    recentActivity,
    upcomingReminders,
  ] = await Promise.all([
    dashboardService.getDashboardHeaderStats(userId),
    dashboardService.getPipelineFunnelStats(userId),
    dashboardService.getSourceBreakdownStats(userId),
    dashboardService.getActivityHeatmapStats(userId),
    dashboardService.getStaleApplications(userId),
    dashboardService.getRecentActivity(userId),
    dashboardService.getUpcomingReminders(userId),
  ]);

  return (
    <div className="box-border px-4 md:px-6 lg:px-8 py-6 space-y-5">
      {/* Page title */}
      <div className="animate-fade-in-up">
        <h1 className="font-sketch chalk-text text-4xl md:text-5xl tracking-wide">Dashboard</h1>
        <p className="text-sm font-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          your job hunt, brutally honest.
        </p>
      </div>

      {/* ① Header Strip — 4 key numbers */}
      <HeaderStrip stats={headerStats} />

      {/* Top row: Funnel, Stale, Reminders (Equal space) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="h-full lg:col-span-1">
          <PipelineFunnel stats={pipelineFunnel} />
        </div>
        <div className="h-full lg:col-span-1">
          <StaleApplications applications={staleApplications} />
        </div>
        <div className="h-full md:col-span-2 lg:col-span-1">
          <UpcomingReminders reminders={upcomingReminders} />
        </div>
      </div>

      {/* Second row: Source (60%) + Recent (40%) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 max">
        <div className="lg:col-span-3 h-full">
          <SourceBreakdown rows={sourceBreakdown} />
        </div>
        <div className="lg:col-span-2 h-full">
          <RecentActivity activity={recentActivity} />
        </div>
      </div>

      {/* Third row: Heatmap (Full width) */}
      <div className="w-full">
        <ActivityHeatmap days={heatmap} />
      </div>

      {/* Fourth row: AI Insights (1 row with 3 cards) */}
      <div className="w-full pb-6">
        <FeatureGuard featureName="ai-insights" fallback={<AiMentorComingSoon />}>
          <AiInsights />
        </FeatureGuard>
      </div>
    </div>
  );
}
