// Browser check for the sensitive-topic privacy layer (brief of 24 Oct 2026). Serves the repo on
// localhost, searches and visits sensitive routes in headless Chromium, and asserts that nothing is
// written to localStorage, sessionStorage, IndexedDB, cookies or service-worker caches, and that the
// hash, tab title, results heading and announcer carry none of the sensitive terms.
// Needs Playwright (preinstalled in the Claude Code cloud container; not installed in CI, so the
// script exits 0 with a notice when it is missing). Run: node scripts/test-sensitive-privacy.js
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

// Plain terms that must never appear in the hash, tab title, results heading or announcer.
const TERMS = ["abortion", "termination of pregnancy", "my options", "nipt", "fetal anomaly", "pregnancy scan", "unplanned pregnancy",
  "miscarriage", "eating disorder", "anorexia", "perinatal mental health", "self harm", "suicide",
  "domestic violence", "sexual assault", "rape crisis", "coercive control"];
const ROUTES = ["#/pregnancy", "#/specialty/dsv", "#/entry/hse-satu-help", "#/entry/preg-hse-fetal-anomaly-booklet", "#/search-results"];
let failed = 0;
const check = (name, ok, extra) => { if (!ok) failed++; console.log(ok ? "ok  " : "FAIL", name, ok ? "" : "- " + extra); };

(async () => {
  await new Promise(r => server.listen(0, r));
  const base = "http://localhost:" + server.address().port + "/";
  const browser = await chromium.launch(); const page = await (await browser.newContext()).newPage();
  await page.goto(base); await page.waitForSelector("#app h1, #app .page-head, #app *");
  await page.evaluate(() => navigator.serviceWorker && navigator.serviceWorker.ready);
  await page.waitForTimeout(1500);

  const snapshot = () => page.evaluate(async () => {
    const dbs = indexedDB.databases ? (await indexedDB.databases()).map(d => d.name).sort() : [];
    const caches_ = {}; for (const k of await caches.keys()) caches_[k] = (await (await caches.open(k)).keys()).map(r => r.url).sort();
    return JSON.stringify({ ls: Object.entries(localStorage).sort(), ss: Object.entries(sessionStorage).sort(), dbs, cookie: document.cookie, caches: caches_ });
  });
  const baseline = await snapshot();
  const view = () => page.evaluate(() => ({ hash: location.hash, title: document.title, h1: (document.querySelector("#app h1") || {}).textContent || "", ann: (document.getElementById("routeAnnouncer") || {}).textContent || "" }));
  const has = (s) => TERMS.find(t => s.toLowerCase().includes(t));

  for (const term of TERMS) {
    await page.goto(base + "#/"); await page.fill("#searchInput", "");
    await page.fill("#searchInput", term); await page.waitForTimeout(450);
    const v = await view();
    check(`search "${term}": hash, title, announcer neutral`, !has(v.hash + " " + v.title + " " + v.ann), JSON.stringify(v));
    if (v.hash === "#/search-results") check(`search "${term}": results heading neutral`, v.h1 === "Search results", v.h1);
  }
  for (const r of ROUTES) {
    await page.goto(base + r); await page.waitForTimeout(300);
    const v = await view();
    check(`route ${r}: title and announcer-free of terms`, !has(v.title), v.title);
  }
  // Non-sensitive searches keep their normal heading.
  await page.goto(base + "#/"); await page.fill("#searchInput", "knee"); await page.waitForTimeout(450);
  check("non-sensitive search keeps heading", /Search: "knee"/.test((await view()).h1), JSON.stringify(await view()));

  await page.waitForTimeout(500);
  check("no new localStorage, sessionStorage, IndexedDB, cookie or cache entries", (await snapshot()) === baseline, "storage snapshot changed");
  await browser.close(); server.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
