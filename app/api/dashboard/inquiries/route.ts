import { NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard.service";

export async function GET() {
  try {
    const data = await dashboardService.getInquiryStats();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch inquiry statistics." },
      { status: 500 }
    );
  }
}