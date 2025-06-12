"use client";

import { ChatMessageVM } from "@/app/types";

interface ChatHistoryParams {
  messages: ChatMessageVM[];
  currentUserId: number;
}

export const ChatHistory = ({ messages, currentUserId }: ChatHistoryParams) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-3 rounded-lg max-w-xs ${message.userId === currentUserId ? "bg-green-700 text-white self-end" : "bg-gray-300 text-black self-start"}`}
        >
          <div className="text-xs">{message.sentBy}</div>
          <div className="text-xl">{message.text}</div>
          <div
            className={`text-xs mt-1 ${message.userId === currentUserId ? "text-lime-50" : "text-gray-600"}`}
          >
            {new Date(message.sentAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};
