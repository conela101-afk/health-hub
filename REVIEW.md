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
