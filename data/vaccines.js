// "What's covered where": vaccination coverage matrix (ROI and NI), one row per
// service x setting x eligibility rule. Standalone layer, like data/conditions.js.
//
// Every row is verify: true / urlStatus: "search-result": the rules were taken from a
// research pass against official pages, but no page was opened live in this repo's
// environment. Secondary-only facts (news, pharmacy-body or HTA summaries) are left
// out on purpose; see GAPS.md. Volatile rows must be re-checked at the start of each
// season and after Budget day. Run: node scripts/validate-vaccines.js
//
// Fields: id, vaccine, jurisdiction (ROI|NI), setting[] (gp|pharmacy|hospital|private),
// who (eligibility, plain words), product_cost, admin_fee ("free" | "private_discretionary"
// | "standard" | "private" | "not_applicable"), fee_waived_if[] (card ids), not_covered_note,
// clinician_check (a prompt to ask a GP, specialist or pharmacist; never advice),
// season, valid_from, valid_to, volatile (bool + volatile_reason), conflict_note,
// compare (id of the other jurisdiction's row), source_url, source_name,
// source_page_review_date, last_verified, verify, urlStatus.
const VACCINE_LAST_VERIFIED = "2026-10-03";

const VACCINE_STATUS_LABELS = {
  free: "Free for eligible people",
  free_supply_fee_may_apply: "Vaccine free, a fee may apply",
  private: "Not publicly funded (private only)",
  not_available: "No public programme",
};

const VACCINES = [
  // ---------- Republic of Ireland ----------
  { id: "roi-flu-2026", vaccine: "Flu", jurisdiction: "ROI", status: "free", setting: ["gp", "pharmacy"],
    who: "Free for: people aged 60 and over; children and young people aged 2 to 17; healthcare workers; pregnant women; long-term care residents; people in regular contact with pigs, poultry or waterfowl; anyone aged 6 months and over with a listed condition (including immunosuppression due to disease or treatment, and cancer); household contacts and carers of people with those conditions. Nursing home residents and housebound people can be vaccinated at home.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    clinician_check: "The HSE page says people with severe neutropenia, or on combination checkpoint inhibitors, should check with their GP or specialist.",
    season: "2026/27", volatile: true, volatile_reason: "Seasonal campaign; eligibility and dates are reset each year.",
    source_url: "https://www2.hse.ie/conditions/flu/get-vaccine/", source_name: "HSE: Get the flu vaccine", source_page_review_date: "2026-09-25" },

  { id: "roi-covid-2026", vaccine: "COVID-19", jurisdiction: "ROI", status: "free", setting: ["gp", "pharmacy"],
    who: "Once a year: ages 60 to 79, and ages 6 months to 79 with a risk condition. Twice a year: ages 80 and over, long-term care residents aged 18 and over, and anyone aged 6 months and over with a weak immune system.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    compare: "ni-covid-2026", season: "2026/27", volatile: true, volatile_reason: "Seasonal; NIAC and HSE revise cohorts each autumn.",
    source_url: "https://www2.hse.ie/screening-and-vaccinations/covid-19-vaccine/get-the-vaccine/about-covid-19-vaccination/", source_name: "HSE: About COVID-19 vaccination" },

  { id: "roi-ppv23-gp", vaccine: "Pneumococcal (PPV23)", jurisdiction: "ROI", status: "free", setting: ["gp"],
    who: "Aged 65 and over, or aged 2 and over in an at-risk group (for example diabetes; chronic heart, lung, liver or kidney disease; a weak immune system from disease or treatment, including cancer; spleen problems).",
    product_cost: "Free (HSE supply)", admin_fee: "standard", fee_waived_if: ["medical card", "GP visit card"],
    clinician_check: "Whether you count as at risk, and whether a different pneumococcal vaccine comes first, is for your GP to confirm.",
    not_covered_note: "Without a medical card or GP visit card, a GP consultation fee may apply.",
    compare: "roi-ppv23-pharmacy", volatile: true, volatile_reason: "Routes changed on 1 May 2026; the HSE condition page is past its review date.",
    source_url: "https://www2.hse.ie/conditions/pneumococcal-vaccine/", source_name: "HSE: Pneumococcal vaccine", source_page_review_date: "2026-09-20" },

  { id: "roi-ppv23-pharmacy", vaccine: "Pneumococcal (PPV23)", jurisdiction: "ROI", status: "free_supply_fee_may_apply", setting: ["pharmacy"],
    who: "From 1 May 2026, healthy people aged 65 and over only: none of the NIAC Group A or B risk factors, no PPV23 since turning 65, and none in the last 5 years. At-risk adults, including people who are immunosuppressed, use the GP route instead. Under 65 in a pharmacy is fully private.",
    product_cost: "Free (HSE supply)", admin_fee: "private_discretionary", fee_waived_if: ["medical card", "GP visit card", "Health (Amendment) Act card"],
    not_covered_note: "Without one of those cards the pharmacist may charge a private fee for giving the vaccine.",
    valid_from: "2026-05-01", compare: "roi-ppv23-gp", volatile: true, volatile_reason: "New pharmacy route; HSE public page does not yet describe the limits.",
    conflict_note: "The public HSE page says only that it \"may be available for free through your pharmacy\" for 65+. The pharmacy circular is more precise and is used here.",
    source_url: "https://about.hse.ie/api/v2/download-file/healthcare_professional_publications/Pharmacy_Circular_NCO-15-2026_Public_Pneumococcal_P_tIwkZqE.pdf/", source_name: "HSE Circular NCO-15-2026 (23 Apr 2026)" },

  { id: "roi-shingles", vaccine: "Shingles (Shingrix)", jurisdiction: "ROI", status: "private", setting: ["private"],
    who: "No public programme. Available privately from a GP or pharmacy.",
    product_cost: "Paid privately", admin_fee: "private", fee_waived_if: [],
    not_covered_note: "Not covered by a medical card or the Drugs Payment Scheme.",
    compare: "ni-shingles", volatile: true, volatile_reason: "Policy under political pressure; HIQA assessed it in 2024 and did not recommend funding at the current price.",
    source_url: "https://www2.hse.ie/conditions/shingles/", source_name: "HSE: Shingles" },

  { id: "roi-rsv-adult", vaccine: "RSV (adults)", jurisdiction: "ROI", status: "not_available", setting: ["private"],
    who: "No RSV programme for older adults as of April 2026 (HIQA).",
    product_cost: "Paid privately", admin_fee: "private", fee_waived_if: [],
    compare: "ni-rsv-adult", volatile: true, volatile_reason: "HIQA assessment informs policy for 2026/27 onwards.",
    source_url: "https://www.hiqa.ie/sites/default/files/2026-04/RSV-HTA.pdf", source_name: "HIQA: RSV health technology assessment (April 2026)" },

  // ---------- Northern Ireland ----------
  { id: "ni-flu-2026", vaccine: "Flu", jurisdiction: "NI", status: "free", setting: ["gp", "pharmacy"],
    who: "Free for eligible groups. Programme starts 1 Oct 2026. Community pharmacies vaccinate adults aged 18 and over only; children go through the GP or school nursing.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    season: "2026/27", valid_from: "2026-10-01", volatile: true, volatile_reason: "Seasonal; cohort list comes from the PHA operational letter.",
    source_url: "https://www.nidirect.gov.uk/flu", source_name: "nidirect: Flu vaccine" },

  { id: "ni-covid-2026", vaccine: "COVID-19", jurisdiction: "NI", status: "free", setting: ["gp", "pharmacy"],
    who: "Autumn 2026: people aged 75 and over, care home residents, and immunosuppressed people aged 6 months and over. Pharmacies vaccinate adults aged 18 and over.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    not_covered_note: "Unlike the Republic of Ireland, under-75s with a chronic condition who are not immunosuppressed are not in the autumn 2026 cohorts.",
    clinician_check: "Ask your GP or specialist whether you count as immunosuppressed.",
    compare: "roi-covid-2026", season: "2026/27", volatile: true, volatile_reason: "Seasonal; set by JCVI advice each year.",
    source_url: "https://www.nidirect.gov.uk/articles/covid-19-vaccine", source_name: "nidirect: COVID-19 vaccine" },

  { id: "ni-shingles", vaccine: "Shingles (Shingrix)", jurisdiction: "NI", status: "free", setting: ["gp"],
    who: "Aged 65 or 70 on 1 September (age cohorts), and, since 1 September 2025, severely immunosuppressed adults aged 18 and over with no upper age limit.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    clinician_check: "\"Severely immunosuppressed\" follows the UK Green Book definition. Ask your GP or specialist whether you are covered.",
    compare: "roi-shingles", volatile: true, volatile_reason: "Cohorts have been widened recently.",
    conflict_note: "The nidirect shingles page still carries older text (80 and over not eligible) that conflicts with the PHA cohorts. PHA is treated as primary.",
    source_url: "https://www.publichealth.hscni.net/publications/shingles-vaccine-help-protect-you-pain-shingles", source_name: "Public Health Agency: Shingles vaccine leaflet" },

  { id: "ni-rsv-adult", vaccine: "RSV (adults)", jurisdiction: "NI", status: "free", setting: ["gp"],
    who: "Adults turning 75, aged 75 to 79, and aged 80 and over (added from 1 April 2026); care home residents; pregnant women. Age-based only: there is no immunosuppression cohort. Trust teams reach care homes and housebound people.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    compare: "roi-rsv-adult", volatile: true, volatile_reason: "Programme was expanded in April 2026.",
    source_url: "https://www.publichealth.hscni.net/news/call-get-vaccinated-rsv-programme-expanded", source_name: "Public Health Agency: RSV programme expanded" },

  { id: "ni-pneumococcal", vaccine: "Pneumococcal", jurisdiction: "NI", status: "free", setting: ["gp"],
    who: "Aged 65 and over, and people with particular health conditions.",
    product_cost: "Free", admin_fee: "free", fee_waived_if: [],
    clinician_check: "Ask your GP which pneumococcal vaccine applies to you.",
    volatile: true, volatile_reason: "The UK Green Book (June 2025) expected PCV20 to replace PPV23 for adults in late 2025/early 2026.",
    conflict_note: "No Public Health Agency source confirming the switch in NI was found, so the vaccine name is deliberately not stated.",
    source_url: "https://www.publichealth.hscni.net/publications/pneumococcal-vaccine-helping-protect-against-pneumonia-meningitis-and-other-serious", source_name: "Public Health Agency: Pneumococcal vaccine leaflet" },
].map(v => Object.assign({ last_verified: VACCINE_LAST_VERIFIED, verify: true, urlStatus: "search-result", source_type: "primary" }, v));
