import { DashboardHeaderStats } from "@/types/dashboard";
import { TrendingUp, Briefcase, Activity, Clock } from "lucide-react";
import { memo } from "react";

interface Props {
  stats: DashboardHeaderStats;
}

import { StatCard, StatCardProps } from "./StatCard";
export const HeaderStrip = memo(function HeaderStrip({ stats }: Props) {
  const rateColor =
    stats.responseRate >= 20 ? "#4ade80" : stats.responseRate >= 10 ? "#fcd34d" : "#f87171";

  const cards: StatCardProps[] = [
    {
      icon: Briefcase,
      label: "Total Applied",
      value: String(stats.totalApplied),
      sub: "all time applications",
      color: "#60a5fa",
      delay: 0,
    },
    {
      icon: Activity,
      label: "Active Pipeline",
      value: String(stats.activePipeline),
      sub: "not rejected or ghosted",
      color: "#4ade80",
      delay: 80,
    },
    {
      icon: TrendingUp,
      label: "Response Rate",
      value: `${stats.responseRate}%`,
      sub: stats.responseRate >= 10 ? "good — keep pushing" : "low — fix your resume",
      color: rateColor,
      delay: 160,
    },
    {
      icon: Clock,
      label: "Avg Days to Response",
      value: stats.avgDaysToResponse !== null ? `${stats.avgDaysToResponse}d` : "—",
      sub: stats.avgDaysToResponse !== null ? "from apply to first reply" : "no responses yet",
      color: "#c084fc",
      delay: 240,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
});
