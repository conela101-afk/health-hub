# URLs to verify when back online

From the medico-legal review of the "Health Hub App Improvements" roadmap
(Sep 2026). This sandbox session had no general web egress (confirmed via
the agent proxy status — even unrelated domains like `example.com` and
`www.google.com` came back as explicit `403` policy denials, not timeouts),
so these three `SCHEME_LINKS` entries were drafted but never added to
`data.js`, per this repo's own rule: **never add a URL without verifying it
live first.**

NTPF was already added (`data.js`, `SCHEME_LINKS`, id `ntpf`) — it only
needed the bare `ntpf.ie` domain, which was already verified elsewhere in
this codebase (an existing `contact.web` field), so no new URL was needed.

For each item below: find the current live page, confirm it says what the
`blurb` claims, and paste the entry into `SCHEME_LINKS` in `data.js` (same
array as the `ntpf` entry) with the real URL swapped in for the
`VERIFY-THIS-URL` placeholder. Follow the existing "link, don't duplicate"
convention — don't add figures/rates/thresholds into the `blurb`, only a
description stable enough not to go stale.

## 1. Cross-Border Healthcare Directive (EU)

Lets a patient get planned healthcare in another EU/EEA country and claim
reimbursement from the HSE up to what it would have cost in Ireland. Likely
lives on `www2.hse.ie` under a "cross-border" or "schemes-allowances" path,
or on `citizensinformation.ie`. Search for "HSE Cross Border Healthcare
Directive" and "citizensinformation cross-border healthcare directive" and
take whichever is the current canonical page — check both exist and agree.

```js
{
  id: "cross-border-directive",
  name: "Cross-Border Healthcare Directive (EU)",
  jurisdiction: "roi",
  blurb: "Lets you get planned healthcare in another EU/EEA country and claim back what it would have cost you in the Irish public system — you pay upfront and reclaim afterwards, so check what's covered and get prior authorisation where required before you book anything.",
  prep: [
    "Check whether your specific treatment needs prior authorisation from the HSE before you travel — some do, some don't, and this changes the reimbursement risk if you go ahead without it.",
    "Get a detailed quote and itemised invoice from the overseas provider — reimbursement is capped at the equivalent Irish public cost, not what you actually paid.",
  ],
  links: [
    { label: "How it works & how to claim — VERIFY-THIS-URL", url: "VERIFY-THIS-URL" },
  ],
},
```

## 2. Treatment Abroad Scheme (TAS)

Separate from the Cross-Border Directive — for treatment not available in
Ireland at all, HSE-approved in advance, HSE pays the approved provider
directly (not a reimbursement claim). Likely `www2.hse.ie`, search "HSE
Treatment Abroad Scheme".

```js
{
  id: "treatment-abroad-scheme",
  name: "Treatment Abroad Scheme (TAS)",
  jurisdiction: "roi",
  blurb: "For treatment that isn't available in Ireland at all — your consultant applies to the HSE for prior approval, and if approved the HSE pays the overseas provider directly rather than you claiming money back. A narrower, slower-moving scheme than the Cross-Border Directive, for a smaller set of situations.",
  prep: [
    "This starts with your consultant, not you directly — ask them whether your treatment qualifies and whether they'll make the E112/S2 application on your behalf.",
  ],
  links: [
    { label: "How it works & how to apply — VERIFY-THIS-URL", url: "VERIFY-THIS-URL" },
  ],
},
```

## 3. Registering with / changing GP under the GMS scheme

What to do when local GP practices are closed to new patients — covers
finding a GMS-participating GP and the formal process for changing GP.
Likely `citizensinformation.ie`, search "citizensinformation registering
with a GP" or "changing your GP".

```js
{
  id: "gms-gp-registration",
  name: "Registering with, or changing, a GP",
  jurisdiction: "roi",
  blurb: "If your local GP practices are closed to new patients, the HSE's list of GPs participating in the GMS scheme is the place to start — and there's a formal process for changing GP if the one you're with isn't working out, not just walking into a new practice.",
  prep: [
    "If every practice near you says it's full, ask your Medical Card / GP Visit Card local health office (not the GP practice) for help placing you — this is a recognised gap, not something you have to solve alone.",
  ],
  links: [
    { label: "How to find or change a GMS GP — VERIFY-THIS-URL", url: "VERIFY-THIS-URL" },
  ],
},
```

## Also worth a look while online

Not urgent, but from the same review — no action needed unless you want to
extend further:

- **Cross-Border Directive / TAS / GMS entries above** are the only three
  outstanding items from the original Tier A/B review split (see PR
  description / commit history on this branch for the full write-up).
- Nothing else from the roadmap is pending — the auto-generating HSE
  complaint/policy-mapping engine and the medication-taper/pharmacy-supply
  justification generator from the original roadmap were deliberately not
  built (see README.md's "Content conventions" section) — they'd have the
  app render legal/clinical judgments it isn't positioned to make, not a
  URL-verification gap.
