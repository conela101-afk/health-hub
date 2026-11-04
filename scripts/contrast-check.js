#!/usr/bin/env node
// WCAG contrast report for the colour tokens in styles.css (Four doors PR 4).
// Plain Node, no dependencies. Not a CI step (add one only if Elaine decides to).
//
//   node scripts/contrast-check.js                       # check styles.css :root, print every pair
//   node scripts/contrast-check.js --css other.css       # check another file (used to prove the script can fail)
//   node scripts/contrast-check.js --set soft=#999999    # override one token to try a value
//
// Thresholds (not weakened for any pair): 4.5 for body text, 3 for large text (24px, or 18.66px bold),
// and 3 for UI boundaries, icons and focus indicators (WCAG 1.4.3 and 1.4.11, 2.4.11 style focus).
// Exit code 1 if any pair FAILs or a structural rule below is broken.
const fs = require("fs"), path = require("path");
const args = process.argv.slice(2);
const cssPath = path.resolve(args.includes("--css") ? args[args.indexOf("--css") + 1] : path.join(__dirname, "..", "styles.css"));
const overrides = {};
args.forEach((a, i) => { if (a === "--set") { const [k, v] = args[i + 1].split("="); overrides[k.replace(/^--/, "")] = v; } });
const css = fs.readFileSync(cssPath, "utf8");

// ---- tokens from :root ----
const rootBlock = css.match(/:root\s*\{([^}]*)\}/);
if (!rootBlock) { console.log("FAIL no :root block in " + cssPath); process.exit(1); }
const T = {};
for (const m of rootBlock[1].matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\b/g)) T[m[1]] = m[2].toUpperCase();
Object.entries(overrides).forEach(([k, v]) => { T[k] = v.toUpperCase(); console.log(`(override) --${k} = ${v}`); });

const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = h => { const n = [1, 3, 5].map(i => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

let fails = 0, rows = 0;
const missing = new Set();
const val = n => { if (!T[n]) { missing.add(n); return null; } return T[n]; };
function check(group, label, fg, bg, need, where) {
  const f = val(fg), b = val(bg);
  if (!f || !b) { fails++; console.log(`FAIL  ${label.padEnd(44)} token missing (${!f ? fg : bg})`); return; }
  const r = ratio(f, b), ok = r >= need; rows++; if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}  need ${String(need).padEnd(3)}  ${label.padEnd(44)} ${f} on ${b}${where ? "  [" + where + "]" : ""}`);
}
const section = t => console.log("\n== " + t);

// ---- text pairs: [foreground token, background token, where it is used] ----
const BODY = 4.5, UI = 3, LARGE = 3;
section("Body text (4.5:1)");
const text = [
  ["ink", "paper", "body, headings, brand name, hero, door-group titles"],
  ["ink", "card", "card text, entry titles, door tiles, inputs"],
  ["ink", "tint", "callouts, letter text, log entries, hover on top-bar buttons"],
  ["ink", "coral-tint", "Calm mode paragraphs inside a disclaimer"],
  ["ink", "sand-tint", "Calm mode paragraphs inside a note"],
  ["ink", "mint", "Calm mode paragraphs inside a mint pill"],
  ["ink", "line", "hover on Calm mode and Exit buttons"],
  ["soft", "paper", "hero text, search label, section titles, footer, .checked-note, region headings"],
  ["soft", "card", "blurbs, row counts, inactive tabs, placeholder in search, banner text"],
  ["soft", "tint", "Calm and Exit buttons, contact labels, .source-note and .checked-note in the AskCI callout, crisis contact names"],
  ["soft", "coral-tint", "any soft text placed on a crisis fill"],
  ["soft", "sand-tint", "any soft text placed on a note fill"],
  ["soft", "mint", "any soft text placed on a mint fill"],
  ["plum", "paper", "links, back link, hero emphasis, footer links, section labels"],
  ["plum", "card", "links in cards, org links, scheme links, detail titles"],
  ["plum", "tint", "tag pills, copy buttons, callout emphasis, step badges, summary toggles"],
  ["plum", "mint", "plum text placed on a mint fill"],
  ["green", "card", "urgent-care link and icon"],
  ["green", "paper", "green text on the page"],
  ["green", "tint", "green text on the tint"],
  ["green", "mint", "tag and badge text on mint (the green family's own tint)"],
  ["coral-deep", "coral-tint", "Crisis support link, danger button, disclaimer (the coral family's own tint)"],
  ["coral-deep", "card", "crisis icon, crisis contact numbers"],
  ["coral-deep", "paper", "form error text"],
  ["coral-deep", "tint", "crisis contact numbers on the tint"],
  ["sand-deep", "sand-tint", "notes, NI badge, sand tags (the sand family's own tint)"],
  ["sand-deep", "card", "scheme preparation summary"],
  ["sand-deep", "paper", "sand text on the page"],
  ["sand-deep", "tint", "sand text on the tint"],
  ["on-fill", "plum", "Search, Calm mode on, active tab, map button, pressed pill, selection"],
  ["on-fill", "ink", "skip link"],
];
text.forEach(([f, b, w]) => check("text", `${f} text on ${b}`, f, b, BODY, w));

section("Large text (3:1: 24px, or 18.66px bold)");
check("large", "ink heading on paper", "ink", "paper", LARGE, "Home heading 33px, page titles 26px");
check("large", "plum emphasis on paper", "plum", "paper", LARGE, "hero emphasis 33px");

section("Link text (body size, 4.5:1)");
check("link", "plum link on paper", "plum", "paper", BODY, "back link, footer, Official source link");
check("link", "plum link on card", "plum", "card", BODY, "scheme, resource and contact links");
check("link", "plum link on tint", "plum", "tint", BODY, "AskCI link, callout links");
console.log(`info  ${ratio(val("plum"), val("soft")).toFixed(2).padStart(5)}  plum link vs soft body text is under 3:1, so a link inside a sentence must be underlined (checked by axe link-in-text-block); standalone links are identified by position and weight`);

section("Placeholder text (4.5:1)");
check("placeholder", "soft placeholder on card", "soft", "card", BODY, "search field, text areas and inputs");

section("UI boundaries of anything you press or type in (3:1 against what is next to it)");
["paper", "card", "tint"].forEach(b => check("ui", `border-strong on ${b}`, "border-strong", b, UI, "inputs, selects, search field, pills, tabs, tiles, rows, options"));
check("ui", "plum fill (active tab) on paper", "plum", "paper", UI, "active segment and filled buttons");
check("ui", "plum fill (active tab) on card", "plum", "card", UI, "buttons on cards");
check("ui", "plum fill (active tab) on tint", "plum", "tint", UI, "buttons on the tint");

section("Icons and bars (3:1)");
check("ui", "soft icon on card", "soft", "card", UI, "tab bar icons, chevrons, search icon");
check("ui", "plum icon on card", "plum", "card", UI, "active tab icon and top bar");
check("ui", "green icon on card", "green", "card", UI, "urgent-care icon and edge");
check("ui", "coral-deep icon on card", "coral-deep", "card", UI, "crisis icon and edge");

section("Focus ring (3:1 against every colour it can sit beside)");
["paper", "card", "tint", "mint", "coral-tint", "sand-tint"].forEach(b => check("focus", `plum ring on ${b}`, "plum", b, UI, "outline 3px, offset 2px"));

section("Calm mode");
console.log("Calm mode only scales sizes, raises .simple-mode text to --ink (pairs above) and keeps every token. No separate colour set.");
check("calm", "Calm mode button on: on-fill on plum", "on-fill", "plum", BODY, "[aria-pressed=true]");
check("calm", "Calm mode text: ink on card", "ink", "card", BODY, "p, li, blurb, remit, detail, summary");
check("calm", "Calm mode text: ink on paper", "ink", "paper", BODY, "p, li on the page");

section("Not allowed (documented, expected to be below the threshold, not counted)");
for (const [f, b, w] of [["mint", "paper", "mint as text on a light background"], ["mint", "card", "mint as text on white"], ["line", "paper", "--line as a control boundary"], ["mint-border", "paper", "--mint-border as a control boundary"]]) {
  const r = ratio(val(f) || "#000000", val(b) || "#000000");
  console.log(`${r < 3 ? "ok  " : "NOTE"}  ${r.toFixed(2).padStart(5)}  ${w} (${f} on ${b})`);
}

// ---- structural rules read from styles.css ----
section("Rules checked in " + path.basename(cssPath));
const ruleOk = (name, ok, extra) => { rows++; if (!ok) fails++; console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : "  " + extra}`); };
const outside = css.replace(/:root\s*\{[^}]*\}/, "");
const hex = [...outside.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(m => m[0].toLowerCase()).filter(h => h !== "#000");
ruleOk("no hard-coded colour outside :root (print #000 excepted)", hex.length === 0, hex.join(", "));
ruleOk("no rgb()/hsl() colour outside :root", !/(rgba?|hsla?)\(/.test(outside), "");
ruleOk("no gradients", !/gradient\(/.test(css), "");
ruleOk("no colour shadows used as boundaries", !/box-shadow\s*:\s*(?!none)/.test(css), "");
// every pressable box must use --border-strong, never --line
const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => [m[1].trim().replace(/\s+/g, " "), m[2]]);
const pressable = [".search-field", ".prep-input", ".pill", ".simple-list .row", ".entry-card", ".org-card", ".segment", ".guided-link", ".door-tile", ".start-option", ".home-start"];
pressable.forEach(sel => {
  const r = rules.find(([s]) => s === sel);
  const body = r ? r[1] : "";
  const ok = !!r && /border\s*:[^;]*var\(--border-strong\)/.test(body) && !/border\s*:[^;]*var\(--line\)/.test(body);
  ruleOk(`${sel} has a --border-strong boundary`, ok, r ? "border is not --border-strong" : "rule not found");
});
// every colour token used as text or fill in a rule is covered by a pair above
const covFg = new Set(text.map(t => t[0]).concat(["plum", "green", "coral-deep", "sand-deep"]));
const covBg = new Set(text.map(t => t[1]).concat(["card"]));
const usedFg = new Set(), usedBg = new Set();
for (const [, body] of rules) {
  for (const m of body.matchAll(/(?:^|[;\s])color\s*:\s*var\(--([a-z-]+)\)/g)) usedFg.add(m[1]);
  for (const m of body.matchAll(/background(?:-color)?\s*:\s*var\(--([a-z-]+)\)/g)) usedBg.add(m[1]);
}
const uncFg = [...usedFg].filter(t => !covFg.has(t)), uncBg = [...usedBg].filter(t => !covBg.has(t));
ruleOk("every text colour token used in a rule has a pair above", uncFg.length === 0, uncFg.join(", "));
ruleOk("every background token used in a rule has a pair above", uncBg.length === 0, uncBg.join(", "));
ruleOk("every token referenced exists in :root", ![...css.matchAll(/var\(--([a-z0-9-]+)\)/g)].some(m => !T[m[1]] && !["font", "font-display", "radius", "radius-sm", "radius-lg", "radius-pill"].includes(m[1])), "undefined token");

console.log(`\n${fails ? "FAILED" : "ALL PASS"}: ${rows} checks, ${fails} failing.${missing.size ? " Missing tokens: " + [...missing].join(", ") : ""}`);
process.exit(fails ? 1 : 0);
