import { memo } from "react";

export interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  color: string;
  delay: number;
}

export const StatCard = memo(function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay,
}: StatCardProps) {
  return (
    <div
      className="chalk-card p-5 flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-body tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {label}
        </span>
        <Icon size={16} style={{ color }} />
      </div>
      <p
        className="font-sketch text-4xl chalk-text leading-none"
        style={{ textShadow: `0 0 20px ${color}40` }}
      >
        {value}
      </p>
      <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.4)" }}>
        {sub}
      </p>
    </div>
  );
});
