export const PRODUCTS = [
  { id: "linen-shirt", name: "Linen Shirt", category: "Menswear", price: 89, tone: ["#e8dcc8", "#c9b79c"] },
  { id: "silk-scarf", name: "Silk Scarf", category: "Accessories", price: 65, tone: ["#f2d7d0", "#d99a8c"] },
  { id: "leather-tote", name: "Leather Tote", category: "Bags", price: 189, tone: ["#d8c3a5", "#8e6c4a"] },
  { id: "wool-throw", name: "Wool Throw", category: "Homewares", price: 140, tone: ["#dfe3d8", "#9aa68c"] },
  { id: "ceramic-vase", name: "Ceramic Vase", category: "Homewares", price: 55, tone: ["#e9e4dc", "#b8ab98"] },
  { id: "cotton-dress", name: "Cotton Dress", category: "Womenswear", price: 129, tone: ["#dde4ee", "#8fa3bf"] },
  { id: "canvas-sneakers", name: "Canvas Sneakers", category: "Footwear", price: 99, tone: ["#f0ece4", "#c4baa8"] },
  { id: "linen-trousers", name: "Linen Trousers", category: "Menswear", price: 110, tone: ["#e6e0d2", "#a89c80"] },
  { id: "cashmere-beanie", name: "Cashmere Beanie", category: "Accessories", price: 75, tone: ["#e7dde6", "#a98ea6"] },
  { id: "espresso-cups", name: "Espresso Cups, Set of 4", category: "Homewares", price: 48, tone: ["#e3e8e6", "#7e958e"] },
  { id: "leather-belt", name: "Leather Belt", category: "Accessories", price: 59, tone: ["#dccbb5", "#7a5a3c"] },
  { id: "straw-hat", name: "Straw Hat", category: "Accessories", price: 45, tone: ["#f3e9cf", "#cdb57a"] },
];

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
