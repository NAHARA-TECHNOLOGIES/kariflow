import { prisma } from "@/libs/db";

interface CreateTagDTO {
  name: string;
  slug?: string;
}

class TagService {
  private slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async create(data: CreateTagDTO) {
    const slug = data.slug ?? this.slugify(data.name);

    const exists = await prisma.blogTag.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug }
        ]
      }
    });

    if (exists) {
      throw new Error("Tag already exists.");
    }

    return prisma.blogTag.create({
      data: {
        name: data.name,
        slug,
      },
    });
  }

  async getAll() {
    return prisma.blogTag.findMany({
      include: {
        blogs: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async getById(id: string) {
    return prisma.blogTag.findUnique({
      where: { id },
      include: {
        blogs: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateTagDTO>) {
    return prisma.blogTag.update({
      where: { id },
      data: {
        ...(data.name && {
          name: data.name,
          slug: this.slugify(data.name),
        }),
      },
    });
  }

  async delete(id: string) {
    return prisma.blogTag.delete({
      where: { id },
    });
  }
}

export const tagService = new TagService();