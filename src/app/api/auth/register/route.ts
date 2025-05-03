import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {z} from "zod";

interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const prisma = new PrismaClient();

// model validation rules
const registerUserSchema = z.object({
    name: z.string()
        .nonempty({message: "Name is required"})
        .min(5, {message: "Name must be at least 5 characters long"})
        .max(50, {message: "Name must be at most 50 characters long"}),
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
    confirmPassword: z.string()
        .nonempty({message: "Confirm Password is required"})
        .min(6, {message: "Confirm Password must be at least 5 characters long"})
        .max(15, {message: "Confirm Password must be at most 15 characters long"})
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Confirm Password must be same as Password",
            path: ["confirmPassword"],
        })
    }
});

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