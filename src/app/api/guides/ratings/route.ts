import { NextResponse } from "next/server";
import { z } from "zod";

import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

const ratingSchema = z.object({
  guideProfileId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

async function recalculateGuideRating(guideProfileId: string) {
  const stats = await prisma.guideRating.aggregate({
    where: { guideProfileId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.guideProfile.update({
    where: { id: guideProfileId },
    data: {
      averageRating: stats._avg.rating ?? 0,
      ratingsCount: stats._count.rating,
    },
  });
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = ratingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const rating = await prisma.guideRating.upsert({
      where: {
        guideProfileId_reviewerId: {
          guideProfileId: parsed.data.guideProfileId,
          reviewerId: auth.user.id,
        },
      },
      create: {
        guideProfileId: parsed.data.guideProfileId,
        reviewerId: auth.user.id,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
      update: {
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });

    await recalculateGuideRating(parsed.data.guideProfileId);

    return NextResponse.json({ rating }, { status: 201 });
  } catch (error) {
    console.error("Guide rating upsert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
