import { prisma } from "@/lib/prisma";
import type { User as ClerkUser } from "@clerk/nextjs/server";
import type { Plan, SubStatus } from "@prisma/client";

/**
 * Lazy-sync a Clerk user into the database.
 * Creates the user + a FREE subscription on first call, updates name/avatar on subsequent calls.
 */
export async function syncUser(clerkUser: ClerkUser) {
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  return prisma.user.upsert({
    where:  { clerkId: clerkUser.id },
    update: { email, name, avatarUrl: clerkUser.imageUrl },
    create: {
      clerkId:  clerkUser.id,
      email,
      name,
      avatarUrl: clerkUser.imageUrl,
      subscription: {
        create: { plan: "FREE", status: "ACTIVE" },
      },
    },
    include: { subscription: true },
  });
}

/** Get a user by Clerk ID, including subscription */
export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where:   { clerkId },
    include: { subscription: true },
  });
}

/** Update subscription after a Stripe event */
export async function upsertSubscription(params: {
  clerkId:             string;
  stripeCustomerId:    string;
  stripeSubscriptionId: string;
  stripePriceId:       string;
  stripeProductId:     string;
  plan:                Plan;
  status:              SubStatus;
  currentPeriodEnd:    Date;
  cancelAtPeriodEnd:   boolean;
}) {
  const user = await prisma.user.findUnique({ where: { clerkId: params.clerkId } });
  if (!user) return null;

  return prisma.subscription.upsert({
    where:  { userId: user.id },
    update: {
      stripeCustomerId:     params.stripeCustomerId,
      stripeSubscriptionId: params.stripeSubscriptionId,
      stripePriceId:        params.stripePriceId,
      stripeProductId:      params.stripeProductId,
      plan:                 params.plan,
      status:               params.status,
      currentPeriodEnd:     params.currentPeriodEnd,
      cancelAtPeriodEnd:    params.cancelAtPeriodEnd,
    },
    create: {
      userId:               user.id,
      stripeCustomerId:     params.stripeCustomerId,
      stripeSubscriptionId: params.stripeSubscriptionId,
      stripePriceId:        params.stripePriceId,
      stripeProductId:      params.stripeProductId,
      plan:                 params.plan,
      status:               params.status,
      currentPeriodEnd:     params.currentPeriodEnd,
      cancelAtPeriodEnd:    params.cancelAtPeriodEnd,
    },
  });
}

/** Map a Stripe product ID to a Plan enum value */
export function productIdToPlan(productId: string): Plan {
  if (productId === process.env.ProId)        return "PRO";
  if (productId === process.env.EnterpriseId) return "ENTERPRISE";
  return "FREE";
}
