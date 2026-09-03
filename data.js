// The Pocket Guide — service directory data
// Structure is deliberately flat so new counties/specialties can be appended later.

const SPECIALTIES = [
  { id: "obs",     label: "Maternity & Obstetrics" },
  { id: "gynae",   label: "Gynaecology" },
  { id: "urology", label: "Urology" },
  { id: "phn",     label: "Public Health Nursing" },
  { id: "mh",      label: "Perinatal & Maternal Mental Health" },
  { id: "feeding", label: "Breastfeeding & Infant Feeding" },
  { id: "dsv",     label: "Domestic & Sexual Violence Support" },
  { id: "hub",     label: "Community Hubs & Family Resource Centres" },
  { id: "endo",    label: "Endometriosis" },
  { id: "menopause", label: "Menopause" },
  { id: "fertility", label: "Fertility & IVF" },
  { id: "eating",  label: "Eating Disorders" },
  { id: "loss",    label: "Pregnancy & Baby Loss" },
  { id: "cancer",  label: "Gynaecological & Breast Cancer" },
  { id: "contraception", label: "Contraception & Reproductive Health" },
  { id: "neurodiversity", label: "Neurodiversity (Autism, ADHD)" },
  { id: "parenting", label: "Parenting & New Motherhood" },
  { id: "crisis",  label: "Mental Health Crisis Support" },
  { id: "cardiology", label: "Cardiology & Women's Heart Health" },
  { id: "rheumatology", label: "Rheumatology & Autoimmune" },
  { id: "neurology", label: "Neurology & Migraine" },
  { id: "gastro",  label: "Gastroenterology & IBD" },
  { id: "pain",    label: "Chronic Pain Management" },
  { id: "longcovid", label: "Long Covid & ME/CFS" },
  { id: "bonehealth", label: "Bone Health & Osteoporosis" },
  { id: "genetics", label: "Genetics & Hereditary Cancer Risk" },
  { id: "sexualhealth", label: "Sexual Health & STI Testing" },
  { id: "pelvicphysio", label: "Pelvic Health Physiotherapy" },
  { id: "vascular", label: "Vascular" },
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
    contact: { phone: "021 492 0955 / 021 492 0950", web: "irelandsouthwid.cumh.hse.ie", address: "CUMH, Wilton, Cork" }
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
    contact: { phone: "Via CUMH switchboard", address: "Kinsale Road Clinic, Cork" },
    resources: [
      { label: "Miscarriage — patient.info", url: "https://patient.info/pregnancy/miscarriage-and-bleeding-in-early-pregnancy" }
    ]
  },
  {
    id: "cumh-loss",
    name: "Pregnancy Loss / Bereavement Team",
    specialty: ["obs", "loss"],
    county: ["cork-city"],
    blurb: "Led by Prof. Keelin O'Donoghue with Clinical Midwife Specialists in Bereavement & Loss.",
    details: ["Contact via CUMH main reception; ask specifically for the Bereavement & Loss team."],
    referral: "Ask for this team by name via CUMH.",
    contact: { phone: "021 492 0955", address: "CUMH, Wilton, Cork" }
  },
  {
    id: "cumh-birth-reflections",
    name: "Birth Reflections Service",
    specialty: ["obs", "mh"],
    county: ["cork-city"],
    blurb: "A midwife-led listening service for processing a difficult or traumatic birth.",
    details: ["Self-referral or via your GP/PHN — ask CUMH switchboard to connect you."],
    referral: "Self-referral possible.",
    contact: { phone: "021 492 0955", address: "CUMH, Wilton, Cork" }
  },
  {
    id: "cumh-social-work",
    name: "Maternity & Neonatal Social Work",
    specialty: ["obs"],
    county: ["cork-city"],
    blurb: "Free practical and emotional support service.",
    details: ["Referral by your medical team."],
    referral: "Via medical team.",
    contact: { phone: "021 492 0955" }
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
    contact: { web: "irelandsouthwid.cumh.hse.ie" }
  },
  {
    id: "cumh-urogynae",
    name: "Urogynaecology",
    specialty: ["gynae", "urology"],
    county: ["cork-city"],
    blurb: "Prolapse, incontinence, pelvic floor issues.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "cumh-gynae-onc",
    name: "Gynae-Oncology & Rapid Access Suspected Ovarian Cancer",
    specialty: ["gynae", "cancer"],
    county: ["cork-city"],
    blurb: "Suspected or confirmed gynaecological cancers.",
    details: ["GP referral — if you suspect cancer, ask your GP to state this explicitly on the referral so it's triaged on the rapid access pathway."],
    referral: "GP referral, flagged as rapid access.",
    contact: {}
  },
  {
    id: "cumh-colposcopy",
    name: "Colposcopy",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Follow-up after an abnormal CervicalCheck smear result.",
    details: ["Referral is automatic through CervicalCheck once a result requires it."],
    referral: "Automatic via CervicalCheck.",
    contact: {}
  },
  {
    id: "cumh-menopause",
    name: "Complex Menopause Clinic",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "For menopause symptoms not managed at GP level.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "cumh-fertility",
    name: "Fertility Hub",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Initial public fertility investigations.",
    details: ["GP referral."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "cumh-pmb",
    name: "Postmenopausal Bleeding Clinic",
    specialty: ["gynae"],
    county: ["cork-city"],
    blurb: "Rapid-access pathway for postmenopausal bleeding.",
    details: ["GP referral, flagged as postmenopausal bleeding for correct triage."],
    referral: "GP referral (rapid access).",
    contact: {}
  },
  {
    id: "cumh-physio",
    name: "Women's Health Physiotherapy",
    specialty: ["obs", "gynae"],
    county: ["cork-city"],
    blurb: "Pelvic floor, postnatal, and pregnancy-related physiotherapy.",
    details: ["Referral via GP, PHN, or your antenatal/postnatal team."],
    referral: "GP, PHN, or maternity team.",
    contact: {}
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
    contact: { phone: "021 492 0955 (ask for Urology outpatients)" }
  },
  {
    id: "phn-corkcity",
    name: "Public Health Nurse Office — Cork City",
    specialty: ["phn"],
    county: ["cork-city"],
    blurb: "Not sure who your PHN is? Start here.",
    details: ["Postnatal home visits, infant checks, referrals to home support/chiropody/respite, aftercare after discharge.", "Self-referral is possible in most areas."],
    referral: "Self-referral or GP.",
    contact: { phone: "021 492 3847" }
  },
  {
    id: "phn-mallow",
    name: "Public Health Nursing — Mallow / North Cork",
    specialty: ["phn"],
    county: ["cork-north"],
    blurb: "PHN service based at Mallow Primary Care Centre.",
    details: ["Mon–Fri 09:00–17:00."],
    referral: "Self-referral or GP.",
    contact: { phone: "022 58700", address: "Mallow Primary Care Centre" }
  },
  {
    id: "phn-castletownbere",
    name: "Public Health Nursing — Castletownbere",
    specialty: ["phn"],
    county: ["cork-west"],
    blurb: "West Cork PHN example — coverage areas are parish-based and change with staffing.",
    details: ["For other West Cork towns, contact your local health centre or GP."],
    referral: "Self-referral or GP.",
    contact: { phone: "027 70353" }
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
    contact: { phone: "Via CUMH switchboard, Support Services" }
  },
  {
    id: "pnd-ireland",
    name: "Postnatal Depression Ireland",
    specialty: ["mh"],
    county: ["cork-city"],
    blurb: "Cork-based charity: coffee mornings, peer support, friendship for women with PND.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 492 2083 / 086 787 2107", email: "support@pnd.ie" }
  },
  {
    id: "nurture",
    name: "Nurture — Maternal Mental Health Counselling",
    specialty: ["mh"],
    county: ["national"],
    blurb: "Affordable, timely counselling for perinatal mental health, birth trauma, fertility issues, grief.",
    details: ["No-wait-list model in most areas."],
    referral: "Self-referral.",
    contact: { web: "nurturehealth.ie" }
  },
  {
    id: "cuidiu-pnd",
    name: "Cuidiú Parent-to-Parent PND Support",
    specialty: ["mh"],
    county: ["national"],
    blurb: "Free peer listening by phone and email.",
    details: ["Check cuidiu.ie for current local contacts."],
    referral: "Self-referral.",
    contact: { web: "cuidiu.ie" }
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
    contact: { web: "cuidiucork.ie", email: "cork@cuidiu.ie" }
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
    contact: { address: "Wolfe Tone Square, Bantry, Co. Cork" }
  },
  {
    id: "womens-aid",
    name: "Women's Aid (National Helpline)",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "24-hour freephone helpline for women experiencing domestic violence.",
    details: ["Support in 200+ languages via Language Line."],
    referral: "Self-referral, no cost.",
    contact: { phone: "1800 341 900" }
  },
  {
    id: "satu",
    name: "Sexual Assault Treatment Unit (SATU)",
    specialty: ["dsv"],
    county: ["cork-city"],
    blurb: "Free specialist care for anyone over 14 recently sexually assaulted — medical, forensic (optional), and follow-up.",
    details: ["Accessed via SVC Cork accompaniment, GP, ED, or self-referral."],
    referral: "Self-referral, GP, ED, or via SVC Cork.",
    contact: { web: "www2.hse.ie/sexual-assault-treatment-units" }
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
    contact: { phone: "027 50069", address: "Slip, Bantry, Co. Cork" }
  },
  {
    id: "clon-frc",
    name: "Clonakilty Family Resource Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "023 883 3702" }
  },
  {
    id: "haven-castletownbere",
    name: "Haven Family & Community Resource Centre",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Community hub and family resource centre, Castletownbere.",
    details: [],
    referral: "Drop in or contact directly.",
    contact: { phone: "027 70718" }
  },
  {
    id: "co-action",
    name: "Co-Action West Cork",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Disability and family support services across West Cork.",
    details: ["Serves Bantry, Castletownbere, Clonakilty, and Dunmanway."],
    referral: "Contact directly.",
    contact: { phone: "Bantry 027 50114 / Castletownbere 027 70835" }
  },
  {
    id: "cork-arc-westcork",
    name: "Cork ARC Cancer Support House (West Cork)",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Cancer support services, including for gynaecological cancers.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "027 53891" }
  },
  {
    id: "wellbeing-network-wc",
    name: "The Wellbeing Network West Cork",
    specialty: ["hub"],
    county: ["cork-west"],
    blurb: "Directory of local classes and groups by catchment area.",
    details: ["Covers Beara, Bantry, Clonakilty, Dunmanway/Drimoleague, Mizen, Rosscarbery, Skibbereen."],
    referral: "Browse directly.",
    contact: { web: "thewellbeingnetwork.ie/westcork" }
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
    contact: { address: "Lee Clinic, CUMH, Wilton, Cork" },
    resources: [
      { label: "Endometriosis — patient.info", url: "https://patient.info/womens-health/pelvic-pain-in-women/endometriosis" },
      { label: "Fibroids — patient.info", url: "https://patient.info/womens-health/periods-and-period-problems/fibroids" },
      { label: "Adenomyosis — patient.info", url: "https://patient.info/features/womens-health/is-adenomyosis-the-cause-of-your-heavy-painful-periods" }
    ]
  },
  {
    id: "tallaght-endo-centre",
    name: "Tallaght University Hospital Endometriosis Centre",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "The other supra-regional centre for complex (Stage 4) endometriosis care, alongside CUMH.",
    details: ["For complex/severe cases referred on from a regional centre — not a first stop for a new diagnosis."],
    referral: "GP → regional centre → supra-regional referral if complex.",
    contact: { web: "hse.ie" }
  },
  {
    id: "rotunda-endo",
    name: "Rotunda Hospital — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" }
  },
  {
    id: "coombe-endo",
    name: "Coombe Hospital — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 408 5200", address: "Cork Street, Dublin D08 XW7X" }
  },
  {
    id: "uhl-endo",
    name: "University Hospital Limerick — Endometriosis (regional)",
    specialty: ["endo", "gynae"],
    county: ["limerick"],
    blurb: "Established regional specialist centre for moderate endometriosis care.",
    details: [],
    referral: "GP referral.",
    contact: { web: "hse.ie" }
  },
  {
    id: "uhg-endo",
    name: "University Hospital Galway — Endometriosis (in development)",
    specialty: ["endo", "gynae"],
    county: ["galway"],
    blurb: "Regional endometriosis centre in development under the National Endometriosis Framework — may not be fully operational yet.",
    details: [],
    referral: "GP referral — ask whether the service is live yet.",
    contact: { phone: "091 524 222" }
  },
  {
    id: "nmh-endo",
    name: "National Maternity Hospital — Endometriosis (in development)",
    specialty: ["endo", "gynae"],
    county: ["dublin"],
    blurb: "Regional endometriosis centre in development under the National Endometriosis Framework — may not be fully operational yet.",
    details: [],
    referral: "GP referral — ask whether the service is live yet.",
    contact: { phone: "01 637 3100" }
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
    contact: { address: "Unit 3, CUMH Kinsale Road, South Ring Business Park, Cork" }
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
    ]
  },
  {
    id: "rotunda-menopause",
    name: "Rotunda Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["dublin"],
    blurb: "Clinical lead Dr Caoimhe Hartley.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" }
  },
  {
    id: "coombe-menopause",
    name: "Coombe Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["dublin"],
    blurb: "One of six HSE specialist complex-menopause clinics nationally.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "01 408 5200" }
  },
  {
    id: "uhg-menopause",
    name: "University Hospital Galway Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["galway"],
    blurb: "Runs one afternoon a week.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { phone: "091 524 222" }
  },
  {
    id: "nenagh-menopause",
    name: "Nenagh Hospital Complex Menopause Clinic",
    specialty: ["menopause"],
    county: ["tipperary"],
    blurb: "One of six HSE specialist complex-menopause clinics nationally.",
    details: [],
    referral: "GP/consultant/ANP referral.",
    contact: { web: "hse.ie" }
  },
  {
    id: "the-menopause-hub",
    name: "The Menopause Hub (private)",
    specialty: ["menopause"],
    county: ["dublin", "cork-city"],
    blurb: "Private menopause clinic — an option if you can pay and don't want to wait for a public complex-menopause clinic referral.",
    details: [
      "Three clinics: Mount Merrion, Co. Dublin; Santry, Dublin 9; and Rosewood, Ballincollig, Cork.",
      "Self-referral — no GP letter needed. Consultation fees apply; check current pricing directly.",
      "Virtual consultations also available.",
    ],
    referral: "Self-referral, book online or by phone.",
    contact: { phone: "01 210 7948 (Mount Merrion) / 01 485 3066 (Santry) / 021 242 7122 (Cork)", email: "info@themenopausehub.ie", web: "themenopausehub.ie" }
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
    contact: { address: "Lee Road Clinic, Cork" }
  },
  {
    id: "rotunda-fertility",
    name: "Rotunda Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs. Around 125 couples/month are referred nationally for publicly-funded AHR.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" }
  },
  {
    id: "nmh-fertility",
    name: "National Maternity Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 637 3100" }
  },
  {
    id: "coombe-fertility",
    name: "Coombe Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["dublin"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "01 408 5200" }
  },
  {
    id: "uhg-fertility",
    name: "University Hospital Galway Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["galway"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { phone: "091 524 222" }
  },
  {
    id: "nenagh-fertility",
    name: "Nenagh Hospital Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["tipperary"],
    blurb: "One of six HSE Regional Fertility Hubs.",
    details: [],
    referral: "GP referral to the hub.",
    contact: { web: "hse.ie" }
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
    contact: {}
  },
  {
    id: "national-eating-disorders",
    name: "HSE National Clinical Programme for Eating Disorders",
    specialty: ["eating", "mh"],
    county: ["national"],
    blurb: "The clinical referral pathway for eating disorder care, partnered with Bodywhys for peer support.",
    details: [
      "Referral pathway: GP → CAMHS (under 18) or adult mental health services (18+).",
      "See the Support & advocacy organisations list on the 'Know your rights' page for Bodywhys' helpline and peer support groups.",
    ],
    referral: "GP referral.",
    contact: { web: "hse.ie" }
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
    contact: { web: "hse.ie" }
  },
  {
    id: "my-options",
    name: "My Options",
    specialty: ["contraception", "obs"],
    county: ["national"],
    blurb: "Free, confidential HSE phone line for advice on an unplanned pregnancy — options counselling and information.",
    details: ["Not a booking line for a termination — an information and counselling service."],
    referral: "Self-referral, phone directly.",
    contact: { phone: "1800 828 010", web: "myoptions.ie" }
  },
  {
    id: "breastcheck",
    name: "BreastCheck — National Breast Screening Programme",
    specialty: ["cancer"],
    county: ["national"],
    blurb: "Free breast screening (mammogram) for eligible women, run by the National Screening Service.",
    details: ["Screening reminders are also visible in the HSE Health App."],
    referral: "Automatic invitation by eligible age band, or self-register if not yet invited.",
    contact: { web: "breastcheck.ie" }
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
    contact: { phone: "116 123", email: "jo@samaritans.ie", web: "samaritans.org" }
  },
  {
    id: "text-50808",
    name: "Text 50808",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Free, 24/7 HSE-funded crisis text line — text HELLO to start.",
    details: ["A trained crisis volunteer texts back and forth with you in real time.", "Good option if a phone call isn't possible or feels like too much."],
    referral: "Self-referral — text HELLO to 50808.",
    contact: { phone: "Text HELLO to 50808", web: "text50808.ie" }
  },
  {
    id: "pieta",
    name: "Pieta",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Free 24/7 helpline and therapy specifically for suicidal ideation, self-harm, and bereavement by suicide.",
    details: ["Also runs a text service: text HELP to 51444."],
    referral: "Self-referral, phone or text any time.",
    contact: { phone: "1800 247 247", web: "pieta.ie" }
  },
  {
    id: "lifeline-ni",
    name: "Lifeline (Northern Ireland)",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "Northern Ireland's 24/7 regional crisis response helpline — trauma, suicide, self-harm, abuse.",
    details: ["Free from NI landlines and mobiles.", "Can arrange a face-to-face follow-up appointment locally where appropriate."],
    referral: "Self-referral, phone any time.",
    contact: { phone: "0808 808 8000", web: "lifelinehelpline.info" }
  },
  {
    id: "emergency-mh",
    name: "In immediate danger",
    specialty: ["crisis", "mh"],
    county: ["national"],
    blurb: "If you or someone else is in immediate physical danger, this overrides everything else on this page.",
    details: ["Call 999 or 112 (both work across Ireland and Northern Ireland).", "Or go directly to your nearest Emergency Department / A&E."],
    referral: "Emergency — no referral needed.",
    contact: {}
  },
  {
    id: "asiam",
    name: "AsIAm",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Ireland's autism charity, autistic-led — information, a legal clinic, and support for newly-diagnosed families.",
    details: ["Runs support programmes for parents of recently-diagnosed children and for autistic teenagers."],
    referral: "Self-referral via website.",
    contact: { web: "asiam.ie" }
  },
  {
    id: "adhd-ireland",
    name: "ADHD Ireland",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Information, helpline, and networking for people with ADHD, parents, and professionals.",
    details: ["Also runs an ADHD School Friendly Programme for teachers and schools."],
    referral: "Self-referral, phone or email helpline.",
    contact: { web: "adhdireland.ie" }
  },
  {
    id: "aspire-ireland",
    name: "Aspire (Autism Spectrum Association of Ireland)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "Information and support across autism, ADHD, and AuDHD (overlapping autism + ADHD) more broadly.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "aspireireland.ie" }
  },
  {
    id: "hse-assessment-of-need",
    name: "HSE Assessment of Need (autism/disability)",
    specialty: ["neurodiversity"],
    county: ["national"],
    blurb: "The statutory pathway for a child's autism/disability assessment under the Disability Act.",
    details: ["Waiting times nationally are long — this is a known, acknowledged system limitation, not a reflection of your case's urgency.", "Adult diagnosis is a separate, less standardised pathway — see AsIAm's adult diagnosis guidance."],
    referral: "Apply via your local Children's Disability Network Team (CDNT).",
    contact: { web: "hse.ie" }
  },
  {
    id: "cuidiu",
    name: "Cuidiú",
    specialty: ["parenting", "feeding"],
    county: ["national"],
    blurb: "Volunteer-led parent-to-parent support: antenatal classes, breastfeeding support, and postnatal depression peer support.",
    details: ["Local branches nationwide — check the website for your area."],
    referral: "Self-referral via website.",
    contact: { web: "cuidiu.ie" }
  },
  {
    id: "nurture-pnd",
    name: "Nurture",
    specialty: ["parenting", "mh"],
    county: ["national"],
    blurb: "Support and counselling specifically around pregnancy, birth, and postnatal depression.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "nurturecharity.org" }
  },
  {
    id: "treoir",
    name: "Treoir",
    specialty: ["parenting"],
    county: ["national"],
    blurb: "Free, confidential information for parents who are not married to or living with each other — legal, social welfare, and parenting questions.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "treoir.ie" }
  },
  {
    id: "nisig",
    name: "National Infertility Support and Information Group (NISIG)",
    specialty: ["fertility"],
    county: ["national"],
    blurb: "Peer support and information for anyone experiencing infertility, alongside the clinical AHR pathway.",
    details: [],
    referral: "Self-referral via website.",
    contact: { web: "nisig.ie" }
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
    county: ["cavan"],
    blurb: "Maternity unit alongside a midwifery-led unit.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "049 437 6613", address: "Lisdaran, Cavan" }
  },
  {
    id: "letterkenny-maternity",
    name: "Letterkenny University Hospital Maternity",
    specialty: ["obs"],
    county: ["donegal"],
    blurb: "The maternity unit for Co. Donegal.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "074 912 5888", address: "Kilmacrennan Rd, Letterkenny F92 AE81" }
  },
  {
    id: "coombe-maternity",
    name: "Coombe Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin"],
    blurb: "One of three Dublin maternity hospitals.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 408 5200", email: "patientadvocacy@coombe.ie", address: "Cork Street, Dublin D08 XW7X" }
  },
  {
    id: "nmh-maternity",
    name: "National Maternity Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin"],
    blurb: "One of three Dublin maternity hospitals.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 637 3100", address: "Holles St, Dublin D02 YH21" }
  },
  {
    id: "rotunda-maternity",
    name: "Rotunda Hospital Maternity",
    specialty: ["obs"],
    county: ["dublin"],
    blurb: "One of three Dublin maternity hospitals.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "01 873 0596", address: "Parnell Square East, Dublin D01 P5W9", web: "rotunda.ie" }
  },
  {
    id: "uhg-maternity",
    name: "University Hospital Galway Maternity",
    specialty: ["obs"],
    county: ["galway"],
    blurb: "The maternity unit for Galway city and much of the west.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "091 524 222", address: "Newcastle Rd, Galway H91 YR71" }
  },
  {
    id: "portiuncula-maternity",
    name: "Portiuncula University Hospital Maternity",
    specialty: ["obs"],
    county: ["galway"],
    blurb: "Maternity unit serving east Galway and surrounding areas.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "090 9648200", email: "info.portiuncula@hse.ie", address: "Ballinasloe, Co. Galway H53 T971" }
  },
  {
    id: "uhk-maternity",
    name: "University Hospital Kerry Maternity",
    specialty: ["obs"],
    county: ["kerry"],
    blurb: "The maternity unit for Co. Kerry.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "066 718 4000", address: "Tralee, Co. Kerry V92 NX94" }
  },
  {
    id: "kilkenny-maternity",
    name: "St Luke's General Hospital Maternity",
    specialty: ["obs"],
    county: ["kilkenny"],
    blurb: "The maternity unit for Co. Kilkenny.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "056 778 5000", address: "Freshford Rd, Kilkenny R95 FY71" }
  },
  {
    id: "portlaoise-maternity",
    name: "Midland Regional Hospital Portlaoise Maternity",
    specialty: ["obs"],
    county: ["laois"],
    blurb: "The maternity unit for Co. Laois.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "057 869 6481" }
  },
  {
    id: "limerick-maternity",
    name: "University Maternity Hospital Limerick",
    specialty: ["obs"],
    county: ["limerick"],
    blurb: "The maternity unit for the Mid-West.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "061 483 129", address: "Ennis Road, Limerick V94 C566" }
  },
  {
    id: "drogheda-maternity",
    name: "Our Lady of Lourdes Hospital Maternity (Drogheda)",
    specialty: ["obs"],
    county: ["louth"],
    blurb: "The maternity unit for Co. Louth, alongside a midwifery-led unit.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "041 983 7601", address: "Drogheda, Co. Louth A92 VW28" }
  },
  {
    id: "mayo-maternity",
    name: "Mayo University Hospital Maternity",
    specialty: ["obs"],
    county: ["mayo"],
    blurb: "The maternity unit for Co. Mayo.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "094 9021733", address: "Westport Rd, Castlebar" }
  },
  {
    id: "sligo-maternity",
    name: "Sligo University Hospital Maternity",
    specialty: ["obs"],
    county: ["sligo"],
    blurb: "The maternity unit for the northwest.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "071 917 1111", address: "The Mall, Sligo F91 H684" }
  },
  {
    id: "tipperary-maternity",
    name: "Tipperary University Hospital Maternity (South Tipp General)",
    specialty: ["obs"],
    county: ["tipperary"],
    blurb: "The maternity unit for Co. Tipperary, based in Clonmel.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "052 617 7000" }
  },
  {
    id: "waterford-maternity",
    name: "University Hospital Waterford Maternity",
    specialty: ["obs"],
    county: ["waterford"],
    blurb: "The maternity unit for the southeast.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "051 848 000", address: "Dunmore Road, Waterford X91 ER8E" }
  },
  {
    id: "mullingar-maternity",
    name: "Midland Regional Hospital Mullingar Maternity",
    specialty: ["obs"],
    county: ["westmeath"],
    blurb: "The maternity unit for Co. Westmeath.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "044 934 0221", address: "Co. Westmeath N91 NA43" }
  },
  {
    id: "wexford-maternity",
    name: "Wexford General Hospital Maternity",
    specialty: ["obs"],
    county: ["wexford"],
    blurb: "The maternity unit for Co. Wexford.",
    details: [],
    referral: "GP referral under the Maternity & Infant Care Scheme.",
    contact: { phone: "053 915 3000", address: "Newtown Rd, Wexford Y35 Y17D" }
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
    contact: { address: "Bretten Hall, Bush Road, Antrim BT41 2RL" }
  },
  {
    id: "se-trust-maternity",
    name: "South Eastern Trust Maternity (Ulster Hospital)",
    specialty: ["obs"],
    county: ["down"],
    blurb: "Ulster Hospital delivery suite plus a 'Home from Home' alongside midwifery-led unit. Downe and Lagan Valley units no longer deliver births (antenatal care continues).",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9056 1364", email: "Maternity.Reception@setrust.hscni.net" }
  },
  {
    id: "southern-trust-maternity",
    name: "Southern Trust Maternity (Craigavon & Daisy Hill)",
    specialty: ["obs"],
    county: ["armagh", "down"],
    blurb: "Craigavon Area Hospital and Daisy Hill Hospital, Newry (~5,100 births/yr). Birth at Home team since 2022.",
    details: [],
    referral: "Self-referral form on southerntrust.hscni.net.",
    contact: { email: "antenatal.midwives@southerntrust.hscni.net" }
  },
  {
    id: "western-trust-maternity",
    name: "Western Trust Maternity (Altnagelvin & SWAH)",
    specialty: ["obs"],
    county: ["londonderry", "fermanagh"],
    blurb: "Altnagelvin Hospital (Derry/Londonderry) and South West Acute Hospital (Enniskillen).",
    details: ["Altnagelvin Maternal & Fetal Assessment Unit: 028 7161 1412.", "SWAH/Omagh Fetal Maternal Assessment (24hr): 028 8283 3100."],
    referral: "Self-referral.",
    contact: { phone: "028 7134 5171" }
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
    contact: { phone: "01 637 3100" }
  },
  {
    id: "rotunda-perinatal-mh",
    name: "Rotunda Hospital Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["dublin"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "01 873 0596", web: "rotunda.ie" }
  },
  {
    id: "coombe-perinatal-mh",
    name: "Coombe Hospital Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["dublin"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "01 408 5200" }
  },
  {
    id: "uhl-perinatal-mh",
    name: "University Maternity Hospital Limerick Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["limerick"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "061 483 129" }
  },
  {
    id: "uhg-perinatal-mh",
    name: "University Hospital Galway Specialist Perinatal MH Team",
    specialty: ["mh"],
    county: ["galway"],
    blurb: "One of six national Specialist Perinatal Mental Health hub teams. The other 13 ROI maternity units are 'spoke' sites with a mental-health midwife linked to a hub team.",
    details: [],
    referral: "GP, midwife, obstetrician, or psychiatrist referral.",
    contact: { phone: "091 524 222" }
  },
  {
    id: "belfast-perinatal-mh",
    name: "Belfast Trust Community Perinatal Mental Health Service",
    specialty: ["mh"],
    county: ["antrim"],
    blurb: "Specialist perinatal MH teams now exist in all five NI Trusts. Note: NI has no dedicated inpatient Mother & Baby Unit — a known, acknowledged gap.",
    details: ["Clinics also at Crumlin Road Health Centre, Woodstock Lodge, and the Royal Jubilee Maternity Hospital."],
    referral: "GP, midwife, or health visitor referral.",
    contact: { phone: "028 9504 6223", address: "Knockbracken Healthcare Park, Belfast" }
  },
  {
    id: "southern-perinatal-mh",
    name: "Southern Trust Perinatal Mental Health Team",
    specialty: ["mh"],
    county: ["armagh", "down"],
    blurb: "Accepts referrals from 12 weeks' pregnancy to baby's first birthday.",
    details: [],
    referral: "GP, midwife, or health visitor referral.",
    contact: {}
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
    contact: { phone: "1800 306 600", web: "amrcc.ie" }
  },
  {
    id: "rcc-carlow",
    name: "Carlow & South Leinster Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["carlow"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 727 737" }
  },
  {
    id: "rcc-donegal",
    name: "Donegal Sexual Abuse & Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["donegal"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 448 844", address: "Letterkenny" }
  },
  {
    id: "rcc-dublin",
    name: "Dublin Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["dublin"],
    blurb: "National 24hr helpline.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 778 888", web: "drcc.ie" }
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
    contact: { phone: "1800 355 355", web: "galwayrcc.org" }
  },
  {
    id: "rcc-kerry",
    name: "Kerry Rape & Sexual Abuse Centre",
    specialty: ["dsv"],
    county: ["kerry"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 633 333", web: "krsac.com", address: "Tralee" }
  },
  {
    id: "rcc-kilkenny",
    name: "Kilkenny Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["kilkenny"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 478 478", web: "kasa.ie" }
  },
  {
    id: "rcc-midwest",
    name: "Rape Crisis Midwest (Limerick)",
    specialty: ["dsv"],
    county: ["limerick"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 311 511", web: "rapecrisis.ie" }
  },
  {
    id: "rcc-mayo",
    name: "Mayo Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["mayo"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 234 900", web: "mrcc.ie", address: "Castlebar" }
  },
  {
    id: "rcc-sligo",
    name: "Rape Crisis Centre Sligo, Leitrim & West Cavan",
    specialty: ["dsv"],
    county: ["sligo"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 750 780", web: "srcc.ie" }
  },
  {
    id: "rcc-tipperary",
    name: "Tipperary Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["tipperary"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 340 340", web: "trcc.ie", address: "Clonmel" }
  },
  {
    id: "rcc-tullamore",
    name: "Tullamore Rape Crisis Centre",
    specialty: ["dsv"],
    county: ["offaly"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 323 232" }
  },
  {
    id: "rcc-waterford",
    name: "Waterford Rape & Sexual Abuse Centre",
    specialty: ["dsv"],
    county: ["waterford"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 296 296", web: "waterfordrsac.ie" }
  },
  {
    id: "rcc-westcork",
    name: "West Cork Beacon (Bantry)",
    specialty: ["dsv"],
    county: ["cork-west"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 832 001", web: "westcorkwomensproject.ie" }
  },
  {
    id: "rcc-wexford",
    name: "Wexford Rape Crisis",
    specialty: ["dsv"],
    county: ["wexford"],
    blurb: "Free, confidential counselling after rape or sexual abuse.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "1800 33 00 33", web: "wexfordrapecrisis.com" }
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
    contact: { phone: "021 492 6297" }
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
    contact: { phone: "01 817 1736" }
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
    contact: { phone: "044 9394239" }
  },
  {
    id: "satu-waterford",
    name: "Waterford SATU (University Hospital Waterford)",
    specialty: ["dsv"],
    county: ["waterford"],
    blurb: "Sexual Assault Treatment Unit. Note: there is no SATU in Limerick — out-of-hours access there routes via Cork or Galway.",
    details: ["Weekdays 8am–5pm: 051 842 157.", "Out-of-hours: 051 848 000."],
    referral: "Via An Garda Síochána or direct self-referral.",
    contact: { phone: "051 842 157" }
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
    contact: { phone: "0800 389 4424", web: "therowan.hscni.net", address: "Antrim Area Hospital, 45 Bush Road, Antrim BT41 2RL" }
  },
  {
    id: "nexus-ni",
    name: "Nexus NI",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "Specialist counselling for sexual-abuse survivors, and the 24hr NI Domestic & Sexual Abuse Helpline.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0808 802 1414" }
  },
  {
    id: "womens-aid-ni",
    name: "Women's Aid Federation NI",
    specialty: ["dsv"],
    county: ["national"],
    blurb: "Domestic violence support and refuge network across Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9024 9041", email: "info@womensaidni.org", address: "129 University Street, Belfast BT7 1HP" }
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
    contact: { phone: "01 215 0250", email: "info@arccancersupport.ie" }
  },
  {
    id: "cork-arc-house",
    name: "Cork ARC Cancer Support House",
    specialty: ["cancer"],
    county: ["cork-city"],
    blurb: "Free cancer support services, including for gynaecological cancers.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 427 6688" }
  },
  {
    id: "cork-cancer-care-centre",
    name: "The Cork Cancer Care Centre",
    specialty: ["cancer"],
    county: ["cork-city"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "021 4949090" }
  },
  {
    id: "recovery-haven-kerry",
    name: "Recovery Haven Kerry",
    specialty: ["cancer"],
    county: ["kerry"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "066 719 2122" }
  },
  {
    id: "solas-waterford",
    name: "Solas Cancer Support Centre Waterford",
    specialty: ["cancer"],
    county: ["waterford"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "051 304604" }
  },
  {
    id: "purple-house-bray",
    name: "Purple House Cancer Support Bray",
    specialty: ["cancer"],
    county: ["wicklow"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 286 6966" }
  },
  {
    id: "suir-haven-thurles",
    name: "Suir Haven Cancer Support Thurles",
    specialty: ["cancer"],
    county: ["tipperary"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0504 21197" }
  },
  {
    id: "hope-cancer-wexford",
    name: "Hope Cancer Support Centre Wexford",
    specialty: ["cancer"],
    county: ["wexford"],
    blurb: "Free cancer support services.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "053 923 8555" }
  },
  {
    id: "action-cancer-ni",
    name: "Action Cancer (Northern Ireland)",
    specialty: ["cancer"],
    county: ["antrim"],
    blurb: "Breast screening (ages 40–49 & 70+) and therapeutic services from 15 regional locations across NI.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9080 3344", email: "info@actioncancer.org", address: "20 Windsor Avenue, Belfast BT9 6EE" }
  },
  {
    id: "cancer-focus-ni",
    name: "Cancer Focus NI",
    specialty: ["cancer"],
    county: ["antrim"],
    blurb: "Cancer Nurseline and support services across Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "0800 783 3339", email: "nurseline@cancerfocusni.org", address: "40-44 Eglantine Avenue, Belfast BT9 6DX" }
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
    ]
  },
  {
    id: "well-woman-coolock",
    name: "Dublin Well Woman Centre (Coolock)",
    specialty: ["contraception"],
    county: ["dublin"],
    blurb: "Free Contraception Scheme access point.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 848 4511" }
  },
  {
    id: "femplus-blanchardstown",
    name: "Femplus (Blanchardstown)",
    specialty: ["contraception"],
    county: ["dublin"],
    blurb: "Free Contraception Scheme access point.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 821 0999" }
  },
  {
    id: "informing-choices-ni",
    name: "Informing Choices NI",
    specialty: ["contraception"],
    county: ["antrim"],
    blurb: "Central Access Point for reproductive healthcare information in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9031 6100", email: "info@informingchoicesni.org", address: "Ascot House, 24-31 Shaftesbury Square, Belfast BT2 7DB" }
  },
  {
    id: "common-youth-ni",
    name: "Common Youth (NI, under-25s)",
    specialty: ["contraception"],
    county: ["antrim"],
    blurb: "Sexual health service for under-25s in Northern Ireland (formerly Brook NI).",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9032 8866", email: "hello@commonyouth.com" }
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
    contact: { web: "lalecheleagueireland.com/groups" }
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
    contact: { phone: "01 404 5378", web: "anamcara.ie", address: "Tallaght, Dublin 24" }
  },
  {
    id: "ectopic-ireland",
    name: "Ectopic Ireland",
    specialty: ["loss"],
    county: ["national"],
    blurb: "Support and information specifically after an ectopic pregnancy.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "089 436 5742", web: "ectopicireland.ie" }
  },
  {
    id: "sands-ni",
    name: "Sands NI",
    specialty: ["loss"],
    county: ["national"],
    blurb: "Stillbirth and neonatal death support, with monthly local groups in Antrim, Belfast, Downpatrick, Enniskillen, Newry, North Down, and Portadown.",
    details: ["UK Sands helpline: 0808 164 3332."],
    referral: "Self-referral.",
    contact: { phone: "07740 993450", email: "NorthernIreland@sands.org.uk" }
  },

  // ---- Patchy categories: no compact national list exists (per source doc).
  // Honest pointer entries rather than fabricated county-by-county listings —
  // these are explicitly flagged as needing local knowledge / crowdsourcing. ----
  {
    id: "find-phn",
    name: "Find your local Public Health Nurse",
    specialty: ["phn"],
    county: ["national"],
    blurb: "There's no single national PHN directory — access is via your local health centre.",
    details: ["No compact public list exists for this — genuinely needs local knowledge. If you know your area's PHN contact, this is exactly the kind of thing worth reporting via the link in the footer."],
    referral: "Contact HSE Live or find your local health centre.",
    contact: { phone: "1800 700 700", web: "hse.ie" }
  },
  {
    id: "find-urology",
    name: "Find urology / urogynaecology care near you",
    specialty: ["urology"],
    county: ["national"],
    blurb: "No compact national list exists — urology services relevant to women's health (recurrent UTIs, incontinence, urogynae) sit within major hospitals per region.",
    details: ["Start with your nearest major hospital (e.g. CUH Cork, UHL Limerick, UHG Galway, or a Dublin academic hospital) or ask your GP directly."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "find-gynae-onc",
    name: "Find gynae-oncology rapid access / colposcopy care",
    specialty: ["cancer", "gynae"],
    county: ["national"],
    blurb: "No compact national list exists — these clinics are distributed across designated cancer centres and CervicalCheck colposcopy units.",
    details: ["Colposcopy after an abnormal CervicalCheck result is automatic. For a new suspected-cancer concern, ask your GP to refer you on the rapid-access pathway explicitly."],
    referral: "GP referral, flagged as rapid access; colposcopy is automatic via CervicalCheck.",
    contact: {}
  },
  {
    id: "find-breastfeeding-group",
    name: "Find your local HSE breastfeeding support group",
    specialty: ["feeding"],
    county: ["national"],
    blurb: "HSE runs breastfeeding groups searchable by county, though there's no compact master list.",
    details: [],
    referral: "Self-referral via the HSE's searchable directory.",
    contact: { web: "www2.hse.ie/services/breastfeeding-support" }
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
    specialty: ["cardiology"],
    county: ["galway"],
    blurb: "Runs the 'Women at Heart' education campaign — only 3% of Irish women surveyed (2025) could name all heart-attack warning signs, despite 1 in 4 Irish women dying from cardiovascular disease.",
    details: [
      "Women's heart-attack symptoms (jaw, neck, back pain) can differ from men's and are often missed.",
      "Runs the free Heartlink West supportline: 091 544310.",
    ],
    referral: "Self-referral for information and supports.",
    contact: { phone: "091 332999", email: "healthteam@croi.ie", address: "Croí House, Moyola Lane, Newcastle, Galway H91 FF68" }
  },
  {
    id: "irish-heart-foundation",
    name: "Irish Heart Foundation",
    specialty: ["cardiology"],
    county: ["dublin"],
    blurb: "Publishes 'Her Heart Matters' women's heart health resources, with HSE and Dept of Health support.",
    details: [],
    referral: "Self-referral for information and supports.",
    contact: { phone: "01 668 5001", email: "info@irishheart.ie", address: "17-19 Rathmines Rd Lower, Dublin D06 C780" }
  },
  {
    id: "find-chest-pain-clinic",
    name: "Find your nearest Rapid Access Chest Pain Clinic",
    specialty: ["cardiology"],
    county: ["national"],
    blurb: "Nurse-led rapid-access clinics run out of most public hospitals with a cardiology department — no single compact national list found yet.",
    details: ["Confirmed example: University Hospital Limerick offers same-week GP-referral assessment. Ask your GP whether your nearest hospital runs one."],
    referral: "GP referral.",
    contact: {}
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
    contact: { phone: "0818 252 846", email: "helpline@arthritisireland.ie" }
  },
  {
    id: "versus-arthritis-ni",
    name: "Versus Arthritis NI",
    specialty: ["rheumatology"],
    county: ["national"],
    blurb: "Information and support for arthritis and autoimmune joint conditions in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "028 9078 2940", email: "niservicesteam@versusarthritis.org" }
  },
  {
    id: "belfast-rheumatology",
    name: "Belfast Trust Rheumatology Service",
    specialty: ["rheumatology"],
    county: ["antrim"],
    blurb: "Operates across three Belfast Trust hospital sites, including inflammatory arthritis and lupus flare-management resources.",
    details: [],
    referral: "GP referral.",
    contact: { web: "belfasttrust.hscni.net" }
  },
  {
    id: "cuh-rheumatology",
    name: "Cork University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["cork-city"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "021 492 2468" }
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
    contact: { phone: "071 9820406" }
  },
  {
    id: "uhl-rheumatology",
    name: "University Hospital Limerick Rheumatology",
    specialty: ["rheumatology"],
    county: ["limerick"],
    blurb: "Public rheumatology department (Rheumatology Clinical Network hub site).",
    details: [],
    referral: "GP referral.",
    contact: { phone: "061 485215" }
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
    contact: { phone: "01 221 3130" }
  },
  {
    id: "mater-rheumatology",
    name: "Mater Misericordiae University Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 803 4141" }
  },
  {
    id: "stjames-rheumatology",
    name: "St James's Hospital Rheumatology",
    specialty: ["rheumatology"],
    county: ["dublin"],
    blurb: "Public rheumatology department.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 416 2551" }
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
    contact: {}
  },
  {
    id: "find-rheumatology",
    name: "About diagnostic delay in rheumatology",
    specialty: ["rheumatology"],
    county: ["national"],
    blurb: "Rheumatoid arthritis affects an estimated 45,000 people in Ireland (2,000+ new diagnoses/year), more commonly women, usually diagnosed between ages 30–50.",
    details: [
      "No Ireland-specific diagnostic-delay figure was found. The international benchmark for axial spondyloarthritis is a 7.4-year average delay (IMAS study, 27 countries) — women wait notably longer than men (11.2 vs 5.2 years in one cohort).",
      "Department locations/phone numbers above are current; individual consultant names change more often, so we haven't listed them.",
    ],
    referral: "GP referral.",
    contact: {},
    resources: [
      { label: "Rheumatoid arthritis — patient.info", url: "https://patient.info/bones-joints-muscles/rheumatoid-arthritis-leaflet" },
      { label: "Ankylosing spondylitis — patient.info", url: "https://patient.info/bones-joints-muscles/ankylosing-spondylitis" },
      { label: "Lupus — patient.info", url: "https://patient.info/skin-conditions/lupus-systemic-lupus-erythematosus" }
    ]
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
    contact: { phone: "01 906 1012", email: "info@migraine.ie", address: "Unit 14, Block 5, Port Tunnel Business Park, Clonshaugh, Dublin 17" },
    resources: [
      { label: "Migraine — patient.info", url: "https://patient.info/brain-nerves/migraine-leaflet" }
    ]
  },
  {
    id: "beaumont-migraine-clinic",
    name: "Beaumont Hospital Headache/Migraine Clinic",
    specialty: ["neurology"],
    county: ["dublin"],
    blurb: "Specialist headache/migraine clinic referenced by the Migraine Association.",
    details: [],
    referral: "GP referral.",
    contact: {}
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
    contact: { phone: "01 531 2983", email: "info@crohnscolitis.ie", address: "Carmichael Centre, North Brunswick Street, Dublin 7", web: "crohnscolitis.ie" }
  },
  {
    id: "stjames-gastro",
    name: "St James's Hospital Gastroenterology (also covers Tallaght & Naas)",
    specialty: ["gastro"],
    county: ["dublin", "kildare"],
    blurb: "A 3-site public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "stvincents-gastro",
    name: "St Vincent's University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "beaumont-gastro",
    name: "Beaumont Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "mater-gastro",
    name: "Mater Misericordiae University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "connolly-gastro",
    name: "Connolly Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["dublin"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "cuh-gastro",
    name: "Cork University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["cork-city"],
    blurb: "Public gastroenterology/hepatology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "mercy-cork-gastro",
    name: "Mercy University Hospital, Cork — Gastroenterology",
    specialty: ["gastro"],
    county: ["cork-city"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "uhg-gastro",
    name: "University Hospital Galway Gastroenterology",
    specialty: ["gastro"],
    county: ["galway"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "portiuncula-gastro",
    name: "Portiuncula University Hospital Gastroenterology",
    specialty: ["gastro"],
    county: ["galway"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "uhl-gastro",
    name: "University Hospital Limerick Gastroenterology",
    specialty: ["gastro"],
    county: ["limerick"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "waterford-gastro",
    name: "University Hospital Waterford Gastroenterology",
    specialty: ["gastro"],
    county: ["waterford"],
    blurb: "Public gastroenterology department.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
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
    county: ["limerick"],
    blurb: "One of 16 publicly funded chronic pain services nationally — a 2024 investigation found these clinics disproportionately treat conditions affecting more women than men (fibromyalgia, migraine, chronic pelvic pain, osteoarthritis).",
    details: [],
    referral: "GP referral.",
    contact: { address: "St Nessan's Road, Dooradoyle, Limerick V94 F858" }
  },
  {
    id: "stjohns-limerick-pain",
    name: "St John's Hospital Limerick Pain Management",
    specialty: ["pain"],
    county: ["limerick"],
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
    contact: { web: "mypainmatters.ie" }
  },
  {
    id: "stjames-pain",
    name: "St James's Hospital Pain Medicine",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "mater-pain",
    name: "Mater Misericordiae University Hospital Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "stvincents-pain",
    name: "St Vincent's University Hospital Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Multidisciplinary pain service, including a psychology-led pain management programme.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "tallaght-pain",
    name: "Tallaght University Hospital Pain Medicine",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Pain Medicine service plus the Ulysses Pain Management Programme.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 414 3104" }
  },
  {
    id: "stlukes-rathgar-pain",
    name: "St Luke's Hospital, Rathgar — Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "stcolumcilles-pain",
    name: "St Columcille's Hospital, Loughlinstown — Pain Service",
    specialty: ["pain"],
    county: ["dublin"],
    blurb: "Multidisciplinary team pain service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "01 282 5800" }
  },
  {
    id: "naas-pain",
    name: "Naas General Hospital Pain Management",
    specialty: ["pain"],
    county: ["kildare"],
    blurb: "Public chronic pain clinic, Consultant Dr Anne Heffernan.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: { phone: "045 849 884" }
  },
  {
    id: "portlaoise-pain",
    name: "Midland Regional Hospital Portlaoise Pain Service",
    specialty: ["pain"],
    county: ["laois"],
    blurb: "Listed as a public pain service by the Irish Pain Society — not independently re-confirmed.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "cuh-pain",
    name: "Cork University Hospital Pain Service",
    specialty: ["pain"],
    county: ["cork-city"],
    blurb: "Public chronic pain management service.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "mercy-cork-pain",
    name: "Mercy University Hospital, Cork — Pain Service",
    specialty: ["pain"],
    county: ["cork-city"],
    blurb: "Listed as a public pain service by the Irish Pain Society — not independently re-confirmed.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "uhg-pain",
    name: "University Hospital Galway / Merlin Park Pain Clinic",
    specialty: ["pain"],
    county: ["galway"],
    blurb: "Consultant-run chronic pain clinic.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "sligo-pain",
    name: "Sligo University Hospital Chronic Pain Unit",
    specialty: ["pain"],
    county: ["sligo"],
    blurb: "Chronic pain unit with a Sláintecare pain-management education programme.",
    details: ["Flagged as subject to a temporary closure/consultant-recruitment issue — verify current status before travelling."],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "waterford-pain",
    name: "University Hospital Waterford Pain Service",
    specialty: ["pain"],
    county: ["waterford"],
    blurb: "Listed as a public pain service by the Irish Pain Society, but a live HSE page couldn't be confirmed — public status uncertain.",
    details: [],
    referral: "GP referral, usually via Healthlink.",
    contact: {}
  },
  {
    id: "chronic-pain-ireland",
    name: "Chronic Pain Ireland",
    specialty: ["pain"],
    county: ["national"],
    blurb: "National patient advocacy charity, runs a confidential phone support service for over-18s. A 2021 national survey found 11,932 people on public chronic pain waiting lists, with severe understaffing (0.55 pain specialists per 100,000 people) and no national model of care.",
    details: ["Signposts to the HSE Counselling in Primary Care Service (8 free sessions via GP referral) for chronic-pain-related mental health support."],
    referral: "Self-referral.",
    contact: {}
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
    contact: {},
    resources: [
      { label: "Post-viral fatigue — patient.info", url: "https://patient.info/news-and-features/what-you-need-to-know-about-post-viral-fatigue" }
    ]
  },
  {
    id: "longcovid-stjames",
    name: "St James's Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["dublin"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Ciarán Bannan with Dr Aoife Laffan (neurology).",
    details: [],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "longcovid-stvincents",
    name: "St Vincent's University Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["dublin"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Stefano Savinelli.",
    details: ["A separate Mater Hospital Long Covid clinic (Dr Jack Lambert) closed in Dec 2022 when HSE funding was withdrawn — don't refer here expecting it's still running."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "longcovid-cork",
    name: "Cork University Hospital Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["cork-city"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr Katie McFaul (patients also seen by Dr Arthur Jackson).",
    details: [],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "longcovid-limerick",
    name: "University Hospital Limerick Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["limerick"],
    blurb: "One of six HSE Long Covid clinics nationally.",
    details: ["Not operational as of March 2025 due to staffing (per Long Covid Advocacy Ireland) — ask to be referred elsewhere if this hasn't changed."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "longcovid-galway",
    name: "University Hospital Galway Long Covid Clinic",
    specialty: ["longcovid"],
    county: ["galway"],
    blurb: "One of six HSE Long Covid clinics nationally, run by Dr David Gallagher (Infectious Diseases) with Dr Mike Harrison (Respiratory).",
    details: ["Referrals go to Dr Gallagher's office."],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "long-covid-advocacy-ireland",
    name: "Long Covid Advocacy Ireland (LCAI)",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Ireland's only formal Long Covid patient advocacy group, run by patients (several team members unwell themselves).",
    details: [],
    referral: "Self-referral via mailing list.",
    contact: { email: "irishlcalist@gmail.com", web: "longcovidadvocacyireland.com" }
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
    ]
  },
  {
    id: "me-advocates-ireland",
    name: "ME Advocates Ireland (MEAI)",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Volunteer-run advocacy group (founded 2017) pushing for better ME healthcare provision and HSE/Dept of Health engagement.",
    details: [],
    referral: "Self-referral.",
    contact: {}
  },
  {
    id: "me-support-ni",
    name: "M.E. Support Northern Ireland",
    specialty: ["longcovid"],
    county: ["national"],
    blurb: "Support for people with ME/CFS in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { email: "info@mesupportni.com" }
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
    ]
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
      "Correction: an earlier version of this entry listed 01 409 6739 as the general contact — that's actually a clinician-only clinical-advice voicemail, not the public line.",
    ],
    referral: "GP or consultant referral.",
    contact: { phone: "01 456 0953", email: "clinical.genetics@childrenshealthireland.ie", address: "Children's Health Ireland at Crumlin, Dublin 12" }
  },
  {
    id: "cancer-genetics-stjames",
    name: "Cancer Genetics Service, St James's Hospital",
    specialty: ["genetics", "cancer"],
    county: ["dublin"],
    blurb: "Alternative public referral point for hereditary cancer risk assessment (e.g. BRCA), via GP or your oncology team.",
    details: [],
    referral: "GP or oncology team referral.",
    contact: {}
  },
  {
    id: "lynch-syndrome-ireland",
    name: "Lynch Syndrome Ireland",
    specialty: ["genetics", "cancer"],
    county: ["national"],
    blurb: "Support for people affected by Lynch syndrome (hereditary colorectal/ovarian/endometrial cancer risk).",
    details: ["Contact details not independently verified this pass — search for their current site before relying on this."],
    referral: "Self-referral.",
    contact: {}
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
    contact: {}
  },
  {
    id: "gum-cork",
    name: "STI Clinic — South Infirmary Victoria University Hospital, Cork",
    specialty: ["sexualhealth"],
    county: ["cork-city"],
    blurb: "Free, HSE-operated STI/GUM clinic. PrEP available.",
    details: ["Mon–Fri 9am–4pm."],
    referral: "Self-referral.",
    contact: { phone: "021 496 6844" }
  },
  {
    id: "gum-limerick",
    name: "STI Clinic — University Hospital Limerick / Ennis / Nenagh",
    specialty: ["sexualhealth"],
    county: ["limerick"],
    blurb: "Free, HSE-operated STI/GUM clinic, covering Dooradoyle, Ennis General, and Nenagh General.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "061 482 382" }
  },
  {
    id: "gum-mater-dublin",
    name: "STI Clinic — Mater Hospital, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 803 2063" }
  },
  {
    id: "gum-guide-stjames",
    name: "GUIDE Clinic — St James's Hospital, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 416 2315" }
  },
  {
    id: "gum-gmhs-dublin",
    name: "Gay Men's Health Service — Meath Primary Care Centre, Dublin",
    specialty: ["sexualhealth"],
    county: ["dublin"],
    blurb: "Free, HSE-operated sexual health service.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 921 2730" }
  },
  {
    id: "gum-sligo",
    name: "STI Clinic — Sligo General Hospital",
    specialty: ["sexualhealth"],
    county: ["sligo"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "071 917 0473" }
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
    contact: { phone: "051 842 646" }
  },
  {
    id: "gum-letterkenny",
    name: "STI Clinic — Letterkenny General, Donegal",
    specialty: ["sexualhealth"],
    county: ["donegal"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "074 912 3715" }
  },
  {
    id: "gum-drogheda",
    name: "STI Clinic — Louth County / Our Lady of Lourdes, Drogheda",
    specialty: ["sexualhealth"],
    county: ["louth"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 824 1847" }
  },
  {
    id: "gum-mayo",
    name: "STI Clinic — Mayo General, Castlebar",
    specialty: ["sexualhealth"],
    county: ["mayo"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "094 902 1733 ext 3501" }
  },
  {
    id: "gum-mullingar",
    name: "STI Clinic — Midland Regional Hospital, Mullingar",
    specialty: ["sexualhealth"],
    county: ["westmeath"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 416 9830" }
  },
  {
    id: "gum-portlaoise",
    name: "STI Clinic — Midland Regional Hospital, Portlaoise",
    specialty: ["sexualhealth"],
    county: ["laois"],
    blurb: "Free, HSE-operated STI/GUM clinic.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 859 1273" }
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
    contact: { phone: "086 824 1847" }
  },
  {
    id: "sh24-roi",
    name: "sh24.ie — Free At-Home STI Testing",
    specialty: ["sexualhealth"],
    county: ["national"],
    blurb: "Free at-home STI test kits for anyone 17+ in Ireland — HIV, chlamydia, gonorrhoea, syphilis. Results by text/phone within ~72 hours.",
    details: [],
    referral: "Self-referral, order online.",
    contact: { web: "sh24.ie" }
  },
  {
    id: "sh24-ni",
    name: "sh24.org.uk — Free At-Home STI Testing (NI)",
    specialty: ["sexualhealth"],
    county: ["national"],
    blurb: "The Northern Ireland / UK equivalent of sh24.ie.",
    details: [],
    referral: "Self-referral, order online.",
    contact: { web: "sh24.org.uk" }
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
    contact: {}
  },
  {
    id: "cavan-monaghan-pelvic-physio",
    name: "Cavan Monaghan Hospital Pelvic Health Physiotherapy",
    specialty: ["pelvicphysio"],
    county: ["cavan", "monaghan"],
    blurb: "Named public pelvic-health physiotherapy service, self-referral accepted.",
    details: [],
    referral: "Self-referral, GP, or consultant referral, Mon–Fri.",
    contact: {}
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
    county: ["limerick"],
    blurb: "Treats AAA (abdominal aortic aneurysm), varicose veins, and AV fistula.",
    details: [],
    referral: "GP, consultant, PHN, or health centre referral.",
    contact: {}
  },
  {
    id: "saolta-vascular",
    name: "Saolta Vascular Services (Roscommon & Galway)",
    specialty: ["vascular"],
    county: ["roscommon", "galway"],
    blurb: "Varicose vein procedures at Roscommon University Hospital; all arterial and complex vascular surgery at Galway University Hospitals.",
    details: [],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "western-vascular-institute",
    name: "Western Vascular Institute (University Hospital Galway)",
    specialty: ["vascular"],
    county: ["galway"],
    blurb: "High-volume public/private tertiary vascular referral centre for the West.",
    details: [],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "stvincents-vascular",
    name: "St Vincent's University Hospital Vascular Surgery",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Regional referral centre for south-east Dublin, Wicklow, Wexford, Carlow, and Kilkenny. Varicose vein management including surgery, laser/radiofrequency ablation, and ClariVein.",
    details: [],
    referral: "GP referral.",
    contact: { phone: "01 221 3035", web: "stvincents.ie" }
  },
  {
    id: "beaumont-vascular",
    name: "Beaumont Hospital Vascular Service",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Vascular/endovascular arterial and venous disease.",
    details: [],
    referral: "GP referral.",
    contact: {}
  },
  {
    id: "mater-vascular",
    name: "Mater Misericordiae University Hospital Vascular Service",
    specialty: ["vascular"],
    county: ["dublin"],
    blurb: "Public vascular surgery service.",
    details: [],
    referral: "GP referral.",
    contact: {}
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
    contact: {}
  },
  {
    id: "find-vascular",
    name: "Vascular care — pregnancy-related & pelvic congestion",
    specialty: ["vascular"],
    county: ["national"],
    blurb: "Referral for varicose veins and general vascular concerns is via GP to the vascular surgery departments listed above. Pregnancy-related vascular issues and pelvic congestion syndrome are niche and typically managed via interventional radiology within the tertiary centres.",
    details: ["No dedicated Irish patient-advocacy body was found for venous/pelvic congestion conditions specifically — this is a genuine gap."],
    referral: "GP referral.",
    contact: {}
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
      "This pattern is well documented in Ireland, not just anecdotal — see 'Why this page exists' below. You are not imagining it.",
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
      "HSE SAR form and guidance: hse.ie/eng/gdpr/requesting-information-from-the-hse",
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
    ],
  },
  {
    id: "advocate",
    title: "Bringing an advocate",
    tips: [
      "You can bring a support person to any appointment, or ask to take notes yourself.",
      "The Patient Advocacy Service can support you directly through a complaint process, not just point you to the right form.",
      "Peer support through a condition-specific charity (see the directory below) can help you understand what 'normal' process actually looks like for your situation.",
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
    summary: "No dedicated hospital FOI officer. CUH's own site currently routes FOI enquiries to the HSE's central Freedom of Information process.",
    steps: [
      "State clearly that you're making the request under the Freedom of Information Act 2014.",
      "Describe the exact records you want, with as much detail as possible (service, location, approximate dates).",
      "No fee for your own personal information. Acknowledged within 10 working days, response generally within 20 working days.",
    ],
    contact: { web: "hse.ie/eng/services/yourhealthservice/info/foi/", form: "HSE FOI Request Form (PDF, on hse.ie)" },
  },
  {
    id: "cumh",
    name: "Cork University Maternity Hospital (CUMH)",
    region: "Cork",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Same as CUH — no separate CUMH FOI officer found. Requests route through the same HSE central FOI process.",
    steps: [
      "Same process as CUH (above): write under the FOI Act 2014, describe the exact records, and submit via the HSE FOI process.",
    ],
    note: "For your own maternity or health records specifically, a GDPR Subject Access Request is usually faster than FOI — see 'Accessing your records' above.",
    contact: { web: "hse.ie/eng/services/yourhealthservice/info/foi/" },
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
    summary: "Part of the Saolta University Health Care Group. No dedicated hospital FOI officer found — requests route through the HSE's central FOI process.",
    steps: [
      "Same central HSE process as CUH (above): write under the FOI Act 2014, describe the records, and submit via the HSE FOI process.",
    ],
    contact: { phone: "(091) 524 222 (hospital main line)", web: "hse.ie/eng/services/yourhealthservice/info/foi/" },
  },
  {
    id: "uhl",
    name: "University Hospital Limerick / University Maternity Hospital Limerick",
    region: "Limerick",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the UL Hospitals Group. Confirmed: FOI requests for records held by the group are directed to the HSE's central process, not the hospital directly.",
    steps: [
      "Same central HSE process as CUH (above).",
    ],
    contact: { web: "hse.ie/eng/services/yourhealthservice/info/foi/" },
  },
  {
    id: "portiuncula",
    name: "Portiuncula University Hospital",
    region: "Galway & Midlands",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the Saolta group. No dedicated FOI officer found; there is a named Data Protection Officer for GDPR/SAR requests specifically, which is the faster route for your own records.",
    steps: [
      "For FOI: same central HSE process as CUH (above).",
    ],
    note: "For your own records specifically, a GDPR Subject Access Request is usually faster — this hospital's DPO contact is ddpo.west@hse.ie.",
    contact: { web: "hse.ie/eng/services/yourhealthservice/info/foi/" },
  },
  {
    id: "portlaoise",
    name: "Midland Regional Hospital, Portlaoise",
    region: "Midlands",
    type: "hse",
    typeLabel: "HSE hospital — central process",
    summary: "Part of the Dublin Midlands Hospital Group. No dedicated FOI officer found; there is a named Data Protection Officer for GDPR/SAR requests specifically.",
    steps: [
      "For FOI: same central HSE process as CUH (above).",
    ],
    note: "For your own records specifically, a GDPR Subject Access Request is usually faster — this hospital's DPO contact is ddpo.dmlUH@hse.ie.",
    contact: { web: "hse.ie/eng/services/yourhealthservice/info/foi/" },
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
    detail: "Raise informally with staff first if you can. A formal complaint gets acknowledged within 5 working days, with an investigation report generally within 30 working days. Generally within 12 months of the event.",
    contact: { phone: "1800 424 555", email: "yoursay@hse.ie", web: "hse.ie/complaints-feedback" },
  },
  {
    id: "pas",
    step: 2,
    name: "Patient Advocacy Service",
    role: "Free, independent, confidential support making a complaint.",
    detail: "Funded by the Department of Health. Supports complaints about HSE public acute hospitals and HSE-run nursing homes, and support after a patient-safety incident. Can help you escalate further if needed.",
    contact: { web: "patientadvocacyservice.ie" },
  },
  {
    id: "ombudsman",
    step: 3,
    name: "Office of the Ombudsman",
    role: "Independent external review if you're not satisfied with how a public body handled things.",
    detail: "Cannot examine matters of clinical judgement or diagnosis, private care, or employment issues. Usually you need to have gone to the HSE first.",
    contact: { phone: "01 639 5600", web: "ombudsman.ie" },
  },
  {
    id: "medical-council",
    step: 4,
    name: "Medical Council",
    role: "Fitness-to-practise complaints about a registered doctor.",
    detail: "Anyone can make a complaint. Goes through a Preliminary Proceedings Committee, then potentially a Fitness to Practise Committee.",
    contact: { web: "medicalcouncil.ie" },
  },
  {
    id: "nmbi",
    step: 4,
    name: "Nursing & Midwifery Board of Ireland (NMBI)",
    role: "Fitness-to-practise complaints about a nurse or midwife.",
    detail: "Equivalent process to the Medical Council, for nursing and midwifery staff.",
    contact: { web: "nmbi.ie/Complaints" },
  },
  {
    id: "hiqa",
    step: 4,
    name: "HIQA",
    role: "Raise a safety or quality concern about a service.",
    detail: "HIQA sets standards and inspects services but can't investigate an individual complaint directly — raising a concern can still prompt a look at the service.",
    contact: { web: "hiqa.ie/get-touch/report-concern-or-give-feedback" },
  },
  {
    id: "hpra",
    step: 4,
    name: "HPRA",
    role: "Report a problem with a medicine or medical device.",
    detail: "Relevant for adverse reactions to medication, or device complications (e.g. vaginal mesh, contraceptive devices).",
    contact: { web: "hpra.ie" },
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
];
