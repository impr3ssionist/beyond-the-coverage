"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Admin Layout - Protects all /admin routes
 * Ensures user is logged in before allowing access
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow /admin/login without authentication
    if (pathname === "/admin/login") {
      return;
    }

    // Check for auth token on protected routes
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Redirect to login if no token
      router.push("/admin/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
