// Tests for the data validator rules. Run: node scripts/test-validate-data.js
const { validate, urlFamilyWarnings, secondaryOnlyWarnings, SOURCE_REGISTER } = require("./validate-data.js");
const hosts = require("./hosts.js");
const fs = require("fs"), path = require("path");
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
expect("unverified urlStatus allowed", [V({ urlStatus: "unverified" })]);
expect("human-verified not a status here", [e({ urlStatus: "human-verified", verify: true, source_url: "https://www.hse.ie/x" })], "urlStatus must be one of");
expect("urlStatus without verify or checked fails", [e({ urlStatus: "search-result", source_url: "https://www.hse.ie/x" })], "must be verify: true");
expect("urlStatus with a checked date is fine", [e({ urlStatus: "opened", checked: "2 Oct 2026", source_url: "https://www.hse.ie/x" })]);
expect("source_url off the allow-list fails", [V({ source_url: "https://example.com/x" })], "allow-list");
expect("jigsaw.ie fails without the voluntary tag", [V({ source_url: "https://jigsaw.ie/accessing-jigsaw/" })], "voluntary");
expect("diabetes.ie fails without the voluntary tag", [V({ source_url: "https://www.diabetes.ie/x" })], "voluntary");
expect("subdomain of allowed domain ok", [V({ source_url: "https://live.citizensinformation.ie/en/x" })]);
expect("hospital domain ok (stjames.ie)", [V({ source_url: "https://www.stjames.ie/services/x" })]);
expect("lookalike host fails", [V({ source_url: "https://evilhse.ie/a" })], "allow-list");
expect("invalid source_url fails", [V({ source_url: "not a url" })], "not a valid URL");
expect("email in verify blurb fails", [V({ blurb: "Write to a@b.ie" })], "email address");
expect("phone in verify blurb fails", [V({ blurb: "Call 021 240 9646 today" })], "phone number");
expect("freephone in verify details fails", [V({ details: ["Freephone 1800 424 555"] })], "freephone");
expect("Eircode in verify blurb fails", [V({ blurb: "Based at D02 YR92" })], "Eircode");
expect("dates, counts and form codes are fine", [V({ blurb: "Form HSS001. Up to 8 sessions, ages 12 to 25. Within 21 days, from 18 Sep 2026." })]);
expect("clinical wording fails", [V({ blurb: "You should take this medicine" })], "clinical-instruction");
expect("Budget 2027 wording is allowed now the Budget is announced", [V({ blurb: "Announced in Budget 2027, from July 2027: the disregard rises to 1,150 euro." })]);
expect("contact patterns not applied to unverified-free old entries", [e({ blurb: "Call 021 240 9646" })]);
expect("blackrockhealth.com ok (Blackrock Health, approved 7 Oct 2026)", [V({ source_url: "https://www.blackrockhealth.com/locations" })]);
expect("tusla.ie ok (approved 7 Oct 2026)", [V({ source_url: "https://www.tusla.ie/services/x/" })]);
expect("aai.gov.ie ok via gov.ie", [V({ source_url: "https://www.aai.gov.ie/en/" })]);
["familysupportni.gov.uk", "saolta.ie", "caredoc.ie", "kdoc.ie", "bso.hscni.net", "adoptionandfostercare.hscni.net", "online.hscni.net"].forEach(h =>
  expect(`approved host ok (${h}, 7 Oct 2026)`, [V({ source_url: `https://www.${h}/x/` })]));
expect("dublinandsoutheastcdnt.ie ok (approved 9 Oct 2026)", [V({ source_url: "https://www.dublinandsoutheastcdnt.ie/about/who-we-are/" })]);
expect("lookalike of dublinandsoutheastcdnt.ie fails", [V({ source_url: "https://notdublinandsoutheastcdnt.ie/x" })], "allow-list");
expect("lookalike of an approved host fails", [V({ source_url: "https://notcaredoc.ie/x" })], "allow-list");
expect("hospital domain ok (nrh.ie, National Rehabilitation Hospital)", [V({ source_url: "https://www.nrh.ie/rehabilitation-services/x/" })]);
expect("irishstatutebook.ie ok for statute text (approved 10 Oct 2026)", [V({ source_url: "https://www.irishstatutebook.ie/eli/2015/act/64/enacted/en/html" })]);
expect("irishstatutebook.ie not ok as a general source", [V({ source_url: "https://www.irishstatutebook.ie/eli/isbc/2015.html" }), V({ id: "y", source_url: "https://www.irishstatutebook.ie/" })], "statute text only");
expect("lookalike of irishstatutebook.ie fails", [V({ source_url: "https://notirishstatutebook.ie/eli/x" })], "allow-list");
// Approved-hosts register (decided 21 Oct 2026). Allow test and lookalike-host failure test for each added host.
const ok = h => [V({ source_url: `https://www.${h}/x/` })];
const lookalike = h => [V({ source_url: `https://not${h}/x/` })];
const added = ["askcitizensinformation.ie", "welfare.ie", "cho7cdnt.ie", "southdoc.ie", "shannondoc.ie", "westdoc.ie", "nedoc.ie", "northdoc.ie", "edoc.ie", "dubdoc.ie", "tlcdoc.ie"];
added.forEach(h => {
  expect(`${h} ok (register, 21 Oct 2026)`, ok(h));
  expect(`lookalike of ${h} fails`, lookalike(h), "allow-list");
});
["lauralynn.ie", "jigsaw.ie", "diabetes.ie", "flac.ie"].forEach(h => {
  expect(`${h} ok on a voluntary-tagged entry`, [V({ tags: ["voluntary"], source_url: `https://www.${h}/x/` })]);
  expect(`${h} fails without the voluntary tag`, ok(h), "voluntary");
  expect(`lookalike of ${h} fails even when tagged`, [V({ tags: ["voluntary"], source_url: `https://not${h}/x/` })], "allow-list");
});
["southeastcdnt.ie", "ndsa.ie", "assets.ireland.ie", "nhs.uk", "111.nhs.uk", "barnardos.ie", "irishtimes.com", "irishexaminer.com", "ipu.ie", "sims.ie", "firstivf.ie",
 "louthparenthub.ie", "kilkennyparenthub.ie", "horizonscork.ie", "mphc.ie", "midwestaries.ie", "cypsc.ie", "mayomha.ie", "familypeersupport.ie"].forEach(h =>
  expect(`declined or withheld host fails (${h})`, ok(h), "allow-list"));
["arthritisireland.ie", "crohnscolitis.ie", "cancer.ie", "birthinfo.ie", "forms.gle"].forEach(h =>
  expect(`link-only host cannot be a source_url (${h})`, ok(h), "link-only"));
expect("oireachtas.ie ok for a Bills page", [V({ source_url: "https://www.oireachtas.ie/en/bills/bill/2025/84/" })]);
// Representative lookups for the letter builder (approved 25 Oct 2026). Paths are provisional and fail closed.
expect("oireachtas.ie ok for the find-your-TD/Senator pages (25 Oct 2026)", [V({ source_url: "https://www.oireachtas.ie/en/members/" })]);
["https://www.oireachtas.ie/en/about/", "https://www.oireachtas.ie/", "https://www.oireachtas.ie/ga/members/"].forEach(u =>
  expect(`oireachtas.ie not ok outside the Bills and members pages (${new URL(u).pathname})`, [V({ source_url: u })], "find-your-TD/Senator pages"));
expect("lookalike of oireachtas.ie fails", lookalike("oireachtas.ie"), "allow-list");
expect("oireachtas.ie lookalike with the host as a prefix fails", [V({ source_url: "https://oireachtas.ie.example.org/en/members/" })], "allow-list");
expect("niassembly.gov.uk ok for the find-your-MLA pages (25 Oct 2026; no longer withheld)", [V({ source_url: "https://www.niassembly.gov.uk/your-mlas/" })]);
["https://www.niassembly.gov.uk/news/", "https://www.niassembly.gov.uk/"].forEach(u =>
  expect(`niassembly.gov.uk not ok outside the find-your-MLA pages (${new URL(u).pathname})`, [V({ source_url: u })], "find-your-MLA pages only"));
expect("lookalike of niassembly.gov.uk fails", lookalike("niassembly.gov.uk"), "allow-list");
expect("niassembly.gov.uk lookalike with the host as a prefix fails", [V({ source_url: "https://niassembly.gov.uk.example.org/your-mlas/" })], "allow-list");
expect("members.parliament.uk ok for the find-your-MP page (parliament.uk approved 25 Oct 2026)", [V({ source_url: "https://members.parliament.uk/FindYourMP" })]);
["https://members.parliament.uk/members/Commons", "https://members.parliament.uk/"].forEach(u =>
  expect(`members.parliament.uk not ok outside the find-your-MP page (${new URL(u).pathname})`, [V({ source_url: u })], "find-your-MP pages only"));
["https://www.parliament.uk/get-involved/", "https://hansard.parliament.uk/", "https://parliament.uk/", "https://committees.parliament.uk/"].forEach(u =>
  expect(`only the members.parliament.uk host is approved, not ${new URL(u).hostname}`, [V({ source_url: u })], "allow-list"));
expect("lookalike of members.parliament.uk fails", [V({ source_url: "https://notmembers.parliament.uk/FindYourMP" })], "allow-list");
expect("members.parliament.uk lookalike with the host as a prefix fails", [V({ source_url: "https://members.parliament.uk.example.org/FindYourMP" })], "allow-list");
expect("revenue.ie ok for health-expenses relief", [V({ source_url: "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/health-and-age/health-expenses/index.aspx" })]);
expect("revenue.ie not ok outside the medical-expenses section", [V({ source_url: "https://www.revenue.ie/en/vat/" })], "medical-expenses tax-relief pages only");
expect("lookalike of revenue.ie fails", lookalike("revenue.ie"), "allow-list");
expect("guideclinic.ie is tier 2, no tag needed", ok("guideclinic.ie"));
function expectSecondary(name, entries, want){
  const w = secondaryOnlyWarnings({ ENTRIES: entries });
  const pass = want ? w.some(m => m.includes(want)) : w.length === 0;
  if (!pass){ fails++; console.log("FAIL", name, JSON.stringify(w)); } else console.log("ok  ", name);
}
expectSecondary("secondary-only host as sole source warns", [V({ source_url: "https://www.southdoc.ie/x/" })], "secondary-only");
expectSecondary("secondary host with an official resource link is fine", [V({ source_url: "https://www.southdoc.ie/x/", resources: [{ label: "HSE", url: "https://www2.hse.ie/services/x/" }] })]);
expectSecondary("official source_url does not warn", [V({ source_url: "https://www2.hse.ie/services/x/" })]);
{
  const f = hosts.fromFile(path.join(__dirname, "..", "AI_RULES.md"));
  if (!f || f.text !== hosts.block()){ fails++; console.log("FAIL AI_RULES.md approved-hosts block differs from the validator register; run: node scripts/hosts.js --write"); } else console.log("ok   AI_RULES.md approved-hosts block matches the register");
  const dup = SOURCE_REGISTER.map(r => r.domain).filter((d, i, a) => a.indexOf(d) !== i);
  if (dup.length){ fails++; console.log("FAIL duplicate register domains", dup.join(", ")); } else console.log("ok   register has no duplicate domains");
}
function expectWarn(name, input, want){
  const w = urlFamilyWarnings(input);
  const ok = want ? w.some(m => m.includes(want)) && w.length >= 1 : w.length === 0;
  if (!ok){ fails++; console.log("FAIL", name, JSON.stringify(w)); } else console.log("ok  ", name);
}
expectWarn("www2 hse link is fine", { ENTRIES: [e({ source_url: "https://www2.hse.ie/services/home-support-service/", contact: { web: "www2.hse.ie/services/x/" } })] });
expectWarn("legacy hse.ie/eng source_url flagged", { ENTRIES: [e({ source_url: "https://www.hse.ie/eng/services/list/1/x/" })] }, "legacy hse.ie/eng/");
expectWarn("hse.ie/services without www2 flagged", { ENTRIES: [e({ source_url: "https://hse.ie/services/home-support-service/" })] }, "without www2");
expectWarn("legacy contact.web and resources flagged", { ENTRIES: [e({ contact: { web: "www.hse.ie/eng/services/x/" }, resources: [{ label: "x", url: "https://www.hse.ie/eng/y/" }] })] }, "contact.web");
expectWarn("scheme card links flagged", { SCHEME_LINKS: [{ id: "c", links: [{ label: "x", url: "https://www.hse.ie/services/z/" }] }] }, 'scheme card "c"');
expectWarn("other hse.ie pages not flagged", { ENTRIES: [e({ source_url: "https://www.hse.ie/" })] });
process.exit(fails ? 1 : 0);
