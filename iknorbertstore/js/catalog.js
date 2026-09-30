// ===================================================================
// Catalog pages: category pages, Accessories, Deals, New Arrivals, Search
// Behaviour is driven by data-attributes on <body> (see each HTML page).
// ===================================================================
(function () {
  const body = document.body;
  const mode = body.dataset.mode || "category";           // category | deals | new | search
  const cats = (body.dataset.cats || "").split(",").filter(Boolean);
  let title = body.dataset.title || "Products";
  let desc = body.dataset.desc || "";
  let baseList = PRODUCTS.slice();

  if (mode === "category") {
    baseList = PRODUCTS.filter(p => cats.includes(p.cat));
  } else if (mode === "deals") {
    baseList = PRODUCTS.filter(p => p.old > p.price);
  } else if (mode === "new") {
    baseList = PRODUCTS.filter(p => p.badge === "New");
  } else if (mode === "search") {
    const params = new URLSearchParams(location.search);
    const q = (params.get("q") || "").trim().toLowerCase();
    const cat = params.get("cat") || "";
    const allowed = cat ? (CATEGORY_GROUPS[cat] || [cat]) : null;
    baseList = PRODUCTS.filter(p => {
      const inCat = !allowed || allowed.includes(p.cat);
      const hay = (p.name + " " + p.spec + " " + (catBySlug(p.cat) || {}).title).toLowerCase();
      return inCat && (!q || q.split(/\s+/).every(w => hay.includes(w)));
    });
    title = q ? `Search results for “${params.get("q")}”` : "All Products";
    desc = `${baseList.length} product${baseList.length === 1 ? "" : "s"} found`;
  }

  // ---- banner ----
  const banner = document.getElementById("pageBanner");
  banner.innerHTML = `
    <div class="container">
      <div class="breadcrumb"><a href="index.html">Home</a> <i class="fas fa-chevron-right"></i> <span>${title}</span></div>
      <h1>${title}</h1>
      <p>${desc}</p>
    </div>`;

  // ---- deals countdown banner ----
  if (mode === "deals") {
    document.getElementById("dealsTimer").innerHTML = `
      <div class="deals-header page-deals">
        <div class="deals-title"><i class="fas fa-bolt"></i> Flash Sales – Up to ${Math.max(...baseList.map(discountPct))}% off</div>
        <div class="countdown">Ends in:
          <div class="countdown-block" id="hours">08</div><span class="countdown-sep">:</span>
          <div class="countdown-block" id="mins">45</div><span class="countdown-sep">:</span>
          <div class="countdown-block" id="secs">32</div>
        </div>
      </div>`;
    startCountdown(8, 45, 32);
  }

  // ---- sidebar: category links ----
  const side = document.getElementById("catSidebar");
  side.innerHTML = `<div class="side-cat-header"><i class="fas fa-th-large"></i>&nbsp; Categories</div>` +
    CATEGORIES.map(c => `<a class="side-cat-item ${cats.length === 1 && cats[0] === c.slug ? "current" : ""}" href="${c.file}"><span>${c.emoji} ${c.side}</span><i class="fas fa-chevron-right"></i></a>`).join("");

  // ---- filter chips (only when the page spans several categories) ----
  const chipsEl = document.getElementById("catChips");
  let activeCat = "all";
  const chipCats = mode === "category" && cats.length > 1 ? cats
                 : (mode === "deals" || mode === "new" || mode === "search") ? [...new Set(baseList.map(p => p.cat))] : [];
  if (chipCats.length > 1) {
    chipsEl.innerHTML = `<button class="chip active" data-cat="all">All</button>` +
      chipCats.map(s => `<button class="chip" data-cat="${s}">${catBySlug(s).title}</button>`).join("");
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      activeCat = b.dataset.cat;
      chipsEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
      render();
    });
  }

  // ---- toolbar ----
  const priceSel = document.getElementById("priceFilter");
  const sortSel = document.getElementById("sortBy");
  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("resultCount");
  if (mode === "deals") sortSel.value = "discount";

  function render() {
    let list = baseList.slice();
    if (activeCat !== "all") list = list.filter(p => p.cat === activeCat);

    const [min, max] = priceSel.value.split("-").map(Number);
    list = list.filter(p => p.price >= min && p.price <= max);

    switch (sortSel.value) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "discount":   list.sort((a, b) => discountPct(b) - discountPct(a)); break;
      case "popular":    list.sort((a, b) => b.reviews - a.reviews); break;
    }

    countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length
      ? list.map((p, i) => createProductCard(p, i)).join("")
      : `<div class="empty-state"><i class="fas fa-box-open"></i><h3>No products found</h3><p>Try a different price range or category.</p><a href="search.html" class="btn-red">Browse all products</a></div>`;
  }
  priceSel.addEventListener("change", render);
  sortSel.addEventListener("change", render);
  render();
})();
