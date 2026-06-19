import { RecentActivityItem } from "@/types/dashboard";

export function formatDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getCellStyle(count: number): { background: string; border: string } {
  if (count === 0)
    return {
      background: "rgba(255,255,255,0.04)",
      border: "1px dashed rgba(255,255,255,0.1)",
    };
  if (count <= 1) return { background: "#2d6a0e", border: "1px solid #3a8212" };
  if (count <= 3) return { background: "#4a9e1a", border: "1px solid #5ab820" };
  if (count <= 6) return { background: "#6abf2a", border: "1px solid #7dd934" };
  return { background: "#8fda42", border: "1px solid #a4f054" };
}

export function getRateColor(rate: number): string {
  if (rate >= 50) return "#4ade80";
  if (rate >= 20) return "#fcd34d";
  return "#f87171";
}

export function getDropOff(from: number, to: number): string {
  if (from === 0) return "—";
  const pct = Math.round(((from - to) / from) * 100);
  return `${pct}% drop`;
}

export function groupByDay(items: RecentActivityItem[]): [string, RecentActivityItem[]][] {
  const map = new Map<string, RecentActivityItem[]>();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86_400_000).toDateString();

  for (const item of items) {
    const dateStr = new Date(item.createdAt).toDateString();
    let label: string;
    if (dateStr === today) label = "Today";
    else if (dateStr === yesterday) label = "Yesterday";
    else {
      const d = new Date(item.createdAt);
      label = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    }
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(item);
  }

  return [...map.entries()];
}
