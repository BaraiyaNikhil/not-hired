import { memo } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

export const AiMentorComingSoon = memo(function AiMentorComingSoon() {
  return (
    <div
      className="chalk-card p-5 h-full flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: "400ms" }}
    >
      {/* Header */}
      <div>
        <h2 className="font-sketch chalk-text text-xl tracking-wide">AI Insights</h2>
        <p className="text-xs font-body mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          brutally honest feedback
        </p>
      </div>

      {/* Coming soon body */}
      <div
        className="flex flex-col items-center justify-center gap-5 py-8 rounded-sm border"
        style={{
          borderStyle: "dashed",
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Pulsing brain icon */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-16 h-16 rounded-full animate-ping"
            style={{ background: "rgba(192,132,252,0.1)", animationDuration: "2.4s" }}
          />
          <div
            className="relative flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              background: "rgba(192,132,252,0.12)",
              border: "2px dashed rgba(192,132,252,0.4)",
              borderRadius: "4px 10px 4px 8px",
            }}
          >
            <BrainCircuit size={22} style={{ color: "#c084fc" }} />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1.5">
          <p className="font-sketch chalk-text text-lg tracking-wide">Your AI Mentor is Training</p>
          <p
            className="text-xs font-body max-w-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            We&apos;re wiring up the AI to analyse your job hunt. Personalised, brutally honest
            insights are coming soon.
          </p>
        </div>

        {/* Subtle status pills */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {["Analysing pipeline", "Reading patterns", "Preparing feedback"].map((step, i) => (
            <span
              key={step}
              className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.35)",
                border: "1px dashed rgba(255,255,255,0.1)",
                animationDelay: `${i * 200}ms`,
              }}
            >
              <Sparkles size={10} style={{ color: "#c084fc", opacity: 0.7 }} />
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
