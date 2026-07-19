import { NextRequest, NextResponse } from "next/server";
import { tagService } from "@/services/tag.service";

export async function GET() {
  try {
    const tags = await tagService.getAll();

    return NextResponse.json({
      success: true,
      data: tags,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch tags.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const tag = await tagService.create(body);

    return NextResponse.json(
      {
        success: true,
        data: tag,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create tag.",
      },
      { status: 400 }
    );
  }
}