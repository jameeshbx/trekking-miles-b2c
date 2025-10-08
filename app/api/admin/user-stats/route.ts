import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current date for monthly calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all user statistics
    const [
      totalUsers,
      totalAdmins,
      totalServiceProviders,
      totalRegularUsers,
      newUsersThisMonth,
      verifiedUsers,
      unverifiedUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.user.count({ where: { role: Role.SERVICEPROVIDER } }),
      prisma.user.count({ where: { role: Role.USER } }),
      prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.user.count({ where: { emailVerified: { not: null } } }),
      prisma.user.count({ where: { emailVerified: null } }),
    ]);

    const stats = {
      totalUsers,
      totalAdmins,
      totalServiceProviders,
      totalRegularUsers,
      newUsersThisMonth,
      verifiedUsers,
      unverifiedUsers,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
