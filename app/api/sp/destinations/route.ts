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

    const destinations = await prisma.destination.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(destinations);
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

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "SERVICEPROVIDER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, image, description, highlights, rating, price, status } = body;

    if (!name || !image || !description || !rating || !price) {
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
        highlights: highlights || [],
        rating: parseFloat(rating),
        price,
        status: status || Status.ACTIVE,
        userId: session.user.id,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error creating destination:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
