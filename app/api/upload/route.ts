import { NextRequest, NextResponse } from "next/server";
import { uploadService } from "@/services/upload.service";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempPath = path.join(os.tmpdir(), file.name);

    await writeFile(tempPath, buffer);

    const uploaded = file.type.startsWith("video/")
      ? await uploadService.uploadVideo(tempPath)
      : await uploadService.uploadImage(tempPath);

    return NextResponse.json({
      success: true,
      data: uploaded,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed.",
      },
      { status: 500 }
    );
  }
}