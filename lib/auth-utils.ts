import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return session;
}

export async function requireRole(roles: Role | Role[]) {
  const session = await requireAuth();
  const roleArray = Array.isArray(roles) ? roles : [roles];
  
  if (!session.user.role || !roleArray.includes(session.user.role)) {
    redirect("/auth/unauthorized");
  }
  
  return session;
}

export async function requireAdmin() {
  return await requireRole(Role.ADMIN);
}

export async function requireServiceProvider() {
  return await requireRole([Role.SERVICEPROVIDER, Role.ADMIN]);
}
