# Health Hub: Master Build Plan (v4, lean)

26 Oct 2026, synced 27 Oct 2026 to `main` at `7582505` (PR #134). Replaces v3 (21 Oct). First checked against `main` at `be10edb` (25 Oct, PR #133) and the Project docs. Plan only: no `data.js` or code change.

Recount before quoting any figure. Plan quotes none: `node scripts/validate-data.js`, `validate-costs.js`, `validate-screening.js`, `validate-vaccines.js`, `node scripts/county-matrix.js`, `node scripts/test-doors.js`, `node scripts/search-audit.js`.

## 1. State of play
- **Built:** directory, guided tools, AON toolkit, conditions, facilities, costs, screening, vaccines, search v2, pregnancy page, install page, privacy layer, guides (after a death, interpreting), AskCI link, feedback form link.
- **Four doors** (brief `docs/briefs/four-doors-2026-10-25.md`): PR 1 hubs, PR 2 Home and search, PR 3 "Where do I start?" merged. **PR 4 (colour tokens) built, open as #144 (4 Nov), awaiting the maintainer's review.**
- **Content added since v3, all unverified:** community-services rows (all ROI), 24 Oct ROI coverage-gap rows, 23 Oct gap-register rows, cost schemes Part A (merged; v3 wrongly said not merged).
- **Retired from v3:** phase letters A to F, the brief index table, the duplicate constraints list (see `AI_RULES.md`).

## 2. Priorities (in order)
**P0. Verification debt.** Every content pass adds `verify: true` rows; only the maintainer clears them.
1. Run sprint 2 (not yet run, confirmed 26 Oct; the maintainer will run it when they have time) from `verification-sprint-2-2026-10-24.md` (Project doc; not in repo, see §4). Guided-tools facts, then cost, screening and vaccine rows. Next session after Four doors PR 4 review.
2. Then community-services and coverage-gap rows, then Advocacy-guide figures after Budget 2027.
3. Rule: no new content passes until P0 is back below the 8 Oct level. Research and briefs are fine.

**P1. Four doors PR 4.** Colour tokens and visual refresh. Contrast numbers are in #144 and the `#/advocacy/schemes` 4.28:1 failure is fixed (axe contrast violations 3 to 0). Next: The maintainer's review and manual checks, then the 3-person find-it test (old vs new; sheet in `docs/find-it-test-pr4.md`, not yet run), logged in `REVIEW.md`.

**P2. Accessibility.** Screen reader, Safari and touch testing, then publish `docs/accessibility-statement.md` with verified claims only.

**P3. Housekeeping (the maintainer).**
- CI by hand (push token cannot edit workflows): `test-feedback-link.js`, and `test-rep-letter.js` (#134 is merged, so the script is on `main`). Already CI steps: `check-third-party.sh`, `test-sensitive-privacy.js`, and, since #137 (26 Oct), `test-doors.js` and `search-audit.js`. `test-home.js` stays out of CI (needs Playwright): it is a local pre-merge check. The #137 step named "Home and doors tests" runs only `test-doors.js`; rename it when next editing the workflow.
- Remote branch delete list in `docs/branch-triage-2026-10-26.md`: approved 27 Oct, deletes pending: Code cannot delete (the proxy returns 403), and 23 of the 125 were already gone on 27 Oct, so the maintainer deletes the remaining 102 by hand (list in PR #141). `claude/costs-part-a`, `claude/audit-fixes-oct26`, `claude/nav-findability` and `backup-before-realign` are not on the remote: check for local-only copies on the maintainer's machine.
- Open PRs: none (#134, #135 and #137 are merged, 26 Oct). Still on the maintainer: #135's find-your-representative path prefixes (`/en/members/`, `/your-mlas/`, `/FindYourMP`) are provisional and unchecked against the live pages, and the Senator and greeting wording of the rep letter (#134) needs the maintainer's confirmation.
- Icon master added at `docs/assets/icon-master.jpeg` (PR #141; 784 x 1168, not square, so crop before making icons). Footer privacy wording and `forms.gle` host approved 27 Oct; `forms.gle` is in the approved-hosts register (tier 7, link-out only).
- Fluent Irish speaker for the 26 alias keys; Irish crisis-banner triggers.

**P4. Content queue (research only).** Open items: High Tech Drugs, Med 1, remaining vaccines (MMR, HPV, Hep B, travel), newborn/antenatal/lung screening, second-opinion routes, NI 111 (verify first), FOI generator, toolkit pages listed in the 24 Oct changelog, watchlist Acts (Mental Health Act 2026 and others, link only until commenced). Source: `GAPS.md`.

**P5. Instagram-supporting features.** "Where do I start?" is done. Left: share and print on guided tools. Each needs a privacy and CSP check.

## 3. Decisions
**Recorded by the maintainer, 27 Oct 2026:**
- Remote branch delete list in `docs/branch-triage-2026-10-26.md`: **approved**. Claude Code tried: the git proxy returns 403, so the maintainer deletes the 102 still on the remote by hand.
- Sprint 2: The maintainer will run it when they have time. No date set.
- Footer privacy wording: approved as is.
- `forms.gle` host: approved.
- Icon master: in the repo at `docs/assets/icon-master.jpeg` (added in PR #141). `icons/icon-192.png` and `icon-512.png` are unchanged.
- Paid services remain a contingency plan. Nothing in the app or Instagram promotes them.

**Still open:** approve the P0-first rule in P0.3; local-only branch copies on the maintainer's machine; Irish alias and crisis-banner review; Project-only docs (commit to `docs/briefs/` or leave).

**Decisions 26 Nov 2026 (maintainer):**
- **No custom domain.** The app stays on GitHub Pages at its current address.
- **Directory shrink rule.** Health Hub stays a one stop shop for where to start: every specialty and sector stays covered. Local listings that an official finder already keeps current are replaced by a link to that finder. Keep national rows, pathway rows, rights, toolkit and escalation content. Keep regardless (safety): emergency departments, injury units, medical assessment units, crisis and acute psychiatric rows, and out-of-hours GP rows. Keep local rows that no official finder covers. The candidate list is `research/local-row-audit-2026-11-26.md` (from `node scripts/local-row-audit.js`). **The maintainer approves the archive list before any PR moves rows**, row by row, as for PR B.
- **"Nobody replied?" is the next feature build.** **Gate (maintainer decision, 26 Nov 2026, replaces the `verify: true` count gate):** the build starts once every statutory timeframe, escalation step and next-body route the feature uses has been checked on an official page a person opened. Directory verification continues in parallel; the freeze on new rows and specialties stays. Scope, from the 25 Nov critique: pick what you're waiting on (complaint, FOI, SAR, referral, AON), enter the date sent, then see whether it's overdue, the next step up the ladder, and a printable chaser letter. Reuse the Records builder tracker, the complaints navigator and the AON ladder. The facts the gate covers, and the gaps, are listed in `research/nobody-replied-fact-checklist-2026-11-26.md`. No spec work until the gate is met.
- **Local-row audit (#154):** it found 5 archive candidates only. Decision: keep `bantry-cfc`, `clon-frc`, `dunmanway-frc` and `haven-castletownbere` (already checked). `skibb-frc` stays pending a check against `find-frc`.
- **Content pillars:** still open.

## 4. Repo gaps found in this check
Project docs not in the repo. Decide per file: commit to `docs/briefs/`, or leave Project-only.
`verification-sprint-2-2026-10-24`, `budget-2027-sweep-2026-10-21`, `approved-hosts-sweep-2026-10-20`, `research-brief-remaining-gaps-2026-10-24`, `claude-code-brief-community-services-2026-10-14`, `code-brief-navigation-usability-2026-10-09`, `instagram-*` (marketing strategy, carousel drafts; Project-only is fine).

## 5. Session end
One `CHANGELOG.md` entry and one "Recent AI sessions" line.
