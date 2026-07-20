import { NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard.service";

export async function GET() {
  try {
    const [
      overview,
      blogs,
      waitlist,
      inquiries,
      activity,
    ] = await Promise.all([
      dashboardService.getOverview(),
      dashboardService.getBlogStats(),
      dashboardService.getWaitlistStats(),
      dashboardService.getInquiryStats(),
      dashboardService.getRecentActivities(),
    ]);

    return NextResponse.json({
      overview,
      blogs,
      waitlist,
      inquiries,
      activity,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}