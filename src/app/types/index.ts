export interface ChatRoom {
    id: number;
    topic: string;
    description: string;
    image: string | null;
}

export interface User {
    id: number;
    email: string;
    name: string;
}

export interface ChatMessageResponse {
    id: number;
    chatRoomId: number;
    userId: number;
    text: string;
    sentAt: Date;
    sentBy: {
        email: string;
    }
}

export interface ChatMessageVM {
    id: number;
    text: string;
    userId: number;
    sentBy: string;
    sentAt: Date;
}