import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function PUT(req: NextRequest) {
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

    const payload = authService.verify(token) as { id: string };

    const body = await req.json();

    const result = await authService.changePassword(payload.id, body);

    return NextResponse.json(result);
    
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}