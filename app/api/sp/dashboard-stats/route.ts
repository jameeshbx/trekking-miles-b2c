import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "SERVICEPROVIDER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userId = session.user.id;
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Fetch comprehensive statistics for the logged-in service provider
    const [
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
      recentDestinations,
      recentEvents,
      recentTreks,
    ] = await Promise.all([
      // Destination counts
      prisma.destination.count({ where: { userId } }),
      prisma.destination.count({ where: { userId, status: Status.ACTIVE } }),
      prisma.destination.count({ where: { userId, createdAt: { gte: startOfMonth } } }),
      
      // Event counts
      prisma.event.count({ where: { userId } }),
      prisma.event.count({ where: { userId, status: Status.ACTIVE } }),
      prisma.event.count({ where: { userId, createdAt: { gte: startOfMonth } } }),
      
      // Trek counts
      prisma.trek.count({ where: { userId } }),
      prisma.trek.count({ where: { userId, status: Status.ACTIVE } }),
      prisma.trek.count({ where: { userId, createdAt: { gte: startOfMonth } } }),
      
      // Recent items
      prisma.destination.findMany({
        where: { userId },
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
        where: { userId },
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
        where: { userId },
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
    console.error("Error fetching SP dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
