"use client";

import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

interface Props {
  children: ReactNode;
}

interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function AdminRouteGuard({
  children,
}: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data } = await axios.get(
        "/api/auth/me",
        {
          withCredentials: true,
        }
      );

      if (!data.success) {
        router.replace("/admin/login");
        return;
      }

      setAdmin(data.admin);
    } catch {
      router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!admin) {
    return null;
  }

  return <>{children}</>;
}