export const FREE_SHIPPING_THRESHOLD = 100;
export const FLAT_RATE = 12;

export function shippingFor(amount) {
  if (amount <= 0) return 0;
  return amount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_RATE;
}
