# Navigation redesign "Four doors" (brief, 25 Oct 2026)

Status: sections 0 to 11 received, plus an amendment (bottom of this file). Section 0 reported; PR 1 built (see CHANGELOG). Supersedes the "tab bar redesign out of scope" note in the 9 Oct navigation brief (that brief is not in the repo; only its CHANGELOG entry and the `REVIEW.md` findability test are).

Context: Elaine chose Option D from the mockups. Features are hard to find (Advocacy has seven pill tabs, some off screen; Home does not show what the app offers). A developer will review the result, so keep the structure simple and explainable.

## 0. Before you start
- Read AI_RULES.md, MASTER-BUILD-PLAN.md, the 9 Oct navigation brief, CHANGELOG.md. Confirm current phase and any conflicting in-flight work.
- The mockups were drawn from the changelog and brief, not the live code. Verify tab names, routes and component names against the repo and report differences.
- Never quote an entry count. Recount with a script.

## 1. Goal
A first-time user can reach any feature in three taps or fewer, from a Home that shows everything the app offers in plain language.

## 2. Information architecture
Four permanent doors. Every feature lives under exactly one door.
- **Find care:** specialty directory, area/county directory, conditions directory, facilities layer, waiting list pages
- **Know your rights** (renamed "What applies to you" on 25 Oct, see Decisions below): entitlements, schemes and cards selector, costs page, AON explainer
- **Take action:** complaints navigator, records builder, letter templates, discharge passport, While you wait, FOI by hospital
- **Get support:** crisis support, who to contact, support organisations, general support

Rules:
- Put a table of every existing route and its door in the PR description, so nothing is orphaned or duplicated.
- If a feature fits two doors, pick one and add a cross-link inside the page. Do not list it twice on Home.
- Existing hash routes must keep working. Add aliases or redirects, not breaking renames.

## 3. Home
Top to bottom: header (wordmark, Calm, Exit); emergency strip (999 / 112, Crisis support; keep current wording and behaviour); "Where do I start?" row linking to the guided path; search box; "Or browse everything" with 2x2 door tiles and one-line descriptions. Nothing else above the fold.

Bottom tabs: ~~Home, Find, Rights, Act, Support~~ (withdrawn, see Amendment; the tab bar is unchanged). Each door page lists its features as grouped rows, 48px minimum height.

## 4. Search
Client-side keyword and synonym matching over page titles, tool names and a small curated phrase list ("scan cancelled", "see my notes"). No AI, no network calls. Results show page name and door. Empty state links to "Where do I start?".

## 5. Where do I start?
Two questions: topic (single choice) and location (Republic of Ireland / Northern Ireland). Result: one primary next step, then "Also useful" (max 2). Static lookup table in JS. Nothing stored, nothing sent. NI results must not show ROI-only content. Build the topic list from existing tools; do not invent services.

## 6. Colour and type
Move to CSS custom properties. Proposed tokens (check against the live site and the accessibility audit before committing):
paper #F6F3EC, card #FFFFFF, line #DDD6C8, ink #1E1A2B, soft #5A5568, plum #2F1560 (anchor, buttons, headings), tint #ECE6F6, mint fill #CDEBD6 with border #9FD2B1 (fills only), green #1D6B45.
- No gradients. Flat cards, 1px borders.
- Mint #79d192 is never text on a light background.
- Keep self-hosted Fraunces (headings) and Plus Jakarta Sans (body). No new fonts, no third-party requests.
- Check Calm mode and any dark or high-contrast mode. Verify every text/background pair meets WCAG AA and report the numbers.

## 7. Hard constraints
- No AI or chatbot feature is promoted on Home, a door page or the guided path. Ask CI stays only as an optional link on Entitlements, Schemes and cards, and costs, as today, labelled "pilot chatbot, Republic of Ireland, opens in a new tab", and hidden or flagged for Northern Ireland users.
- Do NOT build the "Personal help" reserved slot from the mockup. It is a design placeholder only. Paid services are paused pending clearance. Flag any request that drifts that way.
- No new phone, email, fee or waiting-time figures. Reuse existing content only.
- No accounts, analytics, ads or third-party requests. No new storage beyond what exists.
- data.js changes go through a PR. Never push to main. Run `node --check` and a file-size check on every JS file before and after.
- Bump the service worker cache version and test offline.

## 8. Accessibility
44px minimum touch targets. Real a, button and label elements. aria-current="page" on the active tab. Visible focus, logical tab order, works at 200% zoom and with a screen reader. Respect reduced motion. Calm and Exit work on every page. Re-run the existing accessibility audit checks and put results in the PR.

## 9. Build order (separate PRs)
1) Door pages, with route aliases and the route-to-door table. 2) New Home and search. 3) Where do I start? path. 4) Colour tokens and visual refresh. Do not combine PRs 1 and 4.

## 10. Acceptance
- Every existing feature reachable from Home in three taps or fewer (route table proves it).
- Old links and bookmarks still work. Offline works after the cache update.
- No console errors, no CSP violations, no third-party requests.
- Contrast and accessibility results are in the PR.
- Ask CI is not visible on Home, a door page or the guided path.

## 11. End of session
One CHANGELOG.md entry and one "Recent AI sessions" line. Run a full consistency check on any document edited (counts, cross-references, route table). List anything assumed or not verified.

## Amendment (25 Oct 2026; supersedes sections 2 to 4 where they conflict)
- Do NOT replace or rename the existing four bottom tabs. Leave the tab bar as it is. The four doors are four hub pages reached from Home only.
- New hub routes (suggested `#/find`, `#/rights-hub`, `#/act`, `#/support`; Code chooses names that do not clash with existing routes such as `#/rights/...`). Chosen: `#/find`, `#/rights-hub`, `#/act`, `#/support`.
- Before building, generate the full route list from the router in `app.js` and `TOOL_PAGES`. Assign every route to a door or to "intentionally none" (for example `#/install`) in a table. Fail the PR if any route is unassigned (`scripts/test-doors.js`).
- Known routes to place: `#/out-of-hours`, `#/pregnancy`, `#/medicines`, `#/screening`, `#/about/screening`, `#/about/waiting-lists`, `#/vaccines`, `#/prep`, `#/log`, the Patient Passport route (`#/passport`), `#/advocacy/sar-builder`, `#/guide/after-a-death`, `#/guide/interpreting`, `#/rights/disability-children`, county and specialty pages, and the Advocacy sub-pages.
- Section 3's "Bottom tabs: Home, Find, Rights, Act, Support" is withdrawn.


---

# Section 0 report (25 Oct 2026, against `main` b43a55a)

## Phase and in-flight work
- `validate-data.js`: 828 entries (script recount; MASTER-BUILD-PLAN's 705 is stale). Service worker cache `pocket-guide-v39`.
- MASTER-BUILD-PLAN: P1 navigation "code done 9 Oct", only the three-person findability test open. P5 lists "Where do I start?" as approved in principle, needing scoping and a privacy/CSP check.
- `origin/claude/start-page`: one unmerged commit adding `#/start` (static 8-task list, `START_POINTS` in `data.js`, link in the Home guided-tools row, cache v34). Superseded by the two-question design (pending Elaine's confirmation); will conflict on `sw.js`.
- `origin/claude/health-hub-feedback-form-2ypb09`: footer feedback link and per-entry "Report a problem"; not Home.
- `nav-findability-main` and `a11y-fixes-main` are already contained in main. Open PRs on GitHub were not checked.

## Differences between mockup assumptions and live code
- Bottom tabs are Home, Specialty (`#/specialty`), Area (`#/county`), Advocacy (`#/advocacy`); active state is a `.active` class, no `aria-current`.
- Advocacy h1 is "Know your rights"; 7 tabs at `#/advocacy/{guide,templates,schemes,hospitals,contacts,orgs,general}` plus `#/advocacy/sar-builder`. Letter templates, FOI by hospital, who to contact, support orgs and general support are tabs of that one route, not separate pages.
- Tools: `#/tools/{complaints,records,schemes,waiting,discharge,aon}`. Cards selector = `#/tools/schemes`. Records builder is distinct from the SAR builder. Costs `#/costs`; AON explainer `#/rights/disability-children` (the toolkit is `#/tools/aon`).
- Waiting list pages are `#/about/waiting-lists` and `#/about/screening`; "While you wait" is `#/tools/waiting` (easy to confuse).
- Routes with no door in the brief: `#/out-of-hours`, `#/prep`, `#/passport`, `#/log`, `#/medicines`, `#/vaccines`, `#/screening`, `#/pregnancy`, `#/guide/after-a-death`, `#/guide/interpreting`, `#/install`, `#/entry/*`, `#/facilities`, `#/conditions`.
- Search already exists (`search.js` v2, `PAGES`/`TOOL_PAGES` index in `app.js`, aliases, typeahead, crisis banner).
- Home today: hero, guided-tools row, crisis and urgent banners, tiles, pills.
- No dark, high-contrast or forced-colors mode. Calm mode is a `.simple-mode` class that scales sizes only.
- Mint `#79d192` is not in the repo (accent is sage `#7DBBA1`). `styles.css` already uses `:root` custom properties; 3 gradients (lines ~294, 295, 690) to remove. `theme-color` meta is `#FAF7F4`.

## Rules the redesign touches
- Sensitive-topic privacy layer (24 Oct): pregnancy, domestic/sexual violence and private searches use neutral titles and keep their words out of the address bar and results. Home tiles, door rows and "page name and door" results must stay neutral for them. Reuse `HHSearch.isPrivateSearch`; run `scripts/test-sensitive-privacy.js` (needs Playwright).
- AskCI shows unconditionally on Entitlements, the schemes selector (`tools.js:705`) and costs (`app.js:1196`, `1518`); nothing hides it for NI and the wording differs from the required label. Both need changing. No location is stored today.
- Emergency strip: keep `crisisBannerHtml()` / `urgentCareBannerHtml()` wording and behaviour exactly.
- Baseline sizes (bytes), all pass `node --check`: data.js 716,519; app.js 133,440; tools.js 71,166; search.js 7,326; sw.js 3,973; data/conditions.js 22,462; costs.js 38,926; facilities.js 1,977,341; guides.js 7,450; pregnancy.js 10,723; screening.js 8,772; vaccines.js 10,703.

## Contrast of proposed tokens (WCAG formula)
| Text | on paper | on card | on tint | on mint |
|---|---|---|---|---|
| ink #1E1A2B | 15.3 | 17.0 | 13.9 | 13.3 |
| soft #5A5568 | 6.5 | 7.2 | 5.9 | 5.6 |
| plum #2F1560 | 13.6 | 15.0 | 12.3 | 11.8 |
| green #1D6B45 | 5.9 | 6.5 | 5.3 | 5.1 |

White on plum 15.0. All text pairs pass AA. Line #DDD6C8 on paper is 1.3:1 and mint border 1.5:1: fine decoratively, but input and button boundaries need a 3:1 border token (WCAG 1.4.11). Old mint #79d192 on paper is 1.7:1. Coral, sand and "-deep" variants and Calm mode still need re-checking on the new background.

## Open decisions for Elaine
1. Supply section 9 and the 9 Oct navigation brief.
2. Confirm `claude/start-page` is superseded, not merged.
3. Door placement of unlisted pages (superseded by Decisions above). Default proposal: Find care: out-of-hours, medicines, vaccines, screening, facilities. Know your rights: `#/rights/disability-children`, pregnancy (neutral label), after-a-death and interpreting guides. Take action: prep, passport, log, SAR builder. Footer only: install.
4. Waiting lists vs While you wait: `#/about/waiting-lists` under Find care, `#/tools/waiting` under Take action, cross-linked.

## Decisions (Elaine, 25 Oct 2026)
1. CI: Elaine adds `node scripts/test-doors.js` and the search audit step to `.github/workflows/data-integrity.yml` by hand. Step text is in the PR comment and the CHANGELOG entry.
2. Heading clash: the door and its hub page are renamed "What applies to you". The Advocacy tab and its headings are untouched (its h1 stays "Know your rights"). The route stays `#/rights-hub`.
3. Placements (Elaine, 25 Oct): Patient Passport (`#/passport`) under Take action, cross-linked with the discharge passport. Pregnancy (`#/pregnancy`) under Find care, neutral tab title kept, cross-link to Get support. After a death (`#/guide/after-a-death`) under Get support, with a link labelled "Other costs and entitlements" to What applies to you; the payments and funeral-cost section stays inside the guide (Elaine confirmed no separate page is intended). Medicines (`#/medicines`) under Find care. All other placements as in PR 129; `#/install` and `#/entry/*` have no door. This supersedes the default proposal in the section 0 report below.
4. Design room: Home's door tiles and the hub pattern are driven by the list in `doors.js`, so one more hub can be added later without restructuring. Nothing for it is built, stubbed or mentioned in the app.
5. PR 2 (Home and search) leaves out the "Where do I start?" row and the empty-state link, because the path itself is PR 3. Both are added with it. Header search is hidden on Home only; Home has its own search form.
6. PR 2 (Elaine, 25 Oct): the crisis banner's always-visible text includes "Emergency: call 999 or 112" (existing numbers only; the rest of the banner stays collapsed). The Autism & ADHD, New & Expectant Parents and Infant feeding shortcuts return as an "Often searched" pill row below the four doors, not above the fold. Screen reader, Safari, Firefox, real touch device and 200% zoom checks are Elaine's and her partner's (manual checklist in the PR). `scripts/test-home.js` stays out of CI and is documented as a local pre-merge check.
7. PR 3 (Where do I start?, Elaine 25 Oct): build on #119 without merging it: its topics, the link-check idea (folded into `test-doors.js`), the list CSS and the `#/start` route. Add a location question, a result with one primary step and at most two Also useful, and Northern Ireland handling (table in the PR). Notice wording "This only points you to other pages. It doesn't ask about your health, give advice or save anything." awaits Elaine's approval. The topic list is the eight from #119, reused; #119 is closed once PR 3 is merged. Location is asked second, as in the brief; a topic that is Republic of Ireland only (Assessment of Need) tells a Northern Ireland user so instead of hiding. The Home row, the empty-search link and the page itself arrive together.
8. PR 3 follow-up (Elaine, 25 Oct): notice and "none of these fit" line approved. Assessment of Need topic label "My child needs a disability assessment (Assessment of Need)" (hint keeps "(Republic of Ireland only)"); Northern Ireland message "The Assessment of Need is a Republic of Ireland process, so we don't have a step for it here. These pages cover Northern Ireland too:" then Who to contact and Support organisations. The emergency line and Crisis support must be visible on `#/start` and on every result screen, with the banner closed and open (tested in `test-home.js`). No new topics.
