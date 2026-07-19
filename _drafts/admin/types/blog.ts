export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Blog {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  image?: string;

  author: string;

  published: boolean;

  featured: boolean;

  views: number;

  seoTitle?: string;

  seoDescription?: string;

  createdAt: string;

  updatedAt: string;

  category: Category;

  tags: Tag[];
}

export interface BlogPayload {
  title: string;

  excerpt: string;

  content: string;

  image?: string;

  author: string;

  categoryId: string;

  tags: string[];

  published: boolean;

  featured: boolean;

  seoTitle?: string;

  seoDescription?: string;
}