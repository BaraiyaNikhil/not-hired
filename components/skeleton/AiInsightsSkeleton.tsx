import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AiInsightsSkeleton = memo(function AiInsightsSkeleton() {
  return (
    <div className="chalk-card p-5 h-full flex flex-col gap-3 animate-pulse">
      {/* Header row */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-zinc-400/60" />
          <Skeleton className="h-3 w-40 bg-zinc-400/40" />
        </div>
        <Skeleton className="h-7 w-7 rounded-full bg-zinc-400/50" />
      </div>

      {/* Cards grid — mirrors InsightCard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="relative h-full flex flex-col gap-3 p-4 overflow-hidden"
            style={{
              border: "2px dashed rgba(255,255,255,0.1)",
              borderRadius: "4px 10px 4px 8px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* Label badge row */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-3 rounded-full bg-zinc-400/60 shrink-0" />
              <Skeleton className="h-2.5 w-14 bg-zinc-400/50" />
            </div>

            {/* Body lines */}
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-3 w-full bg-white/50" />
              <Skeleton className="h-3 w-5/6 bg-white/50" />
              <Skeleton className="h-3 w-4/6 bg-white/40" />
            </div>

            {/* Dashed divider + action line */}
            <div
              className="pt-2.5 space-y-1.5"
              style={{ borderTop: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <Skeleton className="h-2.5 w-3/4 bg-white/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
