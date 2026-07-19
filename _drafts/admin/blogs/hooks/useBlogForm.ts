"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { blogApi } from "@/app/admin/blogs/service/blog.api";
import type {
  Blog,
  BlogPayload,
  Category,
  Tag,
} from "@/app/admin/types/blog";

const initialForm: BlogPayload = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  author: "Smart Sunday",
  categoryId: "",
  tags: [],
  published: false,
  featured: false,
  seoTitle: "",
  seoDescription: "",
};

export function useBlogForm(blogId?: string) {
  const router = useRouter();

  const [form, setForm] =
    useState<BlogPayload>(initialForm);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [tags, setTags] =
    useState<Tag[]>([]);

  const [blog, setBlog] =
    useState<Blog | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      const data =
        await blogApi.getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadTags = useCallback(async () => {
    try {
      const data =
        await blogApi.getTags();

      setTags(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadBlog = useCallback(async () => {
    if (!blogId) return;

    try {
      const data =
        await blogApi.getBlog(blogId);

      setBlog(data);

      setForm({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image ?? "",
        author: data.author,
        categoryId: data.category.id,
        tags:
          data.tags?.map(
            (tag: Tag) => tag.name
          ) ?? [],
        published: data.published,
        featured: data.featured,
        seoTitle:
          data.seoTitle ?? "",
        seoDescription:
          data.seoDescription ?? "",
      });
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load blog."
      );
    }
  }, [blogId]);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      await Promise.all([
        loadCategories(),
        loadTags(),
        loadBlog(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [
    loadCategories,
    loadTags,
    loadBlog,
  ]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateField = <
    K extends keyof BlogPayload
  >(
    key: K,
    value: BlogPayload[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const uploadImage = async (
    file: File
  ) => {
    try {
      setUploading(true);

      const uploaded =
        await blogApi.uploadImage(
          file
        );

      updateField(
        "image",
        uploaded.url
      );

      return uploaded.url;
    } finally {
      setUploading(false);
    }
  };

  const submit = async () => {
    try {
      setSaving(true);

      if (!form.title.trim())
        throw new Error(
          "Title is required."
        );

      if (!form.categoryId)
        throw new Error(
          "Category is required."
        );

      if (blogId) {
        await blogApi.updateBlog(
          blogId,
          form
        );
      } else {
        await blogApi.createBlog(
          form
        );
      }

      router.push(
        "/admin/blogs"
      );

      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);

      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    form,
    setForm,
    updateField,

    blog,

    categories,
    tags,

    loading,
    saving,
    uploading,

    error,

    uploadImage,

    submit,

    refresh,
  };
}