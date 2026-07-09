"use client";

import { memo } from "react";
import { Lock } from "lucide-react";

export const InsightsLockedState = memo(function InsightsLockedState() {
  const milestones = [2, 4, 6, 8, 10];

  return (
    <div
      className="chalk-card p-5 sm:p-6 h-full flex flex-col sm:flex-row sm:items-center sm:justify-center lg:flex-col lg:justify-center items-center justify-center gap-4 sm:gap-6 lg:gap-5 animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: "400ms" }}
    >
      {/* Lock icon with glow */}
      <div className="relative shrink-0">
        <Lock size={24} className="sm:w-7 sm:h-7" style={{ color: "rgba(217, 28, 41, 0.8)" }} />
        <div
          className="absolute inset-0 blur-xl rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Heading + description */}
      <div className="text-center sm:text-left lg:text-center space-y-1.5 sm:flex-1 lg:flex-none">
        <h2 className="font-sketch chalk-text text-lg sm:text-xl tracking-wide">
          AI Insights Locked
        </h2>
        <p
          className="text-xs font-body max-w-[280px] sm:max-w-xs lg:max-w-[260px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Add at least{" "}
          <span className="font-sketch" style={{ color: "rgba(255,255,255,0.8)" }}>
            10 applications
          </span>{" "}
          to unlock brutally honest AI insights.
        </p>
      </div>

      {/* Progress tally marks — chalk style */}
      <div className="flex flex-col items-center gap-2 w-full max-w-[200px] sm:max-w-[180px] lg:max-w-[220px] shrink-0">
        <div className="flex items-center gap-2 w-full">
          {milestones.map((n) => (
            <div
              key={n}
              className="flex-1 h-px"
              style={{ borderTop: "2px dashed rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>
        <div className="flex justify-between w-full px-0.5">
          {milestones.map((n) => (
            <span
              key={n}
              className="font-sketch text-[10px]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {n}
            </span>
          ))}
        </div>
        <p
          className="font-body text-[10px] tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          applications needed
        </p>
      </div>
    </div>
  );
});
