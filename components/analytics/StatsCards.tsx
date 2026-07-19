"use client";

import {
  FileText,
  FolderTree,
  Users,
  Mail,
  MessageSquare,
  Eye,
  Star,
  Tag,
} from "lucide-react";

interface Props {
  overview: {
    waitlists: number;
    blogs: number;
    publishedBlogs: number;
    inquiries: number;
    unreadInquiries: number;
    categories: number;
    tags: number;
  };

  blogs: {
    total: number;
    published: number;
    drafts: number;
    featured: number;
    totalViews: number;
  };

  waitlist: {
    total: number;
  };

  inquiries: {
    total: number;
    unread: number;
    read: number;
    replied: number;
  };
}

export default function StatsCards({
  overview,
  blogs,
  waitlist,
  inquiries,
}: Props) {
  const cards = [
    {
      title: "Blogs",
      value: overview.blogs,
      icon: FileText,
    },
    {
      title: "Published Blogs",
      value: overview.publishedBlogs,
      icon: FileText,
    },
    {
      title: "Categories",
      value: overview.categories,
      icon: FolderTree,
    },
    {
      title: "Tags",
      value: overview.tags,
      icon: Tag,
    },
    {
      title: "Waitlist",
      value: waitlist.total,
      icon: Users,
    },
    {
      title: "Inquiries",
      value: inquiries.total,
      icon: Mail,
    },
    {
      title: "Unread",
      value: inquiries.unread,
      icon: MessageSquare,
    },
    {
      title: "Views",
      value: blogs.totalViews,
      icon: Eye,
    },
    {
      title: "Featured",
      value: blogs.featured,
      icon: Star,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h3>
              </div>

              <div className="rounded-full bg-gray-100 p-3">
                <Icon className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}