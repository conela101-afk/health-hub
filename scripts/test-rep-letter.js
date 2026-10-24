// Checks the REP_LETTER data used by the "Write to your TD or councillor" builder (data.js).
// Run: node scripts/test-rep-letter.js
// Rules: every string is neutral across parties (no party, politician or policy named), carries no phone,
// email or Eircode, and the ids the page code relies on exist.
const fs = require("fs"), vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.R = REP_LETTER;", ctx);
const R = ctx.R;
let fails = 0;
const bad = (what) => { fails++; console.log("FAIL", what); };
const strings = [];
(function walk(v){ if (typeof v === "string") strings.push(v); else if (v && typeof v === "object") Object.values(v).forEach(walk); })(R);
const PARTY = /\b(fianna fáil|fianna fail|fine gael|sinn f[eé]in|labour|green party|social democrats|people before profit|aontú|aontu|independent ireland|dup|sdlp|uup|alliance party|tuv|conservative|reform uk|taoiseach|tánaiste|tanaiste)\b/i;
const CONTACT = /(@|\b0\d{1,2}[ -]?\d{3}[ -]?\d{3,4}\b|\b1[58]00[ -]?\d{3}[ -]?\d{3}\b|\b[AC-FHKNPRTV-Y]\d{2} ?[0-9AC-FHKNPRTV-Y]{4}\b)/;
strings.forEach(s => {
  if (PARTY.test(s)) bad(`names a party or office-holder: "${s}"`);
  if (CONTACT.test(s)) bad(`contains a contact detail: "${s}"`);
});
["roles", "topics", "done", "asks"].forEach(k => {
  if (!Array.isArray(R[k]) || !R[k].length) bad(`${k} missing`);
  else {
    const ids = R[k].map(x => x.id);
    if (new Set(ids).size !== ids.length) bad(`${k} has duplicate ids`);
    R[k].forEach(x => { if (!x.id || !x.label) bad(`${k} entry needs id and label`); });
  }
});
R.topics.forEach(t => { if (!t.phrase) bad(`topic ${t.id} needs a phrase`); });
R.done.concat(R.asks).forEach(x => { if (!x.text) bad(`${x.id} needs text`); });
R.asks.forEach(a => { if (a.needsRole && !R.roles.every(r => typeof r.asksQuestion === "boolean")) bad("every role needs asksQuestion"); });
if (!R.consent) bad("consent text missing");
if (!R.roles.some(r => r.id === "councillor" && r.asksQuestion === false)) bad("councillor must not be offered the parliamentary-question request");
if (!fails) console.log(`ok   REP_LETTER: ${strings.length} strings checked`);
process.exit(fails ? 1 : 0);
