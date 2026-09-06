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
