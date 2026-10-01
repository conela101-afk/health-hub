// Edge-case tests for the AON deadline calculator. Run: node scripts/test-aon-dates.js
const fs = require("fs"), vm = require("vm");
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data.js", "utf8") + "\nthis.TOOL_FACTS=TOOL_FACTS;this.TOOL_UI_TEXT=TOOL_UI_TEXT;", ctx);
vm.runInContext(fs.readFileSync("tools.js", "utf8"), ctx);
const { aonDates } = ctx.window.HH_TOOLS._internal;
const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const get = (rows, id) => { const r = rows.find(x => x.id === id); return r ? iso(r.date) : null; };
let fails = 0;
function eq(name, got, want){ if (got !== want){ fails++; console.log("FAIL", name, "got", got, "want", want); } else console.log("ok  ", name, got); }

let r = aonDates("2026-01-31", "", "");
eq("ack 31 Jan +14d", get(r, "ack"), "2026-02-14");
eq("start 31 Jan +3m clamps to 30 Apr", get(r, "start"), "2026-04-30");
eq("complete 31 Jan +6m = 31 Jul", get(r, "complete"), "2026-07-31");
eq("missing report: 7-month estimate = 31 Aug 2026", get(r, "statement"), "2026-08-31");
eq("estimate flag", String(r.find(x => x.id === "statement").estimate), "true");
eq("no complaint row without aware date", String(get(r, "complaint")), "null");

r = aonDates("2026-08-31", "", "");
eq("31 Aug +6m non-leap = 28 Feb", get(r, "complete"), "2027-02-28");
r = aonDates("2027-08-31", "", "");
eq("31 Aug +6m into leap year = 29 Feb 2028", get(r, "complete"), "2028-02-29");
r = aonDates("2024-02-29", "", "");
eq("29 Feb 2024 +14d", get(r, "ack"), "2024-03-14");
eq("29 Feb 2024 +6m", get(r, "complete"), "2024-08-29");
r = aonDates("2025-11-30", "2026-05-31", "2026-11-30");
eq("report 31 May +1m clamps to 30 Jun", get(r, "statement"), "2026-06-30");
eq("report supplied: not an estimate", String(r.find(x => x.id === "statement").estimate), "undefined");
eq("aware 30 Nov +3m = 28 Feb 2027", get(r, "complaint"), "2027-02-28");
r = aonDates("", "2026-01-31", "");
eq("report only: statement = 28 Feb", get(r, "statement"), "2026-02-28");
eq("report only: no application rows", String(get(r, "ack")), "null");
eq("empty inputs -> no rows", String(aonDates("", "", "").length), "0");
eq("invalid date -> no rows", String(aonDates("2026-02-30x", "", "").length), "0");
eq("Dec year rollover", get(aonDates("2026-12-15", "", ""), "start"), "2027-03-15");
eq("rollover date rejected", String(aonDates("2026-02-30", "", "").length), "0");
process.exit(fails ? 1 : 0);
