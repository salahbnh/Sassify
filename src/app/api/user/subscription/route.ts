import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserByClerkId } from "@/lib/db/user";
import type Stripe from "stripe";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await getUserByClerkId(userId);
  const sub = dbUser?.subscription ?? null;

  let paymentMethod: { brand: string; last4: string; expMonth: number; expYear: number } | null = null;
  let invoices: { id: string; date: number; amount: number; status: string | null; url: string | null }[] = [];

  if (sub?.stripeCustomerId) {
    const [pmResult, invoiceResult] = await Promise.all([
      stripe.paymentMethods.list({ customer: sub.stripeCustomerId, type: "card", limit: 1 }),
      stripe.invoices.list({ customer: sub.stripeCustomerId, limit: 6 }),
    ]);

    const pm = pmResult.data[0] as Stripe.PaymentMethod | undefined;
    if (pm?.card) {
      paymentMethod = {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expMonth: pm.card.exp_month,
        expYear: pm.card.exp_year,
      };
    }

    invoices = invoiceResult.data.map((inv) => ({
      id: inv.id,
      date: inv.created,
      amount: (inv.amount_paid ?? 0) / 100,
      status: inv.status,
      url: inv.hosted_invoice_url ?? null,
    }));
  }

  return NextResponse.json(
    {
      plan: sub?.plan ?? "FREE",
      status: sub?.status ?? "ACTIVE",
      currentPeriodEnd: sub?.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: sub?.cancelAtPeriodEnd ?? false,
      stripeCustomerId: sub?.stripeCustomerId ?? null,
      paymentMethod,
      invoices,
    },
    { headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=300" } }
  );
}
