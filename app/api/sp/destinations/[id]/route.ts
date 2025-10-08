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
    const { name, image, description, highlights, rating, price, status } = body;

    if (!name || !image || !description || !rating || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if destination exists and belongs to the user
    const existingDestination = await prisma.destination.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!existingDestination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const destination = await prisma.destination.update({
      where: { id: params.id },
      data: {
        name,
        image,
        description,
        highlights: highlights || [],
        rating: parseFloat(rating),
        price,
        status: status || Status.ACTIVE,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error updating destination:", error);
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

    // Check if destination exists and belongs to the user
    const existingDestination = await prisma.destination.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!existingDestination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    await prisma.destination.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
