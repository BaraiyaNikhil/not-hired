import { StaleApplication } from "@/types/dashboard";
import { memo } from "react";

interface Props {
  applications: StaleApplication[];
}

import { StaleRow } from "./StaleRow";

export const StaleApplications = memo(function StaleApplications({ applications }: Props) {
  const danger = applications.filter((a) => a.daysSinceActivity >= 14).length;

  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: "320ms" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sketch chalk-text text-xl tracking-wide">Stale Applications</h2>
          <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            silent = ghost risk
          </p>
        </div>
        {danger > 0 && (
          <span
            className="font-sketch text-xs px-2 py-1 rounded-sm"
            style={{
              background: "rgba(248,113,113,0.15)",
              color: "#f87171",
              border: "1px dashed #f8717166",
            }}
          >
            {danger} danger
          </span>
        )}
      </div>

      {applications.length === 0 ? (
        <p
          className="text-sm font-body py-4 text-center"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          All caught up! 🎉
        </p>
      ) : (
        <div className="flex flex-col">
          {applications.map((app) => (
            <StaleRow key={app.id} app={app} />
          ))}
        </div>
      )}

      <p className="text-xs font-body pt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
        <span style={{ color: "#4ade80" }}>●</span> has reminder &nbsp;
        <span style={{ color: "rgba(255,255,255,0.2)" }}>●</span> no reminder set
      </p>
    </div>
  );
});
