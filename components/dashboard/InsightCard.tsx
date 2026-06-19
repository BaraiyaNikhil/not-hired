import { memo } from "react";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import { AiInsight } from "@/data/dashboard/ai-insights.data";

export const InsightCard = memo(function InsightCard({ insight }: { insight: AiInsight }) {
  let styleProps = { bg: "", border: "", iconColor: "", Icon: Info };

  switch (insight.type) {
    case "critical":
      styleProps = {
        bg: "rgba(248,113,113,0.1)",
        border: "#f87171",
        iconColor: "#f87171",
        Icon: AlertTriangle,
      };
      break;
    case "warning":
      styleProps = {
        bg: "rgba(252,211,77,0.1)",
        border: "#fcd34d",
        iconColor: "#fcd34d",
        Icon: Lightbulb,
      };
      break;
    case "info":
    default:
      styleProps = {
        bg: "rgba(96,165,250,0.1)",
        border: "#60a5fa",
        iconColor: "#60a5fa",
        Icon: Info,
      };
      break;
  }

  const { Icon } = styleProps;

  return (
    <div
      className="rounded-sm p-4 border-l-4 h-full"
      style={{ background: styleProps.bg, borderColor: styleProps.border }}
    >
      <div className="flex items-start gap-2">
        <Icon size={14} style={{ color: styleProps.iconColor, flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p className="text-sm font-body chalk-text leading-snug">{insight.text}</p>
          <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            {insight.action}
          </p>
        </div>
      </div>
    </div>
  );
});
