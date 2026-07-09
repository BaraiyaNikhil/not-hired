import { memo } from "react";

export const ThinkingIndicator = memo(function ThinkingIndicator() {
  return (
    <div className="flex items-start gap-2 px-1">
      <div className="flex flex-col gap-1 items-start">
        <span
          className="font-sketch text-[9px] tracking-widest uppercase px-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Mentor
        </span>
        <div
          className="chalk-card flex items-center gap-2 px-3 py-2.5"
          style={{ minWidth: "80px" }}
        >
          <span className="font-sketch text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            thinking
          </span>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block w-1 h-1 rounded-full animate-bounce"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  animationDelay: `${i * 150}ms`,
                  animationDuration: "900ms",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
