// Validates ENTRIES in data.js. Run: node scripts/validate-data.js
// Exports validate() so scripts/test-validate-data.js can test the rules.
//
// Later rules: urlStatus is one of opened, search-result, unverified; an entry with a
// urlStatus and no `checked` date must be verify: true; any source_url must be on the
// approved-hosts register (see below); verify: true entries may not put a phone, email or Eircode
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

// Approved-hosts register (single source of truth for source_url hosts; decided by Elaine 21 Oct 2026,
// see AI_RULES.md, whose approved-hosts block is printed from this array by scripts/hosts.js).
// A host matches a row if it equals the row's domain or is a subdomain of it, so hse.ie also covers
// www2.hse.ie. The longest matching domain wins. Row: { domain, tier, approved, scope, paths }.
//   approved: a date or basis string, or false for a declined / withheld host.
//   paths: optional path prefixes a source_url on that host must start with (scope enforced).
// Tiers 1 to 5 may be a source_url. Tier 5 (secondary only) warns when it is an entry's only source.
// Tier 6 (voluntary) passes only on entries tagged "voluntary" and never supports official-service
// claims. Tiers 7 and 8 are link-only: never a source_url. Tier 9 is declined or withheld.
const TIER_LABELS = {
  1: "Government and statutory",
  2: "Hospital or service own site",
  3: "HSE-run team sites",
  4: "Scoped approvals",
  5: "Secondary only",
  6: "Voluntary (entry needs the `voluntary` tag)",
  7: "Link-out only",
  8: "Link-only or pending",
  9: "Declined or withheld",
};
const R = (domain, tier, approved, scope, paths) => ({ domain, tier, approved, scope: scope || "", paths: paths || null });
const SOURCE_REGISTER = [
  // Tier 1: government and statutory bodies of ROI and NI (pre-approved class, ratified 21 Oct 2026).
  R("hse.ie", 1, "project rule"), R("gov.ie", 1, "project rule", "includes aai.gov.ie"),
  R("citizensinformation.ie", 1, "project rule"), R("welfare.ie", 1, "9 Oct brief; added 21 Oct 2026"),
  R("nidirect.gov.uk", 1, "project rule"), R("health-ni.gov.uk", 1, "project rule"),
  R("hscni.net", 1, "project rule", "all subdomains, including bso., online., adoptionandfostercare."),
  R("hiqa.ie", 1, "project rule"), R("rqia.org.uk", 1, "project rule"), R("mhcirl.ie", 1, "project rule"),
  R("tusla.ie", 1, "7 Oct 2026"),
  R("askcitizensinformation.ie", 1, "17 Oct 2026", "AskCI, Citizens Information Board pilot chatbot; this host only, not other CIB subdomains; link-out on the schemes pages"),
  R("screeningservice.ie", 1, "ratified 21 Oct 2026"), R("ntpf.ie", 1, "ratified 21 Oct 2026"), R("ncse.ie", 1, "ratified 21 Oct 2026"),
  R("dataprotection.ie", 1, "ratified 21 Oct 2026"), R("oco.ie", 1, "ratified 21 Oct 2026"),
  R("ombudsman.ie", 1, "ratified 21 Oct 2026"), R("oic.ie", 1, "ratified 21 Oct 2026"), R("nipso.org.uk", 1, "ratified 21 Oct 2026"),
  R("medicalcouncil.ie", 1, "ratified 21 Oct 2026"), R("nmbi.ie", 1, "ratified 21 Oct 2026"), R("coru.ie", 1, "ratified 21 Oct 2026"),
  R("thepsi.ie", 1, "ratified 21 Oct 2026"), R("dentalcouncil.ie", 1, "ratified 21 Oct 2026"),
  // Advocacy research hosts approved by Elaine 27 Oct 2026 (statutory bodies; "Primary" in her list maps to tier 1).
  R("psi.ie", 1, "27 Oct 2026", "Pharmaceutical Society of Ireland; pharmacist complaints (thepsi.ie is also registered)"),
  R("legislation.gov.uk", 1, "27 Oct 2026", "The National Archives (UK); Northern Ireland commencement orders"),
  R("gmc-uk.org", 1, "27 Oct 2026", "General Medical Council; Northern Ireland doctor complaints"),
  R("gdc-uk.org", 1, "27 Oct 2026", "General Dental Council; Northern Ireland dentist complaints"),
  R("legalaidboard.ie", 1, "ratified 21 Oct 2026"), R("lawreform.ie", 1, "ratified 21 Oct 2026"),
  R("decisionsupportservice.ie", 1, "24 Oct 2026", "Decision Support Service, statutory body within the Mental Health Commission"),
  R("ipo.irishimmigration.ie", 1, "24 Oct 2026", "International Protection Office; this host only, not other irishimmigration.ie sites"),
  // Representative lookups for the letter to an elected representative (#/advocacy/rep-letter), approved by Elaine
  // 25 Oct 2026: link-out only, never a source for service claims. No link is on the site yet: each is added only when
  // Elaine supplies the exact page URL after opening it. The path prefixes below are PROVISIONAL (the sites could not
  // be opened when this was written) and fail closed; the PR that adds the first link sets the exact path.
  //   oireachtas.ie: Bills pages (approved 21 Oct 2026) plus the members / find-your-TD-or-Senator pages.
  //   niassembly.gov.uk: was withheld (Tier 8); find-your-MLA pages only.
  //   members.parliament.uk: the find-your-MP page is on this subdomain, so the exact host is registered and the rest of
  //   parliament.uk (www., hansard., bare parliament.uk) is NOT approved.
  R("oireachtas.ie", 1, "21 Oct 2026; find-your pages added 25 Oct 2026", "Houses of the Oireachtas: Bills and legislation status, and find-your-TD/Senator pages for the letter builder (#/advocacy/rep-letter); never service claims", ["/en/bills/", "/en/members/"]),
  R("niassembly.gov.uk", 1, "25 Oct 2026", "Northern Ireland Assembly: find-your-MLA pages only, for the letter builder (#/advocacy/rep-letter)", ["/your-mlas/"]),
  R("members.parliament.uk", 1, "25 Oct 2026", "UK Parliament (parliament.uk approved): find-your-MP pages only, for the letter builder (#/advocacy/rep-letter); this host only, not www.parliament.uk or other parliament.uk sites", ["/FindYourMP"]),
  // irishstatutebook.ie: approved 10 Oct 2026 for statute text only (an /eli/ statute URL), not as a general source.
  R("irishstatutebook.ie", 1, "10 Oct 2026", "statute text", ["/eli/"]),
  // Tier 2: a hospital's or service's own site.
  R("stjames.ie", 2, "ratified 21 Oct 2026"), R("nrh.ie", 2, "ratified 21 Oct 2026"), R("stvincents.ie", 2, "ratified 21 Oct 2026"),
  R("mater.ie", 2, "ratified 21 Oct 2026"), R("nohc.ie", 2, "ratified 21 Oct 2026"),
  R("beaumont.ie", 2, "7 Oct 2026"), R("childrenshealthireland.ie", 2, "7 Oct 2026"), R("bonsecours.ie", 2, "7 Oct 2026"),
  R("blackrockhealth.com", 2, "7 Oct 2026", "Galway Clinic owner (.com)"),
  R("guideclinic.ie", 2, "7 Oct 2026", "St James's Hospital clinic site; reclassified from voluntary 21 Oct 2026"),
  // Tier 3: HSE-run team sites. southeastcdnt.ie is declined (superseded by dublinandsoutheastcdnt.ie).
  R("dublinandsoutheastcdnt.ie", 3, "9 Oct 2026"), R("cho7cdnt.ie", 3, "21 Oct 2026"),
  // Tier 4: scoped approvals.
  R("revenue.ie", 4, "9 Oct 2026", "medical-expenses tax-relief pages only", ["/en/personal-tax-credits-reliefs-and-exemptions/health-and-age/"]),
  R("familysupportni.gov.uk", 4, "7 Oct 2026", "statutory trust listings only; voluntary providers listed there stay withheld"),
  // Tier 5: secondary only, never an entry's sole source. GP out-of-hours providers, host names taken from the
  // "Website" field on their www2.hse.ie/services/find-urgent-emergency-care/ pages (21 Oct 2026).
  R("saolta.ie", 5, "7 Oct 2026"), R("caredoc.ie", 5, "7 Oct 2026", "GP out-of-hours"), R("kdoc.ie", 5, "7 Oct 2026", "GP out-of-hours"),
  R("southdoc.ie", 5, "21 Oct 2026", "GP out-of-hours"), R("shannondoc.ie", 5, "21 Oct 2026", "GP out-of-hours"),
  R("westdoc.ie", 5, "21 Oct 2026", "GP out-of-hours"), R("nedoc.ie", 5, "21 Oct 2026", "GP out-of-hours"),
  R("northdoc.ie", 5, "21 Oct 2026", "GP out-of-hours"), R("edoc.ie", 5, "21 Oct 2026", "GP out-of-hours"),
  R("dubdoc.ie", 5, "21 Oct 2026", "GP out-of-hours"), R("tlcdoc.ie", 5, "21 Oct 2026", "GP out-of-hours"),
  // Advocacy research hosts approved by Elaine 27 Oct 2026 ("Secondary" in her list maps to tier 5).
  R("patientadvocacyservice.ie", 5, "27 Oct 2026", "Patient Advocacy Service (Dept of Health National Patient Safety Office; delivered by the National Advocacy Service for People with Disabilities); advocacy and incident support"),
  R("risli.ie", 5, "27 Oct 2026", "Register of Irish Sign Language Interpreters (SLIS); interpreter register"),
  R("slis.ie", 5, "27 Oct 2026", "Sign Language Interpreting Service; booking information (approved, not currently used)"),
  R("lenus.ie", 5, "27 Oct 2026", "HSE repository; archived HSE documents (approved, not currently used)"),
  // Tier 6: voluntary. Pass as source_url only on entries tagged "voluntary"; never support official-service claims.
  R("lauralynn.ie", 6, "approved"), R("jigsaw.ie", 6, "approved"), R("diabetes.ie", 6, "approved"),
  R("flac.ie", 6, "moved from official 21 Oct 2026", "NGO; its own-service row only"),
  // Tier 7: link-outs used in data/conditions.js. Never a source for claims.
  R("arthritisireland.ie", 7, "21 Oct 2026", "link-out only, never a source"),
  R("crohnscolitis.ie", 7, "21 Oct 2026", "link-out only, never a source"),
  R("cancer.ie", 7, "21 Oct 2026", "Irish Cancer Society; link-out only, never a source"),
  // Tier 8: birthinfo.ie approved link-only 21 Oct 2026 (owner confirmed: Adoption Authority of Ireland, Birth Information and Tracing Act 2022).
  R("birthinfo.ie", 8, "21 Oct 2026", "link-only: birth information and tracing"),
  // Tier 9: declined 7 to 21 Oct 2026. Wikipedia, Medical Independent, Irish Health Pro and Limerick Leader are also declined.
  R("southeastcdnt.ie", 9, false, "superseded by dublinandsoutheastcdnt.ie"),
  R("ndsa.ie", 9, false), R("assets.ireland.ie", 9, false), R("nhs.uk", 9, false, "includes 111.nhs.uk"),
  R("barnardos.ie", 9, false), R("irishtimes.com", 9, false), R("irishexaminer.com", 9, false),
  R("ipu.ie", 9, false), R("sims.ie", 9, false), R("firstivf.ie", 9, false),
  R("louthparenthub.ie", 9, false), R("kilkennyparenthub.ie", 9, false), R("horizonscork.ie", 9, false), R("mphc.ie", 9, false),
  R("midwestaries.ie", 9, false), R("cypsc.ie", 9, false), R("mayomha.ie", 9, false), R("familypeersupport.ie", 9, false),
];
const matches = (host, d) => host === d || host.endsWith("." + d);
function hostRule(host){
  let best = null;
  SOURCE_REGISTER.forEach(r => { if (matches(host, r.domain) && (!best || r.domain.length > best.domain.length)) best = r; });
  return best;
}
const isVoluntary = e => (e.tags || []).includes("voluntary");

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
      let host = "", pathname = "";
      try { const u = new URL(e.source_url); host = u.hostname; pathname = u.pathname; } catch (err) { errors.push(`${where}: source_url is not a valid URL`); }
      const rule = host ? hostRule(host) : null;
      if (host && (!rule || rule.approved === false)) errors.push(`${where}: source_url host "${host}" is not on the official-domain allow-list`);
      else if (rule && (rule.tier === 7 || rule.tier === 8)) errors.push(`${where}: source_url host "${host}" is link-only in the approved-hosts register and cannot be a source_url`);
      else if (rule && rule.tier === 6 && !isVoluntary(e)) errors.push(`${where}: source_url host "${host}" is voluntary-tier: the entry needs the "voluntary" tag`);
      else if (rule && rule.paths && !rule.paths.some(p => pathname.startsWith(p))) errors.push(`${where}: ${rule.domain} is approved for ${rule.scope} only; source_url path must start with ${rule.paths.join(" or ")}`);
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

// Tier 5 hosts (secondary only) must not be an entry's only source: warn when an entry's source_url is on
// one and no resources link points at a tier 1 to 4 host. Warning, not failure.
function secondaryOnlyWarnings({ ENTRIES }){
  const warnings = [];
  (ENTRIES || []).forEach(e => {
    if (!e.source_url) return;
    let host; try { host = new URL(e.source_url).hostname; } catch (err) { return; }
    const rule = hostRule(host);
    if (!rule || rule.tier !== 5) return;
    const other = (e.resources || []).some(r => {
      try { const o = hostRule(new URL(r.url).hostname); return o && o.tier >= 1 && o.tier <= 4 && o.approved !== false; } catch (err) { return false; }
    });
    if (!other) warnings.push(`entry "${e.id}": source_url is on secondary-only host "${host}" and no tier 1 to 4 source is linked`);
  });
  return warnings;
}

const SOURCE_DOMAINS = SOURCE_REGISTER.filter(r => r.tier <= 5 && r.approved !== false).map(r => r.domain);
module.exports = { validate, urlFamilyWarnings, secondaryOnlyWarnings, SOURCE_REGISTER, SOURCE_DOMAINS, TIER_LABELS, hostRule };

if (require.main === module){
  const fs = require("fs"), vm = require("vm");
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.D={ENTRIES,COUNTIES,SPECIALTIES,AREAS,SCHEME_LINKS};", ctx);
  const errors = validate(ctx.D);
  errors.forEach(e => console.log("FAIL", e));
  const warnings = urlFamilyWarnings(ctx.D);
  secondaryOnlyWarnings(ctx.D).forEach(w => console.log("warn", w));
  warnings.forEach(w => console.log("warn", w));
  if (warnings.length) console.log(`${warnings.length} URL-family warning(s): not failing, convert when the current www2.hse.ie page is found`);
  console.log(errors.length ? `${errors.length} problem(s)` : `ok: ${ctx.D.ENTRIES.length} entries valid`);
  process.exit(errors.length ? 1 : 0);
}
