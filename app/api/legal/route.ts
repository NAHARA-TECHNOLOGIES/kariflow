import { NextRequest, NextResponse } from "next/server";
import { legalService } from "@/services/legal.service";

export async function GET() {
  try {
    const documents = await legalService.getAll();

    return NextResponse.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch legal documents.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const document = await legalService.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Legal document created successfully.",
        data: document,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create legal document.",
      },
      { status: 400 }
    );
  }
}