import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { resend } from "@/lib/resend";
import { upsertSubscription, getUserByClerkId, productIdToPlan } from "@/lib/db/user";
import { WelcomeEmail } from "@/lib/email/WelcomeEmail";
import type Stripe from "stripe";
import { SubStatus } from "@prisma/client";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

/** Map Stripe subscription status → our SubStatus enum */
function toSubStatus(status: Stripe.Subscription.Status): SubStatus {
  switch (status) {
    case "active":    return SubStatus.ACTIVE;
    case "canceled":  return SubStatus.CANCELED;
    case "past_due":  return SubStatus.PAST_DUE;
    case "trialing":  return SubStatus.TRIALING;
    default:          return SubStatus.INCOMPLETE;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkId = session.metadata?.clerkId;
        if (!clerkId || !session.subscription || !session.customer) break;

        // Expand the subscription to get full details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const priceItem = subscription.items.data[0];
        const productId = priceItem?.price.product as string | undefined;

        await upsertSubscription({
          clerkId,
          stripeCustomerId:     session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId:        priceItem?.price.id ?? "",
          stripeProductId:      productId ?? "",
          plan:                 productIdToPlan(productId ?? ""),
          status:               toSubStatus(subscription.status),
          currentPeriodEnd:     new Date((priceItem?.current_period_end ?? 0) * 1000),
          cancelAtPeriodEnd:    subscription.cancel_at_period_end,
        });

        // Send welcome email
        const dbUser = await getUserByClerkId(clerkId);
        if (dbUser?.email) {
          await resend.emails.send({
            from: "Sassify <onboarding@resend.dev>",
            to: dbUser.email,
            subject: "Welcome to Sassify!",
            react: WelcomeEmail({
              name: dbUser.name ?? "there",
              plan: productIdToPlan(productId ?? ""),
            }),
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkId = subscription.metadata?.clerkId;
        if (!clerkId) break;

        const priceItem  = subscription.items.data[0];
        const productId  = priceItem?.price.product as string | undefined;

        await upsertSubscription({
          clerkId,
          stripeCustomerId:     subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId:        priceItem?.price.id ?? "",
          stripeProductId:      productId ?? "",
          plan:                 productIdToPlan(productId ?? ""),
          status:               toSubStatus(subscription.status),
          currentPeriodEnd:     new Date((priceItem?.current_period_end ?? 0) * 1000),
          cancelAtPeriodEnd:    subscription.cancel_at_period_end,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkId = subscription.metadata?.clerkId;
        if (!clerkId) break;

        const priceItem = subscription.items.data[0];
        const productId = priceItem?.price.product as string | undefined;

        await upsertSubscription({
          clerkId,
          stripeCustomerId:     subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId:        priceItem?.price.id ?? "",
          stripeProductId:      productId ?? "",
          plan:                 productIdToPlan(productId ?? ""),
          status:               SubStatus.CANCELED,
          currentPeriodEnd:     new Date((priceItem?.current_period_end ?? 0) * 1000),
          cancelAtPeriodEnd:    true,
        });
        break;
      }
    }
  } catch (err) {
    console.error("[stripe-webhook] handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
