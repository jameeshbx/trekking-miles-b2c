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

    const treks = await prisma.trek.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(treks);
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

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "SERVICEPROVIDER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, image, date, duration, distance, price, meetingPoint, description, status } = body;

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
        status: status || Status.ACTIVE,
        userId: session.user.id,
      },
    });

    return NextResponse.json(trek);
  } catch (error) {
    console.error("Error creating trek:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
