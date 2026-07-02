"use client";

import { REMINDER_ITEMS } from "@/data/landing/features.data";
import { Bell, Zap, CheckCircle2 } from "lucide-react";

export function RemindersPreview() {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.18em] uppercase text-white/50 mb-[14px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Reminders
      </div>
      {REMINDER_ITEMS.map((item, index) => {
        const opacity = item.urgency === "now" ? 1 : item.urgency === "soon" ? 0.8 : 0.6;
        const dueColor =
          item.urgency === "now" ? "#f87171" : item.urgency === "soon" ? "#fbbf24" : "#fbbf24";

        return (
          <div
            key={item.company}
            className="flex items-start gap-3 py-3.5 group"
            style={{
              borderBottom:
                index === REMINDER_ITEMS.length - 1 ? "none" : "1px dashed rgba(255,255,255,0.07)",
              opacity,
            }}
          >
            {/* Status icon */}
            <div className="mt-0.5 shrink-0">
              <Bell size={16} style={{ color: dueColor }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-body leading-snug"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {item.message}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className="text-xs font-body hover:underline transition-colors cursor-pointer"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    textDecorationColor: "rgba(255,255,255,0.25)",
                  }}
                >
                  {item.company} · {item.role}
                </span>
                {item.triggerLabel && (
                  <span
                    className="flex items-center gap-0.5 text-xs font-body px-1.5 py-px rounded-sm"
                    style={{
                      background: "rgba(124,106,247,0.12)",
                      border: "1px dashed rgba(124,106,247,0.35)",
                      color: "#a89cf8",
                    }}
                  >
                    <Zap size={9} />
                    {item.triggerLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {(item.urgencyLabel || item.dueLabel) && (
                <span
                  className="text-xs font-sketch px-2 py-0.5 rounded-sm"
                  style={{
                    color: dueColor,
                    background: `${dueColor}15`,
                    border: `1px dashed ${dueColor}45`,
                  }}
                >
                  {item.urgencyLabel || item.dueLabel}
                </span>
              )}
              {item.urgency === "now" && (
                <button
                  className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                  style={{
                    background: "rgba(74,222,128,0.08)",
                    border: "1px dashed rgba(74,222,128,0.35)",
                    color: "#4ade80",
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span className="hidden sm:inline">Done</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
