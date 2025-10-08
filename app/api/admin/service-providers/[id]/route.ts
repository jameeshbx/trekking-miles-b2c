import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = params.id;

    const [user, destinations, events, treks] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId, role: Role.SERVICEPROVIDER },
        select: { id: true, name: true, email: true, status: true, createdAt: true },
      }),
      prisma.destination.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.event.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.trek.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "Service provider not found" }, { status: 404 });
    }

    return NextResponse.json({ user, destinations, events, treks });
  } catch (error) {
    console.error("Error fetching provider content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


