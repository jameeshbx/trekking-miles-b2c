import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Role, Status } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current date for monthly calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch comprehensive statistics
    const [
      // User stats
      totalUsers,
      newUsersThisMonth,
      activeUsers,
      verifiedUsers,
      totalAdmins,
      totalServiceProviders,
      totalRegularUsers,
      
      // Destination stats
      totalDestinations,
      activeDestinations,
      newDestinationsThisMonth,
      
      // Event stats
      totalEvents,
      activeEvents,
      newEventsThisMonth,
      
      // Trek stats
      totalTreks,
      activeTreks,
      newTreksThisMonth,
      
      // Recent items (last 10 of each)
      recentUsers,
      recentDestinations,
      recentEvents,
      recentTreks,
    ] = await Promise.all([
      // User counts
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { emailVerified: { not: null } } }),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.user.count({ where: { role: Role.SERVICEPROVIDER } }),
      prisma.user.count({ where: { role: Role.USER } }),
      
      // Destination counts
      prisma.destination.count(),
      prisma.destination.count({ where: { status: Status.ACTIVE } }),
      prisma.destination.count({ where: { createdAt: { gte: startOfMonth } } }),
      
      // Event counts
      prisma.event.count(),
      prisma.event.count({ where: { status: Status.ACTIVE } }),
      prisma.event.count({ where: { createdAt: { gte: startOfMonth } } }),
      
      // Trek counts
      prisma.trek.count(),
      prisma.trek.count({ where: { status: Status.ACTIVE } }),
      prisma.trek.count({ where: { createdAt: { gte: startOfMonth } } }),
      
      // Recent items
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.destination.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          rating: true,
          price: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.event.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          date: true,
          location: true,
          price: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.trek.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          date: true,
          distance: true,
          price: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const stats = {
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
        active: activeUsers,
        verified: verifiedUsers,
        admins: totalAdmins,
        serviceProviders: totalServiceProviders,
        regularUsers: totalRegularUsers,
        recent: recentUsers,
      },
      destinations: {
        total: totalDestinations,
        active: activeDestinations,
        newThisMonth: newDestinationsThisMonth,
        recent: recentDestinations,
      },
      events: {
        total: totalEvents,
        active: activeEvents,
        newThisMonth: newEventsThisMonth,
        recent: recentEvents,
      },
      treks: {
        total: totalTreks,
        active: activeTreks,
        newThisMonth: newTreksThisMonth,
        recent: recentTreks,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
