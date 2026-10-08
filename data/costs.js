// "What you pay": medicines-cost and primary-care schemes (ROI and NI), one row per
// scheme. Standalone layer, like data/vaccines.js. Validate: node scripts/validate-costs.js
//
// Every row is verify: true / urlStatus: "search-result": the rules come from a research
// pass against official pages; no page was opened live in this repo's environment.
// Money figures can change at each Budget. Budget 2027 was announced on 6 Oct 2026 and
// has NOT been checked against these figures, so every amount is flagged volatile.
// Income and means-test thresholds are deliberately not stored: link to the official
// calculator instead.
//
// Fields: id, scheme, jurisdiction (ROI|NI), kind (medicines|gp|hospital|other),
// who, covers, cost (plain words), cap_amount (number|null), currency (EUR|GBP),
// cap_period, cap_unit (person|family|null), not_covered_note, how_to_apply,
// route_note (which scheme to look at instead or as well), compare (id),
// volatile (bool) + volatile_reason, conflict_note, source_url, source_name,
// source_page_review_date, last_verified, verify, urlStatus.
const COSTS_LAST_VERIFIED = "2026-10-08";
const BUDGET_NOTE = "Amounts can change at each Budget; Budget 2027 (6 Oct 2026) has not been checked against this figure.";

const COSTS = [
  // ---------- Republic of Ireland ----------
  { id: "roi-medical-card-prescriptions", scheme: "Medical card: prescription charge", jurisdiction: "ROI", kind: "medicines",
    who: "Medical card holders.",
    covers: "Prescribed items from the pharmacy.",
    cost: "€1.50 per item, up to €15 a month for a person or family. Over-70s pay €1 per item, up to €10 a month. No charge on items covered by the Long-Term Illness Scheme or on methadone. Any overpayment is refunded automatically.",
    cap_amount: 15, currency: "EUR", cap_period: "month", cap_unit: "family",
    how_to_apply: "Register a family certificate with your pharmacy so the monthly cap is applied.",
    route_note: "People on many medicines can hit the cap.",
    volatile: true, volatile_reason: BUDGET_NOTE,
    source_url: "https://www2.hse.ie/services/schemes-allowances/medical-cards/about-the-medical-card/prescription-charges/", source_name: "HSE: Prescription charges for medical card holders" },

  { id: "roi-dps", scheme: "Drugs Payment Scheme (DPS)", jurisdiction: "ROI", kind: "medicines",
    who: "Anyone ordinarily resident in the Republic of Ireland without a medical card. No means test.",
    covers: "Approved prescribed drugs and appliances, for example CPAP and oxygen rental. A DPS card also gives access to free HRT.",
    cost: "A family pays no more than €80 a month.",
    cap_amount: 80, currency: "EUR", cap_period: "month", cap_unit: "family",
    how_to_apply: "Apply online at the HSE or mydps.ie.",
    route_note: "Use one pharmacy a month, or claim a refund if you split purchases.",
    compare: "roi-lti", volatile: true, volatile_reason: BUDGET_NOTE,
    source_url: "https://www2.hse.ie/services/schemes-allowances/drugs-payment-scheme/card/", source_name: "HSE: Drugs Payment Scheme" },

  { id: "roi-lti", scheme: "Long-Term Illness Scheme (LTI)", jurisdiction: "ROI", kind: "medicines",
    who: "Anyone ordinarily resident in the Republic of Ireland with one of 16 listed conditions. No means test.",
    covers: "Medicines and appliances for the listed condition only.",
    cost: "Free, with no prescription charge. The 16 conditions are: acute leukaemia, cerebral palsy, cystic fibrosis, diabetes insipidus, diabetes mellitus (not gestational), epilepsy, haemophilia, hydrocephalus, intellectual disability, mental illness (under 16), muscular dystrophy, multiple sclerosis, parkinsonism, phenylketonuria, spina bifida, and thalidomide-related conditions.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Many common long-term conditions are not on the list, for example rheumatoid arthritis, inflammatory bowel disease and psoriasis. Medicines for other conditions are not covered.",
    how_to_apply: "HSE application form, with a GP or consultant medical report.",
    route_note: "If your condition isn't listed, look at the Drugs Payment Scheme or a medical card. You can hold LTI and DPS together.",
    compare: "roi-dps", volatile: false,
    source_url: "https://www2.hse.ie/services/schemes-allowances/lti/about/", source_name: "HSE: Long-Term Illness Scheme", source_page_review_date: "2025-12-19" },

  { id: "roi-gp-visit-card", scheme: "GP visit card", jurisdiction: "ROI", kind: "gp",
    who: "Automatic for children under 8, people aged 70 and over, and people getting Carer's Allowance or Benefit. Means-tested for ages 8 to 69.",
    covers: "GP visits and out-of-hours GP care.",
    cost: "Free GP visits.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Does not cover medicines or hospital charges. Check the income limits on the HSE page; they are not stored here.",
    how_to_apply: "Apply online with the HSE.",
    route_note: "Pair it with the Drugs Payment Scheme for medicine costs.",
    volatile: true, volatile_reason: "Income limits change; " + BUDGET_NOTE,
    source_url: "https://www2.hse.ie/services/schemes-allowances/gp-visit-cards/gp-visit-card-8-to-69/", source_name: "HSE: GP visit card (8 to 69)" },

  { id: "roi-medical-card", scheme: "Medical card", jurisdiction: "ROI", kind: "other",
    who: "Means-tested, or over-70s on a gross income test, or discretionary on medical or social grounds.",
    covers: "GP visits, prescriptions (with the prescription charge), public hospital services, and some dental, optical and aural services.",
    cost: "Low cost: the prescription charge applies. See that row.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "Income thresholds are not stored here; use the HSE assessment pages.",
    how_to_apply: "Apply with the HSE. The discretionary route can matter for high-cost illness.",
    compare: "roi-medical-card-prescriptions", volatile: true, volatile_reason: "Thresholds change; " + BUDGET_NOTE,
    source_url: "https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/medical-card-means-test-over-70s/", source_name: "Citizens Information: Medical card means test and over-70s" },

  { id: "roi-hospital-charges", scheme: "Public hospital charges", jurisdiction: "ROI", kind: "hospital",
    who: "Everyone, with exemptions.",
    covers: "Public inpatient and day-case care, and emergency department attendance.",
    cost: "Public inpatient and day-case charges were abolished on 17 April 2023. The emergency department charge is €100 if you go without a GP referral letter.",
    cap_amount: 100, currency: "EUR", cap_period: "visit", cap_unit: "person",
    not_covered_note: "A GP visit card does not exempt you from hospital charges.",
    route_note: "Exempt from the ED charge: medical card holders, people admitted from the ED, people with prescribed infectious diseases (including COVID-19), children under 6 weeks and children with listed conditions.",
    volatile: true, volatile_reason: BUDGET_NOTE,
    source_url: "https://www.citizensinformation.ie/en/health/health-services/gp-and-hospital-services/hospital-charges/", source_name: "Citizens Information: Hospital charges" },

  { id: "roi-free-hrt", scheme: "Free HRT", jurisdiction: "ROI", kind: "medicines",
    who: "Medical card or DPS card holders who are prescribed HRT.",
    covers: "HRT products at participating pharmacies, since 1 June 2025.",
    cost: "Free product.",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    not_covered_note: "The consultation is not covered; only the product is free.",
    how_to_apply: "Prescription plus your DPS or medical card.",
    compare: "roi-dps", volatile: true, volatile_reason: "Scheme is recent; participating pharmacies and products can change.",
    source_url: "https://www.citizensinformation.ie/en/health/health-services/reproductive-health/womens-health-in-ireland/", source_name: "Citizens Information: Women's health in Ireland" },

  { id: "roi-free-contraception", scheme: "Free contraception", jurisdiction: "ROI", kind: "other",
    who: "Women and people with a uterus aged 17 to 35, ordinarily resident with a PPSN; or medical card holders.",
    covers: "GP consultations, prescriptions, long-acting method fitting and removal, and emergency contraception.",
    cost: "Free. (The medical card prescription charge still applies to medical card holders.)",
    cap_amount: null, currency: "EUR", cap_period: null, cap_unit: null,
    how_to_apply: "Through a participating GP or clinic.",
    volatile: true, volatile_reason: "The age band has been widened before.",
    source_url: "https://www.citizensinformation.ie/en/health/health-services/reproductive-health/contraception/", source_name: "Citizens Information: Contraception" },

  // ---------- Northern Ireland ----------
  { id: "ni-free-prescriptions", scheme: "Free prescriptions", jurisdiction: "NI", kind: "medicines",
    who: "Everyone, automatically. There is no eligibility test.",
    covers: "Prescribed medication, wigs and surgical appliances.",
    cost: "Free.",
    cap_amount: null, currency: "GBP", cap_period: null, cap_unit: null,
    compare: "roi-dps", volatile: false,
    source_url: "https://www.nidirect.gov.uk/articles/health-costs-and-free-sight-tests-over-60s", source_name: "nidirect: Health costs and free sight tests" },

  { id: "ni-help-health-costs", scheme: "Help with health costs (HC1, HC2, HC3)", jurisdiction: "NI", kind: "other",
    who: "People on a low income, or on passported benefits. Universal Credit claimants whose earnings are above the passport thresholds claim through the HC1 form.",
    covers: "HSC dental charges, optical vouchers and travel to treatment. An HC2 certificate gives full help and an HC3 gives partial help, each for 12 months.",
    cost: "Depends on the certificate.",
    cap_amount: null, currency: "GBP", cap_period: null, cap_unit: null,
    how_to_apply: "Send the HC1 claim form. Low-income patients under a consultant can also claim hospital travel costs within 3 months.",
    conflict_note: "The Department of Health NI said on 5 Nov 2025 that eligible Universal Credit recipients are passported automatically from 1 Dec 2025, but the BSO page still says UC does not qualify automatically. Check both before relying on either.",
    volatile: true, volatile_reason: "Passporting rules changed in December 2025.",
    source_url: "https://www.nidirect.gov.uk/articles/help-health-costs", source_name: "nidirect: Help with health costs" },
].map(c => Object.assign({ last_verified: COSTS_LAST_VERIFIED, verify: true, urlStatus: "search-result" }, c));
