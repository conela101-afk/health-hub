// Prints the ROI 26-county coverage matrix from data.js. Run: node scripts/county-matrix.js
// Counts entries whose county[] includes the county (Cork = city, north and west ids combined).
const fs = require("fs"), vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.E=ENTRIES;this.C=COUNTIES;", ctx);
const ROI = ["carlow","cavan","clare","cork","donegal","dublin","galway","kerry","kildare","kilkenny","laois","leitrim","limerick","longford","louth","mayo","meath","monaghan","offaly","roscommon","sligo","tipperary","waterford","westmeath","wexford","wicklow"];
const ids = c => c === "cork" ? ["cork-city","cork-north","cork-west"] : [c];
const cats = [["childdisability","Child disab."],["adultdisability","Adult disab."],["phn","PHN"],["camhs","CAMHS"],["alliedhealth","Allied"],["dental","Dental"],["adultmh","Adult MH"]];
const out = [`| County | All | ${cats.map(c => c[1]).join(" | ")} |`, `|---|---|${cats.map(() => "---").join("|")}|`];
for (const c of ROI){
  const es = ctx.E.filter(e => (e.county || []).some(x => ids(c).includes(x)));
  const n = k => es.filter(e => (e.specialty || []).includes(k)).length;
  out.push(`| ${c[0].toUpperCase()+c.slice(1)} | ${es.length} | ${cats.map(k => n(k[0])).join(" | ")} |`);
}
console.log(out.join("\n"));
console.log("\nTotal entries:", ctx.E.length, "| tagged national:", ctx.E.filter(e => (e.county||[]).includes("national")).length);
