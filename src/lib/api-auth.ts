import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (!user) {
    return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
  }

  return { user };
}

export async function requireGuideUser() {
  const result = await requireUser();
  if ("error" in result) {
    return result;
  }

  if (result.user.role !== "GUIDE") {
    return { error: NextResponse.json({ error: "Guide role required" }, { status: 403 }) };
  }

  return result;
}

export async function requireAdminUser() {
  const result = await requireUser();
  if ("error" in result) {
    return result;
  }

  if (result.user.role !== "ADMIN") {
    return { error: NextResponse.json({ error: "Admin role required" }, { status: 403 }) };
  }

  return result;
}
