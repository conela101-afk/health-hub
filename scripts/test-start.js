// Checks the "Where do I start?" lookup table (start.js) against doors.js. Plain Node. Run: node scripts/test-start.js
// Fails if a step points at a page that has no hub row, a result shows more than one primary step or more than
// two "Also useful", a step repeats, or a Republic of Ireland page can appear in a Northern Ireland result.
const path = require("path");
const root = path.join(__dirname, "..");
globalThis.HH_DOORS = require(path.join(root, "doors.js"));
const S = require(path.join(root, "start.js"));
let failed = 0;
const fail = m => { failed++; console.error("FAIL " + m); };

const hrefs = new Set(globalThis.HH_DOORS.items.map(i => i.href));
S.ROI_ONLY.forEach(h => { if (!hrefs.has(h)) fail(`ROI_ONLY lists ${h}, which has no hub row`); });
if (S.TOPICS.length < 5 || S.TOPICS.length > 8) fail(`expected 5 to 8 topics, found ${S.TOPICS.length}`);
if (new Set(S.TOPICS.map(t => t.id)).size !== S.TOPICS.length) fail("duplicate topic id");
S.TOPICS.forEach(t => { if (!S.TABLE[t.id]) fail(`topic ${t.id} has no row in TABLE`); if (!t.label || !t.hint) fail(`topic ${t.id} needs a label and a hint`); });
Object.keys(S.TABLE).forEach(id => { if (!S.TOPICS.some(t => t.id === id)) fail(`TABLE row ${id} has no topic`); });
if (S.REGIONS.map(r => r.id).join() !== "roi,ni") fail("regions must be roi and ni");

let results = 0;
S.TOPICS.forEach(t => S.REGIONS.forEach(r => {
  const res = S.lookup(t.id, r.id); results++;
  const where = `${t.id}/${r.id}`;
  if (!res) return fail(`${where}: no result`);
  if (!res.primary && !res.message) fail(`${where}: no primary step and no message`);
  if (res.primary && res.message) fail(`${where}: both a primary step and a message`);
  if (res.also.length > 2) fail(`${where}: more than two "Also useful"`);
  const shown = [res.primary, ...res.also].filter(Boolean).map(s => s.href);
  if (new Set(shown).size !== shown.length) fail(`${where}: a step is repeated`);
  shown.forEach(h => { if (!hrefs.has(h)) fail(`${where}: ${h} has no hub row`); });
  if (r.id === "ni") shown.forEach(h => { if (S.ROI_ONLY.includes(h)) fail(`${where}: Republic of Ireland page ${h} shown to Northern Ireland`); });
}));
if (S.lookup("nope", "roi") !== null || S.lookup("find", "nope") !== null) fail("unknown topic or region should give null");
if (failed) { console.error(`${failed} problem(s)`); process.exit(1); }
console.log(`ok: ${S.TOPICS.length} topics x ${S.REGIONS.length} regions = ${results} results, no Republic of Ireland page in a Northern Ireland result`);
