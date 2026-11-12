import { PRODUCTS, findProduct } from "../catalog.js";
import { addItem, itemCount, loadCart, removeItem, saveCart, setQty } from "../cart/cart.js";
import { applyCode, CODES, removeCode } from "../pricing/discounts.js";
import { cartTotals, money } from "../pricing/totals.js";
import { searchProducts } from "../search/search.js";
import { showBuild } from "./build.js";

const $ = (id) => document.getElementById(id);
let cart = loadCart();

function tile(p) {
  const initial = p.name[0];
  return `
    <article class="card" data-testid="product-${p.id}">
      <div class="art" style="--a:${p.tone[0]};--b:${p.tone[1]}"><span>${initial}</span></div>
      <div class="meta">
        <p class="cat">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="price">${money(p.price)}</p>
      </div>
      <button class="add" data-add="${p.id}" data-testid="add-${p.id}">Add to bag</button>
    </article>`;
}

function renderGrid() {
  const query = $("search").value;
  const found = searchProducts(PRODUCTS, query);
  $("grid").innerHTML = found.map(tile).join("");
  $("results-note").textContent = query.trim()
    ? found.length
      ? `${found.length} result${found.length === 1 ? "" : "s"} for “${query.trim()}”`
      : `No results for “${query.trim()}”`
    : "";
}

function renderBag() {
  $("bag-count").textContent = itemCount(cart);
  $("bag-lines").innerHTML = cart.items.length
    ? cart.items
        .map((i) => {
          const p = findProduct(i.id);
          return `
          <div class="line" data-testid="line-${i.id}">
            <div><p class="line-name">${p.name}</p><p class="line-price">${money(p.price)}</p></div>
            <div class="qty">
              <button data-dec="${i.id}" aria-label="Decrease">−</button>
              <input value="${i.qty}" data-qty="${i.id}" data-testid="qty-${i.id}" inputmode="numeric">
              <button data-inc="${i.id}" aria-label="Increase">+</button>
            </div>
            <button class="remove" data-remove="${i.id}">Remove</button>
          </div>`;
        })
        .join("")
    : `<p class="empty">Your bag is empty.</p>`;
  $("codes").innerHTML = cart.codes
    .map((c) => `<span class="chip">${c} · ${CODES[c]?.label ?? ""} <button data-uncode="${c}" aria-label="Remove code">&times;</button></span>`)
    .join("");
  const t = cartTotals(cart);
  $("t-subtotal").textContent = money(t.subtotal);
  $("t-discount").textContent = t.discount ? `−${money(t.discount)}` : money(0);
  $("t-shipping").textContent = t.shipping ? money(t.shipping) : "Free";
  $("t-total").textContent = money(t.total);
  saveCart(cart);
}

function openBag(open) {
  $("bag").classList.toggle("open", open);
  $("bag").setAttribute("aria-hidden", String(!open));
  $("scrim").classList.toggle("show", open);
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.add) {
    addItem(cart, t.dataset.add);
    renderBag();
    openBag(true);
  } else if (t.dataset.inc) {
    const line = cart.items.find((i) => i.id === t.dataset.inc);
    setQty(cart, line.id, line.qty + 1);
    renderBag();
  } else if (t.dataset.dec) {
    const line = cart.items.find((i) => i.id === t.dataset.dec);
    setQty(cart, line.id, line.qty - 1);
    renderBag();
  } else if (t.dataset.remove) {
    removeItem(cart, t.dataset.remove);
    renderBag();
  } else if (t.dataset.uncode) {
    removeCode(cart, t.dataset.uncode);
    renderBag();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.dataset.qty) {
    setQty(cart, e.target.dataset.qty, e.target.value);
    renderBag();
  }
});

$("code-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const res = applyCode(cart, $("code-input").value);
  $("code-msg").textContent = res.ok ? `${res.code} applied: ${res.label}` : res.error;
  $("code-msg").className = `code-msg ${res.ok ? "ok" : "err"}`;
  renderBag();
});

$("search").addEventListener("input", renderGrid);
$("open-bag").addEventListener("click", () => openBag(true));
$("close-bag").addEventListener("click", () => openBag(false));
$("scrim").addEventListener("click", () => openBag(false));

renderGrid();
renderBag();
showBuild();
