'use client';

import { KeyboardEvent, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

interface InputMessageBoxProps {
  onClickAction: (message: string) => void;
}

export const InputMessageBox = ({ onClickAction }: InputMessageBoxProps) => {
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey && message.trim() !== '') {
      event.preventDefault();
      onClickAction(message);
      setMessage('');
    } else if (
      (event.key === 'Enter' && event.ctrlKey) ||
      (event.key === 'Enter' && event.metaKey)
    ) {
      event.preventDefault();
      onClickAction(message);
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      onClickAction(message);
      setMessage('');
    }
  };

  return (
    <div className='flex items-center justify-between p-4 rounded-md shadow-md'>
      <textarea
        placeholder='Type your message here...'
        aria-label='Message input'
        className='w-full p-2 rounded-md border border-green focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent resize-none'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button
        type='button'
        className='bg-green text-white p-2 rounded focus:outline-none cursor-pointer'
        onClick={() => setShowPicker(!showPicker)}
      >😊
      </button>
      {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
      <button
        type='button'
        className='bg-green text-white px-4 py-2 rounded focus:outline-none cursor-pointer'
        onClick={handleSendClick}
      >
        <FontAwesomeIcon icon={faPaperPlane}/>
      </button>
    </div>
  );
}
