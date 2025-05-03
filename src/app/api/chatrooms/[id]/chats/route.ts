import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {authenticate} from "@/middleware/auth";


interface ChatMessageRequest {
    text: string;
}

interface ChatMessageResponse {
    id: number;
    chatRoomId: number;
    userId: number;
    text: string;
    sentAt: Date;
}

const postMessageSchema = z.object({
    text: z.string()
        .nonempty({message: "Message cannot be empty"})
        .max(2000, {message: "Message cannot exceed 2000 characters"}),
});

export async function GET(_: NextRequest, context: { params: { id: string } }) {
    try {
        const {id} = await context.params;
        const prisma = new PrismaClient();
        if (!id) {
            return NextResponse.json({error: "Chat room ID is required"}, {status: 400});
        }
        const chatMessages: ChatMessageResponse[] = await prisma.message.findMany({
            where: {chatRoomId: parseInt(id)},
            select: {
                id: true,
                chatRoomId: true,
                userId: true,
                text: true,
                sentAt: true,
            },
        });
        if (!chatMessages) {
            return NextResponse.json({error: 'No messages found'}, {status: 404});
        }
        return NextResponse.json(chatMessages);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Fetching chat messages failed'}, {status: 500});
    }
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
    try {
        const user = await authenticate(request);

        if (!user || user instanceof NextResponse) {
            return user;
        }

        const {id} = await context.params;
        const prisma = new PrismaClient();

        // if (!id) {
        //     return NextResponse.json({error: 'Chat room ID is required'}, {status: 400});
        // }

        const body: ChatMessageRequest = await request.json();

        // Validate payload
        if (!body) {
            return NextResponse.json({error: 'Request body cannot be empty'}, {status: 400});
        }

        // Model validation
        const validationResult = postMessageSchema.safeParse(body);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map((error) => error.message);
            return NextResponse.json({error: errors}, {status: 400});
        }

        const newMessage = await prisma.message.create({
            data: {
                chatRoomId: parseInt(id),
                // userId: parseInt(body.userId.toString()),
                userId: user.id,
                text: body.text,
                sentAt: new Date(),
            },
        });

        return NextResponse.json(newMessage, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Sending message failed'}, {status: 500});
    }
}