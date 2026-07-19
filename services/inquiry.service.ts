import { prisma } from "@/libs/db";

interface CreateInquiryDTO {
  fullName: string;
  email: string;
  goal: string;
  message: string;
}

interface ReplyDTO {
  inquiryId: string;
  adminEmail: string;
  message: string;
}

class InquiryService {
  /**
   * Create Inquiry
   */
  async create(data: CreateInquiryDTO) {
    return prisma.inquiry.create({
      data,
    });
  }

  /**
   * Get All
   */
  async getAll() {
    return prisma.inquiry.findMany({
      include: {
        replies: true,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
  }

  /**
   * Get One
   */
  async getById(id: string) {
    return prisma.inquiry.findUnique({
      where: {
        id,
      },
      include: {
        replies: true,
      },
    });
  }

  /**
   * Mark Read
   */
  async markAsRead(id: string) {
    return prisma.inquiry.update({
      where: {
        id,
      },
      data: {
        status: "read",
      },
    });
  }

  /**
   * Reply
   */
  async reply(data: ReplyDTO) {
    return prisma.inquiryReply.create({
      data: {
        inquiryId: data.inquiryId,
        adminEmail: data.adminEmail,
        message: data.message,
      },
    });
  }

  /**
   * Delete Inquiry
   */
  async delete(id: string) {
    return prisma.inquiry.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Count
   */
  async count() {
    return prisma.inquiry.count();
  }

  /**
   * Unread Count
   */
  async unreadCount() {
    return prisma.inquiry.count({
      where: {
        status: "unread",
      },
    });
  }
}

export const inquiryService = new InquiryService();