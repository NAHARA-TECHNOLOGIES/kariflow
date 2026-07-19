import { NextResponse } from "next/server";
import { blogService } from "@/services/blog.service";

export async function GET() {
  try {
    const blogs = await blogService.getFeatured();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch featured blogs.",
      },
      {
        status: 500,
      }
    );
  }
}