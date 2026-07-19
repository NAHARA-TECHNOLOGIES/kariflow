"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
}

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Tags", href: "/admin/tags" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Waitlist", href: "/admin/waitlist" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Branding", href: "/admin/branding" },
  { label: "Legal", href: "/admin/legal" },
  { label: "Admins", href: "/admin/admins" },
  { label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold">Kariflow Admin</h1>
      </div>

      <nav className="px-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}