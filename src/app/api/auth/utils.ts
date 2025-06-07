import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/types";

export const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return null;

  const decodedUser = jwt.verify(token!, JWT_SECRET) as User;
  console.log(decodedUser);
  if (!decodedUser) return null;

  return decodedUser;
};

export const extractToken = (request: NextRequest) => {
  let token = request.cookies.get("token")?.value;
  if (token == null) {
    if (request.headers.get("authorization") != null) {
      token = request.headers.get("authorization")!;
      token = token.replace("Bearer ", "");
      console.log(token);
    } else {
      return null;
    }
  }

  const tokenJson = JSON.parse(token);
  return tokenJson.token;
};
