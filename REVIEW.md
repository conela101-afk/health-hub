# Annual Review Log

A running log of annual review passes over the data in `data.js`, plus a
standing checklist to reuse each year. Per-entry accuracy checks use the
`checked` field already on each entry — this file tracks the review
process itself, not individual entries.

## Standing annual checklist

- [ ] Re-check Mother & Baby Unit opening dates (both jurisdictions)
- [ ] Re-run entries-per-capita by county, compare to last year's gap list (see `GAPS.md`)
- [ ] Spot-check the HSE Primary Care Centre locator link still resolves
- [ ] Scan for other "known gap" language that's aged into "actually resolved now" (the NI MBU line is a good example — it went from gap to confirmed in under a year)

## Guided tools verification (quarterly + post-Budget)

The guided tools (`#/tools`) take their facts from `TOOL_FACTS` in `data.js`.
Each fact has `last_verified`, `volatility` and `verify`. Open items are
listed in `GAPS.md` → "Guided tools: open verify items".

### Every quarter (Jan, Apr, Jul, Oct)

- [ ] Open every `source_url` in `TOOL_FACTS` in a real browser (curl from the
      build sandbox is egress-blocked, so it doesn't count). Note dead or
      redirected links.
- [ ] Re-read every `volatility: "high"` fact against its page:
      `roi-ysys-backup`, `sc-niphs-temporary`, `sc-ni-wlrs`, `sc-cards-printing`,
      `sc-card-limits`, `wy-ni-latest`, `wy-roi-latest`, `aon-bill`.
- [ ] Replace `wy-ni-latest` with the newest DoH NI quarterly release (new
      date in the text, new `source_url`, new `last_verified`). Never move the
      numbers into UI text.
- [ ] Check whether NIPHS is still running, and whether the NI Waiting List
      Reimbursement Scheme is still open to new applicants.
- [ ] Check the Disability (Amendment) Bill 2026's stage on oireachtas.ie. If
      enacted, rewrite `aon-bill` and review every `aon-*` fact.
- [ ] Try to close at least the medium-volatility `verify: true` items in
      `GAPS.md`.
- [ ] Bump `last_verified` only on facts actually re-read that day.

### After each Budget (usually October) and each HSE/DoH scheme change

- [ ] Medical card / GP visit card: re-read `sc-card-under70`,
      `sc-card-over70` and `sc-gpvc-auto` (who gets a GP visit card without a
      means test changes in Budgets). Check the HSE "how much you can earn"
      link still resolves. Income limits stay out of the site.
- [ ] Re-check `SCHEME_LINKS` scheme cards on the Advocacy tab too, for the
      same reason.
- [ ] NIPHS / Cross-Border Directive / TAS: re-read `sc-*` facts.
- [ ] Log what changed in `CHANGELOG.md`.

### 2026-09-28: guided tools first build

- 81 facts written, 21 `verify: true`. All 49 source URLs returned `000` to
  curl (egress-blocked). All were cross-checked as appearing in live web-search
  results. See `GAPS.md` for what that does and doesn't prove.
- Search cross-check corrections applied before handoff: Carer's Benefit
  added to GP visit card auto-eligibility; NTPF data link moved to
  `/waiting-list-data/`; the NI Waiting List Reimbursement Scheme added
  (brief only mentioned the closed 2022 scheme); the Ombudsman clinical-
  judgement exclusion downgraded to `verify: true`.

### 2026-10-07: browser check results (audit-fixes)

1. **National Review of Adult Specialist Cardiac Services** (gov.ie, published 8 Apr 2025, last updated 9 Jun 2025; the PDF cover says "2023", so cite the gov.ie date). Text on page 8 (Executive Summary), read via fetch, not opened by a person: Recommendation 3 names four National Comprehensive Cardiac Centres (MMUH, SJH, CUH, GUH) with complex interventional cardiology (PCI, EP, structural heart) alongside a cardiothoracic surgical service; Recommendation 4 keeps 24/7 emergency STEMI-ACS care concentrated in those four. These are recommendations, not a designation. The four entries keep the agreed wording and cite the Review as `source_url`. Elaine opened the PDF later on 7 Oct 2026 and confirmed page 8.
2. **Mater cardiology page** (opened 7 Oct) supports: national cardiology centre, cath lab, adult congenital heart disease, care for people waiting for a heart transplant, nurse specialist services including TAVI and arrhythmia. It does not state 24/7 primary PCI or name electrophysiology/ablation; both stay flagged.
3. **`bons-cork-cardiology` tilt table testing:** the hospital confirmed by phone on 7 Oct 2026 that Cork offers it; the official page lists Dublin and Tralee only. Claim kept and noted in the entry. "Suspected POTS" removed. Urgent & Express fee cap and criteria stay unconfirmed, no figure.
4. **CUH:** the CUH website was on a maintenance page, so its About Us wording is unconfirmed. Re-check.

5. **Mater About page** (https://www.mater.ie/about/about-the-mater/, viewed 7 Oct 2026) states "We are the national centre for" heart surgery, heart and lung transplant, ACHD, pulmonary hypertension, adult ECMO, a high consequence infectious diseases (HCID) isolation unit, advanced heart failure/VAD, inherited metabolic disorders and rare diseases. The HCID isolation unit is confirmed on the Mater's own page, but no directory entry exists for it (`mater-nsiu` is the spinal injuries unit), so none was changed or added. A separate row would need a decision. The page does not state 24/7 primary PCI or electrophysiology/ablation.

Cardiac checklist:
- [x] 1a National Review wording: closed. Opened by Elaine on 7 Oct 2026, who confirmed Recommendations 3 and 4 on page 8 match the wording used. Entries carry `urlStatus: "opened"`. `verify` stays on the Mater (24/7 primary PCI and EP/ablation unconfirmed on the Mater's own pages), St James's (Keith Shaw Unit wording) and CUH (re-check About Us page); cleared on UHG.
- [ ] 1b Mater: partly closed. Mater national-centre wording confirmed on the Mater's About page (viewed 7 Oct 2026): heart surgery, heart and lung transplant, ACHD, advanced heart failure/VAD (and pulmonary hypertension on `mater-pulmonary-hypertension`). Still open: 24/7 primary PCI and EP/ablation, neither stated on the Mater's own pages. The 489 emergency cath lab procedures reported for 2025 is not evidence of 24/7 PCI and is not used.
- [ ] 1c CUH About Us: still open. The CUH site was on a maintenance page on 7 Oct 2026. `cuh-cardiology-comprehensive` stays `verify: true`.
- [x] 1d closed.
- [x] 1e closed by phone (tilt table, Cork).

## Log

### 2026-09-05

- MBU status confirmed in both jurisdictions and consolidated into a single `mbu-status` entry (ROI: funded, no opening date; NI: confirmed, Belfast City Hospital, 2028/29). Removed the old NI-only "known, acknowledged gap" line. Next check: Sep 2027.
- PHN entries replaced with a locator pattern: removed the three standalone Cork-area entries (Cork City, Mallow, Castletownbere) and the old "no compact public list exists" apology entry, replaced with a single national `phn-locator` entry pointing to the HSE Primary Care Centre locator (and the HSC Service Finder for NI).
- Geographic gap analysis run — see `GAPS.md`. Next geo review: Sep 2027.

### 2026-09-06 (incident + recovery)

- `data.js` was accidentally wiped to a 1-line placeholder by two commits pushed directly to `main` (no PR). Restored verbatim from the last good commit. See `CHANGELOG.md` and PR #11 for details. Any AI assistant working here: route `data.js` changes through a PR, not a direct push to `main`, so a size/syntax check has a chance to catch this before it ships.
- Addiction & Substance Use enriched from 3 to 7 entries: added Coolmine Therapeutic Community, Merchants Quay Ireland, the Cuan Mhuire residential network (5 sites incl. Newry, NI), and Addiction NI — all phone numbers and referral routes verified via live web search this session.
- Redid the RVEEH/SLRON/UPMC batch that two broken commits had claimed to add but never actually wrote: enriched Royal Victoria Eye and Ear Hospital with its phone number and current ~3-year routine waiting time, and added St Luke's Radiation Oncology Network, UPMC Whitfield (Waterford, incl. Hillman Cancer Centre), UPMC Kildare (Clane), and UPMC Sports Surgery Clinic (Santry).
- Neurology & Migraine enriched from 2 to 7 entries: added Beaumont Hospital National Neuroscience Centre, MS Ireland, Epilepsy Ireland, MS Society Northern Ireland, and Epilepsy Action NI.
- Dermatology enriched from 2 to 5 entries: added St James's Hospital, Cork University Hospital, and Royal Victoria Hospital Belfast dermatology departments — no compact national list exists, so these are the three named regional centres found via live search.
- Bone Health & Osteoporosis enriched from 4 to 6 entries: added an "About the Irish Fracture Liaison Service" explainer (coverage confirmed patchy — some HSE regions had none per the national FLS database report) and the Royal Osteoporosis Society for NI users.
- Haematology enriched from 4 to 7 entries: added the National Coagulation Centre at St James's (the actual clinical service, distinct from the Irish Haemophilia Society charity entry already present), Cork University Hospital Haematology, and University Hospital Limerick Haematology.
- Reviewed Dental & Oral Health (4 entries): judged adequate by design, same as PHN — two entitlement schemes plus a public-clinic locator plus an NI-crisis explainer already answer the practical question. Not padded with more entries.
- This closes out every item in `MASTER-BUILD-PLAN.md`'s Tier 3 thin-category list.
- Geo push (Phase C, `GAPS.md` priority order): added real, verified services to Down (3→8), Londonderry (3→7), Meath (3→4), and — as a side effect of two entries spanning both counties — Armagh (3→7). Added: Women's Aid Armagh Down and Foyle Women's Aid (dsv), Meath Women's Refuge & Support Services (dsv), Zest/Healing the Hurt (crisis/mh, Derry), and the Southern Trust Mental Health Referral and Booking Centre (adultmh, Armagh/Newry). See `GAPS.md`'s progress-update section. Tyrone is now the only untouched county from the original top-5 priority list.

### 2026-09-06 (JCI accreditation enrichment)

User supplied a `private_jci_enrichment.csv` (25 rows) covering JCI-accredited private hospitals plus a couple of public/independent ones. Cross-referenced against existing `data.js` entries by phone number and hospital name:
- Added a JCI-accreditation `details` line to 15 existing entries across Royal Victoria Eye and Ear Hospital, the Bon Secours network (bons-gynae-network, group-wide), all 3 Mater Private entries (Cork ×2, Dublin), both Beacon entries (Women's Centre, Breast Centre), Galway Clinic Gynaecology, Hermitage Clinic Gynaecology, Blackrock Health Women's Health Centre (re: Blackrock Clinic itself), UPMC Aut Even, UPMC Whitfield, and all 6 St Vincent's University Hospital (public) specialty entries — SVUH is "the only public acute Level 4 hospital in Ireland with JCI accreditation."
- Added 6 new entries for institutions with no prior entry at all: Beacon Hospital (general flagship), Blackrock Clinic (general flagship), Kingsbridge Private Hospital Sligo, St Vincent's Private Hospital, St Patrick's Mental Health Services, and St John of God Hospital (Stillorgan) — the latter two fill a genuine gap (private mental-health hospital options; every existing `adultmh`/`mh` entry was public/HSE).
- **Two discrepancies flagged rather than silently resolved:** Galway Clinic's switchboard is recorded as 091 785 000 in `data.js` but 091 785 800 in the enrichment CSV — noted in the entry itself, not resolved (no live fetch available to check which is current). Kingsbridge Sligo's JCI status is listed "unknown" in the enrichment CSV but the hospital's own site describes it as JCI-accredited — flagged in the entry rather than asserted either way.
- Respected "unknown" JCI status honestly: Kingsbridge (Belfast, already listed), UPMC Kildare, and UPMC Sports Surgery Clinic got no JCI claim added, since the source data doesn't support one. St Patrick's and St John of God likewise note JCI status as unconfirmed rather than silently added or omitted.
- `data.js`: 456 → 462 entries. Verified in-browser via Playwright that all 6 new entries render.

### 2026-10-06 / 07: tertiary gaps

Search-result only; egress to hse.ie, beaumont.ie and nidirect was blocked. Human browser checklist:

- [ ] Cardiac items 1a, 1b, 1c, 1e (open the 2025 National Review PDF; then clear `verify` and add `checked` on the four comprehensive-centre entries).
- [ ] Mater: 24/7 primary PCI and EP/ablation. St James's: Keith Shaw Unit "national referral centre" wording.
- [ ] `bons-cork-cardiology`: Urgent & Express fee cap and criteria; tilt-table testing (Cork not on the HSE page).
- [x] Beaumont MND wording: closed. The Beaumont neurology page (viewed 7 Oct 2026) lists MND as a specialist service within the Department of Neurology, referrals via Healthlink. It describes no separate MND clinic and no national designation, so the row is now "Motor Neurone Disease (MND) service, Beaumont Hospital". No consultant names, clinic days or contacts.
- [ ] GUIDe Clinic (`gum-guide-stjames`): guideclinic.ie/sti-clinic opened 7 Oct 2026; entry now cites it and lists online booking, PrEP clinics with online booking and the Young Person's Clinic (ages 20 and under). `verify: true` stays and no new `checked` date: the PEP page was not opened (no PEP, walk-in or clinic-day claims). The https form of the source URL is untested; switch to http if it does not load. "HSE-operated" and `sector` are still unverified.
- [ ] `gum-guide-stjames` (existing entry, not edited): its phone was checked by web search before the current rules, not copied from a page a person opened. "HSE-operated" and `sector: "voluntary"` are unverified.
- [ ] `ni-regional-genetics` (existing entry, not edited): its phone, email and address were checked by web search before the current rules. The regional clinic list and "single service" wording are unverified.
- [x] SVUH liver transplant page: opened 7 Oct 2026. National centre, running since 1993, clinician referral form, pancreas programme also at SVUH. King's College appears only as a training link and second-opinion arrangement; not claimed. `verify` cleared and `checked: 7 Oct 2026` set (Elaine's browser pass is the human check).
- [x] NRH referral page: opened 7 Oct 2026. Adult and paediatric referrals; the 7 and 10 working-day timelines are not on the page and stay out. `verify` cleared and `checked: 7 Oct 2026` set.
- [ ] Restore or replace the HSE psycho-oncology `source_url` when HSE pages return (NCCP site down 7 Oct 2026; the old hse.ie psycho-oncology URLs return "Page not found"). `roi-nccp-psycho-oncology` stays `search-result`, `verify: true`, old URL.
- [ ] CUH psycho-oncology page (cannot be opened while CUH is on maintenance).
- [x] CHI genetics page: opened 7 Oct 2026. Page lists both CHI at Crumlin and Temple Street, so the row is renamed. `verify` cleared and `checked: 7 Oct 2026` set.
- [x] Belfast Trust liver coordinator page: opened 7 Oct 2026. Adults only; pre- and post-transplant care at the RVH, surgery at King's College Hospital, London; the RVH with King's is described as the only hospital in NI running a liver transplant service. `ni-transplant-gb-referral` liver part sourced and `checked: 7 Oct 2026`. The SVUH wording (King's as a training link and second-opinion arrangement) is a different official page and is not merged with this.
- [ ] Heart and lung to Freeman (`ni-transplant-gb-referral`): the Belfast Trust cardiac surgery page (opened 7 Oct 2026) says it does all surgical procedures apart from transplants but does not name Freeman. Stays `verify: true`. Pancreas and kidney-pancreas: no wording found, unverified.
- [x] `beaumont-national-neuroscience`: closed 7 Oct 2026. Beaumont's neurosurgery page calls it "The National Neurosurgical Centre" and carries 1800-TRAUMA (1800 872 862), so the blurb was reworded to Beaumont's own wording, the stroke claim dropped (not on either page), the TBI line restored as a clinician referral line, `verify` cleared and `checked: 7 Oct 2026` set. "Ireland's largest National Neuroscience Centre" (About page) was not opened and is not used.
- [ ] `swah-gynae`: blurb rewritten to a plain description and `verify: true` set. The Western Trust SWAH page (read 7 Oct 2026) confirms the switchboard 028 6638 2000, the address, and a Women's Health Clinics page listing a Gynae clinic. "Covers Fermanagh and west Tyrone" is not on either page.
- [x] Galway Clinic phone: confirmed 7 Oct 2026. `blackrockhealth.com/locations` lists Galway as +353 91 785 000, so 091 785 000 stands. The 800 variant in the enrichment CSV is most likely the Limerick Clinic's 1800 784 000 from the same page. `galway-clinic-gynae` `checked` updated.
- [x] `galwayclinic.com` now redirects (301) to `blackrockhealth.com`. Owner approved `blackrockhealth.com` for the allow-list 7 Oct 2026; `galway-clinic-gynae` web field updated and `source_url` set to the locations page.
- [ ] Plastics/burns/surgery research (7 Oct 2026): CUH neurosurgery has no live page (cuh.hse.ie shows the HSE maintenance page), so there is no CUH neurosurgery entry. Re-check when the site returns, and do not label it national or regional until then.
- [ ] `rvh-regional-neurosurgery`: renamed to "Regional Neurosciences Centre" and set `verify: true`. The DoH NI 2019 neurology review says one Regional Neurosciences Centre is at the RVH but does not mention neurosurgery. The old "only neurosurgical unit in NI" line was removed as unsourced. No current Belfast Trust neurosurgery page found.
- [ ] `ni-emergency-general-surgery-sites` is `verify: true`: the Southern page (28 Sep 2023) and Northern page (22 May 2025) describe Board recommendations, and the Northern one needed ministerial approval. The research said DoH approved Southern's move in Jan 2024 via a Northern Trust FAQ, but that FAQ URL and the Northern consultation URL now return 404. Find the DoH approval before stating either as settled. Belfast general surgery page not checked for emergency sites.
- [ ] No ROI emergency general surgery entry: no official page lists which hospitals provide 24/7 EGS, and the HSE Model of Care page is "being updated". Do not infer from ED status.
- [ ] Not added: HSE CIT page (`hse.ie/eng/services/list/3/cits/`) returns "Page not found" (7 Oct 2026). Re-check for a current CIT page.
- [ ] Primary & Urgent Care (7 Oct 2026): `ni-pharmacy-first` states the shingles service ran only to 30 Sep 2026 and the SPPG page had not been updated; re-check. `roi-injury-units` is a directory explainer, with no row per unit; Naas (16 and over) and the other age limits in the research were not re-checked, and the injury unit charge is deliberately not quoted. `ni-minor-injury-units`: Belfast Trust not checked; the research says the Bangor unit is closed and the South Eastern Trust is moving to urgent care centres, neither read. The abbreviation "LIU" for local injury unit was not found on an official page and is not used.
- [ ] **Local-services and parenting research rows: decisions recorded 7 Oct 2026, rows not yet added.** The results file (`research/LOCAL-SERVICES-PARENTING-<date>.md`, from `RESEARCH_BRIEF_LOCAL_SERVICES_AND_PARENTING.md`) was not in the folder when these decisions arrived. When it is, apply these:
  - NI-wide rows list the six counties (antrim, armagh, down, fermanagh, londonderry, tyrone), not `national`.
  - Long-Term Illness Scheme: link only, using the `www2.hse.ie/services/schemes-allowances/lti/` family (contact page `/lti/contact/`). No phone or address from the old `/long-term-illness-scheme/` pages.
  - Mayo mental health row stays withheld (old-site page, stale terminology) until a current `www2.hse.ie` page names Mayo teams.
  - New row: Mayo Local Health Office, County Clinic, Westport Road, Castlebar, from `www2.hse.ie/services/local-health-office/`, link only. The phone 094 902 2333 goes in only after Elaine's browser check.
  - Un-withhold after a proper read: Caredoc Gorey, Wicklow and Arklow (confirm county addresses); Omagh health visiting; Omagh sexual and reproductive health (needs a specialty id).
  - Every row `verify: true`, `urlStatus: "search-result"`, no `checked`. Specialty id `urgent`: **approved by Elaine 7 Oct 2026**, but not created yet, because an empty specialty would show as "0 services" on the browse page. Add it with the first rows that use it. The label still needs confirming (proposed "Urgent Care"). It overlaps with the existing `primary-care` ("Primary & Urgent Care"), so each row should pick one, and injury units, minor injury units and out-of-hours GP rows should be tagged consistently with `ni-minor-injury-units` and `roi-injury-units`.
  - Duplicate check against `data.js` on 7 Oct 2026: nothing found for HSE Live, long-term illness, parent or paternity leave, Caredoc, KDOC or interpreters; Mayo has four entries and no local health office row; Omagh appears in three existing entries (Western Trust maternity, NI CAMHS, NI minor injury units); IVF and AHR already has four entries (`cork-fertility-hub`, `rotunda-fertility`, `hse-approved-ahr-clinics`, `nisig`), so propose edits, not new rows.
- [ ] **Label-gated auto-merge: set-up status (7 Oct 2026).** Design is in `CLAUDE_CODE_AUTOMERGE.md`. Rule added to `AI_RULES.md`. Still to do:
  1. Elaine, in GitHub settings (Part 1): allow auto-merge, add a `main` ruleset requiring the `validate` check and a pull request, and create the `automerge` label. Confirm the repo is public (rulesets on free plans need that).
  2. **`.github/workflows/automerge.yml` is not in the repo.** The token Claude Code pushes with has no `workflow` scope (same refusal as the search audit CI step). Add the file from the brief via the GitHub web UI (Add file, then Create new file), or give the token the `workflow` scope. Checked here: the YAML parses, the existing `validate` job name is unchanged, and the guard's grep, run on this repo's real history, blocks PRs #84, #87 and #89 (they set `checked` or `urlStatus: "opened"` or clear `verify`) and lets #86, #88 and #90 through.
  3. After the first auto-merge, check whether any Pages deployment still runs, as the brief's caveat 1 says.
- [ ] **Add the search audit to CI by hand (7 Oct 2026).** The token Claude Code pushes with has no `workflow` scope, so GitHub refused the edit to `.github/workflows/data-integrity.yml`. In that file, add `node --check search.js` after `node --check data.js` in the "Syntax-check JS files" step, and add this step before "Guard against data.js being wiped or truncated":

  ```yaml
      - name: Search regression (alias targets, zero-result list, noisy queries)
        run: node scripts/search-audit.js
  ```

  Until then the audit only runs when someone runs `node scripts/search-audit.js`.
- [x] **Search S6 crisis banner: approved by Elaine 7 Oct 2026 and built.** Wording: "If you or someone else is in crisis or in immediate danger, support is available now." with the link "Mental Health Crisis Support ›" to `#/specialty/crisis`, shown above results on the search page only. No phone numbers or extra copy. Triggers are in `search.js` (`CRISIS_WORDS`, `CRISIS_PHRASES`, `CRISIS_WHOLE_QUERY`); "crisis" triggers only as the whole query, so "crisis pregnancy" does not. Please look at it in a browser, including calm mode and a screen reader, before relying on it.
- [ ] Search aliases to skim (7 Oct 2026): `toddler` (many child entries), `er`/`ed`/`a and e` (psychiatric units that mention an emergency department), `wheelchair` (one OT entry via "seating"), `abortion` (only the existing My Options wording). `CONDITIONS_KEYWORDS_PROPOSAL.md` holds the proposed keywords for the 66 conditions that have none.
- [ ] Re-read gov.ie Your guide to Budget 2027 for GP visit card, DPS and AON.
- [ ] Budget 2027 items still marked as announced only: re-check start dates once the Finance Bill and social welfare legislation pass (Free Contraception Scheme to age 37, 1.8 million home-support hours, new CAMHS ADHD pathway, four new Jigsaw services, 500 extra NHSS places, Carer's Allowance disregard from July 2027, €10 weekly rate rises from January 2027, €500 cost of disability payment date).
- [ ] Open the five new `source_url`s.

- [ ] Condition keywords (S8) applied 7 Oct 2026 from `CONDITIONS_KEYWORDS_PROPOSAL.md`: 53 conditions now have lay or alternative names; 13 stay empty on purpose (no alternative name). Skim the PR diff of `data/conditions.js` and strike any you dislike.