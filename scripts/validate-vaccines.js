// Validates VACCINES in data/vaccines.js. Run: node scripts/validate-vaccines.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE_DOMAINS = [
  "hse.ie", "gov.ie", "citizensinformation.ie", "hiqa.ie", "nidirect.gov.uk", "health-ni.gov.uk", "hscni.net",
];
const hostAllowed = h => SOURCE_DOMAINS.some(d => h === d || h.endsWith("." + d));
const JURISDICTIONS = ["ROI", "NI"];
const SETTINGS = ["gp", "pharmacy", "hospital", "private"];
const ADMIN_FEES = ["free", "private_discretionary", "standard", "private", "not_applicable"];
const CLINICAL_WORDING = /\b(should take|you should treat|diagnos(e|ing)\b|treat with)\b/i;

function validate({ VACCINES, VACCINE_STATUS_LABELS }){
  const errors = [];
  const ids = new Set(VACCINES.map(v => v.id));
  const seen = new Set();
  VACCINES.forEach(v => {
    const w = `vaccine row "${v.id}"`;
    if (seen.has(v.id)) errors.push(`${w}: duplicate id`);
    seen.add(v.id);
    if (!JURISDICTIONS.includes(v.jurisdiction)) errors.push(`${w}: jurisdiction must be ROI or NI`);
    if (!VACCINE_STATUS_LABELS[v.status]) errors.push(`${w}: unknown status "${v.status}"`);
    if (!Array.isArray(v.setting) || !v.setting.length || v.setting.some(s => !SETTINGS.includes(s))) errors.push(`${w}: setting must be a non-empty list of ${SETTINGS.join(", ")}`);
    if (!ADMIN_FEES.includes(v.admin_fee)) errors.push(`${w}: admin_fee must be one of ${ADMIN_FEES.join(", ")}`);
    ["vaccine", "who", "product_cost", "source_url", "source_name", "last_verified"].forEach(k => { if (!v[k]) errors.push(`${w}: missing ${k}`); });
    if (typeof v.volatile !== "boolean") errors.push(`${w}: volatile must be true or false`);
    if (v.volatile && !v.volatile_reason) errors.push(`${w}: volatile rows need volatile_reason`);
    if (v.compare && (!ids.has(v.compare) || v.compare === v.id)) errors.push(`${w}: compare "${v.compare}" is not another row`);
    if (v.admin_fee === "private_discretionary" && !(v.fee_waived_if || []).length) errors.push(`${w}: a discretionary fee needs fee_waived_if cards`);
    if (v.status === "private" && v.product_cost === "Free") errors.push(`${w}: private status can't have a free product`);
    try { if (!hostAllowed(new URL(v.source_url).hostname)) errors.push(`${w}: source_url host is not on the official-domain allow-list`); }
    catch (e) { errors.push(`${w}: source_url is not a valid URL`); }
    ["valid_from", "valid_to", "last_verified", "source_page_review_date"].forEach(k => { if (v[k] && !/^\d{4}-\d{2}-\d{2}$/.test(v[k])) errors.push(`${w}: ${k} must be YYYY-MM-DD`); });
    if (/budget 2027/i.test(JSON.stringify(v))) errors.push(`${w}: mentions "Budget 2027"`);
    if (CLINICAL_WORDING.test([v.who, v.clinician_check, v.not_covered_note].join(" "))) errors.push(`${w}: clinical-instruction wording`);
    if (v.verify === true && v.urlStatus === "opened" && !v.last_verified) errors.push(`${w}: opened without last_verified`);
  });
  return errors;
}

module.exports = { validate };

if (require.main === module){
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/vaccines.js"), "utf8") + "\nthis.VACCINES = VACCINES; this.VACCINE_STATUS_LABELS = VACCINE_STATUS_LABELS;", ctx);
  const errors = validate(ctx);
  if (errors.length){ errors.forEach(e => console.log("FAIL", e)); process.exit(1); }
  console.log(`ok  ${ctx.VACCINES.length} vaccine rows`);
}
