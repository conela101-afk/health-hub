// Search regression test. Run: node scripts/search-audit.js
//   node scripts/search-audit.js [root] [queries-file]
// Runs the real matching code (search.js) over the real data (data.js, data/conditions.js, the tool
// pages in app.js) and fails if:
//   1. an alias target in SEARCH_ALIASES matches nothing in entries, orgs, tools or conditions;
//   2. a query in the list returns nothing and is not in scripts/search-audit-known-gaps.txt
//      (the zero-result list must not grow; when content fills a gap, delete its line there);
//   3. a query in the list returns more than 150 entries.
// scripts/search-audit-queries-ga.txt (Irish-language queries) is reported but not enforced.
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.resolve(process.argv[2] || ".");
const queriesFile = process.argv[3] || path.join(root, "scripts/search-audit-queries.txt");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

const ctx = {}; vm.createContext(ctx);
vm.runInContext(read("data.js") + "\n" + read("search.js") +
  "\nthis.D={ENTRIES,COUNTIES,SPECIALTIES,AREAS,SUPPORT_ORGS,GENERAL_ADVOCACY_ORGS,SEARCH_ALIASES};", ctx);
const cctx = {}; vm.createContext(cctx);
vm.runInContext(read("data/conditions.js") + "\nthis.C=CONDITIONS;", cctx);
const S = ctx.HHSearch, D = ctx.D, C = cctx.C;

const tools = [...read("app.js").matchAll(/\{ name: "([^"]+)", href: "([^"]+)", keywords: "([^"]*)"/g)].map(m => ({ name: m[1], keywords: m[3] }));
const label = (list, id) => (list.find(x => x.id === id) || {}).label || id;
const areaLabel = id => { for (const k of Object.keys(D.AREAS || {})) { const a = D.AREAS[k].find(x => x.id === id); if (a) return a.label; } return id; };
const n = S.normalise;
// Same fields as entryHay() in app.js.
const entryHay = D.ENTRIES.map(e => n([e.name, e.blurb, ...(e.details || []), ...e.specialty.map(s => label(D.SPECIALTIES, s)), ...e.county.map(c => label(D.COUNTIES, c)), e.area ? areaLabel(e.area) : ""].join(" ")));
const orgHay = [...D.SUPPORT_ORGS, ...D.GENERAL_ADVOCACY_ORGS].map(o => n([o.name, o.remit, o.offer, ...(o.tags || [])].join(" ")));
const toolHay = tools.map(t => n(t.name + " " + t.keywords));
const condHay = C.map(c => n(`${c.name} ${c.category} ${(c.keywords || []).join(" ")}`));

function run(raw) {
  const m = S.matcher(S.prepare(raw));
  const count = hays => hays.filter(m).length;
  return { e: count(entryHay), o: count(orgHay), t: count(toolHay), k: count(condHay) };
}
const lines = f => fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\n").map(s => s.trim()).filter(s => s && !s.startsWith("#")) : [];
let failed = false;
const fail = msg => { failed = true; console.log("FAIL", msg); };

// 1. alias targets
const all = [...entryHay, ...orgHay, ...toolHay, ...condHay];
Object.keys(D.SEARCH_ALIASES).forEach(key => D.SEARCH_ALIASES[key].forEach(t => {
  const nt = n(t);
  if (!all.some(h => S.contains(h, nt))) fail(`alias "${key}" -> "${t}" matches nothing in the data`);
}));
Object.keys(D.SEARCH_ALIASES).forEach(key => { if (key !== n(key)) fail(`alias key "${key}" is not in normalised form ("${n(key)}")`); });

// 2 and 3. query list
const queries = lines(queriesFile);
const known = new Set(lines(path.join(root, "scripts/search-audit-known-gaps.txt")).map(n));
const zero = [], noisy = [];
queries.forEach(q => {
  const r = run(q), total = r.e + r.o + r.t + r.k;
  if (!total) { zero.push(q); if (!known.has(n(q))) fail(`new zero-result query: "${q}"`); }
  if (r.e > 150) { noisy.push(`${q}:${r.e}`); fail(`"${q}" returns ${r.e} entries (limit 150)`); }
});
const fixed = [...known].filter(q => !zero.map(n).includes(q));
fixed.forEach(q => console.log(`note: "${q}" now returns results; delete it from search-audit-known-gaps.txt`));

// A few behaviours that must keep working.
const must = [["pediatric", "e"], ["gynecology", "e"],  ["parkinsons", "e"], ["carers allowance", "e"], ["self harm", "e"], ["a&e", "e"], ["dad", "e"], ["fair deal", "t"]];
must.concat([["alzheimers", "k"]]).forEach(([q, k]) => { if (!run(q)[k]) fail(`"${q}" should return ${k === "e" ? "entries" : k === "k" ? "a condition" : "tool pages"}`); });
// Crisis banner (approved wording, 7 Oct 2026): shows for these, and must not show for the others.
["suicide", "self harm", "self-harm", "Overdose", "want to die", "kill myself", "end my life", "crisis", "Crisis ", "mental health crisis", "suicidal thoughts", "overdose help"]
  .forEach(q => { if (!S.isCrisisQuery(q)) fail(`crisis banner should show for "${q}"`); });
["dad", "crisis pregnancy", "er", "ed", "anxiety", "a&e", "drugs", "pregnancy", "counselling", "die", "life", "harm"]
  .forEach(q => { if (S.isCrisisQuery(q)) fail(`crisis banner should NOT show for "${q}"`); });

if (run("er").e > 150 || run("ms").e > 150) fail("short queries are too noisy");

console.log(`queries: ${queries.length}, zero-result: ${zero.length} (known gaps: ${known.size}), alias keys: ${Object.keys(D.SEARCH_ALIASES).length}`);
if (zero.length) console.log("zero-result:", zero.join(" | "));
const ga = lines(path.join(root, "scripts/search-audit-queries-ga.txt"));
if (ga.length) {
  const gz = ga.filter(q => { const r = run(q); return !(r.e + r.o + r.t + r.k); });
  console.log(`Irish-language queries (reported, not enforced): ${ga.length - gz.length} of ${ga.length} return results; none: ${gz.join(" | ") || "-"}`);
}
["er", "ed", "ms", "sti", "dad", "pediatric", "alzheimers", "carers allowance", "pap test", "counseling"].forEach(q => console.log(q.padEnd(18), JSON.stringify(run(q))));
process.exit(failed ? 1 : 0);
