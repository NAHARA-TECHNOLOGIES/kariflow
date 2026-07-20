import { NextRequest, NextResponse } from "next/server";
import { categoryService } from "@/services/category.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const category = await categoryService.getById(id);

  if (!category) {
    return NextResponse.json(
      {
        success: false,
        message: "Category not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: category,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const body = await request.json();

  const category = await categoryService.update(id, body);

  return NextResponse.json({
    success: true,
    data: category,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  await categoryService.delete(id);

  return NextResponse.json({
    success: true,
  });
}