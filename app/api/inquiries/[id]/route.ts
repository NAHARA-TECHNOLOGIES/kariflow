import { NextRequest, NextResponse } from "next/server";
import { inquiryService } from "@/services/inquiry.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const inquiry = await inquiryService.getById(id);

  if (!inquiry) {
    return NextResponse.json(
      {
        success: false,
        message: "Inquiry not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: inquiry,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  await inquiryService.delete(id);

  return NextResponse.json({
    success: true,
  });
}