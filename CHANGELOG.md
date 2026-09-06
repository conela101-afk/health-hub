# Changelog

Tool-tagged log of AI assistant sessions on this repo, per `AI_RULES.md`.

## 2026-09-06 [Claude Code]
- **Full Phase D ingest, superseding the earlier 4-facility pilot.** The user supplied the original HIQA/RQIA/HIA/HSE source files directly, plus a pre-merged "master scaffold" CSV (4,111 rows across 5 sources — see `data/sources/README.md` for the full breakdown, verification done, and known gaps). Regenerated `data/facilities.js` from that scaffold via a new, reproducible `data/sources/build-facilities.py` script rather than hand-writing entries.
- Reworked the `#/facilities` page: was a flat list of 4 items, now an index-by-type page (15 regulated service types, from Disability Residential Centre at 1,805 records down to Adoption Agency at 3) linking to `#/facilities/<type>` list pages, each with a live client-side name/county/provider filter capped at 150 rendered rows at a time (4,111 rows is too many to render flat).
- Bumped `sw.js` cache v4 → v5 — `facilities.js` grew from a few KB to ~1.9MB.
- Fixed a real bug caught by browser testing: the new filter input used inline `style="..."` attributes, which this site's CSP (`style-src` with no `unsafe-inline`) silently blocks. Generalized the existing `#searchInput` CSS rule to `.search-field input` (shared by both search boxes) instead of adding more inline styles.
- Verified in-browser via Playwright: index and list pages render correctly, filter works, no CSP or other app-caused console errors. (The ~12s page-load time seen in this sandboxed test environment is a pre-existing artifact of Google Fonts/Leaflet CDN requests being network-blocked here — confirmed unchanged on the plain home page too, unrelated to this work; `facilities.js` itself loads in ~13ms.)
- Committed only the merged scaffold to `data/sources/`, not the 5 raw originals (HIQA CSVs, RQIA xlsx, HSE GeoHive CSV, HIA PDF) — avoids ~4MB of largely-redundant raw exports; the scaffold's `source`/`source_id`/`url` columns identify exactly which raw file and row to check if re-verification is ever needed.

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
