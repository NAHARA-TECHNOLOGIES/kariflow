"use client";

import Sidebar from "./sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}