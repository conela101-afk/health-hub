// Checks every link on the "Where do I start?" page (START_POINTS in data.js) points at a route that exists.
// Run: node scripts/test-start-links.js
const fs = require("fs"), vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.S = START_POINTS;", ctx);
const appSrc = fs.readFileSync("app.js", "utf8");
const toolsSrc = fs.readFileSync("tools.js", "utf8");
const toolIds = [...toolsSrc.slice(toolsSrc.indexOf("const TOOL_LIST")).matchAll(/\{ id: "([a-z-]+)", name:/g)].map(m => m[1]);
let fails = 0;
const bad = (id, why) => { fails++; console.log("FAIL", id, why); };
const ids = new Set();
ctx.S.forEach(s => {
  if (ids.has(s.id)) bad(s.id, "duplicate id"); ids.add(s.id);
  if (!s.label || !s.hint) bad(s.id, "needs a label and a hint");
  if (!/^#\//.test(s.href)) { bad(s.id, `href must be an internal #/ route (${s.href})`); return; }
  const parts = s.href.replace(/^#\//, "").split("/").filter(Boolean);
  if (parts[0] === "tools") {
    if (!parts[1] || !toolIds.includes(parts[1])) bad(s.id, `unknown tool "${parts[1]}"`);
  } else if (!appSrc.includes(`parts[0] === "${parts[0]}"`)) bad(s.id, `no route for "${parts[0]}"`);
  if (!fails) console.log("ok  ", s.id, s.href);
});
if (ctx.S.length < 5 || ctx.S.length > 8) bad("list", `expected 5 to 8 starting points, found ${ctx.S.length}`);
process.exit(fails ? 1 : 0);
