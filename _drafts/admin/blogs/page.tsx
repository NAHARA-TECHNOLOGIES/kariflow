"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import BlogTable from "@/components/BlogTable";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBlogs(showLoader = false) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const { data } = await axios.get("/api/blog");

      setBlogs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/blog");
        setBlogs(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Blog Manager
          </h1>

          <p className="text-gray-500">
            Manage all blog posts.
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          New Blog
        </Link>
      </div>

      <BlogTable
        blogs={blogs}
        loading={loading}
        refresh={() => loadBlogs(true)}
      />
    </div>
  );
}