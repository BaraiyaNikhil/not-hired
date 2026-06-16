import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ApplicationSummary } from "@/types/application";
import { ApplicationStatus } from "@prisma/client";

const STATUS_DOT: Record<ApplicationStatus, string> = {
  applied: "bg-sky-400",
  screening: "bg-amber-400",
  interview: "bg-violet-400",
  offer: "bg-emerald-400",
  rejected: "bg-rose-400",
  ghosted: "bg-zinc-400",
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
};

export type ApplicationRowProps = {
  app: ApplicationSummary;
  currentId: string;
};

export const ApplicationRow = memo(function ApplicationRow({
  app,
  currentId,
}: ApplicationRowProps) {
  const isActive = app.id === currentId;
  return (
    <Link
      href={`/applications/${app.id}`}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 transition-all duration-150 group",
        isActive
          ? "chalk-card shadow-md"
          : "hover:bg-white/5 border-2 border-transparent border-dashed hover:border-white/20"
      )}
      style={{ borderRadius: "4px 12px 5px 10px" }}
    >
      <div className={cn("h-2 w-2 rounded-full shrink-0 mt-0.5", STATUS_DOT[app.status])} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium truncate",
            isActive ? "text-white" : "text-white/70 group-hover:text-white/90"
          )}
        >
          {app.companyName}
        </p>
        <p className="text-xs text-white/35 truncate">{app.roleTitle}</p>
      </div>
      <span
        className={cn(
          "text-[10px] uppercase tracking-wide shrink-0",
          isActive ? "text-white/60" : "text-white/25 group-hover:text-white/40"
        )}
      >
        {STATUS_LABELS[app.status]}
      </span>
    </Link>
  );
});
