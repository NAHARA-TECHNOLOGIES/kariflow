import { prisma } from "@/libs/db";
import { emailService } from "@/services/email.service";

export interface SubscribeDTO {
  email: string;
  firstName?: string;
  frequency?: "daily" | "weekly";
}

export interface UpdateSubscriberDTO {
  firstName?: string;
  active?: boolean;
  frequency?: "daily" | "weekly";
}

class NewsletterService {
  private calculateNextRun(
    frequency: "daily" | "weekly"
  ): Date {
    const now = new Date();

    if (frequency === "daily") {
      now.setDate(now.getDate() + 1);
    } else {
      now.setDate(now.getDate() + 7);
    }

    return now;
  }

  async subscribe(data: SubscribeDTO) {
    const exists =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          email: data.email.toLowerCase(),
        },
      });

    if (exists) {
      if (!exists.active) {
        return prisma.newsletterSubscriber.update({
          where: {
            id: exists.id,
          },
          data: {
            active: true,
            frequency:
              data.frequency ?? exists.frequency,
            firstName:
              data.firstName ?? exists.firstName,
           nextScheduledAt: this.calculateNextRun(
          (data.frequency ?? exists.frequency) as "daily" | "weekly"
        ),
          },
        });
      }

      throw new Error(
        "This email is already subscribed."
      );
    }

    const subscriber =
      await prisma.newsletterSubscriber.create({
        data: {
          email: data.email.toLowerCase(),
          firstName: data.firstName,
          frequency: data.frequency ?? "weekly",
          nextScheduledAt: this.calculateNextRun(
            data.frequency ?? "weekly"
          ),
        },
      });

    return subscriber;
  }

  async unsubscribe(email: string) {
    const subscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

    if (!subscriber) {
      throw new Error("Subscriber not found.");
    }

    return prisma.newsletterSubscriber.update({
      where: {
        id: subscriber.id,
      },
      data: {
        active: false,
      },
    });
  }

  async getSubscribers() {
    return prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getSubscriber(id: string) {
    return prisma.newsletterSubscriber.findUnique({
      where: {
        id,
      },
    });
  }
    async updateSubscriber(
    id: string,
    data: UpdateSubscriberDTO
  ) {
    const subscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          id,
        },
      });

    if (!subscriber) {
      throw new Error("Subscriber not found.");
    }

    const frequency =
      data.frequency ?? subscriber.frequency;

    return prisma.newsletterSubscriber.update({
      where: {
        id,
      },
      data: {
        ...(data.firstName !== undefined && {
          firstName: data.firstName,
        }),

        ...(data.active !== undefined && {
          active: data.active,
        }),

        ...(data.frequency !== undefined && {
          frequency: data.frequency,
          nextScheduledAt:
            this.calculateNextRun(data.frequency),
        }),
      },
    });
  }

  async deleteSubscriber(id: string) {
    return prisma.newsletterSubscriber.delete({
      where: {
        id,
      },
    });
  }

  async sendTestEmail(
    email: string,
    firstName = "Tester"
  ) {
    const branding =
      await prisma.brandingSettings.findUnique({
        where: {
          id: "global",
        },
      });

    await emailService.sendEmail({
      to: email,
      subject: "Kariflow Newsletter Test",
      html: `
      <div style="font-family:Arial;padding:40px">

        <img
          src="${branding?.customUrl ?? ""}"
          style="height:60px;margin-bottom:20px"
        />

        <h2>Hello ${firstName} 👋</h2>

        <p>
          This is a test newsletter from Kariflow.
        </p>

        <p>
          If you're seeing this email,
          your SMTP configuration is working correctly.
        </p>

      </div>
      `,
    });

    return {
      success: true,
      message: "Test email sent successfully.",
    };
  }

  async sendToSubscriber(id: string) {
    const subscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          id,
        },
      });

    if (!subscriber) {
      throw new Error("Subscriber not found.");
    }

    if (!subscriber.active) {
      throw new Error("Subscriber is inactive.");
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const branding =
      await prisma.brandingSettings.findUnique({
        where: {
          id: "global",
        },
      });

    const html = `
      <div style="font-family:Arial;padding:40px">

        <img
          src="${branding?.customUrl ?? ""}"
          style="height:60px"
        />

        <h2>
          Hi ${subscriber.firstName ?? "there"} 👋
        </h2>

        <p>
          Here's what's new on Kariflow.
        </p>

        ${posts
          .map(
            (post) => `
            <div
              style="
                margin:30px 0;
                padding-bottom:20px;
                border-bottom:1px solid #eee;
              "
            >
              <h3>${post.title}</h3>

              <p>${post.excerpt}</p>

              <a
                href="${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}"
              >
                Read Article →
              </a>
            </div>
          `
          )
          .join("")}

      </div>
    `;

    await emailService.sendEmail({
      to: subscriber.email,
      subject: "Latest from Kariflow",
      html,
    });

    return prisma.newsletterSubscriber.update({
      where: {
        id,
      },
      data: {
        lastSentAt: new Date(),
        nextScheduledAt:
          this.calculateNextRun(
            subscriber.frequency as
              | "daily"
              | "weekly"
          ),
      },
    });
  }
    async getDueSubscribers() {
    return prisma.newsletterSubscriber.findMany({
      where: {
        active: true,
        OR: [
          {
            nextScheduledAt: null,
          },
          {
            nextScheduledAt: {
              lte: new Date(),
            },
          },
        ],
      },
      orderBy: {
        nextScheduledAt: "asc",
      },
    });
  }

  async sendNewsletter() {
    const subscribers = await this.getDueSubscribers();

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        await this.sendToSubscriber(subscriber.id);
        sent++;
      } catch (error) {
        console.error(
          `Failed sending newsletter to ${subscriber.email}`,
          error
        );
        failed++;
      }
    }

    return {
      success: true,
      total: subscribers.length,
      sent,
      failed,
    };
  }

  async countSubscribers() {
    const total = await prisma.newsletterSubscriber.count();

    const active = await prisma.newsletterSubscriber.count({
      where: {
        active: true,
      },
    });

    const inactive = await prisma.newsletterSubscriber.count({
      where: {
        active: false,
      },
    });

    const daily = await prisma.newsletterSubscriber.count({
      where: {
        frequency: "daily",
      },
    });

    const weekly = await prisma.newsletterSubscriber.count({
      where: {
        frequency: "weekly",
      },
    });

    return {
      total,
      active,
      inactive,
      daily,
      weekly,
    };
  }
}

export const newsletterService = new NewsletterService();