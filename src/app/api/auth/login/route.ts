import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/app/common/loginSchema";

interface LoginUser {
  email: string;
  password: string;
}

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    console.log(JWT_SECRET);
    const body: LoginUser = await request.json();

    // validate payload
    if (!body) {
      return NextResponse.json(
        { error: "Login Failed. Please provide all required fields." },
        { status: 400 },
      );
    }

    // model validation
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (error) => error.message,
      );
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Login Failed. Invalid email and/or password." },
        { status: 404 },
      );
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Login Failed. Invalid email and/or password." },
        { status: 401 },
      );
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const expiry = Date.now() + 3600 * 1000;
    const response = NextResponse.json({
      message: "User logged in successfully",
      token,
      expiry,
    });
    response.cookies.set(
      "token",
      JSON.stringify({
        token,
        expiry: expiry,
      }),
      { httpOnly: true, secure: true, path: "/", maxAge: 3600 },
    );
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Login Failed. Please try again later.",
    });
  }
}
