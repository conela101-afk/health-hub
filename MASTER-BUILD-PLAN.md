# Health Hub: Master Build Plan (v4, lean)

26 Oct 2026. Replaces v3 (21 Oct). Checked against `main` at `be10edb` (25 Oct, PR #133) and the Project docs. Plan only: no `data.js` or code change.

Recount before quoting any figure. Plan quotes none: `node scripts/validate-data.js`, `validate-costs.js`, `validate-screening.js`, `validate-vaccines.js`, `node scripts/county-matrix.js`, `node scripts/test-doors.js`, `node scripts/search-audit.js`.

## 1. State of play
- **Built:** directory, guided tools, AON toolkit, conditions, facilities, costs, screening, vaccines, search v2, pregnancy page, install page, privacy layer, guides (after a death, interpreting), AskCI link, feedback form link.
- **Four doors** (brief `docs/briefs/four-doors-2026-10-25.md`): PR 1 hubs, PR 2 Home and search, PR 3 "Where do I start?" merged. **PR 4 (colour tokens) not started.**
- **Content added since v3, all unverified:** community-services rows (all ROI), 24 Oct ROI coverage-gap rows, 23 Oct gap-register rows, cost schemes Part A (merged; v3 wrongly said not merged).
- **Retired from v3:** phase letters A to F, the brief index table, the duplicate constraints list (see `AI_RULES.md`).

## 2. Priorities (in order)
**P0. Verification debt.** Every content pass adds `verify: true` rows; only Elaine clears them.
1. Run sprint 2 (not yet run, confirmed 26 Oct) from `verification-sprint-2-2026-10-24.md` (Project doc; not in repo, see §4). Guided-tools facts, then cost, screening and vaccine rows. Next session after Four doors PR 4 review.
2. Then community-services and coverage-gap rows, then Advocacy-guide figures after Budget 2027.
3. Rule: no new content passes until P0 is back below the 8 Oct level. Research and briefs are fine.

**P1. Four doors PR 4.** Colour tokens and visual refresh. Needs contrast numbers in the PR and the known `#/advocacy/schemes` 4.28:1 failure fixed. Then the 3-person find-it test (old vs new), logged in `REVIEW.md`.

**P2. Accessibility.** Screen reader, Safari and touch testing, then publish `accessibility-statement.md` with verified claims only.

**P3. Housekeeping (Elaine).**
- CI by hand (push token cannot edit workflows): `test-feedback-link.js`, and `test-rep-letter.js` once #134 merges. Already CI steps: `check-third-party.sh`, `test-sensitive-privacy.js`, and, since #137 (26 Oct), `test-doors.js` and `search-audit.js`. `test-home.js` stays out of CI (needs Playwright): it is a local pre-merge check. The #137 step named "Home and doors tests" runs only `test-doors.js`; rename it when next editing the workflow.
- Approve or amend the remote branch delete list in `docs/branch-triage-2026-10-26.md` (nothing deleted yet). `claude/costs-part-a`, `claude/audit-fixes-oct26`, `claude/nav-findability` and `backup-before-realign` are not on the remote: check for local-only copies on Elaine's machine.
- Open PRs waiting on Elaine: #134 (rep letter, wording approval) and #135 (approved hosts, find-your-representative path prefixes, still provisional).
- Decide: icon master (`IMG_0956.jpeg`, not in repo), footer privacy wording, `forms.gle` host.
- Fluent Irish speaker for the 26 alias keys; Irish crisis-banner triggers.

**P4. Content queue (research only).** Open items: High Tech Drugs, Med 1, remaining vaccines (MMR, HPV, Hep B, travel), newborn/antenatal/lung screening, second-opinion routes, NI 111 (verify first), FOI generator, toolkit pages listed in the 24 Oct changelog, watchlist Acts (Mental Health Act 2026 and others, link only until commenced). Source: `GAPS.md`.

**P5. Instagram-supporting features.** "Where do I start?" is done. Left: share and print on guided tools. Each needs a privacy and CSP check.

## 3. Decisions needed from Elaine
1. Sprint 2: pick a date (not yet run; sprint 1 was 9 Oct).
2. Branch triage (P3).
3. Approve the P0-first rule in P0.3.
4. Paid services remain a contingency plan. Nothing in the app or Instagram promotes them.

## 4. Repo gaps found in this check
Project docs not in the repo. Decide per file: commit to `docs/briefs/`, or leave Project-only.
`verification-sprint-2-2026-10-24`, `budget-2027-sweep-2026-10-21`, `approved-hosts-sweep-2026-10-20`, `research-brief-remaining-gaps-2026-10-24`, `claude-code-brief-community-services-2026-10-14`, `code-brief-navigation-usability-2026-10-09`, `instagram-*` (marketing strategy, carousel drafts; Project-only is fine).

## 5. Session end
One `CHANGELOG.md` entry and one "Recent AI sessions" line.
