import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

interface ChatRoomRequest {
  params: {
    id: string;
  }
}

export async function GET(_: NextRequest, params: ChatRoomRequest) {
  try {
    const { id } = await params.params;
    const prisma = new PrismaClient();
    if (!id) {
      return NextResponse.json({ error: 'Chat room ID is required' }, { status: 400});
    }
    const chatRoom = await prisma.chatRoom.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        topic: true,
        image: true,
        description: true,
      },
    });
    if (!chatRoom) {
      return NextResponse.json({ error: 'Chat room not found' }, { status: 404 });
    }
    return NextResponse.json(chatRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Fetching chat room failed'}, { status: 500});
  }
};
