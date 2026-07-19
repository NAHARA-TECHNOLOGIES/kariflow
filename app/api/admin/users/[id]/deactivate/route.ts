import { NextResponse } from "next/server";
import { adminService } from "@/services/admin.service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await adminService.deactivate(id);

    return NextResponse.json({
      success: true,
      message: "Admin deactivated.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}