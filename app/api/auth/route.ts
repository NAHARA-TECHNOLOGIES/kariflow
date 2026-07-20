import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { token, admin } = await authService.login(body);

    const response = NextResponse.json({
      success: true,
      admin,
    });

    const maxAge = body.rememberMe
  ? 60 * 60 * 24 * 30
  : 60 * 60 * 24 * 7;

    response.cookies.set({
  name:
    process.env.COOKIE_NAME ??
    "kariflow_token",
  value: token,
  httpOnly: true,
  secure:
    process.env.NODE_ENV ===
    "production",
  sameSite: "lax",
  path: "/",
  maxAge,
});

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}