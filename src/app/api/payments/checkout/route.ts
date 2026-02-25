import Stripe from "stripe";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { toMinorUnits } from "@/lib/pricing";

const checkoutSchema = z.object({
  packageId: z.string().min(1),
  travelersCount: z.number().int().min(1).max(20).optional().default(1),
});

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) {
    return auth.error;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);

  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const pkg = await prisma.tourPackage.findUnique({
      where: { id: parsed.data.packageId },
    });

    if (!pkg || pkg.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const unitAmount = Number(pkg.totalPrice);
    const amountTotal = Number((unitAmount * parsed.data.travelersCount).toFixed(2));

    const booking = await prisma.booking.create({
      data: {
        userId: auth.user.id,
        packageId: pkg.id,
        travelersCount: parsed.data.travelersCount,
        amountTotal,
        currency: pkg.currency,
        status: "PENDING",
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/packages/${pkg.slug}?payment=success&booking=${booking.id}`;
    const cancelUrl = `${baseUrl}/packages/${pkg.slug}?payment=cancelled&booking=${booking.id}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: auth.user.email,
      metadata: {
        bookingId: booking.id,
        packageId: pkg.id,
        userId: auth.user.id,
      },
      line_items: [
        {
          quantity: parsed.data.travelersCount,
          price_data: {
            currency: pkg.currency,
            product_data: {
              name: pkg.title,
              description: `Includes 10% platform fee`,
            },
            unit_amount: toMinorUnits(unitAmount),
          },
        },
      ],
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeCheckoutId: session.id,
      },
    });

    return NextResponse.json({ checkoutUrl: session.url, bookingId: booking.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
