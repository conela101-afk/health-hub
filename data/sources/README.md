# Facilities data sources

`ireland_healthcare_master_scaffold.csv` in this directory is the source
for `../facilities.js` (the "Find a Facility" layer). Regenerate the JS
with `python3 data/sources/build-facilities.py` after dropping in a
fresher scaffold — don't hand-edit `facilities.js`.

## What the scaffold is

A pre-merged snapshot (4,111 rows, one unified schema) of five separate
regulator/registry sources, supplied directly for this project on
2026-09-06 rather than fetched live — this session's network egress is
blocked against external domains (confirmed against several unrelated
domains, not source-specific), so a live CSV/API fetch wasn't possible.
The five sources it merges:

| Source | Rows | Jurisdiction | Covers |
|---|---|---|---|
| HIQA Older Persons Register | 546 | ROI | Nursing homes |
| HIQA Disability Register | 1,805 | ROI | Disability residential centres |
| RQIA Registered Services | 1,545 | NI | Nursing homes, residential care, domiciliary care, day care, dental practices, independent hospitals/clinics, nursing agencies, hospices, adult placement, adoption agencies — RQIA's one register spans all of these |
| HSE GeoHive / Health Atlas | 132 | ROI | Hospitals |
| HIA Definitive Hospital List (Aug 2025) | 83 | ROI | Additional hospitals + hospices not already in the GeoHive extract |

## Verification done this session

Spot-checked several rows (across HIQA older-persons, HIQA disability,
and RQIA sources) against the original raw exports — phone, address,
provider, and registration details matched exactly in every case
checked. Not exhaustively verified row-by-row across all 4,111 rows.

## Known gaps, honestly

- **HIQA Disability Register rows have no public address.** This is a
  property of the source register itself, not something stripped out —
  reasonably, for resident privacy, since individual disability
  designated centres are often small group homes.
- **~6 of 4,111 rows are missing `county_or_trust`** in the source data.
  Left blank rather than guessed.
- **Not a full hospital/clinic directory.** This covers what HIA's list
  and HSE GeoHive happened to include, not every ROI private/independent
  hospital, and doesn't include GP practices, pharmacies, or outpatient
  clinics at all — those stay out of scope for this layer (same as the
  original Phase D decision doc).
- **Id collisions in the raw scaffold.** A handful of distinct records
  (e.g. the same provider dual-registered as both "Domiciliary Care" and
  "Nursing Agency" at the same address) shared a truncated id in the
  source `id` column. `build-facilities.py` de-duplicates these with a
  numeric suffix — see its docstring.

## Attribution / re-use terms

Not independently confirmed against each source's own licensing page in
this session (network-blocked, same as the live-fetch problem above).
RQIA/OpenDataNI data is Open Government Licence v3.0 per its own
publication; HIQA, HIA, and HSE GeoHive terms should be checked against
their own sites before this data is reused anywhere beyond this app. See
the `FACILITIES_ATTRIBUTION` object in `../facilities.js` for the
attribution text currently shown in-app.

## Raw originals

The five raw source files (two HIQA CSVs, the RQIA/OpenDataNI xlsx, the
HSE GeoHive CSV, and the HIA PDF) that were merged into the scaffold
above aren't stored in this repo — only the merged scaffold is, to avoid
committing several megabytes of largely-redundant raw exports. If a
row's accuracy needs re-verification against its original source, the
`source` and `source_id` columns in the scaffold identify exactly which
raw file and row to check, and `url` links to the row's own regulator
page where one exists.
