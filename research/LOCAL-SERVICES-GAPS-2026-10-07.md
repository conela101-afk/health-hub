# Health Hub: Local Services Gaps, Pass 2 (7 Oct 2026)

Suggested file: `research/LOCAL-SERVICES-GAPS-2026-10-07.md`. These are unverified candidate rows for Elaine to review. No repo was edited.

Pass 2 adds about 75 candidate rows. Most are www2.hse.ie GP out-of-hours rows (Part 3), plus Mayo, Wexford, Tyrone and Louth community and urgent-care rows, and Down and Londonderry HSC trust rows. Several requested topics returned "not found" or were not reached before the search budget ran out (18 searches). Those are listed below, not filled in.

## TL;DR
- **Strongest results:** Westdoc Castlebar, Louth County Hospital Dundalk, Wexford CDNT and Omagh Health Visiting are full-page reads. HSE GP out-of-hours pages exist for every ROI provider. Most of the other rows rest on search snippets, so treat them as leads to open before merging.
- **Corrections to the existing out-of-hours list:**
  - HSE has no "Nedoc Dundalk" page. The only Dundalk urgent-care page is the Dundalk Injury Unit.
  - SouthDoc HSE pages cover Cork and Kerry bases only.
  - HSE lists a Sligo base under **Caredoc** ("Caredoc Sligo"), not NoWDOC. Check this against the existing list.
  - South Eastern Trust says the Ards Minor Injury Unit is "permanently closed".
- **Not found:**
  - no nidirect statement on NHS 111 in NI
  - no current www2.hse.ie Mayo mental health service page
  - no official page that directly addresses trans or non-binary parents
  - no patient-facing HSE interpreter page
  - no second-opinion pages (not searched)
  - adoptive leave and Adoptive Benefit pages not reached (search budget)

## 1. Summary table

Source key: **F** = full page read; **S** = search snippet only. "Not reached" means no search was run in this pass.

| County / topic | Rows proposed | Withheld | Not found / not reached |
|---|---|---|---|
| Wexford (Part 1) | 6 (CDNT Wexford F; CDNT Enniscorthy S; 3 primary care centres S; HSE DSGBV listing n/a) | 1 (The Avenue PCC, ownership unclear) | PHN, CAMHS, adult CMHT, dental, older persons, addiction: not reached |
| Mayo (Part 1) | 9 (Westdoc Castlebar F; Westdoc Ballina/Westport/Achill/Knock S; Castlebar, Ballina PCC, Ballina HC, Béal an Mhuirthead HC S; North Mayo CDNT 1 S) + 2 voluntary DSGBV (S) | 1 (South Mayo CDNT 2, address incomplete) | Mayo mental health www2 page: not found. CAMHS, PHN, dental, addiction: not reached |
| Tyrone (Part 1) | 3 (Omagh Health Visiting F; Omagh SRH S; CAMHS Omagh S) | 2 (Rosewood, Family Support Hub Omagh: non-statutory providers) | Cookstown, Dungannon, Strabane community services: not reached (Strabane SRH clinic named only as a sub-location) |
| Louth (Part 1) | 3 (Louth County Hospital Dundalk F; Dundalk Injury Unit S; Nedoc Drogheda S) | 0 | Nedoc Dundalk: **not found** on HSE |
| Wicklow, Meath, Kildare (Part 1) | 0 new | 0 | Not reached; Navan maternity: not found / not reached |
| Down (Part 2) | 3 (Downe Hospital MIU/UCC S; NDADOC Ards S; SET GP OOH Down & Lisburn S) | 1 (Daisy Hill Hospital: the Family Support NI listing 2132 gives "Newry, Co Down"; awaiting Elaine's confirmation) | Community services: not reached |
| Londonderry (Part 2) | 3 (Altnagelvin Area Hospital S; Altnagelvin ED S; Western Trust Phone First S) | 0 | Causeway/Northern Trust sites: not reached |
| NI multi-county (Part 2) | 1 (Southern Trust Phone First S) | 0 | — |
| GP OOH, all ROI (Part 3) | ~55 base rows (1 F, rest S) | 0 | Nedoc Dundalk; extra SouthDoc Kerry bases (Tralee, Listowel, etc.) not seen |
| Part 4 (parenting/adoption/parentage) | 5 (HSE partner PND advice F/S; AAI Information & Records S; AAI Tracing S; CI Surrogacy F; CI Fertility/DAHR S) | 0 | Adoptive leave/Benefit, HSC post-placement adoption, antenatal classes for both parents, trans/non-binary parents: not found / not reached |
| Part 5 (access/rights) | 1 (CI Long-Term Illness Scheme S) | 0 | Interpreter patient page, second opinion, NHS 111 in NI, Mayo MH page: not found |

## 2. Candidate rows (data.js)

All rows have `verify: true` and `urlStatus: "search-result"`. Contact is a web link only. None includes a phone, email, fee, hours or waiting time.

**Proposed new specialty id:** `urgent` (for EDs, injury units, MIUs, UCCs, GP out-of-hours and Phone First). Every urgent-care row below uses `specialty: []` until Elaine approves it. *(Note added 7 Oct: the `urgent` id has since been approved and recorded in the repo.)*

### Part 1: Wexford

```js
{ id: "roi-wexford-cdnt-wexford", name: "Wexford Children's Disability Network Team", specialty: [], county: ["wexford"],
  blurb: "The HSE page describes a children's disability network team for children and young people aged 0 to 18 with complex needs associated with their disability who live in Wexford Town and surrounding areas.",
  details: ["Based at Larkin House, Larkins Cross, Ballyhine, Barnstown, Wexford", "Teams include occupational therapists, psychologists, physiotherapists, social workers and speech and language therapists (per HSE page)", "Family and team agree an Individual Family Support Plan (per HSE page)"],
  referral: "The HSE page says parents, GPs, public health nurses and hospitals can refer.",
  contact: { web: "www2.hse.ie/services/childrens-disabilities/wexford-childrens-disability-network-team/" },
  source_url: "https://www2.hse.ie/services/childrens-disabilities/wexford-childrens-disability-network-team/", urlStatus: "search-result", verify: true }, // FULL PAGE

{ id: "roi-wexford-cdnt-enniscorthy", name: "Enniscorthy Children's Disability Network Team", specialty: [], county: ["wexford"],
  blurb: "HSE listing for the Enniscorthy children's disability network team.",
  details: ["Based at St John's Community Hospital Grounds, Munster Hill, Enniscorthy"],
  contact: { web: "www2.hse.ie/services/childrens-disabilities/enniscorthy-childrens-disability-network-team/" },
  source_url: "https://www2.hse.ie/services/childrens-disabilities/enniscorthy-childrens-disability-network-team/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-wexford-pcc-wexford-town", name: "Wexford Primary Care Centre", specialty: [], county: ["wexford"],
  blurb: "HSE listing for Wexford Primary Care Centre on Grogan's Road, Wexford Town. The HSE says Caredoc Wexford also operates from this centre.",
  details: ["Grogan's Road, Townparks, Wexford Town"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/wexford-primary-care-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/wexford-primary-care-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-wexford-pcc-enniscorthy", name: "Enniscorthy Primary Care Centre", specialty: [], county: ["wexford"],
  blurb: "HSE listing for Enniscorthy Primary Care Centre on Quarry Road. The HSE says Caredoc Enniscorthy also operates from this centre.",
  details: ["Quarry Road, Enniscorthy"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/enniscorthy-primary-care-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/enniscorthy-primary-care-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-wexford-pcc-conal-house-gorey", name: "Conal House Primary Care Centre, Gorey", specialty: [], county: ["wexford"],
  blurb: "HSE listing for Conal House Primary Care Centre on St Michael's Road, Gorey.",
  details: ["St Michael's Road, Gorey"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/conal-house-primary-care-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/conal-house-primary-care-centre/", urlStatus: "search-result", verify: true }, // SNIPPET
```

### Part 1: Mayo

```js
{ id: "roi-mayo-westdoc-castlebar", name: "Westdoc Castlebar (GP out of hours)", specialty: [], county: ["mayo"],
  blurb: "The HSE page lists Westdoc Castlebar as a GP out-of-hours service for all ages, for when your GP surgery is closed and you urgently need a GP. It says the service is by appointment only and is not a walk-in service.",
  details: ["Based in Castlebar Primary Care Centre, Moneenbradagh, Moneen Road, Castlebar", "HSE page says it is not for routine GP care such as repeat prescriptions, test results, medical certificates or employment medicals"],
  contact: { web: "www2.hse.ie/services/find-urgent-emergency-care/westdoc-castlebar/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/westdoc-castlebar/", urlStatus: "search-result", verify: true }, // FULL PAGE

{ id: "roi-mayo-pcc-castlebar", name: "Castlebar Primary Care Centre", specialty: [], county: ["mayo"],
  blurb: "HSE listing for Castlebar Primary Care Centre, Moneen Road, Castlebar.",
  details: ["Moneenbradagh, Moneen Road, Castlebar"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/castlebar-primary-care-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/castlebar-primary-care-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-mayo-pcc-ballina", name: "Ballina Primary Care Centre", specialty: [], county: ["mayo"],
  blurb: "HSE listing for Ballina Primary Care Centre on Kevin Barry Street, Ballina.",
  details: ["Kevin Barry Street, Ballina"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/ballina-primary-care-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/ballina-primary-care-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-mayo-hc-ballina", name: "Ballina Health Centre", specialty: [], county: ["mayo"],
  blurb: "HSE listing for Ballina Health Centre on Mercy Road, Ballina.",
  details: ["Mercy Road, Ballina"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/ballina-health-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/ballina-health-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-mayo-hc-beal-an-mhuirthead", name: "Béal an Mhuirthead Health Centre (Belmullet)", specialty: [], county: ["mayo"],
  blurb: "HSE listing for the health centre at Ospidéal Pobail Bhéal an Mhuirthead, Belmullet.",
  details: ["Ospidéal Pobail Bhéal an Mhuirthead, Belmullet"],
  contact: { web: "www2.hse.ie/services/primary-care-centres/beal-an-mhuirthead-health-centre/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/beal-an-mhuirthead-health-centre/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-mayo-cdnt-north-mayo-1", name: "North Mayo Children's Disability Network Team 1", specialty: [], county: ["mayo"],
  blurb: "The HSE children's disability service finder lists this team for children aged 0 to 18 with complex needs living in Belmullet, Erris, Killala, Crossmolina, Ballina, Charlestown and Swinford.",
  details: ["HSE North Mayo Children's Centre, The Newman Institute, First Floor, Cathedral Road, Ballina"],
  contact: { web: "www2.hse.ie/services/disability-support-and-services/childrens-disability-services/find-a-childrens-disability-service.html" },
  source_url: "https://www2.hse.ie/services/disability-support-and-services/childrens-disability-services/find-a-childrens-disability-service.html", urlStatus: "search-result", verify: true }, // SNIPPET; .html finder URL may be legacy, check for a /services/childrens-disabilities/ equivalent

// Voluntary organisations listed on the HSE DSGBV page. Tag voluntary. The HSE page is the source; it is a national listing, not an HSE service.
{ id: "roi-mayo-rape-crisis-centre", name: "Mayo Rape Crisis Centre", specialty: [], county: ["mayo"], tags: ["voluntary"],
  blurb: "Listed on the HSE domestic, sexual and gender-based violence support services page, at Newtown, Castlebar.",
  details: ["Newtown, Castlebar (per HSE listing)"],
  contact: { web: "www2.hse.ie/services/domestic-sexual-gender-based-violence/" },
  source_url: "https://www2.hse.ie/services/domestic-sexual-gender-based-violence/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-mayo-safe-ireland-mayo", name: "Safe Ireland Mayo", specialty: [], county: ["mayo"], tags: ["voluntary"],
  blurb: "The HSE DSGBV support services page says Safe Ireland Mayo provides crisis accommodation, outreach and support services to women and children affected by domestic abuse and coercive control in County Mayo.",
  details: [],
  contact: { web: "www2.hse.ie/services/domestic-sexual-gender-based-violence/" },
  source_url: "https://www2.hse.ie/services/domestic-sexual-gender-based-violence/", urlStatus: "search-result", verify: true }, // SNIPPET
```

The Westdoc Ballina, Westport, Achill and Knock rows are in the Part 3 table.

### Part 1: Tyrone

```js
{ id: "ni-tyrone-health-visiting-omagh", name: "Health Visiting (Omagh) – Western Trust", specialty: ["parenting"], county: ["tyrone"],
  blurb: "The Family Support NI listing describes the Western Trust health visiting team at the Children's Centre, Omagh Hospital and Primary Care Complex, offering a family-centred service from pregnancy until a child goes to school.",
  details: ["Omagh Hospital and Primary Care Complex, Children's Centre, Donaghanie Road, Omagh", "Listing says every GP practice has a named Health Visitor, whose contact details are written in the Parent Child Held Record (red book)", "Listed topics include play and development, nutrition, breastfeeding, weaning, sleep, immunisations and safety"],
  referral: "The listing says that if your Health Visitor's details are not available, contact your GP.",
  contact: { web: "familysupportni.gov.uk/Service/1311/health-visiting/health-visiting-omagh--western-trust" },
  source_url: "https://www.familysupportni.gov.uk/Service/1311/health-visiting/health-visiting-omagh--western-trust", urlStatus: "search-result", verify: true }, // FULL PAGE

{ id: "ni-tyrone-srh-omagh", name: "Sexual and Reproductive Health Services – Omagh (Western Trust)", specialty: [], county: ["tyrone"],
  blurb: "The Family Support NI listing describes a confidential Western Trust sexual and reproductive health service at Omagh Hospital and Primary Care Complex, covering contraception advice, emergency contraception, screening, smear and pregnancy testing.",
  details: ["Omagh Hospital and Primary Care Complex, 7 Donaghanie Road, Omagh", "A second listing (6259) says clinics at Omagh and at Strabane Health Centre are by appointment only"],
  referral: "Listing gives method of access as GP or self.",
  contact: { web: "familysupportni.gov.uk/Service/4860/health-and-wellbeing/sexual-and-reproductive-health-services--omagh-western-trust" },
  source_url: "https://www.familysupportni.gov.uk/Service/4860/health-and-wellbeing/sexual-and-reproductive-health-services--omagh-western-trust", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "ni-tyrone-camhs-omagh", name: "Child and Adolescent Mental Health Service (CAMHS) – Omagh (Western Trust)", specialty: ["mh"], county: ["tyrone"],
  blurb: "The Family Support NI listing describes Western Trust CAMHS for children and young people up to age 18, with Southern Sector clinics at Rivendell, Tyrone and Fermanagh Hospital, Omagh.",
  details: ["Rivendell, Tyrone and Fermanagh Hospital, 1 Donaghanie Road, Omagh", "Listing says Southern Sector CAMHS also holds clinics at Erne Health Centre, Enniskillen"],
  referral: "Listing states: access to this service is via GP referral only.",
  contact: { web: "familysupportni.gov.uk/Service/3203" },
  source_url: "https://www.familysupportni.gov.uk/Service/3203", urlStatus: "search-result", verify: true }, // SNIPPET
```

### Part 1: Louth

```js
{ id: "roi-louth-louth-county-hospital", name: "Louth County Hospital Dundalk", specialty: [], county: ["louth"],
  blurb: "HSE hospital listing for Louth County Hospital on Dublin Road, Dundalk.",
  details: ["Dublin Road, Dundalk"],
  contact: { web: "www2.hse.ie/services/hospitals/louth-county-hospital-dundalk/" },
  source_url: "https://www2.hse.ie/services/hospitals/louth-county-hospital-dundalk/", urlStatus: "search-result", verify: true }, // FULL PAGE (page lists address, phone, feedback links only; no service list)

{ id: "roi-louth-dundalk-injury-unit", name: "Dundalk Injury Unit", specialty: [], county: ["louth"],
  blurb: "The HSE page lists an injury unit at Louth County Hospital Dundalk for injuries unlikely to need a hospital stay. It says no appointment is needed.",
  details: ["Louth County Hospital Dundalk, Dublin Road, Dundalk", "The HSE page says it is for anyone aged 5 and older and lists injuries that should go to an ED instead"],
  contact: { web: "www2.hse.ie/services/find-urgent-emergency-care/dundalk-injury-unit/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/dundalk-injury-unit/", urlStatus: "search-result", verify: true }, // SNIPPET
```

### Part 2: Down and Londonderry

```js
{ id: "ni-down-downe-hospital-miu", name: "Downe Hospital Minor Injury Unit and Urgent Care Centre (Downpatrick)", specialty: [], county: ["down"],
  blurb: "The South Eastern Trust Downe Hospital page describes a Phone First, appointment-only weekend Minor Injury Unit and an Urgent Care Centre. Callers are assessed by phone and given an appointment or directed elsewhere.",
  details: ["The trust page says all patients must phone first before attending", "Page lists injuries the MIU can treat (limb injuries, bites, burns, minor head injuries)", "Page also lists sexual health, bowel screening, outpatients, two GP practices, and community and dental services on site"],
  contact: { web: "setrust.hscni.net/our-hospitals/downehospital/" },
  source_url: "https://setrust.hscni.net/our-hospitals/downehospital/", urlStatus: "search-result", verify: true }, // SNIPPET (full fetch returned navigation only)

{ id: "ni-down-ndadoc-ards", name: "North Down and Ards GP Out of Hours (NDADOC), Ards Community Hospital", specialty: [], county: ["down"],
  blurb: "The South Eastern Trust page says the NDADOC GP out-of-hours service is located at the front of the Ards Community Hospital site, Newtownards.",
  details: ["Church St, Newtownards", "Same page says the Ards Minor Injury Unit is permanently closed"],
  contact: { web: "setrust.hscni.net/our-hospitals/ards-community-hospital/" },
  source_url: "https://setrust.hscni.net/our-hospitals/ards-community-hospital/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "ni-londonderry-altnagelvin-hospital", name: "Altnagelvin Area Hospital", specialty: [], county: ["londonderry"],
  blurb: "The Western Trust page describes Altnagelvin Area Hospital, Glenshane Road, Londonderry, as an acute hospital with a 24-hour emergency department. It notes a redevelopment programme may change where services are located.",
  details: ["Glenshane Road, Londonderry", "Trust page says that from 9.30pm, access is via the A&E entrance only"],
  contact: { web: "westerntrust.hscni.net/hospitals/altnagelvin-area-hospital/" },
  source_url: "https://westerntrust.hscni.net/hospitals/altnagelvin-area-hospital/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "ni-londonderry-altnagelvin-ed", name: "Altnagelvin Hospital Emergency Department", specialty: [], county: ["londonderry"],
  blurb: "The Western Trust page describes the emergency department at Altnagelvin Hospital and asks people with urgent but not life-threatening problems to call Phone First before attending.",
  details: ["ED located to the rear of the main building (per trust page)"],
  contact: { web: "westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/altnagelvin-hospital-emergency-department/" },
  source_url: "https://westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/altnagelvin-hospital-emergency-department/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "ni-western-trust-phone-first", name: "Phone First – Western Trust", specialty: [], county: ["londonderry", "tyrone", "fermanagh"],
  blurb: "The Western Trust page says Phone First callers may get self-care advice, a scheduled appointment at the Omagh Urgent Care and Treatment Centre or the Altnagelvin or South West Acute Hospital EDs, or a recommendation to see their own GP.",
  details: [],
  contact: { web: "westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/phone-first/" },
  source_url: "https://westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/phone-first/", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "ni-southern-trust-phone-first", name: "Phone First – Southern Trust", specialty: [], county: ["armagh", "tyrone"],
  blurb: "The Southern Trust ED page says Phone First is for patients, including children, who are considering travelling to the Craigavon Area or Daisy Hill Hospital EDs or the South Tyrone Hospital Minor Injuries Unit with an urgent but not immediately life-threatening problem.",
  details: [],
  contact: { web: "southerntrust.hscni.net/service/emergency-department/" },
  source_url: "https://southerntrust.hscni.net/service/emergency-department/", urlStatus: "search-result", verify: true }, // SNIPPET; add "down" if Daisy Hill is confirmed as a Down site
```

### Part 3: GP out-of-hours, all ROI (HSE-sourced)

**Template (fill from table):**
```js
{ id: "roi-<county>-<slug>", name: "<Provider Base> (GP out of hours)", specialty: [], county: ["<county>"],
  blurb: "HSE listing for a GP out-of-hours base for all ages, for when your GP surgery is closed and you urgently need a GP.",
  details: ["<address as stated on HSE page>"],
  contact: { web: "www2.hse.ie/services/find-urgent-emergency-care/<slug>/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/<slug>/", urlStatus: "search-result", verify: true }
```

All slugs below sit under `https://www2.hse.ie/services/find-urgent-emergency-care/`. **S** = snippet; **F** = full page.

| id | slug | Base (as HSE states) | county | Read |
|---|---|---|---|---|
| roi-cork-southdoc-bandon | southdoc-bandon | Bandon Primary Care Centre, Market Street, Bandon | cork | S |
| roi-cork-southdoc-youghal | southdoc-youghal | Youghal Health Centre, Millennium Court, Youghal | cork | S |
| roi-cork-southdoc-clonakilty | southdoc-clonakilty | Clonakilty Primary Care Centre, Clarke Street | cork | S |
| roi-cork-southdoc-skibbereen | southdoc-skibbereen | West Cork LHO Offices Primary Care Centre, Coolnagurrane, Skibbereen | cork | S |
| roi-cork-southdoc-midleton | southdoc-midleton | Eilmaur, Oatencake, Cork Road, Midleton | cork | S |
| roi-cork-southdoc-cork-city-southside | southdoc-cork-city-southside | Unit 17/18 South Ring Business Park, Kinsale Road, Cork | cork | S |
| roi-cork-southdoc-cork-city-blackpool | southdoc-cork-city-blackpool | Unit GE, North Valley Business Centre, Mallow Road, Cork | cork | S |
| roi-kerry-southdoc-castleisland | southdoc-castleisland | Castleisland Day Care Centre, Chapel Lane | kerry | S |
| roi-kerry-southdoc-dingle | southdoc-dingle | Dingle Community Hospital, Farran, Dingle | kerry | S |
| roi-kerry-southdoc-killarney | southdoc-killarney | Park Shopping Centre, Upper Park Road, Killarney | kerry | S |
| roi-kerry-southdoc-killorglin | southdoc-killorglin | Killorglin Health Centre, Mill Road | kerry | S |
| roi-clare-shannondoc-ennis | shannondoc-ennis | Ennis Primary Care Centre, Station Road | clare | S |
| roi-clare-shannondoc-ennistymon | shannondoc-ennistymon | Ennistymon Community Hospital, Dough | clare | S |
| roi-clare-shannondoc-kilrush | shannondoc-kilrush | Kilrush Health Centre, Fahy's Road | clare | S |
| roi-clare-shannondoc-miltown-malbay | shannondoc-miltown-malbay | Medical Centre, Spanish Point Road | clare | S |
| roi-clare-shannondoc-shannon | shannondoc-shannon | Shannon Health Centre, Shannon Town Centre | clare | S |
| roi-limerick-shannondoc-dooradoyle | shannondoc-dooradoyle | Dooradoyle Health Centre, St Nessan's Road | limerick | S |
| roi-limerick-shannondoc-newcastle-west | shannondoc-newcastle-west | Newcastlewest Health Centre, Gortboy | limerick | S |
| roi-limerick-shannondoc-hospital | shannondoc-hospital | Hospital Health Centre, Knockainey Road, Hospital | limerick | S |
| roi-tipperary-shannondoc-nenagh | shannondoc-nenagh | Wilton Medical Centre, Gortlandroe, Nenagh | tipperary | S |
| roi-tipperary-shannondoc-roscrea | shannondoc-roscrea | Roscrea Primary Care Centre, Grange | tipperary | S |
| roi-tipperary-shannondoc-thurles | shannondoc-thurles | Thurles Primary Care Centre, 22A Mitchel Street | tipperary | S |
| roi-donegal-nowdoc-letterkenny | nowdoc-letterkenny | Errigal CDM Hub, Kilmacrennan Road, Letterkenny | donegal | S |
| roi-donegal-nowdoc-carndonagh | nowdoc-carndonagh | Carndonagh Community Hospital, Derry Road | donegal | S |
| roi-donegal-nowdoc-derrybeg | nowdoc-derrybeg | Magheragallan, Derrybeg | donegal | S |
| roi-donegal-nowdoc-mountcharles | nowdoc-mountcharles | Upper Main Street, Mountcharles | donegal | S |
| roi-leitrim-nowdoc-carrick-on-shannon | nowdoc-carrick-on-shannon | Carrick-on-Shannon Primary and Mental Health Care Centre, Townparks | leitrim | S |
| roi-sligo-caredoc-sligo | caredoc-sligo | Markievicz Primary Care Centre, Barrack Street, Sligo | sligo | S |
| roi-mayo-westdoc-castlebar | westdoc-castlebar | Castlebar Primary Care Centre, Moneen Road | mayo | **F** (row given above) |
| roi-mayo-westdoc-ballina | westdoc-ballina | St Joseph's District Hospital, Mercy Road, Ballina | mayo | S |
| roi-mayo-westdoc-westport | westdoc-westport | (address not in snippet) | mayo | S |
| roi-mayo-westdoc-achill | westdoc-achill | (address not in snippet) | mayo | S |
| roi-mayo-westdoc-knock | westdoc-knock | (address not in snippet) | mayo | S |
| roi-galway-westdoc-galway | westdoc-galway | Unit 18a, Liosban Business Park, Tuam Road | galway | S |
| roi-galway-westdoc-tuam | westdoc-tuam | Tuam Primary Care Centre, Sean Purcell Road | galway | S |
| roi-galway-westdoc-glenamaddy | westdoc-glenamaddy | Glenamaddy Health Centre, Kilkerrin Road | galway | S |
| roi-galway-westdoc-north-connemara | westdoc-north-connemara | Clifden Health Centre, Galway Road | galway | S |
| roi-galway-westdoc-south-connemara | westdoc-south-connemara | Kilkerrin Health Centre, Kilkerrin, Connemara | galway | S |
| roi-galway-westdoc-craughwell | westdoc-craughwell | Craughwell Health Centre, Killora | galway | S |
| roi-galway-westdoc-east-galway | westdoc-east-galway | Eyrecourt Health Centre, Market Street (HSE text contains typos) | galway | S |
| roi-roscommon-westdoc-roscommon | westdoc-roscommon | Roscommon Primary Care Centre, Golf Links Road | roscommon | S |
| roi-cavan-nedoc-cavan | nedoc-cavan | Cavan Monaghan General Hospital, Lisdarn | cavan | S |
| roi-monaghan-nedoc-castleblayney | nedoc-castleblaney | Bree Road, Castleblayney | monaghan | S |
| roi-louth-nedoc-drogheda | nedoc-drogheda | Cottage Hospital, Scarlet Street, Drogheda | louth | S |
| roi-laois-midoc-portlaoise | midoc-portlaoise | St Fintan's, Dublin Road, Portlaoise | laois | S |
| roi-offaly-midoc-tullamore | midoc-tullamore | Midland Regional Hospital Tullamore, Arden Road | offaly | S |
| roi-offaly-midoc-edenderry | midoc-edenderry | Ofalia House, St Mary's Street, Edenderry | offaly | S |
| roi-longford-midoc-longford | midoc-longford | St Joseph's Hospital, Dublin Road, Longford | longford | S |
| roi-westmeath-midoc-mullingar | midoc-mullingar | Regional Hospital Mullingar, Longford Road | westmeath | S |
| roi-westmeath-midoc-athlone | midoc-athlone | Clonbrusk Primary Care Centre, Athlone | westmeath | S |
| roi-carlow-caredoc-carlow | caredoc-carlow | District Hospital, Carlow Health Services Complex, Athy Rd | carlow | S |
| roi-kilkenny-caredoc-kilkenny | caredoc-kilkenny | Ayrfield Medical Park, Granges Road | kilkenny | S |
| roi-waterford-caredoc-waterford | caredoc-waterford | HSE Community Care, Cork Road, Waterford | waterford | S |
| roi-waterford-caredoc-dungarvan | caredoc-dungarvan | Springmount, Dungarvan | waterford | S |
| roi-tipperary-caredoc-clonmel | caredoc-clonmel | The County Clinic, Western Road, Clonmel | tipperary | S |
| roi-tipperary-caredoc-cashel | caredoc-cashel | Our Lady's Hospital, Lower Green, Cashel | tipperary | S |
| roi-tipperary-caredoc-tipperary-town | caredoc-tipperary-town | St Vincent's Hospital, Collegeland | tipperary | S |
| roi-wexford-caredoc-wexford | caredoc-wexford | Wexford Primary Care Centre, Grogan's Road | wexford | S |
| roi-wexford-caredoc-enniscorthy | caredoc-enniscorthy | Enniscorthy Primary Care Centre, Quarry Road | wexford | S |
| roi-wexford-caredoc-gorey | caredoc-gorey | (address not retrieved) | wexford | S |
| roi-kildare-kdoc-celbridge | kdoc-celbridge | Shackleton Road, Celbridge | kildare | S |
| roi-dublin-dubdoc | dubdoc | The Meath Primary Care, Heytesbury Street | dublin | S |
| roi-dublin-eastdoc | eastdoc | St Vincent's University Hospital, Elm Park | dublin | S |
| roi-dublin-dl-doc | dl-doc | St Michael's Hospital, George's Street Lower, Dún Laoghaire | dublin | S |
| roi-dublin-lukedoc | lukedoc | Clonskeagh Hospital Campus, Vergemount | dublin | S |
| roi-dublin-tlc-doc-tallaght | tlc-doc-tallaght | Carbury House, Tallaght | dublin | S |
| roi-dublin-ddoc-ballymun | ddoc-ballymun | Ballymun Primary Care Centre, Main Street | dublin | S |
| roi-dublin-ddoc-coolock | ddoc-coolock | Coolock Primary Care Centre, Cromcastle Road | dublin | S |
| roi-dublin-ddoc-hartstown | ddoc-hartstown | Hartstown Health Centre, Cherryfield Lawn, Clonsilla | dublin | S |
| roi-dublin-ddoc-north-strand | ddoc-north-strand | North Strand Health Centre, 16 North Strand Road | dublin | S |
| roi-dublin-ddoc-swords | ddoc-swords | Swords Health Centre, Bridge Street | dublin | S |

Nedoc Navan and KDoc Naas were already covered in pass 1. Caredoc Arklow, New Ross and Wicklow pages exist on the HSE site, but their addresses were not retrieved. Edoc Loughlinstown is in the HSE sitemap, but its address was not retrieved.

### Part 4: Parenting, adoption, parentage

```js
{ id: "roi-national-hse-pnd-partners", name: "HSE: Postnatal depression – advice for partners and families", specialty: ["mh", "parenting"], county: ["national"],
  blurb: "The HSE page gives partners and family members practical ways to support someone with postnatal depression and to look after themselves.",
  details: ["The HSE page suggests contacting your local public health nurse or GP if you need support or information to help someone with postnatal depression"],
  contact: { web: "www2.hse.ie/conditions/postnatal-depression/advice-partners-families/" },
  source_url: "https://www2.hse.ie/conditions/postnatal-depression/advice-partners-families/", urlStatus: "search-result", verify: true }, // Page opened, but the fetch was truncated before the body; body text is from the search snippet

{ id: "roi-national-aai-information-records", name: "Adoption Authority of Ireland: Information & Records", specialty: [], county: ["national"],
  blurb: "The AAI page describes its Information & Records Unit, which helps with post-adoption information. For birth information and tracing under the Birth Information and Tracing Act 2022, it points people to birthinfo.ie.",
  details: ["The page says all tracing applications must be directed to Tusla"],
  contact: { web: "aai.gov.ie/en/who-we-are/information-records.html" },
  source_url: "https://aai.gov.ie/en/who-we-are/information-records.html", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-national-aai-tracing", name: "Adoption Authority of Ireland: Tracing", specialty: [], county: ["national"],
  blurb: "The AAI page says its social workers provide a statutory tracing service for adoptees, birth parents and birth relatives, and manage the Contact Preference Register.",
  details: [],
  contact: { web: "aai.gov.ie/en/tracing" },
  source_url: "https://aai.gov.ie/en/tracing", urlStatus: "search-result", verify: true }, // SNIPPET

{ id: "roi-national-ci-surrogacy", name: "Citizens Information: Surrogacy in Ireland", specialty: ["fertility"], county: ["national"],
  blurb: "Citizens Information page on the law on surrogacy in Ireland and abroad. Link only: read the page for current details.",
  details: [],
  contact: { web: "citizensinformation.ie/en/birth-family-relationships/adoption-and-fostering/surrogacy/" },
  source_url: "https://www.citizensinformation.ie/en/birth-family-relationships/adoption-and-fostering/surrogacy/", urlStatus: "search-result", verify: true }, // FULL PAGE (intro read); do not summarise rights

{ id: "roi-national-ci-fertility-dahr", name: "Citizens Information: Fertility treatments and assisted human reproduction", specialty: ["fertility"], county: ["national"],
  blurb: "Citizens Information page on fertility treatment, donor-assisted human reproduction and how they are regulated in Ireland. Link only.",
  details: [],
  contact: { web: "citizensinformation.ie/en/birth-family-relationships/before-your-baby-is-born/fertility-treatments-and-dahr/" },
  source_url: "https://www.citizensinformation.ie/en/birth-family-relationships/before-your-baby-is-born/fertility-treatments-and-dahr/", urlStatus: "search-result", verify: true }, // SNIPPET
```

### Part 5: Access and rights

```js
{ id: "roi-national-ci-long-term-illness", name: "Citizens Information: Long-Term Illness Scheme", specialty: [], county: ["national"],
  blurb: "Citizens Information says that if you have a medical condition covered by the Long-Term Illness Scheme, you can get some drugs, medicines and medical and surgical appliances for that condition for free. It says the scheme is administered by the HSE.",
  details: ["Page says the scheme does not depend on income and there is no means test", "Page notes the HSE has temporarily paused printing certain plastic health cards, including the Long-Term Illness card"],
  contact: { web: "citizensinformation.ie/en/health/drugs-and-medicines/long-term-illness-scheme/" },
  source_url: "https://www.citizensinformation.ie/en/health/drugs-and-medicines/long-term-illness-scheme/", urlStatus: "search-result", verify: true }, // SNIPPET; secondary to the existing www2.hse.ie LTI row
```

## 3. Source log (all read 7 Oct 2026)

| URL | F/S | What it says |
|---|---|---|
| www2.hse.ie/services/find-urgent-emergency-care/westdoc-castlebar/ | F | Westdoc Castlebar at Castlebar PCC; by appointment, no walk-in; all ages |
| www2.hse.ie/services/hospitals/louth-county-hospital-dundalk/ | F | Address, phone, feedback/FOI links; no service list |
| www2.hse.ie/services/childrens-disabilities/wexford-childrens-disability-network-team/ | F | Wexford CDNT, Barnstown; catchment Wexford Town and surrounding areas; referrers |
| familysupportni.gov.uk/Service/1311/... | F | Omagh Health Visiting at the Children's Centre, OHPCC; contacts via GP and red book |
| citizensinformation.ie/.../surrogacy/ | F (intro) | Defines surrogacy; sections on legal status, guardianship, abroad, legal developments |
| www2.hse.ie/conditions/postnatal-depression/advice-partners-families/ | F (truncated) + S | Partner and family support tips; contact PHN or GP |
| www2.hse.ie/services/find-urgent-emergency-care/dundalk-injury-unit/ | S | Injury unit at Louth County Hospital; age 5+; no appointment needed |
| www2.hse.ie/services/find-urgent-emergency-care/southdoc-* (11 pages) | S | SouthDoc bases in Cork and Kerry |
| HSE find-urgent-emergency-care pages for the other providers (via subagent) | S | Bases listed in the Part 3 table; subagent also read the landing page (page 1 only) and the HSE sitemap |
| www2.hse.ie/services/primary-care-centres/* (Wexford, Enniscorthy, Conal House, The Avenue, Castlebar, Ballina, Ballina HC, Béal an Mhuirthead, Ballindine) | S | Addresses only |
| www2.hse.ie/services/childrens-disabilities/enniscorthy-childrens-disability-network-team/ | S | Address only |
| www2.hse.ie/.../find-a-childrens-disability-service.html | S | North Mayo CDNT 1 catchment; South Mayo CDNT 2 address partly shown |
| www2.hse.ie/services/domestic-sexual-gender-based-violence/ | S | Lists Mayo Rape Crisis Centre, Safe Ireland Mayo, MOVE (online for Mayo) |
| www2.hse.ie/health-app/about-your-hse-health-app/ | S | Lists "Mental Health Mayo" as a community service sharing appointments in the app |
| www2.hse.ie/mental-health/services-support/community-mental-health-teams/ | S | Generic CMHT page: adults 18–65; GP or health professional referral |
| familysupportni.gov.uk/Service/4860, /6259, /3203 | S | Omagh SRH (two listings); CAMHS Omagh (GP referral only) |
| setrust.hscni.net/our-hospitals/downehospital/ | S (fetch returned navigation only) | Phone First weekend MIU, Urgent Care Centre, on-site services |
| setrust.hscni.net/our-hospitals/ards-community-hospital/ | S | Ards MIU permanently closed; NDADOC at the front of the site |
| westerntrust.hscni.net (ED, Altnagelvin hospital, Altnagelvin ED, Phone First) | S | Two EDs plus the Omagh UCTC; Phone First routing |
| southerntrust.hscni.net/service/emergency-department/ | S | EDs at Craigavon and Daisy Hill; Phone First covers those and South Tyrone MIU |
| nidirect.gov.uk/articles/urgent-and-emergency-care-services | S (fetch returned language menu only) | Phone First available in the Northern, South Eastern, Southern and Western Trusts |
| nidirect.gov.uk/articles/how-use-your-health-services; nidirect.gov.uk/node/1905 | S | GP OOH from 6pm weekdays and 24 hours at weekends and public holidays; phone first |
| aai.gov.ie (information-records, tracing, apply-for-a-domestic-tracing-service, faqs) | S | Post-adoption records; tracing via Tusla/AAI; birthinfo.ie |
| citizensinformation.ie/.../long-term-illness-scheme/ | S | LTI wording quoted in the row |
| citizensinformation.ie/.../fertility-treatments-and-dahr/ | S | DAHR and parentage overview (not summarised) |

The researcher's numbered URL list (about 100 HSE, HSC trust, familysupportni, AAI and Citizens Information pages) is not reproduced here; every URL it held is either a row's `source_url` or a slug in the Part 3 table.

---

## 4. Withheld rows

| Candidate | Reason | Un-withhold when |
|---|---|---|
| Daisy Hill Hospital ED, Newry (Southern Trust) | The Southern Trust's own page gives "5 Hospital Road Newry BT35 8DR" with no county. The Family Support NI listing 2132 (approved host; Paediatrics (Acute), Southern Trust) gives "Daisy Hill Hospital, 5 Hospital Road, Newry, Co Down, BT35 8DR". That outweighs Wikipedia's (unapproved) County Armagh claim. Newry straddles Armagh and Down. | Elaine confirms Co Down from the Family Support NI listing; then also add "down" to the Southern Trust Phone First row |
| South Mayo CDNT 2 | Snippet gives only part of the address ("Safari Club, N5 Business Park, Moneen … F23 WP71"); no catchment seen | The full HSE finder entry is read |
| The Avenue Primary Care Centre, Gorey | HSE listing shows a pharmacy and long hours; it may be a private centre | Page read and HSE ownership or role is clear |
| Rosewood Health and Wellbeing, Omagh; Family Support Hub Omagh (Action for Children) | Listed on familysupportni, but run by non-statutory providers | Elaine decides whether familysupportni-listed voluntary providers can be tagged `voluntary` |
| Belfast Trust GP OOH (Knockbreda site) | Knockbreda may be in Co Down, but the page does not say so; outside the Part 2 scope as asked | County confirmed |
| HSE "Online antenatal classes" (Wexford GH department list) | Snippet does not say the classes are open to both parents | Page read and it says so |

---

## 5. Duplicates and proposed edits

- **Westdoc Castlebar, Nedoc Navan, KDoc Naas, Caredoc Wexford/Enniscorthy:** these likely duplicate the existing out-of-hours provider list. Merge them as source-URL updates, not new rows, unless the directory keeps provider rows separate from base rows.
- **Louth / Dundalk:** if the existing out-of-hours list names Nedoc with a **Dundalk** base, the HSE does not support it: the HSE sitemap has Nedoc pages for Castleblayney, Cavan, Drogheda and Navan only. Proposed edit: base town Drogheda for Louth, pending Elaine's check.
- **Sligo:** HSE lists "Caredoc Sligo" (Markievicz PCC). If the directory lists NoWDOC for Sligo, flag it as conflicting and confirm before editing. NoWDOC HSE pages cover Donegal and Leitrim (Carrick-on-Shannon) only.
- **SouthDoc (flagged as asked):** HSE pages show bases in Cork (Bandon, Youghal, Clonakilty, Skibbereen, Midleton, Cork City Southside, Blackpool) and Kerry (Castleisland, Dingle, Killarney, Killorglin). No Tralee, Listowel, Kenmare or Cahersiveen pages turned up in this pass; that does not prove they don't exist. Do not give SouthDoc any county outside Cork and Kerry.
- **Shannondoc** also has Tipperary bases (Nenagh, Roscrea, Thurles). If the directory lists Shannondoc for Clare and Limerick only, add `tipperary`.
- **Ards Minor Injury Unit:** if present in the directory, mark it closed or remove it. The SE Trust page says "permanently closed".
- **Downe Hospital:** older SE Trust pages (2020) describe an ED. The current page describes a weekend Phone First MIU and an Urgent Care Centre. Any existing "Downe ED" row should be revised.
- **Phone First rows:** these may overlap with the pass-1 "nidirect urgent care" row. Keep both only if trust-level rows are wanted.
- **Long-Term Illness:** the CI row is secondary to the existing www2.hse.ie LTI row. Merge it as a second source if preferred.
- **Omagh SRH:** two familysupportni listings (4860, 6259) describe the same service. Use one row.

---

## 6. Hosts needing approval, not found, uncertainties

**Hosts needing approval (not used as sources):**
- setrust.hscni.net, westerntrust.hscni.net and southerntrust.hscni.net fall under `*.hscni.net` and are already approved.
- southeastcdnt.ie / dublinandsoutheastcdnt.ie (HSE-led CDNT region site)
- birthinfo.ie (state birth information and tracing site that AAI points to)
- assets.ireland.ie (government surrogacy guidance PDF)
- oireachtas.ie (parliamentary answers)
- nhs.uk / 111.nhs.uk

**Not found or not reached:**
- **NHS 111 in NI:** no nidirect page saying whether NHS 111 operates in NI was found or read. nidirect pages describe GP out-of-hours and Phone First instead. NHS.uk's "When to use NHS 111" page sends Northern Ireland users to "nidirect: advice about illnesses and conditions". 111.nhs.uk (unapproved) says "NHS 111 online is available in England only". A 2020 Department of Health NI post on X said NI's access to NHS 111 was "on coronavirus" only. Report as not found; do not assume.
- **Mayo mental health (www2):** no current Mayo-specific mental health service page was found. The only current-site mention is "Mental Health Mayo" in the HSE App's community-services list. The old hse.ie/eng page remains stale and withheld.
- **Patient-facing HSE interpreter page, second opinion (ROI and NI), and Citizens Information/welfare.ie adoptive leave and Adoptive Benefit:** not reached; the search budget ran out.
- **HSC trust post-placement adoption support, and antenatal classes explicitly open to both parents:** not reached or not found.
- **Official pages directly addressing trans or non-binary parents:** not found (no dedicated search was run, so this is not a confirmed absence).
- **Part 1 not reached:**
  - Wexford, Mayo and Tyrone: PHN, adult CMHT, dental, older persons and addiction pages
  - Cookstown, Dungannon and Strabane
  - all Wicklow, Meath and Kildare community services
  - Navan maternity

**Uncertainties and conflicts:**
- **Dundalk Injury Unit age:** the HSE page says 5 and older. A 2018 Oireachtas answer (unapproved host) said 14 and over. The HSE page is current and should govern.
- **HSE holiday dates:** inconsistent. The Westdoc Castlebar and Dundalk Injury Unit pages list "Easter Monday 5 April 2026". Citizens Information's public holidays page says "Easter Monday falls on 6 April 2026", so those two HSE pages are wrong (5 April 2026 was Easter Sunday). Some Shannondoc and Nowdoc pages still list 2024/2025 dates. This doesn't affect any row because hours are excluded, but flag it to the HSE if desired.
- **Snippet-only sources:** the www2 primary-care-centre listings and all Part 3 addresses except Castlebar come from snippets. Open them before merging.
- **Legacy CDNT finder URL:** the North Mayo CDNT finder uses an `.html` URL. Check whether a `/services/childrens-disabilities/` page now replaces it.
- **Possible tidy-up:** the data.js convention may want the Western Trust Phone First row split by county, or kept as a single multi-county row as proposed.
