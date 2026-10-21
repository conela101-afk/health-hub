# Research brief: P3 content queue (9 Oct 2026)

**For:** a research session with live web search (Claude Code's build environment has no outbound access). **Output:** unverified candidate rows and source logs, saved under `research/`. Claude Code merges them later by PR. You do not edit the repo.
**Source:** `MASTER-BUILD-PLAN-v2-2026-10-09.md` §3 P3. **Status:** research only. Nothing is merged until the P0 verification list is below the 8 Oct level and Elaine has cleared the output.

## Context
Health Hub is a free, privacy-first PWA for navigating Irish and NI healthcare and advocacy rights. It gives administrative information only: never clinical advice, never legal claims. Layers: `data.js` (directory), `data/costs.js`, `data/vaccines.js`, `data/screening.js`, `data/conditions.js`.

## Hard rules
1. **Official sources only:** hse.ie and subdomains (use the `www2.hse.ie` URL family), gov.ie, citizensinformation.ie, welfare.ie, nidirect.gov.uk, health-ni.gov.uk, `*.hscni.net`, hiqa.ie, rqia.org.uk, mhcirl.ie, tusla.ie, aai.gov.ie, and a hospital's own `.ie` site. Also approved: familysupportni.gov.uk, bso.hscni.net, online.hscni.net, adoptionandfostercare.hscni.net; saolta.ie, caredoc.ie and kdoc.ie as secondary sources only. Voluntary-tagged only, never supporting official-service claims: lauralynn.ie, jigsaw.ie, diabetes.ie, guideclinic.ie. **Withheld:** charity, press, trade, recruitment, academic-group and forum sites. Any other host (revenue.ie, ndsa.ie and similar) goes under "Hosts needing approval" and is not used.
2. **No phone, email, fax, fee or waiting-time figure** unless copied from a page you opened. Rows are link-only by default.
3. **Budget-sensitive figures** (amounts, caps, rates, thresholds, percentages) are kept **out of row text**. If you read one on an official page, record it only in the source log with the page URL and its "last reviewed" date, so Elaine can decide. Means-test thresholds are never stored: link to the official calculator. Budget 2027 was announced 6 Oct 2026; the full documents have not been read.
4. **Never write "checked" or "opened".** Every row is `verify: true`, `urlStatus: "search-result"`, no `checked`.
5. **No clinical or legal claims.** Paraphrase the page ("the HSE page says…"). Describe who a scheme covers, not whether the reader is entitled.
6. **Do not invent.** If a service, team or scheme is not on an official page you read, leave it out. "Not found" is a valid result. Log it as "not searched" or "not found", never "does not exist".
7. **Cover areas evenly.** `area` = physical base. No single-county targeting, no Cork weighting.
8. **De-duplicate first.** Use the HealthHub MCP `search_directory` if available, otherwise search `data.js`, `data/costs.js`, `data/vaccines.js`, `data/screening.js`. Report near-duplicates and propose an edit to the existing row.
9. **Never quote an entry count** as fact. Counts here are from `node scripts/county-matrix.js` on 9 Oct 2026 and must be recounted.
10. **Read the page, not the snippet.** A search-result snippet is not a source. Note the page's own "last reviewed/updated" date for every source.

## Suggested session split
One session per part, in this order. Each should finish inside one search budget; stop and report rather than run thin across everything.

| Session | Parts | Why this order |
|---|---|---|
| 1 | A (cost schemes) | Closest to the Advocacy guide and the complaints navigator; most likely to be used |
| 2 | B + C (vaccines, screening) | Same schema family, same source pages |
| 3 | D (community services) | Largest; run by HSE Health Region |
| 4 | E (toolkit gaps) and F (Down/Londonderry, out-of-hours leftovers) | Smaller, partly retried from the 7 Oct search budget running out |

## Part A: cost schemes not yet started
Existing `costs.js` rows (do not duplicate): medical card and its prescription charge, DPS, LTI, GP visit card, hospital charges, free HRT, free contraception, Treatment Benefit, cross-border directive, NIPHS, TAS, NI reimbursement rows, NI free prescriptions, NI help with health costs.

Find the official page for each, and report what it says about **who it covers, what it covers, how to apply** (output as `costs.js` rows, schema below):
1. **High Tech Drugs arrangement** (HSE).
2. **Fair Deal / Nursing Homes Support Scheme** (HSE, Citizens Information).
3. **Home Support** (HSE). Include what the page says about the planned statutory scheme only if it is on an official page; no dates from memory.
4. **Hardship routes:** HSE medical-card discretionary/undue-hardship wording, and the Supplementary Welfare Allowance / Additional Needs Payment pages on gov.ie or Citizens Information. Link-only; never state eligibility.
5. **Aids and appliances** (HSE and the Citizens Information summary).
6. **Dental Treatment Services Scheme** (HSE) and the PRSI Treatment Benefit pairing, if the Treatment Benefit row does not already link it.
7. **Community Ophthalmic Services / eye care schemes** (HSE; children and medical card holders as the page frames it).
8. **Med 1 (tax relief on medical expenses):** the Advocacy guide quotes a percentage. Find the Citizens Information page and any gov.ie page. The primary page is on revenue.ie, which is **not approved**: list it under "Hosts needing approval" and do not use it. Record the percentage only in the source log.
9. **NI equivalents, only where nidirect covers them:** HC1/HC2/HC3 help with health costs (already a row, so check for gaps only), NI dental charges and NI sight tests. One row each at most.

`costs.js` row fields: `id, scheme, jurisdiction (ROI|NI), kind (medicines|gp|hospital|crossborder|other), who, covers, cost (plain words, no figure unless rule 3 is cleared), cap_amount (null), currency, cap_period, cap_unit, not_covered_note, how_to_apply, route_note, compare, volatile + volatile_reason, source_url, source_name, source_page_review_date, verify: true, urlStatus: "search-result"`. Propose a new `kind` if none fits (do not create one).

## Part B: vaccines not yet started
Existing rows: flu, COVID, PPV23 (GP and pharmacy), shingles, RSV adult (ROI and NI as listed). Add, per jurisdiction where an official page exists:
1. **MMR** (childhood schedule and catch-up wording as the page gives it).
2. **HPV** (school programme and any catch-up the page names).
3. **Hepatitis B** (HSE; NI via PHA/nidirect).
4. **Travel vaccines:** link to the official travel-health page only; no product or price statements.

`vaccines.js` row fields: `id, vaccine, jurisdiction, setting[] (gp|pharmacy|hospital|private), who, product_cost, admin_fee, fee_waived_if[], not_covered_note, clinician_check, season, valid_from, valid_to, volatile + volatile_reason, conflict_note, compare, source_url, source_name, source_page_review_date, verify: true, urlStatus: "search-result"`. Use `clinician_check` as a prompt to ask a GP, nurse or pharmacist, never advice. Where an ROI and NI page disagree, say so in `conflict_note` rather than reconciling.

## Part C: screening not yet built
Existing rows: BowelScreen, BreastCheck, CervicalCheck, diabetic retina screening (ROI); bowel, breast, cervical, AAA, diabetic eye (NI).
1. **Newborn:** newborn bloodspot, newborn hearing and newborn physical examination (HSE; NI via PHA).
2. **Antenatal:** which antenatal screening/scan pages exist on official sites (HSE and National Women and Infants Health Programme; NI PHA/HSC trusts). Describe the programme, not the test results.
3. **Lung:** report only what official pages say about any national or pilot lung screening in ROI or NI. Do not assume a programme exists or that it does not.
Propose the `kind` values needed (existing: cancer, eye, vascular); do not create them. Fields as `screening.js`: `id, programme, jurisdiction, kind, who, interval, how_invited, if_outside, cost (only if the page states it), note, compare, volatile + volatile_reason, source_url, source_name, verify: true`. No `opened` field.

## Part D: community services in priority areas
Logged in the plan as "not searched", not "does not exist". `county-matrix.js` shows near-zero counts in every community column (child and adult disability, PHN, CAMHS, allied health, dental, adult mental health), so this is a national gap, not a few counties.

**Method:** work by **HSE Health Region** (the six regions on `www2.hse.ie`), then assign each service to its physical-base county. This covers all counties evenly and avoids many near-identical searches. Use `GAPS.md` (population-adjusted) for the order inside each region, and leave Leitrim, Longford and North Cork alone (reviewed and closed).

Per region, in order: 1. Children's Disability Network Teams (CDNTs). 2. CAMHS. 3. PHN beyond the locator entry and the Wicklow rows. 4. Community dental. 5. Older persons. 6. Addiction services. 7. Domestic, sexual and gender-based violence services listed on HSE or Tusla pages. Use the HSE's own listing pages (team locators, "find a service") before individual clinic pages.

Row format: ready-to-paste `data.js` objects, as in the 7 Oct brief (`id: "roi-<county>-<slug>"`, `name`, `specialty` from existing ids, `county`, `blurb`, `details`, `referral` only if the page states it, `contact: { web }`, `source_url`, `urlStatus: "search-result"`, `verify: true`). Use `national` only for genuinely national services. NI-wide rows list the six NI counties.

## Part E: toolkit page gaps (retry from the 7 Oct search budget)
The 7 Oct passes ran out of budget on these, so most are "not reached", not "not found":
1. **Second opinion:** ROI (HSE National Healthcare Charter current URL; any Citizens Information or HSE page) and NI (nidirect; HSC trusts). The Charter wording risks reading as a rights claim, so quote it and link only.
2. **NI 111:** do not add from memory. Search nidirect and health-ni.gov.uk specifically for any NHS 111 pilot or service, and report what they say. If nothing, report "not found on nidirect", not "does not exist".
3. **ROI interpreter access:** an HSE patient-facing page. The NI BSO interpreting page is already drafted (7 Oct); do not repeat it.
4. **Adoptive leave and Adoptive Benefit** (Citizens Information, welfare.ie), **HSC post-placement adoption support**, **antenatal classes open to both parents**, **official pages on trans and non-binary parents** (run a dedicated search before logging "not found").

## Part F: Down, Londonderry, out-of-hours leftovers
- **Down and Londonderry:** not attempted in pass 2 beyond some trust rows. Cover the Southern, South Eastern, Northern and Western HSC Trust pages for the same service types as Part D, plus urgent care/minor injury units.
- **Out-of-hours:** Mayo (Westdoc Castlebar) and Louth (Nedoc Drogheda) rows exist from pass 2. Only search again if the merged rows still lack an official page. Do not change Sligo (Elaine is checking Caredoc Sligo vs NoWDOC) and do not re-raise the Louth Dundalk base beyond what `REVIEW.md` says.

## Out of scope for this brief
- **Conditions deep links** (about 89 of 104): a separate verify-then-store brief, in batches by body system.
- **Paid services:** none. Nothing here promotes, registers or announces them.
- **Instagram copy:** not part of research output.

## Output format
One file per session: `research/P3-<part>-<yyyy-mm-dd>.md`, containing:
1. **Summary table:** per part/area: rows drafted, withheld, not found, not reached.
2. **Candidate rows** in the layer's format (above).
3. **Source log:** per row, the URL, date read, the page's own review date, and one line on what it says. Figures read from pages (rule 3) go here only.
4. **Withheld rows:** reason and "un-withhold when".
5. **Duplicates and proposed edits** to existing rows.
6. **Hosts needing approval, not found, not reached, uncertainties** (conflicting sources, stale pages).

## After you finish
Elaine opens each `source_url` in a browser; only then can `verify` be cleared and `checked` set. Claude Code merges the rows by PR (`node --check`, size check and all four validators before and after; never push to `main`), then adds one `CHANGELOG.md` entry and one "Recent AI sessions" line.
