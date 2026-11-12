import { findProduct } from "../catalog.js";
import { shippingFor } from "../checkout/shipping.js";
import { discountFor } from "./discounts.js";

const round = (n) => Math.round(n * 100) / 100;

export function cartTotals(cart) {
  const subtotal = round(
    cart.items.reduce((sum, i) => sum + (findProduct(i.id)?.price ?? 0) * i.qty, 0),
  );
  const discount = Math.min(subtotal, discountFor(subtotal, cart.codes));
  const afterDiscount = round(subtotal - discount);
  const shipping = shippingFor(afterDiscount);
  return { subtotal, discount, shipping, total: round(afterDiscount + shipping) };
}

export function money(n) {
  return `$${n.toFixed(2)}`;
}
