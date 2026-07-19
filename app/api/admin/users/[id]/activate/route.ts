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

    await adminService.activate(id);

    return NextResponse.json({
      success: true,
      message: "Admin activated.",
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