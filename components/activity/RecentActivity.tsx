"use client";

import Link from "next/link";
import { FileText, Users, Mail } from "lucide-react";

interface Props {
  activity: {
    blogs: any[];
    waitlists: any[];
    inquiries: any[];
  };
}

export default function RecentActivity({ activity }: Props) {
  const recentActivities = [
    ...(activity?.blogs ?? []).map((blog) => ({
      id: `blog-${blog.id}`,
      type: "blog",
      title: blog.title,
      subtitle: `By ${blog.author}`,
      date: blog.createdAt,
      icon: FileText,
      color: "text-blue-600",
      href: `/admin/blogs/${blog.id}`,
    })),

    ...(activity?.waitlists ?? []).map((item) => ({
      id: `waitlist-${item.id}`,
      type: "waitlist",
      title: item.fullName,
      subtitle: item.email,
      date: item.createdAt,
      icon: Users,
      color: "text-green-600",
      href: "/admin/waitlist",
    })),

    ...(activity?.inquiries ?? []).map((item) => ({
      id: `inquiry-${item.id}`,
      type: "inquiry",
      title: item.name,
      subtitle: item.email,
      date: item.submittedAt,
      icon: Mail,
      color: "text-orange-600",
      href: "/admin/inquiries",
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 10);

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <span className="text-sm text-gray-500">
          {recentActivities.length} activities
        </span>
      </div>

      {recentActivities.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No recent activity.
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivities.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Icon
                      className={`h-5 w-5 ${item.color}`}
                    />
                  </div>

                  <div>
                    <p className="font-medium">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}