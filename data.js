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
];

const COUNTIES = [
  { id: "cork-city",  label: "Cork City" },
  { id: "cork-north", label: "North Cork" },
  { id: "cork-west",  label: "West Cork" },
  { id: "national",   label: "National (covers Cork)" },
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
    specialty: ["obs", "gynae"],
    county: ["cork-city"],
    blurb: "Bleeding or pain in early pregnancy, suspected miscarriage.",
    details: [
      "Located at Kinsale Road Clinic. Mon–Fri, 08:00–13:00.",
      "By appointment; GP or CUMH referral.",
      "Ward 2 South is the dedicated pregnancy loss & gynaecology ward for inpatient care."
    ],
    referral: "GP or CUMH referral.",
    contact: { phone: "Via CUMH switchboard", address: "Kinsale Road Clinic, Cork" }
  },
  {
    id: "cumh-loss",
    name: "Pregnancy Loss / Bereavement Team",
    specialty: ["obs"],
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
    specialty: ["gynae"],
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
    id: "text-50808",
    name: "Text 50808",
    specialty: ["mh"],
    county: ["national"],
    blurb: "Free, 24/7 text support for anyone in crisis or emotional distress. HSE-funded.",
    details: ["Text HELLO to 50808 to start a conversation."],
    referral: "Self-referral, no cost.",
    contact: { phone: "Text HELLO to 50808" }
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
    id: "lll-ireland",
    name: "La Leche League Ireland",
    specialty: ["feeding"],
    county: ["national"],
    blurb: "Local breastfeeding support groups and telephone support.",
    details: ["Find your nearest group at lalecheleagueireland.com/groups"],
    referral: "Self-referral.",
    contact: { web: "lalecheleagueireland.com" }
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
];

const ADVOCACY_TIPS = [
  "Get everything in writing where you can. If a call promises a referral or review date, follow up by email or patient portal message confirming what was said.",
  "Name the pathway explicitly. 'Rapid access', 'Specialist Perinatal Mental Health Team', 'suspected ovarian cancer' — the exact wording on a referral affects triage. Ask your GP to use it.",
  "Keep a simple log: date, who you spoke to, what was said, what was promised. This is invaluable if you need to escalate.",
  "Know the complaints route: HSE 'Your Service Your Say' is the formal channel for a hospital or community service complaint — useful when something has gone wrong, not just for venting.",
  "You can ask for a copy of your own records or referral letters at any time — you're entitled to them.",
  "If a referral seems to have gone missing, ring and ask directly whether it was received and where it sits in triage — don't assume 'no news' means it's progressing.",
  "Bring someone with you, or ask to take notes, for appointments where you expect to feel overwhelmed or dismissed.",
];
