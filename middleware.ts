import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/api/auth",
    "/auth/signin",
    "/auth/signup", 
    "/auth/forgot-password",
    "/auth/reset-password",
    "/"
  ];

  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no session and trying to access protected route, redirect to signin
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Admin routes
  if (path.startsWith("/admin") && session.user.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
  }

  // Service provider routes
  if (
    path.startsWith("/service-provider") &&
    session.user.role !== Role.SERVICEPROVIDER &&
    session.user.role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/service-provider/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
