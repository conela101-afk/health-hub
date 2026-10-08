# Proposed `keywords` for conditions (7 Oct 2026) — for Elaine to skim

**Status: APPLIED 7 Oct 2026 (53 rows; the 13 rows with no alternative name stay empty).** Review the PR diff of `data/conditions.js`. 66 of 104 conditions have `keywords: []`. Each row proposes lay or alternative names for the **condition name only**: other spellings, abbreviations, and common names for the same thing. No symptoms, causes, treatments or clinical claims. Search already ignores apostrophes, hyphens and case, and maps US spellings (leukemia, hemophilia, celiac, etc.), so those are listed only where the UK spelling is not a simple map. A dash means "the name already covers it".

Approve all, strike rows, or edit. Then ask Claude Code to write them into `data/conditions.js`.

| id | Condition | Proposed keywords |
|---|---|---|
| angina | Angina | angina pectoris |
| heart-valve-disease | Heart valve disease | valve disease, leaky heart valve |
| cardiomyopathy | Cardiomyopathy | heart muscle disease |
| atherosclerosis | Atherosclerosis | hardening of the arteries |
| high-cholesterol | High cholesterol | cholesterol, hypercholesterolaemia, lipids |
| pericarditis | Pericarditis | pericardial |
| endocarditis | Endocarditis | — |
| asthma | Asthma | — |
| bronchiectasis | Bronchiectasis | — |
| sleep-apnoea | Sleep apnoea | sleep apnea, obstructive sleep apnoea, OSA |
| pneumonia | Pneumonia | chest infection |
| sarcoidosis | Sarcoidosis | — |
| alpha-1-antitrypsin-deficiency | Alpha-1 antitrypsin deficiency | alpha 1, AATD, A1AT |
| mesothelioma | Mesothelioma | — |
| gestational-diabetes | Gestational diabetes | diabetes in pregnancy, pregnancy diabetes, GDM |
| hypothyroidism | Hypothyroidism (underactive thyroid) | underactive thyroid, low thyroid, thyroid |
| hyperthyroidism | Hyperthyroidism (overactive thyroid) | overactive thyroid, thyroid |
| addisons-disease | Addison's disease | adrenal insufficiency |
| cushings-syndrome | Cushing's syndrome | — |
| acromegaly | Acromegaly | — |
| fibromyalgia | Fibromyalgia | fibro, FMS |
| psoriatic-arthritis | Psoriatic arthritis | PsA |
| ankylosing-spondylitis | Ankylosing spondylitis | axial spondyloarthritis |
| back-pain | Back pain | backache, lower back pain |
| osteoporosis | Osteoporosis | brittle bones, weak bones |
| epilepsy | Epilepsy | seizures, fits |
| migraine | Migraine | migraines |
| dementia | Dementia / Alzheimer's disease | Alzheimers, vascular dementia |
| guillain-barre-syndrome | Guillain-Barré syndrome | GBS |
| huntingtons-disease | Huntington's disease | Huntingtons chorea |
| peripheral-neuropathy | Peripheral neuropathy | neuropathy, nerve damage |
| cluster-headache | Cluster headache | cluster headaches |
| coeliac-disease | Coeliac disease | celiac |
| diverticular-disease | Diverticular disease | diverticulitis, diverticulosis |
| gallstones | Gallstones | gall stones, gallbladder stones |
| pancreatitis | Pancreatitis | — |
| liver-disease | Liver disease / cirrhosis | — |
| polycystic-kidney-disease | Polycystic kidney disease | PKD |
| kidney-stones | Kidney stones | kidney stone, renal stones |
| glomerulonephritis | Glomerulonephritis | — |
| breast-cancer | Breast cancer | cancer of the breast |
| lung-cancer | Lung cancer | cancer of the lung |
| prostate-cancer | Prostate cancer | prostate |
| leukaemia | Leukaemia | leukemia, blood cancer |
| lymphoma | Lymphoma | Hodgkin lymphoma, non Hodgkin lymphoma, blood cancer |
| myeloma | Myeloma | multiple myeloma, blood cancer |
| ovarian-cancer | Ovarian cancer | cancer of the ovary |
| cervical-cancer | Cervical cancer | cancer of the cervix |
| pancreatic-cancer | Pancreatic cancer | cancer of the pancreas |
| bladder-cancer | Bladder cancer | cancer of the bladder |
| kidney-cancer | Kidney cancer | renal cancer |
| head-and-neck-cancer | Head and neck cancer | throat cancer, mouth cancer |
| depression | Depression | low mood |
| bipolar-disorder | Bipolar disorder | manic depression |
| schizophrenia | Schizophrenia | — |
| eating-disorders | Eating disorders | anorexia, bulimia, binge eating |
| postnatal-depression | Postnatal depression | PND, postpartum depression, post natal depression |
| autism | Autism | ASD, autism spectrum disorder, autistic |
| muscular-dystrophy | Muscular dystrophy | — |
| haemophilia | Haemophilia | hemophilia |
| sickle-cell-disease | Sickle cell disease | sickle cell anaemia, sickle cell anemia |
| thalassaemia | Thalassaemia | thalassemia |
| eczema | Eczema | atopic dermatitis, dermatitis |
| psoriasis | Psoriasis | — |
| anaphylaxis | Anaphylaxis | severe allergic reaction, anaphylactic shock |
| food-allergy | Food allergy | food allergies |

Left out on purpose: symptoms (chest pain, wheeze, headache), subtypes that are different conditions (Graves', sciatica), and two-letter abbreviations that would match unrelated words (AS, MD).
