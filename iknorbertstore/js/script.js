// ===== PRODUCT DATA =====
const products = [
  { id:1, name:"itel S25 Ultra", spec:"8GB RAM · 256GB · 50MP · Android 14", price:"₦235,000", old:"₦260,000", badge:"New", badgeClass:"badge-new", rating:4.8, reviews:124 },
  { id:2, name:"itel Power 70", spec:"16GB RAM · 128GB · 10,000mAh Battery", price:"₦124,900", old:"₦140,000", badge:"Hot", badgeClass:"badge-hot", rating:4.7, reviews:89 },
  { id:3, name:"itel S24", spec:"8GB RAM · 256GB · 108MP Camera", price:"₦181,000", old:"₦200,000", badge:"Sale", badgeClass:"badge-sale", rating:4.6, reviews:201 },
  { id:4, name:"itel A90", spec:"4GB RAM · 128GB · 5000mAh · 4G", price:"₦135,000", old:"₦150,000", badge:"New", badgeClass:"badge-new", rating:4.5, reviews:67 },
  { id:5, name:"itel P65", spec:"6GB RAM · 128GB · 6000mAh Battery", price:"₦129,900", old:"₦155,000", badge:"Sale", badgeClass:"badge-sale", rating:4.6, reviews:145 },
  { id:6, name:"itel A80", spec:"4GB RAM · 64GB · 5000mAh · Android 13", price:"₦89,000", old:"₦100,000", badge:"Hot", badgeClass:"badge-hot", rating:4.3, reviews:312 },
  { id:7, name:"itel Pad 2", spec:"10.1\" FHD · 6GB RAM · 7000mAh", price:"₦210,000", old:"₦240,000", badge:"New", badgeClass:"badge-new", rating:4.5, reviews:43 },
  { id:8, name:"itel A70", spec:"4GB RAM · 128GB · 5000mAh · 4G", price:"₦106,000", old:"₦120,000", badge:"Sale", badgeClass:"badge-sale", rating:4.4, reviews:276 },
  { id:9, name:"itel Zeno 20", spec:"4GB RAM · 128GB · 5000mAh", price:"₦116,000", old:"₦130,000", badge:"Hot", badgeClass:"badge-hot", rating:4.2, reviews:58 },
  { id:10, name:"itel A50C", spec:"3GB RAM · 64GB · 4G · Dual SIM", price:"₦79,000", old:"₦90,000", badge:"Sale", badgeClass:"badge-sale", rating:4.1, reviews:189 },
];

const newProducts = [
  { id:11, name:"itel S25", spec:"8GB RAM · 128GB · AMOLED · 50MP", price:"₦190,000", old:"₦210,000", badge:"New", badgeClass:"badge-new", rating:4.7, reviews:32 },
  { id:12, name:"itel City 100", spec:"6GB RAM · 128GB · 6.6\" HD+", price:"₦152,000", old:"₦170,000", badge:"New", badgeClass:"badge-new", rating:4.5, reviews:21 },
  { id:13, name:"itel A200", spec:"4GB RAM · 64GB · 5000mAh · 4G", price:"₦190,000", old:"₦200,000", badge:"New", badgeClass:"badge-new", rating:4.4, reviews:15 },
  { id:14, name:"itel Zeno 10", spec:"4GB RAM · 64GB · 5000mAh", price:"₦135,000", old:"₦145,000", badge:"New", badgeClass:"badge-new", rating:4.3, reviews:8 },
  { id:15, name:"itel P70", spec:"16GB RAM · 6000mAh + 4000mAh case", price:"₦124,900", old:"₦140,000", badge:"Hot", badgeClass:"badge-hot", rating:4.8, reviews:56 },
];

// Phone colors for visual variety
const phoneColors = ["#1a1a4e","#1a3a00","#4a0000","#002233","#2a2a00","#001a4a","#1a0033","#003322","#1a1a1a","#003300"];

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for(let i=0;i<5;i++){
    if(i<full) s += '<i class="fas fa-star"></i>';
    else if(i===full && half) s += '<i class="fas fa-star-half-alt"></i>';
    else s += '<i class="far fa-star"></i>';
  }
  return s;
}

function createPhoneCard(p, colorIdx) {
  const color = phoneColors[colorIdx % phoneColors.length];
  return `
  <div class="product-card" onclick="addToCart('${p.name}')">
    <span class="product-badge ${p.badgeClass}">${p.badge}</span>
    <button class="product-wishlist" onclick="event.stopPropagation()"><i class="far fa-heart"></i></button>
    <div class="product-img-wrap">
      <div class="product-img-placeholder">
        <svg class="phone-svg" viewBox="0 0 70 120" fill="none">
          <rect x="2" y="2" width="66" height="116" rx="10" fill="${color}" stroke="#333" stroke-width="1.5"/>
          <rect x="8" y="10" width="54" height="92" rx="5" fill="rgba(0,0,0,0.4)"/>
          <rect x="9" y="11" width="52" height="90" rx="4" fill="url(#g${colorIdx})"/>
          <defs><linearGradient id="g${colorIdx}" x1="9" y1="11" x2="61" y2="101"><stop stop-color="${color}"/><stop offset="1" stop-color="rgba(0,0,0,0.8)"/></linearGradient></defs>
          <circle cx="35" cy="7" r="2.5" fill="#444"/>
          <rect x="28" y="5.5" width="6" height="3" rx="1.5" fill="#333"/>
          <text x="35" y="52" text-anchor="middle" font-size="6" fill="white" font-family="Inter" font-weight="600">itel</text>
          <circle cx="35" cy="108" r="4" fill="#333"/>
        </svg>
      </div>
    </div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-spec">${p.spec}</div>
      <div class="product-rating">
        <span class="stars">${renderStars(p.rating)}</span>
        <span>(${p.reviews})</span>
      </div>
      <div class="product-price-row">
        <div>
          <div class="price-main">${p.price}</div>
          <div class="price-old">${p.old}</div>
        </div>
        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${p.name}')">
          <i class="fas fa-cart-plus"></i> Add
        </button>
      </div>
    </div>
  </div>`;
}

// Render featured
const fg = document.getElementById('featuredGrid');
products.forEach((p, i) => { fg.innerHTML += createPhoneCard(p, i); });

// Render deals (first 4)
const dg = document.getElementById('dealsGrid');
products.slice(0,4).forEach((p, i) => { dg.innerHTML += createPhoneCard(p, i+4); });

// Render new arrivals
const ng = document.getElementById('newGrid');
newProducts.forEach((p, i) => { ng.innerHTML += createPhoneCard(p, i+2); });

// ===== CART =====
let cartCount = 0;
function addToCart(name) {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  document.getElementById('toastMsg').textContent = name + ' added to cart!';
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== SLIDER =====
let current = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
function goSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function nextSlide() { goSlide(current + 1); }
function prevSlide() { goSlide(current - 1); }
setInterval(nextSlide, 4000);

// ===== COUNTDOWN =====
function startCountdown(h, m, s) {
  let total = h*3600 + m*60 + s;
  setInterval(() => {
    if(total <= 0) return;
    total--;
    const hh = Math.floor(total/3600);
    const mm = Math.floor((total%3600)/60);
    const ss = total % 60;
    document.getElementById('hours').textContent = String(hh).padStart(2,'0');
    document.getElementById('mins').textContent = String(mm).padStart(2,'0');
    document.getElementById('secs').textContent = String(ss).padStart(2,'0');
  }, 1000);
}
startCountdown(8, 45, 32);
