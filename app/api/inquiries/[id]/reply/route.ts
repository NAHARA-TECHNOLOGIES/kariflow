import { NextRequest, NextResponse } from "next/server";
import { inquiryService } from "@/services/inquiry.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const body = await req.json();

  const { adminEmail, message } = body;

  if (!adminEmail || !message) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing fields.",
      },
      {
        status: 400,
      }
    );
  }

  const reply = await inquiryService.reply({
    inquiryId: id,
    adminEmail,
    message,
  });

  await inquiryService.markAsRead(id);

  return NextResponse.json({
    success: true,
    data: reply,
  });
}