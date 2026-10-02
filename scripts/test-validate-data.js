// Tests for the data validator rules. Run: node scripts/test-validate-data.js
const { validate } = require("./validate-data.js");
const base = {
  COUNTIES: [{ id: "cork" }, { id: "kerry" }, { id: "national" }],
  SPECIALTIES: [{ id: "childdisability" }],
  AREAS: { cork: [{ id: "east-cork" }, { id: "west-cork" }] },
};
const e = o => Object.assign({ id: "x", specialty: ["childdisability"], county: ["cork"], contact: {} }, o);
let fails = 0;
function expect(name, entries, wantSubstr){
  const errs = validate(Object.assign({}, base, { ENTRIES: entries }));
  const ok = wantSubstr ? errs.some(m => m.includes(wantSubstr)) : errs.length === 0;
  if (!ok){ fails++; console.log("FAIL", name, JSON.stringify(errs)); } else console.log("ok  ", name);
}
expect("valid entry with area", [e({ area: "east-cork" })]);
expect("valid entry without area", [e({})]);
expect("unknown area fails", [e({ area: "mid-cork" })], 'unknown area "mid-cork"');
expect("area with wrong county fails", [e({ county: ["kerry"], area: "east-cork" })], "belongs to county");
expect("area allowed when entry lists the county among others", [e({ county: ["kerry", "cork"], area: "west-cork" })]);
expect("unknown county fails", [e({ county: ["east-cork"] })], 'unknown county "east-cork"');
expect("duplicate id fails", [e({}), e({})], "duplicate id");
expect("unknown specialty fails", [e({ specialty: ["nope"] })], "unknown specialty");
expect("bad urlStatus fails", [e({ urlStatus: "yes" })], "urlStatus must be");
expect("verify without source_url fails", [e({ verify: true })], "needs a source_url");
expect("verify + phone, not opened, fails", [e({ verify: true, source_url: "https://www.hse.ie/x", contact: { phone: "1" } })], "has not been opened");
expect("verify + email, search-result, fails", [e({ verify: true, source_url: "https://www.hse.ie/x", urlStatus: "search-result", contact: { email: "a@b" } })], "has not been opened");
expect("verify + address, not opened, fails", [e({ verify: true, source_url: "https://www.hse.ie/x", contact: { address: "1 Main St" } })], "has not been opened");
expect("verify + phone, opened, ok", [e({ verify: true, source_url: "https://www.hse.ie/x", urlStatus: "opened", contact: { phone: "1" } })]);
expect("web only on unverified entry ok", [e({ verify: true, source_url: "https://www.hse.ie/x", contact: { web: "x.ie" } })]);
const V = o => e(Object.assign({ verify: true, source_url: "https://www.hiqa.ie/x", urlStatus: "search-result" }, o));
expect("human-verified urlStatus allowed", [e({ urlStatus: "human-verified" })]);
expect("broken urlStatus allowed", [e({ urlStatus: "broken" })]);
expect("verify:false without human-verified fails", [e({ verify: false, urlStatus: "search-result" })], 'needs urlStatus "human-verified"');
expect("verify:false with human-verified ok", [e({ verify: false, urlStatus: "human-verified" })]);
expect("source_url off the allow-list fails", [e({ source_url: "https://example.com/x" })], "allow-list");
expect("source_url subdomain of allowed domain ok", [e({ source_url: "https://www2.healthservice.hse.ie/a" })]);
expect("lookalike host fails", [e({ source_url: "https://evilhse.ie/a" })], "allow-list");
expect("invalid source_url fails", [e({ source_url: "not a url" })], "not a valid URL");
expect("email in verify blurb fails", [V({ blurb: "Write to a@b.ie" })], "email address");
expect("phone in verify blurb fails", [V({ blurb: "Call 021 240 9646 today" })], "phone number");
expect("freephone in verify details fails", [V({ details: ["Freephone 1800 424 555"] })], "freephone");
expect("Eircode in verify blurb fails", [V({ blurb: "Based at D02 YR92" })], "Eircode");
expect("dates and counts in blurb are fine", [V({ blurb: "Enacted 7 May 2026 (Act 11 of 2026). Up to 8 sessions, ages 12 to 25." })]);
expect("clinical wording fails", [V({ blurb: "You should take this medicine" })], "clinical-instruction");
expect("contact patterns not applied to unverified entries", [e({ blurb: "Call 021 240 9646" })]);
expect("nrh.ie allowed (National Rehabilitation Hospital)", [e({ source_url: "https://www.nrh.ie/rehabilitation-services/spinal-cord-system-of-care/" })]);
process.exit(fails ? 1 : 0);
