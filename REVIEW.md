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

1. **National Review of Adult Specialist Cardiac Services** (gov.ie, published 8 Apr 2025, last updated 9 Jun 2025; the PDF cover says "2023", so cite the gov.ie date). Text on page 8 (Executive Summary), read via fetch, not opened by a person: Recommendation 3 names four National Comprehensive Cardiac Centres (MMUH, SJH, CUH, GUH) with complex interventional cardiology (PCI, EP, structural heart) alongside a cardiothoracic surgical service; Recommendation 4 keeps 24/7 emergency STEMI-ACS care concentrated in those four. These are recommendations, not a designation. The four entries keep the agreed wording, cite the Review as `source_url`, and stay unchecked until a person opens the PDF at page 8.
2. **Mater cardiology page** (opened 7 Oct) supports: national cardiology centre, cath lab, adult congenital heart disease, care for people waiting for a heart transplant, nurse specialist services including TAVI and arrhythmia. It does not state 24/7 primary PCI or name electrophysiology/ablation; both stay flagged.
3. **`bons-cork-cardiology` tilt table testing:** the hospital confirmed by phone on 7 Oct 2026 that Cork offers it; the official page lists Dublin and Tralee only. Claim kept and noted in the entry. "Suspected POTS" removed. Urgent & Express fee cap and criteria stay unconfirmed, no figure.
4. **CUH:** the CUH website was on a maintenance page, so its About Us wording is unconfirmed. Re-check.

Cardiac checklist:
- [x] 1a National Review wording: done via fetch (open the PDF at page 8 to clear `verify` and add `checked`).
- [ ] 1b Mater: partly done (see 2).
- [ ] 1c CUH: pending (site down).
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
