import { NextResponse } from "next/server";

import { issueAndSendGuideVerificationEmail } from "@/lib/email-verification";
import { requireGuideUser } from "@/lib/api-auth";

export async function POST() {
  const auth = await requireGuideUser();
  if ("error" in auth) {
    return auth.error;
  }

  const result = await issueAndSendGuideVerificationEmail(auth.user.id);

  if (result.skipped) {
    return NextResponse.json({
      success: true,
      message: "Email is already verified.",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Verification email sent.",
    deliveredByProvider: result.sent,
  });
}
