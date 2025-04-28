'use client';

import { KeyboardEvent, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

interface InputMessageBoxProps {
  onClick: () => void;
};

export const InputMessageBox = ({
  onClick
}: InputMessageBoxProps) => {
  const [ message, setMessage ] = useState('');
  const [ showPicker, setShowPicker ] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      event.preventDefault();
      onClick();
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className='flex items-center justify-between p-4 rounded-md shadow-md'>
      <input
        type='text'
        placeholder='Type your message here...'
        aria-label='Message input'
        className='w-full p-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type='button'
        className='bg-green text-white p-2 rounded focus:outline-none cursor-pointer'
        onClick={() => setShowPicker(!showPicker)}
      >😊</button>
      {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
    </div>
  );
}
