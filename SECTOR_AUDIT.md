---
title: Sector filter audit — Public / Private / Voluntary
date: 2026-09-07
status: resolved
owner: Elaine
tool: Claude (review + code)
---

## Trigger

Private/Public filters flagged as high-traffic and reviewed comprehensively per
standing practice. Grok's initial review plan assumed a permissioned,
account-based data model (roles, ownership, backend auth) that does not
describe Health Hub's actual architecture — a static, no-account PWA. This
audit replaces that plan with one scoped to the real `sector` field on
specialty entries in `data.js`.

## What "sector" actually means here

`sector` is an entity-level tag on a service entry describing the *type of
institution* (HSE/HSC public body, private hospital/clinic, or voluntary
sector organisation) — not a data-access permission. Many public entries
also mention private options in their own blurb/details text (e.g. a public
maternity hospital that also offers private care); that nuance is correctly
left in free text and is not what this tag is for.

## Findings

| # | Finding | Scale | Resolution |
|---|---|---|---|
| 1 | `sector` had only two live values (`private`, `voluntary`); "Public" was implemented as *not-private* rather than a real category | 32 private / 4 voluntary / 642 untagged of 678 entries | Made explicit 3-way: `public` \| `private` \| `voluntary`, via shared `sectorOf()` |
| 2 | Voluntary hospitals (e.g. St. Vincent's, the Mater) were silently bucketed under "Public" | 4 tagged `voluntary` | Confirmed as its own filter category, per Elaine's decision (2026-09-07) |
| 3 | Tab filter and free-text search implemented sector classification independently — risk of drift | 2 code paths | Unified behind one `sectorOf(e)` function in `app.js` |
| 4 | One entry's name explicitly says "Private" but had no `sector` tag | 1 of 555 untagged | Tagged `hse-approved-ahr-clinics` as `sector: "private"` |
| 5 | 24 of 555 untagged entries mention "private" somewhere in free text (mixed-pathway entries, e.g. CUMH maternity) | 24 | No action — correctly represents institutional mixed access; not a mistagging |

## Not found

A full audit of all 555 untagged entries did not surface a broader
mislabeling problem. The untagged default ("no `sector` field" → `public`)
holds for the large majority; this was a single-entry fix, not a bulk
re-tag.

## Code changes

- `app.js`: added `sectorOf(e)` — single source of truth for sector
  classification, used by both the specialty tab filter and by the
  `private` search keyword.
- `app.js`: `SECTOR_FILTERS` now has four tabs — All / Public / Private /
  Voluntary.
- `data.js`: `hse-approved-ahr-clinics` tagged `sector: "private"`.

## Open follow-ups (not done in this pass)

- ~~Search currently only has a `private` magic keyword...~~ **Resolved
  2026-09-12**: added an equivalent `voluntary` magic keyword. Voluntary
  hospitals grew to 72 tagged entries in the meantime (a separate pass, see
  `CHANGELOG.md` 2026-09-10), so this was worth doing rather than deferring
  further. Since 71 of those 72 entries have no shared `provider` field
  (unlike private entries, which are mostly provider-grouped), voluntary
  search results render as flat cards under a "Voluntary hospitals" heading
  instead of reusing the private path's provider-grouping.
- ~~UI copy: "Public" tab label may still read ambiguously...~~ **Resolved
  2026-09-12**: added a `title` tooltip to the Public tab ("State-run
  HSE/HSC bodies — voluntary hospitals have their own tab") and to the
  Voluntary tab, rather than changing the visible label text.
