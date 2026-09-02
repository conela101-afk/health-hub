# The Pocket Guide — Women's Health, Cork

A free, installable directory for navigating women's health services in Cork: maternity & obstetrics, gynaecology, urology, public health nursing, perinatal mental health, breastfeeding support, domestic/sexual violence support, and community hubs — browsable by specialty or by area, with search.

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

## What's already fact-checked vs. what isn't

This v1 was compiled from public HSE and voluntary-sector websites. Phone numbers, staff, and referral pathways change — **every entry should be verified by phone before this is shared widely.** Treat it as a strong first draft, not a finished, liability-safe product.

## Structure

```
index.html      — page shell, loads everything else
styles.css      — all styling (design tokens at the top)
app.js          — hash-based router + rendering (no framework, no build step)
data.js         — all service listings, specialties, and counties — edit this to update content
manifest.json   — PWA metadata (name, icons, colours)
sw.js           — service worker, caches the app shell for offline use
icons/          — app icons for home-screen install
```

## Known limitations of this v1

- Google Fonts are loaded from a CDN — the first visit needs an internet connection to look right; after that, the service worker caches the app shell (not the fonts) for offline use.
- No analytics, accounts, or backend — by design, for privacy and simplicity.
- Content currently only covers Cork. The data structure supports more counties without any code changes.
