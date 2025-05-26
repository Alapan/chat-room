'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import io from 'socket.io-client';

import { ChatRoom } from '@/app/types';
import { InputMessageBox } from '@/app/components/InputMessageBox';
import { LoadingIndicator } from '@/app/components/LoadingIndicator';
import { useAppSelector } from '@/app/state/hooks';
import { selectAuthLoading, selectIsAuthenticated } from '@/app/state/slices/authSlice';

export default function ChatRoomPage() {
  const params = useParams();
  const id = params.id;

  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: [ 'websocket' ]
    });
    newSocket.on('connection', () => {
      console.log('Socker connected to server!');
    });

    newSocket.on('chatResponse', (data: { original: string; }) => {
      setMessages((prevMessages) => [...prevMessages, data.original]);
    });

    newSocket.on('error', (message: string) => {
      console.log('Error: ', message);
    })

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log('Socket disconnected');
      }
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const response = await fetch(`/api/chatrooms/${id}`);
        if (!response.ok) {
          setError('Failed to fetch chat room');
          return;
        }
        const data = await response.json();
        setChatRoom(data);
      } catch (err) {
        setError('Error loading chat room');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
      fetchChatRoom();
    }
  }, [id, authLoading, isAuthenticated]);

  const onClickAction = (message: string) => {
    if (!chatRoom) return;

    if (!socket) return;

    socket.emit('chatMessage', {
      chatRoom,
      text: message
    });
  }

  if (authLoading || isLoading) return <LoadingIndicator isLoading={isLoading} loadingText='Loading chat room...'/>
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!chatRoom) return <div className="text-center">Chat room not found</div>;

  return (
    <div className="container w-full mx-auto flex flex-col h-screen mt-4 mb-6">

      {/* Messages history */}

      <div className='mx-6'>
        <h1 className="text-3xl font-bold mb-4">{chatRoom.topic}</h1>
        <p className="mb-6">{chatRoom.description}</p>
        <InputMessageBox onClickAction={onClickAction}></InputMessageBox>
      </div>

      <div className='bg-gray-100 p-4 rounded-md shadow-md flex-1 overflow-y-auto'>
        <h2>Messages</h2>
        <ul className='list-disc pl-6'>
          {messages.map((message, index) => (
            <li key={index} className='mb-2'>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
