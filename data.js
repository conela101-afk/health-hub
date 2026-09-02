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
];

const COUNTIES = [
  { id: "cork-city",  label: "Cork City" },
  { id: "cork-north", label: "North Cork" },
  { id: "cork-west",  label: "West Cork" },
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
    contact: { phone: "Via CUMH switchboard", address: "Kinsale Road Clinic, Cork" }
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
    contact: { address: "Lee Clinic, CUMH, Wilton, Cork" }
  },
  {
    id: "national-endo-framework",
    name: "National Endometriosis Framework — Care Pathway",
    specialty: ["endo", "gynae"],
    county: ["national"],
    blurb: "Defines the GP → regional hub → supra-regional pathway for endometriosis care nationally.",
    details: [
      "Regional (moderate cases): Rotunda, Coombe, University Hospital Limerick.",
      "Supra-regional (complex/Stage 4 cases): Tallaght University Hospital and CUMH (Lee Clinic, Cork).",
      "Over 1,150 new patients seen in 2024; Coombe waiting time roughly 6–7 months at last check.",
    ],
    referral: "Start with your GP — ask them to reference the National Endometriosis Framework in the referral.",
    contact: { web: "hse.ie" }
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
    referral: "GP referral.",
    contact: { address: "CUMH, Wilton, Cork" }
  },
  {
    id: "national-menopause-clinics",
    name: "HSE Specialist Menopause Clinics (other regions)",
    specialty: ["menopause"],
    county: ["national"],
    blurb: "The other five HSE complex-menopause clinics, alongside CUMH in Cork.",
    details: [
      "National Maternity Hospital (Holles St, Dublin) — first to open, Dec 2021.",
      "Also at: Nenagh, Rotunda (Dublin), Coombe (Dublin), University Hospital Galway.",
      "For complex cases with comorbidities; most women are managed by their GP.",
    ],
    referral: "GP referral.",
    contact: { web: "hse.ie" }
  },
  {
    id: "cork-fertility-hub",
    name: "Cork Regional Fertility Hub",
    specialty: ["fertility"],
    county: ["cork-city"],
    blurb: "One of six Regional Fertility Hubs offering publicly funded assisted human reproduction (AHR) pathways.",
    details: [
      "Publicly funded AHR available since September 2023: GP → hub → HSE-approved private clinic.",
      "Cork is also home to the first National Advanced AHR Centre.",
    ],
    referral: "GP referral to the hub.",
    contact: { web: "hse.ie" }
  },
  {
    id: "national-fertility-hubs",
    name: "HSE Regional Fertility Hubs (other regions)",
    specialty: ["fertility"],
    county: ["national"],
    blurb: "The other five Regional Fertility Hubs, alongside Cork.",
    details: [
      "Dublin ×3: National Maternity Hospital, Coombe, Rotunda.",
      "Also at: Galway, Tipperary/Nenagh.",
      "Approved private clinics include Beacon CARE, Sims, Waterstone, ReproMed, Thérapie, First IVF.",
    ],
    referral: "GP referral to your nearest hub.",
    contact: { web: "hse.ie" }
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
];
