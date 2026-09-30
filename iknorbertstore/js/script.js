// ===================================================================
// Home page only (index.html). Shared code lives in data.js / common.js
// ===================================================================

// Featured phones (first 10 smartphones)
const phones = PRODUCTS.filter(p => p.cat === "smartphones");
document.getElementById("featuredGrid").innerHTML =
  phones.slice(0, 10).map((p, i) => createProductCard(p, i)).join("");

// Deals of the day (4 biggest discounts)
const topDeals = PRODUCTS.slice().sort((a, b) => discountPct(b) - discountPct(a)).slice(0, 4);
document.getElementById("dealsGrid").innerHTML =
  topDeals.map((p, i) => createProductCard(p, i + 4)).join("");

// New arrivals (first 5 products tagged New)
document.getElementById("newGrid").innerHTML =
  PRODUCTS.filter(p => p.badge === "New").slice(0, 5).map((p, i) => createProductCard(p, i + 2)).join("");

// Shop-by-category tiles
document.getElementById("catGrid").innerHTML =
  CATEGORIES.slice(0, 6).map(c => `
    <a class="cat-card" href="${c.file}">
      <div class="cat-icon"><i class="fas ${c.icon}"></i></div>
      <div class="cat-label">${c.title}</div>
    </a>`).join("");

// Hero slider
let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
function goSlide(n) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (n + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}
function nextSlide() { goSlide(current + 1); }
function prevSlide() { goSlide(current - 1); }
setInterval(nextSlide, 4000);

startCountdown(8, 45, 32);
