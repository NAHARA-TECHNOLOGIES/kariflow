import cloudinary from "@/libs/cloudinary";

class UploadService {
  async uploadImage(filePath: string, folder = "kariflow") {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }

  async uploadVideo(filePath: string, folder = "kariflow/videos") {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "video",
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      duration: result.duration,
    };
  }

  async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}

export const uploadService = new UploadService();