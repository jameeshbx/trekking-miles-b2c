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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { meetingPoint: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status as Status;
    }

    const [treks, total] = await Promise.all([
      prisma.trek.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.trek.count({ where }),
    ]);

    return NextResponse.json({
      treks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching treks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image, date, duration, distance, price, meetingPoint, description, status = "ACTIVE" } = body;

    if (!name || !image || !date || !duration || !distance || !price || !meetingPoint || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const trek = await prisma.trek.create({
      data: {
        name,
        image,
        date,
        duration,
        distance,
        price,
        meetingPoint,
        description,
        status: status as Status,
      },
    });

    return NextResponse.json(trek, { status: 201 });
  } catch (error) {
    console.error("Error creating trek:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
