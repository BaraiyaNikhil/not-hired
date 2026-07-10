"use client";

import { memo, useEffect, useRef } from "react";
import { UIMessage } from "ai";
import { MessageBubble } from "@/components/mentor/MessageBubble";
import { StarterPrompts } from "@/components/mentor/StarterPrompts";
import { ThinkingIndicator } from "@/components/mentor/ThinkingIndicator";

type MentorChatMessagesProps = {
  messages: UIMessage[];
  status: string;
  onSelectPrompt: (text: string) => void;
};

export const MentorChatMessages = memo(function MentorChatMessages({
  messages,
  status,
  onSelectPrompt,
}: MentorChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isThinking = status === "submitted" || status === "streaming";

  return (
    <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 flex flex-col gap-4">
      {messages.length === 0 ? (
        <div className="flex flex-col gap-6 h-full justify-center">
          {/* Welcome text */}
          <div className="text-center px-4">
            <p
              className="font-sketch text-lg chalk-text"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
            >
              Your AI Mentor
            </p>
            <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              brutally honest job search advice
            </p>
          </div>
          <StarterPrompts onSelect={onSelectPrompt} />
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isThinking && <ThinkingIndicator />}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
});
