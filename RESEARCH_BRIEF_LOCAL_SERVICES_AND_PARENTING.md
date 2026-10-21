# Research brief: local services, inclusive parenting, search gaps (7 Oct 2026)

**For:** a research session with live web search (Claude Code's build environment has no outbound access, so it cannot do this). **Output:** one markdown file of unverified candidate rows that Claude Code later merges by PR. You do not edit the repo.

## Context
Health Hub is a free, privacy-first PWA for navigating Irish and NI healthcare services and advocacy rights. It is administrative information only: never clinical advice, never legal claims. Rows go into `data.js` as directory entries.

## Hard rules (non-negotiable)
1. **Official sources only:** hse.ie and its subdomains, gov.ie (including aai.gov.ie), citizensinformation.ie, nidirect.gov.uk, health-ni.gov.uk, HSC trust sites (`*.hscni.net`), hiqa.ie, rqia.org.uk, mhcirl.ie, tusla.ie (approved 7 Oct 2026), and a hospital's own `.ie` site. Also approved, tagged `voluntary`, never used to support official-service claims: lauralynn.ie, jigsaw.ie, diabetes.ie, guideclinic.ie. **Withheld:** charity, press, trade, recruitment, academic-group and forum sites. Any other new host needs Elaine's approval: list it under "Hosts needing approval" and do not use it.
2. **No phone, email, fax, fee or waiting-time figure** unless you copied it from a page you opened. Every row is **web link only** by default. Budget-sensitive figures (rates, thresholds, payment amounts) stay out entirely.
3. **Never write "checked" or "opened".** You cannot clear `verify`. Every row is `verify: true`, `urlStatus: "search-result"`, with no `checked` field.
4. **No clinical or legal claims.** Paraphrase what the page says, in plain language, and say what it covers, not whether someone is entitled. Wording like "the HSE page says…" is fine.
5. **Do not invent.** If a service, catchment or team name is not on an official page you read, leave it out. A short list of real rows beats a long list of guesses. "Not found" is a valid result; say so.
6. **Cover counties evenly.** The project rule is "area = physical base; no single-county targeting." Do not weight toward Cork or any one county.
7. **Check for duplicates first.** If the HealthHub MCP is available, run `search_directory` for each candidate. Otherwise search the file `data.js`. Report any near-duplicate and propose an edit to the existing row, not a new one.
8. **Never quote an entry count** as a fact in the output. Counts in this brief are from 7 Oct 2026 and must be recounted.

## Part A: local-services pass (priority order)
Lowest coverage first. Entry counts on 7 Oct 2026 (approximate, recount): Wexford 5, Mayo 4, Louth 5, Meath 5, Wicklow 6, Tyrone 6, Kildare 9. Wexford and Mayo have not moved since the 5 Sep review. Tyrone has no service physically based in the county (nothing in Omagh, Dungannon, Cookstown or Strabane).

**Order:** 1. Wexford, Mayo. 2. Tyrone. 3. Wicklow, Louth, Meath, Kildare. 4. Only if time allows: Down and Londonderry.

For each county, look for what is **physically based there** (an HSE area, hospital, trust or council page naming the place). Cover, in this order:
- Acute hospital and its listed departments (maternity, paediatrics, injury unit or ED, outpatients).
- HSE Community Healthcare services listed locally: Public Health Nursing, Children's Disability Network Teams (CDNTs), CAMHS, adult mental health, primary care teams, dental, older persons, addiction.
- Out-of-hours GP and urgent care (ROI), and for NI the trust's urgent care, minor injury units and pharmacy services.
- Domestic and sexual violence services listed on HSE or Tusla pages.
- For NI counties: the HSC Trust (Western, Southern, South Eastern, Northern, Belfast) pages for the same service types.

Seeds to search, **not facts to copy** (confirm everything on an official page): Wexford General Hospital; Mayo University Hospital; Tyrone and Fermanagh Hospital / South West Acute Hospital / Omagh and Dungannon trust pages; Louth and Meath hospital pages (Our Lady of Lourdes, Our Lady's Navan, Louth County Hospital); Naas General Hospital; Wicklow community healthcare pages.

## Part B: inclusive parenting content
Currently the directory is mother-centred. Find official pages for:
1. **Fathers and non-birthing partners:** HSE pages on supporting a partner with perinatal mental health, antenatal and parenting support open to both parents, and Citizens Information / welfare.ie pages on paternity, parent's and partner's leave and benefit (link only; no rates).
2. **Adoptive and foster parents:** Adoption Authority of Ireland (aai.gov.ie), Tusla (tusla.ie) adoption and fostering pages, Citizens Information on adoptive leave and benefit; NI: nidirect and HSC trust adoption and fostering pages. Include post-placement support if an official page describes it.
3. **Same-sex couples and fertility:** HSE pages on the publicly funded assisted human reproduction (AHR) scheme and its stated eligibility, and gov.ie or Citizens Information pages on parentage, surrogacy and legal recognition. **State only what the page says** and flag "legal position" pages as link-only; never summarise rights.
4. **Trans and non-binary parents:** only if an official HSE, gov.ie or nidirect page addresses them directly. Otherwise report "not found".
Use specialty ids `parenting`, `fertility`, `mh`, `feeding` and `loss` as they fit. Do not create new specialty ids; propose one if needed.

## Part C: gaps found by the search audit
Find the official page (or report not found) for: **interpreter access** in HSE and HSC services; **second opinion** (patient rights, ROI and NI); the **long-term illness scheme** (ROI) wording; **HSE Live** as a findable service; and whether NI **111** exists and what it covers (do not assume).

## Output format
Create one file: `research/LOCAL-SERVICES-PARENTING-<date>.md` (or return it as one document). Sections:
1. **Summary table:** per county or topic: rows found, rows withheld, not found.
2. **Candidate rows,** each as a ready-to-paste `data.js` object:
```js
{
  id: "roi-wexford-<short-slug>",
  name: "Official service name as on the page",
  specialty: ["..."],
  county: ["wexford"],
  blurb: "One or two plain sentences paraphrasing the page.",
  details: [],            // only things the page states
  referral: "...",         // only if the page states how to get in
  contact: { web: "www...." },
  source_url: "https://...",
  urlStatus: "search-result",
  verify: true
}
```
   Use `county` ids from: carlow, cavan, clare, cork, donegal, dublin, galway, kerry, kildare, kilkenny, laois, leitrim, limerick, longford, louth, mayo, meath, monaghan, offaly, roscommon, sligo, tipperary, waterford, westmeath, wexford, wicklow, antrim, armagh, down, fermanagh, londonderry, tyrone, national. Use `national` only for services that are genuinely national.
3. **Source log:** for each row, the URL, the date you read it, and one line on what it says.
4. **Withheld rows,** each with the reason and "un-withhold when".
5. **Duplicates and proposed edits** to existing entries.
6. **Hosts needing approval,** **not found,** and **uncertainties** (conflicting sources, pages that looked stale).

## After you finish
Elaine opens each `source_url` in a browser; only then can `verify` be cleared and `checked` set. Claude Code then merges the rows by PR.
