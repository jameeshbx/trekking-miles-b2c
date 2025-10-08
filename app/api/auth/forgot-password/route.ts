import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a password reset email will be sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiry to 1 hour from now
    const expires = new Date(Date.now() + 3600000);

    // Create password reset token
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        email: user.email,
        token: hashedToken,
        expires,
      },
    });

    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json(
      { message: "If an account exists, a password reset email will be sent" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
