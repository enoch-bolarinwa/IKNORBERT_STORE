# IknorbertStore

Itel-focused e-commerce storefront — static front end, dynamic via JavaScript
(no backend/server required to browse; cart is saved in the browser).

## Pages
- `index.html`          – Home (hero slider, featured/new/deals sections)
- `smartphones.html`, `tablets.html`, `smart-tvs.html`, `power-banks.html`,
  `earphones.html`, `laptops.html`, `feature-phones.html` – single-category pages
- `accessories.html`    – combined: chargers, cases, watches (with filter chips)
- `chargers.html`, `smart-watches.html`, `phone-cases.html` – sidebar links into
  the Accessories filters, shown as their own pages too
- `deals.html`          – every discounted product + countdown timer
- `new-arrivals.html`   – products tagged "New"
- `search.html`         – header search results (by keyword and/or category)
- `cart.html`           – cart contents, quantity controls, WhatsApp checkout
- `about.html`          – company info
- `contact.html`        – contact form + all store locations

## Structure
- `css/style.css`   – original site styling (layout, colors, components)
- `css/pages.css`   – styling added for the new inner pages (banners, catalog
  grid/filters, cart, about, contact)
- `js/data.js`      – all product, category and store data in one place.
  **Phone/tablet prices are the ones from the original design.** Prices and
  names for TVs, power banks, earphones, chargers, watches, laptops, cases and
  feature phones are SAMPLE data — edit the `RAW_PRODUCTS` array to match your
  real stock and prices.
- `js/common.js`    – shared header/nav/footer, the cart (saved in
  `localStorage`), product card rendering, countdown timer
- `js/catalog.js`   – powers every category/deals/new-arrivals/search page
  (filtering, sorting, category chips)
- `js/cart.js`      – cart page logic
- `js/script.js`    – home-page-only logic (slider, section grids)

## How the cart works
Cart items are stored in the browser's `localStorage`, so they persist as a
visitor moves between pages. There's no payment processing — the cart page has
an "Order on WhatsApp" button that opens WhatsApp with the order pre-filled,
and the store's WhatsApp number is set once in `js/data.js`
(`STORE_WHATSAPP`).

## Run
Open `index.html` in a browser. Needs internet access for Google Fonts and
Font Awesome (loaded from their CDNs) — everything else is self-contained.

## Customize
- Store phone numbers, email, WhatsApp number, head-office address: edit the
  top of `js/data.js` and the office list in `STORES`.
- Products/prices: edit `RAW_PRODUCTS` in `js/data.js`.
- Nav menu / category list: edit `NAV` and `CATEGORIES` in `js/common.js` and
  `js/data.js`.
