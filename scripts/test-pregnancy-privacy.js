// Privacy checks for the pregnancy information page and its directory rows (brief of 23 Oct 2026).
// Run: node scripts/test-pregnancy-privacy.js
const fs = require("fs"), vm = require("vm"), assert = require("assert");
const read = f => fs.readFileSync(f, "utf8");
let failed = 0;
const test = (name, fn) => { try { fn(); console.log("ok  ", name); } catch (e) { failed++; console.log("FAIL", name, "-", e.message); } };

const page = read("data/pregnancy.js");
const app = read("app.js");
const sw = read("sw.js");
const HHSearch = require("../search.js");

test("page never touches storage, cookies, network or the address", () => {
  const code = page.replace(/\/\/.*$/gm, "");
  [/localStorage|sessionStorage|indexedDB|document\.cookie/, /\bfetch\s*\(|XMLHttp[R]equest|sendBeac[o]n|WebSocket/, /\blocation\.|\bhistory\.(push|replace|back)|readStore|writeStore/, /<form|<input|<textarea|<iframe|<script|<img|<link/i]
    .forEach(re => assert(!re.test(code), "found " + re));
});

test("every outbound link opens with noopener noreferrer", () => {
  const anchors = page.match(/<a [^>]*target="_blank"[^>]*>/g) || [];
  assert(anchors.length > 0);
  anchors.forEach(a => assert(/rel="noopener noreferrer"/.test(a), a));
  assert(/rel="noopener noreferrer"/.test(page));
});

test("route and page title are neutral", () => {
  assert(/parts\[0\] === "pregnancy"/.test(app));
  assert(/<h1>Pregnancy information<\/h1>/.test(page));
  assert(!/<h1>[^<]*(abortion|termination|NIPT)/i.test(page));
  assert(/neutralTitle \|\| "Pregnancy information"/.test(app));
});

test("guide pages never touch storage, network or the address, and links are safe", () => {
  const code = read("data/guides.js").replace(/\/\/.*$/gm, "");
  [/localStorage|sessionStorage|indexedDB|document\.cookie/, /\bfetch\s*\(|XMLHttp[R]equest|sendBeac[o]n/, /\blocation\.|readStore|writeStore/, /<form|<input|<iframe|<script|<img/i]
    .forEach(re => assert(!re.test(code), "found " + re));
  assert(/rel="noopener noreferrer"/.test(code));
  assert(!/€|\bEUR\b|\b1[58]00[ -]?\d{3}/.test(code), "amount or phone number in guides");
  assert(/data\/guides\.js/.test(sw));
});

test("service worker precaches the page file and has no recent-pages list", () => {
  assert(/data\/pregnancy\.js/.test(sw));
  assert(!/recent|history/i.test(sw.replace(/\/\/.*$/gm, "")));
});

test("sensitive searches are routed away from the address bar", () => {
  ["abortion", "Termination of pregnancy", "my options", "NIPT", "fetal anomaly", "pregnancy scan", "3 day wait"]
    .forEach(q => assert(HHSearch.isSensitiveQuery(q), q));
  ["domestic violence", "Sexual assault", "rape crisis", "coercive control", "human trafficking"]
    .forEach(q => assert(HHSearch.sensitiveRoute(q) === "#/specialty/dsv", q));
  assert(HHSearch.sensitiveRoute("abortion") === "#/pregnancy");
  ["substance abuse", "drug abuse", "grape", "knee", "mammogram"].forEach(q => assert(!HHSearch.isSensitiveQuery(q), q));
  ["knee", "mammogram", "pregnancy", "miscarriage", "topical cream", "scanning"].forEach(q => assert(!HHSearch.isSensitiveQuery(q), q));
  assert(/HHSearch\.isSensitiveQuery\(q\)/.test(app) && /HHSearch\.isSensitiveQuery\(query\)/.test(app));
});

test("directory rows are flagged sensitive, unverified and carry no contact or fee data", () => {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(read("data.js") + "\nthis.E=ENTRIES;", ctx);
  const rows = ctx.E.filter(e => /^preg-/.test(e.id));
  assert(rows.length >= 15, "expected the candidate rows, found " + rows.length);
  rows.forEach(e => {
    assert(e.sensitive === true, e.id + " not sensitive");
    assert(e.verify === true && !e.checked, e.id + " must be verify: true with no checked date");
    assert(!e.contact.phone && !e.contact.email && !e.contact.address, e.id + " has contact data");
    assert(!/€|\bEUR\b|\bprice\b/i.test([e.blurb].concat(e.details || []).join(" ")), e.id + " mentions a fee");
    assert(!/abortion|terminat|nipt/i.test(e.id), e.id + " id is not neutral");
  });
});

test("every sensitive row has a neutral tab title, and violence-support rows are flagged", () => {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(read("data.js") + "\nthis.E=ENTRIES;", ctx);
  ["hse-satu-help", "hse-cafmas", "hse-human-trafficking", "hse-womens-health-service"].forEach(id => {
    const e = ctx.E.find(x => x.id === id);
    assert(e && e.sensitive === true && e.neutralTitle, id + " needs sensitive: true and a neutralTitle");
    assert(!/rape|sexual|abuse|traffick|sex industry/i.test(e.neutralTitle), id + " title is not neutral");
  });
});

test("service worker runtime cache is an allowlist, not everything fetched", () => {
  const code = sw.replace(/\/\/.*$/gm, "");
  assert(/CACHEABLE\s*=\s*new Set\(ASSETS/.test(code), "CACHEABLE allowlist missing");
  assert(/response\.ok && CACHEABLE\.has\(/.test(code), "cache.put is not gated by the allowlist");
  assert(!/localStorage|sessionStorage|indexedDB/.test(code));
});

test("sensitive topics without a page are searched under a neutral heading", () => {
  ["eating disorder", "Anorexia", "miscarriage", "perinatal mental health", "self harm", "suicide", "abortion", "domestic violence"]
    .forEach(q => assert(HHSearch.isPrivateSearch(q), q));
  ["knee", "pregnancy", "mental health", "substance abuse", "mammogram"].forEach(q => assert(!HHSearch.isPrivateSearch(q), q));
  assert(/<h1>\$\{neutral \? "Search results"/.test(app), "results heading not neutral for private searches");
  assert(/hash === PRIVATE_SEARCH_HASH/.test(app));
});

test("app has no recent-searches, history or favourites list", () => {
  const code = (app + read("tools.js")).replace(/\/\/.*$/gm, "");
  assert(!/recentSearch|searchHistory|recentlyViewed|favourites?Key|FAVOURITE|saveSearch/i.test(code));
  assert(!/Notification\.requestPermission|navigator\.share|\bpushManager\b/.test(code));
});

process.exit(failed ? 1 : 0);
