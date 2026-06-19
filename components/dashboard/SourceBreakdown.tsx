import { SourceBreakdownRow } from "@/types/dashboard";
import { memo } from "react";
import { getRateColor } from "@/utils/dashboard";

interface Props {
  rows: SourceBreakdownRow[];
}

export const SourceBreakdown = memo(function SourceBreakdown({ rows }: Props) {
  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-4 animate-fade-in-up"
      style={{ animationDelay: "160ms" }}
    >
      <div>
        <h2 className="font-sketch chalk-text text-xl tracking-wide">Source Breakdown</h2>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          where your best leads come from
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
          No data yet. Add some applications first.
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr style={{ borderBottom: "1px dashed rgba(255,255,255,0.15)" }}>
                {["Source", "Applied", "Responses", "Rate"].map((h) => (
                  <th
                    key={h}
                    className="pb-2 text-left font-body text-xs tracking-widest font-normal! uppercase"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const color = getRateColor(row.responseRate);
                return (
                  <tr
                    key={row.source}
                    className="transition-colors"
                    style={{
                      borderBottom: "1px dashed rgba(255,255,255,0.07)",
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    <td className="py-2.5 pr-4 chalk-text font-body font-medium">{row.source}</td>
                    <td className="py-2.5 pr-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {row.applied}
                    </td>
                    <td className="py-2.5 pr-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {row.responses}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="font-sketch text-base"
                        style={{ color, textShadow: `0 0 12px ${color}40` }}
                      >
                        {row.responseRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});
