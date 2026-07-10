import { memo } from "react";
import { STARTER_PROMPTS } from "@/data/mentor/starter-prompts.data";

type StarterPromptsProps = {
  onSelect: (text: string) => void;
};

export const StarterPrompts = memo(function StarterPrompts({ onSelect }: StarterPromptsProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      <p
        className="font-sketch text-xs tracking-widest uppercase text-center"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        Ask your mentor
      </p>
      <div className="grid grid-cols-2 gap-2">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onSelect(prompt.text)}
            className="chalk-button flex flex-col gap-1.5 p-3 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-base leading-none">{prompt.emoji}</span>
            <span
              className="font-body text-[11px] tracking-wide leading-snug"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {prompt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});
