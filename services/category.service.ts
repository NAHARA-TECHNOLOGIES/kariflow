import { prisma } from "@/libs/db";

interface CreateCategoryDTO {
  name: string;
  slug?: string;
}

class CategoryService {
  private slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async create(data: CreateCategoryDTO) {
    const slug = data.slug ?? this.slugify(data.name);

    const exists = await prisma.category.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug }
        ]
      }
    });

    if (exists) {
      throw new Error("Category already exists.");
    }

    return prisma.category.create({
      data: {
        name: data.name,
        slug,
      },
    });
  }

  async getAll() {
    return prisma.category.findMany({
      include: {
        blogPosts: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async getById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        blogPosts: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateCategoryDTO>) {
    return prisma.category.update({
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
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export const categoryService = new CategoryService();