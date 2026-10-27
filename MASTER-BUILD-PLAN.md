# Health Hub: Master Build Plan (v4, lean)

26 Oct 2026, synced 27 Oct 2026 to `main` at `7582505` (PR #134). Replaces v3 (21 Oct). First checked against `main` at `be10edb` (25 Oct, PR #133) and the Project docs. Plan only: no `data.js` or code change.

Recount before quoting any figure. Plan quotes none: `node scripts/validate-data.js`, `validate-costs.js`, `validate-screening.js`, `validate-vaccines.js`, `node scripts/county-matrix.js`, `node scripts/test-doors.js`, `node scripts/search-audit.js`.

## 1. State of play
- **Built:** directory, guided tools, AON toolkit, conditions, facilities, costs, screening, vaccines, search v2, pregnancy page, install page, privacy layer, guides (after a death, interpreting), AskCI link, feedback form link.
- **Four doors** (brief `docs/briefs/four-doors-2026-10-25.md`): PR 1 hubs, PR 2 Home and search, PR 3 "Where do I start?" merged. **PR 4 (colour tokens) not started.**
- **Content added since v3, all unverified:** community-services rows (all ROI), 24 Oct ROI coverage-gap rows, 23 Oct gap-register rows, cost schemes Part A (merged; v3 wrongly said not merged).
- **Retired from v3:** phase letters A to F, the brief index table, the duplicate constraints list (see `AI_RULES.md`).

## 2. Priorities (in order)
**P0. Verification debt.** Every content pass adds `verify: true` rows; only Elaine clears them.
1. Run sprint 2 (not yet run; Elaine runs it when she has time, no date, 27 Oct: do not run or simulate it) from `verification-sprint-2-2026-10-24.md` (Project doc; not in repo, see §4). Guided-tools facts, then cost, screening and vaccine rows. Next session after Four doors PR 4 review.
2. Then community-services and coverage-gap rows, then Advocacy-guide figures after Budget 2027.
3. Rule: no new content passes until P0 is back below the 8 Oct level. Research and briefs are fine.

**P1. Four doors PR 4.** Colour tokens and visual refresh. Needs contrast numbers in the PR and the known `#/advocacy/schemes` 4.28:1 failure fixed. Then the 3-person find-it test (old vs new), logged in `REVIEW.md`.

**P2. Accessibility.** Screen reader, Safari and touch testing, then publish `accessibility-statement.md` with verified claims only.

**P3. Housekeeping (Elaine).**
- CI by hand (push token cannot edit workflows): `test-feedback-link.js` and `test-rep-letter.js` (#134 is merged, so the script is on `main`). Already CI steps: `check-third-party.sh`, `test-sensitive-privacy.js`, and, since #137 (26 Oct), `test-doors.js` and `search-audit.js`. `test-home.js` stays out of CI (needs Playwright): it is a local pre-merge check. The #137 step named "Home and doors tests" runs only `test-doors.js`; rename it when next editing the workflow.
- Remote branch deletes: list approved 27 Oct (`docs/branch-delete-list-2026-10-26.txt`). The proxy blocks deletion from Code (403 on the API, dropped connection on `git push --delete`), so Elaine deletes the remaining branches by hand on the GitHub branches page; 23 of the 125 were already gone on 27 Oct. `claude/costs-part-a`, `claude/audit-fixes-oct26`, `claude/nav-findability` and `backup-before-realign` are not on the remote: check for local-only copies on Elaine's machine.
- Open PRs: none (#134, #135 and #137 are merged). #135's find-your-representative path prefixes (`/en/members/`, `/your-mlas/`, `/FindYourMP`) are still provisional and unchecked against the live pages; Elaine confirms them and the follow-up PRs set the exact paths.
- Closed 27 Oct: footer privacy wording approved as is; `forms.gle` host approved (feedback form link only, tier 7 link-out, in the register); icon master added at `docs/assets/icon-master.jpeg` (icons not regenerated; `icons/icon-192.png` and `icon-512.png` unchanged).
- Fluent Irish speaker for the 26 alias keys; Irish crisis-banner triggers.

**P4. Content queue (research only).** Open items: High Tech Drugs, Med 1, remaining vaccines (MMR, HPV, Hep B, travel), newborn/antenatal/lung screening, second-opinion routes, NI 111 (verify first), FOI generator, toolkit pages listed in the 24 Oct changelog, watchlist Acts (Mental Health Act 2026 and others, link only until commenced). Source: `GAPS.md`.

**P5. Instagram-supporting features.** "Where do I start?" is done. Left: share and print on guided tools. Each needs a privacy and CSP check.

## 3. Decisions needed from Elaine
1. Approve the P0-first rule in P0.3 (still open).
2. Confirm the three find-your-representative path prefixes (#135), and the Senator and greeting wording of the rep letter (#134, merged).
3. Sprint 2: Elaine runs it when she has time (no date; sprint 1 was 9 Oct).

## Decisions, 27 Oct 2026
Recorded by Elaine.
1. Remote branch delete list approved as written in `docs/branch-delete-list-2026-10-26.txt`.
2. Footer privacy wording approved as is (27 Oct 2026).
3. `forms.gle` host approved, feedback form only (27 Oct 2026; register entry in `AI_RULES.md`).
4. Icon master (`IMG_0956.jpeg`) goes in the repo: `docs/assets/icon-master.jpeg`.
5. Verification sprint 2: Elaine runs it when she has time; no date. Do not run or simulate it.
6. Paid services remain a contingency plan. Nothing in the app or Instagram promotes them.

## 4. Repo gaps found in this check
Project docs not in the repo. Decide per file: commit to `docs/briefs/`, or leave Project-only.
`verification-sprint-2-2026-10-24`, `budget-2027-sweep-2026-10-21`, `approved-hosts-sweep-2026-10-20`, `research-brief-remaining-gaps-2026-10-24`, `claude-code-brief-community-services-2026-10-14`, `code-brief-navigation-usability-2026-10-09`, `instagram-*` (marketing strategy, carousel drafts; Project-only is fine).

## 5. Session end
One `CHANGELOG.md` entry and one "Recent AI sessions" line.
