"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMenu } from "@/lib/store/MenuContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { state } = useMenu();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!state.isAdminAuthenticated && pathname !== "/admin") {
      router.replace("/admin");
    }
  }, [state.isAdminAuthenticated, pathname, router]);

  if (!state.isAdminAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
