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

    // Get the last 12 months of data
    const now = new Date();
    const monthlyStats = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const userCount = await prisma.user.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextMonth,
          },
        },
      });

      monthlyStats.push({
        month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        users: userCount,
      });
    }

    return NextResponse.json(monthlyStats);
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

