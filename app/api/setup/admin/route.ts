import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/libs/db";

export async function GET() {
  try {
    const email = "admin@kariflow.com";

    const existing = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists.",
        data: existing,
      });
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await prisma.adminUser.create({
      data: {
        firstName: "Kariflow",
        lastName: "Administrator",
        email,
        password: hashedPassword,
        role: "SUPER_ADMIN",
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
      data: admin,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create admin.",
      },
      {
        status: 500,
      }
    );
  }
}