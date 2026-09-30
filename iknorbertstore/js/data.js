// ===================================================================
// IknorbertStore – shared data (categories, products, store offices)
// NOTE: Phone/tablet prices come from the original site. Products in the
// other categories (TVs, power banks, earphones, etc.) are SAMPLE data –
// replace names, specs and prices with your real stock.
// ===================================================================

const STORE_WHATSAPP = "2348129963217";   // used by the cart "Order on WhatsApp" button
const STORE_EMAIL = "info@iknorbertstore.com";
const FREE_DELIVERY_ABOVE = 50000;

const CATEGORIES = [
  { slug:"smartphones",   file:"smartphones.html",   title:"Smartphones",       side:"Smartphones",       emoji:"📱", icon:"fa-mobile-alt",   desc:"Authentic itel smartphones with official Nigeria warranty." },
  { slug:"tablets",       file:"tablets.html",       title:"Tablets",           side:"Tablets & Pads",    emoji:"📟", icon:"fa-tablet-alt",   desc:"Big screens and long battery life for study, work and play." },
  { slug:"smart-tvs",     file:"smart-tvs.html",     title:"Smart TVs",         side:"Smart TVs",         emoji:"📺", icon:"fa-tv",           desc:"HD, Full HD and 4K smart TVs for every room." },
  { slug:"power-banks",   file:"power-banks.html",   title:"Power Banks",       side:"Power Banks",       emoji:"🔋", icon:"fa-battery-full", desc:"Never run out of power – fast-charge power banks." },
  { slug:"earphones",     file:"earphones.html",     title:"Earphones & Buds",  side:"Earphones & Buds",  emoji:"🎧", icon:"fa-headphones",   desc:"Wireless buds, neckbands and wired earphones." },
  { slug:"chargers",      file:"chargers.html",      title:"Chargers & Cables", side:"Chargers & Cables", emoji:"🔌", icon:"fa-plug",         desc:"Fast chargers, cables and charging accessories." },
  { slug:"watches",       file:"smart-watches.html", title:"Smart Watches",     side:"Smart Watches",     emoji:"⌚", icon:"fa-clock",        desc:"Track your day with itel smart watches." },
  { slug:"laptops",       file:"laptops.html",       title:"Laptops",           side:"Laptops",           emoji:"🖥️", icon:"fa-laptop",       desc:"Lightweight laptops for school and office." },
  { slug:"cases",         file:"phone-cases.html",   title:"Phone Cases",       side:"Phone Cases",       emoji:"🛡️", icon:"fa-shield-alt",   desc:"Cases and screen protectors to keep your phone safe." },
  { slug:"feature-phones",file:"feature-phones.html",title:"Feature Phones",    side:"Feature Phones",    emoji:"🔦", icon:"fa-phone-alt",    desc:"Simple, tough phones with days of battery life." },
];

// Groups used by the Accessories page and the header search dropdown
const CATEGORY_GROUPS = {
  accessories: ["chargers","cases","watches"],
};

// badge -> css class
const BADGE = { New:"badge-new", Hot:"badge-hot", Sale:"badge-sale" };

// [id, category, name, spec, price, old price, badge, rating, reviews]
const RAW_PRODUCTS = [
  // ---- Smartphones (from original site) ----
  [1,"smartphones","itel S25 Ultra","8GB RAM · 256GB · 50MP · Android 14",235000,260000,"New",4.8,124],
  [2,"smartphones","itel Power 70","16GB RAM · 128GB · 10,000mAh Battery",124900,140000,"Hot",4.7,89],
  [3,"smartphones","itel S24","8GB RAM · 256GB · 108MP Camera",181000,200000,"Sale",4.6,201],
  [4,"smartphones","itel A90","4GB RAM · 128GB · 5000mAh · 4G",135000,150000,"New",4.5,67],
  [5,"smartphones","itel P65","6GB RAM · 128GB · 6000mAh Battery",129900,155000,"Sale",4.6,145],
  [6,"smartphones","itel A80","4GB RAM · 64GB · 5000mAh · Android 13",89000,100000,"Hot",4.3,312],
  [8,"smartphones","itel A70","4GB RAM · 128GB · 5000mAh · 4G",106000,120000,"Sale",4.4,276],
  [9,"smartphones","itel Zeno 20","4GB RAM · 128GB · 5000mAh",116000,130000,"Hot",4.2,58],
  [10,"smartphones","itel A50C","3GB RAM · 64GB · 4G · Dual SIM",79000,90000,"Sale",4.1,189],
  [11,"smartphones","itel S25","8GB RAM · 128GB · AMOLED · 50MP",190000,210000,"New",4.7,32],
  [12,"smartphones","itel City 100","6GB RAM · 128GB · 6.6\" HD+",152000,170000,"New",4.5,21],
  [13,"smartphones","itel A200","4GB RAM · 64GB · 5000mAh · 4G",190000,200000,"New",4.4,15],
  [14,"smartphones","itel Zeno 10","4GB RAM · 64GB · 5000mAh",135000,145000,"New",4.3,8],
  [15,"smartphones","itel P70","16GB RAM · 6000mAh + 4000mAh case",124900,140000,"Hot",4.8,56],

  // ---- Tablets ----
  [7,"tablets","itel Pad 2","10.1\" FHD · 6GB RAM · 7000mAh",210000,240000,"New",4.5,43],
  [20,"tablets","itel Pad One","10.1\" HD · 4GB RAM · 64GB · 6000mAh",145000,165000,"Hot",4.4,37],
  [21,"tablets","itel Pad One Pro","10.1\" FHD · 8GB RAM · 128GB · 4G",185000,210000,"Sale",4.5,29],
  [22,"tablets","itel Kids Pad","8\" HD · 3GB RAM · 32GB · Kid-safe case",98000,115000,"Sale",4.2,52],
  [23,"tablets","itel Pad 3","11\" 2K · 8GB RAM · 256GB · 8000mAh",265000,295000,"New",4.7,18],

  // ---- Smart TVs ----
  [30,"smart-tvs","itel 24\" LED TV","24\" HD · HDMI · USB · Slim bezel",95000,110000,"Sale",4.1,64],
  [31,"smart-tvs","itel 32\" Smart TV","32\" HD · Android · WiFi · Bluetooth",165000,185000,"Hot",4.4,142],
  [32,"smart-tvs","itel 43\" Smart TV","43\" Full HD · Android · WiFi · Dolby Audio",285000,320000,"Sale",4.5,88],
  [33,"smart-tvs","itel 50\" 4K Smart TV","50\" 4K UHD · Android · HDR10",420000,470000,"New",4.6,41],
  [34,"smart-tvs","itel 55\" 4K Smart TV","55\" 4K UHD · Android · HDR10 · Voice remote",520000,580000,"New",4.6,27],
  [35,"smart-tvs","itel 65\" 4K Smart TV","65\" 4K UHD · Android · Dolby Vision",780000,860000,"Hot",4.7,12],

  // ---- Power banks ----
  [40,"power-banks","itel Star 100","10,000mAh · Dual USB · LED indicator",12500,15000,"Sale",4.3,210],
  [41,"power-banks","itel Star 200","20,000mAh · Dual USB · Type-C",19500,23000,"Hot",4.5,178],
  [42,"power-banks","itel Star 300","30,000mAh · 3 outputs · Type-C",27500,32000,"New",4.6,95],
  [43,"power-banks","itel Fast 22.5W","10,000mAh · 22.5W fast charge · PD",16500,19500,"Hot",4.4,132],
  [44,"power-banks","itel Slim 5000","5,000mAh · Ultra slim · Pocket size",8500,10500,"Sale",4.2,240],
  [45,"power-banks","itel Wireless Bank","10,000mAh · 15W wireless + wired",24000,28000,"New",4.4,36],

  // ---- Earphones & buds ----
  [50,"earphones","itel Buds Ace ANC","Active noise cancelling · 40hr battery",18500,22000,"New",4.6,73],
  [51,"earphones","itel Buds Pro","Bluetooth 5.3 · Touch control · 30hr",14900,18000,"Hot",4.5,164],
  [52,"earphones","itel Buds 1","Bluetooth 5.1 · Compact case · 20hr",7500,9500,"Sale",4.2,301],
  [53,"earphones","itel Neckband","Bluetooth 5.0 · Magnetic · 18hr battery",9500,12000,"Sale",4.3,118],
  [54,"earphones","itel Wired Earphones","3.5mm · In-line mic · Bass boost",3500,4500,"Sale",4.0,420],
  [55,"earphones","itel Gaming Headset","Over-ear · RGB · Detachable mic",15500,19000,"New",4.3,25],

  // ---- Chargers & cables ----
  [60,"chargers","itel 18W Fast Charger","18W · USB-A · Fast charge",4500,5500,"Sale",4.3,260],
  [61,"chargers","itel 33W Fast Charger","33W · USB-C · Includes cable",6500,8000,"Hot",4.5,190],
  [62,"chargers","itel 65W GaN Charger","65W GaN · Dual port · Laptop ready",14500,17500,"New",4.6,44],
  [63,"chargers","itel USB-C Cable","1m · Braided · 3A fast charge",2500,3200,"Sale",4.2,510],
  [64,"chargers","itel Car Charger","Dual USB · 30W · Auto protection",5500,6800,"Sale",4.1,86],
  [65,"chargers","itel Wireless Pad","15W · Qi certified · LED ring",9800,12000,"New",4.3,39],

  // ---- Smart watches ----
  [70,"watches","itel Smartwatch 1","1.8\" display · Calls · Heart-rate",22000,27000,"Sale",4.2,71],
  [71,"watches","itel Smartwatch 2ES","1.85\" HD · Bluetooth calls · 100+ modes",28000,33000,"Hot",4.4,58],
  [72,"watches","itel Watch Pro","AMOLED · GPS · 7-day battery",35000,42000,"New",4.5,26],
  [73,"watches","itel Fit Band","1.47\" · Sleep & step tracking · IP68",12500,15500,"Sale",4.1,132],

  // ---- Laptops ----
  [80,"laptops","itel Spirit 1","14.1\" FHD · 4GB RAM · 128GB SSD",195000,225000,"Sale",4.2,34],
  [81,"laptops","itel Spirit 1 Plus","14.1\" FHD · 8GB RAM · 256GB SSD",265000,300000,"Hot",4.4,29],
  [82,"laptops","itel Spirit Pro","15.6\" FHD · 16GB RAM · 512GB SSD",380000,430000,"New",4.5,14],
  [83,"laptops","itel Vista 14","14\" IPS · 8GB RAM · 512GB SSD",310000,350000,"New",4.3,11],

  // ---- Phone cases ----
  [90,"cases","S25 Ultra Silicone Case","Soft-touch · Shockproof · Camera guard",3500,4500,"New",4.3,58],
  [91,"cases","Tempered Glass Protector","9H hardness · Anti-scratch · 2-pack",2000,2800,"Hot",4.4,340],
  [92,"cases","Power 70 Armor Case","Dual-layer · Kickstand · Drop tested",4200,5200,"Sale",4.2,47],
  [93,"cases","A80 Flip Cover","PU leather · Card slot · Magnetic",3800,4800,"Sale",4.1,63],
  [94,"cases","Universal Phone Pouch","Waterproof · Touch-friendly · Lanyard",2500,3500,"Sale",4.0,122],
  [95,"cases","Phone Ring Holder","360° rotation · Kickstand · Strong grip",1500,2200,"Hot",4.3,205],

  // ---- Feature phones ----
  [100,"feature-phones","itel it2163S","Dual SIM · Torch · FM radio · 1900mAh",9500,11500,"Sale",4.2,380],
  [101,"feature-phones","itel it5026","Dual SIM · 2.4\" screen · Camera · Bluetooth",12500,14500,"Hot",4.3,265],
  [102,"feature-phones","itel Magic 2 4G","4G · WhatsApp ready · 2.8\" screen",24000,28000,"New",4.4,72],
  [103,"feature-phones","itel Tough Pro","IP-rated body · 3000mAh · Loud speaker",18500,21500,"New",4.2,41],
  [104,"feature-phones","itel it9210","4G · Wi-Fi hotspot · 2.4\" · Dual SIM",16500,19000,"Sale",4.1,96],
];

const PRODUCTS = RAW_PRODUCTS.map(r => ({
  id:r[0], cat:r[1], name:r[2], spec:r[3], price:r[4], old:r[5],
  badge:r[6], badgeClass:BADGE[r[6]] || "badge-new", rating:r[7], reviews:r[8]
}));

// Store offices (used on Home and Contact pages)
const STORES = [
  { badge:"Head Office", head:true, name:"Head Office – Ikeja", icon:"fa-building", addr:"Suites 24-26, 1st Floor, IT IS WELL Plaza,<br>17, Ola Ayeni Street, Ikeja, Lagos", tel:"08129963217 &nbsp;|&nbsp; 08129963210" },
  { badge:"Lagos", name:"Lagos Office – Computer Village", addr:"22, Awolowo Road, By Otigba Street,<br>Computer Village, Ikeja, Lagos", tel:"08129963211 &nbsp;|&nbsp; 08129963207" },
  { badge:"Lagos", name:"Ojo Alaba Office", addr:"Shop F501, Beside Union Bank,<br>Alaba Int'l Market, Ojo, Lagos", tel:"08129963225" },
  { badge:"Abuja", name:"Abuja Office", addr:"Shop GBE 4/5, New Banex Plaza, Plot 750,<br>Aminu Kano Crescent, Wuse II, Abuja", tel:"08129963214" },
  { badge:"Kano", name:"Kano Office", addr:"1st Floor, Alada Building, 13, Beirut Road,<br>By Dankoli Plaza, Kano", tel:"08129963213" },
  { badge:"Sokoto", name:"Sokoto Office", addr:"26, Fodio Road, Sokoto, Sokoto State", tel:"08129963223" },
  { badge:"Borno", name:"Maiduguri Office", addr:"Shehu Laminu Way, Opp. Zoo Park,<br>Maiduguri, Borno State", tel:"08129963204" },
  { badge:"Adamawa", name:"Adamawa Office", addr:"Ahmadu Bello Way, Opp. NSCDC,<br>Mubi, Adamawa State", tel:"08129963212" },
  { badge:"Kaduna", name:"Kaduna Office", addr:"Shop No. AFF 01, 1st Floor Bacab Plaza,<br>Adjacent Co-operative Bus, Ahmadu Bello Way, Kaduna", tel:"07038883671 &nbsp;|&nbsp; 08108945656" },
];
