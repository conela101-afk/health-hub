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
  { id: "cardiology", label: "Cardiology" },
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
  { id: "ophthalmology", label: "Ophthalmology & Eye Care" },
  { id: "dermatology", label: "Dermatology & Skin" },
  { id: "respiratory", label: "Respiratory Medicine & CF" },
  { id: "ent", label: "ENT & Audiology" },
  { id: "diabetes", label: "Endocrinology & Diabetes" },
  { id: "nephrology", label: "Nephrology & Kidney" },
  { id: "haematology", label: "Haematology & Blood Disorders" },
  { id: "orthopaedics", label: "Orthopaedics" },
  { id: "adultmh", label: "Mental Health Services (General Adult)" },
  { id: "dental", label: "Dental & Oral Health" },
  { id: "allergy", label: "Allergy & Immunology" },
  { id: "palliative", label: "Palliative & End-of-Life Care" },
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
    sector: "private",
    provider: "The Menopause Hub",
    blurb: "Private menopause clinic — an option if you can pay and don't want to wait for a public complex-menopause clinic referral.",
    details: [
      "Three clinics: Mount Merrion, Co. Dublin; Santry, Dublin 9; and Rosewood, Ballincollig, Cork.",
      "Self-referral — no GP letter needed. Consultation fees apply; check current pricing directly.",
      "Virtual consultations also available.",
    ],
    referral: "Self-referral, book online or by phone.",
    contact: { phone: "01 210 7948 (Mount Merrion) / 01 485 3066 (Santry) / 021 242 7122 (Cork)", email: "info@themenopausehub.ie", web: "themenopausehub.ie" }
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
    contact: { phone: "021 4542807", email: "info@bonsecours.ie", web: "bonsecours.ie/services/gynaecology" }
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
    contact: { phone: "085 864 5371", email: "BSCMenopauseCare@bonsecours.ie", web: "bonsecours.ie/services/womens-health", address: "Bon Secours Hospital, Western Road Entrance, Cork, T12 DV56" }
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
    contact: { phone: "021 494 1910", email: "breastcarecentre@bonsecours.ie", address: "Bon Secours Hospital, Western Road Entrance, Cork, T12 DV56" }
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
    contact: { phone: "061 426100", email: "bslinfo@bonsecours.ie", address: "Towlerton, Ballysimon, Limerick, V94 9D36" }
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
    contact: { web: "bonsecours.ie/services/womens-health" }
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
    contact: { phone: "01 806 5300", email: "drbarryappointments@outlook.com", address: "Glasnevin Hill, Glasnevin, Dublin 9, D09 YN97" }
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
    contact: { web: "bonsecours.ie/services/womens-health" }
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
    contact: { phone: "021 601 3200", email: "ereferralscork@materprivate.ie", web: "materprivate.ie/our-services/womens-health", address: "Mater Private Network, Citygate, Mahon, Cork, T12 K199" }
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
    contact: { phone: "021 601 3200", email: "ereferralscork@materprivate.ie", web: "materprivate.ie/our-services/womens-health/menopause-clinic", address: "Mater Private Network, Citygate, Mahon, Cork, T12 K199" }
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
    contact: { phone: "1800 123 456", email: "ereferrals@materprivate.ie", web: "materprivate.ie/our-services/womens-health/breast-surgery", address: "Cancer Centre, Mater Private Network, Eccles Street, Dublin 7, D07 WKW8", extra: "From outside Ireland: +353 (0)51 595 110" }
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
    contact: { phone: "01 293 8684", email: "womenscentre@beaconhospital.ie", web: "beaconhospital.ie/department-service/womens-centre/", address: "Beacon Hospital, Sandyford, Dublin 18, D18 AK68", extra: "Fax: 01 293 8641" }
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
    contact: { phone: "01 293 8686", web: "beaconhospital.ie/contact/", address: "Beacon Hospital, Sandyford, Dublin 18, D18 AK68", extra: "Fax: 01 293 8641" }
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
    contact: { phone: "01 578 4414", email: "WomensHealthCentre@blackrockhealth.com", web: "blackrockhealth.com/womens-health-centre", address: "2-5 Warrington Place, Dublin 2" }
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
      "Number below is the clinic's general switchboard — ask to be directed to gynaecology or a named consultant.",
    ],
    referral: "GP or consultant referral letter required.",
    contact: { phone: "091 785 000", web: "galwayclinic.com", address: "Doughiska, Galway, H91 HHT0" }
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
    contact: { phone: "01 645 9171", email: "info@hermitageclinic.ie", address: "Old Lucan Road, Dublin 20" }
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
    contact: { phone: "028 9066 7878", email: "info@kingsbridgeprivatehospital.com", web: "kingsbridgeprivatehospital.com/services/womens-health/", address: "801-815 Lisburn Road, Belfast BT9 7GX" }
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
    contact: { phone: "028 9066 1212", email: "info@uic.org", web: "ulsterindependentclinic.com/services/gynaecology", address: "245 Stranmillis Road, Belfast BT9 5JH" }
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
    contact: { phone: "028 9066 1212", email: "info@uic.org", web: "ulsterindependentclinic.com/services/pelvic-health", address: "245 Stranmillis Road, Belfast BT9 5JH" }
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
    contact: { phone: "056 777 5275", web: "upmc.ie/services/womens-health", address: "Freshford Road, Kilkenny, R95 D370" }
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

  // ---- Ophthalmology & Eye Care ----
  {
    id: "rveeh-dublin",
    name: "Royal Victoria Eye and Ear Hospital",
    specialty: ["ophthalmology", "ent"],
    county: ["dublin"],
    blurb: "Ireland's national referral centre for eye and ENT conditions, founded 1895.",
    details: [],
    referral: "GP or consultant referral.",
    contact: { address: "Adelaide Road, Dublin 2" }
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
    contact: { phone: "1800 45 45 55", email: "access@diabeticretinascreen.ie", web: "hse.ie/diabeticretinascreen" }
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
    contact: {}
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
    contact: { web: "fightingblindness.ie" }
  },
  {
    id: "irish-guide-dogs",
    name: "Irish Guide Dogs for the Blind",
    specialty: ["ophthalmology"],
    county: ["national"],
    blurb: "Guide dogs and mobility support for people who are blind or vision-impaired.",
    details: [],
    referral: "Self-referral.",
    contact: { email: "info@guidedogs.ie" }
  },
  {
    id: "feach",
    name: "Féach",
    specialty: ["ophthalmology", "parenting"],
    county: ["national"],
    blurb: "National support organisation for parents of children who are blind or vision-impaired.",
    details: [],
    referral: "Self-referral.",
    contact: {}
  },
  {
    id: "childvision",
    name: "ChildVision",
    specialty: ["ophthalmology", "parenting"],
    county: ["dublin"],
    blurb: "National education centre for blind and vision-impaired children.",
    details: [],
    referral: "Self-referral or via early-intervention services.",
    contact: {}
  },
  {
    id: "rnib-ni",
    name: "RNIB Northern Ireland",
    specialty: ["ophthalmology"],
    county: ["antrim"],
    blurb: "Support and advocacy for blind and vision-impaired people in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "rnib.org.uk" }
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
    contact: { phone: "01 486 6280", email: "info@irishskin.ie" }
  },
  {
    id: "find-dermatology",
    name: "About dermatology waiting times",
    specialty: ["dermatology"],
    county: ["national"],
    blurb: "Dermatology access is in genuine crisis on both sides of the border, and no clean public directory of individual hospital dermatology departments exists — this is the strongest documented waiting-list evidence found in this pass.",
    details: [
      "ROI: the outpatient dermatology waiting list rose 87.6% from 29,955 (Dec 2015) to 56,203 (Dec 2023) — 84% adults, 16% children — plus 1,109 on the inpatient list (NTPF data).",
      "NI: 49,048 people were waiting for a first dermatology outpatient appointment as of Sept 2025 across the five Trusts; 8,382 had waited more than four years.",
      "Skin cancer is Ireland's most common cancer (13,000+ new cases/year, expected to double by 2040); melanoma 5-year survival is 92% with early diagnosis, and treating late-stage melanoma costs over 25x more than early-stage.",
      "GP e-referral to pigmented-lesion (suspicious mole) clinics exists and is faster than routine dermatology referral if melanoma is suspected — ask your GP specifically about this pathway.",
    ],
    referral: "GP referral; ask about urgent pigmented-lesion referral if a mole or skin change is suspicious.",
    contact: {}
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
    contact: { phone: "01 209 4684", email: "cfnurses@svuh.ie", extra: "SVUH CF nurses line, for adult CF queries" }
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
    contact: { phone: "01 496 2433", email: "info@cfireland.ie", web: "cfireland.ie" }
  },
  {
    id: "asthma-society-ireland",
    name: "Asthma Society of Ireland",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Represents an estimated 380,000+ people with asthma in Ireland.",
    details: ["Runs the joint Asthma/COPD Adviceline with COPD Support Ireland; also has a WhatsApp nurse line."],
    referral: "Self-referral to the Adviceline.",
    contact: { phone: "1800 44 54 64", extra: "WhatsApp nurse: 086 059 0132", address: "42–43 Amiens Street, Dublin 1" }
  },
  {
    id: "copd-support-ireland",
    name: "COPD Support Ireland",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Local support groups for people living with COPD, including \"Singing for Better Lung Health\" groups.",
    details: ["Partners with the Asthma Society on the shared Asthma/COPD Adviceline (1800 44 54 64)."],
    referral: "Self-referral.",
    contact: { web: "copd.ie" }
  },
  {
    id: "ilfa",
    name: "Irish Lung Fibrosis Association (ILFA)",
    specialty: ["respiratory"],
    county: ["dublin"],
    blurb: "Support for the estimated 5,000 people in Ireland living with lung fibrosis (1,000+ new cases a year). No national registry exists.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "086 871 5264", email: "info@ilfa.ie", address: "Carmichael Centre, 4 North Brunswick Street, Dublin 7" }
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
    contact: { web: "hse.ie" }
  },
  {
    id: "chime-deafhear",
    name: "Chime (formerly DeafHear)",
    specialty: ["ent"],
    county: ["national"],
    blurb: "National charity for people who are deaf or hard of hearing.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "chime.ie" }
  },
  {
    id: "irish-deaf-society",
    name: "Irish Deaf Society",
    specialty: ["ent"],
    county: ["dublin"],
    blurb: "National organisation of and for the Deaf community.",
    details: [],
    referral: "Self-referral.",
    contact: { phone: "01 860 1878", email: "info@irishdeafsociety.ie" }
  },
  {
    id: "rnid-ni",
    name: "RNID (Northern Ireland)",
    specialty: ["ent"],
    county: ["antrim"],
    blurb: "Support and advocacy for people who are deaf or have hearing loss in Northern Ireland.",
    details: [],
    referral: "Self-referral.",
    contact: { web: "rnid.org.uk" }
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
    contact: { phone: "028 9066 6646", email: "n.ireland@diabetes.org.uk", extra: "UK helpline: 0345 123 2399", address: "First Floor Suite 1, Lisburn Square House, 10 Haslems Lane, Lisburn BT28 1TW" }
  },
  {
    id: "find-thyroid-support",
    name: "Thyroid conditions — a support gap",
    specialty: ["diabetes"],
    county: ["national"],
    blurb: "No dedicated, registered Republic-of-Ireland thyroid patient charity currently exists — a genuine gap.",
    details: [
      "For thyroid cancer specifically, the Irish Cancer Society Support Line can help: 1800 200 700, supportline@irishcancer.ie.",
      "ThyCa Ireland runs an informal Dublin-based support group.",
      "The UK's British Thyroid Foundation runs a helpline open to callers from Ireland: 01423 810 093.",
      "An informal \"Thyroid Support Ireland\" Facebook group exists (~5,300 members) — useful for peer support, but it's not a charity and isn't clinically moderated.",
    ],
    referral: "GP referral for diagnosis/treatment; self-referral to the support options above.",
    contact: {}
  },
  {
    id: "find-pcos-ireland",
    name: "PCOS — Ireland-specific data is thin",
    specialty: ["diabetes", "gynae"],
    county: ["national"],
    blurb: "Polycystic ovary syndrome is one of the most common hormonal conditions in women of reproductive age, and is often undiagnosed for a long time.",
    details: [
      "International cohort studies document substantial diagnostic delay (roughly a year of help-seeking, plus around 7 more months to diagnosis) — but this is international, not Irish-specific, data.",
      "PCOS is linked to higher long-term risk of type 2 diabetes and cardiovascular disease, which is why it's listed here as well as under gynaecology.",
      "Private clinics (e.g. Women's Health Raheny) advertise shorter waits for PCOS assessment than the public system — private, fees apply, not independently verified by us.",
    ],
    referral: "GP referral for public assessment (via gynaecology or endocrinology).",
    contact: {}
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
    contact: { phone: "01 620 5306", email: "info@ika.ie", address: "Donor House, Block 43A, Park West, Dublin 12" }
  },
  {
    id: "find-dialysis-units",
    name: "Dialysis units nationally",
    specialty: ["nephrology"],
    county: ["national"],
    blurb: "Haemodialysis units exist at Beaumont (the national kidney transplant centre), the Mater, St Vincent's, Tallaght (AMNCH), Cork University Hospital, Mayo General (Castlebar), and Cavan General, plus private units (e.g. Beacon, Northern Cross).",
    details: ["For the full current list, the Irish Nephrology Society and Irish Kidney Association both maintain dialysis-centre maps — check theirs directly, as unit capacity and locations do change."],
    referral: "Nephrology consultant referral.",
    contact: { web: "irishnephrology.ie/renal-units" }
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
    contact: {}
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
    contact: {}
  },
  {
    id: "irish-haemophilia-society",
    name: "Irish Haemophilia Society",
    specialty: ["haematology"],
    county: ["national"],
    blurb: "Represents people with haemophilia, von Willebrand disease, and other inherited bleeding disorders, since 1968.",
    details: ["The National Haemophilia Centre has historically been based at St James's Hospital."],
    referral: "Self-referral.",
    contact: { web: "haemophilia.ie" }
  },
  {
    id: "find-blood-disorder-support",
    name: "Non-malignant blood disorders — a support gap",
    specialty: ["haematology"],
    county: ["national"],
    blurb: "Beyond haemophilia, there's no dedicated Irish patient body for rarer non-cancer blood disorders (aplastic anaemia, MDS, PNH, MPNs) — a genuine gap.",
    details: [
      "People in Ireland with these conditions largely rely on international bodies: AAMDSIF (aplastic anaemia/MDS), MPN-specific networks, and Anthony Nolan for stem-cell transplant support.",
      "Blood cancers are covered separately by the Irish Cancer Society.",
    ],
    referral: "Haematology consultant referral.",
    contact: {}
  },
  {
    id: "belfast-haematology",
    name: "Belfast Trust — Regional Haematology",
    specialty: ["haematology"],
    county: ["antrim"],
    blurb: "Northern Ireland's regional haematology service.",
    details: ["Blood-cancer support in NI is largely via UK bodies: Leukaemia UK, Blood Cancer UK, Anthony Nolan, and Cancer Focus NI."],
    referral: "GP or consultant referral.",
    contact: {}
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
    contact: { phone: "01 814 0400", address: "Cappagh Road, Finglas, Dublin 11" }
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
    contact: {}
  },
  {
    id: "kilcreene-orthopaedic-hospital",
    name: "Kilcreene Orthopaedic Hospital",
    specialty: ["orthopaedics"],
    county: ["kilkenny"],
    blurb: "Orthopaedic hospital serving the South East.",
    details: ["Some services were announced to be transferring towards University Hospital Waterford from 2019 — current status unconfirmed, phone ahead."],
    referral: "GP or orthopaedic consultant referral.",
    contact: {}
  },
  {
    id: "musgrave-park-hospital",
    name: "Musgrave Park Hospital — Regional Centre for Orthopaedic Surgery",
    specialty: ["orthopaedics"],
    county: ["antrim"],
    blurb: "Northern Ireland's regional orthopaedic centre — around 44 consultant orthopaedic surgeons, ~35,000 outpatient and ~9,000 inpatient/day-case appointments a year. Houses the Primary Joint Unit for hip/knee replacement.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { address: "Belfast" }
  },
  {
    id: "swah-enniskillen-orthopaedics",
    name: "South West Acute Hospital — Orthopaedics",
    specialty: ["orthopaedics"],
    county: ["fermanagh"],
    blurb: "Western Trust hospital running high-volume day-case joint-replacement lists.",
    details: [],
    referral: "GP or orthopaedic consultant referral.",
    contact: { address: "Enniskillen" }
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
    contact: { web: "ntpf.ie" }
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
    contact: { phone: "1800 111 888" }
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
    contact: {}
  },
  {
    id: "belfast-cmht-selfreferral",
    name: "Belfast Trust — Community Mental Health Team Self-Referral",
    specialty: ["adultmh"],
    county: ["antrim"],
    blurb: "Belfast is unusual in allowing self-referral directly to a CMHT by phone, rather than requiring a GP referral.",
    details: [],
    referral: "Self-referral by phone.",
    contact: { phone: "028 9504 0346" }
  },
  {
    id: "northern-trust-adult-mh-teams",
    name: "Northern Trust — Adult Mental Health Teams",
    specialty: ["adultmh"],
    county: ["antrim"],
    blurb: "Runs 9 adult mental health teams (ages 18–64), Monday–Friday 9am–5pm.",
    details: ["NI-wide mental health waiting lists have grown substantially — one Trust has cited waits of around 5 years for CMHT assessment in some cases."],
    referral: "GP referral via the Referral Management / Clinical Communication Gateway.",
    contact: {}
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
    contact: {}
  },
  {
    id: "treatment-benefit-scheme",
    name: "Treatment Benefit Scheme (dental)",
    specialty: ["dental"],
    county: ["national"],
    blurb: "PRSI-based scheme (run by the Department of Social Protection, not the HSE) giving a free annual oral exam plus a subsidised scale-and-polish.",
    details: ["The scheme pays a €42 subsidy toward cleaning/periodontal treatment; you pay the balance (roughly €15)."],
    referral: "Self-referral to any participating dentist — check your PRSI eligibility first.",
    contact: { web: "gov.ie" }
  },
  {
    id: "hse-public-dental-clinics",
    name: "HSE Public Dental Clinics",
    specialty: ["dental"],
    county: ["national"],
    blurb: "Routine and emergency dental care, plus special-care dentistry, based in primary care centres — with hospital referral where needed.",
    details: [],
    referral: "Contact your Local Health Office to register.",
    contact: {}
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
    contact: { web: "hscbusiness.hscni.net" }
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
    contact: {}
  },
  {
    id: "chi-paediatric-allergy",
    name: "Children's Health Ireland — Paediatric Allergy",
    specialty: ["allergy", "parenting"],
    county: ["dublin"],
    blurb: "Paediatric allergy service prioritising anaphylaxis, food allergy, and allergic rhino-conjunctivitis.",
    details: [],
    referral: "GP referral via Healthlink.",
    contact: {}
  },
  {
    id: "ifan",
    name: "Irish Food Allergy Network (IFAN)",
    specialty: ["allergy", "parenting"],
    county: ["national"],
    blurb: "Clinical and education resources for food allergy, including the \"egg ladder\" reintroduction guidance.",
    details: [],
    referral: "Self-referral for information.",
    contact: {}
  },
  {
    id: "regional-immunology-service-ni",
    name: "Regional Immunology Service Northern Ireland",
    specialty: ["allergy"],
    county: ["antrim"],
    blurb: "Specialist allergy/immunology assessment for Northern Ireland, including a General Anaesthetic Allergy Clinic run jointly with anaesthetics.",
    details: [],
    referral: "GP or consultant referral.",
    contact: {}
  },
  {
    id: "find-adult-allergy-support",
    name: "Adult allergy support — a gap",
    specialty: ["allergy"],
    county: ["national"],
    blurb: "No large, dedicated national charity for adult allergy patients was confirmed to exist in Ireland — a genuine gap.",
    details: [
      "Food-allergy-specific support and education is available via IFAN.",
      "The Asthma Society of Ireland's Adviceline also covers allergic asthma and hay fever.",
      "Anaphylaxis Ireland's current operational status could not be confirmed — verify it's still active before relying on it.",
    ],
    referral: "GP or consultant referral for clinical care.",
    contact: {}
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
    contact: {}
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
    contact: { phone: "1800 200 700" }
  },
  {
    id: "lauralynn",
    name: "LauraLynn",
    specialty: ["palliative", "parenting"],
    county: ["dublin"],
    blurb: "Ireland's only children's hospice.",
    details: ["Make-A-Wish Ireland is a separate charity that also supports children with life-threatening conditions."],
    referral: "Referral via your child's medical team.",
    contact: {}
  },
  {
    id: "aiihpc-palliative-hub",
    name: "All-Ireland Institute of Hospice and Palliative Care (AIIHPC)",
    specialty: ["palliative"],
    county: ["national"],
    blurb: "Runs the Palliative Hub, an all-island resource for patients, families, and professionals.",
    details: [],
    referral: "Self-referral for information.",
    contact: {}
  },
  {
    id: "marie-curie-hospice-belfast",
    name: "Marie Curie Hospice Belfast",
    specialty: ["palliative"],
    county: ["antrim"],
    blurb: "Hospice and Hospice Care at Home (Belfast & South Eastern Trusts).",
    details: [],
    referral: "GP, district nurse, or hospital team referral.",
    contact: { phone: "028 9088 2000", email: "mcccbelfastreferrals@mariecurie.org.uk", extra: "Marie Curie UK support line: 0800 090 2309", address: "1A Kensington Road, Belfast BT5 6NF" }
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
      "For your own routine records, a GDPR Subject Access Request is usually the faster route — see 'Accessing your records' above.",
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
    note: "For your own maternity or health records specifically, a GDPR Subject Access Request is usually faster than FOI — see 'Accessing your records' above. This mailbox is CUMH-specific — don't reuse it for other hospitals.",
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
    id: "ni-health-costs",
    name: "Help with health costs (dental, optical, travel)",
    jurisdiction: "ni",
    blurb: "NHS prescriptions are free for everyone in Northern Ireland — no scheme needed. Help with dental, optical and travel costs depends on your circumstances; apply with form HC1 if you're not automatically covered.",
    links: [
      { label: "Who qualifies & how to claim — nidirect", url: "https://www.nidirect.gov.uk/articles/help-health-costs" },
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
