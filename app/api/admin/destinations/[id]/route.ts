import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Role, Status } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: params.id },
    });

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image, description, highlights, rating, price, status } = body;

    const destination = await prisma.destination.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(description && { description }),
        ...(highlights && { highlights }),
        ...(rating && { rating: parseFloat(rating) }),
        ...(price && { price }),
        ...(status && { status: status as Status }),
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
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
