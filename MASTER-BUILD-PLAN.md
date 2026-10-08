# Health Hub — Master Build Plan
*Synthesis of all current source files into one streamlined build order. Prepared 6 Sept 2026.*

*Reconciliation note (6 Sept 2026, later same day): the coordination step in §0 is now implemented as `AI_RULES.md`. The inventory in §1 has also been corrected below — `coverage-gap-tracker.md`, `service-card-enrichment-template.md`, and the accessibility statement were completed and reconciled against real `data.js` counts in a session between this plan being drafted and being added to the repo. Everything else in this plan (Phases A–E) is unchanged from the original draft and still reflects the real state of the repo — none of that work has been started yet.*

---

## 0. Coordination note (historical)

*This section originally described a two-AI-assistant coordination model. As of 28 Sep 2026, Claude Code is the sole implementer across all layers of this repo (content, data, JS, HTML, CSS) — see `AI_RULES.md`, which now covers the content and session rules that matter.*

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

**Update, 6 Sept 2026 (later the same day):** decision made — a separate "Find a Facility" layer, seeded from the HIQA/RQIA CSV exports, not a `data.js` replacement. See the Phase D decision doc. Implemented in `data/facilities.js` and a new `#/facilities` page, but with one real constraint the decision doc didn't anticipate: this session's network egress is fully blocked (confirmed against multiple unrelated domains), so the live CSV exports couldn't actually be fetched. Shipped as a 4-facility verified pilot instead of the full register.

**Update, 6 Sept 2026 (later still):** **Phase D is now done, for real.** The user supplied the original HIQA/RQIA/HIA/HSE source files directly, plus a pre-merged "master scaffold" CSV covering all of them (4,111 rows: HIQA older persons + disability registers, RQIA registered services, HSE GeoHive hospitals, and a supplied HIA hospital list). Regenerated `data/facilities.js` from that scaffold — see `data/sources/README.md` for the source breakdown and known gaps (e.g. HIQA disability rows have no public address by design, not an ingest bug), and `CHANGELOG.md` for what changed in the app (an index-by-type page replacing the flat pilot list, since 4,111 rows can't render flat). No further Phase D work is planned unless new source data shows up.

**Phase E — App Improvements PDF features (defer, sequence last)**
This is a full second product surface (Patient Passport, incident logs, referral tracker, medication/taper tracker, complaint wizard, off-site check-in, low-load crisis UI) — genuinely good and consistent with your advocacy mission, but it's new local-storage app architecture, not content population. Recommend:
- Don't start this until Phase A/B/C are live — it competes for the same Cowork session time and the coverage gaps are the more urgent patient-facing problem right now.
- When you do start it, Phase 1 (offline shell, crisis UI, out-of-hours directory) is the smallest, highest-value slice — build that alone before the logging/tracker tools.

*Note: `Patient Passport` and a call/referral log already exist in the repo per git history (commits around "Add Patient Passport and call/referral log"). Confirm what the PDF actually adds beyond what's already shipped before scoping this phase, rather than treating it as entirely new.*

**Phase F — Condition information directory (link-out layer, MVP shipped 12 Sept 2026)**
A new research doc (`Health_Hub_Condition_Directory__All-Island_Source_Verification_and_Link-Out_Architecture.md`) proposed a three-tier "search a condition → link out" feature: official A-Z (HSE/NHS/nidirect/patient.info), disease charities, and a medication-leaflet search (HPRA/medicines.ie/emc/MHRA). Treated the same way Phase D's facilities register was: a separate layer (`data/facilities.js` → now also `data/conditions.js`), not a `data.js` change.
- **Shipped:** `#/conditions` (search/filter index + detail pages, 104 conditions from the doc's Section E seed list) and `#/medicines` (live drug-name search redirect to regulator leaflet databases). See `CHANGELOG.md` (12 Sept 2026) for the full breakdown.
- **The same network-egress block hit during Phase D recurred** — this session couldn't reach any external domain to verify a single URL live. Rather than guess ~90 HSE/NHS slugs from a stated pattern (a real link-rot risk the source doc itself warns against), only the 13 conditions where the doc wrote out a complete, pre-confirmed URL got a condition-specific deep link; every other condition still resolves via a universal HSE/nidirect/NHS-search fallback block shown on every detail page.
- **Open follow-up, needs a session with real network access:** work through the remaining ~91 conditions' HSE.ie/NHS.uk deep links (verify-then-store, per site convention), then layer in Tier 2 (the charity list in the source doc's Section B — BHF, Versus Arthritis, Diabetes UK/Ireland, Irish Cancer Society, Mind, etc.) the same way Stage 2 of the source doc recommends. Not blocking — the shipped fallback links mean nothing in `#/conditions` is currently a dead end.

**Update, 12 Sept 2026 (later the same day):** a corrected second pass of the source doc arrived with newly-confirmed URLs and two fixes (a retired-domain redirect, and confirmation that Arthritis Ireland's gout page really doesn't live at the pattern-guessed `/conditions/gout/` — validating the file's no-guessing rule). Folded in without a networked session: Arthritis Ireland links (gout, osteoarthritis), Crohn's & Colitis Ireland (Crohn's + ulcerative colitis), and a new `CONDITION_CATEGORY_LINKS` mechanism in `data/conditions.js` for category-wide charity pages (seeded with the Irish Cancer Society's booklets index across all 14 Oncology entries). The doc also flagged that several genuine charity sites return non-200 to automated requests (Cloudflare/SiteGround bot protection) — noted in `data/conditions.js`'s header so the Stage 3 link-checker mentioned above doesn't mistake those for dead links. The core follow-up above (remaining ~91 conditions, full Tier 2 rollout) is still open and still needs real network access.

---

## 2a. Status reconciliation against the repo (8 Oct 2026)

*Cross-checked `main` (as of 8 Oct 2026), `CHANGELOG.md`, `REVIEW.md` and `GAPS.md` against the Phase B and Phase E scope. Counts were taken by script from `data.js`, not quoted from older docs. The original toolkit doc and "App Improvements" PDF are not in the repo or project, so this compares against the feature lists in this plan, not the source files.*

**Phase B: done.** Superseded by what shipped. `#/advocacy` has tabs for the guide (10 modules), letter templates (7), entitlements (23 scheme entries including Medical Card, GP Visit Card, DPS, LTI and Fair Deal, with NI equivalents for health costs, care-home fees, DLA, PIP and Carer's Allowance), FOI by hospital, who to contact, and support organisations. The guided tools go further than the static pages this phase asked for: complaints navigator, records-request builder, schemes selector, "While you wait", discharge passport and the Assessment of Need toolkit. Static `#/about/screening` and `#/about/waiting-lists` pages also exist. Remaining B-adjacent work is content depth only (see the NI gap below).

**Phase E: mostly done.**

| PDF feature (as listed in this plan) | Status | Where |
|---|---|---|
| Offline shell | Done | `sw.js` precaches app, data, facilities, conditions, Leaflet |
| Low-load crisis UI | Done | Calm mode, quick exit (Esc), persistent crisis link, expandable crisis banners, search crisis banner (7 Oct) |
| Out-of-hours directory | Done | `#/out-of-hours`, with click-to-load map tiles |
| Patient Passport | Done | `#/passport`, opt-in local storage |
| Referral tracker / call log | Done | `#/log` |
| Complaint wizard | Done | `#/tools/complaints` (navigator, deadline helper, letter) |
| SAR builder (E1) | Done | `#/advocacy/sar-builder` and `#/tools/records` |
| FOI generator (E2) | Done | FOI route in `#/tools/records`, plus FOI and internal-review templates |
| Off-site / waiting-room check-in | Done | `#/prep` |
| Medication / taper tracker | **Not built** | Only a "current medications" field exists in the Passport and prep. A taper tracker is clinical in character, so it needs a medico-legal decision before scoping. |
| Incident / symptom log | **Not built** | `#/log` records calls and referrals only |

**Still open outside Phases A to F:**
- Accessibility: first automated and keyboard audit run 8 Oct 2026 (`ACCESSIBILITY_AUDIT.md`); findings 1 to 5 fixed. Still open: findings 6 to 9, screen reader testing (VoiceOver, NVDA, TalkBack), Safari and touch devices. Then publish `accessibility-statement.md`.
- HealthHub MCP OAuth layer (spec drafted, Code session not run).
- Conditions deep links (about 91) and Tier 2 charity layer; needs network access.
- NI equivalents: scheme and complaint depth is thinner than ROI. Link-only, nidirect and HSC sources.
- Human browser checks listed in `REVIEW.md`, including the 43 rows added 7 Oct.
- A vaccine coverage matrix (PR #80: `data/vaccines.js`, `scripts/validate-vaccines.js`, `#/vaccines`) and a costs page (`#/costs`, `data/costs.js`) have shipped since this plan was last updated; neither is described above.
- Auto-merge workflow and search-audit CI step: dropped by Elaine on 8 Oct 2026 (she merges PRs by hand).

## 3. Suggested next session

*Replaced 8 Oct 2026; the earlier text assumed Phase A was still being pasted in.* Phases A, B, D and F and most of E are shipped (see 2a). Next work, in order: (1) Elaine's browser checks from `REVIEW.md`; (2) Phase C coverage research for the thin counties and specialties in `GAPS.md`; (3) NI depth for schemes and complaints; (4) a decision on whether a medication/taper tracker or incident log is wanted at all; (5) the accessibility audit.
