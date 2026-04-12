import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserByClerkId } from "@/lib/db/user";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await getUserByClerkId(userId);
  const customerId = dbUser?.subscription?.stripeCustomerId;

  if (!customerId) {
    return NextResponse.json({ error: "No Stripe customer found. Subscribe to a plan first." }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${APP_URL}/settings?tab=billing`,
  });

  return NextResponse.json({ url: session.url });
}
