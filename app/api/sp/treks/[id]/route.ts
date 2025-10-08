import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if trek exists and belongs to the user
    const existingTrek = await prisma.trek.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!existingTrek) {
      return NextResponse.json({ error: "Trek not found" }, { status: 404 });
    }

    const trek = await prisma.trek.update({
      where: { id: params.id },
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
      },
    });

    return NextResponse.json(trek);
  } catch (error) {
    console.error("Error updating trek:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "SERVICEPROVIDER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if trek exists and belongs to the user
    const existingTrek = await prisma.trek.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!existingTrek) {
      return NextResponse.json({ error: "Trek not found" }, { status: 404 });
    }

    await prisma.trek.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Trek deleted successfully" });
  } catch (error) {
    console.error("Error deleting trek:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
