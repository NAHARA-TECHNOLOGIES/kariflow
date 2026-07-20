import { NextRequest, NextResponse } from "next/server";
import { blogService } from "@/services/blog.service";

export async function GET() {
  try {
    const blogs = await blogService.getAll();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog posts.",
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

    const blog = await blogService.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully.",
        data: blog,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create blog post.",
      },
      {
        status: 400,
      }
    );
  }
}