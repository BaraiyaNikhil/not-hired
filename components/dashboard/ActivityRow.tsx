import { RecentActivityItem } from "@/types/dashboard";
import Link from "next/link";
import { memo } from "react";
import {
  Send,
  FileSearchIcon,
  MessageSquareIcon,
  PartyPopper,
  XCircle,
  Ghost,
  ArrowRight,
} from "lucide-react";

const STATUS_STYLES: Record<string, { color: string; label: string; icon: React.ElementType }> = {
  applied: { color: "#60a5fa", label: "Applied", icon: Send },
  screening: { color: "#c084fc", label: "Screening", icon: FileSearchIcon },
  interview: { color: "#fcd34d", label: "Interview", icon: MessageSquareIcon },
  offer: { color: "#4ade80", label: "Offer", icon: PartyPopper },
  rejected: { color: "#f87171", label: "Rejected", icon: XCircle },
  ghosted: { color: "#94a3b8", label: "Ghosted", icon: Ghost },
};

export const ActivityRow = memo(function ActivityRow({ item }: { item: RecentActivityItem }) {
  const to = STATUS_STYLES[item.toStatus] ?? {
    color: "#fff",
    label: item.toStatus,
    icon: ArrowRight,
  };
  const Icon = to.icon;
  return (
    <Link
      href={`/applications/${item.applicationId}`}
      className="flex items-start gap-2.5 py-2 group"
    >
      <div className="mt-1 shrink-0" style={{ color: to.color }}>
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm chalk-text font-body truncate group-hover:underline"
          style={{ textDecorationColor: "rgba(255,255,255,0.4)" }}
        >
          {item.companyName}
          <span className="ml-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            {item.roleTitle}
          </span>
        </p>
        <p className="text-xs font-body" style={{ color: to.color }}>
          {item.fromStatus
            ? `${STATUS_STYLES[item.fromStatus]?.label ?? item.fromStatus} → ${to.label}`
            : `Added as ${to.label}`}
        </p>
      </div>
    </Link>
  );
});
