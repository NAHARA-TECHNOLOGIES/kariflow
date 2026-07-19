import { prisma } from "@/libs/db";

interface CreateLegalDocumentDTO {
  slug: string;
  title: string;
  content: string;
  lastRevised: string;
}

class LegalService {
  async create(data: CreateLegalDocumentDTO) {
    const exists = await prisma.legalDocument.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (exists) {
      throw new Error("Legal document already exists.");
    }

    return prisma.legalDocument.create({
      data: {
        slug: data.slug.toLowerCase(),
        title: data.title,
        content: data.content,
        lastRevised: data.lastRevised,
      },
    });
  }

  async getAll() {
    return prisma.legalDocument.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async getBySlug(slug: string) {
    return prisma.legalDocument.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(
    slug: string,
    data: Partial<Omit<CreateLegalDocumentDTO, "slug">>
  ) {
    return prisma.legalDocument.update({
      where: {
        slug,
      },
      data: {
        ...(data.title !== undefined && {
          title: data.title,
        }),
        ...(data.content !== undefined && {
          content: data.content,
        }),
        ...(data.lastRevised !== undefined && {
          lastRevised: data.lastRevised,
        }),
      },
    });
  }

  async delete(slug: string) {
    return prisma.legalDocument.delete({
      where: {
        slug,
      },
    });
  }

  async upsert(data: CreateLegalDocumentDTO) {
    return prisma.legalDocument.upsert({
      where: {
        slug: data.slug,
      },
      update: {
        title: data.title,
        content: data.content,
        lastRevised: data.lastRevised,
      },
      create: {
        slug: data.slug.toLowerCase(),
        title: data.title,
        content: data.content,
        lastRevised: data.lastRevised,
      },
    });
  }

  async seedDefaults() {
    const documents = [
      {
        slug: "privacy",
        title: "Privacy Policy",
        content: "<p>Privacy Policy</p>",
        lastRevised: new Date().toISOString().split("T")[0],
      },
      {
        slug: "terms",
        title: "Terms & Conditions",
        content: "<p>Terms & Conditions</p>",
        lastRevised: new Date().toISOString().split("T")[0],
      },
      {
        slug: "cookies",
        title: "Cookie Policy",
        content: "<p>Cookie Policy</p>",
        lastRevised: new Date().toISOString().split("T")[0],
      },
    ];

    return Promise.all(
      documents.map((document) =>
        prisma.legalDocument.upsert({
          where: {
            slug: document.slug,
          },
          update: {
            title: document.title,
            content: document.content,
            lastRevised: document.lastRevised,
          },
          create: document,
        })
      )
    );
  }
}

export const legalService = new LegalService();