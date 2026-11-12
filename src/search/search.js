export function searchProducts(products, query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
}
