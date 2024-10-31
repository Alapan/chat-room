import { ChatRoom } from './types';
import ChatRoomList from './components/ChatRoomList';

export default async function Home() {
  const chatRooms: ChatRoom[] = [
    {
      topic: 'Sports',
    },
    {
      topic: 'Movies',
    },
  ]
  return (
    <section>
      <h1>{'Select a chat room'}</h1>
      <ChatRoomList rooms={chatRooms} />
    </section>
  );
}
