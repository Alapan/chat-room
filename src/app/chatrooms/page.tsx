import Link from "next/link";
import { ChatRoom } from "@prisma/client";
import { ListItem } from "../components/ListItem";

export default async function ChatRooms() {
  const res = await fetch(`${process.env.BASE_API_URL}/api/chatrooms`);

  if (!res.ok) {
    throw new Error("Failed to fetch chat rooms");
  }

  const chatRooms: ChatRoom[] = await res.json();

  return (
    <div className="container w-full mx-auto flex flex-col h-screen mt-4 mb-6">
      <div className="mx-6">
        <div className="flex flex-row justify-center text-2xl my-6">
          <span className="font-normal">
            Click a topic from the list to enter the chatroom.
          </span>
        </div>
        <div className="flex flex-col items-center gap-4 my-4">
          <div className="w-full max-w-3xl flex flex-col justify-center gap-4">
            {chatRooms.length > 0 ? (
              chatRooms.map((room) => (
                <Link href={`/chatrooms/${room.id}`} key={room.id}>
                  <ListItem topic={room.topic} description={room.description} />
                </Link>
              ))
            ) : (
              <div className="text-center">No chat rooms available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
