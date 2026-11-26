// Lists every row marked `verify: true`, one per line, as: id | name | source_url
// Run: node scripts/list-unverified.js
// Reads data.js and the standalone layers in data/. Row checks are driven from this list, not from a hand-kept file.
// Rows with no source_url show "(no source_url)".
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const files = ["data.js"].concat(fs.readdirSync(path.join(root, "data")).filter(f => f.endsWith(".js")).sort().map(f => "data/" + f));

function label(r){
  return r.name || r.programme || r.vaccine || r.title || r.label || r.text || "";
}

function rowsOf(file){
  const ctx = vm.createContext({ window: {}, document: {}, console });
  const src = fs.readFileSync(path.join(root, file), "utf8");
  // Top-level `const` bindings are not properties of the context, so collect them by name.
  const names = [...src.matchAll(/^(?:const|let|var)\s+([A-Z][A-Z0-9_]*)\s*=/gm)].map(m => m[1]);
  vm.runInContext(src + "\n;this.__out = {" + names.map(n => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(",") + "};", ctx);
  const out = [];
  Object.entries(ctx.__out).forEach(([key, val]) => {
    if (!Array.isArray(val)) return;
    val.forEach(r => { if (r && typeof r === "object" && r.verify === true) out.push(r); });
  });
  return out;
}

const seen = new Set();
let n = 0;
files.forEach(f => {
  rowsOf(f).forEach(r => {
    const key = f + "|" + r.id;
    if (seen.has(key)) return;
    seen.add(key);
    const clean = s => String(s || "").replace(/\s+/g, " ").trim();
    console.log([clean(r.id), clean(label(r)), clean(r.source_url) || "(no source_url)"].join(" | "));
    n++;
  });
});
console.error(n + " row(s) marked verify: true");
