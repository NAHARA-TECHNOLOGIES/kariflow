import { NextRequest, NextResponse } from "next/server";
import { cookieConsentService } from "@/services/CookieConsentService";

export async function GET() {
  try {
    const data = await cookieConsentService.getAll();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch cookie consent logs." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const consent = await cookieConsentService.create(body);

    return NextResponse.json(consent, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create cookie consent." },
      { status: 500 }
    );
  }
}