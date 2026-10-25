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
    return { crisis: y(".crisis-banner"), start: y(".home-start"), search: y("#homeSearchForm"), browse: y(".home-browse-title"), tiles: y(".door-tiles") };
  });
  check("Home order: emergency strip, Where do I start?, search, browse heading, tiles", order.crisis < order.start && order.start < order.search && order.search < order.browse && order.browse < order.tiles, JSON.stringify(order));
  check("Where do I start? row goes to #/start and is at least 48px high", await page.$eval(".home-start", e => e.getAttribute("href") === "#/start" && e.getBoundingClientRect().height >= 48), "");
  // Elaine's 25 Oct decision: the emergency line shows without opening the banner.
  check("\"Emergency: call 999 or 112\" is visible on the closed banner", await page.isVisible(".crisis-banner .emergency-line") && (await page.textContent(".crisis-banner .emergency-line")).trim() === "Emergency: call 999 or 112" && !(await page.$eval(".crisis-banner", e => e.open)), "");
  check("the rest of the banner is still collapsed until tapped", !(await page.isVisible(".crisis-banner .crisis-contacts")), "");
  check("crisis banner links to Crisis support", await page.$('.crisis-banner a[href="#/specialty/crisis"]') !== null, "");
  const tiles = await page.$$eval(".door-tile", t => t.map(x => [x.getAttribute("href"), x.querySelector("strong").textContent, x.querySelector("span").textContent.length > 0, Math.round(x.getBoundingClientRect().height)]));
  check("four door tiles with one-line descriptions", tiles.length === 4 && tiles.every(t => t[2] && t[3] >= 48), JSON.stringify(tiles));
  check("tiles go to the four hubs", tiles.map(t => t[0]).join() === "#/find,#/rights-hub,#/act,#/support", tiles.map(t => t[0]).join());
  // The emergency banners keep their wording, so on a 800px-high phone the second row of tiles sits partly
  // behind the tab bar; on an 844px-high phone all four tiles fit. Both are checked.
  const tabTop800 = await page.$eval("#tabbar", e => Math.round(e.getBoundingClientRect().top));
  const firstRowBottom = await page.$eval(".door-tile", e => Math.round(e.getBoundingClientRect().bottom));
  check("first row of tiles is fully visible at 390x800", firstRowBottom <= tabTop800, `bottom=${firstRowBottom} tab bar top=${tabTop800}`);
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(150);
  const bottom = await page.$eval(".door-tiles", e => Math.round(e.getBoundingClientRect().bottom));
  const tabTop = await page.$eval("#tabbar", e => Math.round(e.getBoundingClientRect().top));
  check("all four tiles are above the fold at 390x844", bottom <= tabTop, `bottom=${bottom} tab bar top=${tabTop}`);
  check("Home sections, in order", await page.$$eval("#app > *", c => c.map(x => x.className || x.tagName).join()) === "sr-only,home-emergency,home-start,home-search,home-browse-title,door-tiles,quick-links", "");
  const pills = await page.$$eval(".quick-links a.pill", a => a.map(x => [x.getAttribute("href"), x.textContent.trim()]));
  check("Often searched pills: autism and ADHD, parents, feeding", JSON.stringify(pills) === JSON.stringify([["#/specialty/neurodiversity", "Autism & ADHD support"], ["#/specialty/parenting", "New & Expectant Parents"], ["#/specialty/feeding", "Infant feeding & breastfeeding support"]]), JSON.stringify(pills));
  const pillsTop = await page.$eval(".quick-links", e => Math.round(e.getBoundingClientRect().top));
  check("Often searched row is below the four doors, hidden behind the tab bar at 390x844 (not above the fold)", pillsTop > bottom && pillsTop >= tabTop, "top=" + pillsTop + " tiles bottom=" + bottom + " tab bar top=" + tabTop);
  check("header search box is hidden on Home", !(await page.isVisible("#searchBar")), "");
  check("Home has no AskCI", !/askci|chatbot/i.test(await page.content()), "");
  check("bottom tabs unchanged, Home current", JSON.stringify(await page.$$eval("#tabbar a", a => a.map(x => [x.textContent.trim(), x.getAttribute("aria-current")]))) === '[["Home","page"],["Specialty",null],["Area",null],["Advocacy",null]]', "");
  const footerLink = await page.$eval('footer a[href*="forms.gle"]', e => e.textContent.replace(/\s+/g, " ").trim());
  check("footer feedback link says \"new tab\" once, not twice", (footerLink.match(/new tab/gi) || []).length === 1, footerLink);
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

  // Where do I start? (#/start): the Home row opens it, two questions, one next step, nothing stored.
  await go("#/"); await page.click(".home-start"); await page.waitForTimeout(250);
  check("Home row opens the Where do I start? page", (await page.evaluate(() => location.hash)) === "#/start" && (await page.textContent("h1")) === "Where do I start?", "");
  check("two questions, each a fieldset with a legend and real labels", await page.$$eval("fieldset legend", l => l.length) === 2 && await page.$$eval("label.start-option input[type=radio]", i => i.length) === 10, "");
  check("every option is at least 48px high", await page.$$eval(".start-option", o => o.every(x => x.getBoundingClientRect().height >= 48)), "");
  await page.click(".start-submit"); await page.waitForTimeout(150);
  check("submitting with nothing chosen shows an error and no result", await page.isVisible("#startError") && (await page.$eval("#startResult", e => e.children.length)) === 0, "");
  await page.check("input[name=topic][value=complain]"); await page.click(".start-submit"); await page.waitForTimeout(150);
  check("one question answered shows which is missing", /where you live/.test(await page.textContent("#startError")), "");
  await page.check("input[name=region][value=roi]"); await page.click(".start-submit"); await page.waitForTimeout(200);
  const roi = await page.$$eval("#startResult a.row", a => a.map(x => x.getAttribute("href")));
  check("result: one primary step, then at most two Also useful", roi[0] === "#/tools/complaints" && roi.length >= 2 && roi.length <= 3, JSON.stringify(roi));
  check("result heading takes focus and the address does not change", (await page.evaluate(() => document.activeElement.id)) === "startResultHeading" && (await page.evaluate(() => location.hash)) === "#/start", "");
  check("nothing stored by choosing", await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length) === 0, "");
  await page.click("#startAgain"); await page.waitForTimeout(100);
  check("Start again clears the choices and the result", (await page.$$eval("input:checked", i => i.length)) === 0 && (await page.$eval("#startResult", e => e.children.length)) === 0, "");
  // Every topic, both locations: nothing Republic-of-Ireland-only in a Northern Ireland result.
  const roiOnly = ["#/tools/aon", "#/rights/disability-children", "#/guide/after-a-death", "#/pregnancy", "#/about/screening"];
  const topics = await page.$$eval("input[name=topic]", i => i.map(x => x.value));
  let niLeak = [], over = [], formStillShown = [], wrongHeading = [];
  for (const t of topics) for (const r of ["roi", "ni"]) {
    await page.check(`input[name=topic][value=${t}]`); await page.check(`input[name=region][value=${r}]`); await page.click(".start-submit");
    const hrefs = await page.$$eval("#startResult a.row", a => a.map(x => x.getAttribute("href")));
    if (hrefs.length > 3) over.push(t + "/" + r);
    if (r === "ni") hrefs.forEach(h => { if (roiOnly.includes(h)) niLeak.push(t + " " + h); });
    if (await page.isVisible("#startForm")) formStillShown.push(t + "/" + r);
    const heading = (await page.textContent("#startResultHeading")).trim();
    const want = (t === "aon" && r === "ni") ? "Other pages that may help" : "Your next step";
    if (heading !== want) wrongHeading.push(`${t}/${r}: "${heading}"`);
    await page.click("#startAgain");
  }
  check("result heading is \"Your next step\" for all results except Northern Ireland + Assessment of Need, which reads \"Other pages that may help\"", wrongHeading.length === 0, wrongHeading.join("; "));
  check("every result is its own screen (the questions are hidden until Start again)", formStillShown.length === 0, formStillShown.join());
  check("16 combinations: no more than one step and two Also useful", over.length === 0, over.join());
  check("16 combinations: no Republic of Ireland page in a Northern Ireland result", niLeak.length === 0, niLeak.join());
  await page.check("input[name=topic][value=aon]"); await page.check("input[name=region][value=ni]"); await page.click(".start-submit");
  const niText = (await page.textContent("#startResult")).replace(/\s+/g, " ");
  check("Assessment of Need in Northern Ireland: the approved message, no primary step", niText.includes("The Assessment of Need is a Republic of Ireland process, so we don't have a step for it here. These pages cover Northern Ireland too:") && (await page.$("#startResult .start-primary")) === null, niText);
  check("...followed by Who to contact and Support organisations only", JSON.stringify(await page.$$eval("#startResult a.row", a => a.map(x => x.getAttribute("href")))) === '["#/advocacy/contacts","#/advocacy/orgs"]', "");
  await page.click("#startAgain");
  check("the Assessment of Need topic reads \"My child needs a disability assessment (Assessment of Need)\" with the Republic of Ireland only hint", await page.$$eval("label.start-option", l => l.some(x => x.textContent.replace(/\s+/g, " ").includes("My child needs a disability assessment (Assessment of Need)") && x.textContent.includes("(Republic of Ireland only)"))), "");
  // The emergency line and Crisis support stay in view on the questions and on every result screen,
  // with the crisis banner closed and open.
  const emergencyOk = async (needInView = true) => {
    const line = await page.$(".start-emergency .emergency-line");
    if (!line || !(await line.isVisible()) || (await line.textContent()).trim() !== "Emergency: call 999 or 112") return "emergency line missing or wrong";
    const inView = await page.evaluate(() => { const r = document.querySelector(".start-emergency .emergency-line").getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
    if (needInView && !inView) return "emergency line not in the viewport";
    const q = await page.$("a.crisis-quicklink");
    if (!q || !(await q.isVisible()) || (await q.getAttribute("href")) !== "#/specialty/crisis" || (await q.textContent()).trim() !== "Crisis support") return "Crisis support link missing";
    return "";
  };
  for (const state of ["closed", "open"]) {
    await go("#/start");
    if (state === "open") await page.click(".start-emergency .crisis-banner summary");
    const isOpen = await page.$eval(".start-emergency .crisis-banner", e => e.open);
    check(`#/start: banner ${state} as expected`, isOpen === (state === "open"), "");
    const problems2 = [];
    let m = await emergencyOk(); if (m) problems2.push("questions: " + m);
    await page.click(".start-submit"); m = await emergencyOk(false); if (m) problems2.push("error state: " + m);   // the page may be scrolled down at this point
    for (const t of topics) for (const r of ["roi", "ni"]) {
      await page.check(`input[name=topic][value=${t}]`); await page.check(`input[name=region][value=${r}]`); await page.click(".start-submit");
      m = await emergencyOk(); if (m) problems2.push(`${t}/${r}: ${m}`);
      if (state === "open") {
        const more = await page.isVisible('.start-emergency a[href="#/specialty/crisis"]') && (await page.textContent(".start-emergency .crisis-contacts")).includes("999 / 112");
        if (!more) problems2.push(`${t}/${r}: open banner does not show the helplines and the Crisis support link`);
      }
      await page.click("#startAgain");
    }
    check(`#/start and all 16 result screens: emergency line and Crisis support visible, banner ${state}`, problems2.length === 0, problems2.join("; "));
  }
  await go("#/start"); await page.check("input[name=topic][value=aon]"); await page.check("input[name=region][value=ni]"); await page.click(".start-submit");
  check("notice wording is the approved text", (await page.textContent(".checked-note")).trim() === "This only points you to other pages. It doesn't ask about your health, give advice or save anything.", "");
  await page.click("#startToSearch"); check("\"use the search box\" moves focus to the search box", (await page.evaluate(() => document.activeElement.id)) === "searchInput", "");
  check("out-of-hours link is on the page", await page.$('main a[href="#/out-of-hours"]') !== null, "");
  check("#/start has no AskCI", !/askci|chatbot/i.test(await page.content()), "");
  await go("#/search/zzzzqq"); check("empty search links to Where do I start?", await page.$('.empty-state a[href="#/start"]') !== null, "");

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
