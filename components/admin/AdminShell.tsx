"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f9f4ed" }}>
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 p-4 lg:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
