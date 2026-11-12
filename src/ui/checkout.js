import { findProduct } from "../catalog.js";
import { emptyCart, loadCart, saveCart } from "../cart/cart.js";
import { cartTotals, money } from "../pricing/totals.js";
import { showBuild } from "./build.js";

const $ = (id) => document.getElementById(id);
const cart = loadCart();

$("summary-lines").innerHTML = cart.items.length
  ? cart.items
      .map((i) => {
        const p = findProduct(i.id);
        return `<div class="line"><p class="line-name">${p.name} × ${i.qty}</p><p>${money(p.price * i.qty)}</p></div>`;
      })
      .join("")
  : `<p class="empty">Your bag is empty.</p>`;

const t = cartTotals(cart);
$("c-subtotal").textContent = money(t.subtotal);
$("c-discount").textContent = t.discount ? `−${money(t.discount)}` : money(0);
$("c-shipping").textContent = t.shipping ? money(t.shipping) : "Free";
$("c-total").textContent = money(t.total);

$("place-order").addEventListener("click", () => {
  saveCart(emptyCart());
  $("confirm").hidden = false;
  $("place-order").disabled = true;
});

showBuild();
