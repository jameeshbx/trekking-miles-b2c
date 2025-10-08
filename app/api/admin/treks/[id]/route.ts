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

    const trek = await prisma.trek.findUnique({
      where: { id: params.id },
    });

    if (!trek) {
      return NextResponse.json({ error: "Trek not found" }, { status: 404 });
    }

    return NextResponse.json(trek);
  } catch (error) {
    console.error("Error fetching trek:", error);
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
    const { name, image, date, duration, distance, price, meetingPoint, description, status } = body;

    const trek = await prisma.trek.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(date && { date }),
        ...(duration && { duration }),
        ...(distance && { distance }),
        ...(price && { price }),
        ...(meetingPoint && { meetingPoint }),
        ...(description && { description }),
        ...(status && { status: status as Status }),
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
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
