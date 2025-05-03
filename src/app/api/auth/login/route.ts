import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {z} from "zod";

interface LoginUser {
    email: string;
    password: string;
}

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '34ab287f-44c6-4a62-a828-9989f605aefe';

// model validation rules
const loginSchema = z.object({
    email: z.string()
        .nonempty({message: "Email is required"})
        .email({message: "Must be a valid email address"})
        .max(50, {message: "Email must be at most 50 characters long"}),
    password: z.string()
        .nonempty({message: "Password is required"})
        .min(6, {message: "Password must be at least 5 characters long"})
        .max(15, {message: "Password must be at most 15 characters long"})
        .refine((password) => /[A-Z]/.test(password),
            {message: "Password must be include at least 1 uppercase letter"})
        .refine((password) => /[a-z]/.test(password),
            {message: "Password must be include at least 1 lowercase letter"})
        .refine((password) => /[0-9]/.test(password),
            {message: "Password must be include at least 1 number"})
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Password must be include at least 1 of these special characters: !@#$%^&*",
        }),
});

export async function POST(request: NextRequest) {
    try {
        console.log(JWT_SECRET);
        const body: LoginUser = await request.json();

        // validate payload
        if (!body) {
            return NextResponse.json({error: 'Login Failed. Please provide all required fields.'}, {status: 400});
        }

        // model validation
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map((error) => error.message);
            return NextResponse.json({error: errors}, {status: 400});
        }

        // check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            return NextResponse.json({error: 'Login Failed. Invalid email and/or password.'}, {status: 404});
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({error: 'Login Failed. Invalid email and/or password.'}, {status: 401});
        }

        // generate JWT
        const token = jwt.sign({id: user.id, email: user.email, name: user.name}, JWT_SECRET, {
            expiresIn: '1h',
        });

        return NextResponse.json({message: 'User logged in successfully', token});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Login Failed. Please try again later.'});
    }
}
