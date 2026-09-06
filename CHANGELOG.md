# Changelog

Tool-tagged log of AI assistant sessions on this repo, per `AI_RULES.md`.

## 2026-09-06 [Claude Code]
- Added `data/facilities.js` (Phase D — see `MASTER-BUILD-PLAN.md` §2 Phase D and the Phase D decision doc) — a standalone "Find a Facility" layer, kept separate from `data.js`, not cross-referenced or deduped against it this pass.
- New "Find a Facility" page (`#/facilities`), reachable from a home-page quick-link pill, clearly labelled as covering only regulated residential centres (nursing homes + disability residential via HIQA, registered services via RQIA) — not hospitals or outpatient services.
- **Scope change from the Phase D spec:** the spec called for ingesting the live HIQA/RQIA CSV exports directly. This session's network egress is fully blocked (confirmed via multiple unrelated domains, not HIQA-specific — even example.com and data.gov.ie fail the same way), so the bulk fetch isn't possible here. Seeded `data/facilities.js` instead with 4 real, individually verified facilities (3 HIQA-registered nursing homes, 1 RQIA-registered NI service) as a working pilot of the schema and UI, clearly labelled in-app as a pilot rather than the full register. No disability-residential example included — individual centre addresses for that population aren't surfaced through public search, reasonably for resident privacy, unlike nursing homes.
- Attribution text for HIQA and RQIA/OGL included in `data/facilities.js` and shown in-app.
- Added `data/facilities.js` to `sw.js`'s precache list, bumped cache version to v4 so existing installs pick it up.
- Drive-by fix: the homepage's "By specialty" tile had a hardcoded "41 categories" (stale since the specialty list grew to 52) — made it read `SPECIALTIES.length` dynamically.
- Verified in-browser via Playwright: the facilities page renders correctly (page-head, two scope-callouts, grouped sections, per-entry phone/address/source links), no app-caused console errors.
- **Next step, when unblocked:** either fetch the real HIQA/RQIA CSVs directly (network access needed) or have the CSVs uploaded into a session for a full ingest — see `data/facilities.js`'s header comment for the exact source URLs and target schema.

## 2026-09-06 [Claude]
- Geo push per `GAPS.md` priority order: Down (3→8), Londonderry (3→7), Meath (3→4), Armagh (3→7, as a side effect of two multi-county entries). Added Women's Aid Armagh Down, Foyle Women's Aid, Meath Women's Refuge & Support Services, Zest (Derry), and the Southern Trust Mental Health Referral and Booking Centre.
- Tyrone is now the only untouched county from `GAPS.md`'s original top-5 priority list.
- `data.js` now at 456 entries.

## 2026-09-06 [Claude]
- Enriched Bone Health & Osteoporosis (4 → 6: Irish Fracture Liaison Service explainer, Royal Osteoporosis Society NI) and Haematology (4 → 7: National Coagulation Centre, CUH Haematology, UHL Haematology).
- Reviewed Dental & Oral Health (4 entries) and judged it adequate by design (schemes + locator + NI explainer), same reasoning as PHN — no new entries added there.
- This closes every item in `MASTER-BUILD-PLAN.md`'s Tier 3 thin-category list.
- `data.js` now at 451 entries.

## 2026-09-06 [Claude]
- **Incident recovery:** `main`'s `data.js` had been wiped to a placeholder by two commits pushed directly to `main` (not this tool, not via PR). Restored the full 430-entry file from the last good commit (PR #11).
- Enriched Addiction & Substance Use from 3 to 7 entries (Coolmine TC, Merchants Quay Ireland, Cuan Mhuire network, Addiction NI) — all details verified via live web search.
- Redid the RVEEH/SLRON/UPMC batch the broken commits had claimed but never actually written: RVEEH phone/waiting-time enrichment, plus new entries for St Luke's Radiation Oncology Network, UPMC Whitfield, UPMC Kildare, and UPMC Sports Surgery Clinic.
- Enriched Neurology & Migraine (2 → 7: Beaumont National Neuroscience Centre, MS Ireland, Epilepsy Ireland, MS Society NI, Epilepsy Action NI) and Dermatology (2 → 5: St James's, Cork University Hospital, Royal Victoria Hospital Belfast dermatology departments).
- `data.js` now at 446 entries. Updated `coverage-gap-tracker.md` and `REVIEW.md` to match, including corrected counts for Cardiology/Paediatrics that the tracker had understated.

## 2026-09-06 [Claude]
- Added `AI_RULES.md` (multi-AI coordination rules) and `MASTER-BUILD-PLAN.md` (streamlined build order), reconciling the build plan's inventory table and Phase A/C/E status against what's actually already in `data.js`/`REVIEW.md`.
- No `data.js` changes this session.

## 2026-09-06 [Claude]
- Added `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, `accessibility-statement.md`.
- Reconciled tracker statuses and enrichment-template field mappings against actual `data.js` counts (422 entries) rather than committing the drafts verbatim.
- No `data.js` changes this session.
