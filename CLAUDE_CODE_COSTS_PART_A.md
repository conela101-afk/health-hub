# Claude Code: merge brief for cost schemes, Part A (9 Oct 2026)

Adds nine "What you pay" rows to `data/costs.js` from a research pass run on 9 Oct 2026, edits three existing rows, fixes one Advocacy-guide sentence, and adds `revenue.ie` to the approved hosts. Research only, so every row is unverified: `verify: true`, `urlStatus: "search-result"`, no `checked`, no `opened`. Do not clear `verify`; only Elaine does, after opening each page in a browser.

Work on a branch, open a PR, never push to `main`. Before and after: file sizes, `node --check data/costs.js data.js app.js sw.js`. After: `node scripts/validate-costs.js`, `validate-data.js`, `validate-screening.js`, `validate-vaccines.js`, `search-audit.js`. Recount entries by script; quote no counts.

## Decisions from Elaine (already made)
- **revenue.ie is an approved host (9 Oct 2026),** for tax-relief-on-medical-expenses pages only. Official source, not `voluntary`.

## Defaults I have chosen (Elaine can change)
1. **High Tech Drugs row is withheld.** The only source is a staff-facing PCRS form on the old `hse.ie/eng/staff/` URL family, and no patient-facing HSE page was found. Draft is at the end of this file. Un-withhold when a current `www2.hse.ie` patient page is read.
2. **Use `kind: "other"` for the three rows that fit no kind.** The research proposed `care`, `tax-relief` and `dental-optical`. Adding kinds means changing `KINDS` in `validate-costs.js`, `COST_KIND_LABELS` in `app.js` and the filter; not in this PR.
3. **Drop the "20%" and "Med 1" wording from the Advocacy guide** (below) rather than re-quote a Budget-sensitive rate.

## 1. Host approval
- `scripts/validate-costs.js` `SOURCE_DOMAINS`: add `"revenue.ie"`. Without it the tax-relief row fails.
- `scripts/validate-data.js` `SOURCE_DOMAINS` (the source of truth per `AI_RULES.md`): add `"revenue.ie"`. Leave the screening and vaccine validators alone.
- `AI_RULES.md`: record revenue.ie as approved 9 Oct 2026, scoped as above.

## 2. New rows for `data/costs.js`
Match the existing file style. The trailing `.map(...)` already supplies `verify` and `urlStatus`, so they are not repeated; `last_verified` is set per row to the research date (do not bump `COSTS_LAST_VERIFIED`). No money figures, thresholds or percentages in any row. Insert the ROI rows before the cross-border section and the NI rows at the end of the NI section.

Compare links (all point at real ids): fair-deal ↔ home-support; tax-relief → fair-deal; additional-needs-payment → roi-medical-card; aids → roi-lti; dtss → roi-treatment-benefit; eye-care → roi-treatment-benefit; both NI rows → ni-help-health-costs.

```js
  { id: "roi-fair-deal", scheme: "Fair Deal (Nursing Homes Support Scheme)", jurisdiction: "ROI", kind: "other",
    who: "Citizens Information says the scheme is for people ordinarily resident in Ireland who need long-term nursing home care. The HSE assesses care needs and finances.",
    covers: "Long-term care in approved public, private and voluntary nursing homes. Citizens Information lists accommodation and food, nursing and personal care, laundry, and basic aids and appliances.",
    cost: "The HSE page says you pay a contribution worked out by a financial assessment and the HSE pays the balance. Your contribution is fixed and is the same for any approved nursing home.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Not covered: short-term care such as respite, convalescent or day care, and extra nursing home fees for things like hairdressing, therapies or activities. The HSE says funding is not backdated and is paid only from the date of approval.",
    how_to_apply: "Fill in the Nursing Homes Support Scheme application form and send it with your documents to your local Nursing Homes Support Office. The HSE then arranges a care needs assessment and a financial assessment. An optional nursing home loan can be applied for on the same form.",
    route_note: "For care at home instead, see Home Support. For tax relief on what you pay yourself, see the health expenses tax relief row.",
    compare: "roi-home-support", volatile: true, volatile_reason: "Contribution rules and the published nursing home price lists change. " + BUDGET_NOTE,
    last_verified: "2026-10-09",
    source_url: "https://www2.hse.ie/services/schemes-allowances/fair-deal-scheme/about/", source_name: "HSE: About the Fair Deal scheme" },

  { id: "roi-home-support", scheme: "HSE Home Support Service", jurisdiction: "ROI", kind: "other",
    who: "The HSE page says the service is for people aged 65 or over who need help to keep living at home or to return home after a hospital stay. It says some people under 65 may also qualify, for example people with early onset dementia or a disability.",
    covers: "Help with everyday tasks such as getting in and out of bed, dressing and undressing, and personal care, delivered by the HSE or an HSE-approved provider. Consumer Directed Home Support (CDHS) is an option that lets you choose approved providers.",
    cost: "The HSE says the service is free and you do not need a medical card to apply. Citizens Information says it is not means-tested.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "You pay yourself for any home support beyond what the HSE offers. Citizens Information says the service cannot provide 24-hour care and does not replace informal care.",
    how_to_apply: "Get the Home Support application form online or from your local Home Support Office, fill it in and post it to that office. If you are in hospital, ask the person managing your discharge. A care needs assessment follows.",
    route_note: "For long-term nursing home care, see Fair Deal.",
    compare: "roi-fair-deal", volatile: true, volatile_reason: "Citizens Information says a law regulating home support providers was passed in June 2026. No official page read describes a statutory home support scheme, so this row says nothing about one.",
    last_verified: "2026-10-09",
    source_url: "https://www2.hse.ie/services/home-support-service/home-support-service-for-older-people/", source_name: "HSE: Home Support Service for older people" },

  { id: "roi-additional-needs-payment", scheme: "Additional Needs Payment (Supplementary Welfare Allowance)", jurisdiction: "ROI", kind: "other",
    who: "Citizens Information says a Community Welfare Officer assesses each application individually. See the page for who can apply.",
    covers: "Citizens Information describes it as a payment towards an essential expense you cannot pay from your weekly income or other sources. Its examples include recurring travel costs to hospital for appointments or to visit a relative in hospital.",
    cost: "A payment, not a charge. See the official page for amounts.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Citizens Information says it does not cover non-essential expenses or costs that are the responsibility of another government department or agency.",
    how_to_apply: "Citizens Information says you can apply online through MyWelfare.ie, post an application form (SWA1), or make an appointment with your local Community Welfare Officer.",
    route_note: "A hardship route. For help with medical costs, see the discretionary route on the medical card row.",
    compare: "roi-medical-card", volatile: true, volatile_reason: "Means-tested; income limits are set by the Department of Social Protection and are not stored here.",
    last_verified: "2026-10-09",
    source_url: "https://www.citizensinformation.ie/en/social-welfare/supplementary-welfare-schemes/additional-needs-payment/", source_name: "Citizens Information: Additional Needs Payment" },

  { id: "roi-aids-appliances", scheme: "HSE aids and appliances (community funded)", jurisdiction: "ROI", kind: "other",
    who: "People whom a trained HSE health professional, such as an occupational therapist, physiotherapist or public health nurse, assesses as having a clinical need for equipment to support daily living.",
    covers: "Aids, appliances and assistive technology from the HSE national list, such as mobility aids, aids for daily living, bed aids and therapeutic aids.",
    cost: "Citizens Information says prescribed aids and appliances are free if you have a medical card, a Health Amendment Act card or are on the Long-Term Illness Scheme. What others pay is not stated on the pages read.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "The HSE says items should match essential clinical need only; higher-specification features that are desirable rather than essential should not be prescribed.",
    how_to_apply: "Citizens Information says you can apply to your local primary care centre for an occupational therapist, or be referred by a public health nurse, GP, physiotherapist, speech and language therapist or hospital.",
    route_note: "See the Long-Term Illness row for condition-specific appliances. Fair Deal covers basic aids in a nursing home.",
    compare: "roi-lti", volatile: false,
    last_verified: "2026-10-09", source_page_review_date: "2025-10-30",
    source_url: "https://www.citizensinformation.ie/en/health/health-services/care-in-your-community/occupational-therapy-services/", source_name: "Citizens Information: Occupational therapy services" },

  { id: "roi-dtss", scheme: "Dental Treatment Services Scheme (DTSS)", jurisdiction: "ROI", kind: "other",
    who: "Citizens Information says the scheme is for medical card holders aged 16 or over.",
    covers: "Citizens Information lists a free dental examination each calendar year, any extractions needed, a limited number of fillings, one scale and polish each year, one first-stage root canal on a front tooth each year, denture repairs, and control of dental bleeding. Other treatments, including dentures, need prior approval from the local HSE Principal Dental Surgeon.",
    cost: "Citizens Information describes the listed treatments as free under the scheme.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Citizens Information says adults aged 18 or over do not get orthodontic treatment (such as braces) on the medical card. Some treatments need prior HSE approval.",
    how_to_apply: "There is no separate application. Use a dentist who takes part in the DTSS; Citizens Information says your local primary care centre may have a list.",
    route_note: "Without a medical card, see PRSI Treatment Benefit. Citizens Information says children's dental care is through HSE dental clinics and school check-ups.",
    compare: "roi-treatment-benefit", volatile: true, volatile_reason: "Which treatments are covered, and how often, can change. Citizens Information's Budget 2027 coverage mentions children's dental care; re-read once the measures are published. " + BUDGET_NOTE,
    last_verified: "2026-10-09", source_page_review_date: "2026-09-02",
    source_url: "https://www.citizensinformation.ie/en/health/health-services/dental-aural-and-optical-services/dental-services/", source_name: "Citizens Information: Dental services" },

  { id: "roi-eye-care", scheme: "HSE eye care for medical card holders and children", jurisdiction: "ROI", kind: "other",
    who: "Citizens Information frames this for medical card holders, and for children through HSE developmental checks and school health screening.",
    covers: "Citizens Information says medical card holders can get regular free eye examinations from the HSE (more often if a medical condition requires it) and free standard spectacles if needed. Children whose sight problems are found at school health checks may be referred for treatment.",
    cost: "Free for the groups the page describes.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Citizens Information says people outside these groups may need to pay a private optician, and that routine sight tests, glasses and contact lenses do not get tax relief.",
    how_to_apply: "Citizens Information says medical card holders apply to their local primary care centre for eye exams and dispensing. Children are referred through the school health service or developmental checks.",
    route_note: "Without a medical card, see PRSI Treatment Benefit. Diabetic retina screening is a separate free HSE programme (see the screening layer).",
    compare: "roi-treatment-benefit", volatile: true, volatile_reason: "How often exams are allowed and the age rules for children can change.",
    last_verified: "2026-10-09", source_page_review_date: "2025-10-03",
    source_url: "https://www.citizensinformation.ie/en/health/health-services/dental-aural-and-optical-services/sight-tests-and-eye-health/", source_name: "Citizens Information: Sight tests and eye health" },

  { id: "roi-health-expenses-tax-relief", scheme: "Tax relief on health expenses (previously claimed on Form Med 1)", jurisdiction: "ROI", kind: "other",
    who: "Revenue says you can claim for health expenses you paid, whether your own, a family member's or anyone else's. Relief comes as a tax refund, so you must have paid tax in that year.",
    covers: "Qualifying health expenses not paid back by insurance, the HSE or any other source. Citizens Information's list includes doctor and consultant fees, hospital and nursing home care, prescribed drugs, and certain non-routine dental treatment.",
    cost: "Relief is given at the standard rate of tax, and nursing home expenses at your highest rate. See the Revenue page for the current rates.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Citizens Information says routine dental treatment (extractions, scaling, fillings, dentures) and routine sight tests, glasses and contact lenses do not qualify, and neither do amounts already paid back to you.",
    how_to_apply: "Revenue says the Med 1 form is no longer available. Claim through myAccount (PAYE, at the end of the year or in real time during it) or on your Form 11 in ROS if you are self-assessed. Keep your receipts.",
    route_note: "Fair Deal contributions and other nursing home fees are claimed under this relief.",
    compare: "roi-fair-deal", volatile: true, volatile_reason: "Tax rates are set in each Budget. Citizens Information's Budget 2027 page says some measures may change when the legislation is enacted; its health section was not read in full. " + BUDGET_NOTE,
    last_verified: "2026-10-09", source_page_review_date: "2026-06-12",
    source_url: "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/health-and-age/health-expenses/index.aspx", source_name: "Revenue: Health expenses" },
```
NI rows (append after `ni-help-health-costs`):
```js
  { id: "ni-dental-charges", scheme: "Health Service dental charges", jurisdiction: "NI", kind: "other",
    who: "People who use a Health Service dentist in Northern Ireland. nidirect lists groups who get free treatment, including under-18s, 18-year-olds in full-time education, people who are pregnant or had a baby in the 12 months before treatment starts, and people on certain benefits.",
    covers: "Health Service dental treatment, including examinations, x-rays, scale and polish, fillings, root canal, extractions, crowns, bridges and dentures.",
    cost: "nidirect says Health Service dentists charge from a set scale published each year in the Statement of Dental Remuneration. Some groups are free, and people on a low income may get help through the Low Income Scheme.",
    cap_amount: null, currency: "GBP", cap_period: null, cap_unit: null,
    not_covered_note: "Each private practice sets its own prices. nidirect says both Health Service and private dentists can charge for a missed appointment, and some free-treatment groups may still pay for dentures and bridges.",
    how_to_apply: "Contact dental practices to register as a Health Service patient; you may have to join a waiting list. Tell the dentist if you are in a free-treatment group. For low-income help, use form HC1.",
    route_note: "See the help with health costs (HC1, HC2, HC3) row.",
    compare: "ni-help-health-costs", volatile: true, volatile_reason: "The scale of charges is republished each year.",
    last_verified: "2026-10-09",
    source_url: "https://www.nidirect.gov.uk/articles/seeing-dentist", source_name: "nidirect: Seeing a dentist" },

  { id: "ni-sight-tests", scheme: "Free Health Service sight tests and optical vouchers", jurisdiction: "NI", kind: "other",
    who: "nidirect lists groups entitled to free Health Service sight tests, including people aged 60 or over, people diagnosed with diabetes or glaucoma (or at risk of glaucoma), people registering as blind or partially sighted, people on certain benefits, and holders of a valid HC2 or HC3 certificate.",
    covers: "Free Health Service sight tests. Some groups may also get a voucher towards glasses or contact lenses, including people prescribed complex lenses.",
    cost: "Free for the groups listed on the page. Others pay the optician's charge.",
    cap_amount: null, currency: "GBP", cap_period: null, cap_unit: null,
    not_covered_note: "This row covers the groups the page lists. It does not cover children's entitlements.",
    how_to_apply: "Tell your optician which group you are in when you go. For low-income help, claim on form HC1.",
    route_note: "See the help with health costs (HC1, HC2, HC3) row.",
    compare: "ni-help-health-costs", volatile: true, volatile_reason: "Benefit-linked earnings limits on the page change.",
    last_verified: "2026-10-09",
    source_url: "https://www.nidirect.gov.uk/articles/health-costs-and-free-sight-tests-over-60s", source_name: "nidirect: Health costs and free sight tests for over 60s" },
```
Notes on what changed from the research draft: figures and "Not shown" dates removed (the validator needs `YYYY-MM-DD`, so NI rows and the HSE rows carry no `source_page_review_date`); an unapproved-host reference removed from the Home Support volatile reason; the Fair Deal cap figure removed; a vague child-glasses sentence removed from eye care; the NI dental source is the canonical `seeing-dentist` URL.

## 3. Edits to existing rows (all in `data/costs.js`)
- **`roi-medical-card`:** add `route_note: "If income is above the means-test threshold, the HSE page says medical officers can consider whether medical bills would cause financial hardship and may grant a discretionary card. See also Additional Needs Payment."` The claim comes from https://www2.hse.ie/services/schemes-allowances/medical-cards/applying/how-much-you-can-earn/ (page date not shown). Keep `source_url` as is; put the HSE URL in a code comment above the row and in the `CHANGELOG.md` entry. No thresholds.
- **`roi-treatment-benefit`:** append to `route_note`: " Medical card holders: see the Dental Treatment Services Scheme and HSE eye care rows."
- **`ni-help-health-costs`:** add `route_note: "See also the Health Service dental charges and free sight tests rows."` (cross-reference only; the nidirect page was not read in full, so no new facts).

## 4. Advocacy guide sentence (`data.js`, tip in `adult-adhd-autism-diagnosis`)
Replace the clause "and you can claim 20% back on qualifying private assessment/treatment costs via Revenue's Med 1 health expenses relief." with: "and you may be able to claim tax relief on qualifying health expenses, including some private assessment and treatment costs, through Revenue's health expenses relief (formerly claimed on Form Med 1). Check Revenue's page for the current rate." Leave the Drug Payment Scheme `€80` clause alone: it is on the P0.4 re-read list. Search `data.js`, `tools.js` and `app.js` for other "Med 1" or "Med1" mentions and report them; do not change any not listed here.

## 5. Housekeeping
- `sw.js`: costs data is precached, so bump the cache (`pocket-guide-v23` → `v24`).
- `GAPS.md` (around line 461): remove the schemes now covered from the "Not started" list. High Tech Drugs, the basic Supplementary Welfare Allowance page and Community Ophthalmic Services (HSE patient page not found; the eye care row uses Citizens Information) stay on it.
- `HUMAN-CHECKS.md`: add the nine new `source_url`s for Elaine's browser check.
- End with one `CHANGELOG.md` entry and one "Recent AI sessions" line, e.g. "9 Oct 2026: nine cost-scheme rows (Part A), revenue.ie approved, Med 1 wording fixed. Unverified."

## Still open (Elaine)
- Open each new `source_url`; only then clear `verify`.
- Whether to add the `care`, `tax-relief` and `dental-optical` kinds.
- A patient-facing HSE page for High Tech Drugs, and the HSE discretionary medical card page (seen only as a snippet).
- Re-read the volatile rows (tax relief, Fair Deal, DTSS, NI charges) once the Budget 2027 measures are published.
- The unrelated cost-layer conflicts from 8 Oct (NIPHS, NI UC wording) are not part of this brief.

## Withheld draft (do not merge)
`roi-high-tech-drugs`: "High Tech Drugs arrangement", kind `medicines`. Who: the HSE nomination form frames it for people prescribed a High Tech medicine who are already on a scheme such as the medical card, DPS, LTI or Health Amendment Act card. Covers: certain high-cost medicines the HSE arranges to be supplied through a pharmacy the patient nominates. Cost: Citizens Information says there is no prescription charge for High Tech medicines; what people without a medical card pay is not stated on the pages read. How to apply: the patient chooses a nominated pharmacy and signs a nomination form, which the pharmacy sends with the prescription to the HSE PCRS High Tech unit; ask your prescribing team or pharmacy. Sources: `hse.ie/eng/staff/pcrs/online-services/assign-nominated-pharmacy-for-new-high-tech-clients-.pdf` (staff-facing, two versions in circulation) and the Citizens Information prescription-charges page (edited 25 Jun 2025). Un-withhold when a current `www2.hse.ie` patient page is read.
