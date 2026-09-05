# Health Hub — Ireland & NI

A free, installable directory for navigating health services and your rights across Ireland and Northern Ireland. Two layers:

- **Service directory** — 42 specialty categories spanning general medicine (cardiology, rheumatology, gastroenterology, dermatology, and more), children's disability services & early intervention (CDNT in the Republic; HSC Trust community paediatrics and Education Authority SEN assessment in NI), and women's health in depth (maternity & obstetrics, gynaecology, endometriosis, menopause, fertility, and more), across public and private providers. National-level programmes and organisations are covered nationwide; region-specific clinic/service listings are being built out area by area (currently deepest for Cork — more regions are an ongoing, explicit priority, not an afterthought).
- **Know your rights** — a self-advocacy guide, letter templates for FOI/SAR requests and formal complaints, the complaints escalation ladder for both Ireland and Northern Ireland, Freedom of Information contacts covering all 6 HSE Hospital Groups (with detailed, individually-verified contacts for ~16 major hospitals) plus all 5 Northern Ireland HSC Trusts, entitlement schemes (Medical Card, NTPF waiting-list rights, Fair Deal, and more), and a directory of national advocacy/support organisations.
- **Before your appointment** (`#/prep`) — an on-screen consultation checklist and a silent/off-site waiting-room check-in message, both built live from what you type and never saved anywhere. Purely a note-taking aid, not a stored health record.
- **My Patient Passport** (`#/passport`) and **My call & referral log** (`#/log`) — a one-page summary form and a running log of who-said-what, for the person to hand to (or quote to) a clinician themselves. Both are blank forms the app never suggests or auto-fills content into, both are ephemeral by default (nothing survives a refresh), and both only persist to this device's `localStorage` if the person explicitly ticks "Save on this device" on that page — unticking, or the "Clear" button, wipes the stored copy immediately. Plain storage, not encrypted: see the content-conventions note below on why.
- **Calm mode** — a sitewide, persistent toggle (top bar) for sensory overload, panic, or executive dysfunction: bigger tap targets, higher-contrast text, and the crisis/out-of-hours banners open by default. The only thing this stores without being asked is this one on/off preference. (Internal code still calls it "simple mode" — class name, function names, and the storage key are unchanged; only the user-facing label moved to "Calm mode".)

It's a static site — no build step, no backend, no database. Everything lives in `data.js`.

## Run it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deploy free on GitHub Pages

1. Create a new GitHub repository (e.g. `pocket-guide`).
2. Push everything in this folder to the repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial pocket guide"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pocket-guide.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)**.
4. GitHub gives you a live URL, usually `https://YOUR-USERNAME.github.io/pocket-guide/`. It updates automatically every time you push.
5. On a phone, opening that URL in Chrome or Safari will offer "Add to Home Screen" — that's the installable PWA, no app store needed.

## Adding or editing a service

Everything is in `data.js`. Each entry looks like this:

```js
{
  id: "unique-id",                 // no spaces, used in the URL
  name: "Service name",
  specialty: ["gynae"],            // one or more ids from SPECIALTIES
  county: ["cork-city"],           // one or more ids from COUNTIES
  blurb: "One sentence, shown in list view.",
  details: ["Longer notes, one per bullet."],
  referral: "How someone actually gets in — self-referral, GP, etc.",
  contact: { phone: "...", email: "...", web: "...", address: "..." }
}
```

To add a new county (e.g. Kerry), add it to the `COUNTIES` array at the top of `data.js`, then tag entries with its id. To add a new specialty, do the same with `SPECIALTIES`.

There's no build step — save the file, refresh the browser, done.

## Content conventions

These have built up over successive editing passes — keep following them:

- **Link, don't duplicate.** Official schemes/forms get linked to their live page, never transcribed (rates and forms go stale). Write original content — letter templates, walkthroughs — only for documented pain points, not as a substitute for a link.
- **No clinical triage or symptom-checker scope.** This is a directory and advocacy toolkit, not a source of medical advice — crossing that line is a medico-legal risk.
- **No persisted personal health data by default, and no app-generated clinical or legal judgments.** Every page that touches personal content (`#/prep`, `#/passport`, `#/log`) only ever echoes back what the user typed — nothing is saved to storage, and the app never infers, suggests, autocompletes, or characterises (e.g. "this breaches standard X") anything about their care. `#/passport` and `#/log` are the two exceptions that *can* persist, and only because the user explicitly ticks "Save on this device" on that page — see their code comments in `app.js` (`PASSPORT_SAVE_KEY` / `LOG_SAVE_KEY`) before changing that behaviour. That storage is deliberately plain `localStorage`, not "encrypted" — an encryption key that has to live on the same device as the data it protects doesn't stop someone who has unlocked the device from reading it, so the actual safeguard is the opt-in and the plain-language warning on each page, not a crypto layer that would just be theatre. If a future feature wants to persist more personal content, or make either of these two on by default, treat that as a deliberate scope change needing its own privacy/threat-model pass (a shared device, a lost phone, someone else reading it), not a small addition.
- **`checked: "D Mon YYYY"`** is an optional per-entry verification-date stamp. Add it only to entries you've actually just re-verified against a live source — never backfilled or added speculatively.
- **No AI-sounding copy.** Avoid formulaic hedge phrases repeated across entries (e.g. a tag like "— a genuine gap" reused everywhere) and research-process leakage ("was found", "in this pass"). Write plain, direct prose, and match the site's existing "About X" naming convention for informational/caveat entries.
- **Never add a URL to `data.js` without verifying it live first.**
- **Keep language general, not gendered, by default.** Most of the site (general medicine, the advocacy/rights guide, letter templates, crisis and out-of-hours info) applies to everyone and should read that way. Only use women-specific framing where the entry is genuinely about a women's-health-specific topic or organisation (maternity, gynae, endometriosis, menopause, fertility, a women's-health charity/campaign, etc.) — don't let it default in elsewhere.
- **`sector: "private"` is only for entries where the entity itself is a private company** (e.g. Beacon Hospital, Mater Private, Blackrock Health, Bon Secours, Kingsbridge). Do not apply it to a public/HSE hospital or publicly-funded pathway just because it also accepts private patients or refers into private providers (e.g. a public maternity hospital's "private care" option, or an HSE-funded referral into a private fertility clinic) — accepting private patients is standard for public hospitals and isn't itself grounds for the tag.

## What's already fact-checked vs. what isn't

This v1 was compiled from public HSE and voluntary-sector websites. Phone numbers, staff, and referral pathways change — **every entry should be verified by phone before this is shared widely.** Treat it as a strong first draft, not a finished, liability-safe product.

## Structure

```
index.html      — page shell, loads everything else
styles.css      — all styling (design tokens at the top)
app.js          — hash-based router + rendering (no framework, no build step)
data.js         — all service listings, specialties, and counties — edit this to update content
manifest.json   — PWA metadata (name, icons, colours)
sw.js           — service worker, network-first with offline fallback
icons/          — app icons for home-screen install
```

## Known limitations of this v1

- Google Fonts are loaded from a CDN — the first visit needs an internet connection to look right; after that, the service worker caches the app shell (not the fonts) for offline use.
- No analytics, accounts, or backend — by design, for privacy and simplicity.
- Region-specific service listings are still deepest for Cork; the data structure already supports any county/region and expanding coverage nationally is the active priority, not a "someday" item.
