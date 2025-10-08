"use client";

import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const hasRole = (roles: Role | Role[]) => {
    if (!user?.role) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const isAdmin = hasRole(Role.ADMIN);
  const isServiceProvider = hasRole([Role.SERVICEPROVIDER, Role.ADMIN]);
  const isUser = hasRole([Role.USER, Role.SERVICEPROVIDER, Role.ADMIN]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    isServiceProvider,
    isUser,
    hasRole,
  };
}
