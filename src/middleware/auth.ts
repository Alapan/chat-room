import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {User} from "@/types/User";

const JWT_SECRET = process.env.JWT_SECRET || '34ab287f-44c6-4a62-a828-9989f605aefe';

export async function authenticate(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({error: 'No authentication token provided'}, {status: 401});
    }

    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, JWT_SECRET) as User;
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Invalid or expired token'}, {status: 401});
    }
}