// ===================================================================
// IknorbertStore – shared behaviour: header/nav/footer, cart, cards
// Every page loads data.js first, then this file.
// ===================================================================

const money = n => "₦" + Number(n).toLocaleString("en-NG");
const byId = id => PRODUCTS.find(p => p.id === Number(id));
const catBySlug = slug => CATEGORIES.find(c => c.slug === slug);

// ---------- CART (saved in localStorage so it survives page changes) ----------
const CART_KEY = "iknorbertstore_cart";
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  updateCartBadge();
}
function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
function updateCartBadge() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cartCount();
}
function addToCart(id) {
  const p = byId(id); if (!p) return;
  const cart = getCart();
  const line = cart.find(i => i.id === p.id);
  if (line) line.qty++; else cart.push({ id: p.id, qty: 1 });
  saveCart(cart);
  showToast(p.name + " added to cart!");
}
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  document.getElementById("toastMsg").textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---------- STARS + PRODUCT CARD ----------
function renderStars(rating) {
  const full = Math.floor(rating), half = rating % 1 >= 0.5;
  let s = "";
  for (let i = 0; i < 5; i++) {
    if (i < full) s += '<i class="fas fa-star"></i>';
    else if (i === full && half) s += '<i class="fas fa-star-half-alt"></i>';
    else s += '<i class="far fa-star"></i>';
  }
  return s;
}

const phoneColors = ["#1a1a4e","#1a3a00","#4a0000","#002233","#2a2a00","#001a4a","#1a0033","#003322","#1a1a1a","#003300"];

function productVisual(p, idx) {
  const cat = catBySlug(p.cat);
  if (p.cat === "smartphones" || p.cat === "feature-phones") {
    const color = phoneColors[idx % phoneColors.length];
    return `<svg class="phone-svg" viewBox="0 0 70 120" fill="none">
      <rect x="2" y="2" width="66" height="116" rx="10" fill="${color}" stroke="#333" stroke-width="1.5"/>
      <rect x="8" y="10" width="54" height="92" rx="5" fill="rgba(0,0,0,0.4)"/>
      <rect x="9" y="11" width="52" height="90" rx="4" fill="url(#g${p.id})"/>
      <defs><linearGradient id="g${p.id}" x1="9" y1="11" x2="61" y2="101"><stop stop-color="${color}"/><stop offset="1" stop-color="rgba(0,0,0,0.8)"/></linearGradient></defs>
      <circle cx="35" cy="7" r="2.5" fill="#444"/>
      <text x="35" y="52" text-anchor="middle" font-size="6" fill="white" font-family="Inter" font-weight="600">itel</text>
      <circle cx="35" cy="108" r="4" fill="#333"/></svg>`;
  }
  return `<i class="fas ${cat ? cat.icon : "fa-box"} product-icon"></i>`;
}

function createProductCard(p, idx = 0) {
  return `
  <div class="product-card" onclick="addToCart(${p.id})">
    <span class="product-badge ${p.badgeClass}">${p.badge}</span>
    <button class="product-wishlist" onclick="event.stopPropagation()"><i class="far fa-heart"></i></button>
    <div class="product-img-wrap"><div class="product-img-placeholder">${productVisual(p, idx)}</div></div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-spec">${p.spec}</div>
      <div class="product-rating"><span class="stars">${renderStars(p.rating)}</span><span>(${p.reviews})</span></div>
      <div class="product-price-row">
        <div><div class="price-main">${money(p.price)}</div><div class="price-old">${money(p.old)}</div></div>
        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Add</button>
      </div>
    </div>
  </div>`;
}
const discountPct = p => Math.round((1 - p.price / p.old) * 100);

// ---------- SHARED LAYOUT ----------
const NAV = [
  { key:"home",        label:"Home",        href:"index.html" },
  { key:"smartphones", label:"Smartphones", href:"smartphones.html" },
  { key:"tablets",     label:"Tablets",     href:"tablets.html" },
  { key:"smart-tvs",   label:"Smart TVs",   href:"smart-tvs.html" },
  { key:"accessories", label:"Accessories", href:"accessories.html" },
  { key:"power-banks", label:"Power Banks", href:"power-banks.html" },
  { key:"earphones",   label:"Earphones",   href:"earphones.html" },
  { key:"deals",       label:"Deals",       href:"deals.html" },
  { key:"about",       label:"About Us",    href:"about.html" },
];

function headerHTML(active) {
  const searchOpts = [["", "All Products"], ["smartphones","Smartphones"], ["tablets","Tablets"], ["accessories","Accessories"], ["smart-tvs","TVs"]]
    .map(o => `<option value="${o[0]}">${o[1]}</option>`).join("");
  const navLinks = NAV.map(n => `<a href="${n.href}" class="${n.key === active ? "active" : ""}">${n.label}</a>`).join("");
  const allCats = CATEGORIES.map(c => `<a href="${c.file}"><span>${c.emoji} ${c.side}</span><i class="fas fa-chevron-right"></i></a>`).join("");
  return `
<div class="topbar"><div class="container">
  <div class="topbar-left">
    <span><i class="fas fa-map-marker-alt"></i> Head Office: Suites 24-26, 1st Floor, IT IS WELL Plaza, 17, Ola Ayeni Street, Ikeja, Lagos</span>
    <span><i class="fas fa-phone"></i> 08129963217 | 08129963210</span>
  </div>
  <div class="topbar-right">
    <a href="contact.html"><i class="fas fa-truck"></i> Track Order</a>
    <a href="contact.html#locations"><i class="fas fa-store"></i> Store Locations</a>
    <a href="contact.html"><i class="fas fa-user"></i> My Account</a>
  </div>
</div></div>

<header><div class="container"><div class="header-inner">
  <a href="index.html" class="logo">
    <div class="logo-icon">IK</div>
    <div class="logo-text"><span class="brand">IknorbertStore</span><span class="tagline">Nigeria's itel Specialist</span></div>
  </a>
  <form class="search-bar" id="searchForm">
    <select id="searchCat">${searchOpts}</select>
    <input type="text" id="searchInput" placeholder="Search itel phones, tablets, accessories..." />
    <button type="submit"><i class="fas fa-search"></i></button>
  </form>
  <div class="header-actions">
    <a href="#" class="header-btn"><i class="fas fa-heart"></i><span>Wishlist</span></a>
    <a href="cart.html" class="header-btn" id="cartBtn"><i class="fas fa-shopping-cart"></i><span>Cart</span><span class="cart-badge" id="cartCount">0</span></a>
  </div>
</div></div></header>

<nav><div class="container"><div class="nav-inner">
  <div class="nav-all-cats" id="allCats">
    <i class="fas fa-bars"></i> All Categories
    <div class="all-cats-menu">${allCats}</div>
  </div>
  <div class="nav-links">${navLinks}</div>
  <a href="deals.html" class="nav-promo"><i class="fas fa-bolt"></i> Flash Sales Today!</a>
</div></div></nav>`;
}

function footerHTML() {
  return `
<div class="newsletter"><div class="container">
  <h3>Get the Latest itel Deals First</h3>
  <p>Subscribe to our newsletter and never miss a price drop or new arrival.</p>
  <form class="newsletter-form" id="newsletterForm">
    <input type="email" id="newsletterEmail" placeholder="Enter your email address..." required />
    <button type="submit">Subscribe</button>
  </form>
</div></div>

<footer>
  <div class="footer-top"><div class="container"><div class="footer-grid">
    <div>
      <div class="footer-logo"><div class="footer-logo-icon">IK</div><span class="footer-logo-text">IknorbertStore</span></div>
      <p class="footer-desc">Nigeria's trusted itel product specialist. We offer 100% authentic itel smartphones, tablets, TVs, and accessories at the best prices. Visit us at Computer Village, Ikeja or shop online.</p>
      <div class="footer-socials">
        <a href="#" class="social-btn fb"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-btn tw"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-btn ig"><i class="fab fa-instagram"></i></a>
        <a href="https://wa.me/${STORE_WHATSAPP}" class="social-btn wa"><i class="fab fa-whatsapp"></i></a>
      </div>
    </div>
    <div class="footer-col"><h4>Quick Links</h4><ul class="footer-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="search.html">All Products</a></li>
      <li><a href="deals.html">Deals &amp; Offers</a></li>
      <li><a href="new-arrivals.html">New Arrivals</a></li>
      <li><a href="contact.html">Contact Us</a></li>
    </ul></div>
    <div class="footer-col"><h4>Categories</h4><ul class="footer-links">
      <li><a href="smartphones.html">itel Smartphones</a></li>
      <li><a href="tablets.html">itel Tablets</a></li>
      <li><a href="smart-tvs.html">itel Smart TVs</a></li>
      <li><a href="power-banks.html">Power Banks</a></li>
      <li><a href="earphones.html">Earphones &amp; Buds</a></li>
      <li><a href="accessories.html">Phone Accessories</a></li>
    </ul></div>
    <div class="footer-col"><h4>Contact Us</h4><ul class="footer-contact">
      <li><i class="fas fa-map-marker-alt"></i><span><strong>Head Office:</strong> Suites 24-26, 1st Floor, IT IS WELL Plaza, 17, Ola Ayeni Street, Ikeja, Lagos</span></li>
      <li><i class="fas fa-phone"></i><span>08129963217, 08129963210</span></li>
      <li><i class="fas fa-envelope"></i><span>${STORE_EMAIL}</span></li>
      <li><i class="fas fa-clock"></i><span>Mon–Sat: 8am – 7pm</span></li>
    </ul></div>
  </div></div></div>
  <div class="container"><div class="footer-bottom">
    <span>© ${new Date().getFullYear()} IknorbertStore. All rights reserved. Authorised itel Reseller Nigeria.</span>
    <div class="payment-icons"><span class="pay-icon">CARD</span><span class="pay-icon">BANK</span><span class="pay-icon">USSD</span><span class="pay-icon">COD</span></div>
  </div></div>
</footer>

<div class="cart-toast" id="toast"><i class="fas fa-check-circle"></i><span id="toastMsg">Item added to cart!</span></div>`;
}

function storeCardsHTML(list) {
  return list.map(s => `
    <div class="location-card ${s.head ? "head-office" : ""}">
      <span class="location-badge" ${s.head ? 'style="background:var(--red-dark)"' : ""}>${s.badge}</span>
      <div class="location-name"><i class="fas ${s.icon || "fa-store"}"></i> ${s.name}</div>
      <div class="location-address">${s.addr}</div>
      <div class="location-tel"><i class="fas fa-phone"></i> ${s.tel}</div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const active = document.body.dataset.nav || "";
  const head = document.getElementById("site-header");
  const foot = document.getElementById("site-footer");
  if (head) head.innerHTML = headerHTML(active);
  if (foot) foot.innerHTML = footerHTML();
  updateCartBadge();

  // header search -> search.html?q=...&cat=...
  const sf = document.getElementById("searchForm");
  if (sf) {
    const params = new URLSearchParams(location.search);
    if (document.body.dataset.page === "search") {
      document.getElementById("searchInput").value = params.get("q") || "";
      document.getElementById("searchCat").value = params.get("cat") || "";
    }
    sf.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("searchInput").value.trim();
      const cat = document.getElementById("searchCat").value;
      location.href = "search.html?q=" + encodeURIComponent(q) + (cat ? "&cat=" + cat : "");
    });
  }

  const nf = document.getElementById("newsletterForm");
  if (nf) nf.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Thanks for subscribing!");
    nf.reset();
  });

  // All Categories dropdown (tap-friendly)
  const ac = document.getElementById("allCats");
  if (ac) {
    ac.addEventListener("click", e => { e.stopPropagation(); ac.classList.toggle("open"); });
    document.addEventListener("click", () => ac.classList.remove("open"));
  }

  // Store cards wherever a #storesGrid exists
  const sg = document.getElementById("storesGrid");
  if (sg) sg.innerHTML = storeCardsHTML(STORES);
});

// ---------- COUNTDOWN (used on Home and Deals) ----------
function startCountdown(h, m, s) {
  let total = h * 3600 + m * 60 + s;
  setInterval(() => {
    if (total <= 0) return;
    total--;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, "0"); };
    set("hours", Math.floor(total / 3600));
    set("mins", Math.floor((total % 3600) / 60));
    set("secs", total % 60);
  }, 1000);
}
