"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import SPSidebar from "@/components/sp/SPSidebar";

export default function SPLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user?.role !== "SERVICEPROVIDER") {
      redirect("/auth/unauthorized");
      return;
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== "SERVICEPROVIDER") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <SPSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-6 bg-black text-white">{children}</main>
        </div>
      </div>
    </div>
  );
}
