import { StaleApplication } from "@/types/dashboard";
import Link from "next/link";
import { AlertTriangle, Bell, BellOff } from "lucide-react";
import { memo } from "react";

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export const StaleRow = memo(function StaleRow({ app }: { app: StaleApplication }) {
  const isDanger = app.daysSinceActivity >= 14;
  const accentColor = isDanger ? "#f87171" : "#fcd34d";

  return (
    <Link
      href={`/applications/${app.id}`}
      className="flex items-center justify-between gap-3 py-3 transition-colors rounded-sm px-1 group"
      style={{ borderBottom: "1px dashed rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <AlertTriangle size={14} style={{ color: accentColor, flexShrink: 0 }} />
        <div className="min-w-0">
          <p
            className="font-body text-sm chalk-text truncate group-hover:underline"
            style={{ textDecorationColor: "rgba(255,255,255,0.4)" }}
          >
            {app.companyName}
          </p>
          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
            {app.roleTitle} · {formatStatus(app.status)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {app.hasReminder ? (
          <Bell size={12} style={{ color: "#4ade80" }} />
        ) : (
          <BellOff size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
        )}
        <span className="font-sketch text-sm" style={{ color: accentColor }}>
          {app.daysSinceActivity}d
        </span>
      </div>
    </Link>
  );
});
