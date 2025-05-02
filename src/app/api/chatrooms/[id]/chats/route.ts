import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";


interface ChatMessage {
    id: number;
    chatRoomId: number;
    userId: number;
    text: string;
    sentAt: Date;
}

export async function GET(_: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        const prisma = new PrismaClient();
        if (!id) {
            return NextResponse.json({ error: 'Chat room ID is required' }, { status: 400 });
        }
        const chatMessages : ChatMessage[] = await prisma.message.findMany({
            where: { chatRoomId: parseInt(id) },
            select: {
                id: true,
                chatRoomId: true,
                userId: true,
                text: true,
                sentAt: true,
            },
        });
        if (!chatMessages) {
            return NextResponse.json({ error: 'No messages found' }, { status: 404 });
        }
        return NextResponse.json(chatMessages);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Fetching chat messages failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        const prisma = new PrismaClient();
        if (!id) {
            return NextResponse.json({ error: 'Chat room ID is required' }, { status: 400 });
        }
        const body: ChatMessage = await request.json();

        if (!body || !body.userId || !body.text) {
            return NextResponse.json({ error: 'User ID and message text are required' }, { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                chatRoomId: parseInt(id),
                userId: parseInt(body.userId.toString()),
                text: body.text,
                sentAt: new Date(),
            },
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Sending message failed' }, { status: 500 });
    }
}