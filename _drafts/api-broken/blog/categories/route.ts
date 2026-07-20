import { NextRequest, NextResponse } from "next/server";
import { categoryService } from "@/services/category.service";

export async function GET() {
  try {
    const categories = await categoryService.getAll();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch categories.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const category = await categoryService.create(body);

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create category.",
      },
      {
        status: 400,
      }
    );
  }
}