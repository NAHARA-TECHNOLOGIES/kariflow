import { NextRequest, NextResponse } from "next/server";
import { cookieConsentService } from "@/services/CookieConsentService";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const consent = await cookieConsentService.getById(id);

    if (!consent) {
      return NextResponse.json(
        { message: "Consent not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(consent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch consent." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const consent = await cookieConsentService.update(id, body);

    return NextResponse.json(consent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update consent." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await cookieConsentService.delete(id);

    return NextResponse.json({
      message: "Consent deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete consent." },
      { status: 500 }
    );
  }
}