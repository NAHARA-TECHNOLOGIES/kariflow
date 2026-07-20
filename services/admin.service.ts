import { prisma } from "@/libs/db";
import { hashPassword } from "../src/utils/password";

export interface CreateAdminDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
}

export interface UpdateAdminDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  active?: boolean;
}

class AdminService {
  async create(data: CreateAdminDTO) {
    const exists = await prisma.adminUser.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (exists) {
      throw new Error("Admin already exists.");
    }

    const password = await hashPassword(data.password);

    return prisma.adminUser.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.toLowerCase(),
        password,
        role: data.role ?? "ADMIN",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  }

  async getAll() {
    return prisma.adminUser.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  }

  async getById(id: string) {
    return prisma.adminUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: UpdateAdminDTO) {
    return prisma.adminUser.update({
      where: {
        id,
      },
      data: {
        ...(data.firstName !== undefined && {
          firstName: data.firstName,
        }),

        ...(data.lastName !== undefined && {
          lastName: data.lastName,
        }),

        ...(data.email !== undefined && {
          email: data.email.toLowerCase(),
        }),

        ...(data.avatar !== undefined && {
          avatar: data.avatar,
        }),

        ...(data.role !== undefined && {
          role: data.role,
        }),

        ...(data.active !== undefined && {
          active: data.active,
        }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  }

  async activate(id: string) {
    return prisma.adminUser.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }

  async deactivate(id: string) {
    return prisma.adminUser.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  async delete(id: string) {
    return prisma.adminUser.delete({
      where: {
        id,
      },
    });
  }
}

export const adminService = new AdminService();