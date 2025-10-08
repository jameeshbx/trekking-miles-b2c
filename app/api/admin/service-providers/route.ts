import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role, UserStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const status = searchParams.get("status") as UserStatus | null;

    const where: any = {
      role: Role.SERVICEPROVIDER,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(status ? { status } : {}),
    };

    const providers = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


