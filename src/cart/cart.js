const KEY = "mf-cart";

export function emptyCart() {
  return { items: [], codes: [] };
}

export function addItem(cart, productId, qty = 1) {
  const line = cart.items.find((i) => i.id === productId);
  if (line) line.qty += qty;
  else cart.items.push({ id: productId, qty });
  return cart;
}

export function setQty(cart, productId, qty) {
  const n = Math.max(0, Math.floor(Number(qty) || 0));
  if (n === 0) return removeItem(cart, productId);
  const line = cart.items.find((i) => i.id === productId);
  if (line) line.qty = n;
  return cart;
}

export function removeItem(cart, productId) {
  cart.items = cart.items.filter((i) => i.id !== productId);
  return cart;
}

export function itemCount(cart) {
  return cart.items.reduce((n, i) => n + i.qty, 0);
}

export function loadCart(storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage?.getItem(KEY) ?? "null");
    if (saved && Array.isArray(saved.items)) return { items: saved.items, codes: saved.codes ?? [] };
  } catch {}
  return emptyCart();
}

export function saveCart(cart, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, JSON.stringify(cart));
  } catch {}
}
