import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const COOKIE_NAME = process.env.COOKIE_NAME || "kariflow_token";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};