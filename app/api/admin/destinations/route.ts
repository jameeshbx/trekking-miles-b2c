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
      ];
    }

    if (status) {
      where.status = status as Status;
    }

    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.destination.count({ where }),
    ]);

    return NextResponse.json({
      destinations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
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
    const { name, image, description, highlights, rating, price, status = "ACTIVE" } = body;

    if (!name || !image || !description || !highlights || !rating || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const destination = await prisma.destination.create({
      data: {
        name,
        image,
        description,
        highlights,
        rating: parseFloat(rating),
        price,
        status: status as Status,
      },
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error("Error creating destination:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
