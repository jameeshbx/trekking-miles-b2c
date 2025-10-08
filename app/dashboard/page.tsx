"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role } from "@prisma/client";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      // User is not authenticated, redirect to sign in
      router.push("/auth/signin");
      return;
    }

    // Check user role and redirect accordingly
    const userRole = session.user?.role;

    switch (userRole) {
      case Role.ADMIN:
        router.push("/admin/dashboard");
        break;
      case Role.SERVICEPROVIDER:
        router.push("/sp/dashboard");
        break;
      case Role.USER:
      default:
        // For regular users, you might want to redirect to a user dashboard
        // or show a message that they don't have access
        router.push("/"); // Redirect to home page or user dashboard
        break;
    }
  }, [session, status, router]);

  // Show loading state while checking authentication and role
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // This component will redirect, so this return should rarely be seen
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
