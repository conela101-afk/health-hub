#!/usr/bin/env node
// Colour inventory ("token map") for the Four doors PR 4 colour refresh.
// Lists every colour literal in styles.css, index.html, manifest.json and the JS files (hex, rgb/rgba/hsl,
// named colours in colour properties, currentColor), with a count per value, where it is used and the
// proposed token. Plain Node, no dependencies, read-only.
//
//   node scripts/token-map.js                 # working tree
//   node scripts/token-map.js --ref=pre-pr4   # the files as they were at a git ref (the old baseline)
//
// The proposed-token column comes from the MAP table below; a value that is not in the table is printed as
// "UNMAPPED", and the script exits 1 so a new stray colour cannot slip in unnoticed.
const fs = require("fs"), path = require("path"), cp = require("child_process");
const root = path.join(__dirname, "..");
const refArg = process.argv.find(a => a.startsWith("--ref="));
const ref = refArg ? refArg.slice(6) : null;
const read = f => ref ? cp.execFileSync("git", ["show", ref + ":" + f], { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 })
                      : fs.readFileSync(path.join(root, f), "utf8");

// old value (lower case) -> [proposed token, note]
const MAP = {
  "#faf7f4": ["--paper (#F6F3EC)", "page background; also theme-color and manifest colours"],
  "#ffffff": ["--card (#FFFFFF)", "card and input surface"],
  "#fff": ["--on-fill (#FFFFFF)", "text on a plum or ink fill (skip link, active tab, buttons, badges)"],
  "#f4f0fb": ["--tint (#ECE6F6)", "second surface: contact blocks, letter text, log entries, small buttons"],
  "#2a2830": ["--ink (#1E1A2B)", "body text"],
  "#67636f": ["--soft (#5A5568)", "secondary text"],
  "#726b82": ["--soft (#5A5568)", "faint text merged into soft: faint failed 4.5:1 on the tint"],
  "#ece6f4": ["--line (#DDD6C8)", "decorative dividers and card outlines only"],
  "#8b7fe8": ["(removed)", "mid violet: focus border, checkbox accent, one gradient. Plum replaces it"],
  "#5f52ce": ["--plum (#2F1560)", "violet-deep: links, headings accents, filled buttons"],
  "#edeafb": ["--tint (#ECE6F6)", "violet-tint: callouts, tag pills, badges"],
  "#f0968e": ["(removed)", "mid coral: defined, never used"],
  "#c13729": ["--coral-deep (re-tuned)", "crisis, danger, error text"],
  "#fcebe9": ["--coral-tint (kept)", "crisis and disclaimer fill"],
  "#7dbba1": ["(removed)", "mid sage: defined, never used"],
  "#3e775e": ["--green (#1D6B45)", "sage-deep: urgent-care accent, tags"],
  "#e7f5ee": ["--mint (#CDEBD6)", "sage-tint: fills only"],
  "#e8b25e": ["(removed)", "mid sand: defined, never used"],
  "#896428": ["--sand-deep (#6B4F1B)", "sand text, merged with the hard-coded note colour"],
  "#fbf0de": ["--sand-tint (kept)", "warning and note fill"],
  "#6b4f1b": ["--sand-deep (#6B4F1B)", "was hard-coded twice in styles.css"],
  "#000": ["(kept, print only)", "@media print letter output: pure black on white is deliberate"],
  "transparent": ["(kept)", "keyword, not a palette colour"],
  "currentcolor": ["(kept)", "inline SVG strokes inherit the text colour"],
  "rgba(50,36,80,0.05)": ["(removed)", "--shadow-sm: cards become flat with a 1px border"],
  "rgba(60,40,95,0.07)": ["(removed)", "--shadow: cards become flat with a 1px border"],
  "rgba(60,40,95,0.05)": ["(removed)", "--shadow: cards become flat with a 1px border"],
  "rgba(60,40,95,0.12)": ["(removed)", "--shadow-lg: defined, never used"],
  "rgba(60,40,95,0.08)": ["(removed)", "tab bar top shadow becomes a 1px --line border"],
};
// New values that are legitimate after the refresh (used when the script runs on the working tree).
const NEW_OK = new Set(["#f6f3ec", "#ffffff", "#ddd6c8", "#857e92", "#1e1a2b", "#5a5568", "#2f1560", "#ece6f6",
  "#cdebd6", "#9fd2b1", "#1d6b45", "#b3301f", "#fcebe9", "#6b4f1b", "#fbf0de", "#000", "#fff", "transparent", "currentcolor"]);

const FILES = ["styles.css", "index.html", "manifest.json", "app.js", "tools.js", "doors.js", "start.js", "search.js", "data/facilities.js"];
const lit = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
const named = /\b(?:color|background(?:-color)?|border(?:-[a-z]+)?|fill|stroke|outline(?:-color)?|accent-color)\s*:\s*(white|black|red|green|blue|gray|grey|orange|yellow|transparent|currentColor)\b/gi;
const rows = new Map(); // value -> { count, where:Set }
const add = (v, where) => { v = v.toLowerCase().replace(/\s+/g, ""); if (!rows.has(v)) rows.set(v, { count: 0, where: new Set() }); const r = rows.get(v); r.count++; r.where.add(where); };

for (const f of FILES) {
  let text;
  try { text = read(f); } catch (e) { continue; }
  const lines = text.split("\n");
  let selector = f, inRoot = false;
  lines.forEach((line, i) => {
    if (f === "styles.css") {
      const m = line.match(/^\s*([^{}\/@][^{}]*)\{/);
      if (m) { selector = m[1].trim().replace(/\s+/g, " "); inRoot = selector === ":root"; }
      else if (/^\s*@/.test(line)) selector = line.trim().slice(0, 40);
    }
    const where = f === "styles.css" ? (inRoot ? ":root token (line " + (i + 1) + ")" : selector) : f + ":" + (i + 1);
    for (const x of line.matchAll(lit)) {
      if (f === "index.html" || f === "manifest.json") { if (!/theme|background_color|color/.test(line)) continue; }
      add(x[0], where);
    }
    for (const x of line.matchAll(named)) add(x[1], where);
    if (f !== "styles.css" && /stroke="currentColor"|fill="currentColor"/.test(line)) add("currentcolor", where);
  });
}

const sorted = [...rows.entries()].sort((a, b) => b[1].count - a[1].count);
let unmapped = 0;
console.log("| Old value | Count | Where used | Proposed token |");
console.log("|---|---|---|---|");
for (const [v, r] of sorted) {
  let m = MAP[v];
  if (!m && !ref && NEW_OK.has(v)) m = ["(current token value)", ""];
  if (!m) { unmapped++; m = ["UNMAPPED", ""]; }
  const wh = [...r.where]; const shown = wh.slice(0, 4).map(s => "`" + s.replace(/\|/g, "/") + "`").join(", ") + (wh.length > 4 ? ` and ${wh.length - 4} more` : "");
  console.log(`| \`${v}\` | ${r.count} | ${shown} | ${m[0]}${m[1] ? ": " + m[1] : ""} |`);
}
console.log("");
console.log(`${rows.size} distinct values, ${[...rows.values()].reduce((a, r) => a + r.count, 0)} occurrences${ref ? " at " + ref : ""}. ${unmapped} unmapped.`);
process.exit(unmapped ? 1 : 0);
