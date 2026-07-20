import { prisma } from "@/libs/db";

interface CreateWaitlistDTO {
  fullName: string;
  email: string;
  businessType: string;
  country: string;
  state: string;
  frequency?: string;
  categories?: string[];
  ipAddress?: string;
}

class WaitlistService {
  /**
   * Subscribe a new user
   */
  async subscribe(data: CreateWaitlistDTO) {
    const existing = await prisma.waitlist.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new Error("Email already exists.");
    }

    const categoryRecords =
      data.categories && data.categories.length > 0
        ? await prisma.category.findMany({
            where: {
              name: {
                in: data.categories,
              },
            },
          })
        : [];

    return prisma.waitlist.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        businessType: data.businessType,
        country: data.country,
        state: data.state,
        frequency: data.frequency ?? "weekly",
        ipAddress: data.ipAddress,

        categories: {
          connect: categoryRecords.map((c) => ({
            id: c.id,
          })),
        },
      },

      include: {
        categories: true,
      },
    });
  }

  /**
   * Get everyone
   */
  async getAll() {
    return prisma.waitlist.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Get one
   */
  async getByEmail(email: string) {
    return prisma.waitlist.findUnique({
      where: {
        email,
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * Delete subscriber
   */
  async delete(email: string) {
    return prisma.waitlist.delete({
      where: {
        email,
      },
    });
  }

  /**
   * Count subscribers
   */
  async count() {
    return prisma.waitlist.count();
  }
}

export const waitlistService = new WaitlistService();