import { NextRequest, NextResponse } from "next/server";
import { uploadService } from "@/services/upload.service";

interface Params {
  params: Promise<{
    publicId: string;
  }>;
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { publicId } = await params;

    await uploadService.delete(publicId);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete file.",
      },
      { status: 500 }
    );
  }
}