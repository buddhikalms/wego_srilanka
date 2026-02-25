import { NextResponse } from "next/server";
import { z } from "zod";

import { requireGuideUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

const experienceSchema = z.object({
  title: z.string().min(2).max(150),
  organization: z.string().max(150).optional(),
  description: z.string().max(2000).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isCurrent: z.boolean().optional(),
});

export async function POST(request: Request) {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = experienceSchema.safeParse(body);

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

    const experience = await prisma.guideExperience.create({
      data: {
        guideProfileId: profile.id,
        title: parsed.data.title,
        organization: parsed.data.organization,
        description: parsed.data.description,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
        isCurrent: parsed.data.isCurrent ?? false,
      },
    });

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error) {
    console.error("Guide experience create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
