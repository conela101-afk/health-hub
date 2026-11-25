# Service Card Enrichment Template

Target schema for batch-updating existing cards or adding new ones, so every entry answers "how do I actually get in the door" — not just "does this exist."

**Note on field names:** the review that prompted this template proposed new field names (phone number, access route, last-reviewed date). `data.js` already has working equivalents under its own naming convention — use those, don't add parallel fields. See the mapping below.

## Fields per card

| Field | Required? | `data.js` field | Notes |
|---|---|---|---|
| Name | Existing | `name` | |
| Specialty tag(s) | Existing | `specialty[]` | |
| County/region | Existing | `county[]` | |
| Public / private / voluntary | Existing | (usually stated in `blurb`) | |
| **Phone number** | New — required | `contact.phone` | Main contact line; note if it's a switchboard vs direct line (e.g. `"021 492 0500", extra: "ask for Urology"`). Currently on 286/422 entries — see `coverage-gap-tracker.md` §4. |
| **Access route** | New — required | `referral` | One of: self-refer / GP-referral required / consultant-referral only / waiting-list (public). Already present on 419/422 entries — nearly done. |
| **Last-reviewed date** | New — required | `checked` | Stamp with `"D Mon YYYY"` whenever info is checked, even if unchanged — builds user trust over time. Currently on 321/422 entries. |
| Cost note | New — required for private | *(no field yet)* | Rough range or "contact for pricing" if unknown. No structured field exists — decide whether to add one (e.g. `cost`) or keep folding into `blurb`/`details` before batch-processing this. |
| Eligibility note | New — optional | *(usually folded into `details[]`)* | e.g. age range, catchment area, means-tested |
| Source | New — recommended | *(not tracked per-entry)* | Which HSE/HSC page or directory this was pulled from, for future re-verification. Consider a `source` field, or at minimum log it in the commit message / `REVIEW.md` for the batch. |

## Batch workflow suggestion

1. Pick one specialty at a time (start with the priority gaps in `coverage-gap-tracker.md` §3).
2. Pull phone + access route from the relevant HSE/HSC directory page for that specialty, rather than card-by-card.
3. Stamp every touched card's `checked` field with today's date, even ones that only got a phone number added.
4. Log the source URL somewhere retrievable (a `source` field if one gets added, otherwise the commit message) — makes the next re-verification pass faster.

## Example (before / after)

**Before:**
```js
{ id: "cork-urology", name: "Cork Urology Clinic", specialty: ["urology"], county: ["cork-city"] }
```

**After:**
```js
{
  id: "cork-urology",
  name: "Cork Urology Clinic",
  specialty: ["urology"],
  county: ["cork-city"],
  referral: "GP-referral required, public waiting list.",
  contact: { phone: "021-XXX-XXXX", extra: "CUH switchboard, ask for Urology" },
  checked: "6 Sep 2026"
}
```
