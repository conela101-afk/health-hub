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

- 2026-09-28 [Claude] — Removed the Grok/multi-AI lane-split coordination model; Claude Code is now the sole implementer across all layers. Removed every third-party network request (Google Fonts, cdnjs/Leaflet, OSM map tiles) — see `CHANGELOG.md` for the full breakdown.
- 2026-09-07 [Claude] — Added 6 crisis-category inpatient psychiatric unit entries (`data.js`: 591 → 597) and completed a sector filter audit: `sectorOf()` unified in `app.js`, added a "Voluntary" tab, tagged `hse-approved-ahr-clinics` as private. See `CHANGELOG.md` and `SECTOR_AUDIT.md`.
- 2026-09-06 [Claude] — Added `AI_RULES.md` and `MASTER-BUILD-PLAN.md` to the repo; reconciled the build plan's inventory table against the tracker work done earlier the same day. No `data.js` changes made this session.
- 2026-09-06 [Claude] — Added `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, `accessibility-statement.md`, reconciled against actual `data.js` counts and `GAPS.md`/`REVIEW.md` findings. No `data.js` changes made this session.
