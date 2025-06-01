'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {ChatRoom} from '@/app/types';
import {InputMessageBox} from '@/app/components/InputMessageBox';
import {LoadingIndicator} from '@/app/components/LoadingIndicator';
import {useAppSelector} from '@/app/state/hooks';
import {selectAuthLoading, selectIsAuthenticated} from '@/app/state/slices/authSlice';

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

    const sendMessage = async (message: string) => {
        setSendingMessage(true);
        console.log(message);
        try {
            const response = await fetch(`/api/chatrooms/${id}/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: message,
                })
            });

            if (!response.ok) {
                setError('Failed to send message. Please try again later.');
                setSendingMessage(false);
                return;
            }

            const data = await response.json();
            console.log(data);

            // update chat history //

            setSendingMessage(false);
        } catch (error) {
            console.error(error);
            setSendingMessage(false);
        }

    };

    if (authLoading || isLoading) return <LoadingIndicator isLoading={isLoading} loadingText='Loading chat room...'/>
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!chatRoom) return <div className="text-center">Chat room not found</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{chatRoom.topic}</h1>
            <p className="mb-6">{chatRoom.description}</p>
            {/* Messages history */}

            <InputMessageBox onClickAction={sendMessage} sendingMessage={sendingMessage}></InputMessageBox>
        </div>
    );
}
