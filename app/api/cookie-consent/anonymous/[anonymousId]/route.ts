import { NextRequest, NextResponse } from "next/server";
import { cookieConsentService } from "@/services/CookieConsentService";

interface Params {
  params: Promise<{
    anonymousId: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { anonymousId } = await params;

    const consent =
      await cookieConsentService.getByAnonymousId(
        anonymousId
      );

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

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { anonymousId } = await params;

    await cookieConsentService.deleteByAnonymousId(
      anonymousId
    );

    return NextResponse.json({
      message: "Consent records deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete consent records." },
      { status: 500 }
    );
  }
}