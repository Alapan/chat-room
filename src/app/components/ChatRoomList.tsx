import Link from 'next/link';
import { ListItem } from './ListItem';
import { ChatRoom } from '@/app/types';

export const ChatRoomList = async () =>  {
  const res = await fetch(`${process.env.BASE_API_URL}/api/chatrooms`);

  if (!res.ok) {
    throw new Error('Failed to fetch chat rooms');
  }
  const chatRooms: ChatRoom[] = await res.json();

  return (
    <div className='w-full max-w-3xl flex flex-col justify-center gap-4'>
      {chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <Link href={`/chatroom/${room.id}`} key={room.id}>
            <ListItem topic={room.topic} description={room.description} />
          </Link>
        ))
      ) : (
        <div className='text-center'>No chat rooms available</div>
      )}
    </div>
  );
};
