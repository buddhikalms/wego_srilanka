import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?verify=missing", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { emailVerificationToken: token },
    select: {
      id: true,
      emailVerificationTokenExpiresAt: true,
      role: true,
    },
  });

  if (!user) {
    return NextResponse.redirect(new URL("/login?verify=invalid", request.url));
  }

  if (
    !user.emailVerificationTokenExpiresAt ||
    user.emailVerificationTokenExpiresAt.getTime() < Date.now()
  ) {
    return NextResponse.redirect(new URL("/login?verify=expired", request.url));
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
    },
  });

  const successUrl =
    user.role === "GUIDE"
      ? "/login?verify=success&next=guide"
      : "/login?verify=success";

  return NextResponse.redirect(new URL(successUrl, request.url));
}
