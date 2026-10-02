// Validates ENTRIES in data.js. Run: node scripts/validate-data.js
// Exports validate() so scripts/test-validate-data.js can test the rules.
//
// Rules: unique ids; county ids come from COUNTIES (26 counties + NI + national);
// specialty ids from SPECIALTIES; optional `area` must exist in AREAS and belong
// to one of the entry's counties; `urlStatus` is "opened" or "search-result";
// a `verify: true` entry needs a source_url and may not carry a phone, email or
// address unless a human opened the page (urlStatus: "opened").
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
    if (e.urlStatus !== undefined && !["opened", "search-result"].includes(e.urlStatus)) errors.push(`${where}: urlStatus must be "opened" or "search-result"`);
    if (e.verify === true){
      if (!e.source_url) errors.push(`${where}: verify: true needs a source_url`);
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
