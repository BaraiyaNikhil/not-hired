"use client";

import { memo, useEffect } from "react";
import { InsightCard } from "./InsightCard";
import { useInsightStore } from "@/store/insight.store";
import { fetchInsightsAction, refreshInsightsAction } from "@/actions/ai/nudges.action";
import { AiInsightsSkeleton } from "@/components/skeleton/AiInsightsSkeleton";
import { RefreshCw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { InsightsLockedState } from "./InsightsLockedState";

export const AiInsights = memo(function AiInsights() {
  const { insights, isLocked, refreshesToday, isLoading, setInsightsData, setLoading } =
    useInsightStore();

  const { execute: fetchInsights } = useAction(fetchInsightsAction, {
    onSuccess: ({ data }) => {
      if (data) {
        setInsightsData(data);
      }
    },
    onError: () => {
      toast.error("Failed to load AI insights.");
      setLoading(false);
    },
  });

  const { execute: refreshInsights, isExecuting: isRefreshing } = useAction(refreshInsightsAction, {
    onSuccess: ({ data }) => {
      if (data) {
        setInsightsData(data);
        toast.success("AI Insights refreshed!");
      }
    },
    onError: () => {
      toast.error("Failed to refresh AI insights.");
    },
  });

  useEffect(() => {
    // Only fetch if we haven't loaded them yet
    if (isLoading && !isLocked && insights.length === 0) {
      fetchInsights();
    }
  }, [isLoading, insights.length, isLocked, fetchInsights]);

  if (isLoading && !isLocked && insights.length === 0) {
    return <AiInsightsSkeleton />;
  }

  if (isLocked) {
    return <InsightsLockedState />;
  }

  const maxRefreshes = 3; // From env, but we can hardcode the display limit
  const refreshesLeft = Math.max(0, maxRefreshes - refreshesToday);

  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up relative"
      style={{ animationDelay: "400ms" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-sketch chalk-text text-xl tracking-wide">AI Insights</h2>
          <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            brutally honest feedback
          </p>
        </div>

        <button
          onClick={() => refreshInsights()}
          disabled={isRefreshing || refreshesLeft === 0}
          className="group relative flex items-center justify-center p-2 rounded-full hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={
            refreshesLeft === 0
              ? "No refreshes left today"
              : `Refresh Insights (${refreshesLeft} left)`
          }
        >
          <RefreshCw
            size={16}
            className={`text-zinc-400 ${isRefreshing ? "animate-spin" : "group-hover:text-white transition-colors"}`}
          />

          {/* Tooltip */}
          <span className="absolute -top-8 right-0 w-max bg-zinc-800 text-xs text-zinc-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {refreshesLeft} refreshes left
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-2">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
        {insights.length === 0 && !isRefreshing && (
          <p className="text-sm text-zinc-500 col-span-3 text-center py-4">
            No insights available right now.
          </p>
        )}
      </div>

      {isRefreshing && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center rounded-lg z-10">
          <RefreshCw size={24} className="text-white animate-spin" />
        </div>
      )}
    </div>
  );
});
