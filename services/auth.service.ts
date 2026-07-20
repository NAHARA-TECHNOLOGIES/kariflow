import { prisma } from "@/libs/db";
import { comparePassword, hashPassword } from "../src/utils/password";
import { signToken, verifyToken } from "@/libs/jwt";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
}

class AuthService {
  async login(data: LoginDTO) {
    const admin = await prisma.adminUser.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (!admin) {
      throw new Error("Invalid email or password.");
    }

    if (!admin.active) {
      throw new Error("Your account has been disabled.");
    }

    const validPassword = await comparePassword(
      data.password,
      admin.password
    );

    if (!validPassword) {
      throw new Error("Invalid email or password.");
    }

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    const token = signToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return {
      token,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      },
    };
  }

  async me(token: string) {
    const payload = verifyToken(token) as {
      id: string;
    };

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!admin) {
      throw new Error("Admin not found.");
    }

    return admin;
  }

  async changePassword(
    adminId: string,
    data: ChangePasswordDTO
  ) {
    const admin = await prisma.adminUser.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      throw new Error("Admin not found.");
    }

    const passwordMatches = await comparePassword(
      data.currentPassword,
      admin.password
    );

    if (!passwordMatches) {
      throw new Error("Current password is incorrect.");
    }

    const samePassword = await comparePassword(
      data.newPassword,
      admin.password
    );

    if (samePassword) {
      throw new Error(
        "New password must be different from the current password."
      );
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password changed successfully.",
    };
  }

  async forgotPassword(data: ForgotPasswordDTO) {
    const admin = await prisma.adminUser.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    /**
     * Don't reveal whether the email exists.
     */
    if (!admin) {
      return {
        success: true,
        message:
          "If an account exists, a password reset email has been sent.",
      };
    }

    const token = signToken({
      id: admin.id,
      type: "password-reset",
    });

    /**
     * TODO
     * Send email here.
     *
     * await emailService.sendPasswordReset(
     * admin.email,
     * token
     * )
     */

    return {
      success: true,
      message:
        "If an account exists, a password reset email has been sent.",
      token,
    };
  }

  async resetPassword(data: ResetPasswordDTO) {
    const payload = verifyToken(data.token) as {
      id: string;
      type: string;
    };

    if (payload.type !== "password-reset") {
      throw new Error("Invalid reset token.");
    }

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!admin) {
      throw new Error("Admin not found.");
    }

    const hashedPassword = await hashPassword(data.password);

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password has been reset successfully.",
    };
  }

  verify(token: string) {
    return verifyToken(token);
  }
}

// --- EXPORTED TO USE AuthService ---
export const authService = new AuthService();