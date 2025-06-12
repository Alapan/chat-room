import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { extractToken, verifyToken } from "@/app/api/auth/utils";
import { messageSchema } from "@/app/common/messageSchema";
import { ChatMessageResponse } from "@/app/types";

interface ChatMessageRequest {
  text: string;
}

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const prisma = new PrismaClient();
    if (!id) {
      return NextResponse.json(
        { error: "Chat room ID is required" },
        { status: 400 },
      );
    }
    const chatMessages: ChatMessageResponse[] = await prisma.message.findMany({
      where: { chatRoomId: parseInt(id) },
      select: {
        id: true,
        chatRoomId: true,
        userId: true,
        text: true,
        sentAt: true,
        sentBy: {
          select: {
            email: true,
          },
        },
      },
    });
    if (!chatMessages) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }
    return NextResponse.json(chatMessages);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { "Fetching chat messages failed": error },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const token = extractToken(request);
    const user = verifyToken(token || "");

    if (user == null) {
      return NextResponse.json(
        { error: "You need to login first" },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    const prisma = new PrismaClient();

    if (!id) {
      return NextResponse.json(
        { error: "Chat room ID is required" },
        { status: 400 },
      );
    }

    const body: ChatMessageRequest = await request.json();

    // Validate payload
    if (!body) {
      return NextResponse.json(
        { error: "Request body cannot be empty" },
        { status: 400 },
      );
    }

    // Model validation
    const validationResult = messageSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (error) => error.message,
      );
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        chatRoomId: parseInt(id),
        userId: user.id,
        text: body.text,
        sentAt: new Date(),
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Sending message failed" },
      { status: 500 },
    );
  }
}
