# Geographic Coverage Review

Reviewed 5 Sep 2026 against 2022 CSO / 2021 NISRA population data, by
computing entries-per-100k-population across all 32 counties.

**Finding:** population density does not fully explain the skew in entry
counts per county — a clear secondary pattern showed up.

## Confirmed genuine gaps (population-adjusted)

Lowest entries per 100k population, relative to county population:

| County | Entries | Population | Entries/100k |
|---|---|---|---|
| Down | 3 | 553,261 | 0.54 |
| Londonderry | 3 | 252,231 | 1.19 |
| Meath | 3 | 220,826 | 1.36 |
| Armagh | 3 | 194,394 | 1.54 |
| Tyrone | 3 | 188,383 | 1.59 |
| Wicklow | 3 | 155,851 | 1.92 |
| Kildare | 6 | 247,774 | 2.42 |
| Wexford | 4 | 163,919 | 2.44 |
| Louth | 4 | 139,703 | 2.86 |
| Mayo | 4 | 137,970 | 2.90 |

These split into two groups:

1. **Dublin commuter-belt counties** (Kildare, Meath, Wicklow, Louth) —
   large populations, but entries likely got absorbed into "Dublin"
   listings rather than logged separately.
2. **NI counties outside Antrim** (Down, Londonderry, Armagh, Tyrone) —
   Belfast/Antrim entries dominate, the other five NI counties are thin.

## Confirmed NOT gaps

Low counts explained by genuinely small populations — proportionate
coverage, not neglect:

- Leitrim (35k, rate 8.52)
- Longford (47k, rate 4.28)
- Cork North (small population within Cork)

## Next research priority order

1. Down, Londonderry, Meath, Armagh, Tyrone (biggest population-to-coverage mismatch)
2. Wicklow, Kildare, Wexford, Louth, Mayo (secondary tier)
3. Leitrim, Longford, Cork North — no action needed, reviewed and closed out.

Next geo review due: Sep 2027.

## Progress update: 6 Sep 2026

Worked the top of the priority list (Down, Londonderry, Meath, plus partial Armagh coverage as a side effect — see `REVIEW.md` for the specific entries added):

| County | Entries (5 Sep) | Entries (6 Sep) | Rate (5 Sep) | Rate (6 Sep) |
|---|---|---|---|---|
| Down | 3 | 8 | 0.54 | 1.45 |
| Londonderry | 3 | 7 | 1.19 | 2.78 |
| Meath | 3 | 4 | 1.36 | 1.82 |
| Armagh | 3 | 7 | 1.54 | 3.60 |

Real improvement, but none of these are "closed out" yet the way Leitrim/Longford/Cork North are — they've moved off the absolute floor, not up to Cork-City-level adequacy. **Tyrone is now the only untouched county from the original top-5 list.** Wicklow/Kildare/Wexford/Louth/Mayo (secondary tier) also untouched.

## Progress update: 25 Sep 2026 (recount against live `data.js`)

**Correction to the 6 Sep note above:** Tyrone is *not* "the only untouched
county" any more. A fresh count of `data.js` (490 entries, counting every
entry whose `county` array includes the county) shows it has moved off the
3-entry floor, and the secondary tier has shifted too:

| County | Entries (5 Sep) | Entries (25 Sep) | Rate (25 Sep) | Where the change came from |
|---|---|---|---|---|
| Down | 3 | 8 | 1.45 | 6 Sep geo push |
| Londonderry | 3 | 7 | 2.78 | 6 Sep geo push |
| Meath | 3 | 5 | 2.26 | 6 Sep geo push + Drogheda psychiatry (7 Sep) |
| Armagh | 3 | 7 | 3.60 | 6 Sep geo push (side effect) |
| Tyrone | 3 | 4 | 2.12 | Western/Southern-cross entries tagged to Tyrone: Western Trust maternity, SWAH gynae, SWAH orthopaedics, NI CAMHS |
| Wicklow | 3 | 5 | 3.21 | Side effect only (NMH, Jigsaw, Purple House, ASI tagged across counties) |
| Kildare | 6 | 8 | 3.23 | Side effect only (UPMC Kildare, Cuan Mhuire network) |
| Wexford | 4 | 4 | 2.44 | Unchanged |
| Louth | 4 | 5 | 3.58 | Side effect only (Drogheda psychiatry) |
| Mayo | 4 | 4 | 2.90 | Unchanged |

Note: a planning note put Tyrone at 5 entries; the actual count in `data.js`
on 25 Sep is 4. Recount before quoting a figure — don't copy this one forward.

Tyrone's gain is all cross-county Western/regional entries. It still has
**no Tyrone-specific service** (nothing based in Omagh, Dungannon, Cookstown or
Strabane), so it remains on the priority list. It's just no longer untouched.

The secondary tier (Wicklow/Kildare/Wexford/Louth/Mayo) has had **no
dedicated research pass yet**. Where counts went up, it was because
multi-county or Dublin-hospital entries also listed these counties. Wexford
and Mayo haven't moved at all. Next step is still a proper local-services pass
on these five, starting with Wexford and Mayo.
