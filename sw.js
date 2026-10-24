const CACHE_NAME = "pocket-guide-v37";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./tools.js",
  "./data.js",
  "./search.js",
  "./data/facilities.js",
  "./data/conditions.js",
  "./data/vaccines.js",
  "./data/costs.js",
  "./data/screening.js",
  "./data/pregnancy.js",
  "./data/guides.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/fonts/plusjakartasans-400.woff2",
  "./assets/fonts/plusjakartasans-500.woff2",
  "./assets/fonts/plusjakartasans-600.woff2",
  "./assets/fonts/plusjakartasans-700.woff2",
  "./assets/fonts/fraunces-600-normal.woff2",
  "./assets/fonts/fraunces-600-italic.woff2",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// What is and is not cached (privacy, brief of 24 Oct 2026):
//  - Cached: only the files in ASSETS above, put there at install for every visitor whatever they
//    read, and refreshed in place when the network returns a newer copy.
//  - Not cached: anything else. Runtime caching is an allowlist (ASSETS), not "everything fetched",
//    so no file is added because a particular person viewed a particular page. Page views are hash
//    routes inside index.html and never produce a request of their own.
//  - Never add data/pregnancy.js or any other sensitive-topic file to a runtime cache. If the
//    precache is slimmed, keep sensitive files precached (present for everyone) or network-only.
const CACHEABLE = new Set(ASSETS.map((a) => new URL(a, self.location).href));

// Network-first: this is a reference tool where content freshness (service
// listings, FOI contacts, complaints processes) matters more than offline
// speed. Falls back to cache only when the network is unavailable.
// "no-cache" (not "no-store") means the browser always revalidates with the
// server but can answer 304 Not Modified, so unchanged files -- notably the
// ~2 MB data/facilities.js -- are not re-downloaded on every visit.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((response) => {
        if (response.ok && CACHEABLE.has(new URL(event.request.url).href)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
