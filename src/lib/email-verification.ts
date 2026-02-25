import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

const VERIFICATION_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

function appBaseUrl() {
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

async function sendWithSmtp({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const secure = process.env.SMTP_SECURE === "true";

  if (!user || !pass || !from) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return true;
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  let sent = false;
  try {
    sent = await sendWithSmtp({ to, subject, html });
  } catch (error) {
    console.error("SMTP send error:", error);
    sent = false;
  }

  return sent;
}

export async function createEmailVerification(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);

  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function sendGuideVerificationEmail({
  email,
  fullName,
  token,
}: {
  email: string;
  fullName: string;
  token: string;
}) {
  const verifyUrl = `${appBaseUrl()}/api/auth/verify-email?token=${token}`;
  const subject = "Verify your guide account";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Verify your guide account</h2>
      <p>Hi ${fullName || "Guide"},</p>
      <p>Please verify your email to access full guide dashboard features.</p>
      <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#0d3f83;color:#fff;text-decoration:none;border-radius:8px;">Verify Email</a></p>
      <p>If the button does not work, open this link:</p>
      <p>${verifyUrl}</p>
    </div>
  `;

  const sent = await sendEmail({ to: email, subject, html });

  if (!sent) {
    console.log(`[EMAIL VERIFICATION] ${email} -> ${verifyUrl}`);
  }

  return { sent, verifyUrl };
}

export async function sendGuideRegistrationEmail({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) {
  const settingsUrl = `${appBaseUrl()}/guide/settings?onboarding=profile`;
  const subject = "Guide registration received - complete profile for admin review";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Guide registration received</h2>
      <p>Hi ${fullName || "Guide"},</p>
      <p>Your guide registration is successful.</p>
      <p>Please complete your profile so our admin team can review your account.</p>
      <p><a href="${settingsUrl}" style="display:inline-block;padding:10px 16px;background:#0d3f83;color:#fff;text-decoration:none;border-radius:8px;">Complete Profile</a></p>
      <p>After profile completion and email verification, your guide dashboard features will be fully available.</p>
    </div>
  `;

  const sent = await sendEmail({ to: email, subject, html });
  if (!sent) {
    console.log(`[GUIDE ONBOARDING EMAIL] ${email} -> ${settingsUrl}`);
  }

  return { sent, settingsUrl };
}

export async function issueAndSendGuideVerificationEmail(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      emailVerified: true,
    },
  });

  if (!user || user.role !== "GUIDE" || user.emailVerified) {
    return { sent: false, skipped: true };
  }

  const { token } = await createEmailVerification(user.id);
  const result = await sendGuideVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    token,
  });

  return { ...result, skipped: false };
}
