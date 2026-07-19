import { prisma } from "@/libs/db";

export interface CreateCookieConsentDTO {
  anonymousId: string;
  necessary?: boolean;
  analytics: boolean;
  marketing: boolean;
  userAgent: string;
  country?: string;
  city?: string;
}

class CookieConsentService {
  async create(data: CreateCookieConsentDTO) {
    return prisma.cookieConsentLog.create({
      data: {
        anonymousId: data.anonymousId,
        necessary: data.necessary ?? true,
        analytics: data.analytics,
        marketing: data.marketing,
        userAgent: data.userAgent,
        country: data.country,
        city: data.city,
      },
    });
  }

  async getAll() {
    return prisma.cookieConsentLog.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.cookieConsentLog.findUnique({
      where: {
        id,
      },
    });
  }

  async getByAnonymousId(anonymousId: string) {
    return prisma.cookieConsentLog.findFirst({
      where: {
        anonymousId,
      },
      orderBy: {
        timestamp: "desc",
      },
    });
  }

  async update(
    id: string,
    data: Partial<CreateCookieConsentDTO>
  ) {
    return prisma.cookieConsentLog.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.cookieConsentLog.delete({
      where: {
        id,
      },
    });
  }

  async deleteByAnonymousId(anonymousId: string) {
    return prisma.cookieConsentLog.deleteMany({
      where: {
        anonymousId,
      },
    });
  }

  async analytics() {
    const total = await prisma.cookieConsentLog.count();

    const acceptedAnalytics =
      await prisma.cookieConsentLog.count({
        where: {
          analytics: true,
        },
      });

    const acceptedMarketing =
      await prisma.cookieConsentLog.count({
        where: {
          marketing: true,
        },
      });

    const rejectedAnalytics =
      await prisma.cookieConsentLog.count({
        where: {
          analytics: false,
        },
      });

    const rejectedMarketing =
      await prisma.cookieConsentLog.count({
        where: {
          marketing: false,
        },
      });

    return {
      total,
      analyticsAccepted: acceptedAnalytics,
      analyticsRejected: rejectedAnalytics,
      marketingAccepted: acceptedMarketing,
      marketingRejected: rejectedMarketing,
      analyticsRate:
        total === 0
          ? 0
          : Number(
              ((acceptedAnalytics / total) * 100).toFixed(2)
            ),
      marketingRate:
        total === 0
          ? 0
          : Number(
              ((acceptedMarketing / total) * 100).toFixed(2)
            ),
    };
  }
}

export const cookieConsentService =
  new CookieConsentService();