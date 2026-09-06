# Changelog

Tool-tagged log of AI assistant sessions on this repo, per `AI_RULES.md`.

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
