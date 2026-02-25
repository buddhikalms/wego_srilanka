import { NextResponse } from "next/server";
import { z } from "zod";

import { requireGuideUser } from "@/lib/api-auth";
import { isGuideProfileComplete } from "@/lib/guide-profile";
import { prisma } from "@/lib/prisma";

const guideProfileSchema = z.object({
  bio: z.string().max(2000).optional(),
  phone: z.string().max(30).optional(),
  location: z.string().max(120).optional(),
  yearsOfExperience: z.number().int().min(0).max(80).optional(),
  specialties: z.array(z.string().min(1)).optional(),
  languages: z.array(z.string().min(1)).optional(),
  hourlyRate: z.number().min(0).optional(),
});

export async function GET() {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  const profile = await prisma.guideProfile.findUnique({
    where: { userId: auth.user.id },
    include: {
      activities: true,
      experiences: true,
      ratings: {
        include: {
          reviewer: {
            select: { id: true, fullName: true },
          },
        },
      },
    },
  });

  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = guideProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const existingProfile = await prisma.guideProfile.findUnique({
      where: { userId: auth.user.id },
      select: {
        adminReviewStatus: true,
      },
    });

    const completePayload = {
      bio: data.bio ?? null,
      phone: data.phone ?? null,
      location: data.location ?? null,
      specialties: data.specialties ?? [],
      languages: data.languages ?? [],
      hourlyRate: data.hourlyRate ?? 0,
    };
    const profileComplete = isGuideProfileComplete(completePayload);

    let nextAdminStatus = existingProfile?.adminReviewStatus;
    if (!profileComplete) {
      nextAdminStatus = "PROFILE_INCOMPLETE";
    } else if (!existingProfile || existingProfile.adminReviewStatus === "PROFILE_INCOMPLETE" || existingProfile.adminReviewStatus === "REJECTED") {
      nextAdminStatus = "UNDER_REVIEW";
    }

    const profile = await prisma.guideProfile.upsert({
      where: { userId: auth.user.id },
      create: {
        userId: auth.user.id,
        bio: data.bio,
        phone: data.phone,
        location: data.location,
        yearsOfExperience: data.yearsOfExperience ?? 0,
        specialties: data.specialties,
        languages: data.languages,
        hourlyRate: data.hourlyRate,
        adminReviewStatus: profileComplete ? "UNDER_REVIEW" : "PROFILE_INCOMPLETE",
        reviewSubmittedAt: profileComplete ? new Date() : null,
      },
      update: {
        bio: data.bio,
        phone: data.phone,
        location: data.location,
        yearsOfExperience: data.yearsOfExperience,
        specialties: data.specialties,
        languages: data.languages,
        hourlyRate: data.hourlyRate,
        adminReviewStatus: nextAdminStatus,
        reviewSubmittedAt:
          nextAdminStatus === "UNDER_REVIEW" && existingProfile?.adminReviewStatus !== "UNDER_REVIEW"
            ? new Date()
            : undefined,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Guide profile upsert error:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "P2000"
    ) {
      return NextResponse.json(
        { error: "One of the profile fields is too long. Please shorten and try again." },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
