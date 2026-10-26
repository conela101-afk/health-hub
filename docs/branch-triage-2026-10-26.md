# Remote branch triage (26 Oct 2026)

Read-only classification of every remote branch against `origin/main` at `f7a0d10`. **Nothing has been deleted.** Elaine approves the list first.

## Method
"Ahead" counts are not trusted: `main` was re-based at some point, so most old branches share no merge base with it and a squash or merge makes them look far ahead. For each branch:
1. `git cherry origin/main origin/<branch>` (patch-id match), and `git diff origin/main...origin/<branch> --stat` where a merge base exists.
2. Because patch-ids fail across the rewrite, every line (40+ characters) added by the branch's commits was also looked up in the text of `main`; and entry ids in the branch's `data.js` were compared with `main`'s.
3. The GitHub PR for each head branch (merged, closed unmerged, open, none).
4. Commits that exist on no other remote branch, to isolate a branch's own work from shared history.

The line check is a guide, not proof: entries reworded on `main` show as unmatched. Where that mattered, the entry or id was checked by name.

## Summary
| Tier | Meaning | Branches |
|---|---|---|
| 1 | No commits ahead, or all content already on `main` | 87 (52 with zero ahead) |
| 2 | `mcp/add-*` | 21 (the brief said 24; the remote has this many) |
| 3 | Needs a human look, or is open or held | 20 |
| 4 | Named in the plan, not on the remote | 4 |

## Held-out branches
- **`claude/diagnose-third-party-script-jovn1e`.** One commit: a CHANGELOG and AI_RULES log of a `check-third-party.sh` diagnosis. It tested a static scan, **not the live site**, found nothing wrong and changed no code. Its two proposals (narrow the scan to shipped files; run the script in CI) are both done: `check-third-party.sh` and `test-check-third-party.sh` are CI steps on `main`. Checked directly on `main` with a headless browser: 48 routes opened with no request leaving the site and no CSP violation; the script exits 0. **One deliberate third-party request exists:** on `#/out-of-hours`, the "Show map" button loads Leaflet from `vendor/` and then OpenStreetMap tiles (`a/b/c.tile.openstreetmap.org`). Nothing loads before the tap (0 external requests on page load); the CSP `img-src` allows only `https://*.tile.openstreetmap.org`; and `index.html` discloses it in the privacy details. Everything else is `'self'`. Not checked: the live hosted copy (this environment cannot reach it), and the dynamic specialty and area pages.
- **`claude/start-page`.** Yes, this is the head branch of old #119 ("Where do I start? page (#/start)"). #119 was **closed, not merged**, on 25 Oct 2026 at 22:19 UTC. The merged replacement is `four-doors-pr3-start`. Safe to delete after approval.
- **Warning, not on the hold list:** `grok/home-search-typeahead` removes about 1,800 lines of `app.js` and 640 of `styles.css`. Do not merge it. See Tier 3.

## Tier 4: named in the plan, not on the remote
| Name in plan | Remote? | What exists |
|---|---|---|
| `claude/costs-part-a` | no | `claude/costs-part-a-main` was #112, merged 21 Oct (gone from the remote) |
| `claude/audit-fixes-oct26` | no | `claude/audit-fixes-additions-oct26` exists and has no commits ahead of `main` |
| `claude/nav-findability` | no | `claude/nav-findability-main` (#104, merged 9 Oct) is on the remote, zero ahead |
| `backup-before-realign` | no | nothing on the remote or in any PR |

Local-only status: this cloud session's clone holds only `main` and `claude/master-plan-v4` locally, plus the branch for this doc. It cannot see Elaine's own clone. Check on that machine with `git branch -vv`; a branch marked `: gone]` was deleted on the remote, and `git branch --no-merged origin/main` lists any with unpushed work (`backup-before-realign` and `claude/audit-fixes-oct26` may live only there).

## Tier 2: `mcp/add-*`
| Branch | Ahead / behind | On main | PR | Note |
|---|---|---|---|---|
| `mcp/add-chi-national-paediatric-tertiary-1789291828615` | 24 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-chi-ghift`, `roi-chi-ncimd`, `roi-chi-craniofacial`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-chi-national-paediatric-tertiary-1789291841359` | 24 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-chi-ghift`, `roi-chi-ncimd`, `roi-chi-craniofacial`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-chi-national-paediatric-tertiary-1789291854797` | 25 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-chi-ghift`, `roi-chi-ncimd`, `roi-chi-craniofacial`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-chn-cork-10-west-1790064749074` | 25 / 171 | no, by design | #47 closed | PR #47 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-11-blackrock-1790064755754` | 25 / 171 | no, by design | #48 closed | PR #48 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-12-ballincollig-1790064762342` | 25 / 171 | no, by design | #49 closed | PR #49 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-13-bandon-kinsale-1790064768815` | 25 / 171 | no, by design | #50 closed | PR #50 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-14-south-ring-1790064775735` | 25 / 171 | no, by design | #51 closed | PR #51 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-4-nw-1790064709066` | 25 / 171 | no, by design | #41 closed | PR #41 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-5-ne-1790064715595` | 25 / 171 | no, by design | #42 closed | PR #42 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-6-midleton-1790064722508` | 25 / 171 | no, by design | #43 closed | PR #43 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-7-carrigtwohill-1790064729243` | 25 / 171 | no, by design | #44 closed | PR #44 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-8-mayfield-1790064735725` | 25 / 171 | no, by design | #45 closed | PR #45 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-cork-9-gurranabraher-1790064742286` | 25 / 171 | no, by design | #46 closed | PR #46 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-kerry-1-north-1790064687770` | 25 / 171 | no, by design | #38 closed | PR #38 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-kerry-2-west-1790064695938` | 25 / 171 | no, by design | #39 closed | PR #39 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-chn-kerry-3-south-1790064702396` | 25 / 171 | no, by design | #40 closed | PR #40 closed. Fabricated Cork/Kerry contact details (CHANGELOG, 22 Sep 2026); closed unmerged. Never merge |
| `mcp/add-guide-clinic-stjames-1789291782846` | 25 / 171 | yes (equivalent) | none | Sourced equivalent on main: `gum-guide-stjames`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-svuh-liver-pancreas-transplant-1789291735979` | 24 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-svuh-liver-transplant`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-svuh-liver-pancreas-transplant-1789291748937` | 25 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-svuh-liver-transplant`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |
| `mcp/add-svuh-liver-pancreas-transplant-1789291759327` | 25 / 171 | yes (equivalent) | none | Sourced equivalent on main: `roi-svuh-liver-transplant`. Tip rewrites data.js with mojibake; older tips are plain old main. PR: none |

## Tier 3
| Branch | Ahead / behind | On main | PR | Note |
|---|---|---|---|---|
| `claude/approved-hosts-oct25-reps` | 1 / 2 | no | #135 open | Open #135 (awaiting Elaine's path-prefix confirmation) |
| `claude/code-functionality-check-jhprkq` | 44 / 171 | partly | none | No PR. Same as medico-legal: only PHN rows absent, by decision |
| `claude/diagnose-third-party-script-jovn1e` | 1 / 30 | yes (log only) | none | 1 commit: CHANGELOG + AI_RULES log of a `check-third-party.sh` diagnosis, no code. Its proposed fixes (narrow scan, CI step) are merged |
| `claude/health-hub-feedback-form-2ypb09` | 1 / 26 | no | none | 1 commit: old form URL in footer/README/accessibility statement + per-entry "Report a problem" prefill (app.js). Superseded by merged feedback-form PR; prefill needs rework. Files: app.js, index.html, README.md, accessibility-statement.md, sw.js, CHANGELOG.md, AI_RULES.md |
| `claude/health-hub-planning-exec-zutkvi` | 36 / 171 | yes (reworded) | #53 merged | Merged #53. 11 unmatched data lines are reworded NI structural rows (RVH neurosurgery etc.); `nurture-pnd` merged into `nurture` |
| `claude/health-hub-steps-0-2-b18dxt` | 17 / 135 | yes, except 3 rows | #81 merged, #83 merged | Merged #81/#83. `hse-spmhs`, `ncp-eating-disorders`, `nrdo` withheld on purpose (HSE pages down; restore notes in `REVIEW.md`); `nurture-pnd` merged into `nurture` |
| `claude/medico-legal-review-0lvfh5` | 53 / 171 | partly | none | No PR. All commits are inside other merged branches; only PHN rows (`find-phn`, `phn-*`) are absent, by decision |
| `claude/pass3-rows` | 10 / 157 | partly | #72 closed | 11 rows; replaced by merged `pass3-rows-clean`; residue is GAPS.md/validator lines |
| `claude/pass5-children-family` | 5 / 157 | partly | #67 closed | CIPC, NCS, Jigsaw rows: replaced by merged `pass5b-children-older` |
| `claude/pass5-docs` | 11 / 157 | partly | #71 closed | Docs/gap table: replaced by merged `pass5b-docs` |
| `claude/pass5-legal-text` | 9 / 157 | partly | #70 closed | AON legal text: replaced by merged `pass5b-f-corrections` |
| `claude/pass5-medical` | 7 / 157 | partly | #69 closed | T1D technology, stroke ESD: replaced by merged `pass5b-medical` |
| `claude/pass5-older-carers` | 6 / 157 | partly | #68 closed | Home support, Carer's Allowance, QUIT: replaced by merged `pass5b-children-older` |
| `claude/pass5-rights` | 3 / 157 | partly | #66 closed | Superseded by merged `pass5b-*`; unique rows `coru-complaint`, `mha-2026-info` (Mental Health Act, link-only until commenced) and others are not on main |
| `claude/pass5-validator` | 1 / 157 | partly | #65 closed | Validator stricter-rules; rows not on main; replacement merged as `pass5b-*` (2 Oct changelog) |
| `claude/rep-letter` | 2 / 22 | no | #120 open | #120 (closed today, not merged). Replaced by #134 |
| `claude/rep-letter-builder` | 2 / 2 | no | #134 open | Open draft #134 (awaiting Elaine's wording approval) |
| `claude/start-page` | 1 / 22 | yes (superseded) | #119 closed | Old #119 head (closed, not merged 25 Oct). Replaced by merged four-doors-pr3-start |
| `claude/verify-scheme-link-urls` | 55 / 171 | partly | #3 closed | Closed #3. 1 unique commit (Cross-Border Directive, TAS, GMS rows): 11 of 12 lines on main. PHN rows (`find-phn`, `phn-*`) absent by decision (single `phn-locator`) |
| `grok/home-search-typeahead` | 26 / 171 | no | none | No PR. 2 commits (typeahead combobox) whose diff deletes ~1,800 lines of app.js and ~640 of styles.css, the same truncation pattern as the 22 Sep Grok incident. Do not merge. Home has since been rebuilt (Four doors PR 2) |

## Tier 1: merged or fully absorbed, with commits ahead
| Branch | Ahead / behind | On main | PR | Note |
|---|---|---|---|---|
| `claude/addiction-and-lost-batch-recovery` | 76 / 171 | yes | #12 merged | PR #12 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/aon-toolkit` | 9 / 165 | yes | #58 merged | PR #58 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/area-schema` | 4 / 165 | yes | #62 merged | PR #62 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/bonehealth-haematology-enrichment` | 80 / 171 | yes | #14 merged | PR #14 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/calm-mode-ncmg-fix` | 55 / 171 | yes | #4 merged | PR #4 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/cardiology-build-out` | 6 / 171 | yes | #22 merged | PR #22 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/cdnt-toolkit-integration-xznle2` | 57 / 171 | yes | #5 merged | PR #5 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/cork-kerry-chn-entries-yhcl3j` | 32 / 171 | yes | #52 merged | PR #52 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/data-integrity-ci` | 16 / 171 | yes | #26 merged | PR #26 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/depth-check-remaining-specialties` | 21 / 171 | yes | #28 merged | PR #28 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/dunmanway-frc` | 1 / 171 | yes | #20 merged | PR #20 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/files-updates-55yelg` | 70 / 171 | yes | #10 merged | PR #10 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/fix-data-js-wipe` | 74 / 171 | yes | #11 merged | PR #11 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/geo-push-down-derry-meath` | 82 / 171 | yes | #15 merged | PR #15 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/health-hub-tertiary-gaps-oct26` | 7 / 135 | yes | #82 merged | PR #82 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/jci-accreditation-enrichment` | 88 / 171 | yes | #18 merged | PR #18 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/keyboard-home-screen-bug-lko0lo` | 46 / 171 | yes | #1 merged | PR #1 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/neurology-dermatology-enrichment` | 78 / 171 | yes | #13 merged | PR #13 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/new-session-3nrgyd` | 23 / 171 | yes | #27 merged, #29 merged | PR #27 merged, #29 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/new-session-ulkihy` | 8 / 171 | yes | #23 merged | PR #23 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/phase-d-find-a-facility` | 84 / 171 | yes | #16 merged | PR #16 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/phase-d-full-facilities-ingest` | 86 / 171 | yes | #17 merged | PR #17 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/phase-e-admin-toolkit` | 90 / 171 | yes | #19 merged | PR #19 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/pwa-build-out-oxf7px` | 69 / 171 | yes | #9 merged | PR #9 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/remove-third-party-requests` | 3 / 135 | yes | #55 merged, #79 merged | PR #55 merged, #79 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/rv-changes-merge-main-dtcycv` | 63 / 171 | yes | #8 merged | PR #8 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/sar-builder-quicklinks` | 4 / 171 | yes | #21 merged | PR #21 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/sector-audit-followups` | 14 / 171 | yes | #25 merged | PR #25 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/see-below-reference-errors-scc0mn` | 48 / 171 | yes | #2 merged | PR #2 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/specialty-verification-voluntary-tagging` | 10 / 171 | yes | #24 merged | PR #24 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/static-pages` | 13 / 165 | yes | #59 merged | PR #59 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/toolkit-directory-changes-8mtieg` | 59 / 171 | yes | #6 merged | PR #6 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `claude/women-centric-language-support-tzzwws` | 61 / 171 | yes | #7 merged | PR #7 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `fix/sar-builder-double-brackets` | 1 / 165 | yes | #57 merged | PR #57 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |
| `grok/ios-zoom-tools-search-home-pills` | 28 / 171 | yes | #37 merged | PR #37 merged; commits are old pre-rewrite history; unmatched text is reformat/rewording only |

## Tier 1: zero commits ahead of `main`
| Branch | Ahead / behind | On main |
|---|---|---|
| `claude/a11y-fixes-main` | 0 / 64 | yes |
| `claude/approved-hosts-oct26` | 0 / 136 | yes |
| `claude/audit-fixes-additions-oct26` | 0 / 167 | yes |
| `claude/automerge-rules` | 0 / 142 | yes |
| `claude/budget-2027-oct26` | 0 / 170 | yes |
| `claude/ci-screening-steps` | 0 / 85 | yes |
| `claude/ci-third-party-and-sensitive-tests` | 0 / 29 | yes |
| `claude/cork-cdnt` | 0 / 170 | yes |
| `claude/cost-checks-oct8` | 0 / 89 | yes |
| `claude/cost-schemes` | 0 / 98 | yes |
| `claude/county-matrix` | 0 / 166 | yes |
| `claude/crisis-banner-condition-keywords` | 0 / 139 | yes |
| `claude/cross-border` | 0 / 92 | yes |
| `claude/decisions-oct8` | 0 / 83 | yes |
| `claude/feedback-form-url` | 0 / 6 | yes |
| `claude/four-doors-pr1-door-pages` | 0 / 16 | yes |
| `claude/four-doors-pr2-home-search` | 0 / 13 | yes |
| `claude/four-doors-pr3-start` | 0 / 10 | yes |
| `claude/four-doors-pr3-wording` | 0 / 3 | yes |
| `claude/gap-register-2026-10-23` | 0 / 41 | yes |
| `claude/health-hub-guided-tools-om1dbz` | 0 / 170 | yes |
| `claude/health-hub-roi-coverage-gaps-d1zvig` | 0 / 31 | yes |
| `claude/human-checks` | 0 / 29 | yes |
| `claude/inclusive-parenting-language` | 0 / 158 | yes |
| `claude/install-icon-offline-polish-lbxlm9` | 0 / 35 | yes |
| `claude/install-page` | 0 / 46 | yes |
| `claude/local-services-parenting-rows` | 0 / 134 | yes |
| `claude/local-services-pass2` | 0 / 96 | yes |
| `claude/master-plan-v4` | 0 / 1 | yes |
| `claude/narrow-third-party-scan` | 0 / 23 | yes |
| `claude/nav-findability-main` | 0 / 81 | yes |
| `claude/ni-human-milk-bank` | 0 / 75 | yes |
| `claude/pass2-confirmations` | 0 / 94 | yes |
| `claude/pass3-rows-clean` | 0 / 156 | yes |
| `claude/pass4-rows` | 0 / 158 | yes |
| `claude/pass5b-children-older` | 0 / 147 | yes |
| `claude/pass5b-docs` | 0 / 141 | yes |
| `claude/pass5b-f-corrections` | 0 / 153 | yes |
| `claude/pass5b-medical` | 0 / 144 | yes |
| `claude/pass5b-regulators` | 0 / 150 | yes |
| `claude/phase-a-entries` | 0 / 162 | yes |
| `claude/pregnancy-information` | 0 / 44 | yes |
| `claude/primary-care-specialty` | 0 / 146 | yes |
| `claude/respite-nursing-home` | 0 / 71 | yes |
| `claude/screening-matrix` | 0 / 88 | yes |
| `claude/search-aliases-v2` | 0 / 144 | yes |
| `claude/sensitive-privacy-layer` | 0 / 38 | yes |
| `claude/surgery-trauma-research` | 0 / 161 | yes |
| `claude/surgery-trauma-specialty` | 0 / 163 | yes |
| `claude/vaccine-coverage-matrix` | 0 / 100 | yes |
| `claude/verification-sprint-1` | 0 / 78 | yes |
| `claude/youthful-sagan-iccvus` | 0 / 154 | yes |
