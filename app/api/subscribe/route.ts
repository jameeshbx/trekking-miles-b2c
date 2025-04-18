import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const subscription = await prisma.subscription.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Successfully subscribed!", subscription },
      { status: 201 }
    );
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
