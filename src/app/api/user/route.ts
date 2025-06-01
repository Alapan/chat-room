import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/api/auth/utils";
import {PrismaClient} from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);

        if (user == null) {
            return NextResponse.json({error: 'You need to login first'}, {status: 401});
        }

        const prisma = new PrismaClient();

        const dbUser = await prisma.user.findUnique({
            where: {id: user.id, isActive: true},
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if (!user) {
            return NextResponse.json({error: 'User does not exist or is inactive'}, {status: 400});
        }

        return NextResponse.json(dbUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Fetching user information failed'}, {status: 500});
    }
}