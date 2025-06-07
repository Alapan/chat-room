"use client";

import { KeyboardEvent, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { Button } from "./Button";

interface InputMessageBoxProps {
  onClickAction: (message: string) => void;
  sendingMessage: boolean;
}

export const InputMessageBox = ({ onClickAction }: InputMessageBoxProps) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && message.trim() !== "") {
      event.preventDefault();
      onClickAction(message);
      setMessage("");
    } else if (
      (event.key === "Enter" && event.ctrlKey) ||
      (event.key === "Enter" && event.metaKey)
    ) {
      event.preventDefault();
      onClickAction(message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onClickAction(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-md shadow-md">
      <textarea
        placeholder="Type your message here..."
        aria-label="Message input"
        className="w-full p-2 rounded-md border border-green focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <div className="col-span-2 col-start-5 flex items-center justify-end gap-2">
        <Button onClick={() => setShowPicker(!showPicker)}>😊</Button>
        {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <Button onClick={handleSendClick}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};
