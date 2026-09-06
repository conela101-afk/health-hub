# Health Hub — Coverage Gap Tracker

Living checklist for closing the completeness gaps flagged in the external review (Sept 2026). Update as entries come in from crowdsourcing, HSE/HSC directories, or personal research passes.

**How to use:** mark a row 🔴 (0–1 services), 🟡 (2–4 services, or a gap partially closed), 🟢 (5+ services, or considered resolved) as you audit each county/specialty. Anything 🔴 or 🟡 is a crowdsourcing/research target.

**Relationship to other docs:** `GAPS.md` holds the population-adjusted (entries-per-100k) geographic analysis — that's the source of truth for county-level gaps, not the raw counts below. `REVIEW.md` logs the annual review pass. This file is the working checklist that sits on top of both, plus the specialty and card-depth angles those two don't cover.

---

## 1. Priority gaps (carried over from prior sessions)

| Gap area | Scope | Status | Notes |
|---|---|---|---|
| PHN (Public Health Nurse) contacts | All ROI counties | 🟢 Resolved (by design) | Per `REVIEW.md` 2026-09-05: standalone Cork-area PHN entries replaced with a single `phn-locator` entry pointing to the HSE Primary Care Centre locator + HSC Service Finder (NI). Deliberate locator pattern, not a gap — revisit only if the locator link breaks. |
| Breastfeeding support groups | All ROI + NI counties | 🟢 Resolved | 7 `feeding`-tagged entries: Cuidiú (Cork), La Leche League, Friends of Breastfeeding, NI breastfeeding support (PHA), plus a `find-breastfeeding-group` HSE locator entry. Both jurisdictions covered. |
| Urology / urogynaecology routing | ROI + NI | 🟡 Partial | `find-urology` entry now gives explicit routing guidance (urogynae vs general urology, since symptoms overlap) — the main ask from the review. Underlying `urology` tag count is still just 6 entries nationally (thin outside Cork: `cuh-urology`, plus cross-tagged gynae/urology entries). Next step: source 1–2 more per-region urology contacts, not more routing prose. |
| Gynae-oncology / colposcopy clinics | ROI + NI | 🟡 Partial | Cork covered directly (`cumh-colposcopy`, gynae-oncology rapid-access entry, both cross-referencing NCCP guidelines in their `referral` text) plus a `find-gynae-oncology-colposcopy` national locator entry. Still no compact list of designated NCCP centres outside Cork — that cross-reference is the remaining task, not new listing types. |
| NI service density (all specialties) | Northern Ireland | 🟡 Partial | Confirmed by `GAPS.md`'s population-adjusted analysis (5 Sep 2026): Down (0.54/100k), Londonderry (1.19), Armagh (1.54), Tyrone (1.59) are the real mismatches — Antrim (37 entries) absorbs most NI coverage. See `GAPS.md` for the full ranked list; that file is the priority order to work from, not raw county counts. |

## 2. County-level density audit (ROI)

Raw counts below are a quick reference only — `GAPS.md` already ran the population-adjusted version and is more reliable for prioritisation (a small county with few services isn't necessarily under-served). Don't re-derive priority from this table; use it just to sanity-check `GAPS.md`'s numbers.

| County | Total services | Status | Priority specialties missing |
|---|---|---|---|
| Cork City | 51 | 🟢 | — |
| Dublin | 96 | 🟢 | — |
| Antrim (NI) | 37 | 🟢 | — |
| Galway | 24 | 🟢 | — |
| Limerick | 19 | 🟢 | — |
| Cork West | 11 | 🟢 | — |
| Clare | 12 | 🟢 | — |
| Waterford | 12 | 🟢 | — |
| Kerry | 8 | 🟡 | — |
| Tipperary | 10 | 🟡 | — |
| Kildare | 6 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Wicklow | 6 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Kilkenny | 6 | 🟡 | — |
| Westmeath | 6 | 🟡 | — |
| Donegal | 5 | 🟡 | — |
| Sligo | 5 | 🟡 | — |
| Armagh (NI) | 5 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Down (NI) | 5 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Londonderry (NI) | 5 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Carlow | 4 | 🟡 | — |
| Cavan | 4 | 🟡 | — |
| Louth | 4 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Mayo | 4 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Monaghan | 4 | 🟡 | — |
| Offaly | 4 | 🟡 | — |
| Wexford | 4 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Fermanagh (NI) | 4 | 🟡 | — |
| Tyrone (NI) | 4 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Laois | 3 | 🟡 | — |
| Leitrim | 3 | 🟢 (reviewed, closed) | Small population — proportionate, per `GAPS.md`. No action needed. |
| Meath | 3 | 🟡 | (population-adjusted gap — see `GAPS.md`) |
| Roscommon | 3 | 🟡 | — |
| Longford | 2 | 🟢 (reviewed, closed) | Small population — proportionate, per `GAPS.md`. No action needed. |
| North Cork | 1 | 🟢 (reviewed, closed) | Small population within Cork — proportionate, per `GAPS.md`. No action needed. |

## 3. Specialty-level density audit

Counted directly from `data.js` (446 entries total, updated 6 Sep 2026 evening). Specialties under 5 services:

| Specialty | Total services | Status | Notes |
|---|---|---|---|
| PHN | 2 | 🟢 (by design) | Locator-pattern entries, not a raw-count gap — see §1. |
| Dental & Oral Health | 4 | 🟢 (by design) | Two entitlement schemes (DTSS, Treatment Benefit) + a public-clinic locator + an NI-crisis explainer already answer "how do I actually get dental care" — same locator-pattern logic as PHN. Raw count isn't the right measure here; not adding more entries just to hit a number. |
| Children's Disability | 4 | 🟡 | Still open — not a Tier 2/3 build-plan item, lower priority. |
| Adult Mental Health | 4 | 🟡 | Worth checking against `mh` (20) and `crisis` (5) for overlap before treating as a true gap. |
| Weight Management | 4 | 🟡 | Grew from 2 via the earlier Tier 2 specialty build-out; still borderline. |

Resolved since the last pass (6 Sep 2026, this session):
- **Addiction & Substance Use**: 3 → 7 🟢 — added Coolmine TC, Merchants Quay Ireland, Cuan Mhuire network (5 sites incl. NI), Addiction NI. See `REVIEW.md`.
- **Neurology & Migraine**: 2 → 7 🟢 — added Beaumont National Neuroscience Centre, MS Ireland, Epilepsy Ireland, MS Society NI, Epilepsy Action NI.
- **Dermatology**: 2 → 5 🟢 — added St James's, Cork University Hospital, and Royal Victoria Hospital Belfast dermatology departments.
- **Bone Health & Osteoporosis**: 4 → 6 🟢 — added an "About the Irish Fracture Liaison Service" explainer (coverage is genuinely patchy — Beaumont/St James's/St Vincent's confirmed, Mid-West/South-West had none per the national database report) and the Royal Osteoporosis Society for NI users.
- **Haematology**: 4 → 7 🟢 — added the National Coagulation Centre (St James's — the actual clinical service behind the Irish Haemophilia Society charity entry), plus Cork University Hospital and University Hospital Limerick regional haematology.
- **Cardiology**, **General Paediatrics**: already at 5 and 6 respectively from the earlier Tier 1/2 specialty build-out (PR #9) — tracker previously understated these.

All of the build plan's Tier 3 thin-category list (`MASTER-BUILD-PLAN.md` §2 Phase A item 7) is now resolved: Eating Disorders, Dermatology, Cardiology, Bone Health, Breastfeeding, Dental, Haematology.

Still at exactly 5 (🟡/🟢 borderline, not re-verified this pass): Genetics, Eating Disorders, Crisis, Nephrology, Allergy & Immunology, Older Persons.

Specialties flagged by the review as high-traffic even though not thinnest:

| Specialty | Total services | Status | Notes |
|---|---|---|---|
| Neurodiversity/ADHD/Autism | 9 | 🟡 | Adult ADHD/autism pathways added since the review (see git log, `9f81674`). Worth a fresh look before assuming this is still under-served. |
| Women's health (gynae/obs/menopause/contraception/fertility cluster) | gynae 44, obs 33, menopause 14, contraception 11, fertility 9 | 🟢 | Original scope area — depth confirmed, hasn't regressed as the app expanded into other specialties. |
| Domestic/sexual violence | 29 | 🟢 | Strong coverage — no action needed. |

## 4. Card-level enrichment (depth, not breadth)

The dataset already has working equivalents for most of the fields the review asked for — see `service-card-enrichment-template.md` for how the template's proposed fields map onto the existing `data.js` schema (`contact.phone`, `referral`, `checked`). This section tracks actual coverage of those fields across all 422 entries (counted 6 Sep 2026):

- [x] Phone number present — 286/422 (68%). 60 entries have neither a phone nor a web link; that's the real gap, not phone specifically.
- [x] Access route stated (`referral` field) — 419/422 (99%). Essentially done; spot-check the remaining 3 rather than a full pass.
- [ ] Last-reviewed date stamped (`checked` field) — 321/422 (76%). ~101 entries predate the convention — batch-stamp these as they're touched for other reasons, per the enrichment template's workflow, rather than a dedicated sweep.
- [ ] Cost/eligibility note (for private listings) — no structured field exists yet; currently folded into free-text `blurb`/`details` where present at all. Decide whether this needs a real schema field before batch-processing (see enrichment template).

Suggested rollout: batch-process by specialty rather than card-by-card, so you can source phone numbers/access routes from one HSE/HSC directory page at a time.

## 5. Accessibility audit (separate track, lower urgency than content gaps)

- [ ] Keyboard-only navigation pass (tab order, focus visibility, skip-link works)
- [ ] Screen reader pass (VoiceOver or NVDA) on home, specialty list, service card, advocacy pages
- [ ] Colour contrast check beyond Calm mode (WCAG AA minimum 4.5:1 for body text)
- [ ] Publish a short accessibility statement (draft: `accessibility-statement.md`)

---

*Last updated: 6 Sep 2026 — reconciled against actual `data.js` counts and `GAPS.md`/`REVIEW.md` findings.*
*Source review: external UX/content audit, September 2026*
