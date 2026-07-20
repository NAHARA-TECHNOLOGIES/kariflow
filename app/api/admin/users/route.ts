import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/services/admin.service";

export async function GET() {
  try {
    const admins = await adminService.getAll();

    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
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

    const admin = await adminService.create(body);

    return NextResponse.json(
      {
        success: true,
        data: admin,
      },
      {
        status: 201,
      }
    );
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