import { prisma } from "@/libs/db";
import { uploadService } from "@/services/upload.service";

export interface CreateBlogDTO {
  title: string;
  excerpt: string;
  content: string;
  image?: File | Buffer | string;
  author: string;
  categoryId: string;
  published?: boolean;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
}

class BlogService {
  private slugify(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async create(data: CreateBlogDTO) {
    const slug = this.slugify(data.title);

    const existing = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new Error("A blog with this title already exists.");
    }

    // --- UPLOAD SERVICE INTEGRATION ---
    let imageUrl = data.image as string | undefined;

    // Upload if image is a local file path or base64 string (not an existing URL)
    if (data.image && typeof data.image === "string" && !data.image.startsWith("http")) {
      const uploadResult = await uploadService.uploadImage(data.image, "kariflow/blogs");
      imageUrl = uploadResult.url;
    }
    // ----------------------------------

    const tags =
      data.tags?.length
        ? await Promise.all(
            data.tags?.map((name) =>
              prisma.blogTag.upsert({
                where: { name },
                update: {},
                create: { 
                  name ,
                  slug: this.slugify(name) // <-- Add the slug here!
                }, // Fixed typo from 'createAt'
              })
            )
          )
        : [];

    return prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        image: imageUrl, // Use the uploaded URL here
        author: data.author,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        published: data.published ?? false,
        featured: data.featured ?? false,
        views: 0,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        tags: {
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });
  }

  async getAll() {
    return prisma.blogPost.findMany({
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getPublished() {
    return prisma.blogPost.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getFeatured() {
    return prisma.blogPost.findMany({
      where: {
        featured: true,
        published: true,
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.blogPost.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        tags: true,
      },
    });
  }

  async getBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
        tags: true,
      },
    });
  }

  async incrementViews(slug: string) {
    return prisma.blogPost.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async update(id: string, data: Partial<CreateBlogDTO>) {
    const updateData: any = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
      updateData.slug = this.slugify(data.title);
    }

    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    
    // --- UPLOAD SERVICE INTEGRATION ---
    if (data.image !== undefined) {
      if (typeof data.image === "string" && !data.image.startsWith("http")) {
        // Upload new image
        const uploadResult = await uploadService.uploadImage(data.image, "kariflow/blogs");
        updateData.image = uploadResult.url;
      } else {
        // Keep existing URL or apply null/undefined
        updateData.image = data.image;
      }
    }
    // ----------------------------------

    if (data.author !== undefined) updateData.author = data.author;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle;
    if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription;

    if (data.categoryId) {
      updateData.category = {
        connect: {
          id: data.categoryId,
        },
      };
    }

    if (data.tags) {
      const tags = await Promise.all(
        data.tags.map((name) =>
          prisma.blogTag.upsert({
            where: { name },
            update: {},
            create: { 
              name,
              slug: this.slugify(name) 
             },
          })
        )
      );

      updateData.tags = {
        set: [],
        connect: tags.map((tag) => ({
          id: tag.id,
        })),
      };
    }

    return prisma.blogPost.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        category: true,
        tags: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.blogPost.delete({
      where: {
        id,
      },
    });
  }

  async search(search: string) {
    return prisma.blogPost.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            excerpt: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export const blogService = new BlogService();