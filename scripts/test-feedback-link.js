// Checks the feedback form link. Plain Node. Run: node scripts/test-feedback-link.js
// The footer must link to exactly the expected form, open it in a new tab with noopener, say that it is a Google
// Form in a new tab, say it does not ask for an email, and ask people not to include personal or health details.
// Any other Google Form or forms.gle URL anywhere in the repo's text files is a failure, so an old link cannot
// linger in the README, the docs or a script. To change the form, change EXPECTED here and in index.html.
const fs = require("fs"), path = require("path");
const EXPECTED = "https://forms.gle/euhDXPnx8vw1msnR6";
const root = path.join(__dirname, "..");
let failed = 0;
const fail = m => { failed++; console.error("FAIL " + m); };

const SKIP = new Set([".git", "node_modules", "vendor", "assets", "icons"]);
const TEXT = /\.(html|js|css|json|md|txt|yml|yaml|sh|py|csv)$/;
const files = [];
(function walk(dir){
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = path.join(dir, name), st = fs.statSync(p);
    if (st.isDirectory()) walk(p); else if (TEXT.test(name) && st.size < 5e6) files.push(p);
  }
})(root);

const FORM = /https?:\/\/(?:forms\.gle|docs\.google\.com\/forms)[^\s"'<>)\]`]*/g;
let total = 0;
files.forEach(f => {
  const found = fs.readFileSync(f, "utf8").match(FORM) || [];
  found.forEach(u => { total++; if (u !== EXPECTED) fail(`${path.relative(root, f)}: ${u} is not the expected feedback form`); });
});
if (total === 0) fail("no feedback form link found at all");

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const footer = html.slice(html.indexOf("<footer"), html.indexOf("</footer>"));
const anchors = [...footer.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].filter(m => m[1].includes("forms.gle") || m[1].includes("docs.google.com/forms"));
if (anchors.length !== 1) fail(`expected one feedback link in the footer, found ${anchors.length}`);
else {
  const tag = anchors[0][0];
  if (anchors[0][1] !== EXPECTED) fail(`footer link is ${anchors[0][1]}`);
  if (!/target="_blank"/.test(tag)) fail("footer link must open in a new tab");
  if (!/rel="[^"]*noopener/.test(tag)) fail("footer link needs rel=noopener");
}
const text = footer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
if (!/opens a Google Form in a new tab/.test(text)) fail("footer must say the link opens a Google Form in a new tab");
if (!/doesn't ask for your email/.test(text)) fail("footer must say the form does not ask for an email");
if (!/don't include personal or health details/.test(text)) fail("footer must ask people not to include personal or health details");

if (failed) { console.error(`${failed} problem(s)`); process.exit(1); }
console.log(`ok: ${total} feedback form link(s) in ${files.length} text files, all ${EXPECTED}`);
