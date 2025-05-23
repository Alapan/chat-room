"use client";

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {ChatRoom} from "@/app/types";
import {InputMessageBox} from "@/app/components/InputMessageBox";
import { LoadingIndicator } from '@/app/components/LoadingIndicator';

export default function ChatRoomPage() {
    const params = useParams();
    const id = params.id;

    const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

        fetchChatRoom();
    }, [id]);

    if (isLoading) return <LoadingIndicator isLoading={isLoading} loadingText='Loading chat room...'/>
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!chatRoom) return <div className="text-center">Chat room not found</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{chatRoom.topic}</h1>
            <p className="mb-6">{chatRoom.description}</p>
            {/* Messages history */}

            <InputMessageBox onClickAction={() => {}}></InputMessageBox>
        </div>
    );
}
