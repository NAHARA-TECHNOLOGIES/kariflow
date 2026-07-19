import axios from "axios";

export interface BlogPayload {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  categoryId: string;
  published: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
}

class BlogApi {
  async getBlogs() {
    const { data } = await axios.get("/api/blog");
    return data.data;
  }

  async getBlog(id: string) {
    const { data } = await axios.get(`/api/blog/${id}`);
    return data.data;
  }

  async createBlog(payload: BlogPayload) {
    const { data } = await axios.post("/api/blog", payload);
    return data.data;
  }

  async updateBlog(
    id: string,
    payload: Partial<BlogPayload>
  ) {
    const { data } = await axios.patch(
      `/api/blog/${id}`,
      payload
    );

    return data.data;
  }

  async deleteBlog(id: string) {
    await axios.delete(`/api/blog/${id}`);
  }

  async uploadImage(file: File) {
    const form = new FormData();

    form.append("file", file);

    const { data } = await axios.post(
      "/api/upload",
      form,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data.data;
  }

  async getCategories() {
    const { data } =
      await axios.get("/api/category");

    return data.data;
  }

  async getTags() {
    const { data } =
      await axios.get("/api/tag");

    return data.data;
  }
}

export const blogApi = new BlogApi();