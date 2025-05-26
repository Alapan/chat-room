import express from 'express';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';

import { verifyToken } from '@/app/api/auth/utils';
import { Message } from '@/types/Message';

const app = express();
const PORT = 5000;
const server = http.createServer(app);

const cookie = require('cookie');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

const prisma = new PrismaClient();

io.use((socket, next) => {
  const userCookie  = socket.request.headers.cookie || '';
  const parsedCookie = cookie.parse(userCookie);
  const { token } = JSON.parse(parsedCookie.token);

  if (!token) {
    return next(new Error('Authentication token not found!'));
  }

  const user = verifyToken(token);

  if (!user) {
    return next(new Error('User not authenticated!'));
  }

  socket.data.user = user;
  next();
});

io.on('connection', (socket) => {
  console.log(`User ${socket.data.user.name} connected with ID ${socket.id}`);
  socket.on('chatMessage', async (data: Message) => {
    const user = socket.data.user;
    console.log(`User ${user.name} sent a message: `, data);

    const chatRoom = await prisma.chatRoom.findUnique({
      where: { id: data.chatRoom.id }
    });

    if (!chatRoom) {
      socket.emit('error', {
        message: 'Chat room does not exist',
      });
      socket.disconnect();
    }

    await prisma.message.create({
      data: {
        chatRoomId: data.chatRoom.id,
        userId: socket.data.user.id,
        text: data.text,
        sentAt: new Date(),
      }
    });

    socket.emit('chatResponse', {
      message: 'Text saved successfully',
      original: data.text,
    });
  });
});

server.listen(PORT, () => {
  console.log('Socket.IO server is running on port 5000...')
});
