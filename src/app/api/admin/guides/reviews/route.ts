import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  guideProfileId: z.string().min(1),
  status: z.enum(["APPROVED", "REJECTED"]),
  notes: z.string().max(2000).optional(),
});

export async function GET() {
  const auth = await requireAdminUser();
  if ("error" in auth) {
    return auth.error;
  }

  const guides = await prisma.guideProfile.findMany({
    where: {
      adminReviewStatus: {
        in: ["UNDER_REVIEW", "REJECTED"],
      },
    },
    select: {
      id: true,
      adminReviewStatus: true,
      adminReviewNotes: true,
      reviewSubmittedAt: true,
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
      location: true,
      yearsOfExperience: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 50,
  });

  return NextResponse.json({ guides });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const review = await prisma.guideProfile.update({
      where: { id: parsed.data.guideProfileId },
      data: {
        adminReviewStatus: parsed.data.status,
        adminReviewNotes: parsed.data.notes || null,
        reviewedAt: new Date(),
        reviewedByUserId: auth.user.id,
      },
      select: {
        id: true,
        adminReviewStatus: true,
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Admin guide review update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
