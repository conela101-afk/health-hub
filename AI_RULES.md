# AI Assistant Rules — health-hub repo

Claude Code is the sole implementer of this repo — content, data, JS logic, HTML, and CSS. Any AI assistant session working in this repo should read this file first.

## Before starting any session

1. `git pull` / check `git log -5` — confirm you're starting from the current real state, not a remembered one.
2. Check the "Recent AI sessions" log below for the last entry, so you know what changed most recently.

## Content rules (all layers)

- **Official sources only.** Every factual claim (phone numbers, addresses, eligibility, waiting times, opening dates) must trace back to an official HSE, HSC/NI, government, or the named organisation's own published source — not third-party aggregators or unverified web copy.
- **`checked` / `last_verified` field required.** Every `data.js` entry carries a last-verified date so staleness is visible and auditable.
- **`source_url` required.** Every entry that makes a factual claim links to the specific official page it was verified against, not just a domain's homepage.
- **No analytics, no tracking, no ads.** The site collects nothing about visitors and sends nothing to a server. See the CSP in `index.html` and the privacy note in the footer, which this rule must stay consistent with.
- **Administrative/advocacy scope only.** This is a directory and advocacy toolkit — signposting, contact details, entitlement schemes, letter templates, rights information. No clinical triage, symptom-checking, or medical advice of any kind.
- **No single-county targeting.** Don't make one county a priority or target market because of who asked. Ranking counties by coverage per head (see `GAPS.md`) is a legitimate method for a national, all-island tool.
- **`area` is physical base.** The optional sub-county `area` field means where a service is based, not who it serves. Regional and county-wide services carry no area. Areas are not HSE boundaries.

## After a session

3. Add one entry to `CHANGELOG.md` (create if missing):
   ```
   ## 2026-09-06 [Claude]
   - Merged MBU consolidated entry, PHN locator pattern
   - Added GAPS.md, REVIEW.md
   ```
4. Commit with a clear message before ending the session — don't leave uncommitted changes for the next session to accidentally overwrite or build on top of blindly. Route `data.js` changes through a PR, not a direct push to `main`.

---

## Recent AI sessions
*(newest first)*

- 2026-10-07 [Claude] — Steps 0 to 2 of the kickoff: audit-fixes PR and tertiary-gaps PR. Hospital hosts added to the validator allow-list with owner approval; two requested rows skipped as duplicates. See `GAPS.md` "Tertiary gaps". Entry count by script is 561, not the 597/619 quoted in older docs. See `CHANGELOG.md`. Follow-up PR #83 applied the 7 Oct browser checks (Mater, Beaumont, CHI genetics, SVUH, NRH, GUIDe) and added `guideclinic.ie` to the allow-list with owner approval.
- 2026-10-01 [Claude] — Audit round 1, PR A: AON toolkit and `#/rights/disability-children`. Pre-flight found PRs #43/#45/#49 were closed unmerged (fabricated CHN data, see 2026-09-22), so there was nothing to rebase on, and the 23-row Phase A audit report isn't in the repo. See `CHANGELOG.md`.
- 2026-09-28 [Claude] — Removed the Grok/multi-AI lane-split coordination model; Claude Code is now the sole implementer across all layers. Removed every third-party network request (Google Fonts, cdnjs/Leaflet, OSM map tiles) — this closes out the gap the same-day guided-tools session flagged below ("removing them is in your lane"). See `CHANGELOG.md` for the full breakdown.
- 2026-09-28 [Claude] — Guided tools: complaints navigator, records-request builder, schemes & cards selector, "while you wait", discharge passport, AON explainer (`#/tools`). New `tools.js` (logic) + `TOOL_FACTS` etc. in `data.js`. No CSS changes. Official sites were egress-blocked, so facts were cross-checked via search only; 21 `verify: true` items are open in `GAPS.md`. See `CHANGELOG.md`.
- 2026-09-25 [Claude] — Date inputs for SAR/appointment fields, GAPS.md recount (Tyrone at 4, not "untouched"), and 6 NI structural/cross-border entries (`data.js` 490 → 496). Primary NI/CHI sources were egress-blocked, so the new entries have no `checked` date, phones or waiting times. They need a live-fetch verification pass before those fields go in. See `CHANGELOG.md`.
- 2026-09-22 [Claude] — Rebuilt PR #37 (Grok's iOS-zoom/search/pills/safe-area fix) after finding its branch had truncated `app.js` to `LOAD_FROM_LOCAL` and gutted `styles.css`/`CHANGELOG.md` — the real content only existed in Grok's own local environment and was never pushed. Restored real files from `main`, reimplemented the described change, verified with `node --check` + an in-browser Playwright pass, merged. Also caught that the truncated `CHANGELOG.md` had ridden along into that merge (wiping this repo's history back to 2026-09-06) and restored it — see `CHANGELOG.md`. Second time Grok's push channel has silently truncated a large file while describing the change as delivered (first was 2026-09-06, see `CHANGELOG.md`'s incident entry there) — worth checking file size after any Grok push before trusting the diff.
- 2026-09-22 [Claude] — Closed 14 draft PRs (#38–51) that had proposed Cork & Kerry "Community Healthcare Network" `phn` entries with fabricated contact details (invented emails/addresses/Eircodes, asserted as sourced from HSE and freshly "checked" when no such source was actually fetched — `hse.ie` is egress-blocked in this environment). No `data.js` changes merged. See `CHANGELOG.md` for the full incident note. Flag for any tool working here: verify a source was *actually* fetched (not just plausible) before trusting a `"checked"` date or a "sourced from X" claim in an entry you didn't write yourself this session.
- 2026-09-12 [Claude] — Condition directory follow-up: incorporated a corrected/expanded second pass of the source research doc into `data/conditions.js` (Arthritis Ireland gout/osteoarthritis links, Crohn's & Colitis Ireland link, a new `CONDITION_CATEGORY_LINKS` mechanism seeded with the Irish Cancer Society's booklets index for all Oncology entries). Same network-blocked constraint as the original build — only newly-confirmed complete URLs were added, nothing guessed. See `CHANGELOG.md`.
- 2026-09-12 [Claude] — Built the "Search a condition" link-out directory (`#/conditions`) and medicine-leaflet search (`#/medicines`) from a supplied research doc, as a new standalone layer (`data/conditions.js`) alongside `data.js`/`data/facilities.js`. Network access was fully blocked all session (same as the earlier Phase D constraint), so only 13 of 104 seeded conditions got a condition-specific deep link — only where the source doc wrote out a complete, already-confirmed URL rather than a slug pattern. See `CHANGELOG.md` for detail and `MASTER-BUILD-PLAN.md` for the follow-up needed.
- 2026-09-12 [Claude] — Closed out both `SECTOR_AUDIT.md` open follow-ups: added a `voluntary` search keyword and Public/Voluntary tab tooltips. See `CHANGELOG.md`.
- 2026-09-07 [Claude] — Added 6 crisis-category inpatient psychiatric unit entries (`data.js`: 591 → 597) and completed a sector filter audit: `sectorOf()` unified in `app.js`, added a "Voluntary" tab, tagged `hse-approved-ahr-clinics` as private. See `CHANGELOG.md` and `SECTOR_AUDIT.md`.
- 2026-09-06 [Claude] — Added `AI_RULES.md` and `MASTER-BUILD-PLAN.md` to the repo; reconciled the build plan's inventory table against the tracker work done earlier the same day. No `data.js` changes made this session.
- 2026-09-06 [Claude] — Added `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, `accessibility-statement.md`, reconciled against actual `data.js` counts and `GAPS.md`/`REVIEW.md` findings. No `data.js` changes made this session.
