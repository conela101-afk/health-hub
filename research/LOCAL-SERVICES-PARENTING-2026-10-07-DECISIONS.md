# Decisions from Elaine, 7 Oct 2026

Apply together with `research/LOCAL-SERVICES-PARENTING-2026-10-07.md`
(the candidate-rows report). Unverified rows only: every row stays
`verify: true`, `urlStatus: "search-result"`, no `checked` field.

## Approved hosts (add to AI_RULES.md)
familysupportni.gov.uk, bso.hscni.net, saolta.ie, caredoc.ie, kdoc.ie,
adoptionandfostercare.hscni.net, online.hscni.net.
Anything else stays withheld. saolta.ie, caredoc.ie and kdoc.ie: secondary
sources only, never the sole support for an official-service claim.

## County convention
NI-wide rows list the six counties (antrim, armagh, down, fermanagh,
londonderry, tyrone), not "national".

## Long-Term Illness Scheme
Use the www2.hse.ie/services/schemes-allowances/lti/ URL family
(contact page: /lti/contact/). Link only. No phone or address from the
old /services/long-term-illness-scheme/ pages.

## Mayo
- Mayo mental health row (old hse.ie/eng/... page): keep WITHHELD.
  Un-withhold when a current www2.hse.ie page names Mayo teams.
  The HSE West and North West region page has no Mayo mental health listing.
- Add new row, link only:
  id roi-mayo-local-health-office, name "Mayo Local Health Office",
  county ["mayo"], source_url https://www2.hse.ie/services/local-health-office/
  The page lists the office at County Clinic, Westport Road, Castlebar, under
  HSE West and North West, and describes Local Health Offices as an entry
  point to community health and personal social services (GP services, public
  health nursing, home help). specialty [] (fill from existing ids).
  Phone 094 902 2333 was read on that page by Elaine; add only after her
  browser check.

## Un-withhold after a proper page read
- Caredoc Gorey, Caredoc Wicklow, Caredoc Arklow (confirm county addresses).
- Omagh health visiting and Omagh sexual and reproductive health
  (host now approved; the second needs a specialty id).

## Still open
- New specialty id "urgent" (EDs, injury units, MIUs, GP out-of-hours,
  Phone First): needs Elaine's yes. Until then specialty [] rows use
  existing ids.
- Check every candidate against data.js for duplicates first (hospital, ED,
  HSE Live, LTI, IVF and leave rows are the likely ones).
- Recount entries by script; never quote a count.
- Not covered by this pass: community services (CDNT, CAMHS, dental,
  addiction, DSGBV), Down, Londonderry, and the Part B gaps.
- All data.js changes via PR; never push to main; node --check before and after.
