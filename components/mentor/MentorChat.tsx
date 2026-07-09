"use client";

import { useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMentorStore } from "@/store/mentorStore";
import { MentorChatMessages } from "@/components/mentor/MentorChatMessages";
import { MentorChatInput } from "@/components/mentor/MentorChatInput";

export function MentorChat() {
  const { messages: storedMessages, setMessages } = useMentorStore();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/mentor" }),
    messages: storedMessages,
    onFinish: ({ messages: finishedMessages }) => {
      setMessages(finishedMessages);
    },
  });

  const handleSend = useCallback(
    (text: string) => {
      sendMessage({ text });
    },
    [sendMessage]
  );

  return (
    <div className="flex flex-col h-full">
      <MentorChatMessages messages={messages} status={status} onSelectPrompt={handleSend} />
      <MentorChatInput onSend={handleSend} disabled={status !== "ready"} />
    </div>
  );
}
