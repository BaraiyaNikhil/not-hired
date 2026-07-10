"use client";

import { memo, useState, useCallback, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MentorChatInputProps = {
  onSend: (text: string) => void;
  disabled: boolean;
};

export const MentorChatInput = memo(function MentorChatInput({
  onSend,
  disabled,
}: MentorChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ borderTop: "1px dashed rgba(255,255,255,0.15)" }}
    >
      <Input
        id="mentor-chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask your mentor..."
        className="chalk-input flex-1 text-sm"
        autoComplete="off"
      />
      <Button
        id="mentor-send-btn"
        variant="ghost"
        size="icon"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="shrink-0"
      >
        <Send className="size-5" />
      </Button>
    </div>
  );
});
