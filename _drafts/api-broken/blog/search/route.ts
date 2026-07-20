import { NextRequest, NextResponse } from "next/server";
import { blogService } from "@/services/blog.service";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("q") ?? "";

    const blogs = await blogService.search(search);

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Search failed.",
      },
      {
        status: 500,
      }
    );
  }
}