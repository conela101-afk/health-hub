# Claude Code brief: inclusive parenting language (7 Oct 2026)

**Problem.** Parenting, feeding and perinatal labels assume the parent is a mother. That excludes fathers, non-birthing partners, same-sex couples, adoptive and foster parents, and trans and non-binary parents.

**Scope.** User-facing wording only. Do not change entry `id`s, specialty `id`s (`parenting`, `feeding`, `mh`, `loss`, `obs`) or hash routes (`#/specialty/parenting`). Change labels and blurbs only.

**Method.** Scanned `app.js`, `index.html`, `tools.js`, `data.js`, `data/conditions.js`, `data/facilities.js`, `README.md` and `manifest.json`. Line numbers are as of today; locate each item by its string, as lines will shift.

## Hard rules (from project instructions)
- Branch and PR only. Never push to `main`. `node --check` on `app.js` and `data.js` before and after, and check `data.js` file size.
- Official sources only. Do not add entries or contact details from memory.
- Never quote an entry count. Recount with a script.
- Where an entry's wording comes from its source page, stay faithful to the source. Do not generalise a factual claim beyond what the page says.

## A. Change (our wording)

| # | Where | Current | Proposed |
|---|---|---|---|
| A1 | `data.js` ~L58 specialty label | `Parenting & New Motherhood` | `New & Expectant Parents` |
| A2 | `app.js` ~L350 home pill | `Parenting & new motherhood` | `New & expectant parents` |
| A3 | `app.js` ~L352 home pill | `Breastfeeding support` | `Infant feeding & breastfeeding support` (specialty label at `data.js` ~L21 is already `Breastfeeding & Infant Feeding`, so leave it) |
| A4 | `data.js` ~L60 specialty label | `Perinatal & Maternal Mental Health` | `Perinatal Mental Health` (perinatal depression and anxiety also affect fathers and partners) |
| A5 | `data.js` ~L2173, entry `mbu-status` blurb | `...mothers needing inpatient mental health care are admitted without their baby.` | `...people who need inpatient mental health care after giving birth are admitted without their baby.` Keep the entry **name** "Mother & Baby Unit status": it is the official service name. |
| A6 | `data.js` ~L347, entry `nurture` name | `Nurture — Maternal Mental Health Counselling` | If "Maternal Mental Health Counselling" is our descriptor, not Nurture's own name, use `Nurture — Perinatal Mental Health Counselling`. Check the source page first. |
| A7 | `data.js` ~L2698, entry `friends-of-breastfeeding` blurb | `Mum2Mum peer-support groups plus a one-to-one "Breastfeeding Buddy" scheme pairing you with an experienced mother...` | Keep `Mum2Mum` (it is the programme's own name). Re-read the page. If it is open to any parent, say "an experienced peer supporter". If it is mother-only, say so factually. Do not generalise unverified. |

**Note on A1/A2:** "New & Expectant Parents" is agreed (Elaine, 7 Oct). The specialty also holds antenatal and postnatal entries (Cuidiú, Nurture), so check that they stay discoverable from the specialty page and from search (a `pregnancy`/`antenatal` alias if the search mechanism supports aliases).

## B. Leave as is (accurate to source or proper names)
- `Mother & Baby Unit` (official service name) and `Mother and baby home` (historical institutions, `data.js` ~L7021).
- `Coombe Women & Infants`, `Dublin Well Woman Centre`, `Her Heart Matters` (campaign name), `Mum2Mum`, `Our Mother of Mercy` and all surnames in `facilities.js`. These are proper names. The `facilities.js` hits for foster/baby/mother are false positives from surnames; the adoption hits are the RQIA "Adoption Agency" type, which is correct.
- NI breastfeeding statistic "9 in 10 mothers stopping before they intended to" (~L2724). It is a PHA statistic about mothers.
- `female urology` (~L314), `Cedar (female)` ward (~L1443) and the UTI pharmacy service "females aged 16 to 64" (~L6420). These are clinical or official service descriptions.
- `Treoir` ("parents not married to or living with each other"), `Cuidiú` ("parent-to-parent"), `Family Nurse Partnership` ("first-time parents") and `Postnatal depression` in `conditions.js`. Already neutral.
- Women's-health strand framing (maternity, gynae, endometriosis, menopause). Women-specific framing is correct there per the existing README rule.
- No gendered pronouns for users were found in `app.js`, `tools.js`, `conditions.js` or `data.js`.

## C. Gaps to research (do not build from memory)
These are content gaps, not wording fixes. Add them to `GAPS.md` as research items. Do not write entries until sourced and approved.
1. **Fathers and non-birthing partners:** perinatal mental health support, and parental/paternity leave and benefit rights (Citizens Information, gov.ie, nidirect).
2. **Adoptive and foster parents:** post-placement support, adoption leave and benefit, and the statutory bodies (Adoption Authority of Ireland, Tusla, HSC Trust adoption services). Tusla and AAI are not on the approved-host list. **Ask Elaine before adding either host.**
3. **Same-sex couples and fertility:** public AHR eligibility and the legal position on parentage and surrogacy, from HSE and gov.ie only. State rights as administrative information only, never legal claims.
4. **Search aliases:** if `search` has a keyword or alias mechanism, add `dad`, `father`, `partner`, `adoption`, `foster`, `LGBTQ+ parents` and `chestfeeding` so these users can find the right pages. If no such mechanism exists, report it rather than building one.

## D. Possible duplicate (outside scope, flag only)
`nurture` (~L345, `mh`) and `nurture-pnd` (~L1638, `parenting`, `mh`) both look like the same organisation. Check and report. Do not merge without Elaine's approval.

## E. Standing rule (add to `AI_RULES.md` and the "Keep language general" bullet in `README.md`)
> Parenting, feeding and perinatal wording is parent-neutral by default ("parents", "new parents", "people who give birth"). Use "mother/mum" only where it is an official service or organisation name, or an accurate source statistic. Follow the official source's own phrasing. Do not generalise a factual claim beyond what the source says.

## F. After editing: full-document consistency check (mandatory)
1. Grep the whole repo for every old string (`New Motherhood`, `new motherhood`, `Maternal Mental`, `Breastfeeding support`, `mothers needing`) across `app.js`, `data.js`, `README.md`, `scripts/`, `sw.js` and `manifest.json`. Zero live hits expected. Historical `CHANGELOG.md` entries stay untouched.
2. Run `scripts/validate-data.js`, `scripts/test-validate-data.js`, `scripts/test-aon-dates.js` and `node --check` on `app.js`, `data.js` and `tools.js`.
3. Recount entries per affected specialty (`parenting`, `feeding`, `mh`) with a script before and after. Counts must be identical, since labels changed, not entries. Do not quote the numbers in docs.
4. Confirm every `#/specialty/...` pill and link still resolves, and that any test or doc referring to a label was updated.
5. Follow the existing convention for bumping the service-worker cache version if `app.js` or `data.js` changed.
6. End with one `CHANGELOG.md` entry and one "Recent AI sessions" line.

## Not reviewed
`Cork-Womens-Health-Pocket-Guide.docx` (separate asset, not part of the PWA build). Review it separately for the same issue.
