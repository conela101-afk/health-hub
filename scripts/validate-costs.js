// Validates COSTS in data/costs.js. Run: node scripts/validate-costs.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE_DOMAINS = ["hse.ie", "gov.ie", "citizensinformation.ie", "nidirect.gov.uk", "health-ni.gov.uk", "hscni.net"];
const hostAllowed = h => SOURCE_DOMAINS.some(d => h === d || h.endsWith("." + d));
const KINDS = ["medicines", "gp", "hospital", "crossborder", "other"];
const CURRENCIES = ["EUR", "GBP"];
const CAP_UNITS = ["person", "family", null];
const CLINICAL_WORDING = /\b(should take|you should treat|diagnos(e|ing)\b|treat with)\b/i;

function validate({ COSTS }){
  const errors = [];
  const ids = new Set(COSTS.map(c => c.id));
  const seen = new Set();
  COSTS.forEach(c => {
    const w = `cost row "${c.id}"`;
    if (seen.has(c.id)) errors.push(`${w}: duplicate id`);
    seen.add(c.id);
    if (!["ROI", "NI"].includes(c.jurisdiction)) errors.push(`${w}: jurisdiction must be ROI or NI`);
    if (!KINDS.includes(c.kind)) errors.push(`${w}: kind must be one of ${KINDS.join(", ")}`);
    if (!CURRENCIES.includes(c.currency)) errors.push(`${w}: currency must be EUR or GBP`);
    if (c.jurisdiction === "NI" && c.currency !== "GBP") errors.push(`${w}: NI rows use GBP`);
    if (c.jurisdiction === "ROI" && c.currency !== "EUR") errors.push(`${w}: ROI rows use EUR`);
    if (!CAP_UNITS.includes(c.cap_unit === undefined ? null : c.cap_unit)) errors.push(`${w}: cap_unit must be person, family or null`);
    if (c.cap_amount !== null && c.cap_amount !== undefined && (typeof c.cap_amount !== "number" || !c.cap_period)) errors.push(`${w}: a cap_amount needs a numeric value and a cap_period`);
    ["scheme", "who", "covers", "cost", "source_url", "source_name", "last_verified"].forEach(k => { if (!c[k]) errors.push(`${w}: missing ${k}`); });
    if (typeof c.volatile !== "boolean") errors.push(`${w}: volatile must be true or false`);
    if (c.volatile && !c.volatile_reason) errors.push(`${w}: volatile rows need volatile_reason`);
    if (c.cap_amount && !c.volatile) errors.push(`${w}: money figures must be flagged volatile`);
    if (c.compare && (!ids.has(c.compare) || c.compare === c.id)) errors.push(`${w}: compare "${c.compare}" is not another row`);
    try { if (!hostAllowed(new URL(c.source_url).hostname)) errors.push(`${w}: source_url host is not on the official-domain allow-list`); }
    catch (e) { errors.push(`${w}: source_url is not a valid URL`); }
    ["last_verified", "source_page_review_date", "opened"].forEach(k => { if (c[k] && !/^\d{4}-\d{2}-\d{2}$/.test(c[k])) errors.push(`${w}: ${k} must be YYYY-MM-DD`); });
    if (CLINICAL_WORDING.test([c.who, c.covers, c.cost, c.route_note].join(" "))) errors.push(`${w}: clinical-instruction wording`);
  });
  return errors;
}

module.exports = { validate };

if (require.main === module){
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/costs.js"), "utf8") + "\nthis.COSTS = COSTS;", ctx);
  const errors = validate(ctx);
  if (errors.length){ errors.forEach(e => console.log("FAIL", e)); process.exit(1); }
  console.log(`ok  ${ctx.COSTS.length} cost rows`);
}
