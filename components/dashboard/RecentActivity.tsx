import { RecentActivityItem } from "@/types/dashboard";
import { memo } from "react";
import { groupByDay } from "@/utils/dashboard";

interface Props {
  activity: RecentActivityItem[];
}

import { ActivityRow } from "./ActivityRow";

export const RecentActivity = memo(function RecentActivity({ activity }: Props) {
  const grouped = groupByDay(activity);

  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: "400ms" }}
    >
      <div>
        <h2 className="font-sketch chalk-text text-xl tracking-wide">Recent Activity</h2>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          your job hunt, live!
        </p>
      </div>

      {grouped.length === 0 ? (
        <p
          className="text-sm font-body py-4 text-center"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          No activity yet.
        </p>
      ) : (
        <div className="flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-background flex-1 max-h-80 pr-2 pb-2">
          {grouped.map(([label, items]) => (
            <div key={label}>
              <p
                className="text-xs font-body uppercase tracking-widest py-1"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  borderBottom: "1px dashed rgba(255,255,255,0.08)",
                }}
              >
                {label}
              </p>
              {items.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
