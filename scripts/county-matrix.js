// Prints the ROI 26-county coverage matrix from data.js.
//   node scripts/county-matrix.js           county matrix
//   node scripts/county-matrix.js --areas   also one row per sub-county area (see AREAS) and a reconciliation line
// An entry counts for a county if its `county` array includes it. An entry's optional `area` counts
// toward the county total as well (areas only split a county's entries, never add to them).
const fs = require("fs"), vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.E=ENTRIES;this.C=COUNTIES;this.A=AREAS;", ctx);
const ROI = ctx.C.map(c => c.id).filter(id => !["antrim","armagh","down","fermanagh","londonderry","tyrone","national"].includes(id));
const label = id => (ctx.C.find(c => c.id === id) || {}).label || id;
const cats = [["childdisability","Child disab."],["adultdisability","Adult disab."],["phn","PHN"],["camhs","CAMHS"],["alliedhealth","Allied"],["dental","Dental"],["adultmh","Adult MH"]];
const head = [`| County | All | ${cats.map(c => c[1]).join(" | ")} |`, `|---|---|${cats.map(() => "---").join("|")}|`];
const row = (name, es) => `| ${name} | ${es.length} | ${cats.map(k => es.filter(e => (e.specialty || []).includes(k[0])).length).join(" | ")} |`;
const inCounty = c => ctx.E.filter(e => (e.county || []).includes(c));

const out = head.slice();
ROI.forEach(c => out.push(row(label(c), inCounty(c))));
if (process.argv.includes("--areas")){
  Object.keys(ctx.A).forEach(c => {
    const es = inCounty(c);
    out.push("", `Areas within ${label(c)} (navigation only, not HSE boundaries):`, "", ...head);
    let sum = 0;
    ctx.A[c].forEach(a => { const ae = es.filter(e => e.area === a.id); sum += ae.length; out.push(row(a.label, ae)); });
    const none = es.filter(e => !e.area || !ctx.A[c].some(a => a.id === e.area));
    sum += none.length;
    out.push(row("No area (whole county)", none));
    out.push("", `Reconciliation: areas + no area = ${sum}; ${label(c)} county total = ${es.length}. ${sum === es.length ? "OK" : "MISMATCH"}`);
    if (sum !== es.length) process.exitCode = 1;
  });
}
console.log(out.join("\n"));
console.log("\nTotal entries:", ctx.E.length, "| tagged national:", ctx.E.filter(e => (e.county||[]).includes("national")).length);
