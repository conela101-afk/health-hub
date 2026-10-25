// Checks the "Write to your elected representative" builder (#/advocacy/rep-letter, REP_LETTER in data.js).
// Part 1 is plain Node: the wording is neutral across parties and carries no contact detail, and the ids the page
// relies on exist. Part 2 needs Playwright (skipped, exit 0, when it is missing): the page stores nothing, loads
// nothing from outside, offers the right roles for each part of the island, names the right body in the letter,
// hides the parliamentary-question request for a councillor, and links to no outside site.
// Run: node scripts/test-rep-letter.js
const fs = require("fs"), vm = require("vm"), path = require("path"), http = require("http");
const root = path.join(__dirname, "..");
let failed = 0;
const check = (name, ok, extra) => { if (!ok) failed++; console.log(ok ? "ok  " : "FAIL", name, ok ? "" : "- " + extra); };

// ---- Part 1: the wording ----
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8") + "\nthis.R = REP_LETTER;", ctx);
const R = ctx.R;
const strings = [];
(function walk(v){ if (typeof v === "string") strings.push(v); else if (v && typeof v === "object") Object.values(v).forEach(walk); })(R);
const NAMED = /\b(fianna f[aá]il|fine gael|sinn f[eé]in|labour|green party|social democrats|people before profit|aont[uú]|independent ireland|dup|sdlp|uup|alliance party|tuv|conservatives?|reform uk|taoiseach|t[aá]naiste|first minister|deputy first minister|prime minister|campaign)\b/i;
const CONTACT = /(@|https?:|www\.|\b0\d{1,2}[ -]?\d{3}[ -]?\d{3,4}\b|\b1[58]00[ -]?\d{3}[ -]?\d{3}\b|\b[AC-FHKNPRTV-Y]\d{2} ?[0-9AC-FHKNPRTV-Y]{4}\b|€|£|\b\d+ (days|weeks|months)\b)/i;
strings.forEach(s => {
  if (NAMED.test(s)) check(`neutral wording: "${s}"`, false, "names a party, office-holder or campaign");
  if (CONTACT.test(s)) check(`no contact detail, link, fee or waiting time: "${s}"`, false, "contains one");
});
check("no party, politician or campaign is named, and no phone, email, link, fee or waiting time appears", !strings.some(s => NAMED.test(s) || CONTACT.test(s)), "");
["regions", "roles", "topics", "done", "asks"].forEach(k => {
  const ids = (R[k] || []).map(x => x.id);
  check(`${k}: present, ids unique, each has a label`, ids.length > 0 && new Set(ids).size === ids.length && R[k].every(x => x.id && x.label), "");
});
check("regions are the Republic of Ireland and Northern Ireland, each naming a body", R.regions.map(r => r.id).join() === "roi,ni" && R.regions.every(r => r.body), "");
check("every role names at least one region, all valid", R.roles.every(r => r.regions.length && r.regions.every(x => R.regions.some(g => g.id === x))), "");
check("TD and Senator are Republic of Ireland only; MLA and MP are Northern Ireland only; councillor is both", ["td", "senator"].every(i => R.roles.find(r => r.id === i).regions.join() === "roi") && ["mla", "mp"].every(i => R.roles.find(r => r.id === i).regions.join() === "ni") && R.roles.find(r => r.id === "councillor").regions.join() === "roi,ni", "");
check("a councillor is not offered the parliamentary-question request", R.roles.find(r => r.id === "councillor").asksQuestion === false && R.asks.find(a => a.needsRole === "asksQuestion"), "");
check("the first request names the body through {body}, and no other text names a body", R.asks[0].text.includes("{body}") && !strings.filter(s => s !== R.asks[0].text).some(s => /\bHSE\b|Health and Social Care/.test(s) && !R.regions.some(r => r.body === s)), "");
check("every topic has a phrase, every done and ask has text, consent is present", R.topics.every(t => t.phrase) && R.done.concat(R.asks).every(x => x.text) && R.consent, "");

// ---- Part 2: the page ----
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { chromium = null; }
(async () => {
  if (!chromium) { console.log("skip  Playwright not installed: page checks not run"); return finish(); }
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2" };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(0, r));
  const origin = "http://localhost:" + server.address().port;
  const browser = await chromium.launch(); const ctx2 = await browser.newContext({ viewport: { width: 390, height: 900 } });
  const page = await ctx2.newPage(); const problems = [], outside = [];
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") problems.push(m.text()); });
  page.on("pageerror", e => problems.push(e.message));
  page.on("request", r => { if (!r.url().startsWith(origin) && !r.url().startsWith("data:")) outside.push(r.url()); });
  await page.goto(origin + "/#/advocacy/rep-letter"); await page.waitForTimeout(500);
  const stored = () => page.evaluate(() => JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage), document.cookie]));
  const before = await stored();
  check("page opens with the right heading and a back link to Take action", (await page.textContent("h1")) === "Write to your elected representative" && await page.$('.back-link[href="#/act"]') !== null, "");
  check("before a location is chosen the role list is disabled and the letter says what to do", await page.$eval("#rlRole", e => e.disabled) && /Choose where you live/.test(await page.textContent("#rlOutput")), "");
  check("the email-app link is hidden until the letter is ready", !(await page.isVisible("#rlMailto")), "");

  const roles = async () => page.$$eval("#rlRole option", o => o.map(x => x.value).filter(Boolean));
  await page.check('input[name=rlRegion][value=roi]');
  check("Republic of Ireland offers TD, Senator and Councillor only", (await roles()).join() === "td,senator,councillor", (await roles()).join());
  await page.selectOption("#rlRole", "td"); await page.fill("#rlName", "A Person"); await page.fill("#rlWhat", "A long wait."); await page.fill("#rlRepName", "Surname");
  let letter = await page.textContent("#rlOutput");
  check("Republic of Ireland letter greets a Deputy and names the HSE, not a Trust", /Dear Deputy Surname,/.test(letter) && /or the HSE, about my case/.test(letter) && !/Health and Social Care/.test(letter), letter);
  check("the parliamentary-question request is offered to a TD", await page.isVisible("#rlAsk_question"), "");
  await page.selectOption("#rlRole", "councillor");
  check("it is hidden for a councillor and absent from the letter", !(await page.isVisible("#rlAsk_question")) && !/parliamentary question/.test(await page.textContent("#rlOutput")), "");
  await page.check('input[name=rlRegion][value=ni]');
  check("Northern Ireland offers MLA, MP and Councillor only", (await roles()).join() === "mla,mp,councillor", (await roles()).join());
  await page.selectOption("#rlRole", "mla"); await page.fill("#rlRepName", "Surname");
  letter = await page.textContent("#rlOutput");
  check("Northern Ireland letter names the Health and Social Care Trust, not the HSE, and has no Deputy greeting", /or the Health and Social Care Trust, about my case/.test(letter) && !/\bHSE\b/.test(letter) && /Dear Surname,/.test(letter), letter);
  check("the placeholders show when fields are empty", /\[Date\]/.test(letter), "");
  await page.fill("#rlEmail", "someone@example.org");
  check("the email-app link appears once ready and is a mailto: link", await page.isVisible("#rlMailto") && (await page.getAttribute("#rlMailto", "href")).startsWith("mailto:"), "");
  await page.check("#rlConsent");
  check("consent text appears only when ticked", (await page.textContent("#rlOutput")).includes(R.consent), "");

  const hrefs = await page.$$eval("#app a[href]", a => a.map(x => x.getAttribute("href")));
  check("no link on the page leaves the site (only internal routes and the mailto: link)", hrefs.every(h => h.startsWith("#") || h.startsWith("mailto:")), hrefs.join());
  check("no AskCI or chatbot on the page", !/askci|chatbot/i.test(await page.content()), "");
  check("nothing is stored by using the page", (await stored()) === before, "");
  check("no console errors or warnings", problems.length === 0, JSON.stringify(problems));
  check("no requests outside the site", outside.length === 0, JSON.stringify(outside));
  await page.setViewportSize({ width: 320, height: 700 });
  check("no horizontal overflow at 320px", !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "");
  await browser.close(); server.close(); finish();
})();
function finish(){ if (failed) { console.log(failed + " check(s) failed"); process.exit(1); } console.log("all checks passed"); }
