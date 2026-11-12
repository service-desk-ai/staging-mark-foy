export const CODES = {
  SAVE10: { percent: 10, label: "10% off" },
  WELCOME15: { percent: 15, label: "15% off your first order" },
};

export function applyCode(cart, rawCode) {
  const code = String(rawCode ?? "").trim().toUpperCase();
  if (!CODES[code]) return { ok: false, error: "That code isn't valid." };
  cart.codes.push(code);
  return { ok: true, code, label: CODES[code].label };
}

export function removeCode(cart, code) {
  cart.codes = cart.codes.filter((c) => c !== code);
  return cart;
}

export function discountFor(subtotal, codes) {
  const off = codes.reduce((sum, c) => sum + (subtotal * (CODES[c]?.percent ?? 0)) / 100, 0);
  return Math.round(off * 100) / 100;
}
