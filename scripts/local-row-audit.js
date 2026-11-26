// Read-only audit of local directory rows. Run: node scripts/local-row-audit.js
// Writes research/local-row-audit-2026-11-26.md and nothing else. data.js is only read.
//
// Rule (maintainer decision, 26 Nov 2026): Health Hub stays a one stop shop for where to start, and local
// listings that an official finder already keeps current are replaced by a link to that finder.
//   Keep:            national rows, pathway rows, rights, toolkit and escalation content.
//   Keep (safety):   emergency departments, injury units, medical assessment units, crisis and acute
//                    psychiatric rows, out-of-hours GP rows.
//   Keep:            local rows no official finder covers (voluntary groups, NI services, specialist clinics).
//   Archive candidate: a local row whose service type is already listed by an official finder that has its
//                    own row in data.js.
// The output is a candidate list only. The maintainer approves it, row by row, before anything is archived.
//
// Finder rows come from the data itself: national rows with a web address whose name or blurb says "find",
// "locator", "finder", "directory" or "searchable" (and does not say there is no list), plus a short seed list
// of ids the maintainer named. No finder is invented: a seed id that is not a row is reported, not used.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const OUT = path.join(root, "research", "local-row-audit-2026-11-26.md");

const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8") + "\n;this.E = ENTRIES; this.C = COUNTIES; this.S = SPECIALTIES;", ctx);
const ENTRIES = ctx.E, COUNTIES = ctx.C, SPECIALTIES = ctx.S;

const NI = ["antrim", "armagh", "down", "fermanagh", "londonderry", "tyrone"];
const ROI = COUNTIES.map(c => c.id).filter(id => id !== "national" && !NI.includes(id));
const countyLabel = id => (COUNTIES.find(c => c.id === id) || {}).label || id;
const specLabel = id => (SPECIALTIES.find(s => s.id === id) || {}).label || id;
const text = e => ((e.name || "") + " " + (e.blurb || "")).replace(/\s+/g, " ");
const urlOf = e => e.source_url || (e.contact && e.contact.web) || "";
const covers = (e, list) => list.every(c => (e.county || []).includes(c));

// ---- 1. Local rows ----
const isLocal = e => {
  const c = e.county || [];
  if (c.includes("national")) return false;
  if (covers(e, NI) || covers(e, ROI)) return false;   // a whole jurisdiction is a national-style row
  return true;
};
const locals = ENTRIES.filter(isLocal);

// ---- 2. Finder rows, from the data ----
const FINDER_SEED = ["hse-cdnt-finder", "hse-public-dental-clinics", "hse-child-dental", "hse-palliative-finder",
  "iapc-referral-directory", "phn-locator", "hse-aon-officer", "drugs-ie-services-directory", "ni-substance-misuse",
  "find-breastfeeding-group", "ni-breastfeeding-support", "alci-ibclc-directory", "find-frc", "hse-prep-where"];
const FINDER_WORDS = /\bfind (your|a|an|the|local|nearest)\b|locator|finder|directory|searchable|search tool/i;
const NO_LIST = /\bno (compact )?(national |public )?(list|directory)|there'?s no\b|about /i;
const detected = ENTRIES.filter(e => (e.county || []).includes("national") && urlOf(e) && FINDER_WORDS.test(text(e)) && !NO_LIST.test(text(e)));
const finderIds = [];
detected.forEach(e => finderIds.push({ id: e.id, how: "detected" }));
const missingSeeds = [];
FINDER_SEED.forEach(id => {
  const e = ENTRIES.find(x => x.id === id);
  if (!e) { missingSeeds.push(id); return; }
  const f = finderIds.find(x => x.id === id);
  if (f) f.how = "detected and seeded"; else finderIds.push({ id, how: "seeded" });
});
finderIds.sort((a, b) => a.id.localeCompare(b.id));
const finderRows = finderIds.map(f => ({ ...f, e: ENTRIES.find(x => x.id === f.id) }));

// What each finder covers: specialty, the service type in the row's text, and which side of the border.
// Only finders that exist as rows are used. public:true means private and voluntary rows are not covered.
const COVER = {
  "hse-cdnt-finder":           { spec: ["childdisability"], type: /children'?s disability network team|\bCDNT\b|early intervention team/i, region: "ROI" },
  "hse-aon-officer":           { spec: ["childdisability"], type: /assessment of need/i, region: "ROI" },
  "hse-public-dental-clinics": { spec: ["dental"], type: /dental|dentist|orthodont/i, region: "ROI", publicOnly: true },
  "hse-child-dental":          { spec: ["dental"], type: /school dental|orthodont|child(ren)?'?s? dental/i, region: "ROI", publicOnly: true },
  "hse-palliative-finder":     { spec: ["palliative"], type: /palliative|hospice/i, region: "ROI", publicOnly: true },
  "iapc-referral-directory":   { spec: ["palliative"], type: /palliative|hospice/i, region: "ROI", publicOnly: true },
  "phn-locator":               { spec: ["phn"], type: /public health nurs|\bPHN\b|primary care cent(re|er)/i, region: "ROI" },
  "find-breastfeeding-group":  { spec: ["feeding"], type: /breastfeeding (support )?group|breastfeeding clinic|baby cafe/i, region: "ROI", publicOnly: true },
  "ni-breastfeeding-support":  { spec: ["feeding"], type: /breastfeeding (support )?group|breastfeeding clinic/i, region: "NI", publicOnly: true },
  "alci-ibclc-directory":      { spec: ["feeding"], type: /lactation consultant|IBCLC/i, region: null, publicOnly: false },
  "find-frc":                  { spec: ["hub"], type: /family resource cent(re|er)/i, region: "ROI" },
  "drugs-ie-services-directory": { spec: ["addiction"], type: /./, region: "ROI", publicOnly: true },
  "ni-substance-misuse":       { spec: ["addiction"], type: /./, region: "NI", publicOnly: true },
  "hse-prep-where":            { spec: ["sexualhealth"], type: /\bPrEP\b/i, region: "ROI", publicOnly: true },
};
const regionOf = e => ((e.county || []).every(c => NI.includes(c)) ? "NI" : (e.county || []).every(c => ROI.includes(c)) ? "ROI" : "both");

function coveringFinder(e){
  for (const f of finderRows) {
    const c = COVER[f.id];
    if (!c) continue;
    if (c.region && regionOf(e) !== c.region) continue;
    if (!(e.specialty || []).some(s => c.spec.includes(s))) continue;
    if (!c.type.test(text(e))) continue;
    if (c.publicOnly && (e.sector === "private" || e.sector === "voluntary")) continue;
    return f.id;
  }
  return "";
}

// ---- 3. Keep reasons ----
const SAFETY_SPEC = ["urgent", "crisis"];
const SAFETY_TEXT = /emergency department|\bED\b|injury unit|minor injur|medical assessment unit|acute (psychiatric|mental health|inpatient)|inpatient psychiatr|psychiatric (unit|inpatient)|out[- ]of[- ]hours|\bOOH\b|crisis/i;
const safety = e => (e.specialty || []).some(s => SAFETY_SPEC.includes(s)) || SAFETY_TEXT.test(text(e));

const soleKey = (spec, county) => spec + "|" + county;
const soleCount = {};
locals.forEach(e => (e.specialty || []).forEach(s => (e.county || []).forEach(c => { soleCount[soleKey(s, c)] = (soleCount[soleKey(s, c)] || 0) + 1; })));
const isSole = e => (e.specialty || []).some(s => (e.county || []).some(c => soleCount[soleKey(s, c)] === 1));

function classify(e){
  const finder = coveringFinder(e);
  if (safety(e)) return { finder, s: "keep", why: "safety category" };
  if (!finder) return { finder, s: "keep", why: "no covering finder" };
  if (e.sector === "voluntary") return { finder, s: "keep", why: "voluntary sector" };
  if (isSole(e)) return { finder, s: "keep", why: "only row of its specialty in its county" };
  const checked = e.verify !== true && !!e.checked;
  return { finder, s: "archive", why: (checked ? "CHECKED; " : "") + "covered by " + finder };
}

const rows = locals.map(e => {
  const c = classify(e);
  return {
    id: e.id, name: e.name, county: (e.county || []).join(", "), specialty: (e.specialty || []).join(", "),
    sector: e.sector || "public", verify: e.verify === true, checked: e.checked || "",
    finder: c.finder, s: c.s, why: c.why, counties: e.county || [], e,
  };
});
const order = { archive: 0, keep: 1 };
rows.sort((a, b) => order[a.s] - order[b.s] || a.specialty.localeCompare(b.specialty) || a.county.localeCompare(b.county) || a.id.localeCompare(b.id));

// ---- 4. Report ----
const archive = rows.filter(r => r.s === "archive");
const keep = rows.filter(r => r.s === "keep");
const clean = s => String(s).replace(/\|/g, "/").replace(/\s+/g, " ").trim();
const out = [];
out.push("# Local row audit, 26 Nov 2026", "",
  "Generated by `node scripts/local-row-audit.js`. Read-only: no row in `data.js` was changed. This is a **candidate list**. Nothing is archived until the maintainer approves it, row by row.", "",
  "## Rule applied", "",
  "Health Hub stays a one stop shop for where to start. Local listings that an official finder already keeps current are replaced by a link to that finder.", "",
  "- **Keep:** national rows, pathway rows, rights, toolkit and escalation content (none of these are local rows, so they are not audited here).",
  "- **Keep (safety):** emergency departments, injury units, medical assessment units, crisis and acute psychiatric rows, out-of-hours GP rows.",
  "- **Keep:** local rows no official finder covers, voluntary-sector rows, and any row that is the only one of its specialty in its county.",
  "- **Archive candidate:** a local row whose service type is listed by an official finder that has its own row in `data.js`.", "");

out.push("## Summary", "",
  `- Total rows in \`ENTRIES\`: ${ENTRIES.length}`,
  `- Local rows (not \`national\`, and not a whole jurisdiction): ${locals.length}`,
  `- Suggested keep: ${keep.length}`,
  `- Suggested archive: ${archive.length}`,
  `- Archive candidates that are \`verify: true\`: ${archive.filter(r => r.verify).length}`,
  `- Archive candidates that are checked (\`CHECKED\` in the reason): ${archive.filter(r => !r.verify && r.checked).length}`,
  `- Archive candidates that are neither \`verify: true\` nor dated: ${archive.filter(r => !r.verify && !r.checked).length}`, "");

const reasonCount = {};
keep.forEach(r => { reasonCount[r.why] = (reasonCount[r.why] || 0) + 1; });
out.push("Keep reasons (a row shows the first that applies):", "");
Object.keys(reasonCount).sort().forEach(k => out.push(`- ${k}: ${reasonCount[k]}`));
out.push("");

out.push("## Finder rows the matching relied on", "",
  "Built from the data (see the header of the script). A finder is listed here only if it is a row in `data.js`. \"Used\" is how many local rows it covers.", "",
  "| id | name | url | how found | used |", "|---|---|---|---|---|");
finderRows.forEach(f => {
  const used = rows.filter(r => r.finder === f.id).length;
  out.push(`| ${f.id} | ${clean(f.e.name)} | ${clean(urlOf(f.e))} | ${f.how} | ${COVER[f.id] ? used : "no matching rule"} |`);
});
out.push("");
if (missingSeeds.length) out.push(`Seed ids that are not rows in \`data.js\` (ignored): ${missingSeeds.join(", ")}`, "");
const noRule = finderRows.filter(f => !COVER[f.id]).map(f => f.id);
if (noRule.length) out.push(`Finders found but not used for matching, because they cover no local service type: ${noRule.join(", ")}`, "");

// Per-county counts: local rows only, before and after accepting every archive suggestion.
const countyIds = COUNTIES.map(c => c.id).filter(id => id !== "national");
const before = {}, after = {};
countyIds.forEach(c => { before[c] = 0; after[c] = 0; });
rows.forEach(r => r.counties.forEach(c => { if (c in before) { before[c]++; if (r.s !== "archive") after[c]++; } }));
out.push("## Per-county counts if every archive suggestion were accepted", "",
  "Local rows that list the county (the same basis as `node scripts/county-matrix.js`, without national rows). Counties under 5 after are flagged.", "",
  "| County | Before | After | Change | Flag |", "|---|---|---|---|---|");
countyIds.forEach(c => out.push(`| ${countyLabel(c)} | ${before[c]} | ${after[c]} | ${after[c] - before[c]} | ${after[c] < 5 ? "below 5" : ""} |`));
out.push("");

// Finder gaps: specialties with many local rows that have no covering finder.
const gap = {};
rows.filter(r => !r.finder && !safety(r.e)).forEach(r => (r.e.specialty || []).forEach(s => { gap[s] = (gap[s] || 0) + 1; }));
const GAP_MIN = 5;
out.push("## Finder gaps (research leads only)", "",
  `Specialties with ${GAP_MIN} or more local rows and no covering finder row in \`data.js\`, not counting the safety rows that are kept regardless. These are leads for the maintainer to research. No finder pages have been opened and no URLs are given.`, "",
  "| Specialty | Local rows with no finder |", "|---|---|");
Object.keys(gap).filter(s => gap[s] >= GAP_MIN).sort((a, b) => gap[b] - gap[a] || a.localeCompare(b)).forEach(s => out.push(`| ${specLabel(s)} (\`${s}\`) | ${gap[s]} |`));
out.push("");

out.push("## Full table", "",
  `Sorted by suggestion, then specialty, then county. ${rows.length} rows.`, "",
  "| id | name | county | specialty | sector | verify | checked | covering finder | suggestion | reason |",
  "|---|---|---|---|---|---|---|---|---|---|");
rows.forEach(r => out.push(`| ${r.id} | ${clean(r.name)} | ${clean(r.county)} | ${clean(r.specialty)} | ${r.sector} | ${r.verify} | ${clean(r.checked)} | ${r.finder} | ${r.s} | ${clean(r.why)} |`));
out.push("");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out.join("\n"));
console.log(`local rows ${locals.length}: keep ${keep.length}, archive ${archive.length} (verify:true ${archive.filter(r => r.verify).length}); wrote ${path.relative(root, OUT)}`);
