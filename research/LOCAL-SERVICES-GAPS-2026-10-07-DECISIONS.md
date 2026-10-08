# Claude Code: merge brief for pass 2 (decisions from Elaine, 8 Oct 2026)

Read `research/LOCAL-SERVICES-GAPS-2026-10-07.md` (pass 2 candidate rows) together with the pass 1 files and `LOCAL-SERVICES-PARENTING-2026-10-07-DECISIONS.md`. Pass 1 is already merged (PR #94) and the `urgent` specialty id is approved: apply it to the urgent-care and GP out-of-hours rows that have `specialty: []`.

## Decisions
- **Daisy Hill Hospital, Newry: county is Down.** Un-withhold it, add the ED row with county ["down"], and add "down" to the Southern Trust Phone First row (alongside armagh, tyrone).
- **Family Support Hub Omagh (Action for Children): approved.** Tag `voluntary`, never supporting official-service claims. Rosewood Health and Wellbeing, Omagh stays withheld until Elaine says otherwise.
- **Sligo out-of-hours: do not change.** HSE lists "Caredoc Sligo" (Markievicz PCC) but the directory has NoWDOC. Elaine is checking this herself. Leave the existing Sligo entry as it is, and do not add `roi-sligo-caredoc-sligo` until she confirms.
- **Louth out-of-hours: base is probably Drogheda.** The HSE has no Nedoc Dundalk page. Elaine thinks Drogheda is right but has not confirmed. Add `roi-louth-nedoc-drogheda` as an unverified row; flag the existing Dundalk base as unsupported in REVIEW.md rather than deleting it.

## Merge rules (unchanged)
- Every row `verify: true`, `urlStatus: "search-result"`, no `checked`. Link only: no phone, email, fee or hours.
- De-duplicate against `data.js` first. Likely duplicates: Westdoc Castlebar, Nedoc Navan, KDoc Naas, Caredoc Wexford/Enniscorthy, the Phone First rows. Where a row exists, update its source URL rather than adding a new one.
- Out-of-hours provider block: Shannondoc gets tipperary; SouthDoc stays Cork and Kerry only; Ards Minor Injury Unit marked closed; Downe Hospital revised (weekend phone-first MIU and urgent care centre, not an ED).
- NI-wide rows list the six NI counties, not "national". Use www2.hse.ie URL families.
- Add Mayo Local Health Office (link only) if PR #94 did not already; phone only after Elaine's browser check.
- Audit the phone numbers in the out-of-hours provider block (SouthDoc etc.) against the rule: keep only those copied from an opened page, and report the rest.
- Recount entries by script; never quote a count. Check file size and `node --check` before and after. Open a PR; never push to `main`.
- End with one `CHANGELOG.md` entry and one "Recent AI sessions" line.

## Still open (Elaine)
Sligo base; Louth base confirmation; browser check of every `source_url` (start with the four full-page rows); research pass 3 for community services, Down/Londonderry community services, and the Part B/C gaps.
