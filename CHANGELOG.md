# Changelog

Tool-tagged log of AI assistant sessions on this repo, per `AI_RULES.md`.

## 2026-09-22 [Grok]
- **iOS zoom-on-focus fix**: `.search-field input` and `.prep-input` raised to `font-size:16px`; explicit rules for `#facility-filter`, `#condition-filter`, `#medicine-query` at 16px; `touch-action:manipulation` on pills, tab items, tiles, cards, and common buttons.
- **Searchable tool pages**: static `TOOL_PAGES` array in `app.js` (passport, call log, prep, waiting-room message, SAR builder, facilities, conditions, medicines, out-of-hours) matched in `renderSearch()` and shown first under "Tools & pages".
- **Home pills split**: "Often searched" (content shortcuts) and "Tools" (passport, log, prep, facilities, conditions, medicines, SAR) — same items as before in Calm vs full mode.
- **Safe-area**: `.app` padding-bottom is now `calc(90px + env(safe-area-inset-bottom, 0px))`.
- No `data.js` changes. Files: `app.js`, `styles.css`.

