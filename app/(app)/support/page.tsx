"use client";

import { useState } from "react";
import SupportTab from "@/components/asap/support/SupportTab";
import { useAppDemo } from "@/context/AppDemoContext";
import type { ChatMessage } from "@/types/asap";

export default function SupportPage() {
  const { lang, sendChatMessage } = useAppDemo();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  const handleSend = async (text: string) => {
    setIsSendingChat(true);
    const userMsg: ChatMessage = {
      id: `chat-usr-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };
    const updated = [...chatMessages, userMsg];
    setChatMessages(updated);
    try {
      const reply = await sendChatMessage(text, updated);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `chat-bot-${Date.now()}`,
          role: "model",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <SupportTab
      chatMessages={chatMessages}
      onSendChatMessage={handleSend}
      isSendingChat={isSendingChat}
      onClearHistory={() => setChatMessages([])}
      lang={lang}
    />
  );
}
