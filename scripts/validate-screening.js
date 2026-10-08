// Validates SCREENING in data/screening.js. Run: node scripts/validate-screening.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE_DOMAINS = ["hse.ie", "gov.ie", "citizensinformation.ie", "screeningservice.ie", "nidirect.gov.uk", "health-ni.gov.uk", "hscni.net"];
const hostAllowed = h => SOURCE_DOMAINS.some(d => h === d || h.endsWith("." + d));
const JURISDICTIONS = ["ROI", "NI"];
const CLINICAL_WORDING = /\b(should take|you should treat|diagnos(e|ing)\b|treat with)\b/i;
const CONTACT_DETAILS = /(\b\d{3,5}[ -]?\d{3}[ -]?\d{3,4}\b|\b1800\b|\b0800\b|@[a-z0-9-]+\.[a-z]{2,})/i;

function validate({ SCREENING, SCREENING_KIND_LABELS }){
  const errors = [];
  const ids = new Set(SCREENING.map(r => r.id));
  const seen = new Set();
  SCREENING.forEach(r => {
    const w = `screening row "${r.id}"`;
    if (seen.has(r.id)) errors.push(`${w}: duplicate id`);
    seen.add(r.id);
    if (!JURISDICTIONS.includes(r.jurisdiction)) errors.push(`${w}: jurisdiction must be ROI or NI`);
    if (!SCREENING_KIND_LABELS[r.kind]) errors.push(`${w}: unknown kind "${r.kind}"`);
    ["programme", "who", "interval", "how_invited", "source_url", "source_name", "last_verified"].forEach(k => { if (!r[k]) errors.push(`${w}: missing ${k}`); });
    if (typeof r.volatile !== "boolean") errors.push(`${w}: volatile must be true or false`);
    if (r.volatile && !r.volatile_reason) errors.push(`${w}: volatile rows need volatile_reason`);
    if (r.verify !== true && !r.opened) errors.push(`${w}: a row can only drop verify after its page was opened`);
    if (r.compare && (!ids.has(r.compare) || r.compare === r.id)) errors.push(`${w}: compare "${r.compare}" is not another row`);
    if (r.compare && ids.has(r.compare) && SCREENING.find(x => x.id === r.compare).jurisdiction === r.jurisdiction) errors.push(`${w}: compare must point to the other jurisdiction`);
    try { if (!hostAllowed(new URL(r.source_url).hostname)) errors.push(`${w}: source_url host is not on the official-domain allow-list`); }
    catch (e) { errors.push(`${w}: source_url is not a valid URL`); }
    ["last_verified", "opened"].forEach(k => { if (r[k] && !/^\d{4}-\d{2}-\d{2}$/.test(r[k])) errors.push(`${w}: ${k} must be YYYY-MM-DD`); });
    const text = [r.who, r.interval, r.how_invited, r.if_outside, r.cost, r.note].join(" ");
    if (CLINICAL_WORDING.test(text)) errors.push(`${w}: clinical-instruction wording`);
    if (CONTACT_DETAILS.test(text)) errors.push(`${w}: phone number or email in text (link to the page instead)`);
  });
  return errors;
}

module.exports = { validate };

if (require.main === module){
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/screening.js"), "utf8") + "\nthis.SCREENING = SCREENING; this.SCREENING_KIND_LABELS = SCREENING_KIND_LABELS;", ctx);
  const errors = validate(ctx);
  if (errors.length){ errors.forEach(e => console.log("FAIL", e)); process.exit(1); }
  console.log(`ok  ${ctx.SCREENING.length} screening rows`);
}
