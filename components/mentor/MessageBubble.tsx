import { memo } from "react";
import { UIMessage } from "ai";

type MessageBubbleProps = {
  message: UIMessage;
};

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const textContent = message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");

  if (!textContent) return null;

  return (
    <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
      <span
        className="font-sketch text-[9px] tracking-widest uppercase px-1"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {isUser ? "You" : "Mentor"}
      </span>

      <div
        className={`max-w-[88%] px-3 py-2.5 text-sm font-body leading-relaxed ${
          isUser ? "rounded-tl-lg rounded-bl-lg rounded-br-sm" : "chalk-card"
        }`}
        style={
          isUser
            ? {
                background: "rgba(255,255,255,0.12)",
                border: "1.5px dashed rgba(255,255,255,0.35)",
                borderRadius: "12px 4px 12px 12px",
                color: "rgba(255,255,255,0.9)",
              }
            : {
                color: "rgba(255,255,255,0.85)",
              }
        }
      >
        {textContent}
      </div>
    </div>
  );
});
