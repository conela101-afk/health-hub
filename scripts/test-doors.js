// Checks doors.js against the routes in app.js and tools.js. Run: node scripts/test-doors.js
// Add --table to print the route-to-door table (Markdown) used in the PR description.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const { DOORS, OTHER_ROUTES, ALIASES, items, doorForHash } = require(path.join(root, "doors.js"));

const app = read("app.js"), tools = read("tools.js"), guides = read("data/guides.js");
let failed = 0;
const fail = m => { failed++; console.error("FAIL " + m); };

// 1. Every row's route exists. First segments come from route() in app.js; sub-routes from their sources.
const routeBody = app.slice(app.indexOf("function route()"), app.indexOf('window.addEventListener("hashchange"'));
const firstSegs = new Set([...routeBody.matchAll(/parts\[0\] === "([a-z-]+)"/g)].map(m => m[1]));
const advocacy = new Set([...app.match(/const ADVOCACY_SECTIONS = \[([\s\S]*?)\];/)[1].matchAll(/id: "([a-z]+)"/g)].map(m => m[1]).concat("sar-builder"));
const toolIds = new Set([...tools.match(/const TOOL_LIST = \[([\s\S]*?)\n  \];/)[1].matchAll(/id: "([a-z]+)"/g)].map(m => m[1]));
const aboutIds = new Set(["screening", "waiting-lists"]);
const guideIds = new Set(["after-a-death", "interpreting"]);
guideIds.forEach(g => { if (!guides.includes(g)) fail(`guide "${g}" not found in data/guides.js`); });
aboutIds.forEach(a => { if (!new RegExp(`(^|\\s)"?${a}"?: \\{`, "m").test(tools)) fail(`about page "${a}" not found in tools.js`); });

items.forEach(it => {
  const [seg, sub] = it.href.replace(/^#\//, "").split("/");
  if (!firstSegs.has(seg)) return fail(`${it.href}: no "${seg}" route in app.js`);
  if (seg === "advocacy" && !advocacy.has(sub)) fail(`${it.href}: unknown advocacy section`);
  if (seg === "tools" && sub && !toolIds.has(sub)) fail(`${it.href}: unknown tool`);
  if (seg === "about" && !aboutIds.has(sub)) fail(`${it.href}: unknown about page`);
  if (seg === "guide" && !guideIds.has(sub)) fail(`${it.href}: unknown guide`);
  if (seg === "rights" && sub !== "disability-children") fail(`${it.href}: unknown rights page`);
});

// 2. Each route is listed under exactly one door.
const seen = {};
items.forEach(it => { (seen[it.href] = seen[it.href] || []).push(it.door); });
Object.entries(seen).forEach(([h, d]) => { if (d.length > 1) fail(`${h} is listed under more than one door: ${d.join(", ")}`); });

// 3. Nothing is orphaned: every guided tool, advocacy section, and first-level route has a door or a stated reason.
advocacy.forEach(a => { if (!seen["#/advocacy/" + a]) fail(`#/advocacy/${a} has no door`); });
toolIds.forEach(t => { if (!seen["#/tools/" + t]) fail(`#/tools/${t} has no door`); });
aboutIds.forEach(a => { if (!seen["#/about/" + a]) fail(`#/about/${a} has no door`); });
guideIds.forEach(g => { if (!seen["#/guide/" + g]) fail(`#/guide/${g} has no door`); });
if (!seen["#/rights/disability-children"]) fail("#/rights/disability-children has no door");
if (!seen["#/tools"]) fail("#/tools (guided tools index) has no door");
const listedSegs = new Set(items.map(it => it.href.replace(/^#\//, "").split("/")[0]));
firstSegs.forEach(s => {
  if (!listedSegs.has(s) && !(s in OTHER_ROUTES) && !["specialty", "county"].includes(s)) fail(`route "${s}" has neither a door row nor an OTHER_ROUTES reason`);
});
if (!routeBody.includes("renderDoor(parts[0])")) fail("route() does not render the door pages");

// 4. Old tab-bar and Advocacy links still land on a door (tab highlight) and still have routes.
const expect = {
  "#/specialty": "find", "#/county": "find", "#/specialty/cardiology": "find", "#/county/cork": "find", "#/entry/x": "find",
  "#/specialty/crisis": "support", "#/specialty/dsv": "support", "#/advocacy": "rights", "#/advocacy/guide": "rights",
  "#/advocacy/schemes": "rights", "#/advocacy/templates": "act", "#/advocacy/hospitals": "act", "#/advocacy/contacts": "support",
  "#/advocacy/orgs": "support", "#/advocacy/general": "support", "#/advocacy/sar-builder": "act", "#/tools/complaints": "act",
  "#/tools/schemes": "rights", "#/rights/disability-children": "rights", "#/": "home", "#/find": "find", "#/support": "support",
};
Object.entries(expect).forEach(([h, d]) => { const got = doorForHash(h); if (got !== d) fail(`doorForHash(${h}) = ${got}, expected ${d}`); });
if (ALIASES["#/advocacy"] && !seen[ALIASES["#/advocacy"]]) fail("alias target has no door row");

// 5. Taps from Home: Home, then the door tab (1), then the row (2).
if (DOORS.length !== 4) fail("expected four doors");
DOORS.forEach(d => { if (!d.groups.length || d.groups.some(g => !g.items.length)) fail(`door ${d.id} has an empty group`); });

if (process.argv.includes("--table")) {
  console.log("| Route | Feature | Door | Taps from Home |\n|---|---|---|---|");
  items.forEach(it => console.log(`| \`${it.href}\` | ${it.label} | ${DOORS.find(d => d.id === it.door).title} | 2 |`));
  Object.entries(OTHER_ROUTES).forEach(([r, why]) => console.log(`| \`#/${r}\` | (${why}) | n/a | n/a |`));
  Object.entries(ALIASES).forEach(([a, t]) => console.log(`| \`${a}\` | alias of \`${t}\` | ${DOORS.find(d => d.id === doorForHash(a)).title} | 2 |`));
}
if (failed) { console.error(`${failed} problem(s)`); process.exit(1); }
console.log(`ok: ${items.length} door rows, ${DOORS.length} doors, no route listed twice, none orphaned`);
