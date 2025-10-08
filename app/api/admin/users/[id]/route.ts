import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        accounts: {
          select: {
            provider: true,
            type: true,
          },
        },
        sessions: {
          select: {
            expires: true,
          },
          orderBy: { expires: "desc" },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, status, email, sendInvitation } = body;

    // Check if email is being changed and if it already exists
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: { 
          email,
          id: { not: params.id }
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;
    if (email !== undefined) updateData.email = email;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    // Send invitation email if requested
    if (sendInvitation && updatedUser.email) {
      try {
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 12);
        
        await prisma.user.update({
          where: { id: params.id },
          data: { password: hashedPassword },
        });

        await sendEmail({
          to: updatedUser.email,
          subject: "TrekkingMiles - Account Updated",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Account Updated</h2>
              <p>Hello ${updatedUser.name},</p>
              <p>Your account has been updated by an administrator. Here are your updated login credentials:</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${updatedUser.email}</p>
                <p><strong>New Password:</strong> ${tempPassword}</p>
              </div>
              <p>Please log in and change your password as soon as possible.</p>
              <p>You can access your account at: <a href="${process.env.NEXTAUTH_URL}/auth/signin" style="color: #2563eb;">Sign In</a></p>
              <p>Best regards,<br>The TrekkingMiles Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Error sending invitation email:", emailError);
      }
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent admin from deleting themselves
    if (session.user.id === params.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ 
      message: "User deleted successfully",
      deletedUser: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


