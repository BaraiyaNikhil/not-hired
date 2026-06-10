"use client";

import { PIPELINE_COLUMNS } from "@/data/landing/features.data";

export function PipelinePreview() {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.18em] uppercase text-white/50 mb-[14px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Pipeline view
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PIPELINE_COLUMNS.map((col) => (
          <div key={col.label} className="shrink-0 w-[120px]">
            <div className="flex items-center gap-1 mb-[7px]">
              <span className="text-[18px] pb-2">{col.emoji}</span>
              <span className={`font-sketch text-[18px] pb-2 ${col.textColor}`}>{col.label}</span>
              <span
                className="text-[12px] pb-2 text-white/30 ml-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {col.cards.length}
              </span>
            </div>
            <div
              className="min-h-[150px] rounded-sm p-1"
              style={{
                background: col.bg,
                border: `1px dashed ${col.border}`,
                borderRadius: "3px 5px 3px 4px",
              }}
            >
              {col.cards.map((t) => (
                <div
                  key={t}
                  className="rounded p-[6px_8px] text-[12px] text-white/85 mb-[6px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px dashed ${col.border}`,
                    borderRadius: "2px 5px 2px 4px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t}
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="flex items-center justify-center min-h-[40px]">
                  <span
                    className="text-[8px] text-white/15"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Drop here
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
