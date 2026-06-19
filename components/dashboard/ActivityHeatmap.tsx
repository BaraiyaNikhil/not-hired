"use client";

import { HeatmapDay } from "@/types/dashboard";
import { memo, useState, useMemo, useRef, useEffect } from "react";
import { formatDateLabel, getCellStyle } from "@/utils/dashboard";

interface Props {
  days: HeatmapDay[];
}

const LEGEND_STEPS = [0, 1, 3, 6, 7];

import { DayCell } from "./DayCell";

export const ActivityHeatmap = memo(function ActivityHeatmap({ days }: Props) {
  const [hoveredDayIdx, setHoveredDayIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Use a short timeout to ensure the layout is fully rendered before scrolling
      const timeoutId = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [days]);

  const { daysList, monthLabels } = useMemo(() => {
    if (days.length === 0) return { daysList: [], monthLabels: [] };

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;
    sorted.forEach((d, idx) => {
      const date = new Date(d.date + "T00:00:00");
      const m = date.getMonth();
      if (m !== lastMonth) {
        labels.push({
          label: date.toLocaleDateString("en-US", { month: "short" }),
          colIndex: idx,
        });
        lastMonth = m;
      }
    });

    return { daysList: sorted, monthLabels: labels };
  }, [days]);

  const totalApplications = useMemo(() => days.reduce((sum, d) => sum + d.count, 0), [days]);
  const activeDays = useMemo(() => days.filter((d) => d.count > 0).length, [days]);

  const hoveredData = hoveredDayIdx !== null ? daysList[hoveredDayIdx] : null;

  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-5 animate-fade-in-up"
      style={{ animationDelay: "240ms" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-sketch chalk-text text-xl tracking-wide">
            Application activity — last 30 days
          </h2>
          {hoveredData ? (
            <p
              className="text-xs font-body mt-1 transition-all"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <span style={{ color: "#8fda42" }}>
                {hoveredData.count} application{hoveredData.count !== 1 ? "s" : ""}
              </span>{" "}
              · {formatDateLabel(hoveredData.date)}
            </p>
          ) : (
            <p className="text-xs font-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              consistency is the game
            </p>
          )}
        </div>

        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="font-sketch text-2xl chalk-text">{totalApplications}</p>
            <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
              total applied
            </p>
          </div>
          <div className="text-center">
            <p className="font-sketch text-2xl chalk-text">{activeDays}</p>
            <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
              active days
            </p>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-none pb-2 flex-1">
        <div className="min-w-max flex flex-col gap-2 pt-2 pr-4">
          {/* Month Labels */}
          <div className="relative h-4 w-full">
            {monthLabels.map((l) => (
              <span
                key={`${l.label}-${l.colIndex}`}
                className="absolute text-[11px] font-body uppercase tracking-wider"
                style={{
                  left: l.colIndex * (52 + 6), // 52px width + 6px gap (gap-1.5 is 6px)
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {l.label}
              </span>
            ))}
          </div>

          {/* Days Row */}
          <div className="flex items-center gap-1.5 w-max">
            {daysList.map((day, idx) => (
              <DayCell
                key={day.date}
                day={day}
                isHovered={hoveredDayIdx === idx}
                onEnter={() => setHoveredDayIdx(idx)}
                onLeave={() => setHoveredDayIdx(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend — bottom right */}
      <div className="flex items-center justify-end gap-1.5 mt-auto pt-2">
        <span className="text-xs font-body mr-1" style={{ color: "rgba(255,255,255,0.3)" }}>
          Less
        </span>
        {LEGEND_STEPS.map((n) => {
          const s = getCellStyle(n);
          return (
            <div
              key={n}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: s.background,
                border: s.border,
              }}
            />
          );
        })}
        <span className="text-xs font-body ml-1" style={{ color: "rgba(255,255,255,0.3)" }}>
          More
        </span>
      </div>
    </div>
  );
});
