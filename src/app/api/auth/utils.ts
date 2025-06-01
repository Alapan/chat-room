import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/types/User';

export const verifyToken = (request: NextRequest) => {
  let token = request.cookies.get('token')?.value;
  console.log("1");
  if (token == null) {
    console.log("2");
    if(request.headers.get("authorization") != null) {
      token = request.headers.get("authorization")!;
      token = token.replace("Bearer ", "");
      console.log(token);
    }
    else {
      console.log("3");
      return null;
    }
  }

  console.log("4");
  console.log(token);

  const tokenJson = JSON.parse(token);
  token = tokenJson.token;

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return null;

  const decodedUser = jwt.verify(token!, JWT_SECRET) as User;
  console.log(decodedUser);
  if (!decodedUser) return null;

  return decodedUser;
};
