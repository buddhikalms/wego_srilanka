import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  createEmailVerification,
  sendGuideRegistrationEmail,
  sendGuideVerificationEmail,
} from "@/lib/email-verification";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "GUIDE"]).optional().default("USER"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email, password, fullName, role } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        fullName,
        role,
        emailVerified: role !== "GUIDE",
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (role === "GUIDE") {
      const { token } = await createEmailVerification(user.id);
      await sendGuideVerificationEmail({
        email: user.email,
        fullName: user.fullName,
        token,
      });
      await sendGuideRegistrationEmail({
        email: user.email,
        fullName: user.fullName,
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error:
            "Database connection failed. Check DATABASE_URL credentials and ensure MySQL is running.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
