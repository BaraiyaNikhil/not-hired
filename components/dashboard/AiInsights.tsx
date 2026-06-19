import { memo } from "react";
import { AI_INSIGHTS_DATA } from "@/data/dashboard/ai-insights.data";
import { InsightCard } from "./InsightCard";

export const AiInsights = memo(function AiInsights() {
  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: "400ms" }}
    >
      <div>
        <h2 className="font-sketch chalk-text text-xl tracking-wide">AI Insights</h2>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          brutally honest feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-2">
        {AI_INSIGHTS_DATA.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
});
