# Claude Code: brief for community-services candidate rows, all ROI (14 Oct 2026)

Adds directory rows for children's disability teams, adult disability, dental, allied health and mental health from two research passes run on 14 Oct 2026 (six priority counties, then all 26). Research only: every row is unverified. Set `verify: true` and `urlStatus: "search-result"` on all of them, no `checked`, no `opened`. Do not clear `verify`; only Elaine does, after opening each page in a browser.

Work on a branch, open a PR, never push to `main`. Before and after: file sizes, `node --check data.js app.js sw.js`. After: `node scripts/validate-data.js` (plus the other `validate-*.js`), `node scripts/test-validate-data.js`, `node scripts/search-audit.js`, `node scripts/county-matrix.js`. Recount entries by script; quote no counts. No phone, email, fax, fee or waiting-time figure in any row, even where a source page shows one. No money figures.

## Decisions for Elaine (not made; do not assume)
1. **`cho7cdnt.ie` is already in the `validate-data.js` allow-list and `cho7-cdnts` already cites it (opened 9 Oct), but `AI_RULES.md` records no approval for it.** The research treated it as unapproved. Do not add an approval line yourself. Ask Elaine to confirm and give a date. Until she does, add no new row sourced from it.
2. **CHO number to HSE health region labels.** Not implemented. The mapping in the research is an inference and the HSE pages use mixed labels (CHO, health region, IHA). Add no region field and no region wording to blurbs. Where a source calls a team "CDNT 1" and so on, keep the number only with the place name, because the Dublin and South East site reuses numbers across areas (CDNT 1 is both Carlow and Sandymount; CDNT 3 is both Kilkenny and Leopardstown).
3. **Legacy-URL rows.** Default I have chosen: only one legacy `hse.ie/eng/...` row is added (Kerry CAMHS, page read directly). The other legacy leads go in `GAPS.md`, not `data.js`. Elaine can change this.

## Row template (match the existing style in `data.js`)
```js
{
  id: "roi-meath-cdnt-kells",
  name: "Kells Children's Disability Network Team",
  specialty: ["childdisability"],
  county: ["meath", "louth"],
  blurb: "The HSE page ... (one or two sentences, parent-neutral, no figures)",
  referral: "...",            // only where the research states a route
  contact: { web: "www2.hse.ie/services/childrens-disabilities/kells-childrens-disability-network-team/" },
  source_url: "https://www2.hse.ie/services/childrens-disabilities/kells-childrens-disability-network-team/",
  urlStatus: "search-result",
  verify: true
}
```
- No `area` (only Cork has areas). No `checked`.
- Blurb: "The HSE page says ..." style, stating only what the research lists (towns covered, who can refer). Follow the page's own phrasing; do not generalise. Where I give no catchment, say none.
- One URL family per row. Where both an HSE and a Dublin and South East (DSE) page exist for the same team, use the page the catchment was read from (noted below) and do not add a duplicate row.
- Before adding, check by script that no existing row has the same `source_url` or an obviously same team name. If one exists, skip it and list it in the CHANGELOG entry.
- Use the exact URLs below. Do not guess slugs.

## 1. Children's disability network teams (`specialty: ["childdisability"]`)
Complement, do not replace, `hse-cdnt-finder`, `hse-cdnt-referral`, `southeast-cdnts`, `cho7-cdnts` and the existing Cork, Wexford and Mayo rows.

HSE pages are `https://www2.hse.ie/services/childrens-disabilities/<slug>/`. DSE pages are `https://www.dublinandsoutheastcdnt.ie/teams/team-pages/<slug>/`.

| id | name | county[] | page (slug) | catchment as the page lists it |
|---|---|---|---|---|
| roi-meath-cdnt-kells | Kells Children's Disability Network Team | meath, louth | HSE `kells-childrens-disability-network-team` | North Meath, Oldcastle, and Ardee (Co. Louth) |
| roi-meath-cdnt-navan | Navan Children's Disability Network Team | meath | HSE `navan-childrens-disability-network-team` | Navan, Slane, Robinstown, Wilkinstown, Kentstown and nearby villages |
| roi-meath-cdnt-dunshaughlin | Dunshaughlin Children's Disability Network Team | meath | HSE `dunshaughlin-childrens-disability-network-team` | Ashbourne, Duleek, Dunshaughlin, Ratoath, Laytown, Stamullen, parts of Bettystown |
| roi-meath-cdnt-trim | Trim Children's Disability Network Team | meath | HSE `trim-childrens-disability-network-team` | Athboy, Dunboyne, Enfield, Summerhill, Trim. One source says it is based in Navan (Johnstown): state no base |
| roi-louth-cdnt-north-louth | North Louth Children's Disability Network Team | louth | HSE `north-louth-childrens-disability-network-team` | Dundalk, Carlingford, Castlebellingham |
| roi-louth-cdnt-south-louth | South Louth Children's Disability Network Team | louth, meath | HSE `south-louth-childrens-disability-network-team` | Drogheda, Clogherhead, Dunleer, parts of Mornington (Co. Meath). Page says parents, GPs, public health nurses or a hospital can refer |
| roi-mayo-cdnt-west-mayo-3 | West Mayo Children's Disability Network Team 3 | mayo | HSE `west-mayo-childrens-disability-network-team-3` | Achill, Ballinrobe, Westport |
| roi-mayo-cdnt-south-mayo | South Mayo Children's Disability Network Team | mayo | HSE `south-mayo-childrens-disability-network-team` | Castlebar, Claremorris, Kiltimagh, Ballyhaunis |
| (existing) roi-mayo-cdnt-north-mayo-1 | North Mayo Children's Disability Network Team | mayo | HSE `north-mayo-childrens-disability-network-team` | **Edit, do not add:** repoint its `source_url` and `contact.web` from the dead `find-a-childrens-disability-service.html` redirect to this page. Towns: Belmullet, Erris, Killala, Crossmolina, Ballina, Charlestown, Swinford. Page says parents, GPs, public health nurses and hospitals can refer. Keep `verify: true`. Check the "1" in the name against the page title (the title has no number) |
| roi-wexford-cdnt-gorey | Gorey Children's Disability Network Team | wexford | HSE `gorey-childrens-disability-network-team` | none read: no towns in the blurb |
| roi-wexford-cdnt-new-ross | New Ross Children's Disability Network Team | wexford | DSE `cdnt-8-new-ross-childrens-disability-network-team` | none stated |
| roi-kildare-cdnt-south-kildare-west-wicklow | South Kildare and West Wicklow Children's Disability Network Team | kildare, wicklow | HSE `south-kildare-and-west-wicklow-childrens-disability-network-team` | Kildare Town, Monasterevin, Newbridge, Rathangan. Sources disagree on where the team is based: state no base |
| roi-kildare-cdnt-north-kildare | North Kildare Children's Disability Network Team | kildare | HSE `north-kildare-childrens-disability-network-team` | Celbridge, Derrinturn, Leixlip, Maynooth, parts of Kilcock |
| roi-kildare-cdnt-mid-kildare | Mid Kildare Children's Disability Network Team | kildare, wicklow | HSE `mid-kildare-childrens-disability-network-team` | Allen, Allenwood, Ballymore Eustace, Blessington, Clane, Kill, Naas, Prosperous and others (the list was cut off: say "including") |
| roi-wicklow-cdnt-north-wicklow | North Wicklow Children's Disability Network Team (DSE CDNT 5) | wicklow | DSE `cdnt5-north-wicklow` | Bray, Greystones, Newtownmountkennedy |
| roi-wicklow-cdnt-mid-wicklow | Mid Wicklow Children's Disability Network Team (DSE CDNT 6) | wicklow | DSE `cdnt6-mid-wiclow` (the official slug is misspelt; copy it exactly) | Ashford, Aughrim, Rathdrum, Rathnew, Roundwood, Wicklow town |
| roi-wicklow-cdnt-south-wicklow | South Wicklow Children's Disability Network Team (DSE CDNT 7) | wicklow | DSE `cdnt7-south-wicklow` | Arklow, Carnew, South Wicklow, Tinahely |
| roi-carlow-cdnt-carlow | Carlow Children's Disability Network Team (DSE CDNT 1) | carlow | DSE `cdnt-1-the-childrens-services-centre` | County Carlow |
| roi-kilkenny-cdnt-thomastown | Thomastown Children's Disability Network Team (DSE CDNT 2) | kilkenny, carlow | DSE `cdnt-2-childrens-services-centre` | Callan, Bennettsbridge, Kells, Thomastown, Inistioge, Graiguenamanagh, Gowran, Borris (Co. Carlow) |
| roi-kilkenny-cdnt-kilkenny | Kilkenny Children's Disability Network Team (DSE CDNT 3) | kilkenny | DSE `cdnt3-enable-ireland` | Kilkenny City, Castlecomer, Freshford, Clogh, Ballyragget, Urlingford, Johnstown, Tullaroan |
| roi-tipperary-cdnt-cashel | Cashel Children's Disability Network Team (DSE CDNT 4) | tipperary | DSE `cdnt-4-cnoc-na-ri` | Cashel, Tipperary Town, Slieve Aradh |
| roi-tipperary-cdnt-clonmel | Clonmel Children's Disability Network Team (DSE CDNT 5) | tipperary, kilkenny | DSE `cdnt-5-south-tipperary-therapy-services` | Cahir, Clerihan, Clogheen, Ardfinnan, Clonmel, Piltown (Co. Kilkenny), Carrick on Suir |
| roi-waterford-cdnt-dungarvan | Dungarvan Children's Disability Network Team (DSE CDNT 6) | waterford | DSE `cdnt-6-hse-therapy-and-assessment-service` | West and East Waterford except Waterford City and some surrounding areas. Seen in a snippet only |
| roi-waterford-cdnt-north-city | Waterford North City Children's Disability Network Team (DSE CDNT 7) | waterford, kilkenny | DSE `cdnt-7-johnstown-childrens-disability-services` | Waterford North City; South Kilkenny (Mullinavat, Kilmacow, Ferrybank, Slieverue). Snippet only |
| roi-dublin-cdnt-sandymount-1 | Sandymount Children's Disability Network Team (DSE CDNT 1) | dublin | DSE `cdnt1-sandymount` | Baggot Street, Ringsend, Irishtown, Donnybrook, Sandymount, Stillorgan, Blackrock, Ranelagh |
| roi-dublin-cdnt-sandymount-2 | Sandymount Children's Disability Network Team (DSE CDNT 2) | dublin | DSE `cdnt-2-sandymount` | Ballally, Ballinteer, Churchtown, Milltown-Dundrum |
| roi-dublin-cdnt-leopardstown-3 | Leopardstown Children's Disability Network Team (DSE CDNT 3) | dublin | DSE `cdnt3-leopardstown` | Dalkey, Dun Laoghaire, Sallynoggin, Killiney, Loughlinstown |
| roi-dublin-cdnt-leopardstown-4 | Leopardstown Children's Disability Network Team (DSE CDNT 4) | dublin | DSE `cdnt4-leopardstown` | Cabinteely, Foxrock, Shankill, Leopardstown, Sandyford |
| roi-dublin-cdnt-bru-chaoimhin | Bru Chaoimhin Children's Disability Network Team | dublin | HSE `bru-chaoimhin-childrens-disability-network-team` | Grand Canal Dock, Kimmage, Rathmines, Rathgar, Rialto, Terenure, Templeogue and others |
| roi-leitrim-cdnt-leitrim-west-cavan | Leitrim West Cavan Children's Disability Network Team | leitrim, cavan | HSE `leitrim-west-cavan-childrens-disability-network-team` | Leitrim and West Cavan. Current and legacy pages give different bases: state none |
| roi-donegal-cdnt-south-west | Donegal South West Children's Disability Network Team | donegal | HSE `donegal-south-west-childrens-disability-network-team` | South West Donegal |
| roi-donegal-cdnt-east | Donegal East Children's Disability Network Team | donegal | HSE `donegal-east-childrens-disability-network-team` | Donegal East |
| roi-donegal-cdnt-inishowen | Inishowen Children's Disability Network Team | donegal | HSE `inishowen-childrens-disability-network-team` | Inishowen |
| roi-galway-cdnt-east-galway-south-roscommon-8 | East Galway and South Roscommon Children's Disability Network Team 8 | galway, roscommon | HSE `east-galway-and-south-roscommon-childrens-disability-network-team` (the URL has no "8") | Monksland, Ballinasloe, Eyrecourt, Mountbellew, Portumna |
| roi-roscommon-cdnt-north-roscommon-ne-galway-9 | North Roscommon and North East Galway Children's Disability Network Team 9 | roscommon, galway | HSE `north-roscommon-and-north-east-galway-childrens-disability-network-team` | Ballaghaderreen, Boyle, Castlerea, Glenamaddy, Roscommon, Strokestown |
| roi-galway-cdnt-city-west-5 | Galway City West Children's Disability Network Team 5 | galway | HSE `galway-city-west-childrens-disability-network-team-5` | Castlegar, Knocknacarra, Salthill, Shantalla, City Centre |
| roi-galway-cdnt-central-city-east-6 | Central Galway and Galway City East Children's Disability Network Team 6 | galway | HSE `central-galway-and-galway-city-east-childrens-disability-network-team-6` | none read |
| roi-longford-cdnt-longford | Longford Children's Disability Network Team | longford | HSE `longford-childrens-disability-network-team` | County Longford |
| roi-offaly-cdnt-riverside | Riverside Children's Disability Network Team | offaly | HSE `riverside-childrens-disability-network-team` | none read |
| roi-laois-cdnt-barrow | Barrow Children's Disability Network Team | laois | HSE `barrow-childrens-disability-network-team` | none read |
| roi-clare-cdnt-west-clare | West Clare Children's Disability Network Team | clare | HSE `west-clare-childrens-disability-network-team` | West County Clare |
| roi-limerick-cdnt-blackberry-park | Blackberry Park Children's Disability Network Team | limerick, clare | HSE `blackberry-park-childrens-disability-network-team` | Limerick City North (Thomond, Ballynanty, Westbury, King's Island), Parteen, Clonlara, Meelick (Co. Clare) |
| roi-limerick-cdnt-treehouse | Treehouse Children's Disability Network Team | limerick | HSE `treehouse-childrens-disability-network-team` | South County Limerick and parts of the city, including Croom, Hospital, Kilmallock, Ballylanders |
| roi-limerick-cdnt-south-city | South City Children's Disability Network Team | limerick | HSE `south-city-childrens-disability-network-team` | South Limerick City: Ballinacurra, Galvone, Market areas |
| roi-limerick-cdnt-east-limerick | East Limerick Children's Disability Network Team | limerick | HSE `east-limerick-childrens-disability-network-team` | none read |
| roi-kerry-cdnt-north-kerry | North Kerry Children's Disability Network Team | kerry | HSE `north-kerry-childrens-disability-network-team` | Listowel and Castleisland |
| roi-kerry-cdnt-west-kerry | West Kerry Children's Disability Network Team | kerry | HSE `west-kerry-childrens-disability-network-team` | Tralee and Dingle |
| roi-tipperary-cdnt-north-tipperary | North Tipperary Children's Disability Network Team | tipperary | HSE `north-tipperary-childrens-disability-network-team` | Borrisokane, Nenagh, Roscrea, Templemore, Thurles |

Skip (already in `data.js`): Wexford, Enniscorthy, the Cork teams. Do not add: the legacy Kildare/West Wicklow overview page (old team names), and any team whose URL was not captured: Cavan, Monaghan, Sligo and South Donegal, Donegal North, Galway CDNT 4 and 7, Spraoi (Laois), Westmeath, the other Cork and Dublin teams, Enniscorthy catchment. List these in `GAPS.md` as "find in the CDNT finder".

## 2. Adult disability (`specialty: ["adultdisability"]`)
| id | name | county[] | source_url | note |
|---|---|---|---|---|
| roi-day-opportunities-offices | Contact a Disability Day Opportunities Office | national | https://www2.hse.ie/services/disability/adult-disability-services/contact-a-disability-day-opportunities-office/ | Page read directly. Says to contact your local office to find out what day services are available. Lists regional offices covering all 26 counties, each with a provider PDF. Say nothing about the number of offices (the page lists ten groupings; the research said nine) and do not copy the contact details |
| roi-adult-disability-residential | Adult disability residential services | national | https://www2.hse.ie/services/disability/adult-disability-services/residential-services/ | Snippet only. Says to contact your local Integrated Healthcare Area office |
| roi-dse-transition-adult-services | Transition to adult services (Dublin and South East CDNT) | carlow, kilkenny, tipperary, waterford, wexford | https://www.dublinandsoutheastcdnt.ie/teams/transition-to-adult-services/ | For young people moving from a CDNT at 18, via the Day Opportunities team |

Do not add the CHO2 provider PDF (it carries contact details) or the dead Meath page. `hse-aon-officer` already covers Assessment of Need offices.

## 3. Public health nursing (`phn`)
`phn-locator` already points at the primary care centre finder. Add one row only: `roi-local-health-offices`, "Local Health Offices", `county: ["national"]`, source https://www2.hse.ie/services/local-health-office/, blurb: the HSE page says the Local Health Office is the entry point for community services, including public health nursing. Do not add the legacy Mayo, Meath or Kildare health-centre list pages (legacy URLs, one old mixed-case path).

## 4. Dental (`dental`)
| id | name | county[] | source_url | note |
|---|---|---|---|---|
| roi-bray-pcc-dental-children | Dental services for children, Bray Primary Care Centre | wicklow | https://www2.hse.ie/services/primary-care-centres/bray-primary-care-centre/departments-services/dental-services-for-children/ | School programme or self-referral, per the page |
| roi-wicklow-town-emergency-dental-children | Emergency dental care for children, Wicklow Town Primary Care | wicklow | https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/dental-services-emergency-dental-care-for-children/ | School programme or self-referral; by appointment |
| roi-wicklow-town-dental-medical-card | Dental services for medical card holders, Wicklow Town Primary Care | wicklow | https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/dental-services-medical-card-holders/ | The page's referral field looks copied from the children's page: write no `referral` |
| roi-roselawn-dental | Dental service, Roselawn Health Centre | dublin | https://www2.hse.ie/services/primary-care-centres/roselawn-health-centre/departments-services/dental-service-1/ | |
| roi-ballymun-pcc-dental | Dentistry, Ballymun Primary Care Centre | dublin | https://www2.hse.ie/services/primary-care-centres/ballymun-primary-care-centre/departments-services/dentistry/ | |
| roi-summerhill-pcc-dental | Dental, Summerhill Primary Care Centre | dublin | https://www2.hse.ie/services/primary-care-centres/summerhill-primary-care-centre/departments-services/dental-4/ | |
| roi-coolock-pcc-dental | Dental, Coolock Primary Care Centre | dublin | https://www2.hse.ie/services/primary-care-centres/coolock-primary-care/departments-services/dental/ | |
| roi-dental-citizens-info | Dental services (Citizens Information) | national | https://www.citizensinformation.ie/en/health/health-services/dental-aural-and-optical-services/dental-services/ | Per the page: medical card holders aged 16 and over use the Dental Treatment Services Scheme through a participating dentist. Check it does not duplicate `roi-dtss` or similar in `data/costs.js` or `data.js` |
| roi-dental-children-hse | Visiting the dentist with your baby or child | national | https://www2.hse.ie/babies-children/parenting-advice/caring-for-a-child/dental-treatment-for-your-baby-and-child/ | Free check-ups in certain school classes and for children with special needs; emergency care for under-16s; ask the Local Health Office about local clinics |

Do not add: Mayo legacy dental (some surgeries listed "temporarily closed"), Nenagh and Limerick hospital dental pages (hospital services, not community clinics), the HIQA Louth listing (register entry, not a service page). Log all three in `GAPS.md`. Dental for Meath, Wexford, Kildare and the other counties: not found on an official page, so "not searched or not found", never "none".

## 5. Allied health (`alliedhealth`)
One row: `roi-physio-citizens-info`, "Physiotherapy services (Citizens Information)", `national`, https://www.citizensinformation.ie/en/health/health-services/care-in-your-community/physiotherapy-services/. Per the page, public patients need a referral from a GP, public health nurse or hospital. Blurb must say routes differ by discipline and area (some county HSE pages say adults can refer themselves to speech and language therapy). No county rows: the county therapy pages found are all legacy (Mayo, Louth, Wexford, Kildare/West Wicklow) or dead (Meath). Log them in `GAPS.md`.

## 6. Mental health
National pages carry the referral rules, so county rows only need the team and area.

| id | specialty | name | county[] | source_url | note |
|---|---|---|---|---|---|
| roi-cmht-national | adultmh | Community mental health teams | national | https://www2.hse.ie/mental-health/services-support/community-mental-health-teams/ | Per the page: only a GP or another health professional can refer; adults aged 18 to 65; people over 65 can be referred to a Psychiatry of Later Life team |
| roi-camhs-national | camhs | Child and Adolescent Mental Health Services (CAMHS) | national | https://www2.hse.ie/mental-health/services-support/camhs/ | Referral from a GP or another health professional |
| roi-mh-urgent-help | crisis | Get urgent help for a mental health crisis | national | https://www2.hse.ie/mental-health/services-support/get-urgent-help/ | Check `CRISIS_RESOURCES` and existing `crisis` entries first; skip if already covered. Use this `/mental-health/` path, not the old `/wellbeing/` one |
| roi-mh-info-line | crisis | Your Mental Health information line | national | https://www2.hse.ie/mental-health/services-support/your-mental-health-information-line/ | Skip if already covered. Do not copy the number. Page says it is not a counselling service |
| roi-dublin-ballymun-gen-adult-cmht | adultmh | Ballymun General Adult Community Mental Health Team | dublin | https://www2.hse.ie/services/primary-care-centres/ballymun-primary-care-centre/departments-services/ballymun-general-adult-community-mental-health-team/ | |
| roi-dublin-swords-cmht | adultmh | Swords Community Mental Health Team | dublin | https://www2.hse.ie/services/primary-care-centres/swords-health-centre/departments-services/swords-community-mental-health-team/ | |
| roi-dublin-coolock-darndale-cmht | adultmh | Coolock and Darndale General Adult Community Mental Health Teams | dublin | https://www2.hse.ie/services/primary-care-centres/coolock-primary-care/departments-services/coolock-darndale-general-adult-community-mental-health-teams/ | |
| roi-dublin-grangegorman-camhs | camhs | CAMHS at Grangegorman Primary Care Centre | dublin | https://www2.hse.ie/services/primary-care-centres/grangegorman-primary-care-centre/departments-services/camhs-child-adolescent-mental-health/ | |
| roi-kerry-camhs | camhs | Kerry Child and Adolescent Mental Health Service | kerry | https://www.hse.ie/eng/services/list/5/kerryhealthservices/kerrymentalhealth/kerrycamhs.html | **Legacy URL, read directly.** Per the page: ask your GP for a referral, or a senior professional in consultation with the GP. Page names a South Kerry team (Killarney) and a North Kerry team (Tralee Primary Care Centre) but its wording is ambiguous: say "the page describes teams for North and South Kerry" and no more. Expect a `validate-data.js` legacy warning; add it to the URL-family list in `GAPS.md` |

Do not add (log in `GAPS.md` with the reason):
- Three Dublin pages titled "Community Mental Health Team" whose content and contact describe CAMHS (Balbriggan PCC, Corduff/Blanchardstown PCC, Ballymun PCC "community-mental-health-team-1"). Naming conflict: needs a person to open them.
- Legacy county pages: Wexford, Wicklow, Kildare/West Wicklow, Galway, Roscommon, Mayo and Kerry adult mental health, Louth CAMHS (stale, old service name), Kerry adult. The Mayo MHC approved-centre URL has an encoded space and is likely malformed.
- Wexford CAMHS: the legacy page puts the South team at Slaney House but an HSE press release gives Arden House. Do not state a base. The Kildare CAMHS team names and count differ between the legacy page and an HSE leaflet.

## 7. Notices and counts: do not store
- The HSE industrial-action banner (14 Oct 2026, non-urgent services cancelled for one day) is a one-day notice, not a service attribute. Add nothing.
- The CDNT finder says 95 results, HSE publications say 91 and a press report says 93. Quote none of these in any blurb, doc or changelog.
- The Dublin and South East site says it covers teams under the old CHO 5 and CHO 6 labels. Do not carry CHO or region labels into blurbs (decision 2).

## 8. Search
Add seven queries to `scripts/search-audit-queries.txt` (and the Irish file only if you already have reviewed wording): `children's disability team kells`, `cdnt navan`, `cdnt blessington`, `camhs kerry`, `dental clinic ballymun`, `adult disability day services`, `community mental health team swords`. Add aliases only where `search.js` already has the pattern; run `search-audit.js` and record any misses in `scripts/search-audit-known-gaps.txt` with a reason. Do not change ranking.

## 9. Docs, cache, session end
- `GAPS.md`: add a section "Community services pass, 14 Oct 2026" with (a) the 26-county by category picture from the rows you actually added (recount from the data, do not copy my grid), (b) every skipped or withheld lead above with its reason, (c) teams not captured, (d) the legacy URL list with current replacements where known (CDNT finder for the old `find-a-childrens-disability-service.html`; the `/mental-health/services-support/...` pages for the old `/wellbeing/mental-health/...` pages).
- Withheld, non-official leads, for reference only, no content copied: louthparenthub.ie, kilkennyparenthub.ie, horizonscork.ie, mphc.ie, midwestaries.ie, cypsc.ie, mayomha.ie, familypeersupport.ie, local authority and charity directories, press and Oireachtas items. Add nothing from them.
- Re-run the generator for `HUMAN-CHECKS.md` (not committed) so the new `verify: true` rows appear in Elaine's tick list, grouped by specialty.
- Bump the `sw.js` cache. One `CHANGELOG.md` entry and one "Recent AI sessions" line in `AI_RULES.md`. Suggested: "14 Oct 2026: community services candidate rows (CDNT, adult disability, dental, mental health), all search-result and unverified."
- In the PR description say: all new rows are `verify: true`, none opened, and list the existing rows you edited (North Mayo URL only).
