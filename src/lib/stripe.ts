import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

/** Map plan name → Stripe product ID from env */
export const STRIPE_PRODUCTS = {
  FREE:       process.env.STRIPE_PRODUCT_FREE ?? "",
  PRO:        process.env.STRIPE_PRODUCT_PRO ?? "",
  ENTERPRISE: process.env.STRIPE_PRODUCT_ENTERPRISE ?? "",
} as const;

/** Fetch the first active recurring price for a product ID */
export async function getPriceForProduct(productId: string): Promise<Stripe.Price | null> {
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    type: "recurring",
    limit: 1,
  });
  return prices.data[0] ?? null;
}
