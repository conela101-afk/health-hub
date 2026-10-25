// Browser check for the new Home (Four doors PR 2). Serves the repo on localhost and asserts, in headless
// Chromium: the order of the sections, the four door tiles and their targets, that the header search box is
// hidden on Home and shown elsewhere, that the Home search form and the header box both reach results,
// that page results name their door, that the curated phrases find the right page, that Ask CI is nowhere
// on Home or a hub, that nothing leaves the origin and that nothing overflows at 320px.
// Needs Playwright (not installed in CI, so it exits 0 with a notice when missing). Run: node scripts/test-home.js
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { console.log("skip  Playwright not installed"); process.exit(0); }
const root = path.join(__dirname, "..");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
let failed = 0;
const check = (name, ok, extra) => { if (!ok) failed++; console.log(ok ? "ok  " : "FAIL", name, ok ? "" : "- " + extra); };

(async () => {
  await new Promise(r => server.listen(0, r));
  const origin = "http://localhost:" + server.address().port, base = origin + "/";
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  const problems = [], outside = [];
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") problems.push(m.text()); });
  page.on("pageerror", e => problems.push(e.message));
  page.on("request", r => { if (!r.url().startsWith(origin) && !r.url().startsWith("data:")) outside.push(r.url()); });
  const go = async h => { await page.goto(base + h); await page.waitForTimeout(300); };

  await go("#/");
  // Order, top to bottom: emergency strip, search, "Or browse everything", then the tiles.
  const order = await page.evaluate(() => {
    const y = sel => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top) : null; };
    return { crisis: y(".crisis-banner"), search: y("#homeSearchForm"), browse: y(".home-browse-title"), tiles: y(".door-tiles") };
  });
  check("Home order: emergency strip, search, browse heading, tiles", order.crisis < order.search && order.search < order.browse && order.browse < order.tiles, JSON.stringify(order));
  // Elaine's 25 Oct decision: the emergency line shows without opening the banner.
  check("\"Emergency: call 999 or 112\" is visible on the closed banner", await page.isVisible(".crisis-banner .emergency-line") && (await page.textContent(".crisis-banner .emergency-line")).trim() === "Emergency: call 999 or 112" && !(await page.$eval(".crisis-banner", e => e.open)), "");
  check("the rest of the banner is still collapsed until tapped", !(await page.isVisible(".crisis-banner .crisis-contacts")), "");
  check("crisis banner links to Crisis support", await page.$('.crisis-banner a[href="#/specialty/crisis"]') !== null, "");
  const tiles = await page.$$eval(".door-tile", t => t.map(x => [x.getAttribute("href"), x.querySelector("strong").textContent, x.querySelector("span").textContent.length > 0, Math.round(x.getBoundingClientRect().height)]));
  check("four door tiles with one-line descriptions", tiles.length === 4 && tiles.every(t => t[2] && t[3] >= 48), JSON.stringify(tiles));
  check("tiles go to the four hubs", tiles.map(t => t[0]).join() === "#/find,#/rights-hub,#/act,#/support", tiles.map(t => t[0]).join());
  const bottom = await page.$eval(".door-tiles", e => Math.round(e.getBoundingClientRect().bottom));
  check("tiles are above the fold at 390x800", bottom <= 800, "bottom=" + bottom);
  check("Home sections, in order", await page.$$eval("#app > *", c => c.map(x => x.className || x.tagName).join()) === "sr-only,home-emergency,home-search,home-browse-title,door-tiles,quick-links", "");
  const pills = await page.$$eval(".quick-links a.pill", a => a.map(x => [x.getAttribute("href"), x.textContent.trim()]));
  check("Often searched pills: autism and ADHD, parents, feeding", JSON.stringify(pills) === JSON.stringify([["#/specialty/neurodiversity", "Autism & ADHD support"], ["#/specialty/parenting", "New & Expectant Parents"], ["#/specialty/feeding", "Infant feeding & breastfeeding support"]]), JSON.stringify(pills));
  const pillsTop = await page.$eval(".quick-links", e => Math.round(e.getBoundingClientRect().top));
  const tabTop = await page.$eval("#tabbar", e => Math.round(e.getBoundingClientRect().top));
  check("Often searched row is below the four doors, hidden behind the tab bar at 390x800 (not above the fold)", pillsTop > bottom && pillsTop >= tabTop, "top=" + pillsTop + " tiles bottom=" + bottom + " tab bar top=" + tabTop);
  check("header search box is hidden on Home", !(await page.isVisible("#searchBar")), "");
  check("Home has no AskCI", !/askci|chatbot/i.test(await page.content()), "");
  check("bottom tabs unchanged, Home current", JSON.stringify(await page.$$eval("#tabbar a", a => a.map(x => [x.textContent.trim(), x.getAttribute("aria-current")]))) === '[["Home","page"],["Specialty",null],["Area",null],["Advocacy",null]]', "");
  check("Calm and Exit are visible on Home", await page.isVisible("#simpleModeBtn") && await page.isVisible("#quickExitBtn"), "");

  // Home search form: label, Enter, results with page name and door.
  check("search input has a real label", await page.$eval("label[for=homeSearchInput]", l => l.textContent.length > 0), "");
  await page.fill("#homeSearchInput", "records"); await page.press("#homeSearchInput", "Enter"); await page.waitForTimeout(400);
  check("Home search goes to results", (await page.evaluate(() => location.hash)).startsWith("#/search/"), "");
  check("header search box is visible away from Home", await page.isVisible("#searchBar"), "");
  const rows = await page.$$eval(".simple-list .row", r => r.map(x => x.textContent.replace(/\s+/g, " ").trim()));
  check("page result names its door", rows.some(r => /Records-request builder.*Take action/.test(r)), JSON.stringify(rows.slice(0, 4)));

  // Curated phrases land on the intended page, with its door.
  for (const [q, name, door] of [["see my notes", "Records-request builder", "Take action"], ["scan cancelled", "While you wait", "Take action"], ["what will I pay", "What you pay", "What applies to you"]]) {
    await go("#/"); await page.fill("#homeSearchInput", q); await page.press("#homeSearchInput", "Enter"); await page.waitForTimeout(400);
    const r = await page.$$eval(".simple-list .row", r => r.map(x => x.textContent.replace(/\s+/g, " ").trim()));
    check(`phrase "${q}" finds ${name} under ${door}`, r.some(t => t.includes(name) && t.includes(door)), JSON.stringify(r.slice(0, 4)));
  }
  // An empty submit does nothing; the header box still works as you type.
  await go("#/"); await page.press("#homeSearchInput", "Enter"); await page.waitForTimeout(200);
  check("empty submit stays on Home", await page.evaluate(() => location.hash) === "#/" || await page.evaluate(() => location.hash) === "", "");
  await go("#/find"); await page.fill("#searchInput", "knee"); await page.waitForTimeout(450);
  check("header search box still searches as you type", (await page.evaluate(() => location.hash)).startsWith("#/search/"), "");

  // Hubs and the guided paths carry no Ask CI.
  for (const h of ["#/find", "#/rights-hub", "#/act", "#/support"]) { await go(h); check(`${h} has no AskCI`, !/askci|chatbot/i.test(await page.content()), ""); }

  // 320px and Calm mode.
  await page.setViewportSize({ width: 320, height: 700 }); await go("#/");
  check("no horizontal overflow at 320px", !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "");
  await page.click("#simpleModeBtn"); await page.waitForTimeout(150);
  check("no overflow at 320px in Calm mode", !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "");
  check("tiles still reachable in Calm mode", await page.$$eval(".door-tile", t => t.length) === 4, "");

  check("no console errors or warnings", problems.length === 0, JSON.stringify(problems));
  check("no requests outside the site", outside.length === 0, JSON.stringify(outside));
  await browser.close(); server.close();
  if (failed) { console.log(failed + " check(s) failed"); process.exit(1); }
  console.log("all checks passed");
})();
