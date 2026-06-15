export const STATUS_COLORS: Record<string, string> = {
  applied: "bg-sky-500/10 border-sky-400/50 text-sky-300",
  screening: "bg-amber-500/10 border-amber-400/50 text-amber-300",
  interview: "bg-violet-500/10 border-violet-400/50 text-violet-300",
  offer: "bg-emerald-500/10 border-emerald-400/50 text-emerald-300",
  rejected: "bg-rose-500/10 border-rose-400/50 text-rose-300",
  ghosted: "bg-zinc-500/10 border-zinc-400/50 text-zinc-300",
};

export const STATUS_LABELS: Record<string, string> = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
};

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "bg-white/10 border-white/40 text-white/80";
  return (
    <span
      className={`ml-2 inline-flex items-center px-2 py-0.5 text-xs font-sniglet tracking-wider border-2 border-dashed ${color}`}
      style={{ borderRadius: "4px 8px 3px 6px" }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
