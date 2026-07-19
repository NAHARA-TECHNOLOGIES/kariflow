import { NextRequest, NextResponse } from "next/server";
import { brandingService } from "@/services/branding.service";

export async function GET() {
  try {
    const branding = await brandingService.getSettings();

    return NextResponse.json({
      success: true,
      data: branding,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load branding settings.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const branding = await brandingService.update(body);

    return NextResponse.json({
      success: true,
      message: "Branding updated successfully.",
      data: branding,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update branding.",
      },
      {
        status: 500,
      }
    );
  }
}