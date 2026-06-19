import { memo } from "react";
import { ArrowDown } from "lucide-react";

interface Props {
  stage: {
    label: string;
    count: number;
    color: string;
    icon: React.ElementType;
  };
  idx: number;
  max: number;
  drops: string[];
  isRedDrop: boolean;
}

function getWidthPct(count: number, max: number): number {
  if (max === 0) return 0;
  return Math.max(20, Math.round((count / max) * 100));
}

export const FunnelStageRow = memo(function FunnelStageRow({
  stage,
  idx,
  max,
  drops,
  isRedDrop,
}: Props) {
  return (
    <div>
      {/* Stage bar */}
      <div className="flex items-center gap-3 group">
        <div className="w-6 shrink-0 flex justify-center" style={{ color: stage.color }}>
          <stage.icon size={16} />
        </div>
        <div className="flex-1 relative h-10 flex items-center">
          <div
            className="h-10 rounded-sm flex items-center px-3 transition-all duration-700"
            style={{
              width: `${getWidthPct(stage.count, max)}%`,
              background: `${stage.color}22`,
              border: `2px dashed ${stage.color}66`,
              borderRadius: "3px 6px 4px 5px",
              minWidth: 56,
            }}
          >
            <span className="font-sketch text-base leading-none" style={{ color: stage.color }}>
              {stage.count}
            </span>
          </div>
        </div>
        <span
          className="font-body text-sm w-20 shrink-0"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {stage.label}
        </span>
      </div>

      {/* Drop-off label between stages */}
      {idx < drops.length && (
        <div className="flex items-center gap-2 pl-9 py-0.5">
          <ArrowDown size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
          <span
            className="font-body text-xs"
            style={{
              color: isRedDrop ? "#f87171" : "rgba(255,255,255,0.35)",
            }}
          >
            {drops[idx]}
          </span>
        </div>
      )}
    </div>
  );
});
