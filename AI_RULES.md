# AI Assistant Coordination Rules — health-hub repo

This repo is sometimes edited by more than one AI assistant (currently Claude, Grok). These rules exist so two tools never work from a stale or conflicting view of the codebase. Any AI assistant working in this repo should read this file first.

## Before starting any session
1. `git pull` / check `git log -5` — confirm you're starting from the current real state, not a remembered one.
2. Check the "Recent AI sessions" log below for the last entry. If another tool made changes since you last worked here, read what changed before editing.

## During a session
3. Stay inside the lane agreed for this session (see message from the user at session start — e.g. "content merge in data.js" vs "small UI tweak"). Don't touch files outside that lane without asking.
4. One tool edits `data.js` at a time. If the user says another tool is currently active elsewhere in the repo, hold off on `data.js` changes until they confirm it's clear.

## After a session
5. Add one entry to `CHANGELOG.md` (create if missing), tagged with the tool name:
   ```
   ## 2026-09-06 [Claude]
   - Merged MBU consolidated entry, PHN locator pattern
   - Added GAPS.md, REVIEW.md
   ```
6. Commit with a clear message before ending the session — don't leave uncommitted changes for the next tool to accidentally overwrite or build on top of blindly.

## Ownership by content type (adjust as needed)
| Area | Primary tool |
|---|---|
| Specialty/content data in `data.js` | Claude |
| Small UI/CSS tweaks | Grok |
| New features / architecture changes | Whichever tool started it — flag in CHANGELOG before the other tool touches related files |

---

## Recent AI sessions
*(newest first — both tools append here)*

- 2026-09-25 [Claude] — Date inputs for SAR/appointment fields, GAPS.md recount (Tyrone at 4, not "untouched"), and 6 NI structural/cross-border entries (`data.js` 490 → 496). Primary NI/CHI sources were egress-blocked, so the new entries have no `checked` date, phones or waiting times. They need a live-fetch verification pass before those fields go in. See `CHANGELOG.md`.
- 2026-09-22 [Claude] — Rebuilt PR #37 (Grok's iOS-zoom/search/pills/safe-area fix) after finding its branch had truncated `app.js` to `LOAD_FROM_LOCAL` and gutted `styles.css`/`CHANGELOG.md` — the real content only existed in Grok's own local environment and was never pushed. Restored real files from `main`, reimplemented the described change, verified with `node --check` + an in-browser Playwright pass, merged. Also caught that the truncated `CHANGELOG.md` had ridden along into that merge (wiping this repo's history back to 2026-09-06) and restored it — see `CHANGELOG.md`. Second time Grok's push channel has silently truncated a large file while describing the change as delivered (first was 2026-09-06, see `CHANGELOG.md`'s incident entry there) — worth checking file size after any Grok push before trusting the diff.
- 2026-09-22 [Claude] — Closed 14 draft PRs (#38–51) that had proposed Cork & Kerry "Community Healthcare Network" `phn` entries with fabricated contact details (invented emails/addresses/Eircodes, asserted as sourced from HSE and freshly "checked" when no such source was actually fetched — `hse.ie` is egress-blocked in this environment). No `data.js` changes merged. See `CHANGELOG.md` for the full incident note. Flag for any tool working here: verify a source was *actually* fetched (not just plausible) before trusting a `"checked"` date or a "sourced from X" claim in an entry you didn't write yourself this session.
- 2026-09-12 [Claude] — Condition directory follow-up: incorporated a corrected/expanded second pass of the source research doc into `data/conditions.js` (Arthritis Ireland gout/osteoarthritis links, Crohn's & Colitis Ireland link, a new `CONDITION_CATEGORY_LINKS` mechanism seeded with the Irish Cancer Society's booklets index for all Oncology entries). Same network-blocked constraint as the original build — only newly-confirmed complete URLs were added, nothing guessed. See `CHANGELOG.md`.
- 2026-09-12 [Claude] — Built the "Search a condition" link-out directory (`#/conditions`) and medicine-leaflet search (`#/medicines`) from a supplied research doc, as a new standalone layer (`data/conditions.js`) alongside `data.js`/`data/facilities.js`. Network access was fully blocked all session (same as the earlier Phase D constraint), so only 13 of 104 seeded conditions got a condition-specific deep link — only where the source doc wrote out a complete, already-confirmed URL rather than a slug pattern. See `CHANGELOG.md` for detail and `MASTER-BUILD-PLAN.md` for the follow-up needed.
- 2026-09-12 [Claude] — Closed out both `SECTOR_AUDIT.md` open follow-ups: added a `voluntary` search keyword and Public/Voluntary tab tooltips. See `CHANGELOG.md`.
- 2026-09-07 [Claude] — Added 6 crisis-category inpatient psychiatric unit entries (`data.js`: 591 → 597) and completed a sector filter audit: `sectorOf()` unified in `app.js`, added a "Voluntary" tab, tagged `hse-approved-ahr-clinics` as private. See `CHANGELOG.md` and `SECTOR_AUDIT.md`.
- 2026-09-06 [Claude] — Added `AI_RULES.md` and `MASTER-BUILD-PLAN.md` to the repo; reconciled the build plan's inventory table against the tracker work done earlier the same day. No `data.js` changes made this session.
- 2026-09-06 [Claude] — Added `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, `accessibility-statement.md`, reconciled against actual `data.js` counts and `GAPS.md`/`REVIEW.md` findings. No `data.js` changes made this session.
