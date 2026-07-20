import { NextResponse } from "next/server";
import { newsletterService } from "@/services/newsletterEngine";

export async function GET() {
  try {
    const result = await newsletterService.sendNewsletter();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}