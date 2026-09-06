// The Pocket Guide — service directory data
// Structure is deliberately flat so new counties/specialties can be appended later.
//
// Optional per-entry field: checked: "D Mon YYYY" — the date this specific
// entry's contact details were actually verified against a live source.
// Only added going forward, to entries genuinely checked on that date — not
// backfilled onto older entries just to make them look current. An entry
// with no `checked` field simply predates the convention; that's honest,
// not a defect.

// Alphabetical by label, deliberately — an earlier ordering led with the
// women's-health-specific categories (maternity, gynae...) before general
// medicine, which visually reinforced a "women's health first" framing the
// site was trying to move away from. Alphabetical has no editorial bias.
const SPECIALTIES = [
  { id: "addiction",       label: "Addiction & Substance Use" },
  { id: "adultdisability", label: "Adult Disability Services" },
  { id: "allergy",         label: "Allergy & Immunology" },
  { id: "alliedhealth",    label: "Allied Health (Physio, OT, SLT, Podiatry)" },
  { id: "bonehealth",      label: "Bone Health & Osteoporosis" },
  { id: "feeding",         label: "Breastfeeding & Infant Feeding" },
  { id: "oncology",        label: "Cancer Care (General & Adult Oncology)" },
  { id: "cardiology",      label: "Cardiology" },
  { id: "camhs",           label: "Child & Adolescent Mental Health (CAMHS)" },
  { id: "childdisability", label: "Children's Disability Services & Early Intervention" },
  { id: "pain",            label: "Chronic Pain Management" },
  { id: "hub",             label: "Community Hubs & Family Resource Centres" },
  { id: "contraception",   label: "Contraception & Reproductive Health" },
  { id: "dental",          label: "Dental & Oral Health" },
  { id: "dermatology",     label: "Dermatology & Skin" },
  { id: "dsv",             label: "Domestic & Sexual Violence Support" },
  { id: "eating",          label: "Eating Disorders" },
  { id: "diabetes",        label: "Endocrinology & Diabetes" },
  { id: "endo",            label: "Endometriosis" },
  { id: "ent",             label: "ENT & Audiology" },
  { id: "fertility",       label: "Fertility & IVF" },
  { id: "gastro",          label: "Gastroenterology & IBD" },
  { id: "paediatrics",     label: "General Paediatrics" },
  { id: "genetics",        label: "Genetics & Hereditary Cancer Risk" },
  { id: "cancer",          label: "Gynaecological & Breast Cancer" },
  { id: "gynae",           label: "Gynaecology" },
  { id: "haematology",     label: "Haematology & Blood Disorders" },
  { id: "longcovid",       label: "Long Covid & ME/CFS" },
  { id: "obs",             label: "Maternity & Obstetrics" },
  { id: "mens-health",     label: "Men's Health & Prostate" },
  { id: "menopause",       label: "Menopause" },
  { id: "crisis",          label: "Mental Health Crisis Support" },
  { id: "adultmh",         label: "Mental Health Services (General Adult)" },
  { id: "nephrology",      label: "Nephrology & Kidney" },
  { id: "neurodiversity",  label: "Neurodiversity (Autism, ADHD)" },
  { id: "neurology",       label: "Neurology & Migraine" },
  { id: "olderpersons",    label: "Older Persons & Geriatric Medicine" },
  { id: "ophthalmology",   label: "Ophthalmology & Eye Care" },
  { id: "orthopaedics",    label: "Orthopaedics" },
  { id: "palliative",      label: "Palliative & End-of-Life Care" },
  { id: "parenting",       label: "Parenting & New Motherhood" },
  { id: "pelvicphysio",    label: "Pelvic Health Physiotherapy" },
  { id: "mh",              label: "Perinatal & Maternal Mental Health" },
  { id: "loss",            label: "Pregnancy & Baby Loss" },
  { id: "phn",             label: "Public Health Nursing" },
  { id: "respiratory",     label: "Respiratory Medicine & CF" },
  { id: "rheumatology",    label: "Rheumatology & Autoimmune" },
  { id: "sexualhealth",    label: "Sexual Health & STI Testing" },
  { id: "stroke",          label: "Stroke" },
  { id: "urology",         label: "Urology" },
  { id: "vascular",        label: "Vascular" },
  { id: "weightmanagement", label: "Weight Management & Bariatric Care" },
];

// All 32 traditional counties (26 Republic + 6 Northern Ireland), so every
// county has somewhere to browse even before it has entries. Cork keeps its
// existing sub-area split (already used by real entries); other counties
// start empty and are populated as service data is researched.
const COUNTIES = [
  { id: "cork-city",  label: "Cork City" },
  { id: "cork-north", label: "North Cork" },
  { id: "cork-west",  label: "West Cork" },
  { id: "carlow",     label: "Carlow" },
  { id: "cavan",      label: "Cavan" },
  { id: "clare",      label: "Clare" },
  { id: "donegal",    label: "Donegal" },
  { id: "dublin",     label: "Dublin" },
  { id: "galway",     label: "Galway" },
  { id: "kerry",      label: "Kerry" },
  { id: "kildare",    label: "Kildare" },
  { id: "kilkenny",   label: "Kilkenny" },
  { id: "laois",      label: "Laois" },
  { id: "leitrim",    label: "Leitrim" },
  { id: "limerick",   label: "Limerick" },
  { id: "longford",   label: "Longford" },
  { id: "louth",      label: "Louth" },
  { id: "mayo",       label: "Mayo" },
  { id: "meath",      label: "Meath" },
  { id: "monaghan",   label: "Monaghan" },
  { id: "offaly",     label: "Offaly" },
  { id: "roscommon",  label: "Roscommon" },
  { id: "sligo",      label: "Sligo" },
  { id: "tipperary",  label: "Tipperary" },
  { id: "waterford",  label: "Waterford" },
  { id: "westmeath",  label: "Westmeath" },
  { id: "wexford",    label: "Wexford" },
  { id: "wicklow",    label: "Wicklow" },
  { id: "antrim",     label: "Antrim (NI)" },
  { id: "armagh",     label: "Armagh (NI)" },
  { id: "down",       label: "Down (NI)" },
  { id: "fermanagh",  label: "Fermanagh (NI)" },
  { id: "londonderry", label: "Derry / Londonderry (NI)" },
  { id: "tyrone",     label: "Tyrone (NI)" },
  { id: "national",   label: "National" },
];

// Each entry: id, name, specialty[], county[], blurb, details[], referral, contact{phone,email,web,address}
const ENTRIES = [
  {
    id: "cumh-antenatal",
    name: "CUMH Antenatal & Maternity Care",
    specialty: ["obs"],
    county: ["cork-city"],
    blurb: "Booking, antenatal care, labour & birth, postnatal care.",
    details: [
      "Public care: refer via GP as soon as pregnancy is confirmed.",
      "Choice of consultant-led, midwifery-led (Cois Tí outreach clinics), or private care.",
      "Cois Tí brings maternity & gynae care into the community for low-risk pregnancies."
    ],
    referral: "GP referral (public); self-arranged for private care.",
    contact: { phone: "021 492 0500", web: "www2.hse.ie/services/hospitals/cork-university-maternity-hospital/", address: "CUMH, Wilton, Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-epu",
    name: "Early Pregnancy Unit (EPU)",
    specialty: ["obs", "gynae", "loss"],
    county: ["cork-city"],
    blurb: "Bleeding or pain in early pregnancy, suspected miscarriage.",
    details: [
      "Located at Kinsale Road Clinic. Mon–Fri, 08:00–13:00.",
      "By appointment; GP or CUMH referral.",
      "Ward 2 South is the dedicated pregnancy loss & gynaecology ward for inpatient care."
    ],
    referral: "GP or CUMH referral.",
    contact: { phone: "021 492 7441", address: "Kinsale Road Clinic, Cork" },
    resources: [
      { label: "Miscarriage — patient.info", url: "https://patient.info/pregnancy/miscarriage-and-bleeding-in-early-pregnancy" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-loss",
    name: "Pregnancy Loss / Bereavement Team",
    specialty: ["obs", "loss"],
    county: ["cork-city"],
    blurb: "Led by Prof. Keelin O'Donoghue with Clinical Midwife Specialists in Bereavement & Loss.",
    details: ["Contact via CUMH main reception; ask specifically for the Bereavement & Loss team."],
    referral: "Ask for this team by name via CUMH.",
    contact: { phone: "021 492 0500", address: "CUMH, Wilton, Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-birth-reflections",
    name: "Birth Reflections Service",
    specialty: ["obs", "mh"],
    county: ["cork-city"],
    blurb: "A midwife-led listening service for processing a difficult or traumatic birth.",
    details: ["Self-referral or via your GP/PHN — ask CUMH switchboard to connect you."],
    referral: "Self-referral possible.",
    contact: { phone: "021 492 0500", address: "CUMH, Wilton, Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-social-work",
    name: "Maternity & Neonatal Social Work",
    specialty: ["obs"],
    county: ["cork-city"],
    blurb: "Free practical and emotional support service.",
    details: ["Referral by your medical team."],
    referral: "Via medical team.",
    contact: { phone: "021 492 0500" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-ambulatory-gynae",
    name: "Ambulatory Gynaecology Clinic",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Minor gynaecological procedures, Ward 4 South, CUMH.",
    details: ["GP referral required."],
    referral: "GP referral.",
    contact: { address: "Ward 4 South, CUMH" }
  },
  {
    id: "cumh-endo",
    name: "Endometriosis Service",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Part of CUMH Women's Health services.",
    details: ["GP referral. Ask specifically to be referred for suspected endometriosis, not just 'pelvic pain' — this affects triage."],
    referral: "GP referral (name the suspected condition).",
    contact: { web: "www2.hse.ie/services/hospitals/cork-university-maternity-hospital/" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-urogynae",
    name: "Urogynaecology",
    specialty: ["gynae", "urology"],
    county: ["cork-city"],
    blurb: "Prolapse, incontinence, pelvic floor issues.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for Urogynaecology." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-gynae-onc",
    name: "Gynae-Oncology & Rapid Access Suspected Ovarian Cancer",
    specialty: ["gynae", "cancer"],
    county: ["cork-city"],
    blurb: "Suspected or confirmed gynaecological cancers.",
    details: ["GP referral — if you suspect cancer, ask your GP to state this explicitly on the referral so it's triaged on the rapid access pathway."],
    referral: "GP referral, flagged as rapid access.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for Gynae-Oncology." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-colposcopy",
    name: "Colposcopy",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Follow-up after an abnormal CervicalCheck smear result.",
    details: ["Referral is automatic through CervicalCheck once a result requires it."],
    referral: "Automatic via CervicalCheck.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for Colposcopy." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-menopause",
    name: "Complex Menopause Clinic",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "For menopause symptoms not managed at GP level.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for the Complex Menopause Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-fertility",
    name: "Fertility Hub",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Initial public fertility investigations.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for the Fertility Hub." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-pmb",
    name: "Postmenopausal Bleeding Clinic",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Rapid-access pathway for postmenopausal bleeding.",
    details: ["GP referral, flagged as postmenopausal bleeding for correct triage."],
    referral: "GP referral (rapid access).",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for the Postmenopausal Bleeding Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-physio",
    name: "Women's Health Physiotherapy",
    specialty: ["obs", "gynae"],
    county: ["cork-city"],
    blurb: "Pelvic floor, postnatal, and pregnancy-related physiotherapy.",
    details: ["Referral via GP, PHN, or your antenatal/postnatal team."],
    referral: "GP, PHN, or maternity team.",
    contact: { phone: "021 492 0500", extra: "Main hospital switchboard — ask for Women's Health Physiotherapy." },
    checked: "4 Sep 2026"
  },
  {
    id: "cuh-urology",
    name: "CUH Urology Department",
    specialty: ["urology"],
    county: ["cork-city"],
    blurb: "Cancer and non-cancer urological conditions — recurrent UTIs, incontinence, bladder pain, stones.",
    details: [
      "GP referral to CUH Urology outpatients.",
      "There's no separate rapid-access female urology clinic — ask your GP whether urogynaecology (CUMH) or general urology (CUH) is the better first referral, as symptoms often overlap."
    ],
    referral: "GP referral.",
    contact: { phone: "021 465 3699 (Central Appointments — ask for Urology outpatients)" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-pmht",
    name: "CUMH Specialist Perinatal Mental Health Team (PMHT)",
    specialty: ["mh"],
    county: ["cork-city"],
    blurb: "Moderate–severe mental health difficulties in pregnancy or up to 1 year postpartum.",
    details: [
      "Covers severe depression, psychosis, bipolar disorder, perinatal OCD, and similar.",
      "Referral via GP, obstetric team, midwife, or PHN — ask explicitly for 'referral to the Specialist Perinatal Mental Health Team', as generic mental health referrals can be triaged differently."
    ],
    referral: "GP, midwife, obstetric team, or PHN — name the team explicitly.",
    contact: { phone: "Via CUMH switchboard, Support Services" },
    checked: "4 Sep 2026"
  },
  {
    id: "pnd-ireland",
    name: "Postnatal Depression Ireland",
    specialty: ["mh"],
    county: ["cork-city"],
    blurb: "Cork-based charity: coffee mornings, peer support, friendship for women with PND.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 492 2083 / 086 787 2107", email: "support@pnd.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "nurture",
    name: "Nurture — Maternal Mental Health Counselling",
    specialty: ["mh"],
    county: ["national"],
    blurb: "Affordable, timely counselling for perinatal mental health, birth trauma, fertility issues, grief.",
    details: ["No-wait-list model in most areas."],
    referral: "Self-referral.",
    contact: { web: "nurturehealth.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "cuidiu-pnd",
    name: "Cuidiú Parent-to-Parent PND Support",
    specialty: ["mh"],
    county: ["national"],
    blurb: "Free peer listening by phone and email.",
    details: ["Check cuidiu.ie for current local contacts."],
    referral: "Self-referral.",
    contact: { web: "cuidiu.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "cuidiu-cork-bf",
    name: "Cuidiú Cork Breastfeeding Support",
    specialty: ["feeding"],
    county: ["cork-city", "cork-west"],
    blurb: "Free peer counsellor support by phone, 7 days a week.",
    details: [
      "Coffee-morning groups across Cork: City–Ballyphehane, Midleton, Kinsale, Glanmire, and others — check cuidiucork.ie for current dates/venues.",
      "Text before calling if it's before 9am or after 9pm."
    ],
    referral: "Self-referral, no cost.",
    contact: { web: "cuidiucork.ie", email: "cork@cuidiu.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "svc-cork",
    name: "Sexual Violence Centre Cork",
    specialty: ["dsv"],
    county: ["cork-city", "cork-north", "cork-west"],
    blurb: "24-hour on-call service. Free, confidential counselling and SATU/court accompaniment.",
    details: ["Formerly known as Cork Rape Crisis Service.", "Open to anyone over 14, regardless of when the assault occurred."],
    referral: "Self-referral, no cost.",
    contact: { phone: "Freephone 1800 496 496 / 021 450 5577", extra: "Text: 087 153 3393", address: "5 Camden Place, Cork" }
  },
  {
    id: "west-cork-beacon",
    name: "West Cork Beacon",
    specialty: ["dsv"],
    county: ["cork-west"],
    blurb: "Free, confidential, trauma-informed support for women experiencing domestic abuse, and anyone experiencing sexual violence.",
    details: [],
    referral: "Self-referral, no cost.",
    contact: { address: "Wolfe Tone Square, Bantry, Co. Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "womens-aid",
    name: "Women's Aid (National Helpline)",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "24-hour freephone helpline for women experiencing domestic violence.",
    details: ["Support in 200+ languages via Language Line."],
    referral: "Self-referral, no cost.",
    contact: { phone: "1800 341 900" },
    checked: "4 Sep 2026"
  },
  {
    id: "satu",
    name: "Sexual Assault Treatment Unit (SATU)",
    specialty: ["dsv"],
    county: ["cork-city"],
    blurb: "Free specialist care for anyone over 14 recently sexually assaulted — medical, forensic (optional), and follow-up.",
    details: ["Accessed via SVC Cork accompaniment, GP, ED, or self-referral."],
    referral: "Self-referral, GP, ED, or via SVC Cork.",
    contact: { web: "www2.hse.ie/services/domestic-sexual-gender-based-violence/" },
    checked: "4 Sep 2026"
  },
  {
    id: "skibb-frc",
    name: "Skibbereen Community & Family Resource Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "028 23572", email: "info@scfrc.ie", address: "North Street, Skibbereen, Co. Cork, P81 ND89" }
  },
  {
    id: "bantry-cfc",
    name: "Bantry Child & Family Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "027 50069", address: "Slip, Bantry, Co. Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "clon-frc",
    name: "Clonakilty Family Resource Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "023 883 3702" },
    checked: "4 Sep 2026"
  },
  {
    id: "haven-castletownbere",
    name: "Haven Family & Community Resource Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre, Castletownbere.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "027 70718" },
    checked: "4 Sep 2026"
  },
  {
    id: "co-action",
    name: "Co-Action West Cork",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Disability and family support services across West Cork.",
    details: ["Serves Bantry, Castletownbere, Clonakilty, and Dunmanway."],
    referral: "Contact directly.",
    contact: { phone: "Bantry 027 50114 / Castletownbere 027 70835" },
    checked: "4 Sep 2026"
  },
  {
    id: "cork-arc-westcork",
    name: "Cork ARC Cancer Support House (West Cork)",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Cancer support services, including for gynaecological cancers.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "027 53891" },
    checked: "4 Sep 2026"
  },
  {
    id: "wellbeing-network-wc",
    name: "The Wellbeing Network West Cork",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Directory of local classes and groups by catchment area.",
    details: ["Covers Beara, Bantry, Clonakilty, Dunmanway/Drimoleague, Mizen, Rosscarbery, Skibbereen."],
    referral: "Browse directly.",
    contact: { web: "thewellbeingnetwork.ie/westcork" },
    checked: "4 Sep 2026"
  },

  // National specialty pathways, added Sep 2026. Sourced from the National
  // Endometriosis Framework (2025), HSE menopause/fertility service pages,
  // and the National Screening Service. Verify details before relying on them.
  {
    id: "cumh-endo-centre",
    name: "CUMH Endometriosis & Pelvic Pain Centre (Lee Clinic)",
    specialty: ["endo", "gynae"],
    county: ["cork-city"],
    blurb: "One of two supra-regional centres in the country for complex (Stage 4) endometriosis care.",
    details: [
      "Opened April 2025 as part of the National Endometriosis Framework.",
      "For complex/severe cases referred on from a regional centre — not a first stop for a new diagnosis.",
    ],
    referral: "GP → regional centre → supra-regional referral if complex.",
    contact: { address: "Lee Clinic, Lee Road, Mount Desert, Cork, T23 KV2K" },
    resources: [
      { label: "Endometriosis — patient.info", url: "https://patient.info/womens-health/pelvic-pain-in-women/endometriosis" },
      { label: "Fibroids — patient.info", url: "https://patient.info/womens-health/periods-and-period-problems/fibroids" },
      { label: "Adenomyosis — patient.info", url: "https://patient.info/features/womens-health/is-adenomyosis-the-cause-of-your-heavy-painful-periods" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "tallaght-endo-centre",
    name: "Tallaght University Hospital Endometriosis Centre",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "The other supra-regional centre for complex (Stage 4) endometriosis care, alongside CUMH.",
    details: ["For complex/severe cases referred on from a regional centre — not a first stop for a new diagnosis."],
    referral: "GP → regional centre → supra-regional referral if complex.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rotunda-endo",
    name: "Rotunda Hospital — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "coombe-endo",
    name: "Coombe Hospital — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 408 5200", address: "Cork Street, Dublin D08 XW7X" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhl-endo",
    name: "University Hospital Limerick — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["limerick", "clare"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-endo",
    name: "University Hospital Galway — Endometriosis (in development)",
    specialty: ["endo", "gynae"],
    county: ["galway"],
    blurb: "Regional endometriosis centre in development under the National Endometriosis Framework — may not be fully operational yet.",
    details: [],
    referral: "GP referral — ask whether the service is live yet.",
    contact: { phone: "091 524 222" },
    checked: "4 Sep 2026"
  },
  {
    id: "nmh-endo",
    name: "National Maternity Hospital — Endometriosis (in development)",
    specialty: ["endo", "gynae"],
    county: ["dublin", "wicklow"],
    blurb: "Regional endometriosis centre in development under the National Endometriosis Framework — may not be fully operational yet. NMH also takes wider gynaecology referrals from Wicklow and the south-east.",
    details: [],
    referral: "GP referral — ask whether the service is live yet.",
    contact: { phone: "01 637 3100" },
    checked: "4 Sep 2026"
  },
  {
    id: "tallaght-emergency-gynae",
    name: "Tallaght University Hospital Emergency Gynaecology Unit",
    specialty: ["gynae"],
    county: ["dublin", "kildare"],
    blurb: "Urgent gynaecology assessment — the confirmed route for Kildare, which has no gynaecology or maternity department of its own (Naas General doesn't run either).",
    details: [],
    referral: "GP referral, or via Emergency Department.",
    contact: { phone: "01 414 2000", address: "Tallaght University Hospital, Tallaght, Dublin 24, D24 NR0A" },
    checked: "4 Sep 2026"
  },
  {
    id: "cumh-menopause-clinic",
    name: "CUMH Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["cork-city"],
    blurb: "One of six HSE specialist complex-menopause clinics nationally, one per maternity network.",
    details: [
      "For complex cases with comorbidities — most menopause care is still managed by your GP.",
      "HRT is VAT-free and free of charge under the HRT scheme (from June 2025).",
    ],
    referral: "GP/consultant/ANP referral.",
    contact: { address: "Unit 3, CUMH Kinsale Road, South Ring Business Park, Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "nmh-menopause",
    name: "National Maternity Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["dublin"],
    blurb: "The first of the six HSE complex-menopause clinics, opened Dec 2021.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "01 637 3100" },
    resources: [
      { label: "Menopause — patient.info", url: "https://patient.info/womens-health/menopause" },
      { label: "HRT — patient.info", url: "https://patient.info/womens-health/menopause/hormone-replacement-therapy-hrt" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "rotunda-menopause",
    name: "Rotunda Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["dublin"],
    blurb: "Clinical lead Dr Caoimhe Hartley.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "coombe-menopause",
    name: "Coombe Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["dublin"],
    blurb: "One of six HSE specialist complex-menopause clinics nationally.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "01 408 5200" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-menopause",
    name: "University Hospital Galway Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["galway"],
    blurb: "Runs one afternoon a week.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "091 524 222" },
    checked: "4 Sep 2026"
  },
  {
    id: "nenagh-menopause",
    name: "Nenagh Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["tipperary"],
    blurb: "One of six HSE specialist complex-menopause clinics nationally.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "the-menopause-hub",
    name: "The Menopause Hub (private)",
    specialty: ["menopause"],
    county: ["dublin", "cork-city"],
    sector: "private",
    provider: "The Menopause Hub",
    blurb: "Private menopause clinic — an option if you can pay and don't want to wait for a public complex-menopause clinic referral.",
    details: [
      "Three clinics: Mount Merrion, Co. Dublin; Santry, Dublin 9; and Rosewood, Ballincollig, Cork.",
      "Self-referral — no GP letter needed. Consultation fees apply; check current pricing directly.",
      "Virtual consultations also available.",
    ],
    referral: "Self-referral, book online or by phone.",
    contact: { phone: "01 210 7948 (Mount Merrion) / 01 485 3066 (Santry)", email: "info@themenopausehub.ie", web: "themenopausehub.ie" },
    checked: "4 Sep 2026"
  },

  // ---- Private sector: Bon Secours, Mater Private, Beacon ----
  // Sourced directly from each provider's own site, checked 2026-09-03/04.
  // Blackrock Health, Kingsbridge/NI private and Aut Even are still outstanding
  // (web access outage mid-research) — not included here, to follow separately.
  {
    id: "bons-gynae-network",
    name: "Bon Secours Gynaecology (private)",
    specialty: ["gynae", "endo", "menopause"],
    county: ["cork-city", "dublin", "galway", "limerick", "kerry", "cavan"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Private consultant gynaecology and urogynaecology across six Bon Secours locations.",
    details: [
      "Covers endometriosis, fibroids, incontinence, pelvic floor disorders, menstrual disorders and gynaecological oncology — the mix varies by hospital.",
      "Cork: 021 4542807 (main reception; the site says to contact individual consultants directly).",
      "Dublin: 01 806 5300 (main reception; contact individual consultants).",
      "Galway: 091 381900. Limerick: 061 426100. Tralee: 066 714 9890 (tgynaecology@bonsecours.ie).",
      "Cavan Clinic: 049 4332697 — the only private gynaecology listed for the north-east border area.",
      "Direct settlement with all main health insurers; self-pay options available — ask the hospital for a quote.",
    ],
    referral: "GP or specialist referral required, sent via Healthlink. Not self-referral.",
    contact: { phone: "021 4542807", email: "info@bonsecours.ie", web: "bonsecours.ie/services/gynaecology" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-menopause-cork",
    name: "Bon Secours Menopause Care, Cork",
    specialty: ["menopause"],
    county: ["cork-city"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Private menopause clinic for women with added complexity, including during chemotherapy.",
    details: [
      "Bon Secours describes this as for the cohort whose menopause is more complex because of co-morbidities, including patients undergoing chemotherapy — routine menopause care is expected to stay in primary care.",
      "Menopause management is listed at Cork and Dublin; only Cork publishes a direct contact.",
      "Direct settlement with all main insurers; self-pay available.",
    ],
    referral: "GP or specialist referral via Healthlink.",
    contact: { phone: "085 864 5371", email: "BSCMenopauseCare@bonsecours.ie", web: "bonsecours.ie/services/womens-health", address: "Bon Secours Hospital, Western Road Entrance, Cork, T12 DV56" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-breast-cork",
    name: "Bon Secours Specialist Breast Care Centre, Cork",
    specialty: ["cancer"],
    county: ["cork-city"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Rapid-access triple assessment clinic for symptomatic breast problems.",
    details: [
      "Triple assessment = clinical history and breast exam, mammogram/ultrasound, and biopsy if needed.",
      "Referrals follow National Cancer Control Programme guidelines for symptomatic breast problems.",
      "Multidisciplinary team: breast surgeons, breast care nurse, medical and radiation oncologists, radiologists, pathologists.",
      "Located on the 3rd floor of the hospital; check in with the receptionist on arrival.",
    ],
    referral: "GP referral to the breast clinic, under NCCP guidelines.",
    contact: { phone: "021 494 1910", email: "breastcarecentre@bonsecours.ie", address: "Bon Secours Hospital, Western Road Entrance, Cork, T12 DV56" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-breast-limerick",
    name: "Bon Secours Breast Care Centre, Limerick",
    specialty: ["cancer", "genetics"],
    county: ["limerick", "clare", "tipperary"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Consultant-led breast clinic with triple assessment and a family-history screening service.",
    details: [
      "Triple Assessment Clinic runs Thursday afternoons; Breast Surgery Clinic (new surgical, family history, results and review patients) runs Tuesday afternoons.",
      "Offers assessment and screening for women with a family history of breast cancer.",
      "Tomosynthesis 3D mammogram for patients aged 35 and older, ultrasound, and needle biopsy if an abnormality is found.",
      "Oncoplastic and reconstructive surgery offered, including reconstruction following mastectomy.",
      "Onward referral to medical and radiation oncology can be arranged.",
    ],
    referral: "GP referral via Healthlink. Urgent symptoms are offered a triple assessment appointment under NCCP 2021 guidelines.",
    contact: { phone: "061 426100", email: "bslinfo@bonsecours.ie", address: "Towlerton, Ballysimon, Limerick, V94 9D36" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-pelvic-health",
    name: "Bon Secours Pelvic Health Services & Clinic",
    specialty: ["pelvicphysio", "urology", "gynae"],
    county: ["cork-city", "dublin", "galway", "kerry"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Assessment and management of pelvic floor disorders and urinary incontinence.",
    details: [
      "Available at the Cork, Dublin, Galway and Tralee hospitals.",
      "Covers pelvic floor disorders, urinary incontinence and related pelvic health issues.",
      "Sits alongside the uro-gynaecology service — Bon Secours groups pelvic health under urology on its site.",
      "One of very few private pelvic health options listed outside Dublin.",
      "No direct phone published for this clinic specifically — use the relevant hospital's main number.",
    ],
    referral: "GP or specialist referral via Healthlink.",
    contact: { web: "bonsecours.ie/services/womens-health" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-hysteroscopy-dublin",
    name: "Bon Secours Outpatient Hysteroscopy Clinic, Dublin",
    specialty: ["gynae"],
    county: ["dublin"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "Outpatient hysteroscopy for abnormal bleeding and other gynaecological symptoms.",
    details: [
      "Runs at Bon Secours Hospital Dublin, Glasnevin.",
      "For evaluation and treatment of a range of gynaecological symptoms without an inpatient admission.",
      "Direct settlement with all main insurers; self-pay available.",
    ],
    referral: "GP or specialist referral via Healthlink.",
    contact: { phone: "01 806 5300", email: "drbarryappointments@outlook.com", address: "Glasnevin Hill, Glasnevin, Dublin 9, D09 YN97" },
    checked: "4 Sep 2026"
  },
  {
    id: "bons-dexa",
    name: "Bon Secours Osteoporosis Screening (DEXA)",
    specialty: ["bonehealth"],
    county: ["cork-city", "dublin", "galway", "limerick", "kerry"],
    sector: "private",
    provider: "Bon Secours Health System",
    blurb: "DEXA bone density scanning at five Bon Secours hospitals.",
    details: [
      "Available at Cork, Dublin, Galway, Limerick and Tralee.",
      "Relevant after early menopause, on long-term steroids, or with a family history of osteoporosis.",
      "Contact the individual hospital to arrange — numbers are on the Bon Secours contact page.",
    ],
    referral: "GP or specialist referral via Healthlink.",
    contact: { web: "bonsecours.ie/services/womens-health" },
    checked: "4 Sep 2026"
  },
  {
    id: "materprivate-womens-centre-cork",
    name: "Centre for Women's Health, Mater Private Cork",
    specialty: ["gynae", "urology", "menopause", "contraception", "sexualhealth"],
    county: ["cork-city"],
    sector: "private",
    provider: "Mater Private Network",
    blurb: "Hospital-based private women's health centre — gynaecology, urogynaecology, menopause and contraception under one roof.",
    details: [
      "Opened 2022; Mater Private describes it as the first hospital-based centre of its kind in Munster.",
      "Covers gynaecology, urogynaecology, pre- and post-obstetric care, sexual health, contraception, perimenopause/menopause, plastic and reconstructive surgery, and minimally invasive surgery.",
      "Multidisciplinary: consultants, a GP, nursing staff and allied health professionals, with a pessary and continence nurse specialist available.",
      "Onward referral within the Mater Private network for cardiology, pelvic health, gastroenterology, colorectal, general surgery and rheumatology.",
    ],
    referral: "Referral required — GP or specialist, sent to ereferralscork@materprivate.ie or via Healthlink.",
    contact: { phone: "021 601 3200", email: "ereferralscork@materprivate.ie", web: "materprivate.ie/our-services/womens-health", address: "Mater Private Network, Citygate, Mahon, Cork, T12 K199" },
    checked: "4 Sep 2026"
  },
  {
    id: "materprivate-menopause-cork",
    name: "Menopause Clinic, Mater Private Cork",
    specialty: ["menopause"],
    county: ["cork-city"],
    sector: "private",
    provider: "Mater Private Network",
    blurb: "Weekly consultant-led clinic for routine and complex menopause care.",
    details: [
      "Runs weekly within the Centre for Women's Health, led by menopause specialist Dr Clare Cromwell.",
      "First appointment covers symptoms, medical and family history, and an individualised treatment plan; bloods may be taken.",
      "Because it's in a hospital setting, care is coordinated with general gynaecology and urogynaecology, with a pessary and continence nurse specialist on hand.",
      "Additional tests may carry extra cost — pelvic ultrasound, DEXA scan, Mirena coil insertion, STI screening, nurse support, or onward consultant referral.",
      "Bring copies of any recent blood, breast, endocrine, cardiac or gynaecological tests, and a GP summary if your history is complex.",
    ],
    referral: "Referral required — GP or specialist, to ereferralscork@materprivate.ie or via Healthlink.",
    contact: { phone: "021 601 3200", email: "ereferralscork@materprivate.ie", web: "materprivate.ie/our-services/womens-health/menopause-clinic", address: "Mater Private Network, Citygate, Mahon, Cork, T12 K199" },
    checked: "4 Sep 2026"
  },
  {
    id: "materprivate-breast-dublin",
    name: "Breast Surgery, Mater Private Dublin",
    specialty: ["cancer"],
    county: ["dublin"],
    sector: "private",
    provider: "Mater Private Network",
    blurb: "Private breast surgery for benign and malignant breast lumps, at the Cancer Centre on Eccles Street.",
    details: [
      "Surgery for breast lumps — the site notes 80% of breast lumps are benign.",
      "Options include lumpectomy, mastectomy and lymph node removal, depending on the condition.",
      "Based at the Cancer Centre, Mater Private Network, Eccles Street.",
      "A referral letter is required before an appointment can be confirmed.",
    ],
    referral: "Referral letter required before an appointment is confirmed. GP/specialist referral to ereferrals@materprivate.ie or via Healthlink.",
    contact: { phone: "1800 123 456", email: "ereferrals@materprivate.ie", web: "materprivate.ie/our-services/general-surgery/breast-surgery", address: "Cancer Centre, Mater Private Network, Eccles Street, Dublin 7, D07 WKW8" },
    checked: "4 Sep 2026"
  },
  {
    id: "beacon-womens-centre",
    name: "Beacon Women's Centre",
    specialty: ["gynae", "menopause", "endo", "contraception", "cancer"],
    county: ["dublin"],
    sector: "private",
    provider: "Beacon Hospital",
    blurb: "Private gynaecology service covering menopause, endometriosis, pelvic pain and contraception.",
    details: [
      "Established 2007. Run by consultant gynaecologists with women's health nurse specialists, on the Beacon Hospital campus.",
      "Covers menopause health, gynaecological cancers, endometriosis, ovarian cysts, reproductive health, contraception, menstrual dysfunction and pelvic pain.",
      "Minimally invasive procedures — hysteroscopy and laparoscopy — with access to the hospital's theatres if surgery is needed.",
      "On-site laboratory handles cervical screening (smear test) samples and biopsies taken at the clinic.",
      "Works alongside the Beacon psychology team and Beacon Care Fertility.",
      "Located on the third floor of Suite 36 in the Mall — take the lift by Beacon for Kids.",
      "The site doesn't state whether self-referral is accepted or a GP letter is required — phone ahead to check.",
    ],
    referral: "Phone ahead to check — not stated whether self-referral is accepted.",
    contact: { phone: "01 293 8684", email: "womenscentre@beaconhospital.ie", web: "beaconhospital.ie/department-service/womens-centre/", address: "Beacon Hospital, Sandyford, Dublin 18, D18 AK68", extra: "Fax: 01 293 8641" },
    checked: "4 Sep 2026"
  },
  {
    id: "beacon-breast-centre",
    name: "Beacon Breast Centre",
    specialty: ["cancer"],
    county: ["dublin"],
    sector: "private",
    provider: "Beacon Hospital",
    blurb: "Private breast centre at Beacon Hospital, Sandyford.",
    details: [
      "Listed in Beacon Hospital's published contact directory — service detail and referral route not yet confirmed beyond this.",
      "Main hospital switchboard: 01 293 6600.",
    ],
    referral: "Not confirmed — phone ahead.",
    contact: { phone: "01 293 8686", web: "beaconhospital.ie/department-service/breast-centre/", address: "Beacon Hospital, Sandyford, Dublin 18, D18 AK68" },
    checked: "4 Sep 2026"
  },

  // ---- Private sector, continued: Blackrock Health, Kingsbridge/Ulster
  // Independent (NI), UPMC Aut Even. Sourced from each provider's own site,
  // checked 2026-09-04. Limerick Clinic (Blackrock Health) is a diagnostics
  // facility per its own site, with no confirmed women's-health service —
  // not included rather than guessed.
  {
    id: "blackrock-womens-health-centre",
    name: "Blackrock Health Women's Health Centre",
    specialty: ["gynae", "menopause", "cancer", "bonehealth", "pelvicphysio"],
    county: ["dublin"],
    sector: "private",
    provider: "Blackrock Health",
    blurb: "Private multi-specialty women's health centre — gynaecology, breast health, menopause, bone health and pelvic floor under one roof.",
    details: [
      "Consultant-led clinics: gynaecology, urology, breast health, endocrinology, gastroenterology, pain medicine, cardiology, dermatology, psychology, health screening and rheumatology.",
      "Part of the Blackrock Health group (Blackrock Clinic, Galway Clinic, Hermitage Clinic, Limerick Clinic).",
      "Located at 2-5 Warrington Place, Dublin 2 — separate from the main Blackrock Clinic site.",
    ],
    referral: "GP or consultant referral letter required.",
    contact: { phone: "01 578 4414", email: "WomensHealthCentre@blackrockhealth.com", web: "blackrockhealth.com/womens-health-centre", address: "2-5 Warrington Place, Dublin 2" },
    checked: "4 Sep 2026"
  },
  {
    id: "galway-clinic-gynae",
    name: "Galway Clinic Gynaecology (private)",
    specialty: ["gynae"],
    county: ["galway"],
    sector: "private",
    provider: "Blackrock Health",
    blurb: "Private consultant-led gynaecology at the Galway Clinic, part of Blackrock Health.",
    details: [
      "Blackrock Health's gynaecology service is described as running across its Dublin and Galway clinics jointly.",
      "Number above is the clinic's general switchboard — ask to be directed to gynaecology or a named consultant.",
    ],
    referral: "GP or consultant referral letter required.",
    contact: { phone: "091 785 000", web: "galwayclinic.com", address: "Doughiska, Galway, H91 HHT0" },
    checked: "4 Sep 2026"
  },
  {
    id: "hermitage-clinic-gynae",
    name: "Hermitage Clinic Gynaecology (private)",
    specialty: ["gynae"],
    county: ["dublin"],
    sector: "private",
    provider: "Blackrock Health",
    blurb: "Private gynaecology at the Hermitage Clinic, part of Blackrock Health.",
    details: [],
    referral: "GP or consultant referral letter required.",
    contact: { phone: "01 645 9000", email: "info@hermitageclinic.ie", address: "Old Lucan Road, Dublin 20" },
    checked: "4 Sep 2026"
  },
  {
    id: "kingsbridge-womens-health",
    name: "Kingsbridge Private Hospital Women's Health & Gynaecology",
    specialty: ["gynae", "endo"],
    county: ["antrim"],
    sector: "private",
    provider: "Kingsbridge Private Hospital",
    blurb: "Private gynaecology clinics and surgery in Belfast — investigation through to surgery, including endometriosis, fibroids and PCOS.",
    details: [
      "Covers diagnostic services and treatment for complex issues including endometriosis, fibroids and polycystic ovary disease, through to gynae surgery.",
      "Phone lines: Mon–Fri 9am–5pm, Sat 9am–3pm. A contact form is available outside those hours.",
    ],
    referral: "Self-referral or GP referral — check current policy when booking.",
    contact: { phone: "028 9066 7878", email: "info@kingsbridgeprivatehospital.com", web: "kingsbridgeprivatehospital.com/services/womens-health/", address: "801-815 Lisburn Road, Belfast BT9 7GX" },
    checked: "4 Sep 2026"
  },
  {
    id: "ulster-independent-gynae",
    name: "Ulster Independent Clinic Gynaecology",
    specialty: ["gynae", "menopause", "contraception"],
    county: ["antrim"],
    sector: "private",
    provider: "Ulster Independent Clinic",
    blurb: "Private gynaecology in Belfast — screening, contraception, menopause management and surgery.",
    details: [
      "Services include preventive screenings, contraception, pelvic exams, menopause management and gynaecological surgery.",
      "Also runs a dedicated Pelvic Health Physiotherapy service — see the separate entry under Pelvic Health.",
    ],
    referral: "GP or consultant referral — check current policy when booking.",
    contact: { phone: "028 9066 1212", email: "info@uic.org", web: "ulsterindependentclinic.com/services/gynaecology", address: "245 Stranmillis Road, Belfast BT9 5JH" },
    checked: "4 Sep 2026"
  },
  {
    id: "ulster-independent-pelvic-physio",
    name: "Ulster Independent Clinic Pelvic Health Physiotherapy",
    specialty: ["pelvicphysio"],
    county: ["antrim"],
    sector: "private",
    provider: "Ulster Independent Clinic",
    blurb: "Private pelvic health physiotherapy in Belfast, alongside the clinic's gynaecology service.",
    details: ["One of very few private pelvic health physio options in Northern Ireland listed with a public contact."],
    referral: "Self-referral or GP referral — check current policy when booking.",
    contact: { phone: "028 9066 1212", email: "info@uic.org", web: "ulsterindependentclinic.com/services/pelvic-ealth", address: "245 Stranmillis Road, Belfast BT9 5JH" },
    checked: "4 Sep 2026"
  },
  {
    id: "upmc-autheven-womens-health",
    name: "UPMC Aut Even Hospital Women's Health",
    specialty: ["gynae", "urology", "endo", "fertility", "pelvicphysio", "contraception"],
    county: ["kilkenny"],
    sector: "private",
    provider: "UPMC Aut Even Hospital",
    blurb: "Private women's health service in Kilkenny — bladder/urinary issues, endometriosis, fertility, fibroids, prolapse, pelvic pain and PCOS.",
    details: [
      "Diagnoses and treats bladder leakage and other urinary tract disorders, endometriosis, fertility problems, fibroids, pelvic floor prolapse, pelvic pain and PCOS.",
      "Also offers annual pelvic exams and cervical screening, family planning and contraception, physiotherapy for chronic conditions or post-surgical recovery, and HPV vaccination.",
      "The only private women's health option covering the south-east border counties (Kilkenny, Carlow, south Laois/Tipperary).",
    ],
    referral: "GP referral.",
    contact: { phone: "056 777 5275", web: "upmc.ie/services/womens-health", address: "Freshford Road, Kilkenny, R95 D370" },
    checked: "4 Sep 2026"
  },

  {
    id: "cork-fertility-hub",
    name: "Cork Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["cork-city"],
    blurb: "One of six Regional Fertility Hubs offering publicly funded assisted human reproduction (AHR) pathways. Also home to the National Advanced AHR Centre, Ireland's first public AHR centre.",
    details: [
      "Publicly funded AHR available since September 2023: GP → hub → HSE-approved private clinic.",
      "The Cork hub gained HPRA licensing for IUI in 2025; IUI referrals began December 2025.",
    ],
    referral: "GP referral to the hub.",
    contact: { address: "Lee Road Clinic, Cork" },
    checked: "4 Sep 2026"
  },
  {
    id: "rotunda-fertility",
    name: "Rotunda Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs. Around 125 couples/month are referred nationally for publicly-funded AHR.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "nmh-fertility",
    name: "National Maternity Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 637 3100" },
    checked: "4 Sep 2026"
  },
  {
    id: "coombe-fertility",
    name: "Coombe Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 408 5200" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-fertility",
    name: "University Hospital Galway Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["galway"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "091 524 222" },
    checked: "4 Sep 2026"
  },
  {
    id: "nenagh-fertility",
    name: "Nenagh Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["tipperary"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "hse-approved-ahr-clinics",
    name: "HSE-Approved Private AHR/IVF Clinics",
    specialty: ["fertility"],
    county: ["national"],
    blurb: "Eight HSE-approved private clinic sites your Regional Fertility Hub can refer you on to, if needed — you choose which.",
    details: [
      "Beacon CARE Fertility (Dublin; satellites Limerick, Louth).",
      "First IVF (Kildare; satellites Cork, Galway, Kerry).",
      "ReproMed (Dublin; satellite Louth).",
      "Sims IVF (Cork & Dublin; satellites Carlow, Limerick, Louth).",
      "Thérapie Fertility (Dublin).",
      "Waterstone Clinic (Cork; satellites Kildare, Waterford).",
    ],
    referral: "Referred on by your Regional Fertility Hub.",
    contact: { web: "citizensinformation.ie/en/health/health-services/reproductive-health/hse-assisted-human-reproduction-ahr-services/" },
    checked: "4 Sep 2026"
  },
  {
    id: "national-eating-disorders",
    name: "HSE National Clinical Programme for Eating Disorders",
    specialty: ["eating", "mh", "camhs"],
    county: ["national"],
    blurb: "The clinical referral pathway for eating disorder care, partnered with Bodywhys for peer support — a stepped model of care planned for 16 specialist community teams (8 adult, 8 CAMHS) plus 20 inpatient adult beds.",
    details: [
      "Referral pathway: GP → CAMHS (under 18) or adult mental health services (18+).",
      "Per a January 2025 Oireachtas parliamentary question, 11 of the 16 planned teams were operational (6 adult, 5 CAMHS); Budget 2025 funded two more, bringing the total towards 14 of the 16 envisaged. The HSE spent €8.1m on the programme in 2023, and the Model of Care is under review.",
      "See the Support & advocacy organisations list on the 'Know your rights' page for Bodywhys' helpline and peer support groups.",
    ],
    referral: "GP referral.",
    contact: { web: "hse.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "national-contraception-scheme",
    name: "HSE Free Contraception Scheme",
    specialty: ["contraception"],
    county: ["national"],
    blurb: "Free contraception for women aged 17–35, or any age with a medical card.",
    details: [
      "Covers consultations, prescriptions, and a range of contraceptive methods.",
      "Emergency contraception is also available without a prescription from participating pharmacies.",
    ],
    referral: "Register with a participating GP or family planning clinic.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "my-options",
    name: "My Options",
    specialty: ["contraception", "obs"],
    county: ["national"],
    blurb: "Free, confidential HSE phone line for advice on an unplanned pregnancy — options counselling and information.",
    details: ["Not a booking line for a termination — an information and counselling service."],
    referral: "Self-referral, phone directly.",
    contact: { phone: "1800 828 010", web: "myoptions.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "breastcheck",
    name: "BreastCheck — National Breast Screening Programme",
    specialty: ["cancer"],
    county: ["national"],
    blurb: "Free breast screening (mammogram) for eligible women, run by the National Screening Service.",
    details: ["Screening reminders are also visible in the HSE Health App."],
    referral: "Automatic invitation by eligible age band, or self-register if not yet invited.",
    contact: { web: "breastcheck.ie" },
    checked: "4 Sep 2026"
  },

  // Crisis, neurodiversity, parenting, and infertility — added Sep 2026 in
  // response to a direct request to cover mental health crisis signposting,
  // neurodiversity, and parenting/motherhood nationally. Verify before relying.
  {
    id: "samaritans",
    name: "Samaritans",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Free, confidential, 24/7 emotional support — for any kind of distress, not just suicide risk.",
    details: ["Same freephone number across Ireland and Northern Ireland.", "Also available by email if you'd rather write than talk."],
    referral: "Self-referral, phone any time.",
    contact: { phone: "116 123", email: "jo@samaritans.ie", web: "samaritans.org" },
    checked: "4 Sep 2026"
  },
  {
    id: "text-50808",
    name: "Text 50808",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Free, 24/7 HSE-funded crisis text line — text HELLO to start.",
    details: ["A trained crisis volunteer texts back and forth with you in real time.", "Good option if a phone call isn't possible or feels like too much."],
    referral: "Self-referral — text HELLO to 50808.",
    contact: { phone: "Text HELLO to 50808", web: "textaboutit.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "pieta",
    name: "Pieta",
    specialty: ["crisis", "mh", "camhs"],
    county: ["national"],
    blurb: "Free 24/7 helpline and therapy specifically for suicidal ideation, self-harm, and bereavement by suicide.",
    details: ["Also runs a text service: text HELP to 51444."],
    referral: "Self-referral, phone or text any time.",
    contact: { phone: "1800 247 247", web: "pieta.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "lifeline-ni",
    name: "Lifeline (Northern Ireland)",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Northern Ireland's 24/7 regional crisis response helpline — trauma, suicide, self-harm, abuse.",
    details: ["Free from NI landlines and mobiles.", "Can arrange a face-to-face follow-up appointment locally where appropriate."],
    referral: "Self-referral, phone any time.",
    contact: { phone: "0808 808 8000", web: "lifelinehelpline.info" },
    checked: "4 Sep 2026"
  },
  {
    id: "zest-foyle",
    name: "Zest (Healing the Hurt)",
    specialty: ["crisis", "mh"],
    county: ["londonderry"],
    blurb: "Derry-based counselling, education, and therapeutic support specifically for people affected by self-harm and suicide.",
    details: ["Outside office hours, Zest itself directs people to Lifeline (0808 808 8000) for 24/7 crisis support."],
    referral: "Self-referral.",
    contact: { phone: "028 7126 6999", address: "15a Queen Street, Derry BT48 7EQ" },
    checked: "6 Sep 2026"
  },
  {
    id: "emergency-mh",
    name: "In immediate danger",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "If you or someone else is in immediate physical danger, this overrides everything else on this page.",
    details: ["Both 999 and 112 work across Ireland and Northern Ireland — use whichever you remember.", "Or go directly to your nearest Emergency Department / A&E."],
    referral: "Emergency — no referral needed.",
    contact: { phone: "999 / 112" },
    checked: "4 Sep 2026"
  },
  {
    id: "asiam",
    name: "AsIAm",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Ireland's autism charity, autistic-led — information, a legal clinic, and support for newly-diagnosed families.",
    details: ["Runs support programmes for parents of recently-diagnosed children and for autistic teenagers."],
    referral: "Self-referral via website.",
    contact: { web: "asiam.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "adhd-ireland",
    name: "ADHD Ireland",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Information, helpline, and networking for people with ADHD, parents, and professionals.",
    details: ["Also runs an ADHD School Friendly Programme for teachers and schools."],
    referral: "Self-referral, phone or email helpline.",
    contact: { web: "adhdireland.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "aspire-ireland",
    name: "Aspire (Autism Spectrum Association of Ireland)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Information and support across autism, ADHD, and AuDHD (overlapping autism + ADHD) more broadly.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "aspireireland.ie" },
    checked: "4 Sep 2026"
  },
  // Adult ADHD & adult autism diagnosis pathways (ROI & NI) — added Sep 2026
  // from an all-island adult neurodiversity navigation guide. Public adult
  // pathways are limited or absent on both sides of the border; see the
  // "Adult ADHD & autism diagnosis" tip in Know Your Rights for the private-
  // pathway and shared-care caveats these entries deliberately don't repeat.
  {
    id: "hse-adult-adhd-clinics",
    name: "HSE Adult ADHD Clinics (National Clinical Programme)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "The public route to adult ADHD assessment and treatment — but only where a clinic team has been funded. As of 2025, 7 of the planned 11 regional teams are funded and 5 fully operational, so roughly half the country still has no dedicated service.",
    details: [
      "Pathway where a team exists: GP → referral to your local Adult Mental Health Team (which also screens for co-occurring conditions) → referral on to the Adult ADHD Clinic.",
      "Waiting times aren't published at patient level. Real-world reports suggest roughly 18 months to 2+ years, and some areas (including Cork and south Dublin/Wicklow) have at times paused new referrals due to capacity.",
      "If there's no team in your area yet, ask your GP about the current local arrangement rather than assuming there's nothing to be referred to — provision is expanding, unevenly, as Budget 2025 funding for the remaining teams comes online.",
      "A private diagnosis does not guarantee this service will take over your prescribing — see the private-pathway note in the Know Your Rights advocacy guide.",
    ],
    referral: "GP referral to your local Adult Mental Health Team, who refer on to the Adult ADHD Clinic if appropriate.",
    contact: { web: "hse.ie" },
    checked: "5 Sep 2026",
  },
  {
    id: "umaap-adult-adhd",
    name: "UMAAP — Understanding & Managing Adult ADHD Programme",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "A free 6-week online programme for adults with ADHD, run by ADHD Ireland with UCD and the HSE's National Clinical Programme for ADHD in Adults. No diagnosis, referral, or wait for an assessment slot required.",
    details: [
      "Open to anyone 18+ living in the Republic of Ireland who self-identifies as having ADHD or has a formal diagnosis — worth accessing while you're waiting for (or instead of pursuing) a formal assessment.",
      "Combines ADHD psychoeducation with acceptance and commitment therapy (ACT) techniques.",
    ],
    referral: "Self-referral via ADHD Ireland's website.",
    contact: { web: "adhdireland.ie" },
    checked: "5 Sep 2026",
  },
  {
    id: "adult-adhd-ni",
    name: "Adult ADHD assessment (Northern Ireland HSC)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "There is no regionally commissioned adult ADHD service in Northern Ireland — provision exists only informally within general adult mental health teams, and Trusts aren't required to keep an ADHD-specific waiting list.",
    details: [
      "Where reported, waits are very long: Belfast Trust reported roughly 8 years (1,710 adults waiting in 2022–23, up from 837 the year before); South Eastern Trust roughly 7.5 years. Other Trusts don't record adult ADHD waits separately from general adult mental health waits.",
      "NHS Right to Choose does not apply in Northern Ireland — it's England-only, so it can't be used here to access a faster private-to-NHS-funded route.",
      "An Individual Funding Request to fund assessment or treatment outside the normal pathway can be made but is rarely successful.",
    ],
    referral: "Ask your GP to refer you to your local HSC Trust's adult mental health team.",
    contact: { web: "nidirect.gov.uk" },
    checked: "5 Sep 2026",
  },
  {
    id: "hse-autism-protocol-adult",
    name: "National Autism Assessment and Intervention Pathway Protocol (adults)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Ireland's first standardised HSE-wide autism assessment approach, effective from 25 March 2026 — the first to explicitly include adults, who can self-refer. Genuinely new, but real-world adult access is expected to lag well behind children's in the early rollout.",
    details: [
      "Uses a tiered model — clear presentation, unclear presentation, and continuing presentation — matching more intensive assessment to less straightforward cases.",
      "Applies across HSE services and Section 38/39-funded providers, and can involve private providers.",
      "Rollout began July 2026 with children prioritised first — treat this as a development worth watching rather than a fast route to adult assessment right now. Worth re-checking status with your local HSE service every few months.",
      "11 new 'in-reach' teams (psychologist, occupational therapist, speech & language therapist) are being recruited nationally to support delivery.",
    ],
    referral: "Self-refer once the protocol is operating in your area — ask your GP or local HSE disability/mental health service for current status.",
    contact: { web: "hse.ie" },
    checked: "5 Sep 2026",
  },
  {
    id: "adult-autism-ni",
    name: "Adult Autism Assessment (HSC Trust)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Assessment is available through each Health & Social Care Trust via GP referral, but demand vastly outstrips capacity — waits of up to 5 years reported in some Trust areas, against a 13-week target.",
    details: [
      "Governed by the Autism Strategy 2023–2028 ('To Respect, To Listen, To Involve'), underpinned by the Autism Act (NI) 2011 and the Autism (Amendment) Act (NI) 2022, with an Independent Autism Reviewer overseeing progress.",
      "There's been no significant new investment in autism assessment services since 2016, despite prevalence estimates roughly tripling (from about 1 in 50 to 1 in 17 children) over that period — a long wait reflects known, acknowledged capacity limits, not your case's urgency.",
    ],
    referral: "Ask your GP to refer you to your local HSC Trust's autism assessment service.",
    contact: { web: "nidirect.gov.uk" },
    checked: "5 Sep 2026",
  },
  {
    id: "hse-assessment-of-need",
    name: "HSE Assessment of Need (autism/disability)",
    specialty: ["neurodiversity", "childdisability"],
    county: ["national"],
    blurb: "The statutory pathway for a child's disability assessment under the Disability Act 2005, with a legal 6-month deadline — separate from, and not a prerequisite for, getting CDNT or Primary Care services.",
    details: [
      "Apply directly and separately from any CDNT/Primary Care referral — do both at the same time rather than waiting for one to conclude before starting the other.",
      "No diagnosis is needed to apply. Any child born on or after 1 June 2002 is eligible; someone aged 16+ can apply for their own assessment.",
      "The statutory timeline is 3 months to commence plus a further 3 months to complete (6 months total). Nationally this is being missed on a large scale — a long wait reflects a known, acknowledged system limitation, not a reflection of your case's urgency.",
      "If the deadline is missed, or you disagree with the outcome, that's grounds for a formal complaint under the Disability Act — a separate route from HSE 'Your Service Your Say'.",
      "Adult diagnosis is a separate, less standardised pathway — see AsIAm's adult diagnosis guidance.",
    ],
    referral: "Written application using the Assessment of Need application form (hse.ie), sent to your local HSE Assessment Officer — the officer must acknowledge it within 2 weeks.",
    contact: { web: "hse.ie" },
  },
  {
    id: "hse-cdnt-referral",
    name: "Children's Disability Network Team (CDNT) referral",
    specialty: ["childdisability"],
    county: ["national"],
    blurb: "The interdisciplinary team (speech & language therapy, OT, physio, psychology, social work, and more) for a child aged 0–18 with complex needs across more than one area — no diagnosis or Assessment of Need required.",
    details: [
      "A child with a single, non-complex need (e.g. speech delay only) goes to Primary Care instead of a CDNT, not both — say what the concern is when you contact either service and they can help route you correctly.",
      "An infant referred in their first year of life with a diagnosed condition linked to complex needs is accepted onto a CDNT automatically.",
      "Which CDNT covers you is based on home address, not diagnosis or county boundaries as such — use the HSE's own local-CDNT finder rather than a name or number written down elsewhere, including this app, since teams and contacts change often.",
    ],
    referral: "Parents/guardians can refer directly, or via a GP, public health nurse, or other professional — using the Children's Services Referral Form plus an age-banded Additional Information Form, with signed parental consent.",
    contact: { web: "hse.ie" },
  },
  {
    id: "ni-child-development-clinic",
    name: "HSC Trust Child Development Clinic / community paediatrics",
    specialty: ["childdisability"],
    county: ["national"],
    blurb: "Northern Ireland's early-intervention route — multidisciplinary child development assessment run by your local Health & Social Care Trust, alongside community paediatrics. There is no CDNT equivalent here.",
    details: [
      "Unlike the Republic's CDNT model, this is professional-referral only — a GP, health visitor or school nurse makes the referral; self-referral is generally not accepted.",
      "There are five HSC Trusts (Belfast, Northern, South Eastern, Southern, Western). Contact details and waiting times are Trust-specific and change often — ask your GP or health visitor which Trust covers you and how to check your position on its list.",
      "Ask specifically for this in writing, including the date of referral, so you have a record if you need to chase or complain later.",
    ],
    referral: "Ask your GP or health visitor to refer you — you can't self-refer to this service.",
    contact: { web: "nidirect.gov.uk" },
  },
  {
    id: "ni-ea-sen-assessment",
    name: "Education Authority statutory SEN assessment",
    specialty: ["childdisability"],
    county: ["national"],
    blurb: "Northern Ireland's statutory special educational needs assessment, run by the Education Authority alongside — not instead of — HSC Trust health input. Can lead to a Statement of Special Educational Needs.",
    details: [
      "A parent, school or nursery can request an assessment for a child roughly aged 2–19.",
      "The statutory timeline is 26 weeks from request to decision, though this is frequently missed in practice — ask for written confirmation of your request date so you have something to point to if you need to chase it.",
      "A Statement can include health provision the HSC Trust has identified, so pursuing this doesn't need to wait on, or be instead of, a Child Development Clinic referral.",
      "If you disagree with the Education Authority's decision, you can appeal to SENDIST (Special Educational Needs and Disability Tribunal) within 2 months, or try the free Dispute Avoidance and Resolution Service (DARS) first.",
    ],
    referral: "Ask your child's school or nursery, or apply directly to the Education Authority.",
    contact: { web: "eani.org.uk" },
  },
  {
    id: "cuidiu",
    name: "Cuidiú",
    specialty: ["parenting", "feeding"],
    county: ["national"],
    blurb: "Volunteer-led parent-to-parent support: antenatal classes, breastfeeding support, and postnatal depression peer support.",
    details: ["Local branches nationwide — check the website for your area."],
    referral: "Self-referral via website.",
    contact: { web: "cuidiu.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "nurture-pnd",
    name: "Nurture",
    specialty: ["parenting", "mh"],
    county: ["national"],
    blurb: "Support and counselling specifically around pregnancy, birth, and postnatal depression.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "nurturehealth.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "treoir",
    name: "Treoir",
    specialty: ["parenting"],
    county: ["national"],
    blurb: "Free, confidential information for parents who are not married to or living with each other — legal, social welfare, and parenting questions.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "treoir.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "nisig",
    name: "National Infertility Support and Information Group (NISIG)",
    specialty: ["fertility"],
    county: ["national"],
    blurb: "Peer support and information for anyone experiencing infertility, alongside the clinical AHR pathway.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "nisig.ie" },
    checked: "4 Sep 2026"
  },

  // ==========================================================================
  // NATIONAL SERVICES DIRECTORY — built Sep 2026 from a sourced research pass
  // covering all 19 ROI maternity units, NI maternity by Trust, DV/SATU
  // national master lists, cancer support, contraception access, and more.
  // "Strong coverage" categories per the source doc: maternity, Rape Crisis
  // Centres, SATUs, Family Resource Centres (partial), fertility/endo/
  // menopause/perinatal-MH hubs. Some contacts (esp. volunteer-run orgs,
  // and anything marked FLAG in source) were not independently re-verified
  // — treat as a strong first pass, not final. Last reviewed: Sep 2026.
  // ==========================================================================

  // ---- Maternity & Obstetrics: the other 18 ROI units (CUMH already exists) ----
  {
    id: "cavan-maternity",
    name: "Cavan General Hospital Maternity",
    specialty: ["obs"],
    county: ["cavan", "monaghan"],
    blurb: "Maternity unit alongside a midwifery-led unit — Cavan is described as the main hospital for Cavan and Monaghan (and nearby border areas of Leitrim, Longford and Meath, though those counties have their own closer anchor hospitals covered elsewhere on this site).",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "049 437 6613", address: "Lisdaran, Cavan" },
    checked: "4 Sep 2026"
  },
  {
    id: "cavan-gynae",
    name: "Cavan General Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["cavan", "monaghan"],
    blurb: "Public gynaecology alongside obstetric, acute medical and surgical services — Cavan/Monaghan's main hospital for this.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "049 437 6000", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Lisdaran, Cavan H12 Y3C8" },
    checked: "4 Sep 2026"
  },
  {
    id: "letterkenny-maternity",
    name: "Letterkenny University Hospital Maternity",
    specialty: ["obs"],
    county: ["donegal"],
    blurb: "The maternity unit for Co. Donegal.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "074 912 5888", address: "Kilmacrennan Rd, Letterkenny F92 AE81" },
    checked: "4 Sep 2026"
  },
  {
    id: "letterkenny-gynae",
    name: "Letterkenny University Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["donegal"],
    blurb: "Public gynaecology department — its service was significant enough to be the subject of a dedicated Saolta service review.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "074 912 5888", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Kilmacrennan Rd, Letterkenny F92 AE81" },
    checked: "4 Sep 2026"
  },
  {
    id: "coombe-maternity",
    name: "Coombe Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin", "kildare"],
    blurb: "One of three Dublin maternity hospitals — also a maternity option for Kildare, which has no maternity unit of its own (Naas General doesn't run one).",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 408 5200", email: "patientadvocacy@coombe.ie", address: "Cork Street, Dublin D08 XW7X" },
    checked: "4 Sep 2026"
  },
  {
    id: "nmh-maternity",
    name: "National Maternity Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin", "kildare", "wicklow"],
    blurb: "One of three Dublin maternity hospitals — also a maternity option for Kildare and Wicklow, neither of which has a maternity unit of its own.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 637 3100", address: "Holles St, Dublin D02 YH21" },
    checked: "4 Sep 2026"
  },
  {
    id: "rotunda-maternity",
    name: "Rotunda Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin", "kildare"],
    blurb: "One of three Dublin maternity hospitals — also a maternity option for Kildare, which has no maternity unit of its own.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 817 1700", web: "rotunda.ie", address: "Parnell Square East, Dublin D01 P5W9" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-maternity",
    name: "University Hospital Galway Maternity",
    specialty: ["obs"],
    county: ["galway"],
    blurb: "The maternity unit for Galway city and much of the west.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "091 524 222", address: "Newcastle Rd, Galway H91 YR71" },
    checked: "4 Sep 2026"
  },
  {
    id: "portiuncula-maternity",
    name: "Portiuncula University Hospital Maternity",
    specialty: ["obs"],
    county: ["galway", "roscommon"],
    blurb: "Maternity unit serving east Galway and surrounding areas — also the real catchment hospital for Roscommon, which has had no maternity department of its own since 1978.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "090 9648200", email: "info.portiuncula@hse.ie", address: "Ballinasloe, Co. Galway H53 T971" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhk-maternity",
    name: "University Hospital Kerry Maternity",
    specialty: ["obs"],
    county: ["kerry"],
    blurb: "The maternity unit for Co. Kerry.",
    details: ["Maternity Emergency Service: 066 718 4324."],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "066 718 4000", address: "Tralee, Co. Kerry V92 NX94" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhk-gynae",
    name: "University Hospital Kerry Gynaecology",
    specialty: ["gynae"],
    county: ["kerry"],
    blurb: "Public gynaecology — outpatient, inpatient, ambulatory gynae, fertility, urogynaecology, menorrhagia and colposcopy clinics, confirmed on the hospital's own site.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "066 718 4000", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Tralee, Co. Kerry V92 NX94" },
    checked: "4 Sep 2026"
  },
  {
    id: "kilkenny-maternity",
    name: "St Luke's General Hospital Maternity",
    specialty: ["obs"],
    county: ["kilkenny"],
    blurb: "The maternity unit for Co. Kilkenny.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "056 778 5000", address: "Freshford Rd, Kilkenny R95 FY71" },
    checked: "4 Sep 2026"
  },
  {
    id: "portlaoise-maternity",
    name: "Midland Regional Hospital Portlaoise Maternity",
    specialty: ["obs"],
    county: ["laois"],
    blurb: "The maternity unit for Co. Laois.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "057 869 6481" },
    checked: "4 Sep 2026"
  },
  {
    id: "limerick-maternity",
    name: "University Maternity Hospital Limerick",
    specialty: ["obs"],
    county: ["limerick", "clare"],
    blurb: "The maternity unit for the Mid-West.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "061 483 129", address: "Ennis Road, Limerick V94 C566" },
    checked: "4 Sep 2026"
  },
  {
    id: "drogheda-maternity",
    name: "Our Lady of Lourdes Hospital Maternity (Drogheda)",
    specialty: ["obs"],
    county: ["louth", "meath"],
    blurb: "One of the busiest maternity units in the country, serving the whole north-east corridor including Meath and south Monaghan, alongside a midwifery-led unit.",
    details: ["Direct department lines: Antenatal Clinic (041 983 7601, ext. 2275), Labour Ward (ext. 2122)."],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "041 983 7601", address: "Windmill Road, Moneymore, Drogheda, Co. Louth A92 VW28" },
    checked: "4 Sep 2026"
  },
  {
    id: "drogheda-gynae",
    name: "Our Lady of Lourdes Hospital Gynaecology (Drogheda)",
    specialty: ["gynae"],
    county: ["louth", "meath"],
    blurb: "Public gynaecology department at the north-east's main acute hospital — the closest gynae service for most of Louth and Meath, filling what was previously the thinnest specialty/region combination on this site.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "041 983 7601", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Windmill Road, Moneymore, Drogheda, Co. Louth A92 VW28" },
    checked: "4 Sep 2026"
  },
  {
    id: "mayo-maternity",
    name: "Mayo University Hospital Maternity",
    specialty: ["obs"],
    county: ["mayo"],
    blurb: "The maternity unit for Co. Mayo.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "094 9021733", address: "Westport Rd, Castlebar" },
    checked: "4 Sep 2026"
  },
  {
    id: "mayo-gynae",
    name: "Mayo University Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["mayo"],
    blurb: "Public gynaecology department at Mayo's main acute hospital.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "094 904 2171", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Westport Road, Castlebar, Co. Mayo F23 KH70" },
    checked: "4 Sep 2026"
  },
  {
    id: "sligo-maternity",
    name: "Sligo University Hospital Maternity",
    specialty: ["obs"],
    county: ["sligo", "leitrim"],
    blurb: "The maternity unit for the northwest — catchment explicitly includes Sligo, Leitrim, south Donegal and west Cavan.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "071 917 1111", address: "The Mall, Sligo F91 H684" },
    checked: "4 Sep 2026"
  },
  {
    id: "sligo-gynae",
    name: "Sligo University Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["sligo", "leitrim"],
    blurb: "Public gynaecology, including outreach antenatal/gynae clinics in Carrick-on-Shannon and Manorhamilton — both in Co. Leitrim.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "071 917 1111", extra: "Main hospital switchboard — ask for Gynaecology.", address: "The Mall, Sligo F91 H684" },
    checked: "4 Sep 2026"
  },
  {
    id: "tipperary-maternity",
    name: "Tipperary University Hospital Maternity (South Tipp General)",
    specialty: ["obs"],
    county: ["tipperary"],
    blurb: "The maternity unit for Co. Tipperary, based in Clonmel.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "052 617 7000" },
    checked: "4 Sep 2026"
  },
  {
    id: "tipperary-gynae",
    name: "Tipperary University Hospital Gynaecology (South Tipp General)",
    specialty: ["gynae"],
    county: ["tipperary"],
    blurb: "Public gynaecology department, based in Clonmel.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "052 617 7000", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Western Road, Clonmel, Co. Tipperary E91 W651" },
    checked: "4 Sep 2026"
  },
  {
    id: "waterford-maternity",
    name: "University Hospital Waterford Maternity",
    specialty: ["obs"],
    county: ["waterford"],
    blurb: "The maternity unit for the southeast.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "051 848 000", address: "Dunmore Road, Waterford X91 ER8E" },
    checked: "4 Sep 2026"
  },
  {
    id: "mullingar-maternity",
    name: "Midland Regional Hospital Mullingar Maternity",
    specialty: ["obs"],
    county: ["westmeath", "longford"],
    blurb: "The maternity unit for Co. Westmeath — confirmed as also serving Co. Longford, which has no maternity unit of its own.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "044 934 0221", address: "Co. Westmeath N91 NA43" },
    checked: "4 Sep 2026"
  },
  {
    id: "mullingar-gynae",
    name: "Midland Regional Hospital Mullingar Gynaecology",
    specialty: ["gynae"],
    county: ["westmeath", "longford"],
    blurb: "Public gynaecology department, serving Westmeath and Longford — previously Longford had no entry on this site at all.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "044 934 0221", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Longford Road, Mullingar, Co. Westmeath N91 NA43" },
    checked: "4 Sep 2026"
  },
  {
    id: "wexford-maternity",
    name: "Wexford General Hospital Maternity",
    specialty: ["obs"],
    county: ["wexford"],
    blurb: "The maternity unit for Co. Wexford.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "053 915 3000", address: "Newtown Rd, Wexford Y35 Y17D" },
    checked: "4 Sep 2026"
  },
  {
    id: "wexford-gynae",
    name: "Wexford General Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["wexford"],
    blurb: "Public gynaecology department, with its own direct line separate from the main switchboard.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "053 914 2233", address: "Newtown Rd, Wexford Y35 Y17D" },
    checked: "4 Sep 2026"
  },
  {
    id: "stlukes-kilkenny-maternity",
    name: "St Luke's General Hospital Maternity (Carlow/Kilkenny)",
    specialty: ["obs"],
    county: ["kilkenny", "carlow"],
    blurb: "The maternity unit for the shared Carlow/Kilkenny hospital catchment.",
    details: ["Obstetric Assessment Unit: 056 778 5044 (daytime only)."],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "056 778 5288", address: "Freshford Road, Kilkenny, R95 FY71" },
    checked: "4 Sep 2026"
  },
  {
    id: "stlukes-kilkenny-gynae",
    name: "St Luke's General Hospital Gynaecology (Carlow/Kilkenny)",
    specialty: ["gynae"],
    county: ["kilkenny", "carlow"],
    blurb: "Public gynaecology department for the shared Carlow/Kilkenny catchment — previously the only county pairing in the South East with no gynaecology entry at all.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "056 778 5000", extra: "Main hospital switchboard — ask for Gynaecology.", address: "Freshford Road, Kilkenny, R95 FY71" },
    checked: "4 Sep 2026"
  },

  // ---- NI Maternity, by Trust (5) ----
  {
    id: "belfast-maternity",
    name: "Belfast Trust Maternity (Royal Jubilee & Mater)",
    specialty: ["obs"],
    county: ["antrim"],
    blurb: "Royal Jubilee Maternity Hospital (>5,000 births/yr) and the Mater Hospital.",
    details: ["Self-referral form available on belfasttrust.hscni.net."],
    referral: "Self-referral on positive pregnancy test.",
    contact: { email: "maternityreferral@belfasttrust.hscni.net", address: "274 Grosvenor Road, Belfast BT12 6BA" }
  },
  {
    id: "northern-maternity",
    name: "Northern Trust Maternity (Antrim Area Hospital)",
    specialty: ["obs"],
    county: ["antrim"],
    blurb: "Antrim Area Hospital maternity unit. Causeway Maternity Hub in Coleraine no longer delivers births (closed July 2023).",
    details: [],
    referral: "Self-referral form on northerntrust.hscni.net.",
    contact: { phone: "028 9442 4000", address: "Bretten Hall, Bush Road, Antrim BT41 2RL" },
    checked: "4 Sep 2026"
  },
  {
    id: "se-trust-maternity",
    name: "South Eastern Trust Maternity (Ulster Hospital)",
    specialty: ["obs"],
    county: ["down"],
    blurb: "Ulster Hospital delivery suite plus a 'Home from Home' alongside midwifery-led unit. Downe and Lagan Valley units no longer deliver births (antenatal care continues).",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9056 1364", email: "Maternity.Reception@setrust.hscni.net" },
    checked: "4 Sep 2026"
  },
  {
    id: "southern-trust-maternity",
    name: "Southern Trust Maternity (Craigavon & Daisy Hill)",
    specialty: ["obs"],
    county: ["armagh", "down"],
    blurb: "Craigavon Area Hospital and Daisy Hill Hospital, Newry (~5,100 births/yr). Birth at Home team since 2022.",
    details: [],
    referral: "Self-referral form on southerntrust.hscni.net.",
    contact: { phone: "028 3833 4444", email: "antenatal.midwives@southerntrust.hscni.net" },
    checked: "4 Sep 2026"
  },
  {
    id: "craigavon-gynae",
    name: "Craigavon Area Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["armagh"],
    blurb: "Gynaecology ward, located on Maternity Level 1 at Craigavon Area Hospital.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "028 3833 4444", extra: "Main hospital switchboard — ask for the Gynaecology Ward, Maternity Level 1.", address: "68 Lurgan Road, Portadown, Craigavon BT63 5QQ" },
    checked: "4 Sep 2026"
  },
  {
    id: "western-trust-maternity",
    name: "Western Trust Maternity (Altnagelvin & SWAH)",
    specialty: ["obs"],
    county: ["londonderry", "fermanagh", "tyrone"],
    blurb: "Altnagelvin Hospital (Derry/Londonderry) and South West Acute Hospital (Enniskillen) — the Trust's own assessment unit is named for Omagh, Co. Tyrone, so this already covers the west of the county.",
    details: ["Altnagelvin Maternal & Fetal Assessment Unit: 028 7161 1412.", "SWAH/Omagh Fetal Maternal Assessment (24hr): 028 8283 3100."],
    referral: "Self-referral.",
    contact: { phone: "028 7134 5171" },
    checked: "4 Sep 2026"
  },
  {
    id: "altnagelvin-gynae",
    name: "Altnagelvin Area Hospital Gynaecology",
    specialty: ["gynae"],
    county: ["londonderry"],
    blurb: "Gynaecology, including an Early Pregnancy Assessment Unit — Ward 43.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "028 7134 5171", extra: "Main hospital switchboard — ask for Ward 43, Gynaecology/EPAU.", address: "Glenshane Road, Londonderry BT47 6SB" },
    checked: "4 Sep 2026"
  },
  {
    id: "swah-gynae",
    name: "South West Acute Hospital Gynaecology (Enniskillen)",
    specialty: ["gynae"],
    county: ["fermanagh", "tyrone"],
    blurb: "Runs Women's Health Clinics and obstetrics/gynaecology services, unlike emergency general surgery which was suspended at SWAH in 2022 — confirmed still running. Covers all of Fermanagh and west Tyrone.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "028 6638 2000", extra: "Main hospital switchboard — ask for Gynaecology.", address: "124 Irvinestown Road, Enniskillen, Co. Fermanagh BT74 6DN" },
    checked: "4 Sep 2026"
  },

  // ---- Perinatal & Maternal Mental Health: other 5 hub hospitals + NI ----
  {
    id: "nmh-perinatal-mh",
    name: "National Maternity Hospital Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["dublin"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "01 637 3100" },
    checked: "4 Sep 2026"
  },
  {
    id: "rotunda-perinatal-mh",
    name: "Rotunda Hospital Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["dublin"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "01 817 2541", web: "rotunda.ie/mental-health/" },
    checked: "4 Sep 2026"
  },
  {
    id: "coombe-perinatal-mh",
    name: "Coombe Hospital Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["dublin"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "01 408 5569", web: "coombe.ie/specialist-perinatal-mental-health-iris-clinic" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhl-perinatal-mh",
    name: "University Maternity Hospital Limerick Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["limerick", "clare"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "061 483 129" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-perinatal-mh",
    name: "University Hospital Galway Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["galway"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams. The other 13 ROI maternity units are 'spoke' sites with a mental-health midwife linked to a hub team.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "091 524 222" },
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-perinatal-mh",
    name: "Belfast Trust Community Perinatal Mental Health Service",
    specialty: ["mh"],
    county: ["antrim"],
    blurb: "Specialist perinatal MH teams now exist in all five NI Trusts. See the 'Mother & Baby Unit status' entry for inpatient care.",
    details: ["Clinics also at Crumlin Road Health Centre, Woodstock Lodge, and the Royal Jubilee Maternity Hospital."],
    referral: "GP, midwife, or health visitor referral.",
    contact: { phone: "028 9504 6223", address: "Knockbracken Healthcare Park, Belfast" },
    checked: "4 Sep 2026"
  },
  {
    id: "mbu-status",
    name: "Mother & Baby Unit status (ROI & NI)",
    specialty: ["mh", "obs"],
    county: ["national"],
    blurb: "No mother & baby psychiatric unit currently operates in either jurisdiction — mothers needing inpatient mental health care are admitted without their baby.",
    details: [
      "Northern Ireland: confirmed — Belfast City Hospital, expected to open 2028/29 (announced 30 April 2026).",
      "Republic of Ireland: funded via Budget 2026 but no opening date yet — planned units at St Vincent's, Dublin (co-located with the new National Maternity Hospital) and a 6-bed unit in Limerick (St Joseph's Hospital campus)."
    ],
    referral: "Not applicable — no unit yet open in either jurisdiction. For perinatal mental health support in the meantime, see the Specialist Perinatal Mental Health Team entries.",
    checked: "5 Sep 2026"
  },
  {
    id: "southern-perinatal-mh",
    name: "Southern Trust Perinatal Mental Health Team",
    specialty: ["mh"],
    county: ["armagh", "down"],
    blurb: "Accepts referrals from 12 weeks' pregnancy to baby's first birthday.",
    details: [],
    referral: "GP, midwife, or health visitor referral.",
    contact: { phone: "028 3833 4444", extra: "Main hospital switchboard — ask for the Perinatal Mental Health Team." },
    checked: "4 Sep 2026"
  },

  // ---- Domestic & Sexual Violence: 17 ROI Rape Crisis Centres ----
  {
    id: "rcc-athlone",
    name: "Athlone Midlands Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["westmeath"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 306 600", web: "amrcc.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-carlow",
    name: "Carlow & South Leinster Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["carlow"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 727 737", web: "carlow-kildare-slrcc.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-donegal",
    name: "Donegal Sexual Abuse & Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["donegal"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 448 844", web: "donegalrapecrisis.ie", address: "2A Grand Central Canal Road, Letterkenny, Co. Donegal F92 PN40" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-dublin",
    name: "Dublin Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["dublin"],
    blurb: "National 24hr helpline.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 778 888", web: "drcc.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-northeast",
    name: "Rape Crisis Northeast (Dundalk)",
    specialty: ["dsv"],
    county: ["louth"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 212 122", web: "rcne.ie" }
  },
  {
    id: "rcc-galway",
    name: "Galway Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["galway"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 355 355", web: "galwayrcc.org" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-kerry",
    name: "Kerry Rape & Sexual Abuse Centre",
    specialty: ["dsv"],
    county: ["kerry"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 633 333", web: "krsac.com", address: "Tralee" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-kilkenny",
    name: "Kilkenny Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["kilkenny"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 478 478", web: "kasa.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-midwest",
    name: "Rape Crisis Midwest (Limerick)",
    specialty: ["dsv"],
    county: ["limerick", "clare"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 311 511", web: "rapecrisis.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-mayo",
    name: "Mayo Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["mayo"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 234 900", web: "mrcc.ie", address: "Castlebar" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-sligo",
    name: "Rape Crisis Centre Sligo, Leitrim & West Cavan",
    specialty: ["dsv"],
    county: ["sligo"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 750 780", web: "srcc.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-tipperary",
    name: "Tipperary Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["tipperary"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 340 340", web: "trcc.ie", address: "Clonmel" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-tullamore",
    name: "Tullamore Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["offaly"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 323 232", web: "tullamorerapecrisis.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-waterford",
    name: "Waterford Rape & Sexual Abuse Centre",
    specialty: ["dsv"],
    county: ["waterford"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 296 296", web: "waterfordrsac.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-westcork",
    name: "West Cork Beacon (Bantry)",
    specialty: ["dsv"],
    county: ["cork-west"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 832 001", web: "westcorkwomensproject.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rcc-wexford",
    name: "Wexford Rape Crisis",
    specialty: ["dsv"],
    county: ["wexford"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 33 00 33", web: "wexfordrapecrisis.com" },
    checked: "4 Sep 2026"
  },

  // ---- Domestic & Sexual Violence: 6 ROI SATUs (Sexual Assault Treatment Units) ----
  {
    id: "satu-cork",
    name: "Cork SATU (South Infirmary Victoria University Hospital)",
    specialty: ["dsv"],
    county: ["cork-city"],
    blurb: "Sexual Assault Treatment Unit — forensic and medical care after a recent sexual assault.",
    details: ["Weekdays 8am–4:30pm: 021 492 6297.", "Out-of-hours: 021 492 6100."],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "021 492 6297" },
    checked: "4 Sep 2026"
  },
  {
    id: "satu-donegal",
    name: "Donegal SATU (Letterkenny)",
    specialty: ["dsv"],
    county: ["donegal"],
    blurb: "Sexual Assault Treatment Unit — 24hr direct line.",
    details: [],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "087 06 81 964", address: "Justice Walsh Road, Letterkenny" }
  },
  {
    id: "satu-dublin",
    name: "Dublin SATU (Rotunda Hospital campus)",
    specialty: ["dsv"],
    county: ["dublin"],
    blurb: "Sexual Assault Treatment Unit.",
    details: ["Weekdays 8am–5pm: 01 817 1736.", "Out-of-hours: 01 817 1700."],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "01 817 1736" },
    checked: "4 Sep 2026"
  },
  {
    id: "satu-galway",
    name: "Galway SATU",
    specialty: ["dsv"],
    county: ["galway"],
    blurb: "Sexual Assault Treatment Unit, near Galway Racecourse.",
    details: [],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "091 765 751" }
  },
  {
    id: "satu-mullingar",
    name: "Mullingar SATU (Midland Regional Hospital)",
    specialty: ["dsv"],
    county: ["westmeath"],
    blurb: "Sexual Assault Treatment Unit.",
    details: ["Weekdays 8am–5pm: 044 9394239.", "Out-of-hours switchboard: 044 93 40221."],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "044 9394239" },
    checked: "4 Sep 2026"
  },
  {
    id: "satu-waterford",
    name: "Waterford SATU (University Hospital Waterford)",
    specialty: ["dsv"],
    county: ["waterford"],
    blurb: "Sexual Assault Treatment Unit. Note: there is no SATU in Limerick — out-of-hours access there routes via Cork or Galway.",
    details: ["Weekdays 8am–5pm: 051 842 157.", "Out-of-hours: 051 848 000."],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "051 842 157" },
    checked: "4 Sep 2026"
  },

  // ---- Domestic & Sexual Violence: Northern Ireland ----
  {
    id: "rowan-sarc-ni",
    name: "The Rowan SARC (Northern Ireland)",
    specialty: ["dsv"],
    county: ["antrim"],
    blurb: "NI's single regional Sexual Assault Referral Centre — the NI equivalent of a SATU, covering the whole of Northern Ireland.",
    details: [],
    referral: "Self-referral or via PSNI, 24/7.",
    contact: { phone: "0800 389 4424", web: "therowan.hscni.net", address: "Antrim Area Hospital, 45 Bush Road, Antrim BT41 2RL" },
    checked: "4 Sep 2026"
  },
  {
    id: "nexus-ni",
    name: "Nexus NI",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "Specialist counselling for sexual-abuse survivors, and the 24hr NI Domestic & Sexual Abuse Helpline.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0808 802 1414" },
    checked: "4 Sep 2026"
  },
  {
    id: "womens-aid-ni",
    name: "Women's Aid Federation NI",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "Domestic violence support and refuge network across Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9024 9041", email: "info@womensaidni.org", address: "The Annex, 30 Adelaide Park, Belfast BT9 6FY" },
    checked: "4 Sep 2026"
  },
  {
    id: "womens-aid-armagh-down",
    name: "Women's Aid Armagh Down",
    specialty: ["dsv"],
    county: ["down", "armagh"],
    blurb: "Local Women's Aid group covering Armagh and Down District — refuge, outreach, and support for women and children experiencing domestic abuse.",
    details: [],
    referral: "Self-referral; 24hr NI Domestic & Sexual Abuse Helpline: 0808 802 1414.",
    contact: { phone: "028 3025 0765", email: "admin@womensaidarmaghdown.org" },
    checked: "6 Sep 2026"
  },
  {
    id: "foyle-womens-aid",
    name: "Foyle Women's Aid",
    specialty: ["dsv"],
    county: ["londonderry"],
    blurb: "Domestic and sexual violence support covering Derry/Londonderry, Strabane, Limavady, and Dungiven, including secure refuge accommodation.",
    details: [],
    referral: "Self-referral; 24hr NI Domestic & Sexual Abuse Helpline: 0808 802 1414.",
    contact: { phone: "028 7141 6800", address: "Foyle Family Justice Centre, 7-9 Bishop Street, Derry/Londonderry BT48 6PL" },
    checked: "6 Sep 2026"
  },
  {
    id: "meath-womens-refuge",
    name: "Meath Women's Refuge & Support Services",
    specialty: ["dsv"],
    county: ["meath"],
    blurb: "Emergency refuge, a 24-hour helpline, and outreach support (including court accompaniment) for women and children experiencing domestic violence in Co. Meath.",
    details: [],
    referral: "Self-referral, 24 hours a day.",
    contact: { phone: "046 902 2393", address: "39 Flowerhill, Navan, Co. Meath" },
    checked: "6 Sep 2026"
  },

  // ---- Cancer support: regional centres (ROI) + NI ----
  {
    id: "arc-dublin",
    name: "ARC Cancer Support Centres (Dublin)",
    specialty: ["cancer"],
    county: ["dublin"],
    blurb: "Free counselling and complementary therapy across three Dublin locations.",
    details: ["ARC House, 65 Eccles Street, D07 TD35.", "559 South Circular Road, Dublin 8.", "Lowell House, 23 Herbert Avenue, Dublin 4."],
    referral: "Self-referral.",
    contact: { phone: "01 215 0250", email: "info@arccancersupport.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "cork-arc-house",
    name: "Cork ARC Cancer Support House",
    specialty: ["cancer"],
    county: ["cork-city"],
    blurb: "Free cancer support services, including for gynaecological cancers.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 427 6688" },
    checked: "4 Sep 2026"
  },
  {
    id: "cork-cancer-care-centre",
    name: "The Cork Cancer Care Centre",
    specialty: ["cancer"],
    county: ["cork-city"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 4949090" },
    checked: "4 Sep 2026"
  },
  {
    id: "recovery-haven-kerry",
    name: "Recovery Haven Kerry",
    specialty: ["cancer"],
    county: ["kerry"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "066 719 2122" },
    checked: "4 Sep 2026"
  },
  {
    id: "solas-waterford",
    name: "Solas Cancer Support Centre Waterford",
    specialty: ["cancer"],
    county: ["waterford"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "051 304604" },
    checked: "4 Sep 2026"
  },
  {
    id: "purple-house-bray",
    name: "Purple House Cancer Support Bray",
    specialty: ["cancer"],
    county: ["wicklow"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 286 6966" },
    checked: "4 Sep 2026"
  },
  {
    id: "suir-haven-thurles",
    name: "Suir Haven Cancer Support Thurles",
    specialty: ["cancer"],
    county: ["tipperary"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0504 21197" },
    checked: "4 Sep 2026"
  },
  {
    id: "hope-cancer-wexford",
    name: "Hope Cancer Support Centre Wexford",
    specialty: ["cancer"],
    county: ["wexford"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "053 923 8555" },
    checked: "4 Sep 2026"
  },
  {
    id: "action-cancer-ni",
    name: "Action Cancer (Northern Ireland)",
    specialty: ["cancer"],
    county: ["antrim"],
    blurb: "Breast screening (ages 40–49 & 70+) and therapeutic services from 15 regional locations across NI.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9080 3344", email: "info@actioncancer.org", address: "20 Windsor Avenue, Belfast BT9 6EE" },
    checked: "4 Sep 2026"
  },
  {
    id: "cancer-focus-ni",
    name: "Cancer Focus NI",
    specialty: ["cancer"],
    county: ["antrim"],
    blurb: "Cancer Nurseline and support services across Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0800 783 3339", email: "nurseline@cancerfocusni.org", address: "40-44 Eglantine Avenue, Belfast BT9 6DX" },
    checked: "4 Sep 2026"
  },

  // ---- Contraception & reproductive health: access points ----
  {
    id: "ifpa-dublin",
    name: "Irish Family Planning Association (IFPA) Clinics",
    specialty: ["contraception"],
    county: ["dublin"],
    blurb: "Free Contraception Scheme provider (ages 17–35); also pregnancy counselling.",
    details: ["5-7 Cathal Brugha Street, Dublin 1, D01 F9K7 — 01 872 7088.", "The Square Shopping Centre, Tallaght, D24 HK33 — 01 459 7685.", "Pregnancy counselling also at Galway, Limerick, Waterford."],
    referral: "Self-referral.",
    contact: { phone: "01 872 7088" },
    resources: [
      { label: "Contraception methods — patient.info", url: "https://patient.info/sexual-health/contraception-methods" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "well-woman-coolock",
    name: "Dublin Well Woman Centre (Coolock)",
    specialty: ["contraception"],
    county: ["dublin"],
    blurb: "Free Contraception Scheme access point.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 848 4511" },
    checked: "4 Sep 2026"
  },
  {
    id: "femplus-blanchardstown",
    name: "Femplus (Blanchardstown)",
    specialty: ["contraception"],
    county: ["dublin"],
    blurb: "Free Contraception Scheme access point.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 821 0999" },
    checked: "4 Sep 2026"
  },
  {
    id: "informing-choices-ni",
    name: "Informing Choices NI",
    specialty: ["contraception"],
    county: ["antrim"],
    blurb: "Central Access Point for reproductive healthcare information in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9031 6100", email: "info@informingchoicesni.org", address: "Ascot House, 24-31 Shaftesbury Square, Belfast BT2 7DB" },
    checked: "4 Sep 2026"
  },
  {
    id: "common-youth-ni",
    name: "Common Youth (NI, under-25s)",
    specialty: ["contraception"],
    county: ["antrim"],
    blurb: "Sexual health service for under-25s in Northern Ireland (formerly Brook NI).",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9032 8866", email: "hello@commonyouth.com" },
    checked: "4 Sep 2026"
  },

  // ---- Breastfeeding: La Leche League (Cuidiú already exists) ----
  {
    id: "lll-ireland",
    name: "La Leche League of Ireland",
    specialty: ["feeding", "parenting"],
    county: ["national"],
    blurb: "100 volunteer Leaders across 35 breastfeeding support groups island-wide.",
    details: ["NI groups via Belfast: 028 9581 8118 / lalecheleaguebelfast@gmail.com."],
    referral: "Self-referral via website.",
    contact: { web: "lalecheleagueireland.com/groups" },
    checked: "4 Sep 2026"
  },
  {
    id: "friends-of-breastfeeding",
    name: "Friends of Breastfeeding",
    specialty: ["feeding", "parenting"],
    county: ["national"],
    blurb: "Mum2Mum peer-support groups plus a one-to-one \"Breastfeeding Buddy\" scheme pairing you with an experienced mother by text, phone, email, or video call.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "friendsofbreastfeeding.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "alci-ibclc-directory",
    name: "Association of Lactation Consultants of Ireland (ALCI)",
    specialty: ["feeding"],
    county: ["national"],
    blurb: "All-Ireland directory of International Board Certified Lactation Consultants (IBCLCs) — a paid, one-to-one option if you need specialist help.",
    details: [],
    referral: "Self-referral via the directory.",
    contact: { web: "alcireland.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "ni-breastfeeding-support",
    name: "NI breastfeeding support (PHA)",
    specialty: ["feeding"],
    county: ["national"],
    blurb: "100+ free peer-support groups across Northern Ireland, searchable on an interactive map, plus \"Breastfeeding Welcome Here\" venues.",
    details: [
      "Referral to a Breastfeeding Peer Support Volunteer can come via your midwife or health visitor, or you can self-refer.",
      "Each HSC Trust also has an Infant Feeding Lead.",
      "Per the PHA, breastfeeding rates at discharge rose from 45% to 50% (2010-2020), but there's a steep drop-off — only 21% of babies are still receiving breastmilk at 6 months, with 9 in 10 mothers stopping before they intended to.",
    ],
    referral: "Self-referral, or via your midwife/health visitor.",
    contact: { web: "breastfedbabies.org" },
    checked: "6 Sep 2026"
  },

  // ---- Baby loss: additional national orgs ----
  {
    id: "anam-cara",
    name: "Anam Cara",
    specialty: ["loss"],
    county: ["national"],
    blurb: "Support for bereaved parents and siblings after the death of a child.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 404 5378", web: "anamcara.ie", address: "Tallaght, Dublin 24" },
    checked: "4 Sep 2026"
  },
  {
    id: "ectopic-ireland",
    name: "Ectopic Ireland",
    specialty: ["loss"],
    county: ["national"],
    blurb: "Support and information specifically after an ectopic pregnancy.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 893 6992", web: "ectopicireland.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "sands-ni",
    name: "Sands NI",
    specialty: ["loss"],
    county: ["national"],
    blurb: "Stillbirth and neonatal death support, with monthly local groups in Antrim, Belfast, Downpatrick, Enniskillen, Newry, North Down, and Portadown.",
    details: ["UK Sands helpline: 0808 164 3332."],
    referral: "Self-referral.",
    contact: { phone: "07740 993450", email: "NorthernIreland@sandsvolunteer.org.uk" },
    checked: "4 Sep 2026"
  },

  // ---- Patchy categories: no compact national list exists (per source doc).
  // Honest pointer entries rather than fabricated county-by-county listings —
  // these are explicitly flagged as needing local knowledge / crowdsourcing. ----
  {
    id: "phn-locator",
    name: "Find your local Public Health Nurse",
    specialty: ["phn"],
    county: ["national"],
    blurb: "PHNs are based at your local Primary Care Centre and their coverage areas are informal and change with staffing — so the right first step is finding your centre, not a fixed contact list.",
    details: [
      "ROI: use the HSE's Primary Care Centre locator to find your nearest centre, then ask reception for Public Health Nursing.",
      "NI: use the HSC Service Finder to find your nearest health centre, then ask for the Health Visiting / Public Health Nursing team.",
      "You can also be referred by your GP or midwife."
    ],
    referral: "Self-referral via your local Primary Care Centre, or GP/midwife referral.",
    contact: { phone: "1800 700 700", web: "www2.hse.ie/services/primary-care-centres/" },
    checked: "5 Sep 2026"
  },
  {
    id: "ni-health-visiting",
    name: "NI Health Visiting & Family Nurse Partnership",
    specialty: ["phn"],
    county: ["national"],
    blurb: "NI's equivalent of public health nursing for ages 0-4, delivered by HSC Trust health-visiting teams.",
    details: [
      "Example: Belfast Trust health-visiting helpline 028 9504 0846 / HVadvice@belfasttrust.hscni.net.",
      "The Family Nurse Partnership (FNP) is a voluntary, more intensive programme for first-time parents under about 19-20, from pregnancy until the child turns 2 — one team per Trust (5 total), PHA-commissioned, accessed via a midwife or health professional.",
      "Directory at familysupportni.gov.uk.",
    ],
    referral: "Via HSC Trust health-visiting teams, or a midwife/health professional for FNP.",
    contact: { web: "familysupportni.gov.uk" },
    checked: "6 Sep 2026"
  },
  {
    id: "find-urology",
    name: "Find urology / urogynaecology care near you",
    specialty: ["urology"],
    county: ["national"],
    blurb: "No compact national list exists — urology services relevant to women's health (recurrent UTIs, incontinence, urogynae) sit within major hospitals per region.",
    details: ["Start with your nearest major hospital (e.g. CUH Cork, UHL Limerick, UHG Galway, or a Dublin academic hospital) or ask your GP directly."],
    referral: "GP referral.",
    contact: {},
    checked: "4 Sep 2026"
  },
  {
    id: "find-gynae-onc",
    name: "Find gynae-oncology rapid access / colposcopy care",
    specialty: ["cancer", "gynae"],
    county: ["national"],
    blurb: "No compact national list exists — these clinics are distributed across designated cancer centres and CervicalCheck colposcopy units.",
    details: ["Colposcopy after an abnormal CervicalCheck result is automatic. For a new suspected-cancer concern, ask your GP to refer you on the rapid-access pathway explicitly."],
    referral: "GP referral, flagged as rapid access; colposcopy is automatic via CervicalCheck.",
    contact: {},
    checked: "4 Sep 2026"
  },
  {
    id: "find-breastfeeding-group",
    name: "Find your local HSE breastfeeding support group",
    specialty: ["feeding"],
    county: ["national"],
    blurb: "HSE runs breastfeeding groups searchable by county, though there's no compact master list.",
    details: [],
    referral: "Self-referral via the HSE's searchable directory.",
    contact: { web: "www2.hse.ie/services/breastfeeding-support" },
    checked: "4 Sep 2026"
  },
  {
    id: "find-frc",
    name: "Find your local Family Resource Centre",
    specialty: ["hub"],
    county: ["national"],
    blurb: "136 Family Resource Centres nationwide (Tusla-funded) — the definitive list is an interactive county map, too large to list individually here yet.",
    details: ["Network grew from 126 to 136 centres in 2025–26; core funding raised to €180,000/yr per centre from January 2026."],
    referral: "Self-referral — browse the map for your nearest centre.",
    contact: { web: "familyresource.ie/family-resource-centres-ireland.php" }
  },

  // ==========================================================================
  // GENERAL MEDICAL & SURGICAL SPECIALTIES — added Sep 2026 from a supplement
  // research pass covering cardiology, rheumatology, neurology, GI, chronic
  // pain, Long Covid/ME-CFS, bone health, genetics, sexual health, pelvic
  // physio, and vascular. Note per the source doc: this pass was run via
  // individual web searches (not the extended tool) so coverage is shallower
  // than the earlier passes — several phone numbers are flagged as needing
  // verification before being relied on. Categories NOT covered by any
  // research doc so far: dermatology, respiratory medicine, ophthalmology —
  // these remain unbuilt. Last reviewed: Sep 2026.
  // ==========================================================================

  // ---- Cardiology & Women's Heart Health ----
  {
    id: "croi",
    name: "Croí — The Heart & Stroke Charity",
    specialty: ["cardiology", "stroke"],
    county: ["galway"],
    blurb: "Runs the 'Women at Heart' education campaign — only 3% of Irish women surveyed (2025) could name all heart-attack warning signs, despite 1 in 4 Irish women dying from cardiovascular disease.",
    details: [
      "Women's heart-attack symptoms (jaw, neck, back pain) can differ from men's and are often missed.",
      "Runs the free Heartlink West supportline: 091 544310.",
    ],
    referral: "Self-referral for information and supports.",
    contact: { phone: "091 332999", email: "healthteam@croi.ie", address: "Croí House, Moyola Lane, Newcastle, Galway H91 FF68" },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-heart-foundation",
    name: "Irish Heart Foundation",
    specialty: ["cardiology", "stroke"],
    county: ["dublin"],
    blurb: "Publishes 'Her Heart Matters' women's heart health resources, with HSE and Dept of Health support — also the main national charity supporting stroke survivors.",
    details: [
      "Stroke Connect Service: 8 weeks of phone support for stroke survivors aged 18+, self-referral or via a healthcare professional.",
      "Also runs Life After Stroke Facebook groups, a Young Stroke Survivor Network (under-65), aphasia supports (Aphasia-Friendly Café, \"Rhythm of Recovery\" choir), and local stroke support groups.",
    ],
    referral: "Self-referral for information and supports.",
    contact: { phone: "01 668 5001", email: "info@irishheart.ie", address: "17-19 Rathmines Rd Lower, Dublin D06 C780" },
    checked: "6 Sep 2026"
  },
  {
    id: "hse-cardiology-referral",
    name: "About HSE cardiology outpatient & heart failure clinic referral",
    specialty: ["cardiology"],
    county: ["national"],
    blurb: "A GP or consultant referral letter is needed for a cardiology outpatient appointment or cardiac tests — heart failure clinics run at many (not all) hospitals, staffed by specialist heart failure nurses.",
    details: [
      "Named examples: University Hospital Limerick, Ennis Hospital, and Nenagh Hospital all run heart failure clinics.",
      "A chronic disease management programme in general practice now provides structured heart failure care through your GP, and some areas use virtual/phone consultation between a GP and a cardiologist to avoid an outpatient referral altogether — ask your GP if this is available locally.",
    ],
    referral: "GP or consultant referral letter.",
    contact: {},
    checked: "6 Sep 2026"
  },
  {
    id: "ni-cardiology-hub",
    name: "Royal Victoria Hospital Belfast — Regional Cardiology & Cardiac Surgery",
    specialty: ["cardiology"],
    county: ["antrim"],
    blurb: "NI's sole cardiac surgery provider (around 1,000 operations a year) and Regional Medical Cardiology Centre, also running the region's congenital heart disease service (antenatal, paediatric, and adult).",
    details: [],
    referral: "GP or consultant referral.",
    contact: { extra: "Belfast Trust switchboard — ask for Cardiology or Cardiac Surgery." },
    checked: "6 Sep 2026"
  },
  {
    id: "find-chest-pain-clinic",
    name: "Find your nearest Rapid Access Chest Pain Clinic",
    specialty: ["cardiology"],
    county: ["national"],
    blurb: "Nurse-led rapid-access clinics run out of most public hospitals with a cardiology department — no single compact national list found yet.",
    details: ["Confirmed example: University Hospital Limerick offers same-week GP-referral assessment. Ask your GP whether your nearest hospital runs one."],
    referral: "GP referral.",
    contact: {},
    checked: "4 Sep 2026"
  },

  // ---- Rheumatology & Autoimmune ----
  {
    id: "arthritis-ireland",
    name: "Arthritis Ireland",
    specialty: ["rheumatology"],
    county: ["national"],
    blurb: "National helpline and Clinic Referral Programme linking newly-diagnosed patients into self-management support.",
    details: ["A 2026 survey (1,400+ respondents, 85% women) found people with more severe symptoms nearly twice as likely to wait over a year for a first rheumatology appointment."],
    referral: "Self-referral to the helpline; ask about the Clinic Referral Programme.",
    contact: { phone: "0818 252 846", email: "helpline@arthritisireland.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "versus-arthritis-ni",
    name: "Versus Arthritis NI",
    specialty: ["rheumatology"],
    county: ["national"],
    blurb: "Information and support for arthritis and autoimmune joint conditions in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9078 2940", email: "niservicesteam@versusarthritis.org" },
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-rheumatology",
    name: "Belfast Trust Rheumatology Service",
    specialty: ["rheumatology"],
    county: ["antrim"],
    blurb: "Operates across three Belfast Trust hospital sites, including inflammatory arthritis and lupus flare-management resources.",
    details: [],
    referral: "GP referral.",
    contact: { web: "belfasttrust.hscni.net" },
    checked: "4 Sep 2026"
  },
  {
    id: "cuh-rheumatology",
    name: "Cork University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["cork-city"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "021 492 2468" },
    checked: "4 Sep 2026"
  },
  {
    id: "sivuh-rheumatology",
    name: "South Infirmary-Victoria Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["cork-city"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "021 492 6219" }
  },
  {
    id: "merlin-park-rheumatology",
    name: "Merlin Park Regional Hospital Rheumatology (Galway)",
    specialty: ["rheumatology"],
    county: ["galway"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "091 775511" }
  },
  {
    id: "nw-rheumatology-leitrim",
    name: "North-Western Rheumatology Unit (Manorhamilton)",
    specialty: ["rheumatology"],
    county: ["leitrim"],
    blurb: "Regional rheumatology unit at Our Lady's Hospital, serving the North West.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "071 9820406" },
    checked: "4 Sep 2026"
  },
  {
    id: "uhl-rheumatology",
    name: "University Hospital Limerick Rheumatology",
    specialty: ["rheumatology"],
    county: ["limerick", "clare"],
    blurb: "Public rheumatology department (Rheumatology Clinical Network hub site).",
    details: [],
    referral: "GP referral.",
    contact: { phone: "061 485215" },
    checked: "4 Sep 2026"
  },
  {
    id: "tullamore-rheumatology",
    name: "Midlands Regional Hospital Tullamore Rheumatology",
    specialty: ["rheumatology"],
    county: ["offaly"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "057 9358603" }
  },
  {
    id: "tullamore-maternity",
    name: "Midland Regional Hospital Tullamore Maternity",
    specialty: ["obs"],
    county: ["offaly"],
    blurb: "The maternity unit for Co. Offaly.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "057 932 1501", extra: "Main hospital switchboard — ask for the Maternity Unit.", address: "Arden Road, Tullamore, Co. Offaly R35 NY51" },
    checked: "4 Sep 2026"
  },
  {
    id: "waterford-rheumatology",
    name: "University Hospital Waterford Rheumatology",
    specialty: ["rheumatology"],
    county: ["waterford"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "051 842023" }
  },
  {
    id: "stvincents-rheumatology",
    name: "St Vincent's University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department (Rheumatology Clinical Network hub site).",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 221 4779" },
    checked: "4 Sep 2026"
  },
  {
    id: "mater-rheumatology",
    name: "Mater Misericordiae University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 803 4141" },
    checked: "4 Sep 2026"
  },
  {
    id: "stjames-rheumatology",
    name: "St James's Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 416 2551" },
    checked: "4 Sep 2026"
  },
  {
    id: "beaumont-rheumatology",
    name: "Beaumont Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 809 3314" }
  },
  {
    id: "connolly-rheumatology",
    name: "Connolly Hospital, Blanchardstown — Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 646 6242" }
  },
  {
    id: "tallaght-rheumatology",
    name: "Tallaght University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 414 3350" }
  },
  {
    id: "navan-rheumatology",
    name: "Our Lady's Hospital, Navan — Regional Rheumatology",
    specialty: ["rheumatology"],
    county: ["meath"],
    blurb: "Regional rheumatology service covering Cavan, Monaghan, Louth, and Meath.",
    details: [],
    referral: "GP or consultant referral.",
    contact: { phone: "046 907 2630", extra: "Main hospital switchboard — ask for Rheumatology." }
  },
  {
    id: "find-rheumatology",
    name: "About diagnostic delay in rheumatology",
    specialty: ["rheumatology"],
    county: ["national"],
    blurb: "Rheumatoid arthritis affects an estimated 45,000 people in Ireland (2,000+ new diagnoses/year), more commonly women, usually diagnosed between ages 30–50.",
    details: [
      "There's no Ireland-specific diagnostic-delay figure available. The international benchmark for axial spondyloarthritis is a 7.4-year average delay (IMAS study, 27 countries) — women wait notably longer than men (11.2 vs 5.2 years in one cohort).",
      "Department locations/phone numbers above are current; individual consultant names change more often, so we haven't listed them.",
    ],
    referral: "GP referral.",
    contact: {},
    resources: [
      { label: "Rheumatoid arthritis — patient.info", url: "https://patient.info/bones-joints-muscles/rheumatoid-arthritis-leaflet" },
      { label: "Ankylosing spondylitis — patient.info", url: "https://patient.info/bones-joints-muscles/ankylosing-spondylitis" },
      { label: "Lupus — patient.info", url: "https://patient.info/skin-conditions/lupus-systemic-lupus-erythematosus" }
    ],
    checked: "4 Sep 2026"
  },

  // ---- Neurology & Migraine ----
  {
    id: "migraine-ireland",
    name: "Migraine Association of Ireland",
    specialty: ["neurology"],
    county: ["dublin"],
    blurb: "National information line staffed by a Clinical Nurse Specialist. Migraine affects ~15% of the population and is three times more common in women.",
    details: [],
    referral: "Self-referral to the Advice Line.",
    contact: { phone: "01 906 1012", email: "info@migraine.ie", address: "Northside Enterprise Centre, Block C, Bunratty Drive, Coolock, Dublin D17 PD77" },
    resources: [
      { label: "Migraine — patient.info", url: "https://patient.info/brain-nerves/migraine-leaflet" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "beaumont-migraine-clinic",
    name: "Beaumont Hospital Headache/Migraine Clinic",
    specialty: ["neurology"],
    county: ["dublin"],
    blurb: "Specialist headache/migraine clinic referenced by the Migraine Association.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for the Headache/Migraine Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "beaumont-national-neuroscience",
    name: "Beaumont Hospital National Neuroscience Centre",
    specialty: ["neurology"],
    county: ["dublin"],
    blurb: "Ireland's national neurology/neurosurgery centre — covers epilepsy, stroke, MS, movement disorders, and general neurology alongside neurosurgery.",
    details: ["Dedicated line for traumatic brain injury referrals: 1800 872 862 (1800-TRAUMA)."],
    referral: "GP referral via Healthlink to the Neurology Department.",
    contact: { phone: "01 797 4105", email: "neurologyadmin@beaumont.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "ms-ireland",
    name: "MS Ireland",
    specialty: ["neurology"],
    county: ["national"],
    blurb: "National charity for people with multiple sclerosis — information line plus local support services.",
    details: ["Clinical referrals for a new or existing MS diagnosis go to the Multiple Sclerosis Unit, Department of Neurology, St James's Hospital, not to the charity directly."],
    referral: "Self-referral to the information line; GP/neurology referral for clinical assessment.",
    contact: { phone: "0818 233 233", web: "ms-society.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "epilepsy-ireland",
    name: "Epilepsy Ireland",
    specialty: ["neurology"],
    county: ["national"],
    blurb: "National charity supporting people with epilepsy of all ages — Community Resource Officers, and a Young Epilepsy Programme (8-24).",
    details: ["St James's Hospital runs a Regional Epilepsy Service for clinical referrals."],
    referral: "Self-referral to the charity; GP/neurology referral for clinical assessment.",
    contact: { phone: "01 455 7500", email: "info@epilepsy.ie", web: "epilepsy.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "ms-society-ni",
    name: "MS Society Northern Ireland",
    specialty: ["neurology"],
    county: ["antrim"],
    blurb: "Northern Ireland branch of the MS Society — Belfast resource centre plus a UK-wide helpline.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0808 800 8000", extra: "Belfast Resource Centre: 028 9080 2802", email: "info@mssocietyni.co.uk" },
    checked: "6 Sep 2026"
  },
  {
    id: "epilepsy-action-ni",
    name: "Epilepsy Action Northern Ireland",
    specialty: ["neurology"],
    county: ["antrim"],
    blurb: "NI arm of Epilepsy Action — information, advice, and support for anyone affected by epilepsy.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9018 4015", extra: "UK-wide helpline: 0808 800 5050", email: "helpline@epilepsy.org.uk" },
    checked: "6 Sep 2026"
  },

  // ---- Gastroenterology & IBD ----
  {
    id: "crohns-colitis-ireland",
    name: "Crohn's & Colitis Ireland",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "National charity for IBD (Crohn's/ulcerative colitis), which affects at least 40,000 people in Ireland, most often diagnosed between ages 15–35.",
    details: ["Helpline hours: Mon/Wed/Fri 09:30–12:30."],
    referral: "Self-referral to the helpline.",
    contact: { phone: "01 531 2983", email: "info@crohnscolitis.ie", address: "Carmichael Centre, North Brunswick Street, Dublin 7", web: "crohnscolitis.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "stjames-gastro",
    name: "St James's Hospital Gastroenterology (also covers Tallaght & Naas)",
    specialty: ["gastro"],
    county: ["dublin", "kildare"],
    blurb: "A 3-site public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "stvincents-gastro",
    name: "St Vincent's University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 221 4000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "beaumont-gastro",
    name: "Beaumont Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "mater-gastro",
    name: "Mater Misericordiae University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 803 2000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "connolly-gastro",
    name: "Connolly Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 646 5000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "cuh-gastro",
    name: "Cork University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["cork-city"],
    blurb: "Public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "mercy-cork-gastro",
    name: "Mercy University Hospital, Cork — Gastroenterology",
    specialty: ["gastro"],
    county: ["cork-city"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "021 427 1971", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-gastro",
    name: "University Hospital Galway Gastroenterology",
    specialty: ["gastro"],
    county: ["galway"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "091 544 544", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "portiuncula-gastro",
    name: "Portiuncula University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["galway", "roscommon"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "090 964 8200", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "uhl-gastro",
    name: "University Hospital Limerick Gastroenterology",
    specialty: ["gastro"],
    county: ["limerick", "clare"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "waterford-gastro",
    name: "University Hospital Waterford Gastroenterology",
    specialty: ["gastro"],
    county: ["waterford"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "051 848 000", extra: "Main hospital switchboard — ask for Gastroenterology." },
    checked: "4 Sep 2026"
  },
  {
    id: "find-gastro",
    name: "Regional gastroenterology / GI-endoscopy units",
    specialty: ["gastro"],
    county: ["national"],
    blurb: "Also has regional consultant-led general medicine with GI/endoscopy services: Sligo, Letterkenny, Kerry (Tralee), Mullingar, Drogheda, and Wexford.",
    details: ["A 2024 Irish study (14 women, University of Galway) found women's abdominal pain is often normalised and dismissed, with patients having to 'fight their case' for care — see 'Know your rights' for the full citation."],
    referral: "GP referral, usually via Healthlink.",
    contact: {},
    resources: [
      { label: "IBS — patient.info", url: "https://patient.info/digestive-health/irritable-bowel-syndrome-leaflet" },
      { label: "Coeliac disease — patient.info", url: "https://patient.info/digestive-health/coeliac-disease-leaflet" }
    ]
  },

  // ---- Chronic Pain Management ----
  {
    id: "uhl-pain-management",
    name: "University Hospital Limerick Pain Management",
    specialty: ["pain"],
    county: ["limerick", "clare"],
    blurb: "One of 16 publicly funded chronic pain services nationally — a 2024 investigation found these clinics disproportionately treat conditions affecting more women than men (fibromyalgia, migraine, chronic pelvic pain, osteoarthritis).",
    details: [],
    referral: "GP referral.",
    contact: { address: "St Nessan's Road, Dooradoyle, Limerick V94 F858" }
  },
  {
    id: "stjohns-limerick-pain",
    name: "St John's Hospital Limerick Pain Management",
    specialty: ["pain"],
    county: ["limerick", "clare"],
    blurb: "One of 16 publicly funded chronic pain services nationally.",
    details: [],
    referral: "GP referral.",
    contact: { address: "St John's Square, Limerick City V94 H272" }
  },
  {
    id: "croom-pain-management",
    name: "Croom Orthopaedic Hospital Pain Management",
    specialty: ["pain"],
    county: ["limerick"],
    blurb: "Holistic pain service: interventional medicine, physiotherapy, music therapy, psychology, and nursing.",
    details: [],
    referral: "GP referral.",
    contact: { address: "Corrabul, Skagh, Croom, Limerick V35 F434" }
  },
  {
    id: "beaumont-ipaincentre",
    name: "Beaumont Hospital iPainCentre",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Sláintecare-funded integrated community-based pain management team, clinical lead Dr David Moore. Beaumont also runs a separate Pain Medicine service.",
    details: [],
    referral: "GP referral.",
    contact: { web: "mypainmatters.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "stjames-pain",
    name: "St James's Hospital Pain Medicine",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for Pain Medicine." },
    checked: "4 Sep 2026"
  },
  {
    id: "mater-pain",
    name: "Mater Misericordiae University Hospital Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 803 2000", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "stvincents-pain",
    name: "St Vincent's University Hospital Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Multidisciplinary pain service, including a psychology-led pain management programme.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 221 4000", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "tallaght-pain",
    name: "Tallaght University Hospital Pain Medicine",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Pain Medicine service plus the Ulysses Pain Management Programme.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 414 3104" },
    checked: "4 Sep 2026"
  },
  {
    id: "stlukes-rathgar-pain",
    name: "St Luke's Hospital, Rathgar — Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 406 5000", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "stcolumcilles-pain",
    name: "St Columcille's Hospital, Loughlinstown — Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Multidisciplinary team pain service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 282 5800" },
    checked: "4 Sep 2026"
  },
  {
    id: "naas-pain",
    name: "Naas General Hospital Pain Management",
    specialty: ["pain"],
    county: ["kildare"],
    blurb: "Public chronic pain clinic, Consultant Dr Anne Heffernan.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "045 849 500" },
    checked: "4 Sep 2026"
  },
  {
    id: "portlaoise-pain",
    name: "Midland Regional Hospital Portlaoise Pain Service",
    specialty: ["pain"],
    county: ["laois"],
    blurb: "Listed as a public pain service by the Irish Pain Society — not independently re-confirmed.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "057 862 1364", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "cuh-pain",
    name: "Cork University Hospital Pain Service",
    specialty: ["pain"],
    county: ["cork-city"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "mercy-cork-pain",
    name: "Mercy University Hospital, Cork — Pain Service",
    specialty: ["pain"],
    county: ["cork-city"],
    blurb: "Listed as a public pain service by the Irish Pain Society — not independently re-confirmed.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "021 427 1971", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "uhg-pain",
    name: "University Hospital Galway / Merlin Park Pain Clinic",
    specialty: ["pain"],
    county: ["galway"],
    blurb: "Consultant-run chronic pain clinic.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "091 544 544", extra: "Main hospital switchboard — ask for the Pain Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "sligo-pain",
    name: "Sligo University Hospital Chronic Pain Unit",
    specialty: ["pain"],
    county: ["sligo"],
    blurb: "Chronic pain unit with a Sláintecare pain-management education programme.",
    details: ["Flagged as subject to a temporary closure/consultant-recruitment issue — verify current status before travelling."],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "071 917 1111", extra: "Main hospital switchboard — ask for the Chronic Pain Unit." },
    checked: "4 Sep 2026"
  },
  {
    id: "waterford-pain",
    name: "University Hospital Waterford Pain Service",
    specialty: ["pain"],
    county: ["waterford"],
    blurb: "Listed as a public pain service by the Irish Pain Society, but a live HSE page couldn't be confirmed — public status uncertain.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "051 848 000", extra: "Main hospital switchboard — ask for the Pain Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "chronic-pain-ireland",
    name: "Chronic Pain Ireland",
    specialty: ["pain"],
    county: ["national"],
    blurb: "National patient advocacy charity, runs a confidential phone support service for over-18s. A 2021 national survey found 11,932 people on public chronic pain waiting lists, with severe understaffing (0.55 pain specialists per 100,000 people) and no national model of care.",
    details: ["Signposts to the HSE Counselling in Primary Care Service (8 free sessions via GP referral) for chronic-pain-related mental health support.", "Support line runs Tue/Thu/Fri, 9:30am–5pm."],
    referral: "Self-referral.",
    contact: { phone: "01 804 7567", web: "chronicpain.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "find-pain-clinic",
    name: "About the '16 public pain clinics' figure",
    specialty: ["pain"],
    county: ["national"],
    blurb: "The often-cited '16 hospitals' figure is 2020 survey data — the live picture has since changed. Confirmed CLOSED: Our Lady of Lourdes Drogheda (203 patients referred back to GPs when its only consultant left). Not currently running a pain clinic: University Hospital Kerry, Letterkenny, Cavan/Monaghan, Portiuncula, Midland Regional Tullamore.",
    details: [
      "A 2024 investigation found these clinics disproportionately treat conditions affecting more women than men — fibromyalgia, migraine, chronic pelvic pain, osteoarthritis — and that 14,445 people were waiting nationally, half over six months.",
      "Treat the sites listed individually above as the working list — some (Sligo, Waterford, Mercy Cork) have uncertain current status; phone ahead.",
    ],
    referral: "GP referral.",
    contact: {},
    resources: [
      { label: "Fibromyalgia — patient.info", url: "https://patient.info/signs-symptoms/tiredness-fatigue/fibromyalgia" }
    ]
  },

  // ---- Long Covid & ME/CFS ----
  {
    id: "longcovid-beaumont",
    name: "Beaumont Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["dublin"],
    blurb: "One of six HSE Long Covid clinics nationally, overseen by Dr Eoghan de Barra (Infectious Diseases).",
    details: [
      "Typically runs one day per week; long waiting times reported.",
      "No public Long Covid service exists for children (under-16s) — parents are directed to GPs/general paediatrics instead.",
    ],
    referral: "GP referral.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    resources: [
      { label: "Post-viral fatigue — patient.info", url: "https://patient.info/news-and-features/what-you-need-to-know-about-post-viral-fatigue" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "longcovid-stjames",
    name: "St James's Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["dublin"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Ciarán Bannan with Dr Aoife Laffan (neurology).",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "longcovid-stvincents",
    name: "St Vincent's University Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["dublin"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Stefano Savinelli.",
    details: ["A separate Mater Hospital Long Covid clinic (Dr Jack Lambert) closed in Dec 2022 when HSE funding was withdrawn — don't refer here expecting it's still running."],
    referral: "GP referral.",
    contact: { phone: "01 221 4000", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "longcovid-cork",
    name: "Cork University Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["cork-city"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Katie McFaul (patients also seen by Dr Arthur Jackson).",
    details: [],
    referral: "GP referral.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "longcovid-limerick",
    name: "University Hospital Limerick Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["limerick", "clare"],
    blurb: "One of six HSE Long Covid clinics nationally.",
    details: ["Not operational as of March 2025 due to staffing (per Long Covid Advocacy Ireland) — ask to be referred elsewhere if this hasn't changed."],
    referral: "GP referral.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "longcovid-galway",
    name: "University Hospital Galway Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["galway"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr David Gallagher (Infectious Diseases) with Dr Mike Harrison (Respiratory).",
    details: ["Referrals go to Dr Gallagher's office."],
    referral: "GP referral.",
    contact: { phone: "091 544 544", extra: "Main hospital switchboard — ask for the Long Covid Clinic." },
    checked: "4 Sep 2026"
  },
  {
    id: "long-covid-advocacy-ireland",
    name: "Long Covid Advocacy Ireland (LCAI)",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Ireland's only formal Long Covid patient advocacy group, run by patients (several team members unwell themselves).",
    details: [],
    referral: "Self-referral via mailing list.",
    contact: { email: "irishlcalist@gmail.com", web: "longcovidadvocacyireland.com" },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-mecfs-association",
    name: "Irish ME/CFS Association",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Estimated 10,000–19,000 people in Ireland have ME/CFS (using international prevalence data, as no Irish-specific incidence study exists).",
    details: [
      "Runs public meetings, a newsletter, and an information helpline/telephone support network.",
      "An Irish qualitative focus-group study (15 patients, 6 carers) found patients describe real delays to diagnosis and poor awareness/understanding from healthcare professionals — this is Irish-specific evidence, not just international literature.",
    ],
    referral: "Self-referral.",
    contact: { web: "irishmecfs.org" },
    resources: [
      { label: "ME/CFS — patient.info", url: "https://patient.info/signs-symptoms/tiredness-fatigue/chronic-fatigue-syndrome-myalgic-encephalomyelitis" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "me-advocates-ireland",
    name: "ME Advocates Ireland (MEAI)",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Volunteer-run advocacy group (founded 2017) pushing for better ME healthcare provision and HSE/Dept of Health engagement.",
    details: ["No dedicated contact website found — Facebook is currently their main public presence."],
    referral: "Self-referral.",
    contact: { web: "facebook.com/MEAdvocatesIreland" },
    checked: "4 Sep 2026"
  },
  {
    id: "me-support-ni",
    name: "M.E. Support Northern Ireland",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Support for people with ME/CFS in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { email: "info@mesupportni.com" },
    checked: "4 Sep 2026"
  },

  // ---- Bone Health & Osteoporosis ----
  {
    id: "irish-osteoporosis-society",
    name: "Irish Osteoporosis Society",
    specialty: ["bonehealth"],
    county: ["dublin"],
    blurb: "~50% of women over 50 will have an osteoporosis-related fracture (vs 20% of men); 7 in 10 hip fractures happen to women. There is no national osteoporosis screening programme — DEXA scans are GP-referral only.",
    details: ["Maintains its own county-by-county list of DXA scan locations (public and private) on their website — worth checking directly for your area."],
    referral: "GP referral for a DEXA scan; self-referral to the Society for information.",
    contact: { phone: "01 637 5050", email: "info@irishosteoporosis.ie", address: "Unit 1B, Clonskeagh Square, Dublin 14" },
    resources: [
      { label: "Osteoporosis — patient.info", url: "https://patient.info/bones-joints-muscles/osteoporosis-leaflet" }
    ],
    checked: "4 Sep 2026"
  },
  {
    id: "irish-fracture-liaison-service",
    name: "About the Irish Fracture Liaison Service",
    specialty: ["bonehealth"],
    county: ["national"],
    blurb: "A Fracture Liaison Service identifies people who've had a fragility fracture, assesses them for osteoporosis and falls risk, and starts treatment to prevent the next one — but coverage is patchy, not a guaranteed pathway.",
    details: [
      "Confirmed running at Beaumont, St James's, and St Vincent's University Hospitals — some HSE regions (Mid-West, South-West) had no FLS coverage at all as of the most recent national database report.",
      "If you or a family member has had a fragility fracture (a break from a low-impact fall) and weren't referred, ask your GP or the orthopaedic team directly about local FLS availability.",
    ],
    referral: "Automatic if your treating hospital runs an FLS; otherwise ask your GP or orthopaedic team.",
    contact: {},
    checked: "6 Sep 2026"
  },
  {
    id: "royal-osteoporosis-society-ni",
    name: "Royal Osteoporosis Society (for NI)",
    specialty: ["bonehealth"],
    county: ["antrim"],
    blurb: "UK-wide osteoporosis charity — the practical equivalent of the Irish Osteoporosis Society for people in Northern Ireland.",
    details: [],
    referral: "Self-referral to the helpline; GP referral for a DEXA scan.",
    contact: { phone: "0808 800 0035", web: "theros.org.uk" },
    checked: "6 Sep 2026"
  },

  // ---- Genetics & Hereditary Cancer Risk ----
  {
    id: "ncmg-crumlin",
    name: "National Centre for Medical Genetics (NCMG)",
    specialty: ["genetics"],
    county: ["dublin"],
    blurb: "Ireland's national public genetics service, including hereditary cancer risk (BRCA and similar). Free.",
    details: [
      "Based at Children's Health Ireland at Crumlin, with satellite clinics at Cork University Hospital, University Hospital Limerick, and University Hospital Galway.",
      "A referral letter from your GP or consultant is required before assessment. Non-urgent waits can be up to 2 years.",
      "General enquiries line is answered 9am–5pm Mon–Fri (4pm Fridays). For an urgent query outside a scheduled appointment, the department directs patients to the same number.",
    ],
    referral: "GP or consultant referral.",
    contact: { phone: "01 409 6739", email: "clinical.genetics@childrenshealthireland.ie", address: "Children's Health Ireland at Crumlin, Dublin 12" },
    checked: "5 Sep 2026"
  },
  {
    id: "cancer-genetics-stjames",
    name: "Cancer Genetics Service, St James's Hospital",
    specialty: ["genetics", "cancer"],
    county: ["dublin"],
    blurb: "Alternative public referral point for hereditary cancer risk assessment (e.g. BRCA), via GP or your oncology team.",
    details: [],
    referral: "GP or oncology team referral.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for Cancer Genetics." },
    checked: "4 Sep 2026"
  },
  {
    id: "lynch-syndrome-ireland",
    name: "Lynch Syndrome Ireland",
    specialty: ["genetics", "cancer"],
    county: ["national"],
    blurb: "Support for people affected by Lynch syndrome (hereditary colorectal/ovarian/endometrial cancer risk).",
    details: ["A voluntary group of people with Lynch syndrome, or who know someone affected, sharing information and peer support.", "The Irish Cancer Society Support Line (1800 200 700) can also help with talking to family about genetic risk."],
    referral: "Self-referral.",
    contact: { email: "lynchsyndromeirl@gmail.com", web: "lynchsyndromeireland.com" },
    checked: "4 Sep 2026"
  },

  // ---- Sexual Health & STI Testing (GUM clinics) ----
  {
    id: "gum-galway",
    name: "STI Clinic — University Hospital Galway",
    specialty: ["sexualhealth"],
    county: ["galway"],
    blurb: "Free, HSE-operated STI/GUM clinic — the largest in the west (~4,000 attendances/yr).",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "091 525 200" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-cork",
    name: "STI Clinic — South Infirmary Victoria University Hospital, Cork",
    specialty: ["sexualhealth"],
    county: ["cork-city"],
    blurb: "Free, HSE-operated STI/GUM clinic. PrEP available.",
    details: ["Mon–Fri 9am–4pm."],
    referral: "Self-referral.",
    contact: { phone: "021 496 6844" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-limerick",
    name: "STI Clinic — University Hospital Limerick / Ennis / Nenagh",
    specialty: ["sexualhealth"],
    county: ["limerick", "clare", "tipperary"],
    blurb: "Free, HSE-operated STI/GUM clinic, covering Dooradoyle, Ennis General, and Nenagh General.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "061 482 382" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-mater-dublin",
    name: "STI Clinic — Mater Hospital, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 803 2063" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-guide-stjames",
    name: "GUIDE Clinic — St James's Hospital, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 416 2315" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-gmhs-dublin",
    name: "Gay Men's Health Service — Meath Primary Care Centre, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated sexual health service.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 921 2730" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-sligo",
    name: "STI Clinic — Sligo General Hospital",
    specialty: ["sexualhealth"],
    county: ["sligo"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "071 917 0473" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-tipperary",
    name: "STI Clinic — South Tipperary General, Clonmel",
    specialty: ["sexualhealth"],
    county: ["tipperary"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: ["Phone number matches the Waterford clinic in source data — worth confirming which is correct before relying on it."],
    referral: "Self-referral.",
    contact: { phone: "051 842 646" }
  },
  {
    id: "gum-waterford",
    name: "STI Clinic — University Hospital Waterford",
    specialty: ["sexualhealth"],
    county: ["waterford"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "051 842 646" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-letterkenny",
    name: "STI Clinic — Letterkenny General, Donegal",
    specialty: ["sexualhealth"],
    county: ["donegal"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "074 912 3715" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-drogheda",
    name: "STI Clinic — Louth County / Our Lady of Lourdes, Drogheda",
    specialty: ["sexualhealth"],
    county: ["louth"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 824 1847" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-mayo",
    name: "STI Clinic — Mayo General, Castlebar",
    specialty: ["sexualhealth"],
    county: ["mayo"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "087 451 8971" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-mullingar",
    name: "STI Clinic — Midland Regional Hospital, Mullingar",
    specialty: ["sexualhealth"],
    county: ["westmeath"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "087 710 4152" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-portlaoise",
    name: "STI Clinic — Midland Regional Hospital, Portlaoise",
    specialty: ["sexualhealth"],
    county: ["laois"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 859 1273" },
    checked: "4 Sep 2026"
  },
  {
    id: "gum-monaghan",
    name: "STI Clinic — Monaghan General Hospital",
    specialty: ["sexualhealth"],
    county: ["monaghan"],
    blurb: "Free, HSE-operated STI/GUM clinic — historically by appointment, Tuesday mornings.",
    details: [
      "Sources conflict: several confirm a Monaghan clinic at this number, but one directory states there's no dedicated Monaghan clinic and points to Cavan General or Drogheda instead.",
      "Phone ahead to confirm before travelling. The same phone number appears in our data attached to the Louth/Drogheda clinic too — this may be a shared regional line.",
    ],
    referral: "Self-referral — phone ahead to confirm.",
    contact: { phone: "086 824 1847" },
    checked: "4 Sep 2026"
  },
  {
    id: "sh24-roi",
    name: "sh24.ie — Free At-Home STI Testing",
    specialty: ["sexualhealth"],
    county: ["national"],
    blurb: "Free at-home STI test kits for anyone 17+ in Ireland — HIV, chlamydia, gonorrhoea, syphilis. Results by text/phone within ~72 hours.",
    details: [],
    referral: "Self-referral, order online.",
    contact: { web: "sh24.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "sh24-ni",
    name: "sh24.org.uk — Free At-Home STI Testing (NI)",
    specialty: ["sexualhealth"],
    county: ["national"],
    blurb: "The Northern Ireland / UK equivalent of sh24.ie.",
    details: [],
    referral: "Self-referral, order online.",
    contact: { web: "sh24.org.uk" },
    checked: "4 Sep 2026"
  },

  // ---- Pelvic Health Physiotherapy ----
  {
    id: "cuh-pelvic-physio",
    name: "Cork University Hospital Pelvic Health Physiotherapy",
    specialty: ["pelvicphysio"],
    county: ["cork-city"],
    blurb: "Named public pelvic-health physiotherapy service — but only accepts referrals from CUH Urology & Colorectal, not directly from GPs.",
    details: [],
    referral: "Referral only from CUH Urology or Colorectal — ask your consultant to refer you if relevant.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for Pelvic Health Physiotherapy." },
    checked: "4 Sep 2026"
  },
  {
    id: "cavan-monaghan-pelvic-physio",
    name: "Cavan Monaghan Hospital Pelvic Health Physiotherapy",
    specialty: ["pelvicphysio"],
    county: ["cavan", "monaghan"],
    blurb: "Named public pelvic-health physiotherapy service, self-referral accepted.",
    details: [],
    referral: "Self-referral, GP, or consultant referral, Mon–Fri.",
    contact: { phone: "049 437 6000", extra: "Main hospital switchboard — ask for Pelvic Health Physiotherapy." },
    checked: "4 Sep 2026"
  },
  {
    id: "find-pelvic-physio",
    name: "Find a pelvic-health-trained physiotherapist",
    specialty: ["pelvicphysio"],
    county: ["national"],
    blurb: "There's no public directory of individual pelvic-health physios, but the picture is more structured than 'ask your local physio': national clinical guidelines (HSE continence care; RCPI/Institute of Obstetricians & Gynaecologists guidelines on prolapse, incontinence, and mesh complications) all name pelvic-health physio as first-line therapy.",
    details: [
      "Most maternity hospitals run women's-health physiotherapy for pregnancy-related pelvic girdle pain via midwife referral.",
      "Outside the two named services above, ask specifically whether a pelvic-health-trained physio is available at your local primary care centre — this isn't guaranteed and may require asking to be redirected.",
    ],
    referral: "GP, PHN, or hospital referral to your local primary care centre.",
    contact: {}
  },
  {
    id: "pelvic-health-ni",
    name: "Pelvic Health NI / PelvicNI",
    specialty: ["pelvicphysio"],
    county: ["national"],
    blurb: "Peer-led charity supporting pelvic health, working alongside NHS physiotherapists and midwives. Runs a free pelvic floor therapy support access programme.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "pelvicni.org" }
  },

  // ---- Vascular ----
  {
    id: "uhl-vascular",
    name: "University Hospital Limerick Vascular Service",
    specialty: ["vascular"],
    county: ["limerick", "clare"],
    blurb: "Treats AAA (abdominal aortic aneurysm), varicose veins, and AV fistula.",
    details: [],
    referral: "GP, consultant, PHN, or health centre referral.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for the Vascular Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "saolta-vascular",
    name: "Saolta Vascular Services (Roscommon & Galway)",
    specialty: ["vascular"],
    county: ["roscommon", "galway"],
    blurb: "Varicose vein procedures at Roscommon University Hospital; all arterial and complex vascular surgery at Galway University Hospitals.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "091 544 544", extra: "Main hospital switchboard — ask for Vascular Services." },
    checked: "4 Sep 2026"
  },
  {
    id: "western-vascular-institute",
    name: "Western Vascular Institute (University Hospital Galway)",
    specialty: ["vascular"],
    county: ["galway"],
    blurb: "High-volume public/private tertiary vascular referral centre for the West.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "091 542 535", email: "wvi@vascular.ie", web: "vascular.ie", address: "Block 2C, Department of Vascular & Endovascular Surgery, University Hospital Galway" },
    checked: "4 Sep 2026"
  },
  {
    id: "stvincents-vascular",
    name: "St Vincent's University Hospital Vascular Surgery",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Regional referral centre for south-east Dublin, Wicklow, Wexford, Carlow, and Kilkenny. Varicose vein management including surgery, laser/radiofrequency ablation, and ClariVein.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 221 3709", web: "stvincents.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "beaumont-vascular",
    name: "Beaumont Hospital Vascular Service",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Vascular/endovascular arterial and venous disease.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for the Vascular Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "mater-vascular",
    name: "Mater Misericordiae University Hospital Vascular Service",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Public vascular surgery service.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 803 2000", extra: "Main hospital switchboard — ask for the Vascular Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "cuh-vascular",
    name: "Cork University Hospital Vascular Service",
    specialty: ["vascular"],
    county: ["cork-city"],
    blurb: "Tertiary vascular centre for the South, with a hybrid theatre.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "021 492 2318" }
  },
  {
    id: "waterford-vascular",
    name: "University Hospital Waterford Vascular Service",
    specialty: ["vascular"],
    county: ["waterford"],
    blurb: "Regional vascular service for the South East.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "051 848 000", extra: "Main hospital switchboard — ask for the Vascular Service." },
    checked: "4 Sep 2026"
  },
  {
    id: "find-vascular",
    name: "Vascular care — pregnancy-related & pelvic congestion",
    specialty: ["vascular"],
    county: ["national"],
    blurb: "Referral for varicose veins and general vascular concerns is via GP to the vascular surgery departments listed above. Pregnancy-related vascular issues and pelvic congestion syndrome are niche and typically managed via interventional radiology within the tertiary centres.",
    details: ["There's no dedicated Irish patient group for venous or pelvic congestion conditions specifically — general vascular or chronic-pain charities are the closest fit if you're looking for peer support."],
    referral: "GP referral.",
    contact: {}
  },

  // ---- Ophthalmology & Eye Care ----
  {
    id: "rveeh-dublin",
    name: "Royal Victoria Eye and Ear Hospital",
    specialty: ["ophthalmology", "ent"],
    county: ["dublin"],
    blurb: "Ireland's national referral centre for eye and ENT conditions, founded 1895.",
    details: ["Routine (non-urgent) referral waiting times are currently around 3 years — ask your GP about urgent-pathway criteria if your symptoms warrant it."],
    referral: "GP or consultant referral.",
    contact: { phone: "01 664 4600", address: "Adelaide Road, Dublin 2", web: "rveeh.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "retinascreen",
    name: "Diabetic RetinaScreen",
    specialty: ["ophthalmology", "diabetes"],
    county: ["national"],
    blurb: "National, free screening and treatment programme for diabetic retinopathy, for anyone with diabetes aged 12+.",
    details: [
      "About 225,000 people in Ireland have diabetes; roughly 1 in 20 (~12,000) are at risk of vision loss from retinopathy.",
      "Screening runs from primary-care centres nationwide — self-register online to find your nearest.",
    ],
    referral: "Self-registration.",
    contact: { phone: "1800 700 700", email: "access@diabeticretinascreen.ie", web: "hse.ie/diabeticretinascreen" },
    checked: "4 Sep 2026"
  },
  {
    id: "rvh-belfast-eye-ent",
    name: "Royal Victoria Hospital — Eye & Ear Department",
    specialty: ["ophthalmology", "ent"],
    county: ["antrim"],
    blurb: "Belfast Trust's regional tertiary eye/ENT centre — medical & surgical retina, glaucoma, neuro-ophthalmology, paediatric, cornea, oculoplastics, and diabetic clinics. Eye Casualty is a walk-in urgent service.",
    details: ["ENT is also based here, in the Eyes and ENT Building, Level 8a."],
    referral: "GP, optometrist, or clinician referral. Eye Casualty is walk-in for urgent eye problems.",
    contact: { address: "Grosvenor Road, Belfast BT12 6BA" }
  },
  {
    id: "altnagelvin-eye",
    name: "Altnagelvin Area Hospital — Ophthalmology",
    specialty: ["ophthalmology"],
    county: ["londonderry"],
    blurb: "Western Trust's second eye service and training centre.",
    details: [],
    referral: "GP or optometrist referral.",
    contact: { phone: "028 7134 5171", extra: "Main hospital switchboard — ask for Ophthalmology." },
    checked: "4 Sep 2026"
  },
  {
    id: "ni-diabetic-eye-screening",
    name: "NI Diabetic Eye Screening Programme",
    specialty: ["ophthalmology", "diabetes"],
    county: ["antrim"],
    blurb: "Northern Ireland's equivalent of RetinaScreen, for people with diabetes.",
    details: [],
    referral: "Automatic invitation once registered with a GP as having diabetes.",
    contact: { phone: "028 9615 7600", address: "Forster Green Hospital, 110 Saintfield Road, Belfast BT8 6HD" }
  },
  {
    id: "vision-ireland",
    name: "Vision Ireland (formerly NCBI)",
    specialty: ["ophthalmology"],
    county: ["national"],
    blurb: "National charity for blind and vision-impaired people, ~55,000 service users.",
    details: [
      "Recently rebranded from NCBI — some of its own contact pages may still show the old name; confirm current details before relying on them.",
      "Runs an Eye Clinic Liaison Officer (ECLO) service at the Mater, RVEEH, CHI Temple Street, and CHI Crumlin.",
    ],
    referral: "Self-referral.",
    contact: { phone: "01 830 7033", email: "info@ncbi.ie", address: "Whitworth Road, Drumcondra, Dublin 9" }
  },
  {
    id: "fighting-blindness-ireland",
    name: "Fighting Blindness",
    specialty: ["ophthalmology", "genetics"],
    county: ["national"],
    blurb: "Research and patient advocacy for inherited and retinal sight-loss conditions.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "fightingblindness.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-guide-dogs",
    name: "Irish Guide Dogs for the Blind",
    specialty: ["ophthalmology"],
    county: ["national"],
    blurb: "Guide dogs and mobility support for people who are blind or vision-impaired.",
    details: [],
    referral: "Self-referral.",
    contact: { email: "info@guidedogs.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "feach",
    name: "Féach",
    specialty: ["ophthalmology", "parenting"],
    county: ["national"],
    blurb: "National support organisation for parents of children who are blind or vision-impaired.",
    details: [],
    referral: "Self-referral.",
    contact: { email: "info@feach.ie", web: "feach.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "childvision",
    name: "ChildVision",
    specialty: ["ophthalmology", "parenting"],
    county: ["dublin"],
    blurb: "National education centre for blind and vision-impaired children.",
    details: [],
    referral: "Self-referral or via early-intervention services.",
    contact: { phone: "01 837 3635", email: "info@childvision.ie", address: "Grace Park Road, Drumcondra, Dublin 9, D09 WK0H" },
    checked: "4 Sep 2026"
  },
  {
    id: "rnib-ni",
    name: "RNIB Northern Ireland",
    specialty: ["ophthalmology"],
    county: ["antrim"],
    blurb: "Support and advocacy for blind and vision-impaired people in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "rnib.org.uk" },
    checked: "4 Sep 2026"
  },

  // ---- Dermatology & Skin ----
  {
    id: "irish-skin-foundation",
    name: "Irish Skin Foundation",
    specialty: ["dermatology"],
    county: ["national"],
    blurb: "National skin-health charity — 54% of the Irish population is affected by a skin condition annually.",
    details: ["Free nurse-led \"Ask-a-Nurse\" phone guidance on psoriasis, eczema, hidradenitis suppurativa, acne, rosacea, and skin cancer."],
    referral: "Self-referral to Ask-a-Nurse.",
    contact: { phone: "01 486 6280", email: "info@irishskin.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "stjames-dermatology",
    name: "St James's Hospital Dermatology",
    specialty: ["dermatology"],
    county: ["dublin"],
    blurb: "Public dermatology department covering general skin conditions and pigmented-lesion (suspicious mole) referrals.",
    details: [],
    referral: "GP referral via Healthlink (general dermatology or pigmented lesion) or by letter.",
    contact: { phone: "01 416 2102", extra: "Main hospital switchboard: 01 410 3000 — ask for Dermatology." },
    checked: "6 Sep 2026"
  },
  {
    id: "cuh-dermatology",
    name: "Cork University Hospital Dermatology",
    specialty: ["dermatology"],
    county: ["cork-city"],
    blurb: "Regional dermatology centre for the South, based in the Victoria Wing.",
    details: [],
    referral: "GP referral by letter; appointments sent directly once triaged by the consultant.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for Dermatology." },
    checked: "6 Sep 2026"
  },
  {
    id: "rvh-belfast-dermatology",
    name: "Royal Victoria Hospital Belfast Dermatology",
    specialty: ["dermatology"],
    county: ["antrim"],
    blurb: "Belfast Trust's regional dermatology service, including outpatient, day-treatment, and Mohs surgery.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "028 9024 0503", extra: "Main hospital switchboard — ask for Dermatology." },
    checked: "6 Sep 2026"
  },
  {
    id: "find-dermatology",
    name: "About dermatology waiting times",
    specialty: ["dermatology"],
    county: ["national"],
    blurb: "Dermatology access is in crisis on both sides of the border, and there's no single public directory of individual hospital dermatology departments.",
    details: [
      "ROI: the outpatient dermatology waiting list rose 87.6% from 29,955 (Dec 2015) to 56,203 (Dec 2023) — 84% adults, 16% children — plus 1,109 on the inpatient list (NTPF data).",
      "NI: 49,048 people were waiting for a first dermatology outpatient appointment as of Sept 2025 across the five Trusts; 8,382 had waited more than four years.",
      "Skin cancer is Ireland's most common cancer (13,000+ new cases/year, expected to double by 2040); melanoma 5-year survival is 92% with early diagnosis, and treating late-stage melanoma costs over 25x more than early-stage.",
      "GP e-referral to pigmented-lesion (suspicious mole) clinics exists and is faster than routine dermatology referral if melanoma is suspected — ask your GP specifically about this pathway.",
      "Skin cancer is one of the NCCP's priority tumour groups — melanoma and other skin cancer surgery is delivered at the designated cancer centres (see Cancer Care).",
    ],
    referral: "GP referral; ask about urgent pigmented-lesion referral if a mole or skin change is suspicious.",
    contact: {},
    checked: "4 Sep 2026"
  },

  // ---- Respiratory Medicine & Cystic Fibrosis ----
  {
    id: "cf-designated-centres",
    name: "HSE-Designated Cystic Fibrosis Centres",
    specialty: ["respiratory"],
    county: ["national"],
    blurb: "Ireland has the highest incidence of CF per head of population in the world — over 1,100 patients, with roughly 1 in 19 people carrying the gene.",
    details: [
      "Main centres: Beaumont Hospital, St Vincent's University Hospital, CHI (Crumlin, Temple Street, Tallaght), University Hospital Galway, Cork University Hospital (Cork Centre for CF / \"3CF\" — the second-largest adult programme, 200+ patients), and University Hospital Limerick.",
      "Additional CF clinics: Cavan General, Mayo University, Our Lady of Lourdes Drogheda, Sligo University, and University Hospital Waterford.",
      "The National Lung Transplant Programme is based at the Mater Misericordiae University Hospital.",
    ],
    referral: "GP or respiratory consultant referral.",
    contact: { phone: "01 221 4684", email: "cfnurses@svuh.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-cf-adult",
    name: "Belfast Trust Adult Cystic Fibrosis Service",
    specialty: ["respiratory"],
    county: ["antrim"],
    blurb: "Regional adult CF service for Northern Ireland, ages 17+.",
    details: [],
    referral: "GP or respiratory consultant referral.",
    contact: { phone: "028 9504 8197" }
  },
  {
    id: "cf-ireland",
    name: "Cystic Fibrosis Ireland",
    specialty: ["respiratory"],
    county: ["national"],
    blurb: "National CF patient charity since 1963 — information, support, and grants.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 496 2433", email: "info@cfireland.ie", web: "cfireland.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "asthma-society-ireland",
    name: "Asthma Society of Ireland",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Represents an estimated 380,000+ people with asthma in Ireland.",
    details: ["Runs the joint Asthma/COPD Adviceline with COPD Support Ireland; also has a WhatsApp nurse line."],
    referral: "Self-referral to the Adviceline.",
    contact: { phone: "1800 44 54 64", extra: "WhatsApp nurse: 086 059 0132", address: "42–43 Amiens Street, Dublin 1" },
    checked: "4 Sep 2026"
  },
  {
    id: "copd-support-ireland",
    name: "COPD Support Ireland",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Local support groups for people living with COPD, including \"Singing for Better Lung Health\" groups.",
    details: ["Partners with the Asthma Society on the shared Asthma/COPD Adviceline (1800 44 54 64)."],
    referral: "Self-referral.",
    contact: { web: "copd.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "ilfa",
    name: "Irish Lung Fibrosis Association (ILFA)",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Support for the estimated 5,000 people in Ireland living with lung fibrosis (1,000+ new cases a year). No national registry exists.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 871 5264", email: "info@ilfa.ie", address: "Carmichael Centre, 4 North Brunswick Street, Dublin 7" },
    checked: "4 Sep 2026"
  },

  // ---- ENT & Audiology ----
  {
    id: "hse-audiology",
    name: "HSE Audiology Service",
    specialty: ["ent"],
    county: ["national"],
    blurb: "Free audiology assessment for medical-card holders, under-18s, and third-level students, via GP or ENT-consultant referral.",
    details: [
      "Community audiology centres exist in most counties (examples include Carlow, Cavan/Cootehill, Clare, Cork/St Finbarr's, Donegal, Galway, Kerry, Kildare, Laois, Limerick, Louth, Mayo, Offaly, Roscommon, and Sligo/Leitrim) — this isn't an exhaustive list, check the HSE's own audiology page for your nearest.",
      "HSE audiology does not supply hearing aids directly to everyone — ask about the hearing-aid pathway when referred.",
    ],
    referral: "GP or ENT-consultant referral.",
    contact: { web: "hse.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "chime-deafhear",
    name: "Chime (formerly DeafHear)",
    specialty: ["ent"],
    county: ["national"],
    blurb: "National charity for people who are deaf or hard of hearing.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "chime.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-deaf-society",
    name: "Irish Deaf Society",
    specialty: ["ent"],
    county: ["dublin"],
    blurb: "National organisation of and for the Deaf community.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 860 1878", email: "info@irishdeafsociety.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "rnid-ni",
    name: "RNID (Northern Ireland)",
    specialty: ["ent"],
    county: ["antrim"],
    blurb: "Support and advocacy for people who are deaf or have hearing loss in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "rnid.org.uk" },
    checked: "4 Sep 2026"
  },

  // ---- Endocrinology & Diabetes ----
  {
    id: "diabetes-ireland",
    name: "Diabetes Ireland",
    specialty: ["diabetes"],
    county: ["dublin"],
    blurb: "National diabetes charity — around 225,000 people in Ireland live with diabetes.",
    details: ["Runs CODE education programmes, a children's Sweetpea Kidz Club, camps, and local support branches."],
    referral: "Self-referral to the helpline.",
    contact: { phone: "01 842 8118", email: "info@diabetes.ie", address: "19 Northwood House, Northwood Business Campus, Santry, Dublin 9" }
  },
  {
    id: "diabetes-uk-ni",
    name: "Diabetes UK Northern Ireland",
    specialty: ["diabetes"],
    county: ["antrim"],
    blurb: "An estimated 96,000–120,000 people in Northern Ireland live with diabetes (figures vary by source; ~90% Type 2).",
    details: ["Runs Live Well Hubs and the Together Type 1 peer-support programme."],
    referral: "Self-referral.",
    contact: { phone: "028 9066 6646", email: "n.ireland@diabetes.org.uk", extra: "UK helpline: 0345 123 2399", address: "First Floor Suite 1, Lisburn Square House, 10 Haslems Lane, Lisburn BT28 1TW" },
    checked: "4 Sep 2026"
  },
  {
    id: "find-thyroid-support",
    name: "About thyroid condition support in Ireland",
    specialty: ["diabetes"],
    county: ["national"],
    blurb: "There's no dedicated, registered thyroid patient charity in the Republic of Ireland at the moment — here's where to turn instead.",
    details: [
      "For thyroid cancer specifically, the Irish Cancer Society Support Line can help: 1800 200 700, supportline@irishcancer.ie.",
      "ThyCa Ireland runs an informal Dublin-based support group.",
      "The UK's British Thyroid Foundation runs a helpline open to callers from Ireland: 01423 810 093.",
      "An informal \"Thyroid Support Ireland\" Facebook group exists (~5,300 members) — useful for peer support, but it's not a charity and isn't clinically moderated.",
    ],
    referral: "GP referral for diagnosis/treatment; self-referral to the support options above.",
    contact: { web: "www2.hse.ie/conditions/underactive-thyroid-hypothyroidism/" },
    checked: "4 Sep 2026"
  },
  {
    id: "find-pcos-ireland",
    name: "About PCOS diagnosis and support",
    specialty: ["diabetes", "gynae"],
    county: ["national"],
    blurb: "Polycystic ovary syndrome is one of the most common hormonal conditions in women of reproductive age, and is often undiagnosed for a long time.",
    details: [
      "International cohort studies document substantial diagnostic delay (roughly a year of help-seeking, plus around 7 more months to diagnosis) — but this is international, not Irish-specific, data.",
      "PCOS is linked to higher long-term risk of type 2 diabetes and cardiovascular disease, which is why it's listed here as well as under gynaecology.",
      "Private clinics (e.g. Women's Health Raheny) advertise shorter waits for PCOS assessment than the public system — private, fees apply, not independently verified by us.",
    ],
    referral: "GP referral for public assessment (via gynaecology or endocrinology).",
    contact: { web: "www2.hse.ie/conditions/polycystic-ovary-syndrome/" },
    checked: "4 Sep 2026"
  },

  // ---- Nephrology & Kidney ----
  {
    id: "ika",
    name: "Irish Kidney Association (IKA)",
    specialty: ["nephrology"],
    county: ["dublin"],
    blurb: "National charity for people with end-stage kidney disease, since 1978.",
    details: ["Runs a free Dublin Support Centre for patients travelling for treatment near Beaumont, plus patient holidays and organ-donation promotion."],
    referral: "Self-referral.",
    contact: { phone: "01 620 5306", email: "info@ika.ie", address: "Donor House, Block 43A, Park West, Dublin 12" },
    checked: "4 Sep 2026"
  },
  {
    id: "find-dialysis-units",
    name: "Dialysis units nationally",
    specialty: ["nephrology"],
    county: ["national"],
    blurb: "Haemodialysis units exist at Beaumont (the national kidney transplant centre), the Mater, St Vincent's, Tallaght (AMNCH), Cork University Hospital, Mayo General (Castlebar), and Cavan General, plus private units (e.g. Beacon, Northern Cross).",
    details: ["For the full current list, the Irish Nephrology Society and Irish Kidney Association both maintain dialysis-centre maps — check theirs directly, as unit capacity and locations do change."],
    referral: "Nephrology consultant referral.",
    contact: { web: "irishnephrology.ie/renal-units" },
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-city-nephrology",
    name: "Belfast City Hospital — Regional Nephrology",
    specialty: ["nephrology"],
    county: ["antrim"],
    blurb: "Northern Ireland's regional nephrology centre.",
    details: [],
    referral: "GP or consultant referral.",
    contact: { address: "Lisburn Road, Belfast BT9 7AB" }
  },
  {
    id: "antrim-dialysis",
    name: "Antrim Area Hospital — Dialysis & Home Therapies",
    specialty: ["nephrology"],
    county: ["antrim"],
    blurb: "Northern Trust dialysis service — home therapies, pre-dialysis care, and transplant follow-up.",
    details: [],
    referral: "Nephrology consultant referral.",
    contact: { phone: "028 9442 4000", extra: "Main hospital switchboard — ask for Dialysis & Home Therapies." },
    checked: "4 Sep 2026"
  },
  {
    id: "nikpa",
    name: "Northern Ireland Kidney Patients' Association (NIKPA)",
    specialty: ["nephrology"],
    county: ["antrim"],
    blurb: "Patient support, grants, and organ-donation promotion for kidney patients in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "07935 159804", email: "info@nikpa.org", address: "c/o Dialysis Unit, Belfast City Hospital" }
  },

  // ---- Haematology & Blood Disorders ----
  {
    id: "stjames-stem-cell-transplant",
    name: "St James's Hospital — National Adult Stem Cell/Bone Marrow Transplant Programme",
    specialty: ["haematology"],
    county: ["dublin"],
    blurb: "Ireland's national programme for adult stem cell and bone marrow transplants.",
    details: [],
    referral: "Haematology consultant referral.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for the Stem Cell/Bone Marrow Transplant Programme." },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-haemophilia-society",
    name: "Irish Haemophilia Society",
    specialty: ["haematology"],
    county: ["national"],
    blurb: "Represents people with haemophilia, von Willebrand disease, and other inherited bleeding disorders, since 1968.",
    details: ["The National Haemophilia Centre has historically been based at St James's Hospital."],
    referral: "Self-referral.",
    contact: { web: "haemophilia.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "national-coagulation-centre",
    name: "National Coagulation Centre, St James's Hospital",
    specialty: ["haematology"],
    county: ["dublin"],
    blurb: "Ireland's national treatment centre for haemophilia and other inherited bleeding disorders.",
    details: ["Referral letters are sent by post or fax; the team also takes phone queries about the referral process itself."],
    referral: "GP or consultant referral.",
    contact: { phone: "01 416 2141", extra: "Alt: 01 416 2142" },
    checked: "6 Sep 2026"
  },
  {
    id: "cuh-haematology",
    name: "Cork University Hospital Haematology",
    specialty: ["haematology"],
    county: ["cork-city"],
    blurb: "Regional haematology service for the South, covering both blood cancers and non-malignant blood disorders.",
    details: ["Out of hours (5pm-8am weekdays, all weekend/bank holidays), the hospital switchboard can page the on-call Haematology Registrar."],
    referral: "GP referral.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for Haematology." },
    checked: "6 Sep 2026"
  },
  {
    id: "uhl-haematology",
    name: "University Hospital Limerick Haematology",
    specialty: ["haematology"],
    county: ["limerick"],
    blurb: "Regional haematology service for the Mid-West.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for Haematology." },
    checked: "6 Sep 2026"
  },
  {
    id: "find-blood-disorder-support",
    name: "About non-malignant blood disorder support",
    specialty: ["haematology"],
    county: ["national"],
    blurb: "Beyond haemophilia, there's no dedicated Irish patient body for rarer non-cancer blood disorders (aplastic anaemia, MDS, PNH, MPNs).",
    details: [
      "People in Ireland with these conditions largely rely on international bodies: AAMDSIF (aplastic anaemia/MDS), MPN-specific networks, and Anthony Nolan for stem-cell transplant support.",
      "Blood cancers are covered separately by the Irish Cancer Society.",
    ],
    referral: "Haematology consultant referral.",
    contact: {},
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-haematology",
    name: "Belfast Trust — Regional Haematology",
    specialty: ["haematology"],
    county: ["antrim"],
    blurb: "Northern Ireland's regional haematology service.",
    details: ["Blood-cancer support in NI is largely via UK bodies: Leukaemia UK, Blood Cancer UK, Anthony Nolan, and Cancer Focus NI."],
    referral: "GP or consultant referral.",
    contact: { phone: "028 9024 0503", extra: "Main hospital switchboard — ask for Haematology." }
  },

  // ---- Orthopaedics ----
  {
    id: "cappagh-orthopaedic-hospital",
    name: "National Orthopaedic Hospital Cappagh",
    specialty: ["orthopaedics"],
    county: ["dublin"],
    blurb: "Ireland's largest elective orthopaedic centre — 1,600–1,700+ hip/knee replacement and revision surgeries a year.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { phone: "01 814 0400", address: "Cappagh Road, Finglas, Dublin 11" },
    checked: "4 Sep 2026"
  },
  {
    id: "croom-orthopaedic-hospital",
    name: "Croom Orthopaedic Hospital",
    specialty: ["orthopaedics"],
    county: ["limerick"],
    blurb: "Mid-West regional orthopaedic hospital, with a new theatre complex from 2021.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { address: "Croom, Co. Limerick" }
  },
  {
    id: "merlin-park-orthopaedics",
    name: "Merlin Park University Hospital — Orthopaedics",
    specialty: ["orthopaedics"],
    county: ["galway"],
    blurb: "Saolta group's orthopaedic service for the West.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { phone: "091 544 544", extra: "Main hospital switchboard — ask for Orthopaedics." }
  },
  {
    id: "kilcreene-orthopaedic-hospital",
    name: "Kilcreene Orthopaedic Hospital",
    specialty: ["orthopaedics"],
    county: ["kilkenny"],
    blurb: "Orthopaedic hospital serving the South East.",
    details: ["Some services were announced to be transferring towards University Hospital Waterford from 2019 — current status unconfirmed, phone ahead."],
    referral: "GP or orthopaedic consultant referral.",
    contact: { phone: "056 778 5500", extra: "Main hospital switchboard." }
  },
  {
    id: "musgrave-park-hospital",
    name: "Musgrave Park Hospital — Regional Centre for Orthopaedic Surgery",
    specialty: ["orthopaedics"],
    county: ["antrim"],
    blurb: "Northern Ireland's regional orthopaedic centre — around 44 consultant orthopaedic surgeons, ~35,000 outpatient and ~9,000 inpatient/day-case appointments a year. Houses the Primary Joint Unit for hip/knee replacement.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { address: "Belfast" },
    checked: "4 Sep 2026"
  },
  {
    id: "swah-enniskillen-orthopaedics",
    name: "South West Acute Hospital — Orthopaedics",
    specialty: ["orthopaedics"],
    county: ["fermanagh", "tyrone"],
    blurb: "Western Trust hospital running high-volume day-case joint-replacement lists.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { address: "Enniskillen" },
    checked: "4 Sep 2026"
  },
  {
    id: "upmc-sports-surgery-clinic",
    name: "UPMC Sports Surgery Clinic (Santry)",
    specialty: ["orthopaedics"],
    county: ["dublin"],
    sector: "private",
    provider: "UPMC",
    blurb: "Private orthopaedic hospital covering shoulder, hip, knee, spine, hand, foot & ankle surgery and sports medicine.",
    details: ["Sports Medicine Department: 01 526 2040.", "Northwood Avenue, Santry, Dublin 9."],
    referral: "Consultant/GP referral for surgical consults; no referral needed for physiotherapy. Self-pay or health-insurance-funded.",
    contact: { phone: "01 526 2000", web: "sportssurgeryclinic.com" },
    checked: "6 Sep 2026"
  },
  {
    id: "upmc-kildare-clane",
    name: "UPMC Kildare Hospital (Clane)",
    specialty: ["orthopaedics", "urology"],
    county: ["kildare"],
    sector: "private",
    provider: "UPMC",
    blurb: "39-bed private hospital covering orthopaedics, urology, general surgery, endoscopy and paediatric day care, with on-site physiotherapy and imaging (X-ray/CT/MRI).",
    details: [],
    referral: "Consultant/GP referral. Self-pay or health-insurance-funded.",
    contact: { phone: "045 982 300", web: "upmc.ie/locations/hospitals/kildare" },
    checked: "6 Sep 2026"
  },
  {
    id: "find-orthopaedic-waiting",
    name: "About orthopaedic waiting times",
    specialty: ["orthopaedics", "bonehealth"],
    county: ["national"],
    blurb: "Orthopaedics is one of the biggest drivers of outpatient waiting-list growth on both sides of the border. Osteoarthritis, the leading reason for hip/knee replacement, is more common in women.",
    details: [
      "ROI: waiting-list numbers by specialty and hospital are published monthly by the National Treatment Purchase Fund (NTPF) — check ntpf.ie for current figures rather than relying on a fixed number here.",
      "If you've waited over a year in the public system, ask your GP or consultant about NTPF insourcing/outsourcing options.",
      "NI patients waiting 12+ months via an NHS trust may be eligible for the Republic of Ireland Reimbursement Scheme, which allows surgery in a ROI private hospital.",
      "A Northern Ireland study of 991 patients waiting 3+ years for joint replacement found significant quality-of-life loss and increased reliance on opioids, antidepressants, and out-of-hours/ED visits while waiting.",
    ],
    referral: "GP referral.",
    contact: { web: "ntpf.ie" },
    checked: "4 Sep 2026"
  },

  // ---- Mental Health Services (General Adult) ----
  {
    id: "yourmentalhealth-info-line",
    name: "HSE YourMentalHealth Information Line",
    specialty: ["adultmh"],
    county: ["national"],
    blurb: "National mental health information line.",
    details: ["Also runs a free text-message support service: text HELLO to 50808."],
    referral: "Self-referral.",
    contact: { phone: "1800 111 888" },
    checked: "4 Sep 2026"
  },
  {
    id: "cmht-referral-explainer",
    name: "How adult mental health referral works (ROI)",
    specialty: ["adultmh"],
    county: ["national"],
    blurb: "For moderate-to-severe difficulties, your GP refers you to a Community Mental Health Team (CMHT) covering ages 18–65 — a psychiatrist, community mental health nurse, psychologist, social worker, and occupational therapist. Over-65s are referred to a Psychiatry of Later Life (POLL) team instead.",
    details: [
      "Self-referral directly to a CMHT generally isn't possible in the Republic — you need a GP or other health professional to refer you.",
      "A free National Counselling Service exists for adults in specified circumstances — ask your GP.",
      "For urgent needs outside office hours, contact your GP out-of-hours service or your local hospital's mental health unit.",
    ],
    referral: "GP referral.",
    contact: {},
    checked: "4 Sep 2026"
  },
  {
    id: "belfast-cmht-selfreferral",
    name: "Belfast Trust — Community Mental Health Team Self-Referral",
    specialty: ["adultmh"],
    county: ["antrim"],
    blurb: "Belfast is unusual in allowing self-referral directly to a CMHT by phone, rather than requiring a GP referral.",
    details: [],
    referral: "Self-referral by phone.",
    contact: { phone: "028 9504 0346" },
    checked: "4 Sep 2026"
  },
  {
    id: "northern-trust-adult-mh-teams",
    name: "Northern Trust — Adult Mental Health Teams",
    specialty: ["adultmh"],
    county: ["antrim"],
    blurb: "Runs 9 adult mental health teams (ages 18–64), Monday–Friday 9am–5pm.",
    details: ["NI-wide mental health waiting lists have grown substantially — one Trust has cited waits of around 5 years for CMHT assessment in some cases."],
    referral: "GP referral via the Referral Management / Clinical Communication Gateway.",
    contact: { phone: "028 9442 4000", extra: "Main hospital switchboard — ask for Adult Mental Health." },
    checked: "4 Sep 2026"
  },
  {
    id: "southern-trust-mh-referral-centre",
    name: "Southern Trust — Mental Health Referral and Booking Centre",
    specialty: ["adultmh"],
    county: ["armagh", "down"],
    blurb: "Single referral point for adult mental health services across Armagh, Banbridge, Craigavon, Dungannon, and Newry & Mourne.",
    details: [],
    referral: "GP referral via the Mental Health Referral and Booking Centre.",
    contact: { phone: "028 3752 8771", extra: "Newry/Mourne area: 028 3025 2423" },
    checked: "6 Sep 2026"
  },

  // ---- Dental & Oral Health ----
  {
    id: "dtss-scheme",
    name: "Dental Treatment Services Scheme (DTSS)",
    specialty: ["dental"],
    county: ["national"],
    blurb: "Free annual dental exam and other treatment for medical-card holders aged 16+.",
    details: [
      "Covers a free exam each calendar year, extractions as needed, and up to two fillings a year; one first-stage front-tooth root canal a year is also covered. Dentures and some other treatments need prior HSE approval.",
      "Some dentists have been withdrawing from the scheme due to contract terms — if your regular dentist no longer offers DTSS, ask your HSE Local Health Office for one that does.",
    ],
    referral: "Self-referral to any participating dentist.",
    contact: { web: "citizensinformation.ie/en/health/health-services/dental-aural-and-optical-services/dental-services/" },
    checked: "4 Sep 2026"
  },
  {
    id: "treatment-benefit-scheme",
    name: "Treatment Benefit Scheme (dental)",
    specialty: ["dental"],
    county: ["national"],
    blurb: "PRSI-based scheme (run by the Department of Social Protection, not the HSE) giving a free annual oral exam plus a subsidised scale-and-polish.",
    details: ["The scheme pays a €42 subsidy toward cleaning/periodontal treatment; you pay the balance (roughly €15)."],
    referral: "Self-referral to any participating dentist — check your PRSI eligibility first.",
    contact: { web: "gov.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "hse-public-dental-clinics",
    name: "HSE Public Dental Clinics",
    specialty: ["dental"],
    county: ["national"],
    blurb: "Routine and emergency dental care, plus special-care dentistry, based in primary care centres — with hospital referral where needed.",
    details: [],
    referral: "Contact your Local Health Office to register.",
    contact: { web: "citizensinformation.ie/en/health/health-services/dental-aural-and-optical-services/dental-services/" },
    checked: "4 Sep 2026"
  },
  {
    id: "ni-dental-access",
    name: "About NI dental access",
    specialty: ["dental"],
    county: ["antrim"],
    blurb: "NHS dental access in Northern Ireland is in a well-documented crisis.",
    details: [
      "Health Service dental registrations fell 21.9% (down 268,370) year-on-year to 958,009 in Q2 2025/26. Fewer than 44% of adults are now registered — an all-time low.",
      "Of roughly 360 dental practices in NI, only two remain fully NHS; most have gone partly or fully private.",
      "The Business Services Organisation (BSO) maintains a postcode-searchable directory of practices still accepting new NHS patients — check this before assuming none are available near you.",
    ],
    referral: "Self-referral via the BSO directory.",
    contact: { web: "hscbusiness.hscni.net" },
    checked: "4 Sep 2026"
  },

  // ---- Allergy & Immunology ----
  {
    id: "stjames-clinical-immunology",
    name: "St James's Hospital — Clinical Immunology Department",
    specialty: ["allergy"],
    county: ["dublin"],
    blurb: "Ireland's leading adult allergy/immunology centre — a twice-weekly outpatient clinic plus a 5-day ambulatory day ward. Accredited Jeffrey Modell Foundation centre and Ireland's first UCARE centre.",
    details: ["Specialist adult allergy provision is very limited nationally — this is one of the only dedicated services."],
    referral: "GP or consultant referral.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for Clinical Immunology." },
    checked: "4 Sep 2026"
  },
  {
    id: "chi-paediatric-allergy",
    name: "Children's Health Ireland — Paediatric Allergy",
    specialty: ["allergy", "parenting"],
    county: ["dublin"],
    blurb: "Paediatric allergy service prioritising anaphylaxis, food allergy, and allergic rhino-conjunctivitis.",
    details: [],
    referral: "GP referral via Healthlink.",
    contact: { phone: "01 409 6100", extra: "Runs clinics at CHI Crumlin, Temple Street, Tallaght and Connolly — this number is for CHI Crumlin appointments." },
    checked: "4 Sep 2026"
  },
  {
    id: "ifan",
    name: "Irish Food Allergy Network (IFAN)",
    specialty: ["allergy", "parenting"],
    county: ["national"],
    blurb: "Clinical and education resources for food allergy, including the \"egg ladder\" reintroduction guidance.",
    details: [],
    referral: "Self-referral for information.",
    contact: { email: "info@ifan.ie", web: "ifan.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "regional-immunology-service-ni",
    name: "Regional Immunology Service Northern Ireland",
    specialty: ["allergy"],
    county: ["antrim"],
    blurb: "Specialist allergy/immunology assessment for Northern Ireland, including a General Anaesthetic Allergy Clinic run jointly with anaesthetics.",
    details: [],
    referral: "GP or consultant referral.",
    contact: { phone: "028 9024 0503", extra: "Main hospital switchboard." }
  },
  {
    id: "find-adult-allergy-support",
    name: "About adult allergy support",
    specialty: ["allergy"],
    county: ["national"],
    blurb: "There's no large, dedicated national charity for adult allergy patients in Ireland at the moment.",
    details: [
      "Food-allergy-specific support and education is available via IFAN.",
      "The Asthma Society of Ireland's Adviceline also covers allergic asthma and hay fever.",
      "Anaphylaxis Ireland's current operational status could not be confirmed — verify it's still active before relying on it.",
    ],
    referral: "GP or consultant referral for clinical care.",
    contact: {},
    checked: "4 Sep 2026"
  },

  // ---- Palliative & End-of-Life Care ----
  {
    id: "iapc-referral-directory",
    name: "IAPC: find your local palliative care service",
    specialty: ["palliative"],
    county: ["national"],
    blurb: "The Irish Association for Palliative Care maintains a county-by-county directory of specialist palliative teams and hospices.",
    details: [
      "Examples from their directory: Kerry Specialist Palliative Care at UH Kerry, St Brigid's Hospice (The Curragh), North West Hospice (Sligo), Roscommon Palliative Care Support Unit (090 663 2200), and the South East Palliative Care Centre at UH Waterford — this isn't the full list, check the IAPC directory for your area.",
      "Palliative care is delivered at home via community palliative homecare teams, in specialist inpatient hospices, in general hospitals, and in day services.",
    ],
    referral: "GP or hospital doctor referral.",
    contact: { phone: "01 873 4735", email: "info@iapc.ie", web: "iapc.ie" },
    checked: "4 Sep 2026"
  },
  {
    id: "irish-hospice-foundation",
    name: "Irish Hospice Foundation",
    specialty: ["palliative", "loss"],
    county: ["dublin"],
    blurb: "National hospice and bereavement charity.",
    details: [
      "Runs Nurses for Night Care (funded via IHF, referred through your local specialist palliative homecare team), the Think Ahead end-of-life planning tool, and Caru.",
    ],
    referral: "Self-referral to the support lines; Nurses for Night Care via your palliative homecare team.",
    contact: { extra: "Bereavement Support Line: 1800 80 70 77 (Mon–Fri 10am–1pm) · Information & Support Line: 1800 60 70 66 (Mon–Fri 9am–6pm)", address: "Morrison Chambers (4th Floor), 32 Nassau Street, Dublin 2" }
  },
  {
    id: "irish-cancer-society-night-nursing",
    name: "Irish Cancer Society Night Nursing",
    specialty: ["palliative", "cancer"],
    county: ["national"],
    blurb: "Free night nursing care at home for people with cancer at end of life.",
    details: [],
    referral: "Referral via your public health nurse or palliative care team.",
    contact: { phone: "1800 200 700" },
    checked: "4 Sep 2026"
  },
  {
    id: "lauralynn",
    name: "LauraLynn",
    specialty: ["palliative", "parenting"],
    county: ["dublin"],
    blurb: "Ireland's only children's hospice.",
    details: ["Make-A-Wish Ireland is a separate charity that also supports children with life-threatening conditions."],
    referral: "Referral via your child's medical team.",
    contact: { phone: "01 289 3151", email: "info@lauralynn.ie", address: "Leopardstown Road, Foxrock, Dublin 18, D18 R620" },
    checked: "4 Sep 2026"
  },
  {
    id: "aiihpc-palliative-hub",
    name: "All-Ireland Institute of Hospice and Palliative Care (AIIHPC)",
    specialty: ["palliative"],
    county: ["national"],
    blurb: "Runs the Palliative Hub, an all-island resource for patients, families, and professionals.",
    details: [],
    referral: "Self-referral for information.",
    contact: { phone: "01 491 2948", email: "info@aiihpc.org", web: "aiihpc.org" },
    checked: "4 Sep 2026"
  },
  {
    id: "marie-curie-hospice-belfast",
    name: "Marie Curie Hospice Belfast",
    specialty: ["palliative"],
    county: ["antrim"],
    blurb: "Hospice and Hospice Care at Home (Belfast & South Eastern Trusts).",
    details: [],
    referral: "GP, district nurse, or hospital team referral.",
    contact: { phone: "028 9088 2000", email: "referralsni@mariecurie.org.uk", address: "1A Kensington Road, Belfast BT5 6NF" },
    checked: "4 Sep 2026"
  },
  {
    id: "ni-hospice",
    name: "Northern Ireland Hospice",
    specialty: ["palliative"],
    county: ["antrim"],
    blurb: "Adult and children's hospice services across Northern Ireland.",
    details: [],
    referral: "GP, district nurse, or hospital team referral.",
    contact: { phone: "028 9078 1836", email: "referrals@nihospice.org", address: "74 Somerton Road, Belfast BT15 3LH" }
  },

  // ==========================================================================
  // TIER 1/2 SECTOR GAPS — added Sep 2026 from an All-Island Sector Gap
  // Content Compilation drawing on HSE, HSC Trust, gov.ie/nidirect, and named
  // charity sources: Men's Health/Prostate, CAMHS, Older Persons/Geriatrics,
  // Adult Oncology, Stroke, Adult Disability, Addiction, Allied Health,
  // General Paediatrics, and Weight Management. The national clinical
  // programmes with fixed hospital hubs (NCCP rapid-access clinics,
  // designated cancer centres, stroke thrombectomy centres) are the most
  // stable, named, sourced content here. General paediatrics and
  // ROI-specific weight-management service names had the thinnest official
  // sourcing in the source compilation — framed accordingly below rather
  // than listed as firm entries. Last reviewed: 6 Sep 2026.
  // ==========================================================================

  // ---- Men's Health & Prostate: NCCP Rapid Access Prostate Clinics (8 centres) ----
  {
    id: "beaumont-prostate-rac",
    name: "Beaumont Hospital Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics — target is around 20 days from GP referral to first assessment.",
    details: ["GP referral via Healthlink, using the NCCP National Prostate Cancer GP Referral form.", "Also a designated centre for prostate cancer surgery."],
    referral: "GP referral (Healthlink).",
    contact: { phone: "01 809 3485", email: "prostateclinicnurses@beaumont.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "mater-prostate-rac",
    name: "Mater Misericordiae University Hospital Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics.",
    details: ["GP referral via Healthlink, using the NCCP National Prostate Cancer GP Referral form."],
    referral: "GP referral (Healthlink).",
    contact: { phone: "01 854 5274" },
  },
  {
    id: "stjames-prostate-rac",
    name: "St James's Hospital Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics; also a designated centre for prostate cancer surgery.",
    details: [],
    referral: "GP referral (Healthlink).",
    contact: { phone: "01 416 2850" },
  },
  {
    id: "stvincents-prostate-rac",
    name: "St Vincent's University Hospital Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics.",
    details: [],
    referral: "GP referral (Healthlink).",
    contact: { phone: "01 221 3055" },
  },
  {
    id: "cuh-orchid-prostate",
    name: "Cork University Hospital Orchid Centre — Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["cork-city"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics; the Orchid Centre also runs rapid access for breast, lung, and colorectal cancer.",
    details: ["Additional prostate assessment is also available at Mercy University Hospital, Cork."],
    referral: "GP referral (Healthlink).",
    contact: { phone: "021 492 2113" },
  },
  {
    id: "uhg-prostate-rac",
    name: "University Hospital Galway Urology Unit — Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["galway"],
    blurb: "The busiest prostate unit in Ireland (unit opened 2009); one of 8 NCCP-designated Rapid Access Prostate Clinics.",
    details: ["Also a designated centre for prostate cancer surgery."],
    referral: "GP referral (Healthlink).",
    contact: { phone: "091 542 053" },
  },
  {
    id: "uhl-prostate-rac",
    name: "University Hospital Limerick Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["limerick"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics.",
    details: [],
    referral: "GP referral (Healthlink).",
    contact: { phone: "061 585 636" },
  },
  {
    id: "uhw-prostate-rac",
    name: "University Hospital Waterford Rapid Access Prostate Clinic",
    specialty: ["mens-health"],
    county: ["waterford"],
    blurb: "One of 8 NCCP-designated Rapid Access Prostate Clinics.",
    details: ["Additional prostate assessment is also available at Tallaght University Hospital, Dublin."],
    referral: "GP referral (Healthlink).",
    contact: { phone: "051 842 044" },
  },
  {
    id: "private-prostate-rac",
    name: "Private Rapid Access Prostate Clinics",
    specialty: ["mens-health"],
    county: ["dublin", "cork-city"],
    sector: "private",
    blurb: "A faster-access option if you can pay and don't want to wait for a public referral.",
    details: ["Mater Private Network, Eccles St, Dublin 7.", "Bon Secours Cork also runs a prostate assessment service."],
    referral: "Referral letter usually required — check with the provider.",
    contact: { email: "prostate@materprivate.ie" },
  },
  {
    id: "marie-keating-prostate",
    name: "Marie Keating Foundation — Prostate Cancer Supports",
    specialty: ["mens-health"],
    county: ["national"],
    blurb: "National cancer charity (founded 2001) running prostate-specific awareness and survivorship supports.",
    details: [
      "\"Stand Up For Your Prostate\" awareness campaign, information booklets, and mobile nursing units.",
      "Survive & Thrive survivorship programmes, Positive Living courses, and the Comfort Fund for financial assistance during treatment.",
    ],
    referral: "Self-referral.",
    contact: { web: "mariekeating.ie" },
  },
  {
    id: "mhfi",
    name: "Men's Health Forum in Ireland (MHFI)",
    specialty: ["mens-health"],
    county: ["dublin"],
    blurb: "All-island advocacy and research charity coordinating International Men's Health Week — signposting and awareness, not clinical care.",
    details: ["Runs MaleHealth.ie together with the Irish Men's Sheds Association."],
    referral: "Self-referral for information.",
    contact: { web: "mhfi.org", address: "Carmichael House, 4-7 North Brunswick St, Dublin D07 RHA8" },
    checked: "6 Sep 2026"
  },
  {
    id: "about-mens-health-gaps",
    name: "About prostate cancer and men's health gaps",
    specialty: ["mens-health"],
    county: ["national"],
    blurb: "Ireland has the EU's highest rate of prostate cancer (roughly 3,900-4,000 diagnoses a year) — but there's no national screening programme, and public andrology, low-testosterone, and male-fertility care is thin.",
    details: [
      "PSA testing is via GP request only; there is no national prostate screening programme.",
      "Prostate cancer surgery is carried out at the 4 Dublin cancer centres, Cork University Hospital, and University Hospital Galway.",
      "Andrology, low-testosterone, and male-fertility clinics are largely private — public provision is limited.",
    ],
    referral: "Ask your GP about PSA testing if you have concerns.",
    contact: {},
  },

  // ---- Child & Adolescent Mental Health (CAMHS) ----
  {
    id: "hse-camhs",
    name: "HSE CAMHS (Child & Adolescent Mental Health Services)",
    specialty: ["camhs"],
    county: ["national"],
    blurb: "Community multidisciplinary teams for under-18s with moderate-to-severe mental health difficulties that can't be managed in primary care.",
    details: [
      "Referral can come from a GP, paediatrician, consultant, or senior community clinicians (NEPS psychologists, Tusla, Jigsaw, Disability Assessment Officers) — the referrer should liaise with the young person's GP.",
      "Named example: Linn Dara CAMHS, Dublin (CHO7).",
      "Staffing varies widely by area — from 44.8% to 74.7% of the levels recommended in \"A Vision for Change\" across CHOs.",
      "CAMHS-ID (intellectual disability) teams run under a separate national model of service.",
    ],
    referral: "GP, paediatrician, or other professional referral.",
    contact: { web: "hse.ie" },
  },
  {
    id: "jigsaw-camhs",
    name: "Jigsaw — National Centre for Youth Mental Health",
    specialty: ["camhs", "eating"],
    county: ["dublin", "kerry", "offaly", "tipperary", "wicklow", "waterford"],
    blurb: "Free, self-referral mental health support for ages 12-25, no diagnosis or GP letter needed — 18 locations nationwide.",
    details: [
      "Named sites include Dublin City (44 Essex St East, Temple Bar D02 YR92, and Summerhill D01 TY46), Dublin South West (St John's House, High St, Tallaght D24), North Fingal (Swords K67 Y6K7), Kerry (Tralee), Offaly (Tullamore), Tipperary (Thurles), Wicklow (Bray), and Waterford (opened 31 August 2026).",
      "Per Jigsaw's 2025 Annual Report, referrals rose 23% to 11,064 in 2025 — the highest in its history — with a further 33% rise in Q1 2026 (to 3,909), which Jigsaw says signals an accelerating trend in youth mental health need.",
    ],
    referral: "Self-referral via jigsaw.ie/go.",
    contact: { phone: "1800 544 729", web: "jigsaw.ie/go" },
    checked: "6 Sep 2026"
  },
  {
    id: "ni-camhs",
    name: "NI CAMHS (HSC Trusts)",
    specialty: ["camhs"],
    county: ["antrim", "londonderry", "tyrone", "fermanagh"],
    blurb: "Services for under-18s across the 5 HSC Trusts — GP or professional referral (self-referral is generally not accepted).",
    details: [
      "Beechcroft (Forster Green Hospital site, 110 Saintfield Rd, Belfast BT8 6HD) is the regional inpatient/crisis hub, including the Crisis Assessment & Intervention Team and the DAMHS substance-misuse team.",
      "Western Trust runs 3 teams: Londonderry, Omagh (Rivendell), and Enniskillen (Erne Health Centre).",
    ],
    referral: "GP or professional referral.",
    contact: { extra: "Beechcroft, Belfast — regional hub" },
  },
  {
    id: "beechcroft-edys",
    name: "Beechcroft Eating Disorder Youth Service (EDYS)",
    specialty: ["camhs", "eating"],
    county: ["antrim"],
    blurb: "NI's eating disorder service for ages 10-18.",
    details: [],
    referral: "GP or CAMHS referral only.",
    contact: { phone: "028 9615 0033" },
  },
  {
    id: "southern-trust-camhs-ed",
    name: "Southern Trust CAMHS Eating Disorder Service (The Sperrins, Cedarwood)",
    specialty: ["camhs", "eating"],
    county: ["armagh"],
    blurb: "Eating disorder service for ages 10-18, based at the Cedarwood site (Longstone, Armagh).",
    details: [],
    referral: "GP or CAMHS referral.",
    contact: { email: "cedarwood@southerntrust.hscni.net" },
  },
  {
    id: "northern-trust-camhs-ed",
    name: "Northern Trust Eating Disorder Team (Step 3 CAMHS)",
    specialty: ["camhs", "eating"],
    county: ["antrim"],
    blurb: "Eating disorder support within Northern Trust's Step 3 CAMHS.",
    details: [],
    referral: "Via the Children's Referral Service.",
    contact: {},
  },

  // ---- Older Persons & Geriatric Medicine ----
  {
    id: "hse-older-persons-services",
    name: "HSE Older Persons Services",
    specialty: ["olderpersons"],
    county: ["national"],
    blurb: "Memory/dementia clinics, falls clinics, geriatric outpatient departments, geriatric day hospitals, and home support/reablement, organised by area and hospital.",
    details: ["Falls clinics cross-link with Bone Health & Osteoporosis services."],
    referral: "GP or hospital referral.",
    contact: { web: "hse.ie" },
  },
  {
    id: "asi-national",
    name: "Alzheimer Society of Ireland (ASI)",
    specialty: ["olderpersons"],
    county: ["national"],
    blurb: "National dementia charity — National Helpline, memory clinics, day care, home care, respite, Alzheimer Cafés, and family-carer training.",
    details: [
      "Services are searchable by county at alzheimer.ie/get-support/services-in-my-county.",
      "Memory clinics are referral-based and require a confirmed dementia diagnosis (or GP/consultant referral) for day-care access.",
    ],
    referral: "Self-referral to the helpline; GP/consultant referral for memory clinics and day care.",
    contact: { phone: "1800 341 341", web: "alzheimer.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "asi-memory-clinics",
    name: "ASI-linked memory clinics (named examples)",
    specialty: ["olderpersons"],
    county: ["dublin", "carlow", "cork-city"],
    blurb: "A sample of referral-based memory clinics — check alzheimer.ie for others closer to you.",
    details: [
      "Carew House, St Vincent's University Hospital, Elm Park, Dublin 4.",
      "St Columcille's Hospital, Loughlinstown (ages 65+ only — under-65s are referred to St Vincent's Neurology).",
      "Sacred Heart Hospital Day Hospital, Old Dublin Road, Carlow.",
      "St Finbarr's Hospital Assessment & Treatment Centre, Douglas Rd, Cork.",
    ],
    referral: "GP or consultant referral.",
    contact: {},
  },
  {
    id: "asi-day-care",
    name: "ASI day-care centres (named examples)",
    specialty: ["olderpersons"],
    county: ["cork-city", "westmeath", "limerick", "wicklow"],
    blurb: "A sample of ASI day-care centres — nationwide network searchable by county at alzheimer.ie.",
    details: [
      "Teach Mhuire, Old Youghal Rd, Cork.",
      "Abbey Road Day Centre, Coosan Rd, Athlone, Co. Westmeath N37 A7X6.",
      "Garryowen, Kilmurry Court, Co. Limerick V94 DR60.",
      "St Coleman's, Ballinderry Rd, Rathdrum, Co. Wicklow.",
    ],
    referral: "Referral form plus a confirmed dementia diagnosis from a GP/consultant.",
    contact: {},
  },
  {
    id: "ni-older-persons-services",
    name: "NI older-persons and memory services (HSC Trusts)",
    specialty: ["olderpersons"],
    county: ["national"],
    blurb: "Memory services, falls services, and older-persons community teams and reablement, via the 5 HSC Trusts.",
    details: [],
    referral: "GP referral.",
    contact: {},
  },

  // ---- Cancer Care (General & Adult Oncology): 8 NCCP designated centres ----
  {
    id: "beaumont-cancer-centre",
    name: "Beaumont RCSI Cancer Centre",
    specialty: ["oncology"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated adult cancer centres — OECI-accredited. CNS/brain tumour surgery is also based here.",
    details: ["Hub-and-spoke model: initial diagnosis and surgery here, with chemotherapy and follow-up closer to home."],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "mater-cancer-centre",
    name: "Mater Misericordiae University Hospital Cancer Centre",
    specialty: ["oncology"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated adult cancer centres.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "01 803 2000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "stjames-cancer-centre",
    name: "St James's Hospital Cancer Centre",
    specialty: ["oncology"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated adult cancer centres; upper-GI cancer surgery is centred here.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "01 410 3000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "stvincents-cancer-centre",
    name: "St Vincent's UCD Cancer Centre",
    specialty: ["oncology"],
    county: ["dublin"],
    blurb: "One of 8 NCCP-designated adult cancer centres; pancreatic cancer surgery is centred here.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "01 221 4000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "cuh-cancer-centre",
    name: "Cork University Hospital Cancer Centre",
    specialty: ["oncology"],
    county: ["cork-city"],
    blurb: "One of 8 NCCP-designated adult cancer centres — also runs a pancreatic surgery satellite service.",
    details: ["The Orchid Centre covers rapid access for breast, lung, prostate, and colorectal cancer."],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "uhg-cancer-centre",
    name: "University Hospital Galway / Saolta University Cancer Network",
    specialty: ["oncology"],
    county: ["galway"],
    blurb: "One of 8 NCCP-designated adult cancer centres — OECI-accredited December 2024.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "091 524 222", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "uhl-cancer-centre",
    name: "University Hospital Limerick Cancer Centre",
    specialty: ["oncology"],
    county: ["limerick"],
    blurb: "One of 8 NCCP-designated adult cancer centres.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "uhw-cancer-centre",
    name: "University Hospital Waterford Cancer Centre",
    specialty: ["oncology"],
    county: ["waterford"],
    blurb: "One of 8 NCCP-designated adult cancer centres.",
    details: [],
    referral: "GP referral to the relevant rapid-access clinic or MDT.",
    contact: { phone: "051 848 000", extra: "Main hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "slron-radiation-oncology",
    name: "St Luke's Radiation Oncology Network (SLRON)",
    specialty: ["oncology"],
    county: ["dublin"],
    blurb: "Ireland's public radiation oncology network — three centres (St Luke's Hospital Rathgar, and radiation oncology centres on the St James's and Beaumont Hospital campuses) delivering the radiotherapy component of cancer treatment nationwide.",
    details: [
      "Works alongside, not instead of, the NCCP-designated cancer centres above — those handle diagnosis, surgery and chemotherapy; SLRON delivers radiotherapy as part of the same treatment plan.",
      "St James's site: 01 420 6900.",
    ],
    referral: "Referred by your treating oncology team as part of a wider cancer-care plan — not a direct-access service.",
    contact: { phone: "01 406 5000", web: "stlukesnetwork.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "upmc-whitfield-waterford",
    name: "UPMC Whitfield Hospital (Waterford)",
    specialty: ["oncology"],
    county: ["waterford"],
    sector: "private",
    provider: "UPMC",
    blurb: "Private hospital hosting the UPMC Hillman Cancer Centre — the South East's only private radiotherapy service (two linear accelerators), alongside general private surgical and diagnostic care.",
    details: ["Cork Road, Butlerstown North, Waterford."],
    referral: "Consultant/oncologist referral (a radiotherapy referral form is required). Self-pay or health-insurance-funded.",
    contact: { phone: "051 337 400", web: "upmc.ie/locations/hospitals/whitfield" },
    checked: "6 Sep 2026"
  },
  {
    id: "irish-cancer-society-support",
    name: "Irish Cancer Society Support Line & Daffodil Centres",
    specialty: ["oncology", "cancer"],
    county: ["national"],
    blurb: "Free cancer information and support, no referral needed — Daffodil Centres are drop-in, staffed by cancer nurses and trained volunteers.",
    details: [
      "13 Daffodil Centre locations: Beaumont, Mater, St James's, St Vincent's (Elm Park), St Luke's Rathgar, Tallaght UH, Blackrock Health Hermitage Clinic (Lucan), Cork University Hospital, Bon Secours Cork, University Hospital Galway, Letterkenny UH, University Hospital Limerick, and University Hospital Waterford.",
      "Also runs transport-to-treatment services and counselling.",
    ],
    referral: "Self-referral — drop in or phone.",
    contact: { phone: "1800 200 700", email: "supportline@irishcancer.ie", web: "cancer.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "ni-cancer-centre",
    name: "Northern Ireland Cancer Centre (Belfast City Hospital)",
    specialty: ["oncology"],
    county: ["antrim"],
    blurb: "NI's regional radiotherapy, chemotherapy, and brachytherapy centre — the regional haematology service (bone-marrow transplant, stem-cell harvesting) is also based here.",
    details: ["Macmillan Support & Information Centre on-site, Mon-Fri 9am-4pm."],
    referral: "GP or consultant referral.",
    contact: { phone: "028 9032 9241", extra: "Belfast City Hospital switchboard — ask for the Cancer Centre." },
  },
  {
    id: "ni-cancer-units",
    name: "NI Cancer Units (Altnagelvin, Antrim Area, Craigavon, Ulster)",
    specialty: ["oncology"],
    county: ["londonderry", "antrim", "armagh", "down"],
    blurb: "The 4 cancer units linked to the Northern Ireland Cancer Centre, delivering care closer to home across the Western, Northern, Southern, and South Eastern Trusts.",
    details: [],
    referral: "GP or consultant referral.",
    contact: {},
  },
  {
    id: "about-oncology-postcode-lottery",
    name: "About regional variation in cancer care",
    specialty: ["oncology"],
    county: ["national"],
    blurb: "Clinicians have described access to some cancer services as a \"postcode lottery\" — a national cancer network is being piloted in the HSE Dublin and South East region, but this is still at planning stage, not yet delivered.",
    details: [],
    referral: "",
    contact: {},
  },

  // ---- Stroke ----
  {
    id: "beaumont-thrombectomy",
    name: "Beaumont Hospital Stroke & Thrombectomy Service",
    specialty: ["stroke"],
    county: ["dublin"],
    blurb: "One of Ireland's 2 comprehensive/endovascular thrombectomy (EVT) centres, operating 24/7 — an ESO-certified Stroke Centre.",
    details: ["In an emergency, call 999/112 — use the FAST test (Face, Arms, Speech, Time)."],
    referral: "Emergency (999/112); TIA clinic via GP referral.",
    contact: { phone: "01 809 3000", extra: "Main hospital switchboard — ask for the Stroke Unit." },
  },
  {
    id: "cuh-thrombectomy",
    name: "Cork University Hospital Stroke & Thrombectomy Service",
    specialty: ["stroke"],
    county: ["cork-city"],
    blurb: "One of Ireland's 2 comprehensive/endovascular thrombectomy (EVT) centres, operating 24/7.",
    details: ["In an emergency, call 999/112 — use the FAST test (Face, Arms, Speech, Time)."],
    referral: "Emergency (999/112); TIA clinic via GP referral.",
    contact: { phone: "021 492 2000", extra: "Main hospital switchboard — ask for the Stroke Unit." },
  },
  {
    id: "about-stroke-hospitals",
    name: "About acute stroke hospitals nationwide",
    specialty: ["stroke"],
    county: ["national"],
    blurb: "24 hospitals provide acute stroke services with a designated stroke unit, and around 11 run 24/7 on-call stroke teams — no single compact public list of all 24 exists yet.",
    details: [
      "Early Supported Discharge (ESD) teams operate in 14 hospitals.",
      "TIA (\"mini-stroke\") clinics are hospital-based, accessed via GP referral.",
      "In most hospitals, stroke cover is provided by geriatric medicine (83% in hours).",
    ],
    referral: "Emergency (999/112) for suspected stroke; GP referral for TIA clinics.",
    contact: {},
  },
  {
    id: "ni-stroke-pathway",
    name: "NI stroke pathway (HSC Trusts)",
    specialty: ["stroke"],
    county: ["national"],
    blurb: "Acute stroke units (hyperacute and acute) across the 5 HSC Trusts, with reconfiguration ongoing — TIA clinics and stroke rehabilitation are also delivered via the Trusts.",
    details: [],
    referral: "Emergency (999); GP referral for TIA clinics.",
    contact: {},
  },
  {
    id: "about-stroke-capacity-gap",
    name: "About the stroke-unit bed capacity gap",
    specialty: ["stroke"],
    county: ["national"],
    blurb: "Per NOCA's Irish National Audit of Stroke National Report 2024, only 73% of stroke patients accessed a stroke-unit bed in 2024, against a 90% target.",
    details: [
      "Stroke admissions rose 13% from 6,089 (2021) to 6,882 (2024), while stroke-unit beds rose just 2% (239 to 244) over the same period.",
      "Stroke-unit bed access fell 10 percentage points since 2021, with almost half of patients now treated in a bed outside a stroke unit.",
      "In 2021, 88% of stroke units were below the recommended nurse-staffing level.",
    ],
    referral: "",
    contact: {},
  },

  // ---- Adult Disability Services ----
  {
    id: "hse-adult-disability-day",
    name: "HSE Adult Disability Day Service / Rehabilitative Training",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "Day services and rehabilitative training for adults with physical/sensory or intellectual disability, entered after school-leaving (18) or after Rehabilitative Training (roughly 2-4 years).",
    details: ["Most day, residential, and rehabilitative-training services are delivered by HSE-funded voluntary organisations, coordinated by your local Disability Services Manager.", "A standard HSE Referral Form for Adult Disability Day Services exists — ask your local Adult Disability Day Opportunities Office."],
    referral: "Contact your local Adult Disability Day Opportunities Office.",
    contact: { web: "hse.ie" },
  },
  {
    id: "hse-disability-respite",
    name: "HSE Disability Respite Care",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "Temporary carer relief for families/carers of adults with a disability.",
    details: [],
    referral: "Contact your local health centre or Public Health Nurse for assessment.",
    contact: {},
  },
  {
    id: "hse-personal-assistance",
    name: "HSE Personal Assistance / Home Support (adult disability)",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "Personal assistant hours and home support via HSE community care, often prioritised by assessed need.",
    details: [],
    referral: "Via HSE community care.",
    contact: {},
  },
  {
    id: "enable-ireland-adult",
    name: "Enable Ireland — Adult Services",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "HSE-funded provider of adult day services, personal assistants, and supported employment for people with disabilities.",
    details: [],
    referral: "Via your local Disability Services Manager.",
    contact: { web: "enableireland.ie" },
  },
  {
    id: "rehabcare-respite",
    name: "RehabCare (Rehab Group) — Respite",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "HSE-funded respite services — an HSE referral is required.",
    details: [],
    referral: "HSE referral required.",
    contact: { web: "rehab.ie/rehabcare/" },
  },
  {
    id: "sjog-brothers-charity",
    name: "St John of God & Brothers of Charity — Intellectual Disability Services",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "HSE-funded day, residential, and respite services for adults with an intellectual disability.",
    details: [],
    referral: "Via your local Disability Services Manager.",
    contact: {},
  },
  {
    id: "belfast-trust-disability-daycentres",
    name: "Belfast Trust — Adult Learning Disability Day Centres",
    specialty: ["adultdisability"],
    county: ["antrim"],
    blurb: "8 day centres across Belfast Trust for adults with a learning disability.",
    details: [],
    referral: "Referral via the learning-disability multidisciplinary team.",
    contact: {},
  },
  {
    id: "northern-trust-disability",
    name: "Northern Trust — Adult Disability Services",
    specialty: ["adultdisability"],
    county: ["antrim"],
    blurb: "Community living, day services, and respite for adults (18+) with a formal learning-disability diagnosis.",
    details: [],
    referral: "Via Mental Health & Learning Disability Social Work Teams, or GP/self-referral with a formal diagnosis.",
    contact: {},
  },
  {
    id: "setrust-day-opportunities",
    name: "South Eastern Trust — Day Opportunities",
    specialty: ["adultdisability"],
    county: ["down"],
    blurb: "Includes Social Farming, Men's Shed, and horticulture programmes; named provider Positive Futures.",
    details: [],
    referral: "GP, professional, or self-referral via area day-care panels.",
    contact: {},
  },
  {
    id: "about-adult-disability-variation",
    name: "About regional variation in adult disability services",
    specialty: ["adultdisability"],
    county: ["national"],
    blurb: "Provision \"varies considerably throughout the country\" (Citizens Information/HSE), and residential-service demand is extremely high and prioritised strictly by assessed need.",
    details: [],
    referral: "",
    contact: {},
  },

  // ---- Addiction & Substance Use ----
  {
    id: "hse-addiction-helpline",
    name: "HSE Drugs and Alcohol Helpline",
    specialty: ["addiction"],
    county: ["national"],
    blurb: "Free confidential helpline for anyone with a question or concern about their own or someone else's drug or alcohol use.",
    details: ["Non-residential/outpatient services are free; some residential services are free or covered by a medical card.", "Includes routes into opioid substitution (methadone) treatment, counselling, and needle exchange/harm reduction."],
    referral: "Self-referral to the helpline; GP or local addiction-service assessment for treatment.",
    contact: { phone: "1800 459 459", email: "helpline@hse.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "drugs-ie-services-directory",
    name: "Find local drug & alcohol support (Drugs.ie)",
    specialty: ["addiction"],
    county: ["national"],
    blurb: "The HSE's searchable directory of local addiction services, support groups, and counselling — the practical next step after the national helpline if you want in-person or ongoing support near you.",
    details: [
      "Also offers free, confidential live chat.",
      "Local services are funded and coordinated through your area's Drug and Alcohol Task Force — 14 across the country (12 in greater Dublin, 1 in Bray, 1 in Cork), plus Regional Task Forces covering the rest — but you don't need to know this to use the directory; just search by your area.",
    ],
    referral: "Self-referral via the directory or live chat.",
    contact: { web: "services.drugs.ie", email: "drugs.ie@hse.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "ni-substance-misuse",
    name: "Find local drug & alcohol support (NI)",
    specialty: ["addiction"],
    county: ["national"],
    blurb: "A searchable directory of drug and alcohol treatment and support services across Northern Ireland, from brief advice to longer-term one-to-one or residential treatment.",
    details: [
      "If the online finder is down, HSC's substance-use team can point you to services directly: substanceuse@hscni.net.",
      "DAMHS (Drug & Alcohol Mental Health Service) for under-18s is based at Beechcroft, Belfast.",
      "AA/NA support groups operate all-island.",
    ],
    referral: "Self-referral via the directory, or GP/Trust referral.",
    contact: { web: "services.drugsandalcoholni.info", email: "substanceuse@hscni.net" },
    checked: "6 Sep 2026"
  },
  {
    id: "coolmine-tc",
    name: "Coolmine Therapeutic Community",
    specialty: ["addiction"],
    county: ["dublin"],
    sector: "voluntary",
    blurb: "Community-based and residential drug and alcohol treatment, running since 1973 — includes a men's residential service (The Lodge), a women's residential service (Ashleigh House), day programmes, and a community addiction team for Dublin 15.",
    details: [
      "PACT (community-based assessment and treatment) can be reached directly for a quicker first contact than the main office.",
      "Programmes are free at the point of use; HSE/Drug and Alcohol Task Force funded.",
    ],
    referral: "Self-referral, GP, or addiction-service referral for an assessment.",
    contact: { phone: "01 699 1587", extra: "PACT direct line: 086 415 9099", email: "info@coolminetc.ie", web: "coolmine.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "merchants-quay-ireland",
    name: "Merchants Quay Ireland",
    specialty: ["addiction"],
    county: ["dublin"],
    sector: "voluntary",
    blurb: "Drug and alcohol harm-reduction and treatment service at the Riverbank Centre, alongside homelessness support — needle exchange, drop-in health care, counselling, and drug-free programmes.",
    details: [
      "Open-access drop-in during service hours; you don't need an appointment for the harm-reduction side.",
      "Riverbank Centre, 13 Merchants Quay, Dublin 8.",
    ],
    referral: "Self-referral (drop-in or phone for an appointment).",
    contact: { phone: "01 524 0968", extra: "Helpline: 01 524 0927", web: "mqi.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "cuan-mhuire-network",
    name: "Cuan Mhuire (residential treatment)",
    specialty: ["addiction"],
    county: ["kildare", "galway", "limerick", "cork-west", "down"],
    sector: "voluntary",
    provider: "Cuan Mhuire",
    blurb: "Ireland's largest voluntary residential addiction treatment provider — 12-week programmes for alcohol/gambling, 20-week for drugs, across five centres including one in Northern Ireland.",
    details: [
      "Athy, Co. Kildare: 059 863 1493.",
      "Coolarne, Athenry, Co. Galway: 091 797 102.",
      "Bruree, Co. Limerick: 063 90555.",
      "Farnanes, Co. Cork (near Crookstown/Ovens): 021 733 5994.",
      "Newry, Northern Ireland: 028 3084 9010.",
    ],
    referral: "Self, family, GP, or statutory-service referral; self-funded places also available.",
    contact: { phone: "059 863 1493", email: "admission@cuanmhuire.ie", web: "cuanmhuire.ie" },
    checked: "6 Sep 2026"
  },
  {
    id: "addiction-ni",
    name: "Addiction NI",
    specialty: ["addiction"],
    county: ["antrim"],
    sector: "voluntary",
    blurb: "Belfast-based charity providing free counselling and family support for alcohol and drug misuse — separate adult (18-54) and older-persons (55+) services.",
    details: [
      "East Belfast office: 219 Albertbridge Road, 028 9073 1602.",
      "South Belfast office: 40 Elmwood Avenue, 028 9066 4434.",
    ],
    referral: "Self-referral — a GP referral is not required.",
    contact: { phone: "028 9073 1602", web: "addictionni.com" },
    checked: "6 Sep 2026"
  },

  // ---- Allied Health (Physio, OT, SLT, Podiatry) ----
  {
    id: "hse-allied-health-referral",
    name: "HSE Adult Primary Care Services Referral Form",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "A single referral form covers physiotherapy, occupational therapy, speech & language therapy, psychology, dietetics, social work, and public health nursing — but self-referral eligibility genuinely varies by area, so the right first step is contacting your local primary care centre.",
    details: ["Many community services are GP/PHN/consultant-referral only, but a growing number of primary care centres accept self-referral directly — ask your local centre what applies."],
    referral: "Contact your local Primary Care Centre; GP/PHN/consultant referral in many areas.",
    contact: { web: "hse.ie" },
  },
  {
    id: "hse-physio-primary-care",
    name: "HSE Physiotherapy (Primary Care)",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "MSK, neurological (MS/MND/Parkinson's), falls, and home-programme physiotherapy — referral rules vary by area.",
    details: ["Community physiotherapy waiting lists are a known pressure point."],
    referral: "GP/PHN/consultant referral in most areas; self-referral at a growing number of primary care centres.",
    contact: {},
  },
  {
    id: "hse-podiatry-diabetic-foot",
    name: "HSE Podiatry, Chiropody & Diabetic Foot Care",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "Not a statutory entitlement, but free to medical-card holders where provided — people 65+ get free community podiatry where available, and a chiropody treatment card exists for medical-card holders 65+ or with diabetes.",
    details: [
      "Under the HSE Model of Care for the Diabetic Foot (2021), people with diabetes and a medical card get one free diabetic foot screening a year, with risk-stratified follow-up (community/hospital podiatry, or a hospital Multidisciplinary Diabetic Foot Team for active foot disease).",
      "The national footcare screening programme is still becoming established, per Diabetes Ireland.",
    ],
    referral: "PHN/GP referral; some services accept direct contact.",
    contact: {},
  },
  {
    id: "hse-ot-primary-care",
    name: "HSE Occupational Therapy (adults)",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "Daily-living assessment, aids/appliances, seating/pressure care, and falls support for adults 18+.",
    details: ["Housing Adaptation Grant applications go to your county council and usually need a CORU-registered OT report — several HSE community OT departments don't provide these reports, so a private OT (via aoti.ie) may be needed.", "Hospital-discharge cases are generally prioritised; waits vary by area."],
    referral: "GP/health-professional referral, or self-referral in many areas.",
    contact: {},
  },
  {
    id: "hse-slt-primary-care",
    name: "HSE Speech & Language Therapy",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "Open referral for children 0-17 (via your Local Health Office, GP, PHN, teacher, or psychologist); adults 18-65 with a physical/sensory disability, and dysphagia management, via open referral, GP, PHN, or social worker.",
    details: ["Children with complex profiles are routed to a Children's Disability Network Team (CDNT) instead."],
    referral: "Open referral, GP, PHN, or social worker referral.",
    contact: {},
  },
  {
    id: "ni-ahp-physio",
    name: "NI Physiotherapy Self-Referral (HSC Trusts)",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "Physiotherapy self-referral is well-established in NI — Belfast Trust MSK physio takes self-referrals with no GP needed; South Eastern Trust allows self-referral for adults 16+ (with some exclusions); Northern Trust MSK also accepts self-referral.",
    details: ["Access via nidirect and the \"My Care\"/encompass portal."],
    referral: "Self-referral (Trust-dependent) or GP referral.",
    contact: {},
  },
  {
    id: "ni-ahp-podiatry-ot-slt",
    name: "NI Podiatry, Occupational Therapy & Speech & Language Therapy (HSC Trusts)",
    specialty: ["alliedhealth"],
    county: ["national"],
    blurb: "Podiatry is prioritised by clinical risk (diabetes, peripheral vascular disease, rheumatoid arthritis, immunosuppression/anticoagulants); OT community teams and SLT run via GP or social-work referral, with home adaptations via your Trust.",
    details: ["Paediatric SLT referral is often open referral."],
    referral: "GP, self-referral, or social-work referral (service-dependent).",
    contact: {},
  },

  // ---- General Paediatrics (non-disability) ----
  {
    id: "chi-hub",
    name: "Children's Health Ireland (CHI) — Paediatric Hospitals",
    specialty: ["paediatrics"],
    county: ["dublin"],
    blurb: "The tertiary hub for paediatric care: CHI at Crumlin, Temple Street, Tallaght, and Connolly, with the new National Children's Hospital in development.",
    details: [
      "Community/developmental paediatrics links to Public Health Nurse developmental checks.",
      "Regional (\"model 4R\"), major (\"model 3\"), and local (\"model 2\") hospitals nationwide also run paediatric assessment units and outpatient departments as part of the HSE's National Model of Care for Paediatric Healthcare — see named regional examples below.",
    ],
    referral: "GP or ED referral.",
    contact: { web: "childrenshealthireland.ie" },
  },
  {
    id: "cuh-paediatrics",
    name: "Cork University Hospital Paediatric Assessment Unit",
    specialty: ["paediatrics"],
    county: ["cork-city"],
    blurb: "Rapid-access assessment for children under 16, based in the Seahorse Day Ward — strictly by GP referral.",
    details: ["GP referral line (for GPs only): 087 410 8074."],
    referral: "GP referral only.",
    contact: { phone: "021 492 2449" },
    checked: "6 Sep 2026"
  },
  {
    id: "uhg-paediatrics",
    name: "University Hospital Galway — St Bernadette's Children's Unit",
    specialty: ["paediatrics"],
    county: ["galway"],
    blurb: "A 32-bed paediatric unit (11 infant cots, 21 beds) with its own paediatric emergency department for newborns to age 16.",
    details: [],
    referral: "GP or ED referral.",
    contact: { phone: "091 524 222", extra: "Main hospital switchboard — ask for St Bernadette's / Paediatrics." },
    checked: "6 Sep 2026"
  },
  {
    id: "uhl-paediatrics",
    name: "University Hospital Limerick — The Children's Ark",
    specialty: ["paediatrics"],
    county: ["limerick"],
    blurb: "UHL's paediatric unit — Rainbow Ward for babies and children up to 3, Sunshine Ward for ages 3 to 16.",
    details: [],
    referral: "GP or ED referral.",
    contact: { phone: "061 301 111", extra: "Main hospital switchboard — ask for The Children's Ark." },
    checked: "6 Sep 2026"
  },
  {
    id: "uhw-paediatrics",
    name: "University Hospital Waterford Paediatrics",
    specialty: ["paediatrics"],
    county: ["waterford"],
    blurb: "General paediatric ward and outpatient department.",
    details: [],
    referral: "GP or ED referral.",
    contact: { phone: "051 848 000", extra: "Main hospital switchboard — ask for Paediatrics." },
  },
  {
    id: "ni-paediatrics",
    name: "Royal Belfast Hospital for Sick Children & NI Paediatric Units",
    specialty: ["paediatrics"],
    county: ["antrim"],
    blurb: "The regional children's hospital, alongside paediatric units at Trust general hospitals (Antrim, Craigavon, Altnagelvin, Ulster).",
    details: [],
    referral: "GP or ED referral.",
    contact: {},
  },

  // ---- Weight Management & Bariatric Care ----
  {
    id: "hse-weight-management-tiered",
    name: "HSE Adult Weight Management Services",
    specialty: ["weightmanagement"],
    county: ["national"],
    blurb: "A tiered model (Tier 1 health promotion, Tier 2 community lifestyle, Tier 3 specialist multidisciplinary weight management, Tier 4 bariatric surgery) — there are only two public Tier 3/4 specialist services nationally, so capacity is limited and geographically concentrated.",
    details: ["Dietetics referral for Tier 1/2 support is via GP or primary care.", "For Tier 3/4 (specialist multidisciplinary care and bariatric surgery), see the two named public services below — St Columcille's Hospital (Dublin) and University Hospital Galway."],
    referral: "GP/primary-care referral.",
    contact: {},
  },
  {
    id: "st-columcilles-obesity-centre",
    name: "St Columcille's Hospital Centre for Obesity Management",
    specialty: ["weightmanagement"],
    county: ["dublin"],
    blurb: "A public Tier 3 specialist multidisciplinary weight management service, working with St Vincent's University Hospital for bariatric surgery referral.",
    details: ["Email is the most reliable way to contact them — phone queries may go to an answering machine.", "Referral forms go to Central Referrals: centralreferral.office@hse.ie, or by post to Central Referrals, St Columcille's Hospital, Loughlinstown, Dublin 18, D18 V9K1."],
    referral: "GP, consultant, or other health professional referral.",
    contact: { phone: "01 211 5243", email: "schcom@hse.ie", address: "St Columcille's Hospital, Bray Road, Shanganagh, Loughlinstown, Co. Dublin D18 V9K1" },
    checked: "6 Sep 2026"
  },
  {
    id: "uhg-bariatric-service",
    name: "University Hospital Galway Bariatric/Obesity Service",
    specialty: ["weightmanagement"],
    county: ["galway"],
    blurb: "One of only two public specialist multidisciplinary services for obesity and bariatric surgery in Ireland, serving GP referrals from across the western seaboard.",
    details: ["Multidisciplinary team covers dietetics, physiotherapy, occupational therapy, social work, medicine, nursing, surgery, and psychology."],
    referral: "GP referral.",
    contact: { phone: "091 524 222", extra: "Main hospital switchboard — ask for the Bariatric/Obesity Service." },
    checked: "6 Sep 2026"
  },
  {
    id: "ni-weight-management",
    name: "NI Weight Management & the Regional Obesity Management Service (ROMS)",
    specialty: ["weightmanagement"],
    county: ["national"],
    blurb: "A tiered pathway exists via GP and Trust dietetics, but NI has never had an NHS bariatric surgery service — patients needing surgery are referred out of region.",
    details: [
      "A new Regional Obesity Management Service (ROMS) is due to roll out from autumn 2026, giving adults with the highest clinical need access to weight-loss medication (where clinically appropriate) plus lifestyle support — this is a medication/lifestyle service, not a bariatric surgery programme.",
      "ROMS runs alongside the Obesity Pathway Innovation Programme (OPIP), delivered with the community and voluntary sector.",
    ],
    referral: "GP/Trust referral.",
    contact: {},
    checked: "6 Sep 2026"
  },
];

// A small, curated set for the always-visible crisis banner — kept separate
// from the full ENTRIES list so it stays short and fast to scan under stress.
const CRISIS_RESOURCES = [
  { name: "Emergency", detail: "In immediate danger", contact: "999 / 112" },
  { name: "Samaritans", detail: "24/7, any kind of distress", contact: "116 123" },
  { name: "Text 50808", detail: "24/7 crisis text line", contact: "Text HELLO to 50808" },
  { name: "Pieta", detail: "Suicide & self-harm specific", contact: "1800 247 247" },
  { name: "Lifeline (NI)", detail: "Northern Ireland crisis line", contact: "0808 808 8000" },
];

// Self-advocacy guide, structured as modules. Sourced from the Patient Advocacy
// Service's step-by-step complaint guide, AIMS Ireland's complaint-support model,
// and the Dept of Health's "Our Health, Our Voices" listening forum (Oct 2025).
// Last reviewed: Sep 2026 — verify against source sites before relying on it.
const ADVOCACY_GUIDE = [
  {
    id: "prepare",
    title: "Before your appointment",
    tips: [
      "Write a short symptom timeline and one clear 'headline' concern — what you most need this appointment to address.",
      "Bring written questions. It's easy to forget them once you're in the room.",
      "Ask for 'teach-back': if something's explained, ask the clinician to confirm you've understood it correctly.",
      "Ask that your concerns be noted in your record, in your own words if possible.",
    ],
  },
  {
    id: "dismissed",
    title: "If you feel you're being dismissed",
    tips: [
      "Ask directly what the clinical reason is for ruling out a serious cause — you're entitled to that explanation.",
      "Ask for that reasoning to be documented: \"I'd like this recorded in my notes.\"",
      "Ask for safety-netting: what specifically should prompt you to come back or go to A&E?",
      "This pattern is well documented in Ireland, not just anecdotal — see 'Why this page exists' above. You are not imagining it.",
    ],
  },
  {
    id: "second-opinion",
    title: "Getting a second opinion",
    tips: [
      "You can ask your GP or consultant directly for a referral for a second opinion — this is a normal, reasonable request.",
      "You can ask for re-referral to a different consultant if a relationship isn't working.",
      "For some conditions there are named national specialist centres (e.g. supra-regional endometriosis care at CUMH and Tallaght) — ask whether your case qualifies for referral to one.",
    ],
  },
  {
    id: "records",
    title: "Accessing your records",
    tips: [
      "For your own records, a GDPR 'Subject Access Request' (SAR) is usually the fastest route: first copy free, response within one calendar month (extendable by two months if complex), no reason required. Apply separately to each provider — GP, hospital, consultant, imaging.",
      "Freedom of Information (FOI) is a separate, narrower route: it applies to records held by public bodies, and matters after death (GDPR rights don't survive death) or for non-personal institutional records (policies, incident reports).",
      "Some medical-card holders' GP records are held by the HSE as custodian — those may route through FOI rather than a SAR. If unsure, ask the provider which applies.",
      "HSE SAR form and guidance: www2.hse.ie/data-protection-and-your-rights/data-protection-requests/",
    ],
  },
  {
    id: "complain",
    title: "Making a formal complaint",
    tips: [
      "Raise it locally first if you can — with the staff member, ward manager, or practice directly. Many things resolve at this stage.",
      "If not resolved, use HSE 'Your Service Your Say' (YSYS) — the formal complaints channel for HSE public services. Generally within 12 months of the event, or of becoming aware of it. Doesn't cover private hospitals or matters already in legal proceedings.",
      "The Patient Advocacy Service (PAS) is free, independent, and confidential — they can walk you through writing and lodging a complaint about a public acute hospital, or after a patient-safety incident. Consider contacting them before you write anything formal.",
      "AIMS Ireland specifically helps with maternity-care complaint letters if your complaint relates to pregnancy or birth care.",
      "Keep a simple log throughout: date, who you spoke to, what was said, what was promised. Invaluable if you need to escalate.",
      "The stated timelines aren't always kept in practice — the Ombudsman's own reports document cases where a response took nearly three years, and another where an investigation hadn't started nine months after acknowledgement. If your complaint is running well past its deadline, that's grounds to chase it in writing, not a sign you're being unreasonable (see the Letter templates tab).",
      "The 12-month deadline to complain is enforced strictly, even in the hardest circumstances — a hospital has refused to deal with a bereaved couple's complaint about their newborn's death because it fell outside that window. If you're unsure whether to complain, don't let time run out while you decide.",
    ],
  },
  {
    id: "open-disclosure",
    title: "If something went wrong — Open Disclosure",
    tips: [
      "Open disclosure is your right to be told, openly and honestly, when something has gone wrong in your care — what happened, why, and what's being done to stop it happening to someone else. It's not the same as a complaint; it's the health service coming to you.",
      "Since 26 September 2024, disclosure of 'notifiable incidents' (a defined list of serious patient-safety events) is a legal requirement under the Patient Safety (Notifiable Incidents and Open Disclosure) Act 2023 — not just good practice. For incidents outside that specific list, open disclosure is still HSE policy, just not legally mandatory in the same way.",
      "You're entitled to an apology or expression of regret as part of this — it isn't an admission of legal liability, and shouldn't be withheld for that reason.",
      "If you believe something went wrong and nobody has raised it with you, you can ask directly: \"Has this been treated as a patient safety incident, and is open disclosure being considered?\" You don't need to wait to be approached.",
      "Open disclosure and a formal complaint aren't mutually exclusive — you can have an open disclosure conversation and still complain through Your Service Your Say if you're unhappy with how things were handled.",
    ],
  },
  {
    id: "advocate",
    title: "Bringing an advocate",
    tips: [
      "You can bring a support person to any appointment, or ask to take notes yourself.",
      "The Patient Advocacy Service can support you directly through a complaint process, not just point you to the right form.",
      "Peer support through a condition-specific charity (see the Support orgs tab) can help you understand what 'normal' process actually looks like for your situation.",
    ],
  },
  {
    id: "scripts",
    title: "What to actually say",
    tips: [
      "Opening: \"Before we start — I've got three things I want to cover, and the most important one is [X]. Can we make sure we get to that one?\"",
      "Asking for a referral: \"What would need to be true for a referral to [specialty] to be appropriate? I want to understand the threshold.\"",
      "If a referral is declined: \"Could I ask you to note in my record that I requested a referral to [specialty] on [date], and the reason it wasn't made? I'd like the reasoning on file.\"",
      "Asking for a second opinion: \"This isn't about my confidence in you — I'd just like another set of eyes on it before I decide. Would you refer me, or should I go back to my GP?\"",
      "When a symptom is being dismissed: \"Can I ask what you've ruled out, and what made you rule it out?\" — asking for the reasoning gets further than disputing the conclusion.",
      "When you're told it's stress, hormones, or your weight: \"I hear you. Can we also check [X], so it's ruled out rather than assumed? I'd rather know.\"",
      "Getting something recorded: \"Would you mind recording that in my notes, in the words I used?\" If refused, you can still write to the service afterwards and ask for a note of your disagreement to be added — a right under GDPR Article 16.",
      "Closing: \"So the plan is [X], and I should hear about [Y] within [timeframe]. Who do I contact if I haven't heard by then, and what's the number? What should bring me back, and what should send me to A&E?\"",
      "If you're bringing someone with you, their job is to remember, not to advocate: \"Sorry — could you say that again? I want to write it down properly\" is the single most useful thing a support person can say.",
    ],
  },
  {
    id: "cdnt-parallel-track",
    title: "Getting early intervention for a child (ROI & NI)",
    tips: [
      "Do these in parallel, not one after another: refer to services, apply for the statutory assessment, and apply for the relevant child disability benefit — don't wait for one to conclude before starting the next.",
      "Republic of Ireland: you don't need a diagnosis or a completed Assessment of Need to refer a child to a CDNT or Primary Care — refer directly via your GP or public health nurse, or as a parent yourself.",
      "Republic of Ireland: the Assessment of Need has a statutory 6-month deadline under the Disability Act 2005. If it's missed, that's grounds for a formal complaint under the Act itself — a separate route from HSE 'Your Service Your Say'.",
      "Northern Ireland: the Child Development Clinic / community paediatrics route is professional-referral only — ask your GP or health visitor to make it, in writing, and keep a copy.",
      "Northern Ireland: the Education Authority's statutory SEN assessment runs on a 26-week timeline with a right of appeal to SENDIST — you can pursue it without waiting on a health diagnosis first.",
      "Seeing a private therapist or assessor does not remove your child from the public waiting list on either side of the border — tell the public team so they can align goals, but you keep your place.",
      "Keep a dated record of every referral, call and letter, and ask each service to confirm your child's position on its waiting list in writing — this is the single most useful habit while you wait.",
    ],
  },
  {
    id: "adult-adhd-autism-diagnosis",
    title: "Adult ADHD & autism diagnosis: what to expect (ROI & NI)",
    tips: [
      "Set expectations early: on both sides of the border, public adult pathways are limited or absent, and most adults who want a timely diagnosis end up paying privately.",
      "A private diagnosis does not guarantee ongoing publicly-funded medication or monitoring — GPs are not obliged to take over prescribing, and are increasingly declining to, citing the medico-legal risk of prescribing controlled medication without secondary-care backup.",
      "Before booking a private ADHD assessment, ask the provider directly what their shared-care success rate is with GPs in your area, and budget for the possibility of ongoing private prescribing costs if no GP will take it on.",
      "In the Republic, the Drug Payment Scheme caps a household's monthly prescription cost at €80 regardless of who is prescribing, and you can claim 20% back on qualifying private assessment/treatment costs via Revenue's Med 1 health expenses relief.",
      "For a private autism assessment, look for a clinician using ADOS-2 who is registered with PSI (Psychological Society of Ireland) or CORU in the Republic; in Northern Ireland, look for RQIA-registered providers and check the RQIA register directly if you're unsure.",
      "Don't assume generic 'NHS ADHD/autism' content found online applies in Northern Ireland — NHS Right to Choose, commonly mentioned in that content, does not apply here.",
      "A diagnosis report from an HSE-recognised or RQIA-registered provider is generally accepted for welfare and education supports, but confirm with the specific scheme before relying on that.",
      "Free support doesn't require a diagnosis while you wait: ADHD Ireland's UMAAP programme and AsIAm/Autism NI/ADD-NI peer support are all open to self-identifying adults, not only those with a formal diagnosis.",
    ],
  },
];

// Escalation ladder: who to contact, in the order the system expects you to try them.
// FOI, hospital by hospital. HSE statutory hospitals route FOI through the HSE's
// central process; independent voluntary hospitals often run their own — and
// quality varies. Verified against each hospital's own site. Last reviewed: Sep 2026.
const HOSPITAL_FOI = [
  {
    id: "cuh",
    name: "Cork University Hospital (CUH)",
    region: "Cork",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "No dedicated hospital FOI officer. The HSE's old central FOI landing page is currently unreachable — the link below goes to the HSE's data protection contact page instead, which is the live route to the same office, though the page itself is branded 'data protection', not 'FOI'.",
    steps: [
      "For your own routine records, a GDPR Subject Access Request is usually the faster route — see 'Accessing your records' in The guide tab.",
      "FOI proper still matters specifically for sensitive/psychiatric records, a child's records, or a deceased person's records. If that's you, state clearly you're applying under the Freedom of Information Act 2014 when you contact this office, since the page won't prompt you to.",
      "No fee for your own personal information either way. Under FOI: acknowledged within 10 working days, response generally within 20 working days.",
    ],
    contact: { web: "www2.hse.ie/data-protection-and-your-rights/" },
  },
  {
    id: "cumh",
    name: "Cork University Maternity Hospital (CUMH)",
    region: "Cork",
    type: "hse",
    typeLabel: "HSE hospital — own FOI mailbox",
    summary: "CUMH's Medical Records Department runs its own FOI mailbox, separate from the central HSE process — confirmed working via direct correspondence.",
    steps: [
      "Email CUMH.FOI@hse.ie directly rather than using the general HSE route.",
      "State clearly that you're making the request under the Freedom of Information Act 2014, and describe the records you want (service, approximate dates).",
      "Under the FOI Act, acknowledgement is due within 10 working days — if a high volume of requests is cited, an extension can push the response out further.",
    ],
    note: "For your own maternity or health records specifically, a GDPR Subject Access Request is usually faster than FOI — see 'Accessing your records' in The guide tab. This mailbox is CUMH-specific — don't reuse it for other hospitals.",
    contact: { email: "CUMH.FOI@hse.ie", address: "Medical Records Department, 1 East Room, Wilton Road, Cork, T12 YEO2" },
  },
  {
    id: "sivuh",
    name: "South Infirmary Victoria University Hospital (SIVUH)",
    region: "Cork",
    type: "voluntary",
    typeLabel: "Voluntary hospital — own process",
    summary: "SIVUH is an independent voluntary hospital with its own dedicated FOI office, separate from the HSE's central process. It publishes its own application form.",
    steps: [
      "Use SIVUH's own 'Application Form for Access to Records', on their site.",
      "Send it to the FOI Office directly (contact below) rather than to the HSE.",
    ],
    contact: { email: "foi.officer@sivuh.ie", address: "Freedom of Information Office, SIVUH, Old Blackrock Road, Cork, T12 X23H", web: "sivuh.ie/Departments/FreedomofInformation/FOIHomepage.html" },
  },
  {
    id: "muh",
    name: "Mercy University Hospital (MUH)",
    region: "Cork",
    type: "voluntary",
    typeLabel: "Voluntary hospital — process unclear",
    summary: "Also an independent voluntary hospital, but its online FOI page is marked 'under construction' (last updated 2014) — we're not going to pretend there's a clean published process when there isn't one.",
    steps: [
      "Phone the hospital directly and ask how they currently want FOI requests submitted.",
      "You can still write a formal request under the FOI Act 2014 and send it to hospital administration if no other route is offered.",
    ],
    contact: { phone: "021 427 1971", address: "Grenville Place, Cork, T12 WE28" },
  },
  {
    id: "nmh",
    name: "National Maternity Hospital, Holles St (NMH)",
    region: "Dublin",
    type: "voluntary",
    typeLabel: "Voluntary hospital — own process",
    summary: "An independent voluntary hospital with a named FOI Officer — one of the clearest published processes of any maternity hospital in the country.",
    steps: [
      "Contact the FOI Officer directly (below) rather than the HSE.",
    ],
    contact: { email: "foi@nmh.ie", phone: "(01) 637 3100, ask for bleep 085", address: "FOI Officer, National Maternity Hospital, Holles St, Dublin 2, D02 YH21" },
  },
  {
    id: "rotunda",
    name: "Rotunda Hospital",
    region: "Dublin",
    type: "voluntary",
    typeLabel: "Voluntary hospital — own process",
    summary: "An independent voluntary hospital with its own FOI section, separate from the HSE's central process.",
    steps: [
      "Requests are handled by post via the Quality and Patient Safety Department (address below).",
    ],
    contact: { address: "Freedom of Information Section, Quality and Patient Safety Department, The Rotunda Hospital, Parnell Square, Dublin 1", web: "rotunda.ie/freedom-of-information/" },
  },
  {
    id: "coombe",
    name: "Coombe Women & Infants University Hospital",
    region: "Dublin",
    type: "hse",
    typeLabel: "HSE hospital group — named contact",
    summary: "Part of the Dublin Midlands Hospital Group. No Coombe-specific FOI officer found, but there is a named group-level FOI decision maker/reviewer.",
    steps: [
      "Contact the Dublin Midlands Hospital Group's FOI contact directly, or call the Coombe's main line and ask to be directed.",
    ],
    contact: { email: "James.conway@hse.ie", phone: "01 408 5200 (hospital main line)" },
  },
  {
    id: "uhg",
    name: "University Hospital Galway / Merlin Park (Saolta)",
    region: "Galway",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the Saolta University Health Care Group. No dedicated hospital FOI officer found. The HSE's central FOI landing page is currently unreachable — the link below goes to its data protection contact page instead, the live route to the same office.",
    steps: [
      "Same as CUH (above): SAR for your own routine records; state you're applying under the FOI Act 2014 if it's a sensitive/psychiatric, a child's, or a deceased person's records.",
    ],
    contact: { phone: "(091) 524 222 (hospital main line)", web: "www2.hse.ie/data-protection-and-your-rights/" },
  },
  {
    id: "uhl",
    name: "University Hospital Limerick / University Maternity Hospital Limerick",
    region: "Limerick",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the UL Hospitals Group. Confirmed: FOI requests for records held by the group are directed to the HSE's central process, not the hospital directly — but that central FOI page is currently unreachable, so the link below goes to the HSE's data protection contact page instead.",
    steps: [
      "Same as CUH (above): SAR for your own routine records; state you're applying under the FOI Act 2014 if it's a sensitive/psychiatric, a child's, or a deceased person's records.",
    ],
    contact: { web: "www2.hse.ie/data-protection-and-your-rights/" },
  },
  {
    id: "portiuncula",
    name: "Portiuncula University Hospital",
    region: "Galway & Midlands",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the Saolta group. No dedicated FOI officer found; there is a named Data Protection Officer for GDPR/SAR requests specifically, which is the faster route for your own records. The HSE's central FOI page is currently unreachable, so the link below goes to its data protection contact page instead.",
    steps: [
      "For FOI proper (sensitive/psychiatric, a child's, or a deceased person's records): state clearly you're applying under the FOI Act 2014 when you contact this office.",
    ],
    note: "For your own routine records, a GDPR Subject Access Request is usually faster — this hospital's DPO contact is ddpo.west@hse.ie.",
    contact: { web: "www2.hse.ie/data-protection-and-your-rights/" },
  },
  {
    id: "portlaoise",
    name: "Midland Regional Hospital, Portlaoise",
    region: "Midlands",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the Dublin Midlands Hospital Group. No dedicated FOI officer found; there is a named Data Protection Officer for GDPR/SAR requests specifically. The HSE's central FOI page is currently unreachable, so the link below goes to its data protection contact page instead.",
    steps: [
      "For FOI proper (sensitive/psychiatric, a child's, or a deceased person's records): state clearly you're applying under the FOI Act 2014 when you contact this office.",
    ],
    note: "For your own routine records, a GDPR Subject Access Request is usually faster — this hospital's DPO contact is ddpo.dmlUH@hse.ie.",
    contact: { web: "www2.hse.ie/data-protection-and-your-rights/" },
  },
  {
    id: "belfast-trust",
    name: "Belfast Health & Social Care Trust",
    region: "Northern Ireland",
    type: "ni",
    typeLabel: "NI Trust — UK FOI Act 2000",
    summary: "Northern Ireland operates under a different legal framework (UK Freedom of Information Act 2000), handled at Trust level, not per-hospital. Covers the Royal Jubilee Maternity Hospital and Belfast-area services.",
    steps: [
      "FOI requests go to the Trust's Public Liaison Team, in writing.",
      "Aim to respond within 20 working days. Requests for your own personal data go via the Data Protection Act instead of FOI.",
    ],
    contact: { address: "Public Liaison, Belfast HSC Trust, 1st Floor, Nore Villa, Knockbracken Healthcare Park, Belfast BT8 8BH" },
  },
  {
    id: "northern-trust",
    name: "Northern Health & Social Care Trust",
    region: "Northern Ireland",
    type: "ni",
    typeLabel: "NI Trust — UK FOI Act 2000",
    summary: "Covers Antrim Area Hospital and the north Antrim/Derry area.",
    steps: [
      "Same UK FOI Act 2000 process as Belfast Trust (above): written request, ~20 working days.",
    ],
    contact: { email: "info.governance@northerntrust.hscni.net", address: "8e Coleraine Road, Ballymoney, Co Antrim, BT53 6BP", phone: "028 2766 1293" },
  },
  {
    id: "southern-trust",
    name: "Southern Health & Social Care Trust",
    region: "Northern Ireland",
    type: "ni",
    typeLabel: "NI Trust — UK FOI Act 2000",
    summary: "Covers Craigavon Area Hospital and the Armagh/Newry/Down area.",
    steps: [
      "Same UK FOI Act 2000 process as Belfast Trust (above).",
    ],
    contact: { phone: "028 3861 3600", web: "southerntrust.hscni.net" },
  },
  {
    id: "south-eastern-trust",
    name: "South Eastern Health & Social Care Trust",
    region: "Northern Ireland",
    type: "ni",
    typeLabel: "NI Trust — UK FOI Act 2000",
    summary: "Covers the Ulster Hospital and the Down/Ards/North Down area.",
    steps: [
      "Submit via the Trust's FOI web form.",
    ],
    contact: { web: "setrust.hscni.net/contact-us/freedom-of-information/", address: "Upper Newtownards Road, Dundonald, Belfast BT16 1RH" },
  },
  {
    id: "western-trust",
    name: "Western Health & Social Care Trust",
    region: "Northern Ireland",
    type: "ni",
    typeLabel: "NI Trust — UK FOI Act 2000",
    summary: "Covers Altnagelvin Hospital and the Derry/Tyrone/Fermanagh area.",
    steps: [
      "Submit via the Trust's FOI web form.",
    ],
    contact: { web: "westerntrust.hscni.net/contact-us/freedom-of-information-request/", address: "Glenshane Road, Derry BT47 6SB" },
  },
];

// Every public acute hospital in the Republic, by Hospital Group, so no
// hospital is missing from this page even where we don't (yet) have an
// individually-verified FOI contact for it. Hospitals with a dedicated,
// individually-verified entry above are marked; for the rest, the general
// rule holds: HSE statutory hospitals route FOI through the same central
// HSE process as CUH (in "Freedom of Information, hospital by hospital"
// above) unless the hospital is independently voluntary, in which case it's
// worth checking whether it runs its own process (as SIVUH and NMH do).
// Source: HSE Hospital Groups. Last reviewed: Sep 2026.
const HOSPITAL_GROUPS = [
  {
    id: "ireland-east",
    name: "Ireland East Hospital Group",
    hospitals: [
      "Mater Misericordiae University Hospital (Dublin)",
      "St Vincent's University Hospital (Dublin)",
      "National Maternity Hospital, Holles St (Dublin) — detailed above",
      "Midland Regional Hospital, Mullingar",
      "St Luke's General Hospital (Carlow-Kilkenny)",
      "Wexford General Hospital",
      "Our Lady's Hospital, Navan",
      "St Columcille's Hospital, Loughlinstown",
      "St Michael's Hospital, Dún Laoghaire",
      "Cappagh National Orthopaedic Hospital (Dublin)",
      "Royal Victoria Eye and Ear Hospital (Dublin)",
      "National Rehabilitation Hospital, Dún Laoghaire",
    ],
  },
  {
    id: "dublin-midlands",
    name: "Dublin Midlands Hospital Group",
    hospitals: [
      "St James's Hospital (Dublin)",
      "Tallaght University Hospital (incl. National Children's Hospital)",
      "Midland Regional Hospital, Tullamore",
      "Naas General Hospital",
      "Midland Regional Hospital, Portlaoise — detailed above",
      "Coombe Women & Infants University Hospital (Dublin) — detailed above",
    ],
  },
  {
    id: "rcsi",
    name: "RCSI Hospital Group",
    hospitals: [
      "Beaumont Hospital (Dublin)",
      "Connolly Hospital (Dublin)",
      "Our Lady of Lourdes Hospital, Drogheda",
      "Louth County Hospital, Dundalk",
      "Cavan General Hospital",
      "Monaghan Hospital",
      "Rotunda Hospital (Dublin) — detailed above",
    ],
  },
  {
    id: "saolta",
    name: "Saolta University Health Care Group",
    hospitals: [
      "University Hospital Galway / Merlin Park — detailed above",
      "Letterkenny University Hospital",
      "Mayo University Hospital",
      "Portiuncula University Hospital — detailed above",
      "Roscommon University Hospital",
      "Sligo University Hospital",
    ],
  },
  {
    id: "ul-hospitals",
    name: "UL Hospitals Group",
    hospitals: [
      "University Hospital Limerick / University Maternity Hospital Limerick — detailed above",
      "Nenagh Hospital",
      "Ennis Hospital",
      "Croom Orthopaedic Hospital",
      "St John's Hospital, Limerick (voluntary)",
    ],
  },
  {
    id: "south-south-west",
    name: "South/South West Hospital Group",
    hospitals: [
      "Cork University Hospital — detailed above",
      "Cork University Maternity Hospital — detailed above",
      "South Infirmary Victoria University Hospital — detailed above",
      "Mercy University Hospital — detailed above",
      "Bantry General Hospital",
      "Mallow General Hospital",
      "Kilcreene Orthopaedic Hospital",
      "Tipperary University Hospital",
      "University Hospital Kerry",
      "University Hospital Waterford",
    ],
  },
];

// Last reviewed: Sep 2026 — phone/email/process details change; verify on the source site.
const RIGHTS_BODIES = [
  {
    id: "ysys",
    step: 1,
    name: "HSE Your Service Your Say (YSYS)",
    role: "First-line formal complaints about HSE public services.",
    detail: "Raise informally with staff first if you can — a manager tries to resolve it within 48 hours. If it goes formal, a complaints officer contacts you within 5 working days if an investigation is needed, and responds within 30 working days (updating you every 20 working days if it takes longer). Generally within 12 months of the event, or of becoming aware of it. Doesn't cover private hospitals, or matters already before a court.",
    contact: { phone: "1800 424 555", email: "yoursay@hse.ie", web: "www2.hse.ie/complaints-feedback/your-service-your-say/" },
  },
  {
    id: "ysys-review",
    step: 2,
    name: "YSYS Stage 3 — internal review",
    role: "Ask for your Stage 2 complaint decision to be reviewed internally, before going external.",
    detail: "A review officer — not the person who handled your original complaint — reviews the Stage 2 findings and recommendations, generally within 20 working days. The letter with your Stage 2 report tells you how to request this. A commonly-used form of words: \"I am unhappy with the response I have received to my complaint and request that the HSE undertake a review of the complaint under Stage 3 of Your Service, Your Say.\"",
    contact: { email: "yoursay@hse.ie" },
  },
  {
    id: "pas",
    step: 3,
    name: "Patient Advocacy Service",
    role: "Free, independent, confidential support making a complaint.",
    detail: "Funded by the Department of Health. Supports complaints about HSE public acute hospitals and HSE-run nursing homes, and support after a patient-safety incident. Can help you write and lodge a complaint at any stage — worth contacting before you write anything formal, not just when you're stuck.",
    contact: { phone: "0818 293 003", web: "patientadvocacyservice.ie" },
  },
  {
    id: "ombudsman",
    step: 4,
    name: "Office of the Ombudsman",
    role: "Independent external review if you're not satisfied with how a public body handled things.",
    detail: "Cannot examine matters of clinical judgement or diagnosis, private care, or employment issues — focus your complaint on how a decision was made, communicated or recorded, not the clinical decision itself. Generally within 12 months of the action or decision, though the Ombudsman may still help beyond that if there's a good reason for the delay. Usually you need to have completed the HSE's process first.",
    contact: { phone: "01 639 5600", web: "ombudsman.ie" },
  },
  {
    id: "oco",
    step: 4,
    name: "Ombudsman for Children",
    role: "Independent external review for complaints about services for children, including hospitals.",
    detail: "Accepts complaints from under-18s directly, and from adults on a child's behalf. You need to give the service a chance to resolve it first, then make a formal complaint to the organisation, before coming to this office.",
    contact: { phone: "1800 20 20 40", web: "oco.ie" },
  },
  {
    id: "medical-council",
    step: 5,
    name: "Medical Council",
    role: "Fitness-to-practise complaints about a registered doctor.",
    detail: "Anyone can make a complaint. Goes through a Preliminary Proceedings Committee, then potentially a Fitness to Practise Committee.",
    contact: { web: "medicalcouncil.ie" },
  },
  {
    id: "nmbi",
    step: 5,
    name: "Nursing & Midwifery Board of Ireland (NMBI)",
    role: "Fitness-to-practise complaints about a nurse or midwife.",
    detail: "Equivalent process to the Medical Council, for nursing and midwifery staff.",
    contact: { web: "nmbi.ie/Complaints" },
  },
  {
    id: "hiqa",
    step: 5,
    name: "HIQA",
    role: "Raise a safety or quality concern about a service.",
    detail: "HIQA sets standards and inspects services but can't investigate an individual complaint directly — raising a concern can still prompt a look at the service.",
    contact: { web: "hiqa.ie/get-touch/report-concern-or-give-feedback" },
  },
  {
    id: "hpra",
    step: 5,
    name: "HPRA",
    role: "Report a problem with a medicine or medical device.",
    detail: "Relevant for adverse reactions to medication, or device complications (e.g. vaginal mesh, contraceptive devices).",
    contact: { web: "hpra.ie" },
  },
];

// Northern Ireland complaints ladder — a genuinely different system, not a
// variant of the Republic's. Trust complaints managers are the first step for
// hospital/community care; NIPSO is the external review and, unlike the
// Republic's Ombudsman, CAN look at care and treatment, not just process.
// Sourced from nidirect and nipso.org.uk. Last reviewed: Sep 2026.
const RIGHTS_BODIES_NI = [
  {
    id: "ni-trust-complaints",
    step: 1,
    name: "Your HSC Trust's complaints manager",
    role: "First step for a hospital or community social care complaint.",
    detail: "Acknowledgement within 2–3 working days. Full response within 20 working days for a hospital or social care complaint (10 working days if you complain directly to a GP, dentist, pharmacist or optician). Usually within 6 months of becoming aware of the issue, and normally no later than 12 months after the event.",
    contact: { web: "nidirect.gov.uk/articles/how-complain-or-raise-concerns-about-health-services" },
  },
  {
    id: "pcc-ni",
    step: 1,
    name: "Patient and Client Council (PCC)",
    role: "Free, independent support making a complaint, similar to the Republic's Patient Advocacy Service.",
    detail: "A freephone support service that can help you raise concerns or make a complaint about any HSC service in Northern Ireland.",
    contact: { phone: "0800 917 0222", email: "info@pcc-ni.net" },
  },
  {
    id: "nipso",
    step: 2,
    name: "Northern Ireland Public Services Ombudsman (NIPSO)",
    role: "Independent external review — broader than the Republic's Ombudsman.",
    detail: "Covers hospitals, care homes, social workers, doctors, dentists and opticians, and CAN look at care and treatment as well as administrative process — unlike the Republic's Ombudsman, which cannot examine clinical judgement. Generally within 6 months of the provider completing its own complaints process.",
    contact: { phone: "0800 34 34 24", web: "nipso.org.uk" },
  },
  {
    id: "rqia",
    step: 2,
    name: "RQIA",
    role: "Raise a safety or quality concern about a regulated service.",
    detail: "RQIA doesn't have legal powers to investigate an individual complaint, but uses concerns raised with it to inform inspections and reviews — similar in role to HIQA in the Republic.",
    contact: { phone: "028 9536 1111", email: "info@rqia.org.uk" },
  },
];

// Letter templates for FOI/SAR requests and formal complaints. These are our
// own drafting, not copies of any official form — always link to the
// official form/portal where one exists (see each template's "useFor"), and
// use these when the official route needs a written letter rather than a form.
// No rates or figures here that go stale; only statutory timelines, which
// change rarely. Last reviewed: Sep 2026.
const LETTER_TEMPLATES = [
  {
    id: "sar-roi",
    title: "Subject Access Request (Republic of Ireland)",
    jurisdiction: "roi",
    useFor: "Your own medical records from any Irish provider — HSE hospital, voluntary hospital, GP, consultant, private clinic, or imaging centre.",
    sendTo: "The provider's Data Protection Officer. For HSE services, use the regional data protection office covering the location of the service.",
    deadline: "One month, extendable by a further two months if complex — they must tell you in writing within the first month if they're extending.",
    enclose: "A copy of government-issued photo ID (passport, driving licence, or public services card).",
    body: `[Your name]
[Your address]
[Your date of birth]
[Your phone / email]

[Date]

The Data Protection Officer
[Hospital / practice / clinic name]
[Address]

RE: SUBJECT ACCESS REQUEST UNDER ARTICLE 15 GDPR

Dear Data Protection Officer,

I am making a subject access request under Article 15 of the General Data
Protection Regulation and the Data Protection Act 2018 for a copy of the
personal data you hold about me.

MY DETAILS
Full name:              [name, and any previous names you were treated under]
Date of birth:          [DOB]
Address:                [current address]
Hospital / patient no.: [if known]

WHAT I AM REQUESTING
I am requesting a complete copy of my records, including but not limited to:

  - all medical and nursing notes
  - GP and consultant correspondence, referral letters and referral responses
  - discharge summaries and clinic letters
  - results of all tests, including laboratory and pathology results
  - imaging reports (and, where held, the images themselves)
  - operation notes, anaesthetic records and consent forms
  - medication and prescribing records
  - appointment records, including any cancelled or missed appointments
  - any record of complaints, incidents or concerns relating to my care

Period covered:  [e.g. 1 January 2019 to the present / all records held]
Service(s):      [e.g. Gynaecology outpatients; Emergency Department;
                  Maternity — specify departments and approximate dates]
Location(s):     [e.g. Cork University Maternity Hospital]

FORMAT
I would like to receive this [electronically, as PDF, by secure email to the
address above / in hard copy by post].

IDENTIFICATION
I enclose a copy of [passport / driving licence / public services card] as
proof of identity.

TIMELINE
I understand you must respond without undue delay and in any event within one
month of receipt. If you consider the request complex and intend to extend
that period by up to two further months, please tell me in writing within the
first month, with your reasons.

If you intend to withhold any part of my records, please tell me which parts,
the specific legal basis for withholding them, and confirm you have released
everything that can be released.

Please acknowledge receipt of this request.

Yours faithfully,

[Signature]
[Printed name]`,
  },
  {
    id: "foi-roi",
    title: "FOI request (Republic of Ireland)",
    jurisdiction: "roi",
    useFor: "Non-personal records held by an FOI body (policies, protocols, waiting-list statistics), a deceased relative's records, or — if you have a medical card — GP records the HSE holds as custodian. Not for your own records from a private hospital or private GP visit (use the SAR template instead).",
    sendTo: "The FOI officer of the body that holds the records. Check the hospital's own FOI contact first — some voluntary hospitals run their own FOI office rather than routing through the HSE's central process.",
    deadline: "Acknowledged within 10 working days; decision normally within 20 working days.",
    enclose: "Proof of identity for personal records; for a deceased person's records, evidence of your relationship (e.g. grant of probate) plus your own ID.",
    body: `[Your name]
[Your address]
[Your phone / email]

[Date]

The Freedom of Information Officer
[Body name]
[Address]

RE: REQUEST UNDER THE FREEDOM OF INFORMATION ACT 2014

Dear FOI Officer,

I am making a request under the Freedom of Information Act 2014 for the
following records.

RECORDS REQUESTED
[Be as specific as you can. Name the service, the location, the date range,
and the type of document. Examples:]

  1. The current [department name] policy or standard operating procedure on
     [subject], as in force on [date].

  2. Any protocol, pathway or referral-prioritisation criteria used by
     [service] for [condition], covering [date range].

  3. Aggregated, anonymised waiting-list figures for [service] at
     [location] for the period [date range], excluding any personal
     information.

TIME PERIOD:  [date range]
FORMAT:       I would prefer to receive these records electronically by email
              to the address above.

BASIS OF REQUEST
[Choose the paragraph that applies and delete the others:]

  [ ] Personal records: These records contain my own personal information.
      I understand no fee applies to a request for personal records. I enclose
      a copy of [ID document] as proof of identity.

  [ ] Records of a deceased person: I am seeking the records of [name],
      date of birth [DOB], who died on [date]. I am their [personal
      representative administering the estate / spouse / next of kin /
      other — specify]. I enclose [death certificate / grant of probate /
      evidence of relationship] and a copy of my own photo ID.

  [ ] Non-personal records: I understand there is no fee for the initial
      request. If search, retrieval and copying charges are likely to apply,
      please tell me the estimated cost before you begin work.

ASSISTANCE
If any part of this request is unclear, please contact me rather than
refusing it — I am happy to narrow or reword it.

I understand you must acknowledge this request within 10 working days and
issue a decision within 20 working days.

Yours faithfully,

[Signature]
[Printed name]`,
  },
  {
    id: "foi-internal-review-roi",
    title: "FOI internal review request (Republic of Ireland)",
    jurisdiction: "roi",
    useFor: "An FOI request that was refused in whole or in part, or that got no response at all.",
    sendTo: "The FOI officer of the body you originally applied to.",
    deadline: "Within 3 weeks of the decision, or after 4 weeks from your original request if you got no response. Fee: free for personal records, €30 for non-personal (€10 with a medical card).",
    body: `[Your name and address]
[Date]

The FOI Officer
[Body name]
[Address]

RE: REQUEST FOR INTERNAL REVIEW — FOI reference [ref number]

Dear FOI Officer,

I refer to my FOI request of [date] (your reference [ref]) and to your
decision of [date].

I am requesting an internal review of that decision under section 21 of the
Freedom of Information Act 2014.

[Choose and adapt:]

  [ ] No response received. I made my request on [date]. More than four weeks
      have passed and I have received no decision. I am therefore seeking an
      internal review on the basis of a deemed refusal.

  [ ] Records refused. The decision refused [all / part] of my request,
      relying on section [X]. I am asking that this be reviewed because:
      [set out your reasons].

  [ ] Records incomplete. The records released do not include [describe what
      is missing and why you believe it exists]. Please confirm whether these
      records exist and, if so, release them or state the exemption relied on.

[If a fee applies:]
I enclose the internal review fee of €[30 / 10]. [I hold a medical card,
number ___, and am applying the reduced fee.]

I understand the review will be carried out by a member of staff more senior
than the original decision-maker, and that I may apply to the Office of the
Information Commissioner if I remain dissatisfied.

Yours faithfully,
[Signature]
[Printed name]`,
  },
  {
    id: "records-ni",
    title: "Access to health records (Northern Ireland)",
    jurisdiction: "ni",
    useFor: "Your own health or social care records from an HSC Trust, GP surgery, or NI Ambulance Service.",
    sendTo: "The hospital's records manager, or the Trust's data protection officer. GP records go to your surgery. Check whether the Trust publishes its own application form first — many do.",
    deadline: "One calendar month, extendable by up to two further months if complex.",
    enclose: "A copy of photographic ID.",
    body: `[Your name]
[Your address]
[Your date of birth]
[Your phone / email]
[H&C number, if known]

[Date]

The Data Protection Officer / Health Records Manager
[Trust or GP practice name]
[Address]

RE: SUBJECT ACCESS REQUEST — UK GDPR AND DATA PROTECTION ACT 2018

Dear Sir or Madam,

I am making a subject access request under the UK GDPR and the Data
Protection Act 2018 for a copy of the health and social care records you hold
about me.

MY DETAILS
Full name:            [name, and any previous names]
Date of birth:        [DOB]
Current address:      [address]
H&C number:           [if known]
GP practice:          [name and address]

RECORDS REQUESTED
I am requesting a complete copy of my records, including:

  - medical and nursing notes
  - correspondence between my GP and the Trust, including referral letters
    and referral outcomes
  - clinic letters and discharge summaries
  - test and laboratory results
  - imaging reports
  - operation, anaesthetic and consent records
  - medication records
  - appointment and waiting-list records
  - any record of complaints or incidents relating to my care

Period:      [date range, or "all records held"]
Service(s):  [department / specialty and approximate dates]
Location(s): [hospital or facility]

FORMAT
I would like these [electronically as PDF / in hard copy].

IDENTIFICATION
I enclose a copy of my [passport / driving licence] as proof of identity.

TIMELINE
I understand you have one calendar month to respond, extendable by up to two
further months if the request is complex, in which case you will tell me
within the first month.

If any part of my records is withheld, please tell me which parts and the
basis on which they are withheld.

Yours faithfully,
[Signature]
[Printed name]

---
If refused, delayed past the deadline, or your records are released
incomplete, you can complain to the Information Commissioner's Office
(ico.org.uk).`,
  },
  {
    id: "complaint-ysys-roi",
    title: "Formal complaint (HSE Your Service Your Say)",
    jurisdiction: "roi",
    useFor: "A formal complaint about an HSE public service, or a service provided on the HSE's behalf.",
    sendTo: "yoursay@hse.ie, or the complaints officer for the service.",
    deadline: "Generally within 12 months of the event, or of becoming aware of it. Before sending it, consider contacting the Patient Advocacy Service (0818 293 003) — free, independent, and they can help you write it.",
    body: `[Your name]
[Your address]
[Your date of birth]
[Your phone / email]
[Hospital or patient number, if known]

[Date]

The Complaints Officer
[Service / hospital name]
[Address]

  or: yoursay@hse.ie

RE: FORMAL COMPLAINT UNDER YOUR SERVICE YOUR SAY

Dear Complaints Officer,

I am making a formal complaint under the HSE's Your Service Your Say
procedure about my experience of [service] at [location].

1. WHO AND WHERE
Service:      [department / ward / clinic]
Location:     [hospital or centre]
Date(s):      [dates of the events complained about]
Staff:        [names or roles, if known]

2. WHAT HAPPENED
[Set this out in date order. Keep it factual. One event per paragraph.]

  On [date], I attended [service] because [reason]. [What happened.]
  On [date], [next event].

3. WHAT MY CONCERNS ARE
[Focus on process and administration — how decisions were made,
communicated, recorded, or followed up. For example:]

  a. [e.g. My symptoms as I described them were not recorded in my notes.]
  b. [e.g. I was told a referral had been made on [date]. It was not made
     until [date], and I was not told of the delay.]
  c. [e.g. No safety-netting advice was given about what should prompt me
     to return.]

4. THE EFFECT ON ME
[Practical, medical, financial — whatever is true. Keep it short.]

5. WHAT I HAVE ALREADY DONE
[e.g. On [date] I raised this with the ward manager. On [date] I phoned
[number] and spoke to [name]. I have received no response.]

6. WHAT I WOULD LIKE TO HAPPEN
[Be concrete. Reasonable asks a complaints officer can actually action:]

  - a written explanation of [specific point]
  - a correction or addition to my records to reflect [what]
  - confirmation of what has changed in the service as a result
  - a meeting with [role]
  - an apology

7. DOCUMENTS ENCLOSED
[e.g. copy of appointment letter dated __; copy of correspondence.]

I understand a complaints officer will contact me within 5 working days if
an investigation is required, and that I should receive a response within
30 working days, or be told if more time is needed.

Please acknowledge receipt of this complaint in writing.

Yours faithfully,

[Signature]
[Printed name]

---
Keep a log from day one: date, who you spoke to, what was said, what was
promised, what happened next. It's the single most useful thing you can do
if you need to escalate.`,
  },
  {
    id: "complaint-overdue-roi",
    title: "Chasing an overdue complaint (Republic of Ireland)",
    jurisdiction: "roi",
    useFor: "Your Your Service Your Say complaint has gone past its stated deadline (30 working days for a Stage 2 investigation, or 20 working days if it said it needed more time) with no update. This happens more often than the official timelines suggest — the Ombudsman's own reports document waits of many months, occasionally years — so chasing it in writing is a normal, reasonable step, not an overreaction.",
    sendTo: "The complaints officer handling your complaint, or yoursay@hse.ie if you don't have a direct contact.",
    deadline: "No fixed deadline for sending this — send it as soon as the stated timeline has passed.",
    body: `[Your name]
[Your address]
[Your phone / email]

[Date]

The Complaints Officer
[Service / hospital name]
[Address]

  or: yoursay@hse.ie

RE: FOLLOW-UP ON COMPLAINT [reference, if known] — OVERDUE RESPONSE

Dear Complaints Officer,

I am following up on my formal complaint made under Your Service Your Say
on [date] [, reference number ___ if given].

I understand that a complaints officer should contact me within 5 working
days if an investigation is required, and that I should receive a response
within 30 working days — or be told if more time is needed, with an update
at least every 20 working days.

As of today, [X] working days have passed since I made my complaint, and I
have not received [an acknowledgement / an update / a response] in that
time.

Could you please:

  1. Confirm whether my complaint is being investigated, and by whom.
  2. Give me a current expected timeline for a response.
  3. If there has been a delay, explain briefly why, so I understand where
     things stand.

I am not looking to cause difficulty — I understand services are stretched
— but I would appreciate an update, and I'd like this chase noted on my
complaint file.

Yours faithfully,

[Signature]
[Printed name]

---
If you've sent this and still hear nothing after a further reasonable
period, that's a legitimate basis to go to the Patient Advocacy Service
(0818 293 003) for help escalating, or straight to the Ombudsman if you
believe the HSE's own process has stalled entirely.`,
  },
  {
    id: "ombudsman-escalation-roi",
    title: "Escalation to the Ombudsman (Republic of Ireland)",
    jurisdiction: "roi",
    useFor: "Escalating after you've completed the HSE's Your Service Your Say process (including a Stage 3 internal review) and remain unsatisfied.",
    sendTo: "Office of the Ombudsman, 6 Earlsfort Terrace, Dublin 2, D02 W773.",
    deadline: "Generally within 12 months of the action or decision.",
    body: `[Your name and address]
[Date]

Office of the Ombudsman
6 Earlsfort Terrace, Dublin 2, D02 W773

RE: COMPLAINT ABOUT [HSE / service provider name]
    HSE complaint reference: [ref]

Dear Sir or Madam,

I am bringing a complaint to your office about [body name] having completed
the HSE's Your Service Your Say process.

WHAT HAPPENED
[Two or three short paragraphs. Same facts as your original complaint.]

WHAT I COMPLAINED ABOUT AND WHEN
I made a formal complaint on [date] (reference [ref]).
I received a Stage 2 report on [date].
I requested a Stage 3 internal review on [date] and received the outcome on
[date]. [or: I did not receive a response within the stated timeframe.]

WHY I AM NOT SATISFIED
[Be specific. Focus on administrative practice, not clinical judgment. For
example: the investigation did not address point [X] of my complaint; the
findings were not supported by the records; a recommendation was made but no
evidence has been provided that it was implemented.]

I understand your office cannot examine clinical judgment. My complaint
concerns [how the decision was made / how it was communicated / how it was
recorded / whether the process was followed], not the clinical decision
itself.

WHAT I AM LOOKING FOR
[e.g. a finding on whether the process was properly followed; a
recommendation that my record be corrected; an explanation.]

ENCLOSED
  - copy of my original complaint dated [date]
  - copy of the Stage 2 report dated [date]
  - copy of the Stage 3 internal review outcome dated [date]

Yours faithfully,
[Signature]
[Printed name]

---
For Northern Ireland, the equivalent letter goes to NIPSO, Progressive
House, 33 Wellington Place, Belfast BT1 6HN, within 6 months of the provider
completing its own process. NIPSO CAN look at care and treatment, so drop
the "clinical judgment" paragraph above for an NI complaint.`,
  },
];

// Entitlements & schemes — deliberately link-out only, no rates or thresholds
// transcribed here. Figures change annually (usually in the Budget) and an
// official page can't go stale the way a copied number can. Verified live
// (some via a browser-UA curl check, since citizensinformation.ie blocks
// default bot user agents but serves real browsers fine). Last reviewed: Sep 2026.
const SCHEME_LINKS = [
  {
    id: "medical-card",
    name: "Medical Card",
    jurisdiction: "roi",
    blurb: "Free GP visits, prescribed medicines, and public hospital care if you qualify — means-tested under 70, or automatic in some circumstances.",
    prep: [
      "The single biggest cause of delay is an incomplete application — have everything below ready before you start, not gathered as you go.",
      "PPS number for everyone the card would cover.",
      "Proof of income for the means test (payslips, social welfare statement, or accounts if self-employed) — for everyone in the household being assessed, not just you.",
      "Proof of any allowable expenses you want counted (rent or mortgage statements, childcare costs, nursing home/home care costs) — these raise your effective income limit, so it's worth including them rather than leaving money on the table.",
      "Proof of address and, if relevant, evidence you intend to live in Ireland for at least a year.",
      "If applying on medical/hardship grounds above the income limit, ask your GP or consultant for a supporting letter detailing your condition and its costs before you submit — this goes to a medical officer for a discretionary decision.",
    ],
    links: [
      { label: "How it works & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/medical-card/" },
      { label: "Apply online", url: "https://www.mymedicalcard.ie/" },
    ],
  },
  {
    id: "gp-visit-card",
    name: "GP Visit Card",
    jurisdiction: "roi",
    blurb: "Free GP visits (not hospital charges or medicines) if you don't qualify for a full medical card. No means test if you're under 8, over 70, or on Carer's Benefit/Allowance.",
    links: [
      { label: "How it works & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/gp-visit-cards/" },
    ],
  },
  {
    id: "dps",
    name: "Drugs Payment Scheme",
    jurisdiction: "roi",
    blurb: "Caps what you and your family pay for approved prescribed drugs and medicines per month. Also the route to free HRT — you need DPS registration first.",
    links: [
      { label: "How it works & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/health/drugs-and-medicines/drugs-payment-scheme/" },
      { label: "Apply online", url: "https://www.mydps.ie/" },
    ],
  },
  {
    id: "lti",
    name: "Long-Term Illness Scheme",
    jurisdiction: "roi",
    blurb: "Free drugs, medicines and appliances for treating one of a fixed list of long-term conditions — no means test. The list is narrow and hasn't changed in decades, so check it covers your condition before assuming it applies.",
    links: [
      { label: "Full condition list & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/health/drugs-and-medicines/long-term-illness-scheme/" },
    ],
  },
  {
    id: "fair-deal",
    name: "Fair Deal (Nursing Homes Support Scheme)",
    jurisdiction: "roi",
    blurb: "Financial support for long-term nursing home care — you contribute a share of your income and assets, the State pays the rest. A four-step process: application, care needs assessment, financial assessment, optional Nursing Home Loan.",
    prep: [
      "Be ready for the form itself: the official NHSS1 application runs to around 34 pages, with roughly a dozen pages of explanatory notes before you even reach the applicant's name — widely reported as one of the most daunting forms in the Irish health system. Read it once through before filling anything in, rather than starting cold.",
      "It covers the care needs assessment and the financial assessment together, so gather both sets of information before you start: medical/functional information for the care needs side, and income/asset documents (bank and investment statements, property valuations, PPS numbers) for the financial side.",
      "Decide in advance who the 'specified person' applying on the applicant's behalf will be, if the applicant can't apply themselves — there's a strict priority order (a court-appointed decision-making representative or enduring power of attorney first, then spouse/partner, then an adult child). Sort this out before you start, not partway through.",
      "Decide whether you'll want the Nursing Home Loan (deferring the asset-based contribution until after death) — you don't have to decide immediately, but knowing your preference in advance speeds up that section.",
      "Families typically have about three months before a nursing home placement becomes urgent, which is roughly how long the full process can take start to finish — so begin as early as you realistically can rather than waiting for a crisis point.",
      "If more than one family member needs to be involved (siblings, joint decision-making), start those conversations before the form, not during it — disagreement mid-application is one of the most common causes of delay reported by families.",
    ],
    links: [
      { label: "How it works & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/health/health-services/health-services-for-older-people/nursing-homes-support-scheme-1/" },
      { label: "HSE application process", url: "https://www2.hse.ie/services/schemes-allowances/fair-deal-scheme/" },
    ],
  },
  {
    id: "maternity-benefit",
    name: "Maternity Benefit",
    jurisdiction: "roi",
    blurb: "A weekly payment during maternity leave if you have enough PRSI contributions, paid by the Department of Social Protection — separate from any employer maternity pay.",
    links: [
      { label: "Eligibility, rate & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/social-welfare/families-and-children/maternity-benefit/" },
      { label: "Apply online", url: "https://www.mywelfare.ie" },
    ],
  },
  {
    id: "treatment-benefit",
    name: "Treatment Benefit Scheme",
    jurisdiction: "roi",
    blurb: "Contributions towards dental, optical and hearing-aid costs (and a hairpiece/wig grant for medical hair loss) for insured workers, the self-employed, and some retired people. Apply through your provider, not directly.",
    links: [
      { label: "What's covered & PRSI conditions — Citizens Information", url: "https://www.citizensinformation.ie/en/social-welfare/disability-and-illness/treatment-benefit-scheme/" },
    ],
  },
  {
    id: "ntpf",
    name: "NTPF & waiting list rights",
    jurisdiction: "roi",
    blurb: "If you've been waiting longer than the public target time for an outpatient appointment, procedure, or diagnostic scan, you may be able to get National Treatment Purchase Fund (NTPF) funding for treatment elsewhere — often at a private facility, at no cost to you. Target times and funding rounds change, so check current figures on the NTPF's own site rather than relying on a number here.",
    prep: [
      "Ask your GP or hospital consultant directly whether you're eligible for NTPF referral — a referral from them is usually how this actually gets triggered, rather than applying yourself first.",
      "Have your hospital chart number and the date you were added to the waiting list ready when you ask.",
    ],
    links: [
      { label: "Current waiting-list figures & how NTPF funding works — ntpf.ie", url: "https://ntpf.ie" },
    ],
  },
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
      { label: "How it works & how to claim — Citizens Information", url: "https://www.citizensinformation.ie/en/health/eu-healthcare/cross-border-directive/" },
    ],
  },
  {
    id: "treatment-abroad-scheme",
    name: "Treatment Abroad Scheme (TAS)",
    jurisdiction: "roi",
    blurb: "For treatment that isn't available in Ireland at all — your consultant applies to the HSE for prior approval, and if approved the HSE pays the overseas provider directly rather than you claiming money back. A narrower, slower-moving scheme than the Cross-Border Directive, for a smaller set of situations.",
    prep: [
      "This starts with your consultant, not you directly — ask them whether your treatment qualifies and whether they'll make the E112/S2 application on your behalf.",
    ],
    links: [
      { label: "How it works & how to apply — HSE", url: "https://www2.hse.ie/services/schemes-allowances/treatment-abroad-scheme/" },
    ],
  },
  {
    id: "gms-gp-registration",
    name: "Registering with, or changing, a GP",
    jurisdiction: "roi",
    blurb: "If your local GP practices are closed to new patients, the HSE's list of GPs participating in the GMS scheme is the place to start — and there's a formal process for changing GP if the one you're with isn't working out, not just walking into a new practice.",
    prep: [
      "If every practice near you says it's full, ask your Medical Card / GP Visit Card local health office (not the GP practice) for help placing you — this is a recognised gap, not something you have to solve alone.",
    ],
    links: [
      { label: "Find a GP in Ireland — HSE", url: "https://www2.hse.ie/services/find-a-gp/" },
    ],
  },
  {
    id: "domiciliary-care-allowance",
    name: "Domiciliary Care Allowance (DCA)",
    jurisdiction: "roi",
    blurb: "A monthly payment for a child under 16 who needs substantially more care and attention than a child of the same age without their disability — based on the level of care needed, not on a specific diagnosis, and not means-tested.",
    prep: [
      "Ask your GP, consultant or CDNT team for supporting medical evidence before you apply — the application is assessed on the care needs it describes.",
    ],
    links: [
      { label: "How it works & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/social-welfare/disability-and-illness/domiciliary-care-allowance/" },
    ],
  },
  {
    id: "aim-preschool",
    name: "Access and Inclusion Model (AIM)",
    jurisdiction: "roi",
    blurb: "Supports for a child with a disability to take part in the free preschool (ECCE) programme, from minor adjustments up to additional one-to-one support — no diagnosis required. Applied for jointly by the parent and the preschool provider.",
    links: [
      { label: "How it works & how to apply — Access and Inclusion Model", url: "https://aim.gov.ie" },
    ],
  },
  {
    id: "ni-health-costs",
    name: "Help with health costs (dental, optical, travel)",
    jurisdiction: "ni",
    blurb: "NHS prescriptions are free for everyone in Northern Ireland — no scheme needed. Help with dental, optical and travel costs depends on your circumstances; apply with form HC1 if you're not automatically covered.",
    links: [
      { label: "Who qualifies & how to claim — nidirect", url: "https://www.nidirect.gov.uk/articles/help-health-costs" },
    ],
  },
  {
    id: "dla-children",
    name: "Disability Living Allowance for children (DLA)",
    jurisdiction: "ni",
    blurb: "A not-means-tested benefit for a child under 16 with care needs and/or mobility difficulties well beyond what's normal for their age, made up of a care component and a mobility component. Apply via the DLA1 child form through the Department for Communities' Disability and Carers Service.",
    links: [
      { label: "How it works & how to apply — nidirect", url: "https://www.nidirect.gov.uk/articles/disability-living-allowance-children" },
    ],
  },
  {
    id: "ni-care-home-fees",
    name: "Paying for care home fees",
    jurisdiction: "ni",
    blurb: "Your HSC Trust assesses your needs and finances to work out what you contribute towards residential or nursing home care.",
    links: [
      { label: "How the assessment works — nidirect", url: "https://www.nidirect.gov.uk/articles/paying-your-residential-care-or-nursing-home-fees" },
    ],
  },
  {
    id: "disability-allowance",
    name: "Disability Allowance",
    jurisdiction: "roi",
    blurb: "A means-tested weekly payment (roughly €244/week) for people aged 16–66 with an injury, disease or disability expected to last at least a year, assessed on substantial restriction to work suitable for your age and experience — not on diagnosis alone.",
    prep: [
      "Ask your GP or specialist to complete the medical report section with your functional restrictions clearly described, not just your diagnosis — that's what's actually assessed.",
    ],
    links: [
      { label: "Eligibility & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/social-welfare/disability-and-illness/disability-allowance/" },
    ],
  },
  {
    id: "pip-ni",
    name: "Personal Independence Payment (PIP)",
    jurisdiction: "ni",
    blurb: "A non-means-tested benefit for people aged 16 to State Pension age with a long-term health condition or disability, made up of a daily living component and a mobility component. Assessed on functional impact, not diagnosis — a diagnosis strengthens a claim but isn't strictly required.",
    links: [
      { label: "How it works & how to apply — nidirect", url: "https://www.nidirect.gov.uk/articles/personal-independence-payment" },
    ],
  },
  {
    id: "work-and-access",
    name: "Work and Access",
    jurisdiction: "roi",
    blurb: "Seven Department of Social Protection supports helping a person with a disability or long-term health condition get, or stay in, a job — workplace needs assessments, equipment, and workplace adaptation grants. Replaced the Reasonable Accommodation Fund and Disability Awareness Support Scheme in July 2024. Doesn't cover the cost of getting a diagnosis or treatment.",
    links: [
      { label: "What's included & how to apply — Citizens Information", url: "https://www.citizensinformation.ie/en/employment/employment-and-disability/work-and-access-programme/" },
      { label: "gov.ie service page", url: "https://www.gov.ie/en/service/47db8-work-and-access-supports/" },
    ],
  },
  {
    id: "employability-service",
    name: "EmployAbility Service",
    jurisdiction: "roi",
    blurb: "A supported employment service helping people with a disability, injury or illness find and keep a job, including a job coach who works with both you and the employer. Access is via referral from your local Intreo office.",
    links: [
      { label: "How it works — Citizens Information", url: "https://www.citizensinformation.ie/en/employment/employment-and-disability/supported-employment-for-people-with-disabilities/" },
      { label: "Find your local service — employabilityireland.ie", url: "https://employabilityireland.ie/" },
    ],
  },
  {
    id: "access-to-work-ni",
    name: "Access to Work (NI)",
    jurisdiction: "ni",
    blurb: "Practical, tailored help for a disability or health condition that affects your work — equipment, workplace adaptations, or a support worker. For people aged 16+ in paid employment (or about to start), including self-employed.",
    links: [
      { label: "Employment support schemes — nidirect", url: "https://www.nidirect.gov.uk/information-and-services/employment-support-people-disabilities-or-health-conditions/work-schemes" },
    ],
  },
  {
    id: "workable-ni",
    name: "Workable (NI)",
    jurisdiction: "ni",
    blurb: "Ongoing, person-centred support to secure and stay in paid work where your disability creates substantial barriers to employment — delivered by Disability Action, Supported Employment Solutions, and Ulster Supported Employment & Learning, funded by the Department for Communities.",
    links: [
      { label: "How it works — nidirect", url: "https://www.nidirect.gov.uk/articles/workable-ni" },
    ],
  },
];

// Advocacy and condition-specific support organisations. These are searchable
// alongside the main directory. Last reviewed: Sep 2026.
const SUPPORT_ORGS = [
  {
    id: "pas-org",
    name: "Patient Advocacy Service",
    remit: "Free, independent, confidential support with HSE complaints.",
    offer: "Step-by-step help making a complaint about a public acute hospital, or after a patient-safety incident.",
    tags: ["complaints", "all conditions"],
    contact: { web: "patientadvocacyservice.ie" },
  },
  {
    id: "aims-ireland",
    name: "AIMS Ireland",
    remit: "Consumer-led maternity services advocacy, running since 2007.",
    offer: "Explicitly helps write complaint letters and understand how to complain about maternity care.",
    tags: ["maternity", "complaints"],
    contact: { web: "aimsireland.ie", email: "support@aimsireland.com" },
  },
  {
    id: "nwc",
    name: "National Women's Council",
    remit: "Ireland's leading national women's membership body.",
    offer: "Policy and campaigns on health inequality — not individual case support.",
    tags: ["policy"],
    contact: { web: "nwci.ie" },
  },
  {
    id: "221plus",
    name: "221+ CervicalCheck Patient Support Group",
    remit: "Supports women and families affected by CervicalCheck failures.",
    offer: "Information, advice, and peer support.",
    tags: ["cervical screening"],
    contact: { web: "221plus.ie" },
  },
  {
    id: "endo-assoc",
    name: "Endometriosis Association of Ireland",
    remit: "Information and peer support for endometriosis, since 1987.",
    offer: "Volunteer-run info line and peer support.",
    tags: ["endometriosis", "gynaecology"],
    contact: { web: "endometriosis.ie", email: "info@endometriosis.ie" },
  },
  {
    id: "bodywhys",
    name: "Bodywhys",
    remit: "The Eating Disorders Association of Ireland.",
    offer: "Helpline, online support groups, and a family support programme (PiLaR).",
    tags: ["eating disorders", "mental health"],
    contact: { web: "bodywhys.ie", phone: "01 210 7906" },
  },
  {
    id: "miscarriage-assoc",
    name: "Miscarriage Association of Ireland",
    remit: "Support after miscarriage.",
    offer: "Helpline, Mon–Fri.",
    tags: ["pregnancy loss"],
    contact: { web: "miscarriage.ie" },
  },
  {
    id: "feileacain",
    name: "Féileacáin",
    remit: "Support after stillbirth and neonatal death.",
    offer: "Peer support and bereavement resources.",
    tags: ["pregnancy loss", "bereavement"],
    contact: { web: "feileacain.ie" },
  },
  {
    id: "a-little-lifetime",
    name: "A Little Lifetime Foundation",
    remit: "Support for pregnancy and baby loss (formerly ISANDS).",
    offer: "Peer support and information.",
    tags: ["pregnancy loss", "bereavement"],
    contact: { web: "alittlelifetime.ie" },
  },
  {
    id: "irish-cancer-society",
    name: "Irish Cancer Society",
    remit: "National cancer charity.",
    offer: "Support Line staffed by cancer nurses.",
    tags: ["cancer"],
    contact: { web: "cancer.ie", phone: "1800 200 700", email: "supportline@irishcancer.ie" },
  },
  {
    id: "marie-keating",
    name: "Marie Keating Foundation",
    remit: "Cancer awareness and support, incl. mobile information units.",
    offer: "Metastatic breast cancer support, BRCA peer support.",
    tags: ["cancer"],
    contact: { web: "mariekeating.ie", phone: "01 628 3726" },
  },
  {
    id: "mesh-survivors",
    name: "Mesh Survivors Ireland",
    remit: "Peer support and advocacy for women affected by vaginal mesh complications.",
    offer: "Peer support network.",
    tags: ["mesh", "urology", "gynaecology"],
    contact: {},
  },
  {
    id: "safe-ireland",
    name: "SAFE Ireland",
    remit: "National network of 37 independent domestic violence services.",
    offer: "Phone them and they'll connect you to the service nearest you; also runs policy/advocacy work on gender-based violence.",
    tags: ["domestic violence", "policy"],
    contact: { web: "safeireland.ie", phone: "01 578 3001" },
  },
  {
    id: "ms-ireland",
    name: "MS Ireland",
    remit: "National charity for multiple sclerosis, which is roughly 3x more common in women.",
    offer: "Information line staffed Mon–Fri, counselling, and local support groups.",
    tags: ["multiple sclerosis", "neurology"],
    contact: { web: "ms-society.ie", phone: "0818 233 233", email: "info@ms-society.ie" },
  },
  {
    id: "coeliac-society-ireland",
    name: "Coeliac Society of Ireland",
    remit: "National charity for coeliac disease, an autoimmune condition more common in women.",
    offer: "Helpline, gluten-free food guidance, and local branch support.",
    tags: ["coeliac disease", "gastroenterology"],
    contact: { web: "coeliac.ie", phone: "01 872 1471", email: "info@coeliac.ie" },
  },
  {
    id: "enable-ireland",
    name: "Enable Ireland",
    remit: "National disability charity and one of the largest lead agencies running Children's Disability Network Teams.",
    offer: "Direct CDNT services in the areas it leads, plus family/parent information and support beyond direct service delivery.",
    tags: ["disability", "children", "CDNT"],
    contact: { web: "enableireland.ie" },
  },
  {
    id: "down-syndrome-ireland",
    name: "Down Syndrome Ireland",
    remit: "National charity for people with Down syndrome and their families, with 25 local branches.",
    offer: "Early intervention and therapy support, education guidance, and adult services, alongside (not instead of) CDNT/HSE services.",
    tags: ["disability", "down syndrome", "children"],
    contact: { web: "downsyndrome.ie" },
  },
  {
    id: "dessa",
    name: "DESSA",
    remit: "Runs the Empowering Parents Programme, helping parents advocate for their child's education and health supports.",
    offer: "Parent training and peer support focused specifically on navigating the system, not direct therapy.",
    tags: ["disability", "advocacy", "children"],
    contact: { web: "dessa.ie" },
  },
  {
    id: "autism-ni",
    name: "Autism NI",
    remit: "Northern Ireland's autism charity.",
    offer: "Helpline, family support and Autism Resource Officers, plus an early-intervention service for families of autistic children and young people (Northern, Western and Belfast Trust areas).",
    tags: ["autism", "neurodiversity", "Northern Ireland"],
    contact: { web: "autismni.org" },
  },
  {
    id: "cedar-foundation",
    name: "Cedar Foundation",
    remit: "Disability, autism and brain-injury services across Northern Ireland.",
    offer: "A range of direct support services — check locally for what's actually running in your area.",
    tags: ["disability", "Northern Ireland"],
    contact: { web: "cedar-foundation.org" },
  },
  {
    id: "add-ni",
    name: "ADD-NI",
    remit: "Northern Ireland charity supporting children, young people, adults and families affected by ADHD, based in Belfast with a satellite office in Dungannon.",
    offer: "Adult CBT programme and adult support meetings, alongside information and support for families.",
    tags: ["adhd", "neurodiversity", "Northern Ireland"],
    contact: { web: "addni.org" },
  },
  {
    id: "nas-northern-ireland",
    name: "National Autistic Society Northern Ireland",
    remit: "Part of the UK's National Autistic Society, running a dedicated NI service since 2005 with a purpose-built centre in Carryduff.",
    offer: "Day services for autistic people with high support needs, plus branches and groups across Northern Ireland.",
    tags: ["autism", "neurodiversity", "Northern Ireland"],
    contact: { web: "autism.org.uk" },
  },
  {
    id: "irish-society-for-autism",
    name: "Irish Society for Autism",
    remit: "Ireland's longest-established dedicated autism organisation, founded 1963.",
    offer: "Residential services for adults with autism in Dublin, Galway, Kildare, Meath, Westmeath and Wexford, alongside information and awareness work.",
    tags: ["autism", "neurodiversity", "adult services"],
    contact: { web: "autism.ie" },
  },
  {
    id: "incadds",
    name: "INCADDS",
    remit: "Umbrella body for ADHD support groups across Ireland (Irish National Council for ADHD Support Groups).",
    offer: "Information on diagnosis and treatment, and links to local ADHD support groups nationwide.",
    tags: ["adhd", "neurodiversity"],
    contact: { web: "incadds.ie" },
  },
];

// General (all-ages, all-genders) advocacy & support bodies — Stage 1 of
// broadening beyond women's health, per the Sep 2026 strategic research brief.
// Each org indexed here helps a specific population navigate or advocate
// within the health system. This is a curated index, not a duplicate of
// these orgs' own services — verify current details on their own sites.
const GENERAL_ADVOCACY_ORGS = [
  {
    id: "sage-advocacy",
    name: "Sage Advocacy",
    remit: "National Advocacy Service for Older People, also covering vulnerable adults and healthcare patients where no other service exists.",
    offer: "Free, independent advocacy and safeguarding support — in homes, hospitals, nursing homes, and during transitions between care settings. 8am–10pm, 7 days.",
    tags: ["older people", "advocacy"],
    contact: { web: "sageadvocacy.ie", phone: "1850 71 94 00", email: "1850@sageadvocacy.ie" },
  },
  {
    id: "age-action",
    name: "Age Action",
    remit: "Ireland's leading advocacy organisation for older people.",
    offer: "Information service, practical home supports, and digital-inclusion training.",
    tags: ["older people"],
    contact: { web: "ageaction.ie", phone: "01 475 6989", email: "info@ageaction.ie" },
  },
  {
    id: "alone-ie",
    name: "ALONE",
    remit: "National organisation supporting older people to age at home.",
    offer: "Support coordination, befriending, and a support line 8am–8pm, 7 days.",
    tags: ["older people"],
    contact: { web: "alone.ie", phone: "0818 222 024" },
  },
  {
    id: "dfi",
    name: "Disability Federation of Ireland",
    remit: "Umbrella body of 120+ disability member organisations; runs a Health Advocacy Programme.",
    offer: "Policy work and signposting to its member orgs' advocacy and community-support programmes.",
    tags: ["disability", "advocacy"],
    contact: { web: "disability-federation.ie" },
  },
  {
    id: "national-advocacy-service-disability",
    name: "National Advocacy Service for People with Disabilities",
    remit: "Independent, confidential, free representative advocacy exclusively for people with disabilities.",
    offer: "One-to-one advocacy support, including in healthcare settings.",
    tags: ["disability", "advocacy"],
    contact: { web: "advocacy.ie", phone: "0818 07 3000" },
  },
  {
    id: "inclusion-ireland",
    name: "Inclusion Ireland",
    remit: "National Association for People with an Intellectual Disability.",
    offer: "Signposting and information service on rights, including health & social care supports and assisted decision-making.",
    tags: ["disability", "intellectual disability"],
    contact: { web: "inclusionireland.ie", phone: "01 855 9891" },
  },
  {
    id: "irish-advocacy-network",
    name: "Peer Advocacy in Mental Health (Irish Advocacy Network)",
    remit: "Island-wide mental health organisation led by people with lived experience.",
    offer: "Free peer advocacy and support, working to help people self-advocate in mental health settings. Covers 24 counties, ROI and NI.",
    tags: ["mental health", "advocacy"],
    contact: { web: "irishadvocacynetwork.com", phone: "01 547 0510", email: "admin@irishadvocacynetwork.com" },
  },
  {
    id: "aware-ie",
    name: "Aware",
    remit: "Support and education for anxiety, depression, and bipolar disorder.",
    offer: "Free Support Line 7 days, 10am–10pm, plus support groups and online resources.",
    tags: ["mental health"],
    contact: { web: "aware.ie", phone: "1800 80 48 48", email: "supportmail@aware.ie" },
  },
  {
    id: "mental-health-reform",
    name: "Mental Health Reform",
    remit: "Coalition of 70+ organisations campaigning to transform mental health supports in Ireland.",
    offer: "Policy and systemic advocacy — not individual case support.",
    tags: ["mental health", "policy"],
    contact: { web: "mentalhealthreform.ie" },
  },
  {
    id: "jigsaw",
    name: "Jigsaw",
    remit: "National Centre for Youth Mental Health, ages 12–25.",
    offer: "Free 1:1 support online or in person (18 locations), live chat, and a support line for young people and concerned adults.",
    tags: ["mental health", "youth"],
    contact: { web: "jigsaw.ie", phone: "1800 544 729" },
  },
  {
    id: "lgbt-ireland",
    name: "LGBT Ireland",
    remit: "National LGBTQI+ helpline and support organisation.",
    offer: "Freephone helpline 7 days, online chat, a Transgender Family Line, and peer support groups.",
    tags: ["lgbtq+"],
    contact: { web: "lgbt.ie", phone: "1800 929 539" },
  },
  {
    id: "teni",
    name: "TENI (Transgender Equality Network Ireland)",
    remit: "National trans rights organisation.",
    offer: "1:1 support on gender recognition, healthcare pathway options, and signposting to trans-competent services.",
    tags: ["lgbtq+", "trans healthcare"],
    contact: { web: "teni.ie", phone: "01 873 3575" },
  },
  {
    id: "belongto",
    name: "BeLonG To",
    remit: "National organisation for LGBTQ+ young people.",
    offer: "Advice, information, and support for LGBTQ+ youth and the groups that support them.",
    tags: ["lgbtq+", "youth"],
    contact: { web: "belongto.org", phone: "01 670 6223", email: "info@belongto.org" },
  },
  {
    id: "pavee-point",
    name: "Pavee Point Traveller and Roma Centre",
    remit: "National Traveller and Roma health advocacy organisation.",
    offer: "Roma health development workers and Traveller health programmes addressing access inequalities.",
    tags: ["travellers", "roma"],
    contact: { web: "paveepoint.ie", phone: "01 878 0255" },
  },
  {
    id: "mrci",
    name: "Migrant Rights Centre Ireland (MRCI)",
    remit: "Support for migrant workers and their families.",
    offer: "Free, confidential drop-in information and support (Dublin, appointment only).",
    tags: ["migrants"],
    contact: { web: "mrci.ie", phone: "01 889 7570", email: "info@mrci.ie" },
  },
  {
    id: "cairde",
    name: "Cairde",
    remit: "Reduces health inequalities among ethnic minority communities.",
    offer: "Health Information and Advocacy Service from Dublin and Balbriggan; multilingual mental health guides.",
    tags: ["migrants", "ethnic minorities"],
    contact: { web: "cairde.ie", phone: "01 855 2111" },
  },
  {
    id: "irish-rural-link",
    name: "Irish Rural Link",
    remit: "National advocacy body for rural communities, incl. rural service access.",
    offer: "Policy advocacy — flag local service gaps (transport, healthcare access) to inform national/EU lobbying.",
    tags: ["rural"],
    contact: { web: "irishrurallink.ie", phone: "090 648 2744", email: "info@irishrurallink.ie" },
  },
  {
    id: "family-carers-ireland",
    name: "Family Carers Ireland",
    remit: "National organisation supporting family carers, including parents of children with complex needs.",
    offer: "Information, respite/support programmes, and advocacy on carer supports and entitlements.",
    tags: ["carers", "disability"],
    contact: { web: "familycarers.ie" },
  },
  {
    id: "contact-ni",
    name: "Contact",
    remit: "UK charity for families with disabled children, with a dedicated Northern Ireland team.",
    offer: "Free confidential helpline, workshops on benefits and money, and 1:1 'Listening Ear' support for parents.",
    tags: ["disability", "Northern Ireland", "children"],
    contact: { web: "contact.org.uk" },
  },
  {
    id: "childrens-law-centre-ni",
    name: "Children's Law Centre",
    remit: "Free legal advice and representation for children and young people in Northern Ireland, including SEN cases.",
    offer: "Advice line (\"CHALKY\") and representation, particularly at SENDIST appeals. Self-referral accepted.",
    tags: ["legal", "Northern Ireland", "children", "education"],
    contact: { web: "childrenslawcentre.org.uk" },
  },
  {
    id: "senac-ni",
    name: "SENAC",
    remit: "Independent special educational needs advice and advocacy in Northern Ireland.",
    offer: "Advice line and representation at SENDIST appeals.",
    tags: ["education", "Northern Ireland", "advocacy"],
    contact: { web: "senac.co.uk" },
  },
];

// Stage 2 of the broadening brief: out-of-hours / urgent-care navigation.
// These are GP co-operatives (ROI) and Phone First services (NI) — all
// appointment-only, no walk-ins. Coverage follows GP-practice membership,
// not strict county lines, and boundaries/numbers do change — the HSE and
// nidirect finder links are the authoritative source; treat this list as a
// solid starting point, verified September 2026.
// `sites` are physical treatment centres (appointment-only — always phone
// first), sourced from each service's own locations page. Coordinates are
// approximate town-centre points, not exact building pins — accurate enough
// to show which service covers your area, not for street-level navigation.
const OUT_OF_HOURS_ROI = [
  { name: "D-Doc", counties: "North Dublin", phone: "0818 224 476", sites: [
    { town: "Ballymun", lat: 53.3925, lng: -6.2650 },
    { town: "Coolock", lat: 53.3872, lng: -6.2072 },
    { town: "Hartstown", lat: 53.3958, lng: -6.4283 },
    { town: "North Strand", lat: 53.3562, lng: -6.2447 },
    { town: "Swords", lat: 53.4597, lng: -6.2181 },
  ]},
  { name: "DubDoc", counties: "Dublin 8 & south inner city", phone: "01 454 5607", sites: [
    { town: "Dublin 8 (Heytesbury St)", lat: 53.3324, lng: -6.2697 },
  ]},
  { name: "EastDoc", counties: "North-east Wicklow / south Co. Dublin fringe", phone: "01 209 4021", sites: [] },
  { name: "KDOC", counties: "Kildare, West Wicklow", phone: "045 848 701", sites: [
    { town: "Naas", lat: 53.2158, lng: -6.6669 },
    { town: "Celbridge", lat: 53.3389, lng: -6.5453 },
  ]},
  { name: "Caredoc", counties: "Carlow, Kilkenny, Wexford, Waterford, South Tipperary, South Wicklow", phone: "0818 300 365", sites: [
    { town: "Arklow", lat: 52.7936, lng: -6.1508 },
    { town: "Carlow", lat: 52.8365, lng: -6.9341 },
    { town: "Cashel", lat: 52.5192, lng: -7.8908 },
    { town: "Clonmel", lat: 52.3556, lng: -7.7000 },
    { town: "Dungarvan", lat: 52.0919, lng: -7.6197 },
    { town: "Enniscorthy", lat: 52.5033, lng: -6.5686 },
    { town: "Gorey", lat: 52.6742, lng: -6.2953 },
    { town: "Kilkenny", lat: 52.6541, lng: -7.2448 },
    { town: "New Ross", lat: 52.3958, lng: -6.9469 },
    { town: "Tipperary Town", lat: 52.4747, lng: -8.1611 },
    { town: "Waterford", lat: 52.2593, lng: -7.1101 },
    { town: "Wexford", lat: 52.3369, lng: -6.4633 },
    { town: "Wicklow Town", lat: 52.9808, lng: -6.0447 },
  ]},
  { name: "SouthDoc", counties: "Cork, Kerry", phone: "0818 355 999", sites: [
    { town: "Mallow", lat: 52.1369, lng: -8.6408 },
    { town: "Macroom", lat: 51.9028, lng: -8.9647 },
    { town: "Skibbereen", lat: 51.5497, lng: -9.2622 },
    { town: "Cork City (Kinsale Rd)", lat: 51.8794, lng: -8.4750 },
    { town: "Tralee", lat: 52.2712, lng: -9.7025 },
    { town: "Listowel", lat: 52.4467, lng: -9.4900 },
    { town: "Killarney", lat: 52.0599, lng: -9.5044 },
  ]},
  { name: "Shannondoc", counties: "Limerick, Clare, North Tipperary", phone: "0818 123 500", sites: [
    { town: "Limerick City (Dooradoyle)", lat: 52.6389, lng: -8.6386 },
    { town: "Hospital, Co. Limerick", lat: 52.4933, lng: -8.4272 },
    { town: "Newcastle West", lat: 52.4489, lng: -9.0522 },
    { town: "Nenagh", lat: 52.8631, lng: -8.1975 },
    { town: "Roscrea", lat: 52.9536, lng: -7.7936 },
    { town: "Thurles", lat: 52.6800, lng: -7.8064 },
    { town: "Ennis", lat: 52.8436, lng: -8.9864 },
    { town: "Ennistymon", lat: 52.9436, lng: -9.2900 },
    { town: "Kilrush", lat: 52.6389, lng: -9.4881 },
    { town: "Milltown Malbay", lat: 52.8611, lng: -9.3986 },
    { town: "Shannon", lat: 52.7167, lng: -8.8642 },
  ]},
  { name: "WestDoc", counties: "Galway, Mayo, Roscommon", phone: "0818 360 000", sites: [
    { town: "Ballina", lat: 54.1153, lng: -9.1547 },
    { town: "Ballinasloe", lat: 53.3319, lng: -8.2192 },
    { town: "Castlebar", lat: 53.8517, lng: -9.2986 },
    { town: "Craughwell", lat: 53.2333, lng: -8.7397 },
    { town: "Galway City", lat: 53.2707, lng: -9.0568 },
    { town: "Knock", lat: 53.7900, lng: -8.9200 },
    { town: "Roscommon Town", lat: 53.6278, lng: -8.1875 },
    { town: "Tuam", lat: 53.5150, lng: -8.8500 },
    { town: "Westport", lat: 53.8014, lng: -9.5175 },
  ]},
  { name: "NoWDOC", counties: "Donegal, South Leitrim", phone: "0818 400 911", sites: [
    { town: "Letterkenny (approx.)", lat: 54.9503, lng: -7.7339 },
    { town: "Carrick-on-Shannon", lat: 53.9453, lng: -8.0972 },
  ]},
  { name: "NEDOC", counties: "Meath, Louth (excl. Dundalk), Cavan, Monaghan", phone: "1800 777 911", sites: [
    { town: "Cavan", lat: 53.9908, lng: -7.3606 },
    { town: "Castleblayney", lat: 54.1236, lng: -6.7317 },
    { town: "Drogheda", lat: 53.7178, lng: -6.3478 },
    { town: "Navan", lat: 53.6528, lng: -6.6819 },
  ]},
  { name: "MIDOC", counties: "Longford, Westmeath, Laois, Offaly", phone: "1800 302 702", sites: [
    { town: "Tullamore", lat: 53.2739, lng: -7.4931 },
    { town: "Longford", lat: 53.7275, lng: -7.7931 },
    { town: "Mullingar", lat: 53.5253, lng: -7.3378 },
    { town: "Portlaoise", lat: 53.0344, lng: -7.2989 },
  ]},
];
const OUT_OF_HOURS_NI = [
  { name: "Northern Trust — Phone First", counties: "Antrim, Ballymena, Coleraine & Northern Trust area", phone: "0300 123 1 123", note: "Mon–Fri 8am–6pm", sites: [
    { town: "Antrim (approx. Trust area)", lat: 54.7180, lng: -6.2100 },
  ]},
  { name: "Southern Trust — Phone First", counties: "Armagh, Craigavon, Newry & Southern Trust area", phone: "0300 123 3111", note: "Mon–Fri 9am–9pm", sites: [
    { town: "Craigavon (approx. Trust area)", lat: 54.4522, lng: -6.3919 },
  ]},
  { name: "Belfast Trust GP Out of Hours — North & West Belfast", counties: "North & West Belfast", phone: "028 9074 4447", sites: [
    { town: "North & West Belfast (approx.)", lat: 54.5975, lng: -5.9550 },
  ]},
  { name: "Belfast Trust GP Out of Hours — South & East Belfast", counties: "South & East Belfast", phone: "028 9079 6220", sites: [
    { town: "South & East Belfast (approx.)", lat: 54.5825, lng: -5.9350 },
  ]},
];
