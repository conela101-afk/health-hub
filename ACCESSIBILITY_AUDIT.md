# Accessibility Audit: 8 Oct 2026

**Fix status (8 Oct 2026, later the same day):** findings 1 to 5 fixed on branch `claude/a11y-fixes-oct26` and rechecked (axe: no contrast or scrollable-region failures; 0 routes overflow at 320px; every route has its own title). Findings 6 to 9 are open. The scan below is the pre-fix result.

Automated and scripted keyboard checks against WCAG 2.1 AA, run by Claude on 8 Oct 2026. This is the first run of the checklist that gates `accessibility-statement.md`. It is **not** a full audit: no screen reader testing was possible (see "Not tested").

## Scope and method
- **Build tested:** the pre-fix scan used a local checkout that was 3 commits behind `origin/main` (no vaccines or costs pages). The re-check after the fixes used current `origin/main` plus the fixes, including `#/vaccines` and `#/costs`.
- **Routes (28):** home, specialty, county, search, entry, all `#/advocacy` tabs including the SAR builder, out-of-hours, facilities, conditions, medicines, prep, passport, log, all guided tools, about pages, rights page.
- **Automated:** axe-core, tags wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice. Each route in default and Calm mode, at 390px and 1280px wide (112 route/mode/viewport runs).
- **Scripted manual checks (Chromium, 390px):** keyboard tab order and skip link, visible focus on 4 routes, route announcements and focus after navigation, target sizes on 18 routes, reflow at 320px on 18 routes, text-spacing override on one route.
- **Harness note:** the site's CSP blocks injected scripts, so the scan ran with CSP bypassed. Site files were not changed.

## What passed
- axe found no failures in: labels, names, roles, ARIA, landmarks, alt text, language, duplicate IDs, link names, form fields.
- Skip link is the first tab stop and moves focus to `<main>`.
- SPA navigation: `#routeAnnouncer` announces each new page and focus moves to `<main>` on later route changes.
- Visible focus ring on every keyboard stop tested (search fields show the container ring).
- `prefers-reduced-motion` is honoured. Viewport allows zoom. No page JS errors on any route.
- Text-spacing override (WCAG 1.4.12) caused no clipped text on the one route tested.

## Findings

| # | Severity | WCAG | Finding | Where | Suggested fix |
|---|---|---|---|---|---|
| 1 | High | 1.4.10 Reflow | At 320px the top bar overflows and the page scrolls sideways on all 18 routes tested. The **Exit** (quick exit) button is pushed past the edge. Advocacy segmented tabs also overflow. | `.topbar-actions`, `#quickExitBtn`, `.segment` | Let the top bar wrap or shrink at narrow widths so Exit stays on screen. Quick exit is a safety feature, so treat as first priority. Tabs: allow wrapping or an intentional scroll container. |
| 2 | High | 1.4.3 Contrast | `--ink-soft` (#736F7C) on `--surface-2` (#F4F0FB) is 4.35:1 (needs 4.5). Affects **Calm mode**, **Exit**, `.cc-name`, `.k`, and `.source-note` on #EDEAFB (4.13:1). 11.5px bold text, on every page. | `.simple-mode-btn`, `.quick-exit-btn`, `.cc-name`, `.k`, `.source-note` | Darken `--ink-soft` to about #67636F (5.2:1 on #F4F0FB, 4.95:1 on #EDEAFB, 5.85:1 on white). |
| 3 | High | 1.4.3 Contrast | White on `--violet` (#8B7FE8) is 3.33:1. Affects Calm mode button when on, segmented tab buttons (specialty, guide, templates, schemes, contacts, orgs) and the map load button. | `.simple-mode-btn[aria-pressed=true]`, active `.segment`, `#oohMapLoadBtn` | Use `--violet-deep` (#5F52CE, 5.86:1 with white) for filled backgrounds that carry white text. |
| 4 | Medium | 2.1.1 Keyboard | Letter previews and result areas are scrollable but not keyboard focusable. | `pre#sarOutput` on SAR builder, `#/tools/aon`, `#/tools/discharge` | Add `tabindex="0"` plus a label (`role="region"` and `aria-label`) to the scrollable block. |
| 5 | Medium | 2.4.2 Page titled | Document title is the same on every route ("Health Hub — Ireland & NI"). The announcer helps screen reader users, but the tab title, history and bookmarks give no page name. | `app.js` route handler | Set `document.title` to the page heading plus site name on each route. |
| 6 | Medium | 2.5.8 Target size (2.2 AA, advisory) | Under 24px: search input 23px tall; "Back" links (17px); crisis "more" links (16px); SAR record checkboxes (15 to 18px); save toggles (20px). Many other controls are under the 44px recommendation (4 to 19 per page). | `.back-link`, `.crisis-more`, `.urgent-more`, checkboxes | Add padding or `min-height: 24px` (44px in Calm mode already). Make checkbox labels the full click target. |
| 7 | Low | 1.3.1 | Heading order skips a level on specialty and county pages (h1 then h3 card titles). | `/specialty/*`, `/county/*` | Use h2 for card titles or add an h2 section heading. |
| 8 | Low | 3.2.5 / best practice | External links open in a new tab with no warning in the link text or `aria-label`. | `#/advocacy/contacts` and others | Add visually hidden "(opens in a new tab)" text. |
| 9 | Low | 2.4.7 | Crisis "more" links and copy buttons showed no style change on scripted focus; keyboard-driven checks showed the browser's default ring on the tested routes, so this is likely a false alarm. Confirm in Safari. | `.crisis-more`, `.urgent-more`, `.copy-btn` | Add an explicit `:focus-visible` rule so the ring does not depend on browser defaults. |

## Not tested (needed before the statement can claim anything)
- **Screen readers:** VoiceOver (iOS and macOS), NVDA, TalkBack. This is the biggest gap. A person needs to do it, ideally with a scripted route list.
- Safari and Firefox (only Chromium was run), real touch devices, and Windows high-contrast or forced-colours mode.
- The Leaflet map (keyboard and screen reader use), PDF/print output, and 200% text-only zoom.
- Dynamic states axe cannot see: results after entering data in the guided tools, error messages, the Passport and log with saved data.
- Plain-language and reading-level review of content (not an automated check).

## Statement impact
`accessibility-statement.md` can honestly say "automated checks and keyboard testing run on 8 Oct 2026; screen reader testing not yet done" once fixes 1 to 3 are in. It should not yet claim WCAG 2.1 AA conformance.
