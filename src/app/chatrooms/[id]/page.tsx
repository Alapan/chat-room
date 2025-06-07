"use client";

import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ChatMessageResponse, ChatMessageVM, ChatRoom } from "@/app/types";
import { InputMessageBox } from "@/app/components/InputMessageBox";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { useAppSelector } from "@/app/state/hooks";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/app/state/slices/authSlice";
import { ChatHistory } from "@/app/components/ChatHistory";

export default function ChatRoomPage() {
  const params = useParams();
  const id = params.id;

  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [useHttpFallback, setUseHttpFallback] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<ChatMessageVM[]>([]);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "", {
      transports: ["websocket", "polling"],
    });
    newSocket.on("connection", () => {
      console.log("Socket connected to server!");
    });

    newSocket.on("chatResponse", (data: { dbMessage: ChatMessageResponse }) => {
      const chatMessageVM = mapChatMessageResponseToVM(data.dbMessage);
      setChatMessages((prev) => [...prev, chatMessageVM]);
    });

    newSocket.on("error", (message: string) => {
      console.error("Websocket connection failed: ", message);
      setUseHttpFallback(true);
    });

    newSocket.on("disconnect", () => {
      console.warn("Websocket disconnected, switching to HTTP...");
      setUseHttpFallback(true);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
    getUserId();
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchChatRoom();
      getChatHistory();
    }
  }, [id, authLoading, isAuthenticated]);

  const fetchChatRoom = async () => {
    try {
      const response = await fetch(`/api/chatrooms/${id}`);
      if (!response.ok) {
        setError("Failed to fetch chat room");
        return;
      }
      const data = await response.json();
      setChatRoom(data);
    } catch (err) {
      setError("Error loading chat room");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserId = async () => {
    const response = await fetch("/api/user");
    if (!response.ok) {
      return;
    }

    const userData = await response.json();
    console.log(userData);
    setUserId(userData.id);
  };

  const getChatHistory = async () => {
    const response = await fetch(`/api/chatrooms/${id}/chats`);
    if (!response.ok) {
      return;
    }

    const messages = await response.json();
    const messagesVM: ChatMessageVM[] = messages.map(
      mapChatMessageResponseToVM,
    );
    setChatMessages(messagesVM);
  };

  const mapChatMessageResponseToVM = (
    message: ChatMessageResponse,
  ): ChatMessageVM => {
    return {
      id: message.id,
      text: message.text,
      userId: message.userId,
      sentAt: message.sentAt,
      sentBy: message.sentBy.email,
    };
  };

  const sendMessage = async (message: string) => {
    setSendingMessage(true);
    try {
      if (!useHttpFallback && socket && socket.connected) {
        console.log("Emitting chat message...");
        socket.emit("chatMessage", {
          chatRoomId: chatRoom?.id,
          text: message,
        });
      } else {
        const response = await fetch(`/api/chatrooms/${id}/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
          }),
        });

        if (!response.ok) {
          setError("Failed to send message. Please try again later.");
          setSendingMessage(false);
          return;
        }

        const data = await response.json();
        console.log(data);

        getChatHistory();

        setSendingMessage(false);
      }
    } catch (error) {
      console.error(error);
      setSendingMessage(false);
    }
  };

  if (authLoading || isLoading)
    return (
      <LoadingIndicator
        isLoading={isLoading}
        loadingText="Loading chat room..."
      />
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!chatRoom) return <div className="text-center">Chat room not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{chatRoom.topic}</h1>
      <p className="mb-6">{chatRoom.description}</p>

      <ChatHistory currentUserId={userId} messages={chatMessages}></ChatHistory>

      <InputMessageBox
        onClickAction={sendMessage}
        sendingMessage={sendingMessage}
      ></InputMessageBox>
    </div>
  );
}
