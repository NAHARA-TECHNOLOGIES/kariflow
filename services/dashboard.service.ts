import { prisma } from "@/libs/db";

class DashboardService {
  async getOverview() {
    const [
      waitlists,
      blogs,
      publishedBlogs,
      inquiries,
      unreadInquiries,
      categories,
      tags,
    ] = await Promise.all([
      prisma.waitlist.count(),
      prisma.blogPost.count(),
      prisma.blogPost.count({
        where: {
          published: true,
        },
      }),
      prisma.inquiry.count(),
      prisma.inquiry.count({
        where: {
          status: "unread",
        },
      }),
      prisma.category.count(),
      prisma.blogTag.count(),
    ]);

    return {
      waitlists,
      blogs,
      publishedBlogs,
      inquiries,
      unreadInquiries,
      categories,
      tags,
    };
  }

  async getBlogStats() {
    const [
      total,
      published,
      drafts,
      featured,
      totalViews,
      mostViewed,
    ] = await Promise.all([
      prisma.blogPost.count(),

      prisma.blogPost.count({
        where: {
          published: true,
        },
      }),

      prisma.blogPost.count({
        where: {
          published: false,
        },
      }),

      prisma.blogPost.count({
        where: {
          featured: true,
        },
      }),

      prisma.blogPost.aggregate({
        _sum: {
          views: true,
        },
      }),

      prisma.blogPost.findMany({
        take: 5,
        orderBy: {
          views: "desc",
        },
        include: {
          category: true,
        },
      }),
    ]);

    return {
      total,
      published,
      drafts,
      featured,
      totalViews: totalViews._sum.views ?? 0,
      mostViewed,
    };
  }

  async getWaitlistStats() {
    const total = await prisma.waitlist.count();

    const countries = await prisma.waitlist.groupBy({
      by: ["country"],
      _count: true,
      orderBy: {
        _count: {
          country: "desc",
        },
      },
    });

    const businessTypes = await prisma.waitlist.groupBy({
      by: ["businessType"],
      _count: true,
      orderBy: {
        _count: {
          businessType: "desc",
        },
      },
    });

    return {
      total,
      countries,
      businessTypes,
    };
  }

  async getInquiryStats() {
    const [total, unread, read, replied] = await Promise.all([
      prisma.inquiry.count(),

      prisma.inquiry.count({
        where: {
          status: "unread",
        },
      }),

      prisma.inquiry.count({
        where: {
          status: "read",
        },
      }),

      prisma.inquiry.count({
        where: {
          status: "replied",
        },
      }),
    ]);

    return {
      total,
      unread,
      read,
      replied,
    };
  }

  async getRecentActivities() {
    const [waitlists, blogs, inquiries] = await Promise.all([
      prisma.waitlist.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.blogPost.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      }),

      prisma.inquiry.findMany({
        take: 5,
        orderBy: {
          submittedAt: "desc",
        },
      }),
    ]);

    return {
      waitlists,
      blogs,
      inquiries,
    };
  }
}

export const dashboardService = new DashboardService();