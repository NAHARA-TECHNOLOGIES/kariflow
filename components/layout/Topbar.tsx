"use client";

interface Props {
  adminName?: string;
}

export default function Topbar({ adminName }: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome back{adminName ? `, ${adminName}` : ""}
        </h2>
      </div>

      <button
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Logout
      </button>
    </header>
  );
}