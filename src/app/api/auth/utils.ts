import jwt from 'jsonwebtoken';
import { User } from '@/types/User';
require('dotenv').config();

export const verifyToken = (token: string) => {
  if (!token) return null;

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return null;

  const decodedUser = jwt.verify(token, JWT_SECRET) as User;
  if (!decodedUser) return null;

  return decodedUser;
};
