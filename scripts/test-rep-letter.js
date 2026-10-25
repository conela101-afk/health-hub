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
  check(`${k}: present, ids unique, each has a label (or per-role wording)`, ids.length > 0 && new Set(ids).size === ids.length && R[k].every(x => x.id && (x.label || x.perRole)), "");
});
check("regions are the Republic of Ireland and Northern Ireland, and name no body (the location only decides the roles)", R.regions.map(r => r.id).join() === "roi,ni" && R.regions.every(r => r.label && !("body" in r)), "");
check("every role names at least one region, all valid", R.roles.every(r => r.regions.length && r.regions.every(x => R.regions.some(g => g.id === x))), "");
check("TD and Senator are Republic of Ireland only; MLA and MP are Northern Ireland only; councillor is both", ["td", "senator"].every(i => R.roles.find(r => r.id === i).regions.join() === "roi") && ["mla", "mp"].every(i => R.roles.find(r => r.id === i).regions.join() === "ni") && R.roles.find(r => r.id === "councillor").regions.join() === "roi,ni", "");
check("default greeting words: Deputy, Senator, Councillor; none for MLA and MP", R.roles.map(r => r.id + ":" + r.greeting).join() === "td:Deputy,senator:Senator,mla:,mp:,councillor:Councillor", "");
const contact = R.asks.find(a => a.id === "contact"), question = R.asks.find(a => a.id === "question");
check("the first request uses one neutral phrase for both regions", contact.text === "Contact the service, or the organisation that runs or funds it, about my case and ask for a reply.", contact.text);
check("no text names the HSE or a Health and Social Care Trust", !strings.some(s => /\bHSE\b|Health and Social Care/.test(s)), "");
const PQ = "Raise it with the Minister, or as a parliamentary question, if you think that is appropriate.";
check("TD and MP are offered the parliamentary question", question.perRole.td.text === PQ && question.perRole.mp.text === PQ, "");
check("an MLA is offered an Assembly question, not a parliamentary question", question.perRole.mla.text === "Raise it with the Minister, or as an Assembly question, if you think that is appropriate." && !/parliamentary/.test(question.perRole.mla.text + question.perRole.mla.label), "");
check("a Senator is offered only to raise it with the relevant Minister, with no question", question.perRole.senator.text === "Raise it with the relevant Minister if you think that is appropriate." && !/question/i.test(question.perRole.senator.text + question.perRole.senator.label), "");
check("a councillor is not offered the request at all", !("councillor" in question.perRole) && Object.keys(question.perRole).sort().join() === "mla,mp,senator,td", Object.keys(question.perRole).join());
check("every label matches its text", Object.values(question.perRole).every(w => w.label + "." === w.text), "");
check("every topic has a phrase, every done and ask has text, consent is present", R.topics.every(t => t.phrase) && R.done.every(x => x.text) && contact.text && R.consent, "");

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
  let letter;
  await page.goto(origin + "/#/advocacy/rep-letter"); await page.waitForTimeout(500);
  const stored = () => page.evaluate(() => JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage), document.cookie]));
  const before = await stored();
  check("page opens with the right heading and a back link to Take action", (await page.textContent("h1")) === "Write to your elected representative" && await page.$('.back-link[href="#/act"]') !== null, "");
  check("before a location is chosen the role list is disabled and the letter says what to do", await page.$eval("#rlRole", e => e.disabled) && /Choose where you live/.test(await page.textContent("#rlOutput")), "");
  check("the email-app link is hidden until the letter is ready", !(await page.isVisible("#rlMailto")), "");

  const roles = async () => page.$$eval("#rlRole option", o => o.map(x => x.value).filter(Boolean));
  const out = () => page.textContent("#rlOutput");
  const NEUTRAL = "Contact the service, or the organisation that runs or funds it, about my case and ask for a reply.";
  check("the title-and-surname field has the approved label", (await page.textContent('label[for="rlRepName"]')) === "Their title and surname (optional), for example Ms Murphy", "");
  check("the address hint is the approved wording", (await page.getAttribute("#rlAddress", "placeholder")) === "Your representative may need your address to confirm you live in their area", "");
  check("the page note starts with the approved sentence", /^A letter asking for help\. It is not legal or medical advice\./.test((await page.textContent(".callout")).trim()), "");
  await page.check('input[name=rlRegion][value=roi]');
  check("Republic of Ireland offers TD, Senator and Councillor only", (await roles()).join() === "td,senator,councillor", (await roles()).join());
  await page.fill("#rlName", "A Person"); await page.fill("#rlWhat", "A long wait.");
  const askLabel = () => page.textContent("#rlAsk_question_label");
  // Greeting cases: nothing typed uses the role's own word; what is typed after "Dear" is used exactly.
  const greet = async (role, typed) => { await page.selectOption("#rlRole", role); await page.fill("#rlRepName", typed); return (await out()).split("\n").find(l => l.startsWith("Dear ")); };
  const cases = [["td", "", "Dear Deputy,"], ["td", "Ms Murphy", "Dear Ms Murphy,"], ["td", "  Deputy Murphy  ", "Dear Deputy Murphy,"], ["senator", "", "Dear Senator,"], ["senator", "Senator Byrne", "Dear Senator Byrne,"], ["councillor", "", "Dear Councillor,"], ["councillor", "Cllr Kelly,", "Dear Cllr Kelly,"], ["councillor", "   ", "Dear Councillor,"]];
  const wrong = [];
  for (const [role, typed, want] of cases) { const got = await greet(role, typed); if (got !== want) wrong.push(`${role} "${typed}" gave "${got}", wanted "${want}"`); }
  await page.check('input[name=rlRegion][value=ni]');
  for (const [role, typed, want] of [["mla", "", "Dear Sir or Madam,"], ["mla", "Mr Smith", "Dear Mr Smith,"], ["mp", "", "Dear Sir or Madam,"], ["mp", "Dr Jones", "Dear Dr Jones,"], ["councillor", "", "Dear Councillor,"]]) { const got = await greet(role, typed); if (got !== want) wrong.push(`${role} "${typed}" gave "${got}", wanted "${want}"`); }
  check("greeting cases: blank uses the role's word, typed text is used exactly after Dear", wrong.length === 0, wrong.join("; "));

  // The request to raise it in the chamber, per role.
  await page.check('input[name=rlRegion][value=roi]');
  const ask = async (role) => { await page.selectOption("#rlRole", role); await page.check("#rlAsk_question").catch(() => {}); return { shown: await page.isVisible("#rlAsk_question"), label: await askLabel(), letter: await out() }; };
  let r = await ask("td");
  check("TD: parliamentary question offered and in the letter", r.shown && /parliamentary question/.test(r.label) && r.letter.includes("or as a parliamentary question, if you think"), r.label);
  r = await ask("senator");
  check("Senator: only 'Raise it with the relevant Minister', no question", r.shown && r.label === "Raise it with the relevant Minister if you think that is appropriate" && r.letter.includes("Raise it with the relevant Minister if you think that is appropriate.") && !/question/i.test(r.letter), r.label);
  r = await ask("councillor");
  check("Councillor: the request is hidden and not in the letter", !r.shown && !/Minister/.test(r.letter), "");
  await page.check('input[name=rlRegion][value=ni]');
  r = await ask("mla");
  check("MLA: Assembly question, not parliamentary question", r.shown && /Assembly question/.test(r.label) && r.letter.includes("or as an Assembly question, if you think") && !/parliamentary/.test(r.letter), r.label);
  r = await ask("mp");
  check("MP: parliamentary question", r.shown && /parliamentary question/.test(r.label) && r.letter.includes("or as a parliamentary question, if you think"), r.label);
  check("Northern Ireland offers MLA, MP and Councillor only", (await roles()).join() === "mla,mp,councillor", (await roles()).join());
  await page.selectOption("#rlRole", "mla");
  letter = await out();
  check("the same neutral phrase is used in Northern Ireland, with no HSE or Trust named", letter.includes(NEUTRAL) && !/\bHSE\b|Health and Social Care/.test(letter), letter);
  await page.check('input[name=rlRegion][value=roi]'); await page.selectOption("#rlRole", "td");
  letter = await out();
  check("the same neutral phrase is used in the Republic of Ireland, with no HSE or Trust named", letter.includes(NEUTRAL) && !/\bHSE\b|Health and Social Care/.test(letter), letter);
  check("the placeholders show when fields are empty", /\[Date\]/.test(letter), "");
  await page.fill("#rlEmail", "someone@example.org");
  check("the email-app link appears once ready and is a mailto: link", await page.isVisible("#rlMailto") && (await page.getAttribute("#rlMailto", "href")).startsWith("mailto:"), "");
  await page.check("#rlConsent");
  check("consent text appears only when ticked", (await out()).includes(R.consent), "");

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
