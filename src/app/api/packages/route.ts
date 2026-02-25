import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  const packages = await prisma.tourPackage.findMany({
    where: {
      status: "PUBLISHED",
      ...(city
        ? {
            OR: [
              { meetingCity: { contains: city } },
              { itineraries: { some: { city: { contains: city } } } },
            ],
          }
        : {}),
    },
    include: {
      guideProfile: {
        include: {
          user: { select: { fullName: true } },
        },
      },
      itineraries: { orderBy: { dayNumber: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ packages });
}
