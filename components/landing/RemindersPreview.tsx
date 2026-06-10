"use client";

import { REMINDER_ITEMS } from "@/data/landing/features.data";

export function RemindersPreview() {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.18em] uppercase text-white/50 mb-[14px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Reminders
      </div>
      {REMINDER_ITEMS.map((item) => {
        const opacity = item.urgency === "now" ? 1 : item.urgency === "soon" ? 0.55 : 0.35;
        return (
          <div
            key={item.company}
            className="bg-white/[0.07] border border-dashed border-white/22 rounded-[6px] p-[13px_14px] mb-2"
            style={{ opacity }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-sketch font-semibold text-[13px] text-white/90">
                {item.company}
              </span>
              {item.urgency === "now" ? (
                <span
                  className="text-[10px] px-2 py-[2px] rounded-full bg-yellow-300/12 text-yellow-300 border border-yellow-300/30"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.urgencyLabel}
                </span>
              ) : (
                <span
                  className="text-[10px] text-white/50"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.dueLabel}
                </span>
              )}
            </div>
            <div
              className="text-[11px] text-white/50 mb-[9px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.role} · {item.appliedInfo}
            </div>
            {item.urgency === "now" && (
              <button
                className="text-[11px] text-white/90 px-[14px] py-[5px] border border-dashed border-white/65 bg-white/4 hover:bg-white/13 transition-colors"
                style={{ borderRadius: "4px 8px 3px 7px", fontFamily: "var(--font-body)" }}
              >
                Send follow-up →
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
