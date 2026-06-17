import { PipelineFunnelStats } from "@/types/dashboard";
import { memo } from "react";
import { Send, FileSearchIcon, MessageSquareIcon, PartyPopper } from "lucide-react";
import { getDropOff } from "@/utils/dashboard";

interface Props {
  stats: PipelineFunnelStats;
}

interface FunnelStage {
  label: string;
  count: number;
  color: string;
  icon: React.ElementType;
}

import { FunnelStageRow } from "./FunnelStageRow";

export const PipelineFunnel = memo(function PipelineFunnel({ stats }: Props) {
  const max = Math.max(stats.applied, 1);

  const stages: FunnelStage[] = [
    { label: "Applied", count: stats.applied, color: "#60a5fa", icon: Send },
    { label: "Screening", count: stats.screening, color: "#c084fc", icon: FileSearchIcon },
    { label: "Interview", count: stats.interview, color: "#fcd34d", icon: MessageSquareIcon },
    { label: "Offer", count: stats.offer, color: "#4ade80", icon: PartyPopper },
  ];

  const drops = [
    getDropOff(stats.applied, stats.screening),
    getDropOff(stats.screening, stats.interview),
    getDropOff(stats.interview, stats.offer),
  ];

  return (
    <div
      className="chalk-card p-5 flex flex-col h-full gap-4 animate-fade-in-up"
      style={{ animationDelay: "80ms" }}
    >
      <div className="flex items-center gap-2">
        <h2 className="font-sketch chalk-text text-xl tracking-wide">Pipeline Funnel</h2>
        <span
          className="text-xs font-body px-2 py-0.5 rounded-sm"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}
        >
          where you&apos;re leaking
        </span>
      </div>

      <div className="flex flex-col gap-1 pt-1">
        {stages.map((stage, idx) => {
          const isRedDrop =
            stage.count > 0 &&
            (idx === 0 ? stats.screening : idx === 1 ? stats.interview : stats.offer) /
              stage.count <
              0.2;
          return (
            <FunnelStageRow
              key={stage.label}
              stage={stage}
              idx={idx}
              max={max}
              drops={drops}
              isRedDrop={isRedDrop}
            />
          );
        })}
      </div>
    </div>
  );
});
