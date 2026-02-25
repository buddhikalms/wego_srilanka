import { NextResponse } from "next/server";
import { z } from "zod";

import { requireGuideUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { calculatePackagePricing } from "@/lib/pricing";
import { slugify } from "@/lib/slug";

const itinerarySchema = z.object({
  dayNumber: z.number().int().min(1),
  city: z.string().min(2).max(120),
  title: z.string().min(2).max(150),
  description: z.string().max(2000).optional(),
  activityType: z.string().max(100).optional(),
});

const createPackageSchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().min(20).max(5000),
  basePrice: z.number().positive(),
  durationDays: z.number().int().min(1).max(60),
  maxGroupSize: z.number().int().min(1).max(200).optional(),
  meetingCity: z.string().min(2).max(120),
  currency: z.string().length(3).optional().default("usd"),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("DRAFT"),
  itineraries: z.array(itinerarySchema).min(1),
});

export async function GET() {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  const profile = await prisma.guideProfile.findUnique({
    where: { userId: auth.user.id },
    select: { id: true },
  });

  if (!profile) {
    return NextResponse.json({ error: "Guide profile not found" }, { status: 404 });
  }

  const packages = await prisma.tourPackage.findMany({
    where: { guideProfileId: profile.id },
    include: {
      itineraries: { orderBy: { dayNumber: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ packages });
}

export async function POST(request: Request) {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const parsed = createPackageSchema.safeParse(body);

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

    const data = parsed.data;
    const pricing = calculatePackagePricing(data.basePrice, 10);

    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let suffix = 1;

    while (await prisma.tourPackage.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const pkg = await prisma.tourPackage.create({
      data: {
        guideProfileId: profile.id,
        slug,
        title: data.title,
        description: data.description,
        basePrice: data.basePrice,
        websiteFeePercent: pricing.websiteFeePercent,
        websiteFeeAmount: pricing.websiteFeeAmount,
        totalPrice: pricing.totalPrice,
        durationDays: data.durationDays,
        maxGroupSize: data.maxGroupSize,
        meetingCity: data.meetingCity,
        currency: data.currency.toLowerCase(),
        status: data.status,
        itineraries: {
          create: data.itineraries
            .sort((a, b) => a.dayNumber - b.dayNumber)
            .map((item) => ({
              dayNumber: item.dayNumber,
              city: item.city,
              title: item.title,
              description: item.description,
              activityType: item.activityType,
            })),
        },
      },
      include: {
        itineraries: { orderBy: { dayNumber: "asc" } },
      },
    });

    return NextResponse.json({ package: pkg }, { status: 201 });
  } catch (error) {
    console.error("Create package error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
