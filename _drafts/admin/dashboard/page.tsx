"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/analytics/StatsCards";

interface DashboardResponse {
  overview: any;
  blogs: any;
  waitlist: any;
  inquiries: any;
  activity: any;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/dashboard");

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading || !dashboard) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  const {
    overview,
    blogs,
    waitlist,
    inquiries,
    activity,
  } = dashboard;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome back.
            </p>

          </div>

          <button
            onClick={loadDashboard}
            className="rounded-lg bg-black px-5 py-2 text-white"
          >
            Refresh
          </button>

        </div>

        {/* Stats */}

        <StatsCards
          overview={overview}
          blogs={blogs}
          waitlist={waitlist}
          inquiries={inquiries}
        />

        {/* Quick Actions */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

            <Link
              href="/admin/blogs"
              className="rounded-lg border p-4 text-center hover:bg-gray-100"
            >
              Manage Blogs
            </Link>

            <Link
              href="/admin/blogs/new"
              className="rounded-lg bg-black p-4 text-center text-white"
            >
              Create Blog
            </Link>

            <Link
              href="/admin/categories"
              className="rounded-lg border p-4 text-center hover:bg-gray-100"
            >
              Categories
            </Link>

            <Link
              href="/admin/newsletter"
              className="rounded-lg border p-4 text-center hover:bg-gray-100"
            >
              Newsletter
            </Link>

            <Link
              href="/admin/waitlist"
              className="rounded-lg border p-4 text-center hover:bg-gray-100"
            >
              Waitlist
            </Link>

            <Link
              href="/admin/inquiries"
              className="rounded-lg border p-4 text-center hover:bg-gray-100"
            >
              Inquiries
            </Link>

          </div>

        </div>

        {/* Blog Management */}

        <div className="rounded-xl bg-white p-6 shadow">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                Blog Management
              </h2>

              <p className="text-sm text-gray-500">
                Manage your blog content.
              </p>

            </div>

            <Link
              href="/admin/blogs/new"
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              New Blog
            </Link>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Total Blogs
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {blogs?.total ?? 0}
              </h3>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Published
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {blogs?.published ?? 0}
              </h3>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Drafts
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {blogs?.drafts ?? 0}
              </h3>

            </div>

          </div>

        </div>

        {/* Most Viewed Blogs */}

        <div className="rounded-xl bg-white p-6 shadow">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Most Viewed Blogs
            </h2>

            <div className="flex gap-4">

              <Link
                href="/admin/blogs"
                className="text-blue-600"
              >
                View All
              </Link>

              <Link
                href="/admin/blogs/new"
                className="text-green-600"
              >
                Create
              </Link>

            </div>

          </div>

          {blogs?.mostViewed?.length ? (
            blogs.mostViewed.map((blog: any) => (
              <div
                key={blog.id}
                className="mb-3 rounded border p-4"
              >
                <div className="font-semibold">
                  {blog.title}
                </div>

                <div className="text-sm text-gray-500">
                  {blog.author}
                </div>

                <div className="text-xs text-gray-400">
                  {blog.views} views
                </div>

              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}

        </div>

        {/* Recent Activities */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Recent Activities
          </h2>

          <div className="space-y-4">

            {activity?.blogs?.map((blog: any) => (
              <div
                key={`blog-${blog.id}`}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  New Blog
                </div>

                <div className="text-sm text-gray-500">
                  {blog.title}
                </div>
              </div>
            ))}

            {activity?.waitlists?.map((item: any) => (
              <div
                key={`waitlist-${item.id}`}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  New Waitlist Signup
                </div>

                <div className="text-sm text-gray-500">
                  {item.email}
                </div>
              </div>
            ))}

            {activity?.inquiries?.map((item: any) => (
              <div
                key={`inquiry-${item.id}`}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  New Inquiry
                </div>

                <div className="text-sm text-gray-500">
                  {item.name}
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}