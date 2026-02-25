import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  createEmailVerification,
  sendGuideRegistrationEmail,
  sendGuideVerificationEmail,
} from "@/lib/email-verification";
import { isGuideProfileComplete } from "@/lib/guide-profile";
import { prisma } from "@/lib/prisma";

export default async function GuideRegisterCompletePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      emailVerified: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/unauthorized");
  }

  if (user.role !== "GUIDE") {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "GUIDE",
        emailVerified: false,
      },
    });

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

    redirect("/guide/dashboard?verify=pending&source=google");
  }

  if (!user.emailVerified) {
    redirect("/guide/dashboard?verify=pending");
  }

  const profile = await prisma.guideProfile.findUnique({
    where: { userId: user.id },
    select: {
      bio: true,
      phone: true,
      location: true,
      specialties: true,
      languages: true,
      hourlyRate: true,
    },
  });

  if (!isGuideProfileComplete(profile)) {
    redirect("/guide/settings?onboarding=profile");
  }

  redirect("/guide/dashboard");
}
