import { NextResponse } from "next/server";
import { cookieConsentService } from "@/services/CookieConsentService";

export async function GET() {
  try {
    const analytics =
      await cookieConsentService.analytics();

    return NextResponse.json(analytics);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch analytics." },
      { status: 500 }
    );
  }
}