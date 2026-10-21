# Claude Code brief: whole-app search and aliases (7 Oct 2026)

**Why.** `SEARCH_ALIASES` (added today in PR #88) only fires when the whole query equals a key. I ran 165 realistic queries against the live data. Baseline: **51 returned nothing** (31%) and short queries returned huge noise. Prototype matching (below) cut the zero-result list to **6 genuine content gaps**.

Baseline measured with the current rules, 7 Oct 2026. Do not quote these figures in docs; rerun the script.

## Findings (causes, in order of impact)
1. **US spellings fail.** `pediatric`, `gynecology`, `orthopedic`, `counseling`, `anesthesia`, `diarrhea`, `esophagus` all return 0, while the UK spellings return 19, 49, 19, 32 etc.
2. **Apostrophes and hyphens.** `alzheimers`, `parkinsons`, `carers allowance` return 0 because the data says `Alzheimer's`, `Parkinson's`, `Carer's Allowance`. `self harm` misses `self-harm`.
3. **Short queries match substrings.** `er` = 528 entries, `ed` = 358, `sti` = 117, `ms` = 55 (`ms` also matches inside words). The result is meaningless noise.
4. **Aliases are whole-query only,** and **tool pages ignore them** (`toolResults` filters on `q`, not `variants`).
5. **Lay terms fail:** `heart doctor`, `rash`, `bones`, `periods`, `period pain`, `teeth`, `seizure`, `insulin`, `std`, `emergency room`, `home help`, `fair deal`, `grief`, `weight loss`, `podiatrist`, `wheelchair`.
6. **Crisis phrasing returns nothing:** `self harm`, `overdose`, `want to die`. This is the highest-priority fix (see S6).
7. **Conditions are not in global search** (separate `#/conditions` page, and 66 of 104 conditions have `keywords: []`). Facilities are also separate.

## Spec
**S1. Normalise** both query and haystacks with one function: lower case, strip apostrophes (straight and curly), strip diacritics (á→a, for fadas), `&`→`and`, hyphens and slashes → space, drop other punctuation, collapse whitespace. Build normalised haystacks once at load, not per keystroke.

**S2. US→UK word map** applied at word level to the query: pediatric→paediatric, pediatrician→paediatrician, gynecology→gynaecology, gynecologist→gynaecologist, orthopedic(s)→orthopaedic(s), anesthesia/anesthetic→anaesthesia/anaesthetic, diarrhea→diarrhoea, esophagus→oesophagus, counseling/counselor→counselling/counsellor, estrogen→oestrogen, fetal→foetal, edema→oedema, behavior→behaviour, center→centre, hemorrhage→haemorrhage, anemia→anaemia, leukemia→leukaemia, tumor→tumour, program→programme, pap→smear.

**S3. Matching rules**
- Query of 3 characters or fewer: match at **word start** only.
- Multi-word query: phrase match **or** all words present (ignore single-character words).
- Aliases: apply on exact normalised key, and also when the key appears as a phrase inside a longer query.
- `SEARCH_ALIASES` must apply to entries, support orgs, general advocacy orgs **and tool pages**.

**S4. Transparency (optional, small):** when an alias or spelling map was used, show one line under the search box: "Also searched: …". Keeps the behaviour honest and debuggable.

**S5. Conditions in global search.** Add a "Conditions" results section (name, category, link to the existing condition detail route). For facilities, show a single row: "Search regulated facilities for '<q>'" linking to `#/facilities`. Do not index all facility rows.

**S6. Crisis banner: APPROVED by Elaine, 7 Oct 2026. Build as a small follow-up PR on top of the search v2 work.**
- **Where:** search results page only (`renderSearch`), as one banner **above** all result sections. Never on the home page or other routes.
- **Triggers (normalised, whole query or phrase contained in the query):** `suicide`, `self harm`, `overdose`, `want to die`, `kill myself`, `end my life`, `crisis`. Keep the list in one named constant so it is easy to review.
- **Exact wording:**
  - Line 1: `If you or someone else is in crisis or in immediate danger, support is available now.`
  - Link: `Mental Health Crisis Support ›` pointing to `#/specialty/crisis`.
- **Do not add:** phone numbers, extra copy, icons that alarm, emoji, or method-related text. The linked page already carries the helplines and the 999/112 entry.
- **Style:** reuse an existing callout style; calm, readable, high contrast; must work with the app's calm mode and print rules; announce politely to screen readers (`role="note"`, not `role="alert"`).
- **Search results below the banner stay as they are.**
- **Tests:** add the seven triggers to `scripts/search-audit-queries.txt` plus a check that the banner renders for each trigger and does not render for `dad`, `crisis pregnancy` (phrase contains `crisis` but is a pregnancy-support search: decide with Elaine whether it should trigger; default is that it should not, so match only when `crisis` is the whole query) or `er`.
- **Record:** CHANGELOG entry, and one line in `REVIEW.md` stating the wording was approved by Elaine on 7 Oct 2026.

**S7. Alias table v2.** Rule unchanged: **every target must already appear as text in entries, orgs, tool pages or conditions.** An alias routes people to existing pages; it never adds a claim. The prototype uses these (all verified to return hits on 7 Oct 2026, but some targets are broad, so Elaine should skim):

| Query | Targets | Query | Targets |
|---|---|---|---|
| emergency room | emergency department | heart doctor | cardiology |
| er / ed / a and e | emergency department | rash | dermatology, skin |
| bones | orthopaedics, osteoporosis, bone health | periods | gynaecology, endometriosis |
| period pain | endometriosis, gynaecology | cervical check | cervical, smear |
| panic attacks | anxiety, mental health | self harm | suicide, crisis |
| overdose | suicide, crisis, drug | want to die | suicide, crisis |
| dyslexia, dyspraxia | neurodiversity | toddler | child |
| abortion | unplanned pregnancy | std | sti, sexual health |
| insulin | diabetes | blood pressure | hypertension, cardiology |
| cholesterol | lipid, cardiology | seizure | epilepsy |
| teeth | dental, dentist | braces | orthodon, dental |
| carers allowance | carer | disability allowance | disability |
| home help | home support | fair deal | nursing home |
| grief | bereavement | quit smoking | smoking |
| weight loss | obesity, weight management | speech therapy | speech and language |
| chiropodist, podiatrist | podiatr | wheelchair | assistive, mobility, seating |
| refugee | migrant, international protection | same sex | new and expectant parents, fertility |

Keep the existing parenting aliases from PR #88. Check `wheelchair`, `er`/`ed` and `abortion` results by eye: they are the broadest or most sensitive. For `abortion`, route only to the existing HSE unplanned-pregnancy wording, with no editorialising.

**S8. Conditions keywords.** Populate `keywords` for the 66 conditions with `[]` using lay synonyms of the **condition name only** (e.g. high blood pressure ↔ hypertension, Alzheimer's ↔ dementia). Propose as a table for Elaine to skim. No clinical claims.

**S9. Guard rails (add to `scripts/validate-data.js` / CI).**
- Every alias target must match at least one entry, org, tool page or condition, else fail.
- `scripts/search-audit.js` and `scripts/search-audit-queries.txt` are a reference prototype and query list. Adopt them as a regression test: the zero-result list must not grow, and no query in the list may return more than about 150 entry hits.
- Fix the prototype quirk: ignore single-character terms in the multi-term AND rule (it makes `a&e` over-match).

## Content gaps the audit exposed (add to `GAPS.md`, research only)
Still zero after the matching fix, so they are missing content, not search faults:
- **Interpreter access** (already listed in Pass 6; this confirms demand).
- **Second opinion** (rights and routes), likely a toolkit page via HSE/Citizens Information.
- **Long-term illness scheme** wording (search `long term illness` returns nothing; `LTI` may exist under a different phrase).
- **HSE Live** as a searchable item (the number appears only inside the complaints tool facts, not as a findable entry).
- **NI 111** and similar: do not add from memory; verify first.
- Spellings `anesthesia`, `diarrhea`, `esophagus` have no content to land on; leave as is.
- Untested: Irish-language queries (e.g. `dochtúir`, `ospidéal`). Add 10 to the query list and report. Do not translate content.

## Hard rules
Branch and PR only. `node --check` on `app.js` and `data.js` before and after. Official sources only for any new text. No new network requests. Recount entries with a script. End with one `CHANGELOG.md` entry and one "Recent AI sessions" line. Finish with a full-document consistency check: grep for the old `searchVariants` and `toolResults` code paths so nothing still bypasses the new matching, rerun the audit, and rerun `scripts/validate-data.js` and tests.
