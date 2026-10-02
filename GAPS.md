# Geographic Coverage Review

Reviewed 5 Sep 2026 against 2022 CSO / 2021 NISRA population data, by
computing entries-per-100k-population across all 32 counties.

**Finding:** population density does not fully explain the skew in entry
counts per county — a clear secondary pattern showed up.

## Confirmed genuine gaps (population-adjusted)

Lowest entries per 100k population, relative to county population:

| County | Entries | Population | Entries/100k |
|---|---|---|---|
| Down | 3 | 553,261 | 0.54 |
| Londonderry | 3 | 252,231 | 1.19 |
| Meath | 3 | 220,826 | 1.36 |
| Armagh | 3 | 194,394 | 1.54 |
| Tyrone | 3 | 188,383 | 1.59 |
| Wicklow | 3 | 155,851 | 1.92 |
| Kildare | 6 | 247,774 | 2.42 |
| Wexford | 4 | 163,919 | 2.44 |
| Louth | 4 | 139,703 | 2.86 |
| Mayo | 4 | 137,970 | 2.90 |

These split into two groups:

1. **Dublin commuter-belt counties** (Kildare, Meath, Wicklow, Louth) —
   large populations, but entries likely got absorbed into "Dublin"
   listings rather than logged separately.
2. **NI counties outside Antrim** (Down, Londonderry, Armagh, Tyrone) —
   Belfast/Antrim entries dominate, the other five NI counties are thin.

## Confirmed NOT gaps

Low counts explained by genuinely small populations — proportionate
coverage, not neglect:

- Leitrim (35k, rate 8.52)
- Longford (47k, rate 4.28)
- Cork North (small population within Cork)

## Next research priority order

1. Down, Londonderry, Meath, Armagh, Tyrone (biggest population-to-coverage mismatch)
2. Wicklow, Kildare, Wexford, Louth, Mayo (secondary tier)
3. Leitrim, Longford, Cork North — no action needed, reviewed and closed out.

Next geo review due: Sep 2027.

## Progress update: 6 Sep 2026

Worked the top of the priority list (Down, Londonderry, Meath, plus partial Armagh coverage as a side effect — see `REVIEW.md` for the specific entries added):

| County | Entries (5 Sep) | Entries (6 Sep) | Rate (5 Sep) | Rate (6 Sep) |
|---|---|---|---|---|
| Down | 3 | 8 | 0.54 | 1.45 |
| Londonderry | 3 | 7 | 1.19 | 2.78 |
| Meath | 3 | 4 | 1.36 | 1.82 |
| Armagh | 3 | 7 | 1.54 | 3.60 |

Real improvement, but none of these are "closed out" yet the way Leitrim/Longford/Cork North are — they've moved off the absolute floor, not up to Cork-City-level adequacy. **Tyrone is now the only untouched county from the original top-5 list.** Wicklow/Kildare/Wexford/Louth/Mayo (secondary tier) also untouched.

## Progress update: 25 Sep 2026 (recount against live `data.js`)

**Correction to the 6 Sep note above:** Tyrone is *not* "the only untouched
county" any more. A fresh count of `data.js` (490 entries, counting every
entry whose `county` array includes the county) shows it has moved off the
3-entry floor, and the secondary tier has shifted too:

| County | Entries (5 Sep) | Entries (25 Sep) | Rate (25 Sep) | Where the change came from |
|---|---|---|---|---|
| Down | 3 | 8 | 1.45 | 6 Sep geo push |
| Londonderry | 3 | 7 | 2.78 | 6 Sep geo push |
| Meath | 3 | 5 | 2.26 | 6 Sep geo push + Drogheda psychiatry (7 Sep) |
| Armagh | 3 | 7 | 3.60 | 6 Sep geo push (side effect) |
| Tyrone | 3 | 4 | 2.12 | Western/Southern-cross entries tagged to Tyrone: Western Trust maternity, SWAH gynae, SWAH orthopaedics, NI CAMHS |
| Wicklow | 3 | 5 | 3.21 | Side effect only (NMH, Jigsaw, Purple House, ASI tagged across counties) |
| Kildare | 6 | 8 | 3.23 | Side effect only (UPMC Kildare, Cuan Mhuire network) |
| Wexford | 4 | 4 | 2.44 | Unchanged |
| Louth | 4 | 5 | 3.58 | Side effect only (Drogheda psychiatry) |
| Mayo | 4 | 4 | 2.90 | Unchanged |

Note: a planning note put Tyrone at 5 entries; the actual count in `data.js`
on 25 Sep is 4. Recount before quoting a figure — don't copy this one forward.

Tyrone's gain is all cross-county Western/regional entries. It still has
**no Tyrone-specific service** (nothing based in Omagh, Dungannon, Cookstown or
Strabane), so it remains on the priority list. It's just no longer untouched.

The secondary tier (Wicklow/Kildare/Wexford/Louth/Mayo) has had **no
dedicated research pass yet**. Where counts went up, it was because
multi-county or Dublin-hospital entries also listed these counties. Wexford
and Mayo haven't moved at all. Next step is still a proper local-services pass
on these five, starting with Wexford and Mayo.

## County coverage matrix, ROI (1 Oct 2026, updated 2 Oct 2026)

Generated from `data.js` by `node scripts/county-matrix.js` (add `--areas` for the sub-county rows).
An entry counts for a county if its `county` array includes it, and an entry's optional `area` counts
toward the county total. Cork is one county (`cork`) with sub-areas. Recount before quoting a figure.

| County | All | Child disab. | Adult disab. | PHN | CAMHS | Allied | Dental | Adult MH |
|---|---|---|---|---|---|---|---|---|
| Carlow | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Cavan | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Clare | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Cork | 68 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Donegal | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Dublin | 129 | 0 | 0 | 0 | 1 | 0 | 0 | 7 |
| Galway | 28 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Kerry | 8 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| Kildare | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Kilkenny | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Laois | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Leitrim | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Limerick | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Longford | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Louth | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| Mayo | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Meath | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| Monaghan | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Offaly | 4 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| Roscommon | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Sligo | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tipperary | 10 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| Waterford | 15 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| Westmeath | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Wexford | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Wicklow | 5 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |

Areas within Cork (navigation only, not HSE boundaries):

| County | All | Child disab. | Adult disab. | PHN | CAMHS | Allied | Dental | Adult MH |
|---|---|---|---|---|---|---|---|---|
| West Cork | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| East Cork | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| North Cork | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Cork City | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| South Cork | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| No area (whole county) | 56 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Reconciliation: areas + no area = 68; Cork county total = 68. OK

Sub-county coverage: Cork has an `area` field; other counties may follow. `area` means where a
service is physically based, not who it serves, and is not an HSE boundary. Regional and county-wide
services (CUH, CUMH, Mercy, SIVUH, private hospital groups, networks) carry no area, so most Cork
entries sit under "No area". Two city-based community charities (`cork-arc-house`,
`cork-cancer-care-centre`) are tagged `cork-city` as a judgement call. Change them if you read the
rule differently. `north-cork` and `south-cork` are empty until local rows exist.

**Confirmed from this count**
- Every children's disability, PHN, allied health and dental entry in the ROI is tagged `national`
  (child disability 4, PHN 2, allied health 7). No county has a local entry in any of these
  categories, so the matrix shows 0 for all 26. Locator entries are the design (see 2026-09-05
  PHN decision).
- CAMHS has 1 multi-county entry (Dublin, Kerry, Offaly, Tipperary, Waterford, Wicklow) and nothing
  local elsewhere.
- Lowest totals: Longford 2, Laois 3, Leitrim 3, Roscommon 3, Carlow 4, Cavan 4, Mayo 4, Monaghan 4,
  Offaly 4, Wexford 4. Dublin (129) and Cork (68) hold most local entries.

**Possible gaps (not confirmed)**
- Low counts in small counties can be proportionate (see the 5 Sep review). Rate per 100k was not recomputed.
- The step "baseline each county from the HSE CDNT finder and primary care centre finder" was **not
  done**. hse.ie is egress-blocked in this environment, so per-county CDNT and primary care centre
  counts are unknown. Do it with a real browser, for every county.
- Treat CHO / Health Region labels as `verify before publishing`; the HSE moved to Health Regions in
  2024 and labels differ by source.

## Guided tools: open verify items (28 Sep 2026)

The guided tools (`#/tools/...`, logic in `tools.js`, facts in `data.js` →
`TOOL_FACTS`) show a "Check the official page before relying on this" label
on every fact marked `verify: true`. These are the open ones. Close one only
after reading the live official page in a real browser. Then set
`verify: false`, update `last_verified`, and remove its row here.

**How the facts were checked, and why it matters.** Every official domain
was egress-blocked in the build environment, for both curl (all 49 new URLs
returned `000`) and direct page fetch. Each URL was instead confirmed to
appear in live web-search results for that organisation, and the fact
wording was checked against those result summaries. That's weaker than
reading the page. A real-browser pass over all 49 URLs is the first job for
the next session with normal network access. The list is in `REVIEW.md` →
"Guided tools verification".

| Fact id | Jur. | Volatility | Why it's open | Source to check |
|---|---|---|---|---|
| `roi-ysys-stage2-ack` | ROI | medium | Stage 2 acknowledgement time: sources don't agree | https://www2.hse.ie/complaints-feedback/your-service-your-say-stages/ |
| `roi-ysys-stage3-deadline` | ROI | medium | "30 days" vs "30 working days" to request Stage 3 | https://www.patientadvocacyservice.ie/faq/explaining-your-service-your-say-the-hse-complaints-process/ |
| `roi-ysys-stage3-skip` | ROI | medium | Whether Stage 3 can be skipped before the Ombudsman | https://ombudsman.ie/en/publication/96a1b-before-making-a-complaint/ |
| `roi-ombudsman-clinical` | ROI | medium | The brief said "the Ombudsman doesn't review clinical judgement". That exclusion is long-standing, but reform has been pursued (Patient Safety Act 2023 era), and we couldn't confirm whether it has changed or been commenced | https://ombudsman.ie/en/organisation-information/44555-other-amendments-to-the-ombudsman-act/ |
| `roi-private-ombudsman` | ROI | medium | Ombudsman remit over private providers (e.g. private nursing homes) | https://ombudsman.ie/en/collection/72275-your-questions/ |
| `roi-ysys-backup` | ROI | high | Reports that the HSE online form is unavailable or slow; YSYS 1800 424 555 and HSE Live 1800 700 700 numbers | https://www2.hse.ie/complaints-feedback/your-service-your-say/ |
| `ni-independent` | NI | medium | Whether NIPSO covers independent providers depends on funding | https://www.nipso.org.uk/faqs |
| `rr-roi-extensions` | ROI | medium | Extension periods for FOI vs GDPR | https://www.citizensinformation.ie/en/health/legal-matters-and-health/access-to-medical-records/ |
| `rr-roi-private` | ROI | medium | Private-provider timelines | same |
| `rr-roi-voluntary` | ROI | medium | Which voluntary hospitals take FOI | same |
| `rr-ni-deceased` | NI | low | Access to Health Records (NI) Order 1993: who can apply | https://www.health-ni.gov.uk/articles/access-health-records-northern-ireland-order-1993 |
| `rr-ni-child` | NI | medium | Parent SARs for a child's records | https://nidirect.gov.uk/articles/accessing-medical-or-health-and-social-care-records |
| `sc-niphs-temporary` | ROI | high | NIPHS is temporary: end date and claim caps | https://www2.hse.ie/services/schemes-allowances/niphs/how-much-you-can-claim/ |
| `sc-ni-roi-scheme-closed` | NI | low | RoI Reimbursement Scheme closed 21 Sep 2022. Only a secondary source (Border People / Irish News) was found | https://borderpeople.info/a-z/cross-border-healthcare-directive-eu-replacement-schemes.html |
| `sc-ni-wlrs` | NI | high | **Not in the brief.** NI Waiting List Reimbursement Scheme (opened 2 June 2025, extended to the EU 15 Sep 2025, prior approval). Added because leaving it out would imply NI residents have no scheme. Funding and status change | https://online.hscni.net/our-work/travelfortreatment/wl-reimbursement/ |
| `sc-cards-printing` | ROI | high | HSE pause on printing plastic cards after the 2026 cyberattack on its printing provider | https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/medical-card/ |
| `wy-removed` | ROI | medium | What to do if removed after validation | https://www.ntpf.ie/information-for-patients-and-public/information-for-patients-and-public-faqs/ |
| `wy-planned` | ROI | low | Plain-language definition of "planned procedure" not found verbatim | https://www.ntpf.ie/app/uploads/2024/10/NTPF-IDPP-Full-Online-Version-Final.pdf |
| `wy-ask-status-ni` | NI | low | How to ask your status in NI (booking centres vary by Trust) | https://www.health-ni.gov.uk/articles/outpatient-waiting-times |
| `wy-roi-latest` | ROI | high | ROI counts deliberately not copied. Check the August 2026 NTPF release directly | https://www.ntpf.ie/waiting-list-data/ |
| `aon-bill` | ROI | high | Banner now: Bill 88 of 2026 debated at Dáil Second Stage 23 Sep 2026, not law (wording from the Pass 4 brief). Sources earlier disagreed on dates and the Oireachtas tracker lags. Re-read before merge | https://www.oireachtas.ie/en/bills/bill/2026/88/ |
| `aon-service-statement` | ROI | medium | "Report date + 1 month (7 months overall)" comes from the brief. Confirm against the Act and HSE AON procedure | https://www.citizensinformation.ie/en/health/health-services/health-services-for-people-with-disabilities/assessment-of-need-for-people-with-disabilites/ |
| `aon-review` | ROI | medium | Pass 4: no one-year review rule. The review period is set in each assessment report, so the calculator only has an optional field for the date stated in the report | https://www.citizensinformation.ie/en/health/health-services/health-services-for-people-with-disabilities/assessment-of-need-for-people-with-disabilites/ |
| `aon-repeat-12m` | ROI | medium | s.9(7): HSE may refuse a repeat child application within 12 months. A limit, not an entitlement. Section number from the Pass 4 brief | same |
| `aon-complete` | ROI | medium | Completion period is in regulations (S.I. 263/2007 as amended), not yet opened. "6 months in all" is from guidance. s.9(5) start period (3 months) cited | same |
| `aon-appeals-officer` | ROI | high | s.18 reference and Disability Appeals Officer contact details and time limit not confirmed | https://www.citizensinformation.ie/en/health/health-services/health-services-for-people-with-disabilities/assessment-of-need-for-people-with-disabilites/ |
| `aon-s22` | ROI | high | Pass 4: mediation s.19 (optional), High Court appeal on a point of law only s.20, Circuit Court enforcement s.22. Section numbers come from the brief and were not read by us (statute sites blocked). Confirm on irishstatutebook.ie | https://www.irishstatutebook.ie/eli/2005/act/14/enacted/en/html |
| `aon-s14-form`, `aon-hse-dates`, `aon-private-report`, `aon-legal-aid`, `aon-cdnt-finder`, `aon-seno`, `aon-dca-chain` | ROI | medium/high | Added 1 Oct 2026 from search cross-check only. `aon-dca-chain` mentions the Carer's Support Grant and medical card link, and rates are deliberately not shown | see each fact's `source_url` |

### Also open (not facts, but gaps in what the tools cover)

- **Third-party requests still in the page.** `styles.css` line 1 imports
  Google Fonts, and `index.html` loads Leaflet from cdnjs. Both break the
  "no third-party requests / no web fonts / no CDNs" rule the guided tools
  were built under. They're styling and map code (Grok's lane / existing
  feature), so they're disclosed in the footer privacy notice for now rather
  than removed. Removing them would let that part of the notice go.
- **Print CSS** doesn't know about `.guide-list` / `.checked-note`.
  `tools.js` works around this by hiding non-letter blocks while printing.
  A one-line CSS rule would be cleaner (Grok's lane).
- **Public holidays** aren't skipped by the working-day date helper. The UI
  says so on every date output.
- **NI complaints letter for NIPSO** isn't generated. NIPSO has its own
  online form, which the navigator links to.

## Cork CDNTs (2 Oct 2026)

HSE parliamentary-question replies (PQ 18815/25, PQ 6858/23, search results only, PDFs not opened)
list **11 Cork teams, CDNT 4 to 14**, and 14 across Cork and Kerry. 4 North West Cork, 5 North East
Cork, 6 East Central Cork (Midleton, Youghal), 7 East Cork City (Cobh, Glanmire), 8 Central Cork,
9 North Cork City and Blarney, 10 West Cork, 11 South East Cork City, 12 West Central Cork,
13 Carrigaline, Kinsale and Bandon, 14 South Cork City. Rows added so far: CDNT 6 and 7 (both
`area: "east-cork"`), plus the county-wide `cdnt-cork-overview` in the Phase A PR.

Human checks before merge:
- [ ] Open both PQ PDFs: confirm the numbering and the CDNT 6 and 7 catchments.
- [ ] Open the HSE CDNT finder for Midleton, Youghal, Cobh and Glanmire: record team names only.
- [ ] CDNT 7: if the catchment is mostly Cork City, change `area` to `cork-city`.
- [ ] Decide whether `south-cork` stays in `AREAS`. Labels are navigation only, not HSE boundaries.
- [ ] CDNT 6 lead agency: one job listing names COPE Foundation, an earlier note named Horizons. Not stated anywhere until an official page is opened.

Not in the repo: the Pass 3 draft rows `cdnt-west-cork`, `cdnt-carrigaline-kinsale-bandon` and
`cdnt-west-central-cork-city` (with phone numbers, emails and addresses) were never added to `data.js`,
and no "ten Cork teams" wording exists. If they come back, they must follow the same rules: no contacts
until `urlStatus: "opened"`, `area` per catchment (CDNT 10 `west-cork`, 13 `south-cork` to confirm).
