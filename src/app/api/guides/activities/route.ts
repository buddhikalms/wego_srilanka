import { NextResponse } from "next/server";
import { z } from "zod";

import { requireGuideUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

const activitySchema = z.object({
  title: z.string().min(2).max(150),
  category: z.string().max(80).optional(),
  description: z.string().max(2000).optional(),
  durationHours: z.number().min(0).max(72).optional(),
});

export async function POST(request: Request) {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = activitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const profile = await prisma.guideProfile.findUnique({
      where: { userId: auth.user.id },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Guide profile not found. Create profile first." },
        { status: 404 },
      );
    }

    const activity = await prisma.guideActivity.create({
      data: {
        guideProfileId: profile.id,
        ...parsed.data,
      },
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error("Guide activity create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
