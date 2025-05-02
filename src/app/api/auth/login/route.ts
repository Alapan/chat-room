import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginUser {
  email: string;
  password: string;
}

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '34ab287f-44c6-4a62-a828-9989f605aefe';

export async function POST(request: NextRequest) {
  try {
    console.log(JWT_SECRET);
    const body: LoginUser = await request.json();

    // validate fields
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ error: 'Login Failed. Please provide all required fields.' }, { status: 400 });
    }

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json({ error: 'Login Failed. Invalid email and/or password.' }, { status: 404 });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Login Failed. Invalid email and/or password.' }, { status: 401 });
    }

    // generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Login Failed. Please try again later.' });
  }
}
