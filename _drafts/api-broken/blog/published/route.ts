import { NextResponse } from "next/server";
import { blogService } from "@/services/blog.service";

export async function GET() {
  try {
    const blogs = await blogService.getPublished();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch published blogs.",
      },
      {
        status: 500,
      }
    );
  }
}