import { ChatRoom } from "@/app/types";

export interface Message {
  chatRoom: ChatRoom;
  text: string;
};
