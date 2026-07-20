import { NextRequest, NextResponse } from "next/server";
import { blogService } from "@/services/blog.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const blog = await blogService.getById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch blog.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const blog = await blogService.update(id, body);

    return NextResponse.json({
      success: true,
      message: "Blog updated.",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Update failed.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    await blogService.delete(id);

    return NextResponse.json({
      success: true,
      message: "Blog deleted.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed.",
      },
      {
        status: 500,
      }
    );
  }
}