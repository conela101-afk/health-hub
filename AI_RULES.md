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

- 2026-09-06 [Claude] — Added `AI_RULES.md` and `MASTER-BUILD-PLAN.md` to the repo; reconciled the build plan's inventory table against the tracker work done earlier the same day. No `data.js` changes made this session.
- 2026-09-06 [Claude] — Added `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, `accessibility-statement.md`, reconciled against actual `data.js` counts and `GAPS.md`/`REVIEW.md` findings. No `data.js` changes made this session.
