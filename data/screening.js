// "Screening: who is invited": national screening programmes (ROI and NI), one row per
// programme and jurisdiction. Standalone layer, like data/vaccines.js and data/costs.js.
// Validate: node scripts/validate-screening.js
//
// Every row is verify: true until Elaine signs it off. The source page for each row was
// opened in a browser on 2026-10-08 (the `opened` field); ages, intervals and invitation
// rules are copied from that page and nothing else. Where a page does not give a figure
// (for example the NI AAA and diabetic eye intervals) the row says so and links out.
// No phone numbers or email addresses are stored: use the linked page.
// Screening is for people without symptoms; the page-level note says to contact a GP.
//
// Fields: id, programme, jurisdiction (ROI|NI), kind (cancer|eye|vascular), who (plain
// words), interval (string or null), how_invited, if_outside (what the page says if you
// are outside the age range or overdue; optional), cost (optional; only where the page
// states it), note (optional), compare (id of the other jurisdiction's row), volatile
// (bool + volatile_reason), source_url, source_name, opened, last_verified, verify.
const SCREENING_LAST_VERIFIED = "2026-10-08";
const SCREENING_AGE_NOTE = "Age ranges and intervals can change; check the programme page before relying on them.";

const SCREENING_KIND_LABELS = { cancer: "Cancer screening", eye: "Eye screening", vascular: "Vascular screening" };

const SCREENING = [
  // ---------- Republic of Ireland (National Screening Service, HSE) ----------
  { id: "roi-bowelscreen", programme: "BowelScreen", jurisdiction: "ROI", kind: "cancer",
    who: "Anyone aged 57 to 71 who does not have symptoms of bowel cancer.",
    interval: "If your result is normal, you get your next home test kit in the post 2 years later.",
    how_invited: "A free home test kit that checks a poo sample for tiny traces of blood. You contact the programme to order your first kit, even without a letter.",
    cost: "Free.",
    compare: "ni-bowel", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www2.hse.ie/conditions/bowel-screening/about/who-for/", source_name: "HSE: What bowel screening is and who it is for" },

  { id: "roi-breastcheck", programme: "BreastCheck", jurisdiction: "ROI", kind: "cancer",
    who: "Women aged 50 to 69 who have no symptoms.",
    interval: "Every 2 to 3 years.",
    how_invited: "A free national breast screening programme. The page says it offers longer or group appointments and information in braille and international languages.",
    cost: "Free.",
    compare: "ni-breast", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www2.healthservice.hse.ie/organisation/breastcheck/", source_name: "HSE National Screening Service: BreastCheck" },

  { id: "roi-cervicalcheck", programme: "CervicalCheck", jurisdiction: "ROI", kind: "cancer",
    who: "Women and anyone aged 25 to 65 with a cervix.",
    interval: "Every 3 years for ages 25 to 29 and every 5 years for ages 30 to 65. Some people need screening more often, for example every year with persistent HPV, after a colposcopy or after treatment for abnormal cells.",
    how_invited: "Book with a GP or clinic registered with CervicalCheck. You do not have to be a patient there. You can check when you are next due on the cervical screening register.",
    cost: "Free.",
    compare: "ni-cervical", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www2.hse.ie/conditions/cervical-screening/appointment/next-how-often/", source_name: "HSE: Check when you next need cervical screening and how often" },

  { id: "roi-diabetic-retinascreen", programme: "Diabetic RetinaScreen", jurisdiction: "ROI", kind: "eye",
    who: "People aged 12 or older with type 1 or type 2 diabetes.",
    interval: "For most people, once a year. With no retinopathy in your last 2 screenings, the next is in 2 years.",
    how_invited: "You register with a form signed by your GP, or ask your GP, practice nurse, dietitian or eye doctor to register you. You are then sent an invitation to a local screening centre.",
    cost: "Free.",
    compare: "ni-diabetic-eye", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www2.hse.ie/conditions/diabetic-retina-screening/about/", source_name: "HSE: About Diabetic RetinaScreen" },

  // ---------- Northern Ireland (nidirect) ----------
  { id: "ni-bowel", programme: "Bowel cancer screening", jurisdiction: "NI", kind: "cancer",
    who: "People aged 60 to 74 who are registered with a GP.",
    interval: "Every two years until you reach 74.",
    how_invited: "A test kit is posted to you and you complete it at home, so your GP needs your correct address.",
    if_outside: "If you are outside this age range, have a family history of bowel cancer, or are worried about symptoms or changes in your bowel movements, the page says to make an appointment with your GP.",
    compare: "roi-bowelscreen", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www.nidirect.gov.uk/articles/bowel-cancer-screening", source_name: "nidirect: Bowel cancer screening" },

  { id: "ni-breast", programme: "Breast screening", jurisdiction: "NI", kind: "cancer",
    who: "Women aged 50 to 70 who are registered with a GP and have no signs or symptoms of breast disease.",
    interval: "Every three years. Eligible women should be invited for the first time before their 53rd birthday.",
    how_invited: "An invitation is sent automatically if you are registered with a GP.",
    if_outside: "After 70 you stop receiving invitations. The page says you can arrange an appointment by contacting your local screening unit. If you are worried about a breast problem or have a family history of breast cancer, contact your GP.",
    compare: "roi-breastcheck", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www.nidirect.gov.uk/articles/breast-screening-overview", source_name: "nidirect: Breast screening, an overview" },

  { id: "ni-cervical", programme: "Cervical screening", jurisdiction: "NI", kind: "cancer",
    who: "Women aged 25 to 64 who are registered with a GP and have no symptoms.",
    interval: "Every three years for ages 25 to 49, and every five years for ages 50 to 64.",
    how_invited: "An invitation letter is posted when it is time to book. Most screening is done in a GP surgery, and you can ask for a female health professional when booking.",
    if_outside: "The page says cervical screening is not for anyone with cervical cancer symptoms; contact your GP practice rather than waiting for your next invitation.",
    compare: "roi-cervicalcheck", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www.nidirect.gov.uk/articles/cervical-screening", source_name: "nidirect: Cervical screening" },

  { id: "ni-aaa", programme: "Abdominal aortic aneurysm (AAA) screening", jurisdiction: "NI", kind: "vascular",
    who: "Men registered with a GP, invited in the year they turn 65.",
    interval: "Not stated in the section on who is invited.",
    how_invited: "An ultrasound scan of the abdomen. Your invitation gives the time, date and place in your Trust area.",
    if_outside: "If you are a man over 65 who has not been screened, the page says to contact the central screening office. Women, and people under 65 with a close relative who has had an AAA, are told to ask their GP about a scan; the page says that is not part of the screening programme.",
    volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www.nidirect.gov.uk/articles/abdominal-aortic-aneurysm-screening", source_name: "nidirect: Abdominal aortic aneurysm screening" },

  { id: "ni-diabetic-eye", programme: "Diabetic eye screening", jurisdiction: "NI", kind: "eye",
    who: "People aged 12 or over who are registered with a GP as having diabetes.",
    interval: "The page says you will be invited \"when you are due\" and gives no number of years.",
    how_invited: "The programme sends an invitation. You can change the date or time with the screening office or online using the instructions in your letter.",
    note: "The page says a routine eyesight test at an optician does not detect diabetic retinopathy, so you still need screening if you have diabetes.",
    compare: "roi-diabetic-retinascreen", volatile: true, volatile_reason: SCREENING_AGE_NOTE,
    source_url: "https://www.nidirect.gov.uk/articles/diabetic-eye-screening", source_name: "nidirect: Diabetic eye screening" },
];

// Fields shared by every row.
SCREENING.forEach(r => { r.opened = "2026-10-08"; r.last_verified = SCREENING_LAST_VERIFIED; r.verify = true; });
