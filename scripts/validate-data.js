// Validates ENTRIES in data.js. Run: node scripts/validate-data.js
// Exports validate() so scripts/test-validate-data.js can test the rules.
//
// Later rules: urlStatus is one of opened, search-result, unverified; an entry with a
// urlStatus and no `checked` date must be verify: true; any source_url must be on the
// official-domain allow-list; verify: true entries may not put a phone, email or Eircode
// in the blurb or details or use clinical-instruction wording. (An earlier rule banned
// "Budget 2027" until the Budget was announced on 6 Oct 2026; removed 7 Oct 2026. Budget
// measures must be worded as announced, with a start date only where the source gives one.)
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
  "hse.ie", "gov.ie", "citizensinformation.ie",
  // irishstatutebook.ie: approved by the owner 10 Oct 2026 for statute text only (not as a general source).
  // validate() enforces that: an entry's source_url on this host must be an /eli/ statute URL.
  "irishstatutebook.ie", "oireachtas.ie", "lawreform.ie",
  "hiqa.ie", "mhcirl.ie", "dataprotection.ie", "oco.ie", "ombudsman.ie", "oic.ie",
  "medicalcouncil.ie", "nmbi.ie", "coru.ie", "thepsi.ie", "dentalcouncil.ie",
  "legalaidboard.ie", "flac.ie", "nidirect.gov.uk", "health-ni.gov.uk", "hscni.net", "nipso.org.uk",
  "screeningservice.ie", "ntpf.ie", "ncse.ie", "stjames.ie", "nrh.ie", "stvincents.ie", "mater.ie", "nohc.ie",
  "cho7cdnt.ie", "southeastcdnt.ie",
  // Hospitals' own sites, approved by the owner 7 Oct 2026 ("the hospital's own .ie site").
  "beaumont.ie", "childrenshealthireland.ie", "bonsecours.ie",
  // Approved by the owner 7 Oct 2026: the GUIDe clinic's own site (St James's Hospital sexual health clinic).
  "guideclinic.ie",
  // Approved by the owner 7 Oct 2026: Tusla (child and family agency). aai.gov.ie (Adoption Authority of Ireland) is already covered by gov.ie.
  "tusla.ie",
  // Approved by the owner 7 Oct 2026: familysupportni.gov.uk (NI family support), saolta.ie (former Saolta
  // hospital group site), caredoc.ie and kdoc.ie (GP out-of-hours services). bso.hscni.net,
  // adoptionandfostercare.hscni.net and online.hscni.net are already covered by hscni.net.
  "familysupportni.gov.uk", "saolta.ie", "caredoc.ie", "kdoc.ie",
  // Approved by the owner 7 Oct 2026: Blackrock Health, the current owner of the Galway Clinic (galwayclinic.com redirects here).
  "blackrockhealth.com",
  // Approved by the owner 9 Oct 2026: the Dublin and South East Children's Disability Network Teams site (replaces southeastcdnt.ie).
  "dublinandsoutheastcdnt.ie",
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
    if (e.source_url !== undefined){
      let host = "";
      try { host = new URL(e.source_url).hostname; } catch (err) { errors.push(`${where}: source_url is not a valid URL`); }
      if (host && !hostAllowed(host)) errors.push(`${where}: source_url host "${host}" is not on the official-domain allow-list`);
      if (host && /(^|\.)irishstatutebook\.ie$/.test(host) && !/^\/eli\//.test(new URL(e.source_url).pathname)) errors.push(`${where}: irishstatutebook.ie is approved for statute text only; source_url must be an /eli/ statute URL`);
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

// URL-family drift. www2.hse.ie/services/... is the canonical host for HSE service pages (owner decision
// 10 Oct 2026). Flags hse.ie/services/... links that lack the www2 form and legacy hse.ie/eng/... links.
// These are warnings, not errors: older entries still carry legacy links that need a person to find the
// current page before they can be converted.
function hseFamily(url){
  let u; try { u = new URL(url); } catch (err) { return null; }
  if (u.hostname !== "hse.ie" && u.hostname !== "www.hse.ie") return null;
  if (/^\/eng\//.test(u.pathname)) return "legacy hse.ie/eng/";
  if (/^\/services\//.test(u.pathname)) return "hse.ie/services/ without www2";
  return null;
}
function urlFamilyWarnings({ ENTRIES, SCHEME_LINKS }){
  const warnings = [];
  const add = (where, field, url) => {
    if (!url) return;
    const full = /^https?:\/\//.test(url) ? url : "https://" + url;
    const kind = hseFamily(full);
    if (kind) warnings.push(`${where}: ${field} uses ${kind} (${url})`);
  };
  (ENTRIES || []).forEach(e => {
    const where = `entry "${e.id}"`;
    add(where, "source_url", e.source_url);
    add(where, "contact.web", e.contact && e.contact.web);
    (e.resources || []).forEach(r => add(where, "resources", r.url));
  });
  (SCHEME_LINKS || []).forEach(s => (s.links || []).forEach(l => add(`scheme card "${s.id}"`, "links", l.url)));
  return warnings;
}

module.exports = { validate, urlFamilyWarnings };

if (require.main === module){
  const fs = require("fs"), vm = require("vm");
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.D={ENTRIES,COUNTIES,SPECIALTIES,AREAS,SCHEME_LINKS};", ctx);
  const errors = validate(ctx.D);
  errors.forEach(e => console.log("FAIL", e));
  const warnings = urlFamilyWarnings(ctx.D);
  warnings.forEach(w => console.log("warn", w));
  if (warnings.length) console.log(`${warnings.length} URL-family warning(s): not failing, convert when the current www2.hse.ie page is found`);
  console.log(errors.length ? `${errors.length} problem(s)` : `ok: ${ctx.D.ENTRIES.length} entries valid`);
  process.exit(errors.length ? 1 : 0);
}
