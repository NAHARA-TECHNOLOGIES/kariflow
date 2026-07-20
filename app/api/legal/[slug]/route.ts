import { NextRequest, NextResponse } from "next/server";
import { legalService } from "@/services/legal.service";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params;

    const document = await legalService.getBySlug(slug);

    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Legal document not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch legal document.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const document = await legalService.update(slug, body);

    return NextResponse.json({
      success: true,
      message: "Legal document updated successfully.",
      data: document,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update legal document.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params;

    await legalService.delete(slug);

    return NextResponse.json({
      success: true,
      message: "Legal document deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete legal document.",
      },
      { status: 500 }
    );
  }
}