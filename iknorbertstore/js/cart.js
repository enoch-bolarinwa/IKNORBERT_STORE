// ===================================================================
// Cart page – reads the cart saved by common.js
// ===================================================================
function renderCart() {
  const cart = getCart().filter(i => byId(i.id));
  const box = document.getElementById("cartContent");

  if (!cart.length) {
    box.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-cart"></i><h3>Your cart is empty</h3><p>Add some itel products and they will show up here.</p><a href="index.html" class="btn-red">Start shopping</a></div>`;
    return;
  }

  const rows = cart.map(i => {
    const p = byId(i.id);
    return `<div class="cart-row">
      <div class="cart-thumb">${productVisual(p, i.id)}</div>
      <div class="cart-info"><div class="cart-name">${p.name}</div><div class="cart-spec">${p.spec}</div></div>
      <div class="qty">
        <button onclick="changeQty(${p.id}, -1)" aria-label="Decrease">−</button>
        <span>${i.qty}</span>
        <button onclick="changeQty(${p.id}, 1)" aria-label="Increase">+</button>
      </div>
      <div class="cart-line">${money(p.price * i.qty)}</div>
      <button class="cart-remove" onclick="removeItem(${p.id})" aria-label="Remove"><i class="fas fa-trash"></i></button>
    </div>`;
  }).join("");

  const subtotal = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const free = subtotal >= FREE_DELIVERY_ABOVE;
  const msg = "Hello IknorbertStore, I would like to order:\n" +
    cart.map(i => `- ${i.qty} x ${byId(i.id).name} (${money(byId(i.id).price)})`).join("\n") +
    `\nTotal: ${money(subtotal)}`;

  box.innerHTML = `
    <div class="cart-layout">
      <div class="cart-list">${rows}</div>
      <aside class="cart-summary">
        <h3>Order Summary</h3>
        <div class="sum-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
        <div class="sum-row"><span>Delivery</span><strong>${free ? "FREE" : "Calculated at order"}</strong></div>
        ${free ? "" : `<div class="sum-note">Add ${money(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery.</div>`}
        <div class="sum-row total"><span>Total</span><strong>${money(subtotal)}</strong></div>
        <a class="btn-red block" target="_blank" rel="noopener" href="https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}"><i class="fab fa-whatsapp"></i> Order on WhatsApp</a>
        <button class="btn-outline block" onclick="clearCart()">Clear cart</button>
        <a href="index.html" class="continue"><i class="fas fa-arrow-left"></i> Continue shopping</a>
      </aside>
    </div>`;
}
function changeQty(id, delta) {
  const cart = getCart();
  const line = cart.find(i => i.id === id);
  if (!line) return;
  line.qty += delta;
  saveCart(cart.filter(i => i.qty > 0));
  renderCart();
}
function removeItem(id) { saveCart(getCart().filter(i => i.id !== id)); renderCart(); }
function clearCart() { saveCart([]); renderCart(); }
renderCart();
