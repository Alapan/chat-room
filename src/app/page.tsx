import Image from 'next/image';
import { ChatRoomList } from "./components/ChatRoomList";

export default function Home() {
  return (
    <main className='container w-full mx-auto flex flex-col h-screen mt-4 mb-6'>
      <div className='mx-6'>
        <div className='flex flex-row justify-center text-6xl'>
          <span className='font-bold text-green'>Chat</span>
          <span className='font-light text-green pr-4'>Hub</span>
          <Image
            src='speech-bubble.svg'
            width={50}
            height={50}
            alt='Chat Hub Logo'
          />
        </div>
        <div className='flex flex-row justify-center text-2xl'>
          <span className='font-cursive text-green'>Chat anytime, for free.</span>
        </div>
        <div className='flex flex-row justify-center text-2xl my-6'>
          <span className='font-normal'>Click a topic from the list to enter the chatroom.</span>
        </div>
        <div className='flex flex-col items-center gap-4 my-4'>
          <ChatRoomList />
        </div>
      </div>
    </main>
  );
}
