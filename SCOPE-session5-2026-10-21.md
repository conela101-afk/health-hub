# Session 5 scopes (21 Oct 2026): scope only, nothing built

Four proposals, one page each. Nothing here is approved. Each needs Elaine's yes before any build. For every item: no analytics, no third-party requests, CSP unchanged (`default-src 'self'`, `connect-src 'self'`, `frame-src 'none'`), `check-third-party.sh` must still pass, copy follows the no-AI-sounding-copy rule, and nothing is stored unless the person ticks "Save on this device" (existing `readStore`/`writeStore` pattern).

## 1. Write to your TD / councillor (letter builder)

**What it is.** A guided form that produces a short, neutral letter asking an elected representative to raise a health-service problem with the HSE or the Minister. Copy, print or `mailto:` only. Same shape as the existing letter builders (`LETTER_TEMPLATES`, `printOnly`, copy button).

**Recommended first version: no representative data at all.** The letter has placeholders; the page links out to the official "find your TD / councillor" pages. This ships without any new host, any contact detail or any `verify` rows. A second version adds a constituency or electoral-area dropdown that fills the greeting and the `mailto:` address.

**Version 2 needs a static file (`data/reps.js`).** Every row `verify: true`, no contact detail until copied from a page Elaine has opened. Shape: constituency or area, role, name, official source URL.

**Blockers and decisions for Elaine**
- **Host scope.** `oireachtas.ie` is approved for Bills and legislation status only (register Tier 4, path `/en/bills/`). TD names and contact details live under members pages, so they are outside it. Options: widen the scope to the members pages, or keep version 1 (no TD data, link-out only).
- **Councillors.** County council sites (for example `corkcoco.ie`) are not on the register. Each council needs its own approval, or the page links to the official finder only.
- **Which electoral area is Dunmanway in.** Not resolved. A search this session did not settle it, and a boundary review shows the constituency was contested. Do not hard-code it; it needs an official source (Electoral Commission constituency order or the county council's local electoral area list). The dropdown must never guess an area from a town name.
- **Wording.** Neutral across parties: the letter names no party, no policy and no clinical detail. The page warns that a representative's office keeps what you send, so leave out medical detail you do not want kept.

**Privacy and CSP.** Typed text stays in the page; nothing is sent; `mailto:` opens the person's own mail app. No new connect or script sources.

**Size.** Version 1: one template, one route, link-outs. Version 2 adds the reps file and dropdown, and a validator for it.

## 2. "Where do I start?" pathway page

**What it is.** One static route, `#/start`, with five to seven plain-language starting points ("I want to make a complaint", "I want my records", "I want to know what I pay", "I want to find a service near me", "I'm leaving hospital"). Each is a link to an existing tool or tab.

**Scope rules.** Navigation by task, never by symptom: no questions about health, no triage, no advice (standing rule). No stored answers, no step-by-step quiz that infers anything about the person.

**Build.** One render function, one data array of `{label, href}` pairs, a home-page pill, a search-index entry. Every `href` is internal, so no new host.

**Checks.** Each link resolves (a small test that every `href` is a known route). Copy reviewed for AI tells. Works with Calm mode on.

**Decision for Elaine.** The exact starting points and their order; whether it replaces the home pill row or sits beside it.

## 3. Share and print on the guided tools

**What exists.** Print/Save PDF (`printOnly`) on the SAR builder, and copy buttons on letters. The other guided tools have neither.

**Proposal.** Add Print and Copy to the tools that produce something the person may want to keep (complaints navigator result, records-request letter, schemes result, discharge passport). Add a Share button that uses `navigator.share` where the browser has it, and shares **only the site page link, never anything the person typed**. Where the API is absent, the button hides.

**Privacy and CSP.** Print and copy are local. The Web Share API hands a URL to the device's own share sheet; the page makes no request and loads nothing. No share-count, no tracking, no third-party buttons or embeds.

**Risk to settle.** Printing a page with typed health details: the existing print-target pattern prints only the chosen element, so each tool must mark its output element. The discharge passport output holds the most personal data; a printed copy needs a short "keep this somewhere private" line.

**Decision for Elaine.** Whether Share is wanted at all (print and copy alone carry no new browser API).

## 4. Install guidance

**What exists.** `manifest.json` and a service worker, so the site is installable. There is no install help in the app.

**Proposal.** One static help section (on the About or Help page) that says how to add the site to the home screen on iPhone, Android and desktop, in a few plain lines each, plus a note that it then works offline for what has been visited. No `beforeinstallprompt` handler, no install banner, no popup.

**Why static only.** Browsers change their menus, so the text names the menu path loosely ("Share, then Add to Home Screen") and is re-checked at each browser release; wording is `verify: true`-style flagged in `GAPS.md` with a re-check date. Nothing scripted means nothing to track.

**Privacy and CSP.** Pure text. No change.

**Decision for Elaine.** Which platforms to cover; whether to add screenshots (local images only, no external hosts).

## Order and size, if approved

Smallest and safest first: 4 (text), 2 (links), 3 (buttons on existing patterns), then 1 version 1. Version 2 of item 1 waits on the host decisions above. None needs a new host except item 1 version 2.
