import { NextResponse } from "next/server";

import { issueAndSendGuideVerificationEmail } from "@/lib/email-verification";
import { isGuideProfileComplete } from "@/lib/guide-profile";
import { requireGuideUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  const { searchParams } = new URL(request.url);
  const triggerVerificationEmail = searchParams.get("triggerVerificationEmail") === "1";

  const profile = await prisma.guideProfile.findUnique({
    where: { userId: auth.user.id },
    select: {
      bio: true,
      phone: true,
      location: true,
      specialties: true,
      languages: true,
      hourlyRate: true,
    },
  });

  let verificationEmailTriggered = false;
  if (!auth.user.emailVerified && triggerVerificationEmail) {
    await issueAndSendGuideVerificationEmail(auth.user.id);
    verificationEmailTriggered = true;
  }

  return NextResponse.json({
    emailVerified: auth.user.emailVerified,
    profileComplete: isGuideProfileComplete(profile),
    verificationEmailTriggered,
  });
}
