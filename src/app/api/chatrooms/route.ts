import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const chatRooms = await prisma.chatRoom.findMany({
      select: {
        id: true,
        topic: true,
        image: true,
        description: true,
      },
    });
    return NextResponse.json(chatRooms);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
