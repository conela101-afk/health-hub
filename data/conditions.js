// Condition information directory — Tier 1 (official) + a starter set of
// Tier 2 (charity) deep links, kept as a standalone CONDITIONS array
// alongside FACILITIES, not merged into the specialty ENTRIES in data.js:
// this is "search a condition name -> link out to who explains it",
// a different shape from "find a service that treats it".
//
// Provenance and a real limitation, both worth reading before adding to
// this list: this file was seeded from a single research pass (see
// Health_Hub_Condition_Directory__All-Island_Source_Verification_and_Link-Out_Architecture.md)
// whose author fetched and confirmed the URLs below live. The session that
// built this feature could not re-verify them itself — outbound network
// access was fully blocked for the whole session (same constraint hit
// during the Phase D facilities build, see data/sources/README.md) — so
// every condition-specific deep link here is exactly the URL that source
// document wrote out in full, never a slug guessed by pattern-matching.
// That's why most entries below have an empty `links` array: for any
// condition where the source only gave a URL *pattern* (e.g. "HSE uses
// /conditions/[slug]/") rather than the fully-written confirmed URL, we
// deliberately did not fabricate the slug. Those conditions still get a
// landing page via the universal official-search links every entry
// carries (rendered in app.js, not stored per-row) — HSE's condition
// index, nidirect's A-Z, and an NHS.uk site search for the condition name.
// Before adding a new condition-specific link, verify it live first (site
// convention, README.md) and add `checked: "D Mon YYYY"`.
const CONDITIONS = [
  // Cardiology / Cardiovascular
  { id: "heart-attack", name: "Heart attack", category: "Cardiology", keywords: ["MI", "myocardial infarction", "acute coronary syndrome", "ACS"], links: [
    { org: "HSE.ie", url: "https://www2.hse.ie/conditions/heart-attack/", scope: "ROI" },
    { org: "Irish Heart Foundation", url: "https://irishheart.ie/heart-and-stroke-conditions-a-z/heart-attack/", scope: "ROI" },
    { org: "British Heart Foundation", url: "https://www.bhf.org.uk/informationsupport/conditions/heart-attack", scope: "UK/NI" },
    { org: "NHS", url: "https://www.nhs.uk/conditions/heart-attack/", scope: "UK/NI" }
  ] },
  { id: "angina", name: "Angina", category: "Cardiology", keywords: [], links: [
    { org: "British Heart Foundation", url: "https://www.bhf.org.uk/informationsupport/conditions/angina", scope: "UK/NI" }
  ] },
  { id: "atrial-fibrillation", name: "Atrial fibrillation", category: "Cardiology", keywords: ["AF", "AFib"], links: [
    { org: "patient.info", url: "https://patient.info/heart-health/atrial-fibrillation-leaflet", scope: "UK/international" }
  ] },
  { id: "heart-failure", name: "Heart failure", category: "Cardiology", keywords: ["CHF"], links: [
    { org: "Irish Heart Foundation", url: "https://irishheart.ie/heart-and-stroke-conditions-a-z/heart-failure", scope: "ROI" }
  ] },
  { id: "heart-valve-disease", name: "Heart valve disease", category: "Cardiology", keywords: [], links: [
    { org: "Irish Heart Foundation", url: "https://irishheart.ie/heart-and-stroke-conditions-a-z/heart-valve-disease/", scope: "ROI" }
  ] },
  { id: "congenital-heart-disease", name: "Congenital heart disease", category: "Cardiology", keywords: ["CHD"], links: [
    { org: "Irish Heart Foundation", url: "https://irishheart.ie/heart-and-stroke-conditions-a-z/congenital-heart-disease-chd/", scope: "ROI" }
  ] },
  { id: "hypertension", name: "Hypertension (high blood pressure)", category: "Cardiology", keywords: ["HTN", "high BP"], links: [] },
  { id: "cardiomyopathy", name: "Cardiomyopathy", category: "Cardiology", keywords: [], links: [] },
  { id: "atherosclerosis", name: "Atherosclerosis", category: "Cardiology", keywords: [], links: [] },
  { id: "dvt", name: "Deep vein thrombosis", category: "Cardiology", keywords: ["DVT"], links: [] },
  { id: "pulmonary-embolism", name: "Pulmonary embolism", category: "Cardiology", keywords: ["PE"], links: [] },
  { id: "peripheral-arterial-disease", name: "Peripheral arterial disease", category: "Cardiology", keywords: ["PAD"], links: [] },
  { id: "high-cholesterol", name: "High cholesterol", category: "Cardiology", keywords: [], links: [] },
  { id: "pericarditis", name: "Pericarditis", category: "Cardiology", keywords: [], links: [] },
  { id: "endocarditis", name: "Endocarditis", category: "Cardiology", keywords: [], links: [] },

  // Respiratory
  { id: "asthma", name: "Asthma", category: "Respiratory", keywords: [], links: [] },
  { id: "copd", name: "Chronic obstructive pulmonary disease", category: "Respiratory", keywords: ["COPD", "emphysema", "chronic bronchitis"], links: [
    { org: "Asthma + Lung UK", url: "https://www.asthmaandlung.org.uk/conditions/copd-chronic-obstructive-pulmonary-disease", scope: "UK/NI" },
    { org: "HSE.ie", url: "https://www2.hse.ie/conditions/copd/", scope: "ROI" }
  ] },
  { id: "bronchiectasis", name: "Bronchiectasis", category: "Respiratory", keywords: [], links: [] },
  { id: "cystic-fibrosis", name: "Cystic fibrosis", category: "Respiratory", keywords: ["CF"], links: [] },
  { id: "pulmonary-hypertension", name: "Pulmonary hypertension", category: "Respiratory", keywords: ["PH", "PAH"], links: [] },
  { id: "pulmonary-fibrosis", name: "Pulmonary fibrosis", category: "Respiratory", keywords: ["IPF"], links: [] },
  { id: "sleep-apnoea", name: "Sleep apnoea", category: "Respiratory", keywords: [], links: [] },
  { id: "pneumonia", name: "Pneumonia", category: "Respiratory", keywords: [], links: [] },
  { id: "sarcoidosis", name: "Sarcoidosis", category: "Respiratory", keywords: [], links: [] },
  { id: "alpha-1-antitrypsin-deficiency", name: "Alpha-1 antitrypsin deficiency", category: "Respiratory", keywords: [], links: [] },
  { id: "mesothelioma", name: "Mesothelioma", category: "Respiratory", keywords: [], links: [] },

  // Endocrinology
  { id: "type-1-diabetes", name: "Type 1 diabetes", category: "Endocrinology", keywords: ["T1DM"], links: [
    { org: "Diabetes UK", url: "https://www.diabetes.org.uk/about-diabetes/type-1-diabetes", scope: "UK/NI" }
  ] },
  { id: "type-2-diabetes", name: "Type 2 diabetes", category: "Endocrinology", keywords: ["T2DM"], links: [] },
  { id: "gestational-diabetes", name: "Gestational diabetes", category: "Endocrinology", keywords: [], links: [] },
  { id: "hypothyroidism", name: "Hypothyroidism (underactive thyroid)", category: "Endocrinology", keywords: [], links: [] },
  { id: "hyperthyroidism", name: "Hyperthyroidism (overactive thyroid)", category: "Endocrinology", keywords: [], links: [] },
  { id: "addisons-disease", name: "Addison's disease", category: "Endocrinology", keywords: [], links: [] },
  { id: "cushings-syndrome", name: "Cushing's syndrome", category: "Endocrinology", keywords: [], links: [] },
  { id: "acromegaly", name: "Acromegaly", category: "Endocrinology", keywords: [], links: [] },
  { id: "pcos", name: "Polycystic ovary syndrome", category: "Endocrinology", keywords: ["PCOS"], links: [] },

  // Rheumatology / MSK
  { id: "rheumatoid-arthritis", name: "Rheumatoid arthritis", category: "Rheumatology", keywords: ["RA"], links: [
    { org: "Versus Arthritis", url: "https://versusarthritis.org/about-arthritis/conditions/rheumatoid-arthritis/", scope: "UK/NI" }
  ] },
  { id: "osteoarthritis", name: "Osteoarthritis", category: "Rheumatology", keywords: ["OA"], links: [
    { org: "Versus Arthritis", url: "https://versusarthritis.org/about-arthritis/conditions/osteoarthritis/", scope: "UK/NI" }
  ] },
  { id: "gout", name: "Gout", category: "Rheumatology", keywords: ["gouty arthritis"], links: [
    { org: "Versus Arthritis", url: "https://versusarthritis.org/about-arthritis/conditions/gout/", scope: "UK/NI" },
    { org: "HSE.ie", url: "https://www2.hse.ie/conditions/gout/", scope: "ROI" }
  ] },
  { id: "fibromyalgia", name: "Fibromyalgia", category: "Rheumatology", keywords: [], links: [
    { org: "Versus Arthritis", url: "https://versusarthritis.org/about-arthritis/conditions/fibromyalgia/", scope: "UK/NI" }
  ] },
  { id: "lupus", name: "Lupus", category: "Rheumatology", keywords: ["SLE"], links: [] },
  { id: "psoriatic-arthritis", name: "Psoriatic arthritis", category: "Rheumatology", keywords: [], links: [] },
  { id: "ankylosing-spondylitis", name: "Ankylosing spondylitis", category: "Rheumatology", keywords: [], links: [] },
  { id: "polymyalgia-rheumatica", name: "Polymyalgia rheumatica", category: "Rheumatology", keywords: ["PMR"], links: [] },
  { id: "back-pain", name: "Back pain", category: "Rheumatology", keywords: [], links: [] },
  { id: "osteoporosis", name: "Osteoporosis", category: "Rheumatology", keywords: [], links: [] },

  // Neurology
  { id: "epilepsy", name: "Epilepsy", category: "Neurology", keywords: [], links: [] },
  { id: "multiple-sclerosis", name: "Multiple sclerosis", category: "Neurology", keywords: ["MS"], links: [] },
  { id: "parkinsons-disease", name: "Parkinson's disease", category: "Neurology", keywords: ["PD"], links: [] },
  { id: "motor-neurone-disease", name: "Motor neurone disease", category: "Neurology", keywords: ["MND", "ALS", "amyotrophic lateral sclerosis", "Lou Gehrig's disease"], links: [
    { org: "IMNDA", url: "https://www.imnda.ie/", scope: "ROI" },
    { org: "MND Association", url: "https://www.mndassociation.org/", scope: "UK/NI" }
  ] },
  { id: "migraine", name: "Migraine", category: "Neurology", keywords: [], links: [] },
  { id: "dementia", name: "Dementia / Alzheimer's disease", category: "Neurology", keywords: [], links: [] },
  { id: "stroke", name: "Stroke / TIA", category: "Neurology", keywords: ["transient ischaemic attack"], links: [] },
  { id: "guillain-barre-syndrome", name: "Guillain-Barré syndrome", category: "Neurology", keywords: [], links: [] },
  { id: "huntingtons-disease", name: "Huntington's disease", category: "Neurology", keywords: [], links: [] },
  { id: "peripheral-neuropathy", name: "Peripheral neuropathy", category: "Neurology", keywords: [], links: [] },
  { id: "cluster-headache", name: "Cluster headache", category: "Neurology", keywords: [], links: [] },

  // Gastroenterology
  { id: "crohns-disease", name: "Crohn's disease", category: "Gastroenterology", keywords: ["IBD", "CD"], links: [] },
  { id: "ulcerative-colitis", name: "Ulcerative colitis", category: "Gastroenterology", keywords: ["IBD", "UC"], links: [] },
  { id: "ibs", name: "Irritable bowel syndrome", category: "Gastroenterology", keywords: ["IBS"], links: [] },
  { id: "coeliac-disease", name: "Coeliac disease", category: "Gastroenterology", keywords: [], links: [] },
  { id: "diverticular-disease", name: "Diverticular disease", category: "Gastroenterology", keywords: [], links: [] },
  { id: "gord", name: "Acid reflux (GORD)", category: "Gastroenterology", keywords: ["GORD", "GERD"], links: [] },
  { id: "gallstones", name: "Gallstones", category: "Gastroenterology", keywords: [], links: [] },
  { id: "pancreatitis", name: "Pancreatitis", category: "Gastroenterology", keywords: [], links: [] },
  { id: "liver-disease", name: "Liver disease / cirrhosis", category: "Gastroenterology", keywords: [], links: [] },

  // Renal
  { id: "chronic-kidney-disease", name: "Chronic kidney disease", category: "Renal", keywords: ["CKD"], links: [] },
  { id: "acute-kidney-injury", name: "Acute kidney injury", category: "Renal", keywords: ["AKI"], links: [] },
  { id: "polycystic-kidney-disease", name: "Polycystic kidney disease", category: "Renal", keywords: [], links: [] },
  { id: "kidney-stones", name: "Kidney stones", category: "Renal", keywords: [], links: [] },
  { id: "glomerulonephritis", name: "Glomerulonephritis", category: "Renal", keywords: [], links: [] },

  // Oncology
  { id: "breast-cancer", name: "Breast cancer", category: "Oncology", keywords: [], links: [] },
  { id: "lung-cancer", name: "Lung cancer", category: "Oncology", keywords: [], links: [] },
  { id: "bowel-cancer", name: "Bowel cancer", category: "Oncology", keywords: ["colorectal cancer"], links: [] },
  { id: "prostate-cancer", name: "Prostate cancer", category: "Oncology", keywords: [], links: [] },
  { id: "skin-cancer", name: "Skin cancer / melanoma", category: "Oncology", keywords: ["melanoma"], links: [] },
  { id: "leukaemia", name: "Leukaemia", category: "Oncology", keywords: [], links: [] },
  { id: "lymphoma", name: "Lymphoma", category: "Oncology", keywords: [], links: [] },
  { id: "myeloma", name: "Myeloma", category: "Oncology", keywords: [], links: [] },
  { id: "ovarian-cancer", name: "Ovarian cancer", category: "Oncology", keywords: [], links: [] },
  { id: "cervical-cancer", name: "Cervical cancer", category: "Oncology", keywords: [], links: [] },
  { id: "pancreatic-cancer", name: "Pancreatic cancer", category: "Oncology", keywords: [], links: [] },
  { id: "bladder-cancer", name: "Bladder cancer", category: "Oncology", keywords: [], links: [] },
  { id: "kidney-cancer", name: "Kidney cancer", category: "Oncology", keywords: [], links: [] },
  { id: "head-and-neck-cancer", name: "Head and neck cancer", category: "Oncology", keywords: [], links: [] },

  // Mental Health
  { id: "depression", name: "Depression", category: "Mental Health", keywords: [], links: [] },
  { id: "anxiety", name: "Anxiety / generalised anxiety disorder", category: "Mental Health", keywords: ["GAD"], links: [] },
  { id: "bipolar-disorder", name: "Bipolar disorder", category: "Mental Health", keywords: [], links: [] },
  { id: "schizophrenia", name: "Schizophrenia", category: "Mental Health", keywords: [], links: [] },
  { id: "ocd", name: "Obsessive-compulsive disorder", category: "Mental Health", keywords: ["OCD"], links: [] },
  { id: "ptsd", name: "Post-traumatic stress disorder", category: "Mental Health", keywords: ["PTSD"], links: [] },
  { id: "eating-disorders", name: "Eating disorders", category: "Mental Health", keywords: [], links: [] },
  { id: "personality-disorders", name: "Personality disorders", category: "Mental Health", keywords: ["BPD"], links: [] },
  { id: "postnatal-depression", name: "Postnatal depression", category: "Mental Health", keywords: [], links: [] },
  { id: "adhd", name: "ADHD", category: "Mental Health", keywords: ["ADHD"], links: [] },
  { id: "autism", name: "Autism", category: "Mental Health", keywords: [], links: [] },

  // Rare / Genetic
  { id: "muscular-dystrophy", name: "Muscular dystrophy", category: "Rare / Genetic disease", keywords: [], links: [] },
  { id: "haemophilia", name: "Haemophilia", category: "Rare / Genetic disease", keywords: [], links: [] },
  { id: "sickle-cell-disease", name: "Sickle cell disease", category: "Rare / Genetic disease", keywords: [], links: [] },
  { id: "thalassaemia", name: "Thalassaemia", category: "Rare / Genetic disease", keywords: [], links: [] },
  { id: "phenylketonuria", name: "Phenylketonuria", category: "Rare / Genetic disease", keywords: ["PKU"], links: [] },

  // Dermatology
  { id: "eczema", name: "Eczema", category: "Dermatology", keywords: [], links: [] },
  { id: "psoriasis", name: "Psoriasis", category: "Dermatology", keywords: [], links: [] },

  // Allergy / Immunology
  { id: "anaphylaxis", name: "Anaphylaxis", category: "Allergy / Immunology", keywords: [], links: [] },
  { id: "food-allergy", name: "Food allergy", category: "Allergy / Immunology", keywords: [], links: [] }
];

// Static, non-guessed URLs shown on every condition's page regardless of
// whether that condition has its own verified deep link above — this is
// what actually delivers the doc's "Tier 1 guarantees a landing page for
// almost any keyword" promise without fabricating per-condition slugs.
// NHS_SEARCH_URL is templated (the ?q= site-search pattern is itself
// confirmed live in the source doc's medication section, §C), everything
// else here is a fixed, doc-confirmed index/portal page.
const CONDITION_OFFICIAL_LINKS = {
  hse: { org: "HSE.ie Health A-Z", url: "https://www2.hse.ie/conditions/", note: "Browse the ROI official index — search or scroll to your condition" },
  nidirect: { org: "nidirect Health Conditions A-Z", url: "https://www.nidirect.gov.uk/services/health-conditions-a-z", note: "Official NI government index" },
  nhsSearch: (name) => ({ org: "NHS.uk", url: `https://www.nhs.uk/search/results?q=${encodeURIComponent(name)}`, note: "NHS.uk site search for this condition" })
};

// Medication patient-information-leaflet search — a live user-typed query
// against regulator-approved leaflet databases, not a stored per-drug URL,
// so the site's "verify before publishing" rule applies to these query
// patterns (all four confirmed live in the source doc, §C) rather than to
// every possible drug name.
const MEDICINE_SEARCH_TARGETS = [
  { id: "hpra", org: "HPRA Find a Medicine", scope: "ROI", url: (q) => `https://www.hpra.ie/homepage/medicines/medicines-information/find-a-medicine/results?query=${encodeURIComponent(q)}`, note: "Irish regulator — default for ROI" },
  { id: "medicines-ie", org: "medicines.ie", scope: "ROI", url: () => `https://www.medicines.ie/`, note: "No query-string search — use the site's own search box for the product or active ingredient" },
  { id: "emc", org: "emc (electronic Medicines Compendium)", scope: "UK/NI", url: (q) => `https://www.medicines.org.uk/emc/search?q=${encodeURIComponent(q)}`, note: "UK regulator-approved leaflets — default for NI" },
  { id: "mhra", org: "MHRA Products", scope: "UK/NI", url: (q) => `https://products.mhra.gov.uk/?search=${encodeURIComponent(q)}`, note: "UK regulator database — fallback if emc has no match" },
  { id: "nhs-medicines", org: "NHS medicines A-Z", scope: "UK/NI", url: (q) => `https://www.nhs.uk/search/results?q=${encodeURIComponent(q)}`, note: "Plain-language how-to-take-it guidance, not the formal leaflet" }
];
