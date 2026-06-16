import { StatusLogEntry } from "@/types/application";
import { Activity } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";
import { StatusBadge, STATUS_COLORS } from "./StatusBadge";

type Props = {
  logs: StatusLogEntry[];
  createdAt: Date;
};

export function StatusTimeline({ logs, createdAt }: Props) {
  return (
    <div className="chalk-card p-6">
      <h2 className="text-lg font-sketch text-white mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
        <Activity size={18} className="text-white/50" />
        Status Timeline
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-linear-to-b from-white/20 via-white/10 to-transparent" />

        <ul className="space-y-5 overflow-y-auto scrollbar-none lg:h-[calc(75vh-10rem)] h-[calc(50vh-10rem)]">
          {logs.map((log, i) => (
            <li key={log.id} className="relative flex gap-4 pl-7">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1 h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center ${
                  i === 0
                    ? (STATUS_COLORS[log.toStatus] ?? "bg-white/40 border-white/40")
                    : "bg-[#2a3439] border-white/20"
                }`}
              >
                {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-white/90 block" />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 leading-snug">
                  {log.fromStatus ? (
                    <>
                      Moved from <StatusBadge status={log.fromStatus} /> {" → "}
                      <StatusBadge status={log.toStatus} />
                    </>
                  ) : (
                    <>
                      Application created as <StatusBadge status={log.toStatus} />
                    </>
                  )}
                </p>
                <p className="text-xs text-white/35 mt-1">{formatRelativeDate(log.createdAt)}</p>
              </div>
            </li>
          ))}

          {/* Application created origin */}
          <li className="relative flex gap-4 pl-7">
            <div className="absolute left-0 top-1 h-[18px] w-[18px] rounded-full border-2 bg-[#2a3439] border-white/10" />
            <div className="flex-1">
              <p className="text-sm text-white/40">Record created</p>
              <p className="text-xs text-white/25 mt-1">{formatRelativeDate(createdAt)}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
