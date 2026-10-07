// Validates ENTRIES in data.js. Run: node scripts/validate-data.js
// Exports validate() so scripts/test-validate-data.js can test the rules.
//
// Later rules: urlStatus is one of opened, search-result, unverified; an entry with a
// urlStatus and no `checked` date must be verify: true; any source_url must be on the
// official-domain allow-list; verify: true entries may not put a phone, email or Eircode
// in the blurb or details or use clinical-instruction wording; no field may mention
// "Budget 2027" (the Budget is on 6 Oct 2026, so nothing can be stated yet).
//
// Rules: unique ids; county ids come from COUNTIES (26 counties + NI + national);
// specialty ids from SPECIALTIES; optional `area` must exist in AREAS and belong
// to one of the entry's counties; `urlStatus` is "opened" or "search-result";
// a `verify: true` entry needs a source_url and may not carry a phone, email or
// address unless a human opened the page (urlStatus: "opened").
const URL_STATUSES = ["opened", "search-result", "unverified"];

// A host matches if it equals a domain or is a subdomain of it, so hse.ie also covers
// www2.hse.ie and www2.healthservice.hse.ie. Charity and non-HSE hosts (for example
// lauralynn.ie, jigsaw.ie, diabetes.ie) are deliberately NOT listed: add one only after
// a person approves it.
const SOURCE_DOMAINS = [
  "hse.ie", "gov.ie", "citizensinformation.ie", "irishstatutebook.ie", "oireachtas.ie", "lawreform.ie",
  "hiqa.ie", "mhcirl.ie", "dataprotection.ie", "oco.ie", "ombudsman.ie", "oic.ie",
  "medicalcouncil.ie", "nmbi.ie", "coru.ie", "thepsi.ie", "dentalcouncil.ie",
  "legalaidboard.ie", "flac.ie", "nidirect.gov.uk", "health-ni.gov.uk", "hscni.net", "nipso.org.uk",
  "screeningservice.ie", "ntpf.ie", "ncse.ie", "stjames.ie", "nrh.ie", "stvincents.ie", "mater.ie", "nohc.ie",
  "cho7cdnt.ie", "southeastcdnt.ie",
  // Hospitals' own sites, approved by the owner 7 Oct 2026 ("the hospital's own .ie site").
  "beaumont.ie", "childrenshealthireland.ie", "bonsecours.ie",
];
const hostAllowed = host => SOURCE_DOMAINS.some(d => host === d || host.endsWith("." + d));

const CONTACT_PATTERNS = [
  [/@/, "an email address"],
  [/(?:\+?353|\b0\d{1,2})[ -]?\d{3}[ -]?\d{3,4}\b/, "a phone number"],
  [/\b1[58]00[ -]?\d{3}[ -]?\d{3}\b/, "a freephone number"],
  [/\b[AC-FHKNPRTV-Y]\d{2} ?[0-9AC-FHKNPRTV-Y]{4}\b/, "an Eircode"],
];
const CLINICAL_WORDING = /\b(should take|you should treat|diagnos(e|ing)\b|treat with)\b/i;

function validate({ ENTRIES, COUNTIES, SPECIALTIES, AREAS }){
  const errors = [];
  const counties = new Set(COUNTIES.map(c => c.id));
  const specialties = new Set(SPECIALTIES.map(s => s.id));
  const areaOwner = {};
  Object.keys(AREAS || {}).forEach(county => {
    if (!counties.has(county)) errors.push(`AREAS key "${county}" is not a county id`);
    AREAS[county].forEach(a => { areaOwner[a.id] = county; });
  });
  const seen = new Set();
  ENTRIES.forEach(e => {
    const where = `entry "${e.id}"`;
    if (seen.has(e.id)) errors.push(`${where}: duplicate id`);
    seen.add(e.id);
    (e.county || []).forEach(c => { if (!counties.has(c)) errors.push(`${where}: unknown county "${c}"`); });
    if (!e.county || !e.county.length) errors.push(`${where}: no county`);
    (e.specialty || []).forEach(s => { if (!specialties.has(s)) errors.push(`${where}: unknown specialty "${s}"`); });
    if (e.area !== undefined){
      if (typeof e.area !== "string" || !areaOwner[e.area]) errors.push(`${where}: unknown area "${e.area}"`);
      else if (!(e.county || []).includes(areaOwner[e.area])) errors.push(`${where}: area "${e.area}" belongs to county "${areaOwner[e.area]}", which the entry doesn't list`);
    }
    if (e.urlStatus !== undefined && !URL_STATUSES.includes(e.urlStatus)) errors.push(`${where}: urlStatus must be one of ${URL_STATUSES.join(", ")}`);
    if (e.urlStatus !== undefined && !e.checked && e.verify !== true) errors.push(`${where}: an entry with a urlStatus and no checked date must be verify: true`);
    if (/budget 2027/i.test(JSON.stringify(e))) errors.push(`${where}: mentions "Budget 2027"`);
    if (e.source_url !== undefined){
      let host = "";
      try { host = new URL(e.source_url).hostname; } catch (err) { errors.push(`${where}: source_url is not a valid URL`); }
      if (host && !hostAllowed(host)) errors.push(`${where}: source_url host "${host}" is not on the official-domain allow-list`);
    }
    if (e.verify === true){
      if (!e.source_url) errors.push(`${where}: verify: true needs a source_url`);
      const text = [e.blurb].concat(e.details || []).join(" ");
      CONTACT_PATTERNS.forEach(([re, what]) => { if (re.test(text)) errors.push(`${where}: blurb or details contains ${what}`); });
      if (CLINICAL_WORDING.test(text)) errors.push(`${where}: clinical-instruction wording in blurb or details`);
      const c = e.contact || {};
      if ((c.phone || c.email || c.address) && e.urlStatus !== "opened") errors.push(`${where}: phone, email or address on an entry whose source page has not been opened (urlStatus)`);
    }
  });
  return errors;
}

module.exports = { validate };

if (require.main === module){
  const fs = require("fs"), vm = require("vm");
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.D={ENTRIES,COUNTIES,SPECIALTIES,AREAS};", ctx);
  const errors = validate(ctx.D);
  errors.forEach(e => console.log("FAIL", e));
  console.log(errors.length ? `${errors.length} problem(s)` : `ok: ${ctx.D.ENTRIES.length} entries valid`);
  process.exit(errors.length ? 1 : 0);
}
