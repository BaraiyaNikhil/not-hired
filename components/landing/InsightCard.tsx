"use client";

import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import type { AiInsight } from "@/types/dashboard";

type InsightStyle = {
  label: string;
  labelColor: string;
  iconColor: string;
  borderColor: string;
  glowColor: string;
  Icon: typeof Info;
};

function getInsightStyle(type: AiInsight["type"]): InsightStyle {
  switch (type) {
    case "critical":
      return {
        label: "Critical",
        labelColor: "rgba(248,113,113,0.9)",
        iconColor: "rgba(248,113,113,0.85)",
        borderColor: "rgba(248,113,113,0.5)",
        glowColor: "rgba(248,113,113,0.08)",
        Icon: AlertTriangle,
      };
    case "warning":
      return {
        label: "Warning",
        labelColor: "rgba(251,191,36,0.9)",
        iconColor: "rgba(251,191,36,0.85)",
        borderColor: "rgba(251,191,36,0.5)",
        glowColor: "rgba(251,191,36,0.08)",
        Icon: Lightbulb,
      };
    case "info":
    default:
      return {
        label: "Insight",
        labelColor: "rgba(147,197,253,0.9)",
        iconColor: "rgba(147,197,253,0.85)",
        borderColor: "rgba(147,197,253,0.4)",
        glowColor: "rgba(147,197,253,0.07)",
        Icon: Info,
      };
  }
}

/** Landing page version of the real dashboard InsightCard — same visual identity */
export function LandingInsightCard({ insight }: { insight: AiInsight }) {
  const { label, labelColor, iconColor, borderColor, glowColor, Icon } = getInsightStyle(
    insight.type
  );

  return (
    <div
      className="relative h-full flex flex-col gap-3 p-4 rounded-sm overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${glowColor} 0%, transparent 60%)`,
        border: `2px dashed ${borderColor}`,
        borderRadius: "4px 10px 4px 8px",
      }}
    >
      {/* Type label badge */}
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color: iconColor, flexShrink: 0 }} />
        <span
          className="font-sketch text-[10px] tracking-widest uppercase font-semibold"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>

      {/* Insight body */}
      <p
        className="font-body text-sm leading-relaxed chalk-text flex-1"
        style={{ color: "rgba(255,255,255,0.82)" }}
      >
        {insight.text}
      </p>

      {/* Action divider + action */}
      <div className="pt-2.5" style={{ borderTop: "1px dashed rgba(255,255,255,0.12)" }}>
        <p className="font-body text-xs leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span
            className="font-sketch text-[9px] tracking-widest uppercase mr-1.5"
            style={{ color: labelColor }}
          >
            Action →
          </span>
          {insight.action}
        </p>
      </div>
    </div>
  );
}
