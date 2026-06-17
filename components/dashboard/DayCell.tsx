import { HeatmapDay } from "@/types/dashboard";
import { memo } from "react";

interface Props {
  day: HeatmapDay | null;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

// Green shades matching the image — dark to light based on activity
function getCellStyle(count: number): { background: string; border: string } {
  if (count === 0)
    return {
      background: "rgba(255,255,255,0.04)",
      border: "1px dashed rgba(255,255,255,0.1)",
    };
  if (count <= 1) return { background: "#2d6a0e", border: "1px solid #3a8212" };
  if (count <= 3) return { background: "#4a9e1a", border: "1px solid #5ab820" };
  if (count <= 6) return { background: "#6abf2a", border: "1px solid #7dd934" };
  return { background: "#8fda42", border: "1px solid #a4f054" };
}

export const DayCell = memo(function DayCell({ day, isHovered, onEnter, onLeave }: Props) {
  if (!day) return null;

  const style = getCellStyle(day.count);

  return (
    <div
      className="transition-all duration-200"
      style={{
        width: 52,
        height: 52,
        borderRadius: "3px 4px 3px 4px",
        background: style.background,
        border: isHovered ? `1px solid rgba(255,255,255,0.8)` : style.border,
        transform: isHovered ? "scale(1.2)" : "scale(1)",
        boxShadow: isHovered ? `0 0 10px ${style.background}88` : "none",
        zIndex: isHovered ? 10 : 1,
        position: "relative",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  );
});
