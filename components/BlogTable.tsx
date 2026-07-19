"use client";

import axios from "axios";
import Link from "next/link";

interface Props {
  blogs: any[];
  loading: boolean;
  refresh: () => void;
}

export default function BlogTable({
  blogs,
  loading,
  refresh,
}: Props) {
  const blogList = Array.isArray(blogs) ? blogs : [];

  async function remove(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/blog/${id}`);
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="text-left">Author</th>
            <th className="text-left">Category</th>
            <th className="text-left">Status</th>
            <th className="text-center">Views</th>
            <th className="text-center">Featured</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogList.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-10 text-center text-gray-500"
              >
                No blog posts found.
              </td>
            </tr>
          ) : (
            blogList.map((blog) => (
              <tr
                key={blog.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {blog.title}
                </td>

                <td>
                  {blog.author || "-"}
                </td>

                <td>
                  {blog.category?.name || "-"}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      blog.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.published
                      ? "Published"
                      : "Draft"}
                  </span>
                </td>

                <td className="text-center">
                  {blog.views ?? 0}
                </td>

                <td className="text-center">
                  {blog.featured ? "⭐" : "-"}
                </td>

                <td className="space-x-3 text-center">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => remove(blog.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}