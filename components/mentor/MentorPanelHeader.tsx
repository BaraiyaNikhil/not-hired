import { memo } from "react";
import { BrainCircuit, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type MentorPanelHeaderProps = {
  onClose: () => void;
  onReset: () => void;
};

export const MentorPanelHeader = memo(function MentorPanelHeader({
  onClose,
  onReset,
}: MentorPanelHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 shrink-0"
      style={{ borderBottom: "1px dashed rgba(255,255,255,0.15)" }}
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <BrainCircuit size={16} style={{ color: "rgba(255,255,255,0.65)" }} strokeWidth={1.5} />
        <span
          className="font-sketch text-sm tracking-widest uppercase chalk-text"
          style={{ letterSpacing: "0.12em" }}
        >
          AI Mentor
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          id="mentor-reset-btn"
          variant="ghost"
          size="icon-xs"
          onClick={onReset}
          title="New chat"
          aria-label="Reset chat"
          className="chalk-action-btn"
        >
          <RotateCcw size={13} />
        </Button>
        <Button
          id="mentor-close-btn"
          variant="ghost"
          size="icon-xs"
          onClick={onClose}
          aria-label="Close mentor panel"
          className="chalk-action-btn"
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
});
