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
- [x] Galway Clinic phone: confirmed 7 Oct 2026. `blackrockhealth.com/locations` lists Galway as +353 91 785 000, so 091 785 000 stands. The 800 variant in the enrichment CSV is most likely the Limerick Clinic's 1800 784 000 from the same page. `galway-clinic-gynae` `checked` updated.
- [ ] `galwayclinic.com` now redirects (301) to `blackrockhealth.com`. `galway-clinic-gynae` still has `web: "galwayclinic.com"`. Awaiting the owner's decision on adding `blackrockhealth.com` to the source-domain allow-list; then update the web field.
- [ ] Re-read gov.ie Your guide to Budget 2027 for GP visit card, DPS and AON.
- [ ] Budget 2027 items still marked as announced only: re-check start dates once the Finance Bill and social welfare legislation pass (Free Contraception Scheme to age 37, 1.8 million home-support hours, new CAMHS ADHD pathway, four new Jigsaw services, 500 extra NHSS places, Carer's Allowance disregard from July 2027, €10 weekly rate rises from January 2027, €500 cost of disability payment date).
- [ ] Open the five new `source_url`s.
