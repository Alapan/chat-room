"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import { ListItem } from "./ListItem";
import { ChatRoom } from "@/app/types";

export const ChatRoomList = () =>  {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await fetch('/api/chatrooms');
                if (!response.ok) {
                    setError('Error loading chat rooms');
                    return;
                }
                const data = await response.json();
                setChatRooms(data);
            } catch (err) {
                setError('Error loading chat rooms');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChatRooms();
    }, []);

    if (loading) return <div className="text-center">Loading chat rooms...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="w-full max-w-3xl flex flex-col gap-4">
            {chatRooms.length > 0 ? (
                chatRooms.map((room) => (
                    <Link href={`/chatroom/${room.id}`} key={room.id}>
                        <ListItem topic={room.topic} description={room.description} />
                    </Link>
                ))
            ) : (
                <div className="text-center">No chat rooms available</div>
            )}
        </div>
    );
};