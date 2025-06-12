import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");

    if (!cookies || !cookies.includes("token=")) {
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.delete("token");
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (error) {
    console.error("Error logging out: ", error);
    return NextResponse.json(
      { error: "Logout failed. Please try again" },
      { status: 500 },
    );
  }
}
