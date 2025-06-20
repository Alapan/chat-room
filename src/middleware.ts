import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chatrooms", "/chatrooms/:path*"],
};
