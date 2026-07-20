import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get(process.env.COOKIE_NAME || "kariflow_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const admin = await authService.me(token);

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }
}