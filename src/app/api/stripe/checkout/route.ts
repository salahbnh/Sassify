import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRODUCTS, getPriceForProduct } from "@/lib/stripe";
import { getUserByClerkId } from "@/lib/db/user";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type PlanKey = keyof typeof STRIPE_PRODUCTS;

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { planKey?: string };
  const planKey = (body.planKey?.toUpperCase() ?? "PRO") as PlanKey;

  if (!STRIPE_PRODUCTS[planKey]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const productId = STRIPE_PRODUCTS[planKey];
  const price = await getPriceForProduct(productId);
  if (!price) {
    return NextResponse.json({ error: "No active price found for this plan" }, { status: 404 });
  }

  const dbUser = await getUserByClerkId(userId);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: price.id, quantity: 1 }],
    // subscription mode auto-creates a customer; pass existing one if we have it
    ...(dbUser?.subscription?.stripeCustomerId
      ? { customer: dbUser.subscription.stripeCustomerId }
      : {}),
    success_url: `${APP_URL}/settings?tab=billing&success=1`,
    cancel_url: `${APP_URL}/#pricing`,
    metadata: { clerkId: userId },
    subscription_data: { metadata: { clerkId: userId } },
  });

  return NextResponse.json({ url: session.url });
}
