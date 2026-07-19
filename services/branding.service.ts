import { prisma } from "@/libs/db";
import { uploadService } from "@/services/upload.service";

interface UpdateBrandingDTO {
  logoMode?: string;
  customUrl?: string | null;
}

class BrandingService {
  async getSettings() {
    const branding = await prisma.brandingSettings.findUnique({
      where: {
        id: "global",
      },
    });

    if (branding) return branding;

    return prisma.brandingSettings.create({
      data: {
        id: "global",
        logoMode: "svg",
        customUrl: null,
      },
    });
  }

  async update(data: UpdateBrandingDTO) {
    let finalCustomUrl = data.customUrl;

    // --- UPLOAD SERVICE INTEGRATION ---
    // If a customUrl is provided and it is a local path/base64 (not already hosted)
    if (
      finalCustomUrl &&
      typeof finalCustomUrl === "string" &&
      !finalCustomUrl.startsWith("http")
    ) {
      const uploadResult = await uploadService.uploadImage(
        finalCustomUrl,
        "kariflow/branding"
      );
      finalCustomUrl = uploadResult.url;
    }
    // ----------------------------------

    return prisma.brandingSettings.upsert({
      where: {
        id: "global",
      },

      update: {
        ...(data.logoMode !== undefined && {
          logoMode: data.logoMode,
        }),

        ...(finalCustomUrl !== undefined && {
          customUrl: finalCustomUrl,
        }),
      },

      create: {
        id: "global",
        logoMode: data.logoMode ?? "svg",
        customUrl: finalCustomUrl ?? null,
      },
    });
  }

  async reset() {
    return prisma.brandingSettings.update({
      where: {
        id: "global",
      },

      data: {
        logoMode: "svg",
        customUrl: null,
      },
    });
  }
}

export const brandingService = new BrandingService();