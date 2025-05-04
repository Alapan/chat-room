import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import { registerUserSchema } from "@/app/common/registerSchema";

interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body: RegisterUser = await request.json();

        // validate payload
        if (!body) {
            return NextResponse.json({error: "Registration Failed. Please provide all required fields."}, {status: 400});
        }

        // model validation
        const validationResult = registerUserSchema.safeParse(body);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map((error) => error.message);
            return NextResponse.json({error: errors}, {status: 400});
        }

        // check if password and confirm password are same
        if (body.password !== body.confirmPassword) {
            return NextResponse.json({error: "Registration Failed. Passwords do not match."}, {status: 400});
        }

        // check if user already registered
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (existingUser) {
            return NextResponse.json({error: "Registration Failed. Maybe you are already registered?"}, {status: 400});
        }

        // hash and salt the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // create user
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                isActive: true,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({message: "User registered successfully", newUser}, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Registration Failed. Please try again later."});
    }
}