import { NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard.service";

export async function GET() {
  try {
    const data = await dashboardService.getWaitlistStats();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch waitlist statistics." },
      { status: 500 }
    );
  }
}