# Health Hub — Master Build Plan
*Synthesis of all current source files into one streamlined build order. Prepared 6 Sept 2026.*

*Reconciliation note (6 Sept 2026, later same day): the coordination step in §0 is now implemented as `AI_RULES.md`. The inventory in §1 has also been corrected below — `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, and the accessibility statement were completed and reconciled against real `data.js` counts in a session between this plan being drafted and being added to the repo. Everything else in this plan (Phases A–E) is unchanged from the original draft and still reflects the real state of the repo — none of that work has been started yet.*

---

## 0. Coordination note — Grok is also live on the repo

Two AI assistants editing the same codebase concurrently is the biggest near-term risk to this plan, not a content gap. Before either tool touches `data.js`:

- **Pick a lane per session.** Use Claude for content research, structured markdown, and planning (as you already do); use Grok for its specific small changes; don't let both edit `data.js` in the same window.
- **Git as the source of truth.** Commit Grok's changes before starting a Claude Cowork session (and vice versa), so each tool always branches from the current real state rather than a stale mental model.
- **One shared `CHANGELOG.md` entry per session**, tool-tagged (`[Grok]` / `[Claude]`), so six months from now you can tell which tool made which change if something needs debugging.

These rules are now written down in `AI_RULES.md` — read that file first at the start of any session, not just this note.

---

## 1. What you actually have (inventory)

| Source file | Type | Status |
|---|---|---|
| `adult-adhd-autism-pathways.md` | Ready-to-integrate content | ✅ Publish-ready, verify-flagged items noted |
| `Children's Disability Services...md` (CDNT) | Ready-to-integrate content | ✅ Developer-ready per earlier session |
| `All-Island...Sector Gap Content Compilation.md` | Ready-to-integrate content | ✅ Tier 1/2/3 gap content, mostly citable/sourced |
| `Health Pocket Guide Toolkit...md` | Ready-to-integrate content | ✅ Forms/templates/scripts — advocacy layer |
| `health-hub-next-session-plan.md` | Code-session instructions | ✅ Exact `data.js` snippets ready to paste (MBU, PHN, geo) |
| `coverage-gap-tracker.md` | Living tracker | ✅ Reconciled against real `data.js` counts (6 Sept 2026) — no longer "mostly unfilled"; see the file itself for current gap status |
| `service-card-enrichment-template.md` | Schema/process doc | ✅ Defines target card fields, mapped onto existing `data.js` fields (`contact.phone` / `referral` / `checked`) — apply during any content pass |
| `accessibility-statement.md` | Draft, blocked | ⛔ Held until a real audit runs (tracker §5) — claims already spot-checked against `index.html`/`app.js`, but not yet published |
| `Health_Hub_All_Island_Master_Directory_v1.xlsx` | New — 149-row starter dataset + roadmap | 🆕 Needs an architecture decision (see §4) — not yet received in this repo/session |
| `Health_Hub_App_Improvements.pdf` | New — full feature roadmap (SAR builder, complaint wizard, Patient Passport, logs, crisis UI) | 🆕 Large scope, needs sequencing (see §5) — not yet received in this repo/session |

Two genuinely new items arrived this round: the **master directory spreadsheet** and the **feature roadmap PDF**. Neither was in the picture when the last session plan was written, so the build order below reintegrates them rather than just resuming where you left off. Note: as of this file being added to the repo, neither the xlsx nor the PDF has actually been shared into a session yet — Phases D and E below can't start until they are.

---

## 2. Streamlined build order

**Phase A — Content merge (lowest risk, highest readiness, do first)**
Everything here is already written, sourced, and just needs pasting into `data.js` in one Cowork session:
1. MBU consolidated entry (exact snippet in `health-hub-next-session-plan.md` §1)
2. PHN locator-pattern entry, replacing the 3 Cork listings (§2)
3. Adult ADHD/Autism pathways page
4. CDNT/Early Intervention page
5. Tier 1 sector gaps: Men's Health/Prostate, CAMHS, Older Persons, Adult Oncology, Stroke
6. Tier 2 sector gaps: Adult Disability, Addiction, Allied Health, General Paediatrics, Weight Management
7. Tier 3 thin-category enrichment: Eating Disorders, Dermatology, Cardiology, Bone Health, Breastfeeding, Dental, Haematology

Apply the enrichment schema (phone / access route / last-reviewed / cost / source) from `service-card-enrichment-template.md` as you paste each one in, rather than pasting first and enriching later — same number of edits, less risk of leaving half the cards behind.

*Status check against the live repo (6 Sept 2026, updated evening): items 1 (MBU) and 2 (PHN locator) are already done, per `REVIEW.md`'s 2026-09-05 log entry. Item 3 (Adult ADHD/Autism) and item 5's Men's Health/Prostate line also already appear in `data.js` per recent commit history. Item 6's Addiction line is now done too (3→7 entries, see `REVIEW.md` 2026-09-06). Still genuinely open: Adult Disability/Allied Health/General Paediatrics/Weight Management from item 6, and Eating Disorders/Dermatology/Cardiology/Bone Health/Dental/Haematology from item 7 (Breastfeeding in item 7 is already resolved — see `coverage-gap-tracker.md` §1).*

*Separately, `main`'s `data.js` was accidentally wiped to a placeholder by two direct-to-main commits on 6 Sept 2026 and had to be restored (see `CHANGELOG.md`); the RVEEH/SLRON/UPMC content those commits claimed to add but never wrote has now been redone from scratch.*

**Phase B — Advocacy/toolkit layer (ready content, but decide format first)**
The toolkit doc (FOI/SAR, YSYS complaints, Fair Deal, Medical Card, DPS/LTI, complaint-letter writing, NI equivalents) is content-complete. Before building it in:
- Ship it first as **static template/guide pages** (fastest, matches current app architecture — no new tooling).
- Treat the *interactive* versions (auto-filled SAR builder, guided complaint wizard) as Phase C/D — see §5. Don't let the PDF's ambition delay getting the static content live now.

**Phase C — Geographic + crowdsourcing push**
Run alongside Phase A/B, not blocking them:
- Down, Londonderry, Meath, Armagh, Tyrone first; Wicklow, Kildare, Wexford, Louth, Mayo second (per `health-hub-next-session-plan.md` §3, and confirmed by the population-adjusted analysis in `GAPS.md`)
- Reddit crowdsourcing for PHN, breastfeeding, urology/urogynae, gynae-oncology (already planned, per memory) — note that PHN and breastfeeding are now resolved via locator entries (see `coverage-gap-tracker.md` §1), so crowdsourcing effort here should focus on urology/urogynae and gynae-oncology routing instead
- `GAPS.md` and `REVIEW.md` already exist in the repo (added in the session logged 2026-09-05) — no longer outstanding

**Phase D — Master directory architecture decision (blocking question, needs your input)**
The new xlsx isn't just more data — it's a different shape of data (149 rows of *facilities*: hospitals, ownership model, parent org) than your existing specialty-card model in `data.js`. Before doing anything with it, decide:
- Is this a **separate "Find a Facility" layer** sitting alongside the specialty directory, or is it meant to **replace/feed** `data.js` long-term?
- The roadmap tab inside it proposes HIQA/RQIA-export ingestion as the scalable path to full coverage — that's a real option but is a data-pipeline project, not a content-writing one, and would need its own scoping session.

I'd flag this as the single highest-leverage decision left before more content gets produced, since it changes what "done" looks like for coverage. **This decision is still open** — the spreadsheet hasn't been shared into a session yet, so there's nothing to act on here until then.

**Phase E — App Improvements PDF features (defer, sequence last)**
This is a full second product surface (Patient Passport, incident logs, referral tracker, medication/taper tracker, complaint wizard, off-site check-in, low-load crisis UI) — genuinely good and consistent with your advocacy mission, but it's new local-storage app architecture, not content population. Recommend:
- Don't start this until Phase A/B/C are live — it competes for the same Cowork session time and the coverage gaps are the more urgent patient-facing problem right now.
- When you do start it, Phase 1 (offline shell, crisis UI, out-of-hours directory) is the smallest, highest-value slice — build that alone before the logging/tracker tools.

*Note: `Patient Passport` and a call/referral log already exist in the repo per git history (commits around "Add Patient Passport and call/referral log"). Confirm what the PDF actually adds beyond what's already shipped before scoping this phase, rather than treating it as entirely new.*

---

## 3. Suggested next session

Single Cowork/code session covering the parts of Phase A that are genuinely still outstanding (re-verify against `data.js` first, per the status check above) plus the Phase C crowdsourcing pushes. `GAPS.md`/`REVIEW.md`/the tracker docs are already in the repo, so this session can go straight to content work rather than research or file setup.
