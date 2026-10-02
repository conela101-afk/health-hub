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
expect("verify + phone, not opened, fails", [e({ verify: true, source_url: "https://x", contact: { phone: "1" } })], "has not been opened");
expect("verify + email, search-result, fails", [e({ verify: true, source_url: "https://x", urlStatus: "search-result", contact: { email: "a@b" } })], "has not been opened");
expect("verify + address, not opened, fails", [e({ verify: true, source_url: "https://x", contact: { address: "1 Main St" } })], "has not been opened");
expect("verify + phone, opened, ok", [e({ verify: true, source_url: "https://x", urlStatus: "opened", contact: { phone: "1" } })]);
expect("web only on unverified entry ok", [e({ verify: true, source_url: "https://x", contact: { web: "x.ie" } })]);
process.exit(fails ? 1 : 0);
