// Generates the route list from the router in app.js, TOOL_PAGES in app.js, TOOL_LIST in tools.js and the
// specialty and county lists in data.js, then assigns every route to a door (doors.js) or to "intentionally
// none". Exits 1 if any route is unassigned, listed under two doors, or points at a route that does not exist.
// Run: node scripts/test-doors.js      Add --table to print the Markdown route table for the PR description.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const { DOORS, OTHER_ROUTES, ALIASES, items, doorForHash } = require(path.join(root, "doors.js"));

const app = read("app.js"), tools = read("tools.js");
const data = vm.runInNewContext(read("data.js") + "\n({ SPECIALTIES, COUNTIES })", {});
let failed = 0;
const fail = m => { failed++; console.error("FAIL " + m); };

// ---- 1. Build the route list from the code ----
const routeBody = app.slice(app.indexOf("function route()"), app.indexOf('window.addEventListener("hashchange"'));
const firstSegs = [...new Set([...routeBody.matchAll(/parts\[0\] === "([a-z-]+)"/g)].map(m => m[1]))];
const advocacy = [...app.match(/const ADVOCACY_SECTIONS = \[([\s\S]*?)\];/)[1].matchAll(/id: "([a-z-]+)"/g)].map(m => m[1]);
const toolIds = [...tools.match(/const TOOL_LIST = \[([\s\S]*?)\n  \];/)[1].matchAll(/id: "([a-z]+)"/g)].map(m => m[1]);
const aboutIds = [...tools.match(/const pages = \{([\s\S]*?)\n    \};/)[1].matchAll(/^      "?([a-z-]+)"?: \{/gm)].map(m => m[1]);
const guideIds = [...read("data/guides.js").matchAll(/^\/\/\s+#\/guide\/([a-z-]+)/gm)].map(m => m[1]);
const rightsPages = [...tools.matchAll(/name === "([a-z-]+)"\)\{ renderRights/g)].map(m => m[1]);
const toolPageHrefs = [...app.match(/const TOOL_PAGES = \[([\s\S]*?)\n  \];/)[1].matchAll(/href: "(#[^"]*)"/g)].map(m => m[1]);

const routes = new Set(["#/"]);
// Every first segment in the router. These three only work with a second segment (bare ones fall back to Home).
firstSegs.filter(s => !["about", "guide", "rights"].includes(s)).forEach(s => routes.add("#/" + s));
routes.add(app.match(/const PRIVATE_SEARCH_HASH = "(#[^"]+)"/)[1]);
DOORS.forEach(d => routes.add(d.href));
advocacy.forEach(a => routes.add("#/advocacy/" + a));
routes.add("#/advocacy/sar-builder");
toolIds.forEach(t => routes.add("#/tools/" + t));
aboutIds.forEach(a => routes.add("#/about/" + a));
guideIds.forEach(g => routes.add("#/guide/" + g));
rightsPages.forEach(r => routes.add("#/rights/" + r));
data.SPECIALTIES.forEach(s => routes.add("#/specialty/" + s.id));
data.COUNTIES.forEach(c => routes.add("#/county/" + c.id));
toolPageHrefs.forEach(h => routes.add(h));
// Routes that take an id or a query: one example each, assigned like their parent.
const DYNAMIC = ["#/entry/:id", "#/facilities/:id", "#/conditions/:id", "#/vaccines/:id", "#/search/:query"];
if (!aboutIds.length || !guideIds.length || !rightsPages.length || !toolIds.length || !advocacy.length) fail("route generation found an empty source");

// ---- 2. Assign each route ----
const noneSegs = new Set(Object.keys(OTHER_ROUTES));
const hubs = new Set(DOORS.map(d => d.href));
function assign(r){
  const seg = r.replace(/^#\/?/, "").split("/")[0];
  if (hubs.has(r)) return { door: DOORS.find(d => d.href === r).id, how: "hub page" };
  if (r === "#/") return { door: "home", how: "Home" };
  const exact = items.find(it => it.href === r);
  if (exact) return { door: exact.door, how: "row on its hub" };
  if (ALIASES[r]) return { door: doorForHash(r), how: `alias of \`${ALIASES[r]}\`` };
  if (noneSegs.has(seg) && !items.some(it => it.href.split("/")[1] === seg)) return { door: "none", how: OTHER_ROUTES[seg] };
  const d = doorForHash(r.replace(/:[a-z]+$/, "x"));
  return d ? { door: d, how: "follows its parent route" } : null;
}
const table = [...routes, ...DYNAMIC].sort((a, b) => a.localeCompare(b)).map(r => ({ route: r, ...assign(r) }));
table.filter(t => !t.door).forEach(t => fail(`${t.route} is not assigned to a door or to "intentionally none"`));

// ---- 3. Consistency of doors.js ----
const seen = {};
items.forEach(it => { (seen[it.href] = seen[it.href] || []).push(it.door); });
Object.entries(seen).forEach(([h, d]) => { if (d.length > 1) fail(`${h} is listed under more than one door: ${d.join(", ")}`); });
items.forEach(it => { if (!routes.has(it.href)) fail(`${it.href} is listed on a hub but is not a route`); });
noneSegs.forEach(s => { if (s && !routes.has("#/" + s) && !DYNAMIC.some(d => d.startsWith("#/" + s + "/"))) fail(`OTHER_ROUTES lists "${s}" but there is no such route`); });
if (!routeBody.includes("renderDoor(")) fail("route() does not render the hub pages");
if (DOORS.length < 4) fail("expected at least the four doors");   // a fifth hub can be added to doors.js later without other changes
DOORS.forEach(d => { if (!d.groups.length || d.groups.some(g => !g.items.length)) fail(`door ${d.id} has an empty group`); });
// The bottom tab bar is not part of this redesign and must still point at its four routes.
const tabHrefs = [...read("index.html").match(/<nav class="tabbar"[\s\S]*?<\/nav>/)[0].matchAll(/href="([^"]+)"/g)].map(m => m[1]);
if (tabHrefs.join() !== "#/,#/specialty,#/county,#/advocacy") fail(`bottom tabs changed: ${tabHrefs.join()}`);

if (process.argv.includes("--table")) {
  const name = id => id === "none" ? "Intentionally none" : id === "home" ? "Home" : DOORS.find(d => d.id === id).title;
  const taps = t => t.how === "hub page" ? "1" : t.how === "row on its hub" || t.how.startsWith("alias") ? "2" : t.door === "none" || t.door === "home" ? "n/a" : /specialty\/|county\//.test(t.route) ? "3" : "from a list";
  console.log("| Route | Door | How it is placed | Taps from Home |\n|---|---|---|---|");
  table.forEach(t => console.log(`| \`${t.route}\` | ${name(t.door)} | ${t.how} | ${taps(t)} |`));
  console.error(`${table.length} routes`);
}
if (failed) { console.error(`${failed} problem(s)`); process.exit(1); }
console.log(`ok: ${table.length} routes assigned (${items.length} hub rows, ${table.filter(t => t.door === "none").length} intentionally none), none unassigned or listed twice`);
