# Local services, inclusive parenting and search gaps: candidate rows (7 Oct 2026)

*Suggested file: `research/LOCAL-SERVICES-PARENTING-2026-10-07.md`. All rows are unverified candidates.*

This pass produced 41 candidate rows from official hosts. Every Part A priority county now has at least three physically based rows. That includes Tyrone, which gets its first in-county rows: Omagh Hospital and Primary Care Complex and South Tyrone Hospital in Dungannon. The weak spots are community services (CDNTs, CAMHS, PHN, dental, older persons, addiction, DSGBV) and four Part B topics, where no official page was found: HSE partner perinatal mental health, gov.ie parentage/surrogacy, a dedicated adoptive-leave page, and anything for trans or non-binary parents.

## TL;DR
- **Part A:** 28 rows across Wexford, Mayo, Tyrone, Louth, Meath, Wicklow and Kildare, mostly hospitals, EDs, maternity units and GP out-of-hours. Tyrone's gap is real but fixable: the Western Trust names services at Omagh (including a 24-hour nurse-led Urgent Care and Treatment Centre), and the Southern Trust names services at South Tyrone Hospital, Dungannon (including a minor injury unit you phone before attending). No in-county community services (CDNT, CAMHS, PHN) were confirmed on any official page this pass.
- **Part B:** 9 rows on fertility, leave, adoption and fostering. The HSE IVF page states that free IUI/IVF/ICSI is not currently available to people who need donor eggs or sperm, same-sex couples or single people; rows paraphrase this only and are link-only for anything legal. No official HSE, gov.ie or nidirect page was found addressing trans or non-binary parents, so that item is "not found".
- **Part C:** 4 rows (HSE Live, NI regional interpreting, Long-Term Illness Scheme, nidirect urgent care). The nidirect "Urgent and emergency care services" page (last modified 28 Sep 2026) does not mention NHS 111; it sends people to Phone First (four of the five trusts) and GP out of hours. No patient-facing HSE interpreting page and no general second-opinion page (ROI or NI) were found.

---

## 1. Summary table

| County / topic | Rows drafted | Rows withheld | Not found this pass |
|---|---|---|---|
| Wexford | 4 | 1 (Caredoc Gorey) | PHN, CDNT, CAMHS, adult MH, primary care teams, dental, older persons, addiction, DSGBV |
| Mayo | 5 | 0 | CDNT, CAMHS, PHN, dental, older persons, GP out-of-hours, DSGBV |
| Tyrone | 4 | 2 (familysupportni.gov.uk listings) | Cookstown and Strabane services; trust CDNT-equivalent; pharmacy pages |
| Louth | 4 | 0 | Louth County Hospital (Dundalk) page; GP out-of-hours; community services |
| Meath | 3 | 0 | Community services; maternity (none listed at Navan) |
| Wicklow | 4 | 2 (Caredoc Wicklow, Caredoc Arklow) | Acute hospital (none seen in county); CAMHS; DSGBV |
| Kildare | 4 | 0 | Maternity; community services |
| Down, Londonderry | 0 | 0 | Not attempted (time) |
| B1 Fathers / non-birthing partners | 3 | 0 | HSE page on supporting a partner's perinatal mental health; antenatal classes stated as open to both parents |
| B2 Adoptive / foster parents | 4 | 1 (Northern Trust adoption page) | AAI page; Citizens Information adoptive leave page; trust post-placement support pages |
| B3 Same-sex couples / fertility | 2 | 0 | gov.ie or Citizens Information parentage / surrogacy / legal recognition pages |
| B4 Trans / non-binary parents | 0 | 0 | Not found |
| C Interpreter access | 1 (NI) | 3 | ROI patient-facing HSE page |
| C Second opinion | 0 | 1 | Citizens Information page; general nidirect page |
| C Long-Term Illness Scheme | 1 | 0 | n/a (wording conflict flagged) |
| C HSE Live | 1 | 0 | n/a |
| C NI 111 | 1 | 0 | NHS 111 in NI: not found on nidirect |

Where none of `parenting`, `fertility`, `mh`, `feeding`, `loss` fits (hospitals, EDs, GP out-of-hours, schemes), `specialty` is `[]` for Claude Code to fill from existing ids. See section 5.

---

## 2. Candidate rows

### Wexford

```js
{
  id: "roi-wexford-wexford-general-hospital",
  name: "Wexford General Hospital",
  specialty: [],
  county: ["wexford"],
  blurb: "The HSE page for Wexford General Hospital in Wexford Town gives its address, visiting times, parking, supports and links to the emergency department and a list of services at the hospital.",
  details: ["The page lists separate visiting arrangements for the maternity unit, including times for support partners", "The page lists a Patient Advocacy Liaison Service (PALS) / patient liaison and complaints officer", "The page links to a 'Find a service at this hospital' list"],
  contact: { web: "https://www2.hse.ie/services/hospitals/wexford-general-hospital/" },
  source_url: "https://www2.hse.ie/services/hospitals/wexford-general-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wexford-wgh-emergency-department",
  name: "Wexford General Hospital Emergency Department",
  specialty: [],
  county: ["wexford"],
  blurb: "The HSE page for the emergency department at Wexford General Hospital explains when to use an emergency department and when an injury unit or GP out-of-hours service may be more suitable.",
  details: ["The page says this emergency department is for all ages"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/wexford-general-hospital-emergency-department/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/wexford-general-hospital-emergency-department/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wexford-wgh-birth-reflection-clinic",
  name: "Birth reflection clinic at Wexford General Hospital",
  specialty: ["parenting"],
  county: ["wexford"],
  blurb: "The HSE lists a birth reflection clinic based in Wexford General Hospital.",
  details: ["The page says the service is in Wexford General Hospital"],
  contact: { web: "https://www2.hse.ie/services/hospitals/wexford-general-hospital/departments-services/birth-reflection-clinic-1/" },
  source_url: "https://www2.hse.ie/services/hospitals/wexford-general-hospital/departments-services/birth-reflection-clinic-1/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wexford-caredoc-wexford",
  name: "Caredoc Wexford",
  specialty: [],
  county: ["wexford"],
  blurb: "The HSE lists Caredoc Wexford as a GP out-of-hours service for when your GP surgery is closed and you urgently need a GP. It says the service is not for routine care such as repeat prescriptions.",
  details: ["The page says the GP out-of-hours service is for all ages", "The page says the service is in Wexford Primary Care Centre"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/caredoc-wexford/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/caredoc-wexford/",
  urlStatus: "search-result",
  verify: true
}
```

### Mayo

```js
{
  id: "roi-mayo-mayo-university-hospital",
  name: "Mayo University Hospital",
  specialty: [],
  county: ["mayo"],
  blurb: "The HSE page for Mayo University Hospital in Castlebar gives its address, visiting information, supports and departments.",
  details: ["The page lists a Patient Advocacy Liaison Service (PALS) at the hospital", "The page lists a chaplaincy service for all patients"],
  contact: { web: "https://www2.hse.ie/services/hospitals/mayo-university-hospital/" },
  source_url: "https://www2.hse.ie/services/hospitals/mayo-university-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-mayo-muh-emergency-department",
  name: "Mayo University Hospital Emergency Department",
  specialty: [],
  county: ["mayo"],
  blurb: "The HSE page for the emergency department at Mayo University Hospital, Castlebar, explains when to attend and when to contact a GP instead.",
  details: ["The page says this emergency department is for all ages"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-emergency-department/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-emergency-department/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-mayo-muh-maternity-emergency",
  name: "Mayo University Hospital Maternity Emergency Service",
  specialty: ["parenting"],
  county: ["mayo"],
  blurb: "The HSE page describes the Emergency and Assessment Unit at Mayo University Hospital for signs of labour, complications in pregnancy or after birth, and acute gynaecological emergencies.",
  details: ["The page lists opening hours as 24 hours, seven days", "The page says you do not need an appointment for the Emergency and Assessment Unit"],
  referral: "The page says no appointment is needed.",
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-maternity-emergency-service/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-maternity-emergency-service/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-mayo-muh-early-pregnancy-unit",
  name: "Mayo University Hospital Early Pregnancy Assessment Unit",
  specialty: ["parenting", "loss"],
  county: ["mayo"],
  blurb: "The HSE lists an Early Pregnancy Assessment Unit at Mayo University Hospital, Castlebar, seen by appointment.",
  details: ["The page says you need an appointment to visit the unit"],
  referral: "The page says you may be referred by a GP or by the Emergency and Assessment Unit.",
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-early-pregnancy-assessment-unit/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/mayo-university-hospital-early-pregnancy-assessment-unit/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-mayo-mental-health-services",
  name: "Mental Health Services in Mayo",
  specialty: ["mh"],
  county: ["mayo"],
  blurb: "An older HSE page describes the HSE mental health service in County Mayo. It lists sector teams and local outpatient clinics, day centres, day hospitals and treatment centres in places including Castlebar, Ballina, Swinford, Ballinrobe, Claremorris and Westport.",
  details: ["The page says there are five sector teams", "The page names an Adult Mental Health Unit at Mayo University Hospital", "The page says the Claremorris day centre takes referrals from GPs"],
  referral: "The page says most people see their GP first, who may refer on.",
  contact: { web: "https://www.hse.ie/eng/services/list/1/lho/mayo/mental-health-services/mental-health-services-in-mayo.html" },
  source_url: "https://www.hse.ie/eng/services/list/1/lho/mayo/mental-health-services/mental-health-services-in-mayo.html",
  urlStatus: "search-result",
  verify: true
}
```

### Tyrone

```js
{
  id: "ni-tyrone-omagh-hospital-primary-care-complex",
  name: "Omagh Hospital and Primary Care Complex",
  specialty: [],
  county: ["tyrone"],
  blurb: "The Western Trust page for Omagh Hospital and Primary Care Complex, Donaghanie Road, Omagh, lists the services delivered there. It also links to outpatient, women's health and GUM clinic pages.",
  details: ["The page lists services at this location including an Urgent Care and Treatment Centre, Child Psychotherapy Service, Children's Diabetes Service, Community Dental Services, Bereavement Care and Specialist Palliative Care", "The page describes palliative care and rehabilitation wards", "The page lists GP out-of-hours at this location"],
  contact: { web: "https://westerntrust.hscni.net/hospitals/omagh-hospital/" },
  source_url: "https://westerntrust.hscni.net/hospitals/omagh-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-tyrone-omagh-urgent-care-treatment-centre",
  name: "Urgent Care and Treatment Centre, Omagh Hospital",
  specialty: [],
  county: ["tyrone"],
  blurb: "The Western Trust describes the Urgent Care and Treatment Centre at Omagh Hospital and Primary Care Complex as a nurse-led minor injuries unit, open 24 hours with x-ray on site.",
  details: ["The page lists minor injuries it sees, including minor head injuries without loss of consciousness, wounds, eye injuries, sprains and fractures, bites and stings", "The page says staff get telephone advice from emergency consultants at South West Acute and Altnagelvin hospitals"],
  contact: { web: "https://westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/urgent-care-and-treatment-centre-omagh-hospital/" },
  source_url: "https://westerntrust.hscni.net/services/emergency-department-and-urgent-care-services/urgent-care-and-treatment-centre-omagh-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-tyrone-south-tyrone-hospital",
  name: "South Tyrone Hospital",
  specialty: [],
  county: ["tyrone"],
  blurb: "The Southern Trust page for South Tyrone Hospital, Carland Road, Dungannon, lists the services on the site.",
  details: ["The page lists outpatient services, day surgery and radiology, including an Ambulatory Paediatric Service", "The page says CAMHS and children's social services teams are based at the hospital", "The page says the Health Visiting Team for the Dungannon area is based at the hospital", "The page lists the Mental Health Support and Recovery Team, Primary Mental Health Care and Psychology Services on site", "The page describes a rehabilitation unit and a day hospital for older people"],
  contact: { web: "https://southerntrust.hscni.net/our-hospitals/south-tyrone-hospital/" },
  source_url: "https://southerntrust.hscni.net/our-hospitals/south-tyrone-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-tyrone-south-tyrone-minor-injury-unit",
  name: "South Tyrone Minor Injury Unit",
  specialty: [],
  county: ["tyrone"],
  blurb: "The Southern Trust says people with a minor injury who live close to South Tyrone Minor Injury Unit in Dungannon should phone for an appointment before attending.",
  details: ["The page asks people to phone before attending"],
  referral: "The page says to phone for an appointment before you attend.",
  contact: { web: "https://southerntrust.hscni.net/our-hospitals/south-tyrone-hospital/" },
  source_url: "https://southerntrust.hscni.net/our-hospitals/south-tyrone-hospital/",
  urlStatus: "search-result",
  verify: true
}
```

### Louth

```js
{
  id: "roi-louth-olol-emergency-department",
  name: "Our Lady of Lourdes Hospital Drogheda Emergency Department",
  specialty: [],
  county: ["louth"],
  blurb: "The HSE page for the emergency department at Our Lady of Lourdes Hospital, Drogheda, explains when to attend and when an injury unit may be more suitable.",
  details: ["The page says this emergency department is for all ages"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/our-lady-of-lourdes-hospital-drogheda-emergency-department/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/our-lady-of-lourdes-hospital-drogheda-emergency-department/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-louth-olol-maternity-emergency",
  name: "Louth Hospital Maternity Emergency Service at Our Lady of Lourdes Hospital Drogheda",
  specialty: ["parenting"],
  county: ["louth"],
  blurb: "The HSE lists a maternity emergency service based in Our Lady of Lourdes Hospital, Drogheda.",
  details: ["The page says the service is in Our Lady of Lourdes Hospital Drogheda"],
  contact: { web: "https://www2.hse.ie/services/hospitals/our-lady-of-lourdes-hospital-drogheda/departments-services/louth-hospital-maternity-emergency-service/" },
  source_url: "https://www2.hse.ie/services/hospitals/our-lady-of-lourdes-hospital-drogheda/departments-services/louth-hospital-maternity-emergency-service/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-louth-olol-early-pregnancy-unit",
  name: "Louth Hospital Early Pregnancy Assessment Unit",
  specialty: ["parenting", "loss"],
  county: ["louth"],
  blurb: "The HSE lists an Early Pregnancy Assessment Unit at Our Lady of Lourdes Hospital, Drogheda.",
  details: [],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/louth-hospital-early-pregnancy-assessment-unit/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/louth-hospital-early-pregnancy-assessment-unit/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-louth-olol-parentcraft-breastfeeding",
  name: "Parentcraft Department Our Lady of Lourdes Hospital Drogheda",
  specialty: ["feeding", "parenting"],
  county: ["louth"],
  blurb: "The HSE says this service offers one-to-one breastfeeding support from a lactation consultant, including antenatal breastfeeding preparation and postnatal support, with phone support also offered.",
  details: ["The page lists opening hours as Monday to Friday, 8am to 6pm"],
  referral: "The page lists GP, PHN, midwife or self-referral.",
  contact: { web: "https://www2.hse.ie/services/breastfeeding-support/parentcraft-department-our-lady-of-lourdes-hospital-drogheda/" },
  source_url: "https://www2.hse.ie/services/breastfeeding-support/parentcraft-department-our-lady-of-lourdes-hospital-drogheda/",
  urlStatus: "search-result",
  verify: true
}
```

### Meath

```js
{
  id: "roi-meath-our-ladys-hospital-navan",
  name: "Our Lady's Hospital Navan",
  specialty: [],
  county: ["meath"],
  blurb: "The HSE page for Our Lady's Hospital, Navan, gives its address, visiting times and departments.",
  details: [],
  contact: { web: "https://www2.hse.ie/services/hospitals/our-ladys-hospital-navan/" },
  source_url: "https://www2.hse.ie/services/hospitals/our-ladys-hospital-navan/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-meath-navan-emergency-department",
  name: "Our Lady's Hospital Navan Emergency Department",
  specialty: [],
  county: ["meath"],
  blurb: "The HSE page for the emergency department at Our Lady's Hospital, Navan, explains when to go to an emergency department and when an injury unit may be more suitable.",
  details: ["The page says this emergency department is for anyone age 16 and older"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/our-ladys-hospital-navan-emergency-department/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/our-ladys-hospital-navan-emergency-department/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-meath-nedoc-navan",
  name: "Nedoc Navan",
  specialty: [],
  county: ["meath"],
  blurb: "The HSE lists Nedoc Navan, Academy Street, Navan, as a GP out-of-hours service. It says that when you phone, a nurse calls you back and tells you what to do next.",
  details: ["The page says the nurse may give advice, arrange an out-of-hours GP appointment or house visit, or direct you to an emergency department or injury unit"],
  referral: "The page says you phone the service first.",
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/nedoc-navan/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/nedoc-navan/",
  urlStatus: "search-result",
  verify: true
}
```

### Wicklow

```js
{
  id: "roi-wicklow-wicklow-town-primary-care",
  name: "Wicklow Town Primary Care",
  specialty: [],
  county: ["wicklow"],
  blurb: "The HSE page for Wicklow Town Primary Care, Knockrobin, Wicklow, links to a list of community services provided at the centre, including dental, dietetic and disability services.",
  details: ["The page lists a car park and a pharmacy as facilities"],
  contact: { web: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wicklow-phn-child-health-wicklow-town",
  name: "Public Health Nursing Child Health at Wicklow Town Primary Care",
  specialty: ["parenting"],
  county: ["wicklow"],
  blurb: "The HSE says public health nurses based at Wicklow Town Primary Care give child health services, such as care after an operation, and coordinate care for children with complex needs.",
  details: ["The page gives the area covered as Wicklow town and surrounding areas"],
  contact: { web: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/child-health-9/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/child-health-9/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wicklow-primary-care-social-work-wicklow-town",
  name: "Social Work at Wicklow Town Primary Care",
  specialty: [],
  county: ["wicklow"],
  blurb: "The HSE says the Primary Care Social Work Department gives short-term support to people with a significant health concern and a complex social situation. The issues it lists include domestic violence, carer issues, parental support and bereavement.",
  details: ["The page gives the catchment as South Wicklow", "The page says it is by appointment only"],
  referral: "The page says the social worker usually contacts service users by phone first.",
  contact: { web: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/social-work-5/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/social-work-5/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-wicklow-community-medical-doctors",
  name: "Community Medical Doctors Service at Wicklow Town Primary Care",
  specialty: ["parenting"],
  county: ["wicklow"],
  blurb: "The HSE says community medical doctors take child health referrals for children up to age 12 in South Wicklow and are part of the school immunisation programme.",
  details: ["The page gives the catchment as South Wicklow"],
  referral: "The page lists public health nurse, self-referral, GP or health and social care professionals.",
  contact: { web: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/community-medical-doctors-service/" },
  source_url: "https://www2.hse.ie/services/primary-care-centres/wicklow-town-primary-care/departments-services/community-medical-doctors-service/",
  urlStatus: "search-result",
  verify: true
}
```

### Kildare

```js
{
  id: "roi-kildare-naas-general-hospital",
  name: "Naas General Hospital",
  specialty: [],
  county: ["kildare"],
  blurb: "The HSE page for Naas General Hospital, Craddockstown Road, Naas, gives its address, current visiting restrictions, parking and departments.",
  details: ["The page lists a chaplaincy service for all patients"],
  contact: { web: "https://www2.hse.ie/services/hospitals/naas-general-hospital/" },
  source_url: "https://www2.hse.ie/services/hospitals/naas-general-hospital/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-kildare-naas-emergency-department",
  name: "Naas General Hospital Emergency Department",
  specialty: [],
  county: ["kildare"],
  blurb: "The HSE page for the emergency department at Naas General Hospital explains when to attend and when an injury unit or GP out-of-hours service may be more suitable.",
  details: ["The page says this emergency department is for anyone age 16 and older"],
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/naas-general-hospital-emergency-department/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/naas-general-hospital-emergency-department/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-kildare-naas-hospital-injury-unit",
  name: "Naas Hospital Injury Unit",
  specialty: [],
  county: ["kildare"],
  blurb: "The HSE lists Naas Hospital Injury Unit at Vista Primary Care Centre, Ballymore Eustace Road, Naas, for injuries that are not life-threatening and unlikely to need a hospital stay.",
  details: ["The page says the injury unit is for anyone age 16 and older", "The page says injury units treat injuries less than 6 weeks old"],
  referral: "The page says you do not need an appointment.",
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/naas-hospital-injury-unit/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/naas-hospital-injury-unit/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-kildare-kdoc-naas",
  name: "KDoc Naas",
  specialty: [],
  county: ["kildare"],
  blurb: "The HSE lists KDoc (Kildare & West Wicklow Doctors on call) at Vista Primary Care, Naas, as a GP out-of-hours service for all ages.",
  details: ["The page says it is by appointment only and there is no walk-in service"],
  referral: "The page says it is appointment only; phone your GP outside surgery hours for the local service details.",
  contact: { web: "https://www2.hse.ie/services/find-urgent-emergency-care/kdoc-naas/" },
  source_url: "https://www2.hse.ie/services/find-urgent-emergency-care/kdoc-naas/",
  urlStatus: "search-result",
  verify: true
}
```

### Part B: inclusive parenting

```js
{
  id: "roi-national-hse-ivf-icsi-iui",
  name: "Getting IVF and other specialist treatment through the HSE",
  specialty: ["fertility"],
  county: ["national"],
  blurb: "The HSE page explains how people may get IUI, IVF or ICSI free through the HSE after referral to a regional fertility hub, and lists the access criteria. The HSE page says this free treatment is not currently available if you need donor eggs or sperm, are in a same-sex couple, or are single.",
  details: ["The page says a GP or consultant must refer you to a regional fertility hub", "The page says 'You must be resident in the Republic of Ireland' and 'You must be age 18 or over', and that at referral to the regional fertility hub you must be 'under 41 if you're a woman' or 'under 60 if you're a man'; on previous treatment it says you can get treatment if 'you had no more than 1 round of IVF before and have no unused embryos still in storage'", "The page says the HSE will update who can get free treatment when donor treatments become available"],
  referral: "The page says a GP or consultant must refer you to a regional fertility hub.",
  contact: { web: "https://www2.hse.ie/pregnancy-birth/trying-for-a-baby/your-fertility/getting-ivf-icsi-iui-hse/" },
  source_url: "https://www2.hse.ie/pregnancy-birth/trying-for-a-baby/your-fertility/getting-ivf-icsi-iui-hse/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-ci-hse-ahr-services",
  name: "HSE Assisted Human Reproduction services (Citizens Information)",
  specialty: ["fertility"],
  county: ["national"],
  blurb: "Citizens Information explains the HSE assisted human reproduction service and says it is not means tested; the HSE IVF page itself says 'We work with some private fertility clinics. We may be able to refer you to a private clinic we have approved for the treatment.' The page describes the steps to access it and who can get it.",
  details: ["The page lists the treatments as IUI, IVF and ICSI", "The page says that if you do not meet the criteria you may still get other fertility treatment at a regional fertility hub"],
  contact: { web: "https://www.citizensinformation.ie/en/health/health-services/reproductive-health/hse-assisted-human-reproduction-ahr-services/" },
  source_url: "https://www.citizensinformation.ie/en/health/health-services/reproductive-health/hse-assisted-human-reproduction-ahr-services/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-ci-leave-for-parents",
  name: "Leave for parents (Citizens Information)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Citizens Information gives an overview of the types of statutory leave for parents, including maternity, adoptive, paternity, parental and parent's leave, and links to each. Link only.",
  details: [],
  contact: { web: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/leave-for-parents/" },
  source_url: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/leave-for-parents/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-ci-paternity-leave",
  name: "Paternity leave (Citizens Information)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Citizens Information explains paternity leave and Paternity Benefit, including how it applies after an adoption and after a stillbirth. Link only.",
  details: ["The page says that for an adopted child the relevant parent is the parent who is not taking adoptive leave"],
  contact: { web: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/paternity-leave/" },
  source_url: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/paternity-leave/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-ci-parental-leave",
  name: "Parental leave (Citizens Information)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Citizens Information explains unpaid parental leave and says it is different to parent's leave. Link only.",
  details: ["The page says a 'relevant parent' includes a parent, an adoptive parent or a person acting in loco parentis"],
  contact: { web: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/parental-leave/" },
  source_url: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/parental-leave/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-tusla-post-adoption-services",
  name: "Post Adoption Services (Tusla)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Tusla says post adoption services aim to support the stability and well-being of adopted children and adoptive families. The page says Tusla funds Barnardos to provide services for children and adults.",
  details: ["The page lists a national email and telephone helpline advisory service", "The page lists advisory services for adoptive parents, therapeutic services for children, and group and individual support sessions"],
  contact: { web: "https://www.tusla.ie/services/birth-information-and-tracing-and-adoption/post-adoption-services/" },
  source_url: "https://www.tusla.ie/services/birth-information-and-tracing-and-adoption/post-adoption-services/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-tusla-fostering-supports",
  name: "Fostering supports (Tusla)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Tusla describes the supports for its foster carers, including visits and phone contact from a fostering link worker, training, and an out-of-hours phone support service with a Tusla social worker for emergencies.",
  details: ["The page lists support from a public health nurse if caring for a pre-school child", "The page says training is compulsory for foster carers"],
  contact: { web: "https://www.tusla.ie/services/alternative-care/foster-care/fostering-supports/" },
  source_url: "https://www.tusla.ie/services/alternative-care/foster-care/fostering-supports/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-tusla-adopting-from-foster-care",
  name: "Adopting a child from foster care (Tusla)",
  specialty: ["parenting"],
  county: ["national"],
  blurb: "Tusla explains when adoption may be considered for a child in long-term foster care, the teams involved and the key stages of the process. Link only.",
  details: ["The page names the Adoption Service, Children in Care Service and Fostering Service teams"],
  contact: { web: "https://www.tusla.ie/services/birth-information-and-tracing-and-adoption/what-is-adoption/domestic/adopting-a-child-from-foster-care/" },
  source_url: "https://www.tusla.ie/services/birth-information-and-tracing-and-adoption/what-is-adoption/domestic/adopting-a-child-from-foster-care/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-becoming-foster-kinship-foster-carer",
  name: "Becoming a foster or kinship foster carer (nidirect)",
  specialty: ["parenting"],
  county: ["antrim", "armagh", "down", "fermanagh", "londonderry", "tyrone"],
  blurb: "nidirect explains how to become a foster or kinship foster carer in Northern Ireland, through a local HSC Trust, HSC NI Adoption and Foster Care, or an independent fostering provider.",
  details: ["The page says the five HSC Trusts are responsible for the welfare of all looked after children and their fostering services are supported by HSC NI Adoption and Foster Care"],
  contact: { web: "https://www.nidirect.gov.uk/articles/becoming-foster-kinship-foster-carer" },
  source_url: "https://www.nidirect.gov.uk/articles/becoming-foster-kinship-foster-carer",
  urlStatus: "search-result",
  verify: true
}
```

### Part C: search-audit gaps

```js
{
  id: "roi-national-hse-live",
  name: "HSE Live (Contact the HSE)",
  specialty: [],
  county: ["national"],
  blurb: "The HSE 'Contact the HSE' page says HSE Live is the service to contact if you have a general question or are not sure who to contact in the HSE, and gives its hours as 'Monday to Friday, 8am to 8pm; Saturday, 9am to 5pm; Sunday and bank holidays, closed'. The page says not to call HSE Live if someone is seriously ill, injured or at risk of dying, and directs people to 112 or 999 if someone needs immediate medical help.",
  details: ["The page says you cannot contact HSE Live by email", "The page lists phone and social media direct messages as ways to contact HSE Live"],
  contact: { web: "https://www2.hse.ie/contact/" },
  source_url: "https://www2.hse.ie/contact/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-regional-interpreting-service-patients",
  name: "Regional Interpreting Service: Information for Patients (BSO)",
  specialty: [],
  county: ["antrim", "armagh", "down", "fermanagh", "londonderry", "tyrone"],
  blurb: "The Business Services Organisation page (modified 22 Apr 2026) says '24/7 interpreting support is available free of charge for all Patients who do not speak English proficiently', both face to face and by telephone. It asks patients to tell their health practitioner or receptionist if they need an interpreter.",
  details: ["The page says telephone interpreting is provided by a separate contracted service"],
  referral: "The page says to let your health practitioner or receptionist know you need an interpreter for your appointment.",
  contact: { web: "https://bso.hscni.net/directorates/operations/regional-interpreting-service/information-for-patients/" },
  source_url: "https://bso.hscni.net/directorates/operations/regional-interpreting-service/information-for-patients/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "roi-national-long-term-illness-scheme",
  name: "Long-Term Illness Scheme",
  specialty: [],
  county: ["national"],
  blurb: "The HSE Long-Term Illness Scheme 'About' page (last reviewed 19 Dec 2025, next review due 19 Dec 2028) says the scheme lets you get some drugs, medicines and approved appliances free from your pharmacy for 16 listed conditions, from acute leukaemia to thalidomide-related conditions. It says the scheme is different to a medical card and has no means test.",
  details: ["The page lists the conditions covered, including 'Diabetes mellitus (Gestational diabetes not included)', epilepsy, cystic fibrosis, multiple sclerosis and mental illness in people under 16", "The page says you must be ordinarily resident in the Republic of Ireland", "The page says a successful applicant gets a Long-Term Illness Scheme card"],
  referral: "The HSE apply page says a GP or consultant medical report must be included with the application.",
  contact: { web: "https://www2.hse.ie/services/schemes-allowances/lti/about/" },
  source_url: "https://www2.hse.ie/services/schemes-allowances/lti/about/",
  urlStatus: "search-result",
  verify: true
},
{
  id: "ni-urgent-and-emergency-care-services",
  name: "Urgent and emergency care services (nidirect)",
  specialty: [],
  county: ["antrim", "armagh", "down", "fermanagh", "londonderry", "tyrone"],
  blurb: "nidirect says that if you think you need urgent care that is not immediately life-threatening, you should use the Phone First service if it is available in your Trust area. It also links to minor injury units and urgent care centres by Trust.",
  details: ["The page says Phone First is available in the Northern, South Eastern, Southern and Western HSC Trusts", "The page says you will be assessed on the phone and directed to the most suitable service, such as an emergency department, urgent care centre, minor injuries unit, GP or pharmacist"],
  contact: { web: "https://www.nidirect.gov.uk/articles/urgent-and-emergency-care-services" },
  source_url: "https://www.nidirect.gov.uk/articles/urgent-and-emergency-care-services",
  urlStatus: "search-result",
  verify: true
}
```

---

## 3. Source log

All read 7 Oct 2026. Full URLs are in each row's `source_url`. "Full" = page body retrieved; "Snippet" = only search-result text from that exact official URL was seen, so Elaine should read these most closely.

| Row id | Read as | What it says |
|---|---|---|
| roi-wexford-wexford-general-hospital | Full | Address, visiting (incl. maternity and support partners), parking, PALS, ED and service-list links |
| roi-wexford-wgh-emergency-department | Snippet | ED for all ages; injury unit and GP OOH guidance |
| roi-wexford-wgh-birth-reflection-clinic | Snippet | Birth reflection clinic located in WGH |
| roi-wexford-caredoc-wexford | Snippet | GP OOH, all ages, in Wexford Primary Care Centre |
| roi-mayo-mayo-university-hospital | Snippet | Address, open visiting, PALS, chaplaincy |
| roi-mayo-muh-emergency-department | Snippet | ED for all ages |
| roi-mayo-muh-maternity-emergency | Full | 24-hour EAU; no appointment; labour, pregnancy/postnatal complications, gynae emergencies |
| roi-mayo-muh-early-pregnancy-unit | Snippet | Appointment needed; GP or EAU referral |
| roi-mayo-mental-health-services | Full | Five sector teams; local clinics; Adult MH Unit at MUH; looks stale |
| ni-tyrone-omagh-hospital-primary-care-complex | Full (nav) + snippet | Services at Omagh incl. UCTC, child psychotherapy, community dental, bereavement care |
| ni-tyrone-omagh-urgent-care-treatment-centre | Snippet | Nurse-led MIU, 24 hours, x-ray; injuries treated |
| ni-tyrone-south-tyrone-hospital | Full (nav) + snippet | Outpatients, ambulatory paediatrics, CAMHS, health visiting, MH teams |
| ni-tyrone-south-tyrone-minor-injury-unit | Snippet | Phone for appointment before attending |
| roi-louth-olol-emergency-department | Snippet | ED for all ages |
| roi-louth-olol-maternity-emergency | Snippet | Maternity emergency service in OLOL |
| roi-louth-olol-early-pregnancy-unit | Snippet | EPAU at OLOL address |
| roi-louth-olol-parentcraft-breastfeeding | Full | One-to-one lactation support; GP/PHN/self/midwife referral |
| roi-meath-our-ladys-hospital-navan | Snippet | Address, visiting, departments |
| roi-meath-navan-emergency-department | Full | ED for age 16+; injury unit guidance |
| roi-meath-nedoc-navan | Snippet | GP OOH; nurse callback; outcomes |
| roi-wicklow-wicklow-town-primary-care | Snippet | Primary care centre, Knockrobin; service list |
| roi-wicklow-phn-child-health-wicklow-town | Snippet | PHN child health; Wicklow town and surrounds |
| roi-wicklow-primary-care-social-work-wicklow-town | Snippet | Short-term social work; South Wicklow; lists domestic violence |
| roi-wicklow-community-medical-doctors | Snippet | Child referrals up to 12; South Wicklow |
| roi-kildare-naas-general-hospital | Snippet | Address, visiting restrictions (dated 18 Sep 2026), chaplaincy |
| roi-kildare-naas-emergency-department | Snippet | ED for age 16+ |
| roi-kildare-naas-hospital-injury-unit | Snippet | Injury unit at Vista PCC; 16+; injuries under 6 weeks |
| roi-kildare-kdoc-naas | Snippet | GP OOH; all ages; appointment only |
| roi-national-hse-ivf-icsi-iui | Full | Fertility hub referral; access criteria; not available if donor gametes needed, same-sex couple or single |
| roi-national-ci-hse-ahr-services | Full (header) + snippet | Free, not means tested, HSE-approved private clinics |
| roi-national-ci-leave-for-parents | Snippet | Overview of statutory leave types |
| roi-national-ci-paternity-leave | Snippet | Paternity leave/benefit; adoption and stillbirth notes |
| roi-national-ci-parental-leave | Snippet | Unpaid parental leave; relevant parent definition |
| roi-national-tusla-post-adoption-services | Snippet | Tusla-funded post adoption services via Barnardos |
| roi-national-tusla-fostering-supports | Snippet | Link worker, training, PHN, out-of-hours social worker |
| roi-national-tusla-adopting-from-foster-care | Snippet | When considered; teams; stages |
| ni-becoming-foster-kinship-foster-carer | Snippet | Routes via Trusts, HSC NI Adoption and Foster Care, independent providers |
| roi-national-hse-live | Full (subagent) | General questions; not for emergencies; no email |
| ni-regional-interpreting-service-patients | Full (subagent; modified 22 Apr 2026) | Free 24/7 face-to-face and telephone interpreting |
| roi-national-long-term-illness-scheme | Snippet | Free drugs/appliances for listed conditions; no means test |
| ni-urgent-and-emergency-care-services | Full (subagent; updated 28 Sep 2026) | Phone First in four Trusts; no NHS 111 mention |

---

## 4. Withheld rows

| Candidate | Reason | Un-withhold when |
|---|---|---|
| Caredoc Gorey (www2.hse.ie/services/find-urgent-emergency-care/caredoc-gorey/) | Snippet showed only the name; no address seen | Page read shows a Gorey (Wexford) address |
| Caredoc Wicklow, Caredoc Arklow (www2.hse.ie/.../caredoc-wicklow/, .../caredoc-arklow/) | No address seen | Page read shows a Wicklow-county address |
| Health Visiting (Omagh), Western Trust | Host familysupportni.gov.uk not approved | Host approved, or a Western Trust page is found |
| Sexual and Reproductive Health Services, Omagh | Same host issue; no matching specialty id | Host approved or Western Trust "Women's Health and GUM Clinics, Omagh Hospital" page read; specialty agreed |
| Adoption and Foster Care, Northern Trust | Page only points to the regional service; catchment not stated | A Trust page stating its area is found, or a NI-wide convention is agreed |
| HSE National SOP for Accessing Interpretation Services (hse.ie PDF) | Staff-facing procedure, not a patient service page | A www2.hse.ie patient page on interpreting is found |
| HSE ENT appointment page (interpreter mention) | Covers one service only | Use as a detail on an audiology entry instead |
| Belfast Trust interpreting service page | Duplicates the BSO row; snippet only | Elaine prefers a Trust-hosted source |
| National Healthcare Charter (second opinion), hse.ie PDF | Copy found in a complaints officers' toolkit, may not be current; risks reading as a rights claim | Current charter URL confirmed; worded "the HSE charter says…" |
| LTI legacy .html pages | Older URL family; conflicting details (section 6) | Only if the newer URLs stop resolving |

---

## 5. Duplicates and proposed edits

**Possible duplicates, need check against data.js:**
- The four main hospital rows (Wexford, Mayo, Naas, Navan) and the five ED rows (Wexford, Mayo, Drogheda, Navan, Naas). Flagship pages are likely already present or merged into hospital entries.
- `roi-national-long-term-illness-scheme`, `roi-national-hse-live`, `roi-national-hse-ivf-icsi-iui`, `roi-national-ci-leave-for-parents`, `roi-national-ci-paternity-leave`.
- Tusla rows, if any Tusla entries were added after its 7 Oct 2026 approval.

**Proposed edits to existing entries (if present):**
- Wexford General Hospital: add the maternity-unit support-partner visiting detail, the only official Part A wording naming partners.
- LTI: use the "/services/schemes-allowances/lti/" URL family and the wording "no means test" and "different to a medical card"; gestational diabetes is excluded per the HSE page.
- Any "NHS 111" / "111" wording for NI: change to Phone First / GP out of hours, per nidirect.

**Specialty ids:** `specialty: []` rows need existing ids from data.js. If none fits, proposed new id: `urgent` (EDs, injury units, MIUs, GP out-of-hours, Phone First). No other new ids.

**NI-wide county convention:** three NI-wide rows list all six NI counties rather than `national`, which reads as ROI-wide. Elaine to confirm.

---

## 6. Hosts needing approval, not found, uncertainties

**Hosts needing approval (not used):**
- familysupportni.gov.uk: NI government family-support directory with Trust listings.
- saolta.ie: hospital-group site linked from the Mayo HSE page; a group site, not a hospital's own .ie site.
- caredoc.ie, kdoc.ie: GP out-of-hours providers' own sites.
- adoptionandfostercare.hscni.net: matches `*.hscni.net` but not read; confirm scope.
- bso.hscni.net, online.hscni.net: match `*.hscni.net` but are not Trust sites; bso.hscni.net is used for one row, please confirm.
- Withheld by rule (seen, not used): barnardos.ie, irishtimes.com, irishexaminer.com, ipu.ie, sims.ie, firstivf.ie, niassembly.gov.uk, and UK NHS / charity pages on partner perinatal mental health.

**Not found this pass:**
- Part A community services in every priority county (CDNTs, CAMHS (ROI), PHN outside Wicklow, dental, older persons, addiction, DSGBV on HSE or Tusla pages). The search budget ran out before a community-healthcare pass, so this is "not searched", not "does not exist".
- Louth County Hospital (Dundalk); GP out-of-hours for Mayo and Louth. Down and Londonderry not attempted.
- B1: no HSE page on supporting a partner's perinatal mental health (results were NHS England/Wales or charity pages); no HSE page stating antenatal classes are open to both parents.
- B2: no AAI page or Citizens Information adoptive leave/benefit page read; no HSC Trust post-placement support page.
- B3: no gov.ie or Citizens Information parentage / surrogacy / legal recognition page read. Any future row must be link-only.
- B4: not found. The HSE IVF page mentions only "the non-birth mother … in a same-sex female relationship" in its children criteria.
- C: no patient-facing HSE interpreting page; no Citizens Information or general nidirect second-opinion page (nidirect mentions second opinions only for dentistry and for detained mental health patients, "SOAD").
- C: NHS 111 is not mentioned on the nidirect "Urgent and emergency care services" page (first published 14 Dec 2015, last modified 28 Sep 2026). A specific 111-pilot search was not run, so this is "not found on nidirect", not proof of absence.

**Uncertainties and stale-looking pages:**
- **Mayo mental health page:** uses "PCCC" terminology and older local numbers, with no review date. Looks stale; prefer a current www2.hse.ie page if one exists.
- **LTI pages conflict:** the legacy contact page shows two phone numbers (an 1890 number and an 0818 number), and the two apply pages give different PO Box Eircodes (D11 XFF3 vs D11 XKF3). No contact details are in the row for this reason.
- **nidirect "contacts/omagh-hospital-and-primary-care-complex"** returned urgent-care article text in search, not a contact record. Treat as a redirect or mismatch; do not use.
- **South Tyrone Hospital:** the old southerntrust.hscni.net/SouthTyroneHospital.htm page carries a 2014 notice. Use only the /our-hospitals/ URL.
- **Naas visiting restrictions** (dated 18 Sep 2026) are temporary and are left out of the row.
- **Phone First:** nidirect lists four Trusts, not Belfast. A Southern Trust Phone First number contains "111" but is not NHS 111.
- **Snippet-only rows** (most of Part A): Elaine's browser read will be the first full read.

---

*Update 7 Oct 2026, after Elaine's decisions: see `LOCAL-SERVICES-PARENTING-2026-10-07-DECISIONS.md`. Where it differs from section 6 (hosts, NI county convention, LTI URL, Mayo), the decisions file wins.*
