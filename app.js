(function(){
  const app = document.getElementById("app");
  const searchInput = document.getElementById("searchInput");
  const tabbar = document.getElementById("tabbar");

  // Quick exit: instantly leaves the site with no back-button trail back in
  // (location.replace, not location.href). Doesn't erase browser history
  // already made before this point — no web API can do that — but it stops
  // someone glancing over a shoulder from seeing this site on the next tap
  // of "back". Bound to the visible button and to Escape from anywhere.
  function quickExit(){
    window.location.replace("https://www.google.com");
  }
  const quickExitBtn = document.getElementById("quickExitBtn");
  if (quickExitBtn) quickExitBtn.addEventListener("click", quickExit);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") quickExit();
  });

  // Calm mode (user-facing label; internal names kept as "simple" for
  // continuity): a persistent, sitewide low-clutter/high-contrast toggle for
  // moments of sensory overload, panic, or executive dysfunction. Stores only
  // an on/off flag, locally — same "nothing leaves your browser" model as the
  // rest of the site, just persisted across visits instead of per-page.
  const SIMPLE_MODE_KEY = "hh-simple-mode";
  function getSimpleMode(){
    try { return localStorage.getItem(SIMPLE_MODE_KEY) === "1"; } catch(err){ return false; }
  }
  function setSimpleMode(on){
    try { localStorage.setItem(SIMPLE_MODE_KEY, on ? "1" : "0"); } catch(err){ /* private browsing etc: falls back to session-only */ }
    document.body.classList.toggle("simple-mode", on);
    const btn = document.getElementById("simpleModeBtn");
    if (btn){
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "Calm mode: on" : "Calm mode";
    }
  }
  document.body.classList.toggle("simple-mode", getSimpleMode());
  const simpleModeBtn = document.getElementById("simpleModeBtn");
  if (simpleModeBtn){
    simpleModeBtn.setAttribute("aria-pressed", getSimpleMode() ? "true" : "false");
    simpleModeBtn.textContent = getSimpleMode() ? "Calm mode: on" : "Calm mode";
    simpleModeBtn.addEventListener("click", () => {
      setSimpleMode(!getSimpleMode());
      route();
    });
  }

  // Shared local-storage helpers for Patient Passport and the call/referral
  // log — the only two features on the site that hold personal health
  // content across visits, and only because the person using them explicitly
  // opted in (see the "Save on this device" toggle on each page). Both are
  // plain JSON in localStorage, not encrypted: an encryption key that lives
  // on the same device as the data it protects doesn't stop someone who has
  // physically unlocked the device from reading it, so the actual safeguard
  // here is the opt-in and the plain-language warning, not a crypto layer
  // that would just be theatre. Never call these without the user having
  // ticked the save toggle on the relevant page first.
  function readStore(key){
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch(err){ return null; }
  }
  function writeStore(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(err){ /* private browsing / storage full: silently no-ops, data stays in the form only */ }
  }
  function clearStore(key){
    try { localStorage.removeItem(key); } catch(err){ /* no-op */ }
  }

  function updateTabbar(parts){
    let active = null;
    if (parts.length === 0) active = "home";
    else if (parts[0] === "specialty") active = "specialty";
    else if (parts[0] === "county") active = "county";
    else if (parts[0] === "advocacy") active = "advocacy";
    tabbar.querySelectorAll(".tab-item").forEach(el => {
      el.classList.toggle("active", el.dataset.tab === active);
    });
  }

  let searchDebounce;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      const q = searchInput.value.trim();
      if (q.length > 0) location.hash = "#/search/" + encodeURIComponent(q);
      else if (location.hash.startsWith("#/search")) location.hash = "#/";
    }, 180);
  });

  const ACCENTS = ["violet", "coral", "sage", "sand"];
  function accentForId(id){
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return ACCENTS[hash % ACCENTS.length];
  }

  const ICON_PATHS = {
    obs:     '<path d="M12 21s-7-4.35-9.5-8.8C.6 8.5 2 5 5.5 5c2 0 3.3 1.1 4 2 .7-.9 2-2 4-2 3.5 0 4.9 3.5 3 7.2C19 16.65 12 21 12 21z"/>',
    gynae:   '<circle cx="12" cy="8" r="3.2"/><path d="M12 11.2V19M8.5 15.5h7"/>',
    urology: '<path d="M12 3c2.5 3 4.5 6.4 4.5 9.3a4.5 4.5 0 0 1-9 0C7.5 9.4 9.5 6 12 3z"/>',
    phn:     '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
    mh:      '<path d="M12 20.5s-7-4.2-9-8.4C1.3 8.6 3 5.5 6 5.5c1.8 0 3 1 4 2.2M12 20.5s7-4.2 9-8.4c1.7-3.5 0-6.6-3-6.6-2.1 0-3.4 1.3-4.4 2.7"/><path d="M12 8.5v6M9.5 11.5h5"/>',
    feeding: '<path d="M12 3c2.5 3 4.5 6.4 4.5 9.3a4.5 4.5 0 0 1-9 0C7.5 9.4 9.5 6 12 3z"/><circle cx="12" cy="13" r="1.4"/>',
    dsv:     '<path d="M12 3.5 19 6v6c0 4.8-3 7.7-7 8.5-4-.8-7-3.7-7-8.5V6z"/>',
    hub:     '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h5v-5.5h2V19h5v-9"/>',
    endo:    '<path d="M3 12h4l1.5-5 3 10 1.5-5h3l1-3 1 3h3"/>',
    menopause: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M4.2 4.2l1.8 1.8M18 18l1.8 1.8M3 12h2.5M18.5 12H21M4.2 19.8 6 18M18 6l1.8-1.8"/>',
    fertility: '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
    eating:  '<path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M8 12V7M16 12V7"/>',
    loss:    '<path d="M12 20.5s-7-4.2-9-8.6C1.2 8.3 3 5 6.5 5c2 0 3.3 1.2 4 2.2M12 20.5s7-4.2 9-8.6c1.8-3.7 0-7-3.5-7-2 0-3.3 1.2-4 2.2"/><path d="M12 7.5v3M10.5 11h3"/>',
    cancer:  '<path d="M9 4c1.5 2 1.5 5 3 5s1.5-3 3-5M12 9v4"/><path d="M12 13c-3 2.5-3 6-1 8M12 13c3 2.5 3 6 1 8"/>',
    contraception: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    neurodiversity: '<path d="M6.5 9.5c-2.5 0-2.5 5 0 5 2 0 3-2.5 5.5-2.5s3.5 2.5 5.5 2.5c2.5 0 2.5-5 0-5-2 0-3 2.5-5.5 2.5s-3.5-2.5-5.5-2.5z"/>',
    parenting: '<circle cx="9" cy="6" r="2.2"/><path d="M9 9c-2.8 0-4.5 2.3-4.5 6.5h9C13.5 11.3 11.8 9 9 9z"/><circle cx="17.5" cy="10.5" r="1.6"/><path d="M17.5 12.7c-2 0-3.2 1.6-3.2 4.3h6.4c0-2.7-1.2-4.3-3.2-4.3z"/>',
    crisis:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>',
    cardiology: '<path d="M12 20.5s-7-4.2-9-8.6C1.2 8.3 3 5 6.5 5c2 0 3.3 1.2 4 2.2M12 20.5s7-4.2 9-8.6c1.8-3.7 0-7-3.5-7-2 0-3.3 1.2-4 2.2"/><path d="M6 12h2.5l1.5-3 2 6 1.5-3H16"/>',
    rheumatology: '<circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/><path d="M9.5 9.5l5 5"/>',
    neurology: '<path d="M13 3 6 14h5l-1 7 8-11h-5l1-7z"/>',
    gastro:  '<path d="M8 4c-2 0-3 2-3 4 0 3 2 4 2 7a4 4 0 0 0 8 0c0-2 2-3 2-6 0-3-2-5-4-5"/>',
    pain:    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
    longcovid: '<path d="M12 3v6M9 9c-3 0-4 2-4 6 0 3 1 6 3 6 1.5 0 2-2 2-4V9zM15 9c3 0 4 2 4 6 0 3-1 6-3 6-1.5 0-2-2-2-4V9z"/>',
    bonehealth: '<rect x="4" y="10" width="16" height="4" rx="2"/><circle cx="5" cy="8" r="2"/><circle cx="5" cy="16" r="2"/><circle cx="19" cy="8" r="2"/><circle cx="19" cy="16" r="2"/>',
    genetics: '<path d="M7 3c0 4 10 4 10 8s-10 4-10 8M17 3c0 4-10 4-10 8s10 4 10 8"/>',
    sexualhealth: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    pelvicphysio: '<circle cx="12" cy="5" r="2"/><path d="M12 7v6M8 10l4 3 4-3M9 20l3-4 3 4"/>',
    vascular: '<path d="M12 3v18M12 8c-3 0-4 2-4 4M12 16c3 0 4-2 4-4"/>',
    ophthalmology: '<path d="M2 12s4-6.5 10-6.5S22 12 22 12s-4 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    dermatology: '<path d="M4 8l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 16l8 4 8-4"/>',
    respiratory: '<path d="M12 4v5M8 9c-2.5 0-3.5 2-3.5 5 0 2.5 1 5 2.5 5s2-2 2-3.5V9zM16 9c2.5 0 3.5 2 3.5 5 0 2.5-1 5-2.5 5s-2-2-2-3.5V9z"/><path d="M6.5 7c1-1.5 3-2 5.5-2s4.5.5 5.5 2"/>',
    ent: '<path d="M12 5a7 7 0 0 1 7 7c0 3-2 4-2 6.5a2 2 0 0 1-4 0"/><path d="M12 5a7 7 0 0 0-7 7c0 2 1 3.2 2.2 4"/>',
    diabetes: '<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/><path d="M9.5 13h5M12 10.5v5"/>',
    nephrology: '<path d="M14 3c-4 0-7 4-7 9s3 9 7 9c3.5 0 6-2.5 6-6 0-2.5-1.5-4-4-4s-4 1.5-4 4"/>',
    haematology: '<rect x="7" y="6" width="10" height="13" rx="2"/><path d="M12 3v3M9 10.5h6M9 13.5h6"/>',
    orthopaedics: '<circle cx="8" cy="8" r="3"/><path d="M8 11v6a3 3 0 1 0 6 0v-3h3"/>',
    adultmh: '<circle cx="12" cy="12" r="8"/><path d="M9 9.3c0-1.8 1.3-3 3-3s3 1.3 3 3c0 2-3 2.2-3 4.5"/><circle cx="12" cy="16.3" r="0.8"/>',
    dental: '<path d="M12 4c-1.8 0-3 .9-4.3.9C6.3 4.9 5 6 5 8.3c0 2.6.9 4.4 1.4 7 .3 1.4.9 1.9 1.3 1.9.6 0 1-2.7 1.8-2.7s1.1 2.7 1.7 2.7 1.1-2.7 1.8-2.7 1.1 2.7 1.7 2.7c.4 0 1-.5 1.3-1.9.5-2.6 1.4-4.4 1.4-7 0-2.3-1.3-3.4-2.7-3.4-1.3 0-2.5-.9-4.3-.9z"/>',
    allergy: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2"/>',
    palliative: '<path d="M12 3v4"/><path d="M9 21h6"/><path d="M10 21V11a2 2 0 0 1 4 0v10"/><path d="M9.5 8c0 1.3 1.2 1.8 1.2 3.2"/>',
  };
  const PIN_ICON = '<path d="M12 21s-6.5-6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>';
  // Neutral grid icon for "By specialty" — matches the tab-bar icon for the
  // same section. Previously used the gynae (♀) symbol, which read as a
  // women's-health-first visual signal on a now general-health-first home page.
  const GRID_ICON = '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>';

  function iconSvg(pathData, size){
    return `<svg width="${size||18}" height="${size||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pathData}</svg>`;
  }

  // Turns a raw contact field into a tappable link: tel:/mailto:/https:/maps.
  // Displays the original text, so "phone, ask for X" still reads naturally
  // even though only the number itself is used for the tel: href.
  function contactLinkHtml(type, value){
    if (type === "phone"){
      // Use only the first number for the tel: href (fields like "021 492
      // 0955 / 021 492 0950" or "(01) 637 3100, ask for bleep 085" carry
      // more than one number or trailing instructions in the display text).
      const leadingPhone = (value.match(/^[\d()+\s-]+/) || [value])[0];
      const telHref = leadingPhone.replace(/[^\d+]/g, "");
      return `<a href="tel:${telHref}">${value}</a>`;
    }
    if (type === "email") return `<a href="mailto:${value}">${value}</a>`;
    if (type === "web"){
      const href = /^https?:\/\//.test(value) ? value : `https://${value.replace(/^\/+/, "")}`;
      return `<a href="${href}" target="_blank" rel="noopener">${value}</a>`;
    }
    if (type === "address"){
      return `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}" target="_blank" rel="noopener">${value}</a>`;
    }
    return value;
  }

  function escapeHtml(str){
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Finds bare domain mentions inside free text ("check cuidiu.ie for...")
  // and turns them into real links, since most of the site's prose bullets
  // mention a website by name rather than storing it as a separate field.
  function linkifyText(text){
    if (!text) return text;
    const pattern = /([\w.+-]+@(?:[a-z0-9-]+\.)+(?:ie|com|org|net|uk|info|ca))|(\b(?:[a-z0-9-]+\.)+(?:ie|com|org|net|uk|info|ca)(?:\/[^\s)]*)?)/gi;
    return text.replace(pattern, (match, email, domain) => {
      const raw = email || domain;
      const trailing = (raw.match(/[.,;:!?]+$/) || [""])[0];
      const clean = trailing ? raw.slice(0, -trailing.length) : raw;
      if (email) return `<a href="mailto:${clean}">${clean}</a>${trailing}`;
      const href = /^https?:\/\//.test(clean) ? clean : `https://${clean}`;
      return `<a href="${href}" target="_blank" rel="noopener">${clean}</a>${trailing}`;
    });
  }

  function specialtyLabel(id){ return (SPECIALTIES.find(s => s.id === id) || {}).label || id; }
  function countyLabel(id){ return (COUNTIES.find(c => c.id === id) || {}).label || id; }

  function tagsHtml(entry){
    const specTags = entry.specialty.map(s => `<span class="tag tag-${accentForId(s)}">${specialtyLabel(s)}</span>`).join("");
    const countyTags = entry.county.map(c => `<span class="tag tag-${accentForId(c)}">${countyLabel(c)}</span>`).join("");
    return `<div class="tag-row">${specTags}${countyTags}</div>`;
  }

  function entryCardHtml(entry){
    return `<a class="entry-card" href="#/entry/${entry.id}">
      <h3>${entry.name}</h3>
      <p class="blurb">${entry.blurb}</p>
      ${tagsHtml(entry)}
    </a>`;
  }

  function orgCardHtml(org){
    const c = org.contact || {};
    const tags = (org.tags || []).map(t => `<span class="tag tag-${accentForId(t)}">${t}</span>`).join("");
    const webHref = c.web ? `https://${c.web.replace(/^https?:\/\//, "")}` : null;
    const phoneHref = !webHref && c.phone ? `tel:${c.phone.split(",")[0].replace(/[^\d+]/g, "")}` : null;
    const href = webHref || phoneHref;
    const inner = `
      <h2>${org.name}</h2>
      ${org.remit ? `<p class="remit">${org.remit}</p>` : ""}
      ${org.offer ? `<p class="offer">${org.offer}</p>` : ""}
      <div class="org-footer">
        <div class="tag-row">${tags}</div>
        ${webHref ? `<span class="org-link">${c.web} ↗</span>` : (c.phone ? `<span class="org-link">${c.phone}</span>` : "")}
      </div>
    `;
    return href
      ? `<a class="org-card" href="${href}" ${webHref ? 'target="_blank" rel="noopener"' : ""}>${inner}</a>`
      : `<div class="org-card">${inner}</div>`;
  }

  const CHEVRON_ICON = '<path d="M6 9l6 6 6-6"/>';

  function crisisBannerHtml(){
    const chips = CRISIS_RESOURCES.map(c => `
      <span class="crisis-contact">
        <span class="cc-name">${c.name}</span>
        <span class="cc-value">${c.contact}</span>
      </span>
    `).join("");
    return `
      <details class="crisis-banner"${getSimpleMode() ? " open" : ""}>
        <summary class="crisis-banner-head">
          <span class="crisis-icon">${iconSvg(ICON_PATHS.crisis, 18)}</span>
          <span class="banner-head-text">
            <h2>In a mental health crisis right now?</h2>
            <p>Free, confidential, 24/7 support — tap to see helplines.</p>
          </span>
          <span class="banner-chevron">${iconSvg(CHEVRON_ICON, 16)}</span>
        </summary>
        <div class="crisis-banner-body">
          <div class="crisis-contacts">${chips}</div>
          <a class="crisis-more" href="#/specialty/crisis">More crisis support &amp; details ›</a>
        </div>
      </details>
    `;
  }

  function urgentCareBannerHtml(){
    return `
      <details class="urgent-banner"${getSimpleMode() ? " open" : ""}>
        <summary class="urgent-banner-head">
          <span class="urgent-icon">${iconSvg(PIN_ICON, 18)}</span>
          <span class="banner-head-text">
            <h2>Need care today, but it's not a 999 emergency?</h2>
            <p>Find your local out-of-hours GP service — tap for details.</p>
          </span>
          <span class="banner-chevron">${iconSvg(CHEVRON_ICON, 16)}</span>
        </summary>
        <div class="urgent-banner-body">
          <p>Ireland &amp; Northern Ireland, phone-first, no walk-in.</p>
          <a class="urgent-more" href="#/out-of-hours">Find out-of-hours care ›</a>
        </div>
      </details>
    `;
  }

  function renderHome(){
    const simple = getSimpleMode();
    const quickPills = simple
      ? `
        <a class="pill" href="#/specialty/crisis">Mental health crisis support</a>
        <a class="pill" href="#/out-of-hours">Out-of-hours &amp; urgent care</a>
        <a class="pill" href="#/advocacy">Know your rights &amp; how to complain</a>
        <a class="pill" href="#/prep">Prep for an appointment</a>
        <a class="pill" href="#/passport">My Patient Passport</a>
      `
      : `
        <a class="pill" href="#/specialty/neurodiversity">Autism &amp; ADHD support</a>
        <a class="pill" href="#/specialty/parenting">Parenting &amp; new motherhood</a>
        <a class="pill" href="#/specialty/dsv">Domestic &amp; sexual violence</a>
        <a class="pill" href="#/specialty/feeding">Breastfeeding support</a>
        <a class="pill" href="#/advocacy">Know your rights &amp; how to complain</a>
        <a class="pill" href="#/advocacy/general">Disability, LGBTQ+, older-age &amp; migrant support</a>
        <a class="pill" href="#/prep">Prep for an appointment</a>
        <a class="pill" href="#/passport">My Patient Passport</a>
        <a class="pill" href="#/log">My call &amp; referral log</a>
      `;
    app.innerHTML = `
      <div class="hero hero-top">
        <p class="hero-eyebrow">Ireland &amp; Northern Ireland</p>
        <h1>Navigating health &amp; care, <em>wherever you are</em>.</h1>
        ${simple ? "" : `<p>A free directory for navigating health services and your rights across Ireland and Northern Ireland — public and private, general medicine, women's health, and neurodiversity/disability pathways, plus a full advocacy toolkit for complaints, records requests, and out-of-hours care.</p>`}
      </div>

      ${crisisBannerHtml()}
      ${urgentCareBannerHtml()}

      <div class="index-grid">
        <a class="index-tile tile-a" href="#/specialty">
          <span class="tile-icon">${iconSvg(GRID_ICON, 28)}</span>
          <h2>By specialty</h2>
          <p>41 categories, from cardiology to gynaecology to chronic pain</p>
        </a>
        <a class="index-tile tile-b" href="#/county">
          <span class="tile-icon">${iconSvg(PIN_ICON, 28)}</span>
          <h2>By area</h2>
          <p>All 32 counties, plus national programmes across Ireland &amp; NI</p>
        </a>
      </div>

      <div class="quick-links">
        <h3>Often searched</h3>
        <div class="quick-link-row">${quickPills}</div>
      </div>
    `;
  }

  function renderSpecialtyIndex(){
    const rows = SPECIALTIES.map(s => {
      const n = ENTRIES.filter(e => e.specialty.includes(s.id)).length;
      const accent = accentForId(s.id);
      return `<a class="row" href="#/specialty/${s.id}">
        <span class="cat-icon tag-${accent}">${iconSvg(ICON_PATHS[s.id] || PIN_ICON, 18)}</span>
        <span class="row-body">
          <h2>${s.label}</h2>
          <span class="n">${n} service${n === 1 ? "" : "s"}</span>
        </span>
        <span class="arrow">›</span>
      </a>`;
    }).join("");
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Browse by specialty</h1>
        <p class="count">${SPECIALTIES.length} categories</p>
      </div>
      <div class="simple-list">${rows}</div>
    `;
  }

  function renderCountyIndex(){
    const rows = COUNTIES.map(c => {
      const n = ENTRIES.filter(e => e.county.includes(c.id)).length;
      const accent = accentForId(c.id);
      return `<a class="row" href="#/county/${c.id}">
        <span class="cat-icon tag-${accent}">${iconSvg(PIN_ICON, 18)}</span>
        <span class="row-body">
          <h2>${c.label}</h2>
          <span class="n">${n} service${n === 1 ? "" : "s"}</span>
        </span>
        <span class="arrow">›</span>
      </a>`;
    }).join("");
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Browse by area</h1>
        <p class="count">${COUNTIES.length} areas</p>
      </div>
      <div class="simple-list">${rows}</div>
    `;
  }

  const SECTOR_FILTERS = [
    { id: "", label: "All" },
    { id: "public", label: "Public" },
    { id: "private", label: "Private" },
  ];

  function sectorFilterHtml(id, active){
    const options = SECTOR_FILTERS.map(f => {
      const href = f.id ? `#/specialty/${id}/${f.id}` : `#/specialty/${id}`;
      return `<a class="segment${f.id === active ? " active" : ""}" href="${href}">${f.label}</a>`;
    }).join("");
    return `<div class="segmented">${options}</div>`;
  }

  function renderList(kind, id, sector){
    const label = kind === "specialty" ? specialtyLabel(id) : countyLabel(id);
    const allResults = ENTRIES.filter(e => kind === "specialty" ? e.specialty.includes(id) : e.county.includes(id));
    const activeSector = kind === "specialty" && (sector === "public" || sector === "private") ? sector : "";
    const results = activeSector === "private"
      ? allResults.filter(e => e.sector === "private")
      : activeSector === "public"
      ? allResults.filter(e => e.sector !== "private")
      : allResults;
    const backHref = kind === "specialty" ? "#/specialty" : "#/county";
    const filterHtml = kind === "specialty" ? sectorFilterHtml(id, activeSector) : "";
    const cards = results.length
      ? results.map(entryCardHtml).join("")
      : `<div class="empty-state">Nothing listed here yet.</div>`;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="${backHref}">‹ ${kind === "specialty" ? "Specialties" : "Areas"}</a>
        <h1>${escapeHtml(label)}</h1>
        <p class="count">${results.length} service${results.length === 1 ? "" : "s"}</p>
      </div>
      ${filterHtml}
      ${cards}
    `;
  }

  function entryHay(e){
    return [e.name, e.blurb, ...(e.details||[]), ...e.specialty.map(specialtyLabel), ...e.county.map(countyLabel)]
      .join(" ").toLowerCase();
  }

  function providerGroupCardHtml(provider, entries){
    const specs = [...new Set(entries.flatMap(e => e.specialty.map(specialtyLabel)))].join(", ");
    return `
      <details class="template-card">
        <summary class="template-head">
          <span class="banner-head-text">
            <h2>${provider}</h2>
            <p>${entries.length} service${entries.length === 1 ? "" : "s"} — ${specs}</p>
          </span>
          <span class="banner-chevron">${iconSvg(CHEVRON_ICON, 16)}</span>
        </summary>
        <div class="template-body">${entries.map(entryCardHtml).join("")}</div>
      </details>
    `;
  }

  function renderSearch(query){
    const q = query.toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const isPrivateQuery = terms.includes("private");
    const otherTerms = terms.filter(t => t !== "private");

    let privateEntries = [];
    if (isPrivateQuery){
      privateEntries = ENTRIES.filter(e => e.sector === "private");
      if (otherTerms.length){
        privateEntries = privateEntries.filter(e =>
          otherTerms.every(t => entryHay(e).includes(t) || (e.provider || "").toLowerCase().includes(t))
        );
      }
    }
    const privateIds = new Set(privateEntries.map(e => e.id));

    const results = ENTRIES.filter(e => !privateIds.has(e.id) && entryHay(e).includes(q));
    const matchesOrg = o => [o.name, o.remit, o.offer, ...(o.tags||[])].join(" ").toLowerCase().includes(q);
    const orgResults = SUPPORT_ORGS.filter(matchesOrg);
    const generalOrgResults = GENERAL_ADVOCACY_ORGS.filter(matchesOrg);
    const totalCount = results.length + orgResults.length + generalOrgResults.length + privateEntries.length;

    const byProvider = {};
    privateEntries.forEach(e => { (byProvider[e.provider] = byProvider[e.provider] || []).push(e); });
    const privateSection = privateEntries.length
      ? `<p class="section-title">Private hospitals &amp; clinics</p>${Object.keys(byProvider).sort().map(p => providerGroupCardHtml(p, byProvider[p])).join("")}`
      : "";

    const cards = results.length ? results.map(entryCardHtml).join("") : "";
    const orgCards = orgResults.length
      ? `<p class="section-title">Support &amp; advocacy organisations</p><div class="org-grid">${orgResults.map(orgCardHtml).join("")}</div>`
      : "";
    const generalOrgCards = generalOrgResults.length
      ? `<p class="section-title">General advocacy &amp; support</p><div class="org-grid">${generalOrgResults.map(orgCardHtml).join("")}</div>`
      : "";
    const safeQuery = escapeHtml(query);
    const body = totalCount
      ? `${privateSection}${cards}${orgCards}${generalOrgCards}`
      : `<div class="empty-state">No matches for "${safeQuery}". Try a broader term, like a condition, area, or organisation name.</div>`;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Search: "${safeQuery}"</h1>
        <p class="count">${totalCount} result${totalCount === 1 ? "" : "s"}</p>
      </div>
      ${body}
    `;
    searchInput.value = query;
  }

  function renderEntry(id){
    const e = ENTRIES.find(x => x.id === id);
    if (!e){ app.innerHTML = `<div class="empty-state">Not found.</div>`; return; }
    const c = e.contact || {};
    const contactLines = [];
    if (c.phone) contactLines.push(`<div class="line"><span class="k">Phone</span><span>${contactLinkHtml("phone", c.phone)}</span></div>`);
    if (c.extra) contactLines.push(`<div class="line"><span class="k"></span><span>${linkifyText(c.extra)}</span></div>`);
    if (c.email) contactLines.push(`<div class="line"><span class="k">Email</span><span>${contactLinkHtml("email", c.email)}</span></div>`);
    if (c.web) contactLines.push(`<div class="line"><span class="k">Web</span><span>${contactLinkHtml("web", c.web)}</span></div>`);
    if (c.address) contactLines.push(`<div class="line"><span class="k">Address</span><span>${contactLinkHtml("address", c.address)}</span></div>`);

    const detailsHtml = (e.details && e.details.length)
      ? `<p class="detail-section-title">Good to know</p><ul class="detail-list">${e.details.map(d => `<li>${linkifyText(d)}</li>`).join("")}</ul>`
      : "";

    const resourcesHtml = (e.resources && e.resources.length)
      ? `<p class="detail-section-title">Learn more</p><ul class="resource-list">${e.resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.label} ↗</a></li>`).join("")}</ul>`
      : "";

    // Optional per-entry verification date. Only shown when present — we're
    // not backfilling a fake date onto the ~330 entries that predate this
    // field, only adding it to entries actually checked from here on.
    const checkedHtml = e.checked
      ? `<p class="checked-note">Checked ${escapeHtml(e.checked)}</p>`
      : "";

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#" data-action="back">‹ Back</a>
      </div>
      <div class="detail-card">
        <h1>${e.name}</h1>
        <p class="blurb">${linkifyText(e.blurb)}</p>
        ${tagsHtml(e)}
        ${contactLines.length ? `<div class="contact-block">${contactLines.join("")}</div>` : ""}
        ${detailsHtml}
        ${e.referral ? `<div class="referral-note"><strong>How to get in:</strong> ${linkifyText(e.referral)}</div>` : ""}
        ${resourcesHtml}
        ${checkedHtml}
      </div>
    `;
  }

  function hospitalCardHtml(h){
    const c = h.contact || {};
    const contactBits = [];
    if (c.phone) contactBits.push(contactLinkHtml("phone", c.phone));
    if (c.email) contactBits.push(contactLinkHtml("email", c.email));
    if (c.web) contactBits.push(contactLinkHtml("web", c.web));
    if (c.address) contactBits.push(contactLinkHtml("address", c.address));
    if (c.form) contactBits.push(`<span>${c.form}</span>`);
    const stepsHtml = (h.steps && h.steps.length) ? `<ul class="steps">${h.steps.map(s => `<li>${linkifyText(s)}</li>`).join("")}</ul>` : "";
    return `
      <div class="hospital-card">
        <div class="hospital-head">
          <h2>${h.name}</h2>
          <span class="type-badge type-${h.type}">${h.typeLabel}</span>
        </div>
        <p class="summary">${linkifyText(h.summary)}</p>
        ${stepsHtml}
        ${h.note ? `<p class="hosp-note">${linkifyText(h.note)}</p>` : ""}
        ${contactBits.length ? `<div class="contact-line">${contactBits.join("")}</div>` : ""}
      </div>
    `;
  }

  function hospitalsByRegionHtml(){
    const regions = [];
    HOSPITAL_FOI.forEach(h => { if (!regions.includes(h.region)) regions.push(h.region); });
    return regions.map(r => {
      const cards = HOSPITAL_FOI.filter(h => h.region === r).map(hospitalCardHtml).join("");
      return `<p class="region-heading">${r}</p>${cards}`;
    }).join("");
  }

  function hospitalGroupCardHtml(g){
    return `
      <div class="group-card">
        <h2>${g.name}</h2>
        <ul>${g.hospitals.map(h => `<li>${h}</li>`).join("")}</ul>
      </div>
    `;
  }

  const ADVOCACY_SECTIONS = [
    { id: "guide", label: "The guide" },
    { id: "templates", label: "Letter templates" },
    { id: "schemes", label: "Entitlements" },
    { id: "hospitals", label: "FOI by hospital" },
    { id: "contacts", label: "Who to contact" },
    { id: "orgs", label: "Support orgs" },
    { id: "general", label: "General support" },
  ];

  function advocacySegmentedHtml(active){
    return `<div class="segmented">${ADVOCACY_SECTIONS.map(s =>
      `<a class="segment${s.id === active ? " active" : ""}" href="#/advocacy/${s.id}">${s.label}</a>`
    ).join("")}</div>`;
  }

  function renderAdvocacyGuide(){
    const guideHtml = ADVOCACY_GUIDE.map(m => `
      <div class="guide-module">
        <h2>${m.title}</h2>
        <ul>${m.tips.map(t => `<li>${linkifyText(t)}</li>`).join("")}</ul>
      </div>
    `).join("");
    return `
      <div class="callout">
        <strong>Why this page exists:</strong> being dismissed or not believed is a documented pattern across Irish healthcare, not something you're imagining. The clearest recent evidence is from women's health — the Department of Health's own 2025 listening forum with 142 women, and a peer-reviewed 2024 Irish study on pain dismissal — but the pattern isn't limited to it. This page exists to make the practical steps easier to find, whatever you're dealing with.
        <span class="source-note">Sources: Dept of Health &amp; NWC, "Our Health, Our Voices" (Oct 2025) · Windrim, McGuire &amp; Durand, BMC Women's Health (2024)</span>
      </div>
      <div class="guide-list">${guideHtml}</div>
    `;
  }

  function renderAdvocacyHospitals(){
    return `
      <p class="section-title">Freedom of Information, hospital by hospital</p>
      <div class="hospital-grid">${hospitalsByRegionHtml()}</div>

      <p class="section-title">Every public hospital, by Hospital Group (Republic of Ireland)</p>
      <div class="callout">
        Every hospital below is listed so you always have somewhere to start, even for the ones we haven't individually verified yet. Unless marked "detailed above," the general rule is: routes through the same central HSE FOI process explained under CUH. Northern Ireland hospitals are covered by their HSC Trust above.
      </div>
      <div class="group-grid">${HOSPITAL_GROUPS.map(hospitalGroupCardHtml).join("")}</div>
    `;
  }

  function rightsBodyCardHtml(r){
    const c = r.contact || {};
    const contactBits = [];
    if (c.phone) contactBits.push(contactLinkHtml("phone", c.phone));
    if (c.email) contactBits.push(contactLinkHtml("email", c.email));
    if (c.web) contactBits.push(contactLinkHtml("web", c.web));
    return `
      <div class="rights-card">
        <span class="step-badge">${r.step}</span>
        <div class="rights-body">
          <h2>${r.name}</h2>
          <p class="role">${r.role}</p>
          <p class="detail">${linkifyText(r.detail)}</p>
          ${contactBits.length ? `<div class="contact-line">${contactBits.join("")}</div>` : ""}
        </div>
      </div>
    `;
  }

  function renderAdvocacyContacts(){
    const roiHtml = RIGHTS_BODIES.map(rightsBodyCardHtml).join("");
    const niHtml = RIGHTS_BODIES_NI.map(rightsBodyCardHtml).join("");
    return `
      <p class="detail-section-title">Republic of Ireland</p>
      <div class="rights-ladder">${roiHtml}</div>
      <p class="detail-section-title">Northern Ireland</p>
      <div class="rights-ladder">${niHtml}</div>
    `;
  }

  function renderAdvocacyTemplates(){
    const roi = LETTER_TEMPLATES.filter(t => t.jurisdiction === "roi");
    const ni = LETTER_TEMPLATES.filter(t => t.jurisdiction === "ni");
    const cardHtml = t => `
      <details class="template-card">
        <summary class="template-head">
          <span class="banner-head-text">
            <h2>${t.title}</h2>
            <p>${t.useFor}</p>
          </span>
          <span class="banner-chevron">${iconSvg(CHEVRON_ICON, 16)}</span>
        </summary>
        <div class="template-body">
          <div class="template-meta">
            <div class="line"><span class="k">Send to</span><span>${linkifyText(t.sendTo)}</span></div>
            <div class="line"><span class="k">Deadline</span><span>${linkifyText(t.deadline)}</span></div>
            ${t.enclose ? `<div class="line"><span class="k">Enclose</span><span>${linkifyText(t.enclose)}</span></div>` : ""}
          </div>
          <button type="button" class="copy-btn" data-template-id="${t.id}">Copy letter text</button>
          <pre class="template-text" id="template-${t.id}">${escapeHtml(t.body)}</pre>
        </div>
      </details>
    `;
    return `
      <div class="callout">
        These are our own plain-language templates, not official forms — fill in the brackets, then copy, paste and send by email or post. We link to the official form instead where one exists (see "Send to").
      </div>
      <p class="detail-section-title">Republic of Ireland</p>
      ${roi.map(cardHtml).join("")}
      <p class="detail-section-title">Northern Ireland</p>
      ${ni.map(cardHtml).join("")}
    `;
  }

  // Shared by static letter templates and the generated text on the
  // Pre-Appointment Prep page — copies one element's textContent to the
  // clipboard and flashes the triggering button to confirm it worked.
  function copyElementText(el, btn){
    if (!el || !btn) return;
    const text = el.textContent;
    const done = () => { const orig = btn.textContent; btn.textContent = "Copied ✓"; setTimeout(() => { btn.textContent = orig; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(() => {});
    } else {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      done();
    }
  }

  window.copyTemplateText = function(id){
    const el = document.getElementById("template-" + id);
    const btn = document.querySelector(`.copy-btn[data-template-id="${id}"]`);
    copyElementText(el, btn);
  };

  app.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (btn && btn.dataset.templateId) window.copyTemplateText(btn.dataset.templateId);
    if (btn && btn.dataset.copyTarget) copyElementText(document.getElementById(btn.dataset.copyTarget), btn);
    const backLink = e.target.closest('[data-action="back"]');
    if (backLink){ e.preventDefault(); history.back(); }
  });

  function schemeCardHtml(s){
    const linksHtml = s.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("");
    const prepHtml = s.prep && s.prep.length
      ? `<details class="scheme-prep">
          <summary>What to prepare before you start ${iconSvg(CHEVRON_ICON, 14)}</summary>
          <ul>${s.prep.map(p => `<li>${linkifyText(p)}</li>`).join("")}</ul>
        </details>`
      : "";
    return `
      <div class="scheme-card">
        <h2>${s.name}</h2>
        <p class="remit">${s.blurb}</p>
        <div class="scheme-links">${linksHtml}</div>
        ${prepHtml}
      </div>
    `;
  }

  function renderAdvocacySchemes(){
    const roi = SCHEME_LINKS.filter(s => s.jurisdiction === "roi");
    const ni = SCHEME_LINKS.filter(s => s.jurisdiction === "ni");
    return `
      <div class="callout">
        Rates, income limits and thresholds change every year, usually in the Budget — rather than publish figures that go stale, we link straight to the official page for each scheme.
      </div>
      <p class="detail-section-title">Republic of Ireland</p>
      ${roi.map(schemeCardHtml).join("")}
      <p class="detail-section-title">Northern Ireland</p>
      ${ni.map(schemeCardHtml).join("")}
    `;
  }

  function renderAdvocacyOrgs(){
    return `<div class="org-grid">${SUPPORT_ORGS.map(orgCardHtml).join("")}</div>`;
  }

  function outOfHoursRowHtml(o){
    return `
      <div class="ooh-row">
        <div class="ooh-main">
          <div class="ooh-name">${o.name}</div>
          <div class="ooh-counties">${o.counties}${o.note ? ` — ${o.note}` : ""}</div>
        </div>
        <div class="ooh-phone">${contactLinkHtml("phone", o.phone)}</div>
      </div>
    `;
  }

  function initOohMap(){
    if (typeof L === "undefined") return;
    const mapEl = document.getElementById("ooh-map");
    if (!mapEl) return;
    const map = L.map("ooh-map", { scrollWheelZoom: false }).setView([53.35, -7.8], 6.3);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 18,
      referrerPolicy: "no-referrer",
    }).addTo(map);
    [...OUT_OF_HOURS_ROI, ...OUT_OF_HOURS_NI].forEach(service => {
      (service.sites || []).forEach(site => {
        L.marker([site.lat, site.lng]).addTo(map)
          .bindPopup(`<strong>${service.name}</strong><br>${site.town}<br><a href="tel:${service.phone.replace(/[^\d+]/g, "")}">${service.phone}</a>`);
      });
    });
  }

  function renderOutOfHours(){
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Out-of-hours &amp; urgent care</h1>
        <p class="count">Not a 999 emergency, but can't wait for your own GP? Ireland &amp; Northern Ireland</p>
      </div>

      <div class="callout">
        <strong>These are phone-first services — there is no walk-in.</strong> Call ahead; a nurse or GP will triage you over the phone and either give advice, book you an appointment, or direct you to an Emergency Department. Coverage follows GP-practice membership, not strict county lines, and can change — if in doubt, use the official finders linked below.
      </div>

      <p class="section-title">Map of treatment centres</p>
      <div id="ooh-map" class="ooh-map"></div>
      <p class="ooh-source">Pins are approximate town-centre locations, not exact buildings — always phone first, these are appointment-only.</p>

      <p class="section-title">Republic of Ireland: GP out-of-hours co-ops</p>
      <div class="ooh-list">${OUT_OF_HOURS_ROI.map(outOfHoursRowHtml).join("")}</div>
      <p class="ooh-source"><a href="https://www2.hse.ie/services/find-urgent-emergency-care/" target="_blank" rel="noopener">HSE: find urgent &amp; emergency care near you ↗</a></p>

      <p class="section-title">Northern Ireland: Phone First &amp; GP out-of-hours</p>
      <div class="ooh-list">${OUT_OF_HOURS_NI.map(outOfHoursRowHtml).join("")}</div>
      <div class="callout">
        Western and South Eastern Trust areas also run Phone First services — we couldn't confirm a stable direct number for either, so use the nidirect link below or your GP surgery's own out-of-hours recorded message.
      </div>
      <p class="ooh-source"><a href="https://www.nidirect.gov.uk/articles/urgent-and-emergency-care-services" target="_blank" rel="noopener">nidirect: urgent &amp; emergency care services ↗</a> · <a href="https://www.nidirect.gov.uk/emergency-department-average-waiting-times" target="_blank" rel="noopener">NI ED waiting times ↗</a></p>

      <p class="section-title">Injury units</p>
      <p class="callout">For a broken bone, sprain, or wound that isn't life-threatening, a Local Injury Unit (LIU) can often see you faster than an Emergency Department — but not every hospital has one, and they don't treat every kind of injury. Use the HSE finder above to check your nearest.</p>
    `;
    initOohMap();
  }

  // Pre-Appointment Prep + silent waiting-room check-in. Deliberately built
  // with no persistence at all: everything typed here lives only in the DOM
  // for this page view and is gone on refresh or navigation. The generated
  // text is a verbatim echo of what the user typed — the app never infers,
  // suggests, or auto-completes any medical content — so this stays a
  // note-taking aid, not a source of medical advice or a stored health record.
  function renderPrep(){
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Before your appointment</h1>
        <p class="count">Get your thoughts in order, then bring it with you</p>
      </div>

      <div class="callout">
        Nothing you type on this page is saved anywhere, on this device or off it — refreshing or leaving clears it. Copy or print your checklist before you go. This only ever repeats back what you type; it's a note-taking aid, not medical advice.
      </div>

      <div class="prep-card">
        <h2>Consultation checklist</h2>
        <p class="remit">Two minutes now saves forgetting the thing you actually came in for.</p>
        <label class="prep-label" for="prepSymptoms">Your top concerns today — what, and since when</label>
        <textarea id="prepSymptoms" class="prep-input" rows="3" placeholder="e.g. Lower back pain, worse in the mornings, started about 3 weeks ago"></textarea>

        <label class="prep-label" for="prepQuestions">Questions you want answered before you leave</label>
        <textarea id="prepQuestions" class="prep-input" rows="3" placeholder="e.g. Do I need a scan? What are the treatment options?"></textarea>

        <label class="prep-label" for="prepNeeds">Anything you need from this visit</label>
        <textarea id="prepNeeds" class="prep-input" rows="2" placeholder="e.g. Repeat prescription, referral letter, sick cert"></textarea>

        <label class="prep-label" for="prepMeds">Current medications &amp; doses</label>
        <textarea id="prepMeds" class="prep-input" rows="2" placeholder="e.g. Metformin 500mg twice daily"></textarea>

        <button type="button" class="copy-btn" id="prepGenerate">Build my checklist</button>
        <pre class="template-text" id="prepOutput" hidden></pre>
        <button type="button" class="copy-btn" id="prepCopy" data-copy-target="prepOutput" hidden>Copy checklist</button>
      </div>

      <div class="prep-card">
        <h2>Waiting outside? Ask reception to text you</h2>
        <p class="remit">If a crowded or noisy waiting room is difficult for you, this drafts a message asking reception to let you wait elsewhere and text you when it's your turn. Whether they can accommodate it is up to the service — this only drafts the ask.</p>

        <label class="prep-label" for="waitTime">Appointment time</label>
        <input type="text" id="waitTime" class="prep-input" placeholder="e.g. 2:30pm">

        <label class="prep-label" for="waitClinician">Clinician or department</label>
        <input type="text" id="waitClinician" class="prep-input" placeholder="e.g. Dr Smith / Outpatients">

        <label class="prep-label" for="waitLocation">Where you'll be waiting</label>
        <input type="text" id="waitLocation" class="prep-input" placeholder="e.g. the car park, outside the entrance">

        <label class="prep-label" for="waitPhone">Your phone number</label>
        <input type="text" id="waitPhone" class="prep-input" placeholder="e.g. 087 123 4567">

        <button type="button" class="copy-btn" id="waitGenerate">Build my message</button>
        <pre class="template-text" id="waitOutput" hidden></pre>
        <button type="button" class="copy-btn" id="waitCopy" data-copy-target="waitOutput" hidden>Copy message</button>
      </div>
    `;

    document.getElementById("prepGenerate").addEventListener("click", () => {
      const symptoms = document.getElementById("prepSymptoms").value.trim();
      const questions = document.getElementById("prepQuestions").value.trim();
      const needs = document.getElementById("prepNeeds").value.trim();
      const meds = document.getElementById("prepMeds").value.trim();
      const sections = [];
      if (symptoms) sections.push("TOP CONCERNS TODAY\n" + symptoms);
      if (questions) sections.push("QUESTIONS TO ASK\n" + questions);
      if (needs) sections.push("WHAT I NEED FROM THIS VISIT\n" + needs);
      if (meds) sections.push("CURRENT MEDICATIONS\n" + meds);
      const out = document.getElementById("prepOutput");
      out.textContent = sections.length ? sections.join("\n\n") : "Fill in at least one field above, then try again.";
      out.hidden = false;
      document.getElementById("prepCopy").hidden = false;
    });

    document.getElementById("waitGenerate").addEventListener("click", () => {
      const time = document.getElementById("waitTime").value.trim() || "[time]";
      const clinician = document.getElementById("waitClinician").value.trim() || "[clinician / department]";
      const loc = document.getElementById("waitLocation").value.trim() || "[nearby location]";
      const phone = document.getElementById("waitPhone").value.trim() || "[phone number]";
      const out = document.getElementById("waitOutput");
      out.textContent = `Hello, I have arrived for my appointment at ${time} with ${clinician}. I'd find it easier to wait outside the waiting room if that's possible — I'll be in ${loc}. Could you text or call me on ${phone} when it's nearly my turn? Thank you.`;
      out.hidden = false;
      document.getElementById("waitCopy").hidden = false;
    });
  }

  // Patient Passport & call/referral log. The only two features that can
  // hold personal health content across visits — and only because the user
  // explicitly ticked "Save on this device". Off by default; unticking or
  // "Clear" removes the stored copy immediately (see readStore/writeStore
  // comment above for why this is plain, not encrypted, storage).
  const PASSPORT_KEY = "hh-passport";
  const PASSPORT_SAVE_KEY = "hh-passport-save-on";
  const PASSPORT_FIELDS = [
    { id: "name", label: "Name", type: "input", placeholder: "Full name" },
    { id: "mrn", label: "Medical record / hospital chart number", type: "input", placeholder: "If you know it" },
    { id: "gp", label: "GP name & phone", type: "input", placeholder: "e.g. Dr Byrne, 021 123 4567" },
    { id: "emergencyContact", label: "Emergency contact name & phone", type: "input", placeholder: "e.g. Jane Byrne (sister), 087 123 4567" },
    { id: "conditions", label: "Conditions & surgical history", type: "textarea", placeholder: "e.g. Type 1 diabetes since 2014; appendectomy 2019" },
    { id: "medications", label: "Current medications & doses", type: "textarea", placeholder: "e.g. Metformin 500mg twice daily" },
    { id: "allergies", label: "Allergies", type: "textarea", placeholder: "e.g. Penicillin — rash" },
    { id: "accessNeeds", label: "Access & communication needs", type: "textarea", placeholder: "e.g. Requires written instructions for medication changes; sensitive to noise; needs wheelchair access" },
  ];

  function renderPassport(){
    const isSaving = readStore(PASSPORT_SAVE_KEY) === true;
    const saved = isSaving ? (readStore(PASSPORT_KEY) || {}) : {};

    const fieldsHtml = PASSPORT_FIELDS.map(f => {
      const val = escapeHtml(saved[f.id] || "");
      return f.type === "textarea"
        ? `<label class="prep-label" for="pp-${f.id}">${f.label}</label><textarea id="pp-${f.id}" class="prep-input" rows="2" placeholder="${f.placeholder}">${val}</textarea>`
        : `<label class="prep-label" for="pp-${f.id}">${f.label}</label><input type="text" id="pp-${f.id}" class="prep-input" placeholder="${f.placeholder}" value="${val}">`;
    }).join("");

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>My Patient Passport</h1>
        <p class="count">A one-page summary to hand to a doctor who doesn't know you yet</p>
      </div>

      <div class="callout">
        This form only ever shows back exactly what you type — nothing here is suggested, autocompleted, or filled in for you. By default nothing is saved: refreshing this page clears it, so copy or print your summary before you leave. Tick "Save on this device" only if you want it to still be here next time — it's then stored in plain text in this browser, which means anyone who can unlock this device can read it. If that's a risk for you, leave it unticked and use Copy or Print each time instead.
      </div>

      <div class="prep-card">
        <label class="save-toggle">
          <input type="checkbox" id="ppSaveToggle" ${isSaving ? "checked" : ""}>
          <span>Save on this device</span>
        </label>

        ${fieldsHtml}

        <button type="button" class="copy-btn" id="ppGenerate">Build my summary</button>
        <pre class="template-text" id="ppOutput" hidden></pre>
        <button type="button" class="copy-btn" id="ppCopy" data-copy-target="ppOutput" hidden>Copy summary</button>
        <button type="button" class="danger-btn" id="ppClear" ${isSaving ? "" : "hidden"}>Clear saved passport from this device</button>
      </div>
    `;

    function currentValues(){
      const values = {};
      PASSPORT_FIELDS.forEach(f => { values[f.id] = document.getElementById("pp-" + f.id).value.trim(); });
      return values;
    }

    const clearBtn = document.getElementById("ppClear");

    PASSPORT_FIELDS.forEach(f => {
      document.getElementById("pp-" + f.id).addEventListener("input", () => {
        if (document.getElementById("ppSaveToggle").checked) writeStore(PASSPORT_KEY, currentValues());
      });
    });

    document.getElementById("ppSaveToggle").addEventListener("change", (e) => {
      if (e.target.checked){
        writeStore(PASSPORT_SAVE_KEY, true);
        writeStore(PASSPORT_KEY, currentValues());
        clearBtn.hidden = false;
      } else {
        writeStore(PASSPORT_SAVE_KEY, false);
        clearStore(PASSPORT_KEY);
        clearBtn.hidden = true;
      }
    });

    clearBtn.addEventListener("click", () => {
      clearStore(PASSPORT_KEY);
      writeStore(PASSPORT_SAVE_KEY, false);
      document.getElementById("ppSaveToggle").checked = false;
      clearBtn.hidden = true;
      PASSPORT_FIELDS.forEach(f => { document.getElementById("pp-" + f.id).value = ""; });
    });

    document.getElementById("ppGenerate").addEventListener("click", () => {
      const v = currentValues();
      const lines = PASSPORT_FIELDS.filter(f => v[f.id]).map(f => `${f.label.toUpperCase()}\n${v[f.id]}`);
      const out = document.getElementById("ppOutput");
      out.textContent = lines.length ? lines.join("\n\n") : "Fill in at least one field above, then try again.";
      out.hidden = false;
      document.getElementById("ppCopy").hidden = false;
    });
  }

  const LOG_KEY = "hh-call-log";
  const LOG_SAVE_KEY = "hh-call-log-save-on";

  function renderLog(){
    const isSaving = readStore(LOG_SAVE_KEY) === true;
    let entries = isSaving ? (readStore(LOG_KEY) || []) : [];

    function entryRowHtml(en){
      return `
        <div class="log-entry">
          <div class="log-entry-head">
            <span class="log-date">${escapeHtml(en.date || "(no date)")}</span>
            ${en.service ? `<span class="log-service">${escapeHtml(en.service)}</span>` : ""}
            <button type="button" class="log-delete" data-id="${en.id}" aria-label="Delete this entry">✕</button>
          </div>
          ${en.person ? `<p class="log-line"><strong>Spoke to:</strong> ${escapeHtml(en.person)}</p>` : ""}
          ${en.said ? `<p class="log-line"><strong>What was said:</strong> ${escapeHtml(en.said)}</p>` : ""}
          ${en.promised ? `<p class="log-line"><strong>Promised:</strong> ${escapeHtml(en.promised)}</p>` : ""}
          ${en.followUp ? `<p class="log-line"><strong>Follow up by:</strong> ${escapeHtml(en.followUp)}</p>` : ""}
        </div>
      `;
    }

    function entriesListHtml(){
      return entries.length
        ? entries.slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).map(entryRowHtml).join("")
        : `<div class="empty-state">No entries yet — add your first call or conversation below.</div>`;
    }

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>My call &amp; referral log</h1>
        <p class="count">Your own record of who you spoke to and what was said</p>
      </div>

      <div class="callout">
        Write down what was said, not what you think it meant — this is your personal recollection, not a verified record. By default nothing is saved: leaving this page clears it, so copy your log before you go. Tick "Save on this device" to keep it between visits — it's then stored in plain text in this browser, readable by anyone who can unlock this device. Leave it unticked if that's a risk for you.
      </div>

      <div class="prep-card">
        <label class="save-toggle">
          <input type="checkbox" id="logSaveToggle" ${isSaving ? "checked" : ""}>
          <span>Save on this device</span>
        </label>
        <button type="button" class="danger-btn" id="logClear" ${isSaving ? "" : "hidden"}>Clear saved log from this device</button>
      </div>

      <div class="prep-card">
        <h2>Add an entry</h2>
        <label class="prep-label" for="logDate">Date</label>
        <input type="date" id="logDate" class="prep-input">
        <label class="prep-label" for="logService">Service / department contacted</label>
        <input type="text" id="logService" class="prep-input" placeholder="e.g. Outpatients, CUH">
        <label class="prep-label" for="logPerson">Name &amp; role of person you spoke to</label>
        <input type="text" id="logPerson" class="prep-input" placeholder="e.g. Mary, secretary to Dr Byrne">
        <label class="prep-label" for="logSaid">What was said</label>
        <textarea id="logSaid" class="prep-input" rows="2" placeholder="Write what was said, in your own words"></textarea>
        <label class="prep-label" for="logPromised">What was promised, if anything</label>
        <input type="text" id="logPromised" class="prep-input" placeholder="e.g. Doctor will review chart by Thursday">
        <label class="prep-label" for="logFollowUp">Follow up by</label>
        <input type="date" id="logFollowUp" class="prep-input">
        <button type="button" class="copy-btn" id="logAdd">Add entry</button>
      </div>

      <div class="prep-card">
        <div class="log-list-head">
          <h2>Your entries</h2>
          <button type="button" class="copy-btn" id="logCopyAll">Copy full log</button>
        </div>
        <div class="log-list" id="logList">${entriesListHtml()}</div>
        <pre class="template-text" id="logCopyOutput" hidden></pre>
      </div>
    `;

    function persist(){
      if (document.getElementById("logSaveToggle").checked) writeStore(LOG_KEY, entries);
    }

    function refreshList(){
      const listEl = document.getElementById("logList");
      listEl.innerHTML = entriesListHtml();
      listEl.querySelectorAll(".log-delete").forEach(btn => {
        btn.addEventListener("click", () => {
          entries = entries.filter(en => en.id !== btn.dataset.id);
          persist();
          refreshList();
        });
      });
    }

    document.getElementById("logAdd").addEventListener("click", () => {
      const said = document.getElementById("logSaid").value.trim();
      const service = document.getElementById("logService").value.trim();
      const person = document.getElementById("logPerson").value.trim();
      const promised = document.getElementById("logPromised").value.trim();
      if (!said && !service && !person && !promised) return;
      entries.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        date: document.getElementById("logDate").value || new Date().toISOString().slice(0, 10),
        service, person, said, promised,
        followUp: document.getElementById("logFollowUp").value,
      });
      persist();
      refreshList();
      ["logDate", "logService", "logPerson", "logSaid", "logPromised", "logFollowUp"].forEach(id => { document.getElementById(id).value = ""; });
    });

    document.getElementById("logSaveToggle").addEventListener("change", (e) => {
      const clearBtn = document.getElementById("logClear");
      if (e.target.checked){
        writeStore(LOG_SAVE_KEY, true);
        writeStore(LOG_KEY, entries);
        clearBtn.hidden = false;
      } else {
        writeStore(LOG_SAVE_KEY, false);
        clearStore(LOG_KEY);
        clearBtn.hidden = true;
      }
    });

    document.getElementById("logClear").addEventListener("click", () => {
      entries = [];
      clearStore(LOG_KEY);
      writeStore(LOG_SAVE_KEY, false);
      document.getElementById("logSaveToggle").checked = false;
      document.getElementById("logClear").hidden = true;
      refreshList();
    });

    document.getElementById("logCopyAll").addEventListener("click", (e) => {
      const sorted = entries.slice().sort((a, b) => (a.date || "").localeCompare(b.date || ""));
      const text = sorted.map(en => [
        `Date: ${en.date || "(no date)"}`,
        en.service ? `Service: ${en.service}` : null,
        en.person ? `Spoke to: ${en.person}` : null,
        en.said ? `What was said: ${en.said}` : null,
        en.promised ? `Promised: ${en.promised}` : null,
        en.followUp ? `Follow up by: ${en.followUp}` : null,
      ].filter(Boolean).join("\n")).join("\n\n---\n\n");
      const out = document.getElementById("logCopyOutput");
      out.textContent = text || "No entries to copy yet.";
      out.hidden = false;
      copyElementText(out, e.target);
    });

    refreshList();
  }

  function renderAdvocacyGeneral(){
    return `
      <div class="callout">
        The Support orgs tab already spans women's health, neurodiversity, disability, cancer, and more — but not everyone's needs are covered there. These national bodies help specific groups navigate or advocate within the health &amp; social care system — regardless of gender or age.
      </div>
      <div class="org-grid">${GENERAL_ADVOCACY_ORGS.map(orgCardHtml).join("")}</div>
    `;
  }

  function renderAdvocacy(section){
    const sectionRenderers = { guide: renderAdvocacyGuide, templates: renderAdvocacyTemplates, schemes: renderAdvocacySchemes, hospitals: renderAdvocacyHospitals, contacts: renderAdvocacyContacts, orgs: renderAdvocacyOrgs, general: renderAdvocacyGeneral };
    const active = sectionRenderers[section] ? section : "guide";

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Know your rights</h1>
        <p class="count">Self-advocacy, complaints &amp; support — Ireland &amp; Northern Ireland</p>
      </div>

      ${advocacySegmentedHtml(active)}

      ${sectionRenderers[active]()}

      <div class="callout callout-spaced">
        Contact details and processes change — this page was last reviewed September 2026. Confirm current details on the organisation's own site before relying on them. This is signposting, not legal or medical advice.
      </div>
    `;
  }

  // Hash routing swaps #app's content without a real page load, which means
  // a screen reader hears nothing when navigation "succeeds" and keyboard
  // focus stays wherever it was (often back on a link in the old page).
  // After every render, announce the new page's heading via a live region.
  // Focus only moves to #app (tabindex="-1") on the SECOND and later route
  // calls — on the very first page load, the browser/screen reader already
  // announces the document title and starts at the top naturally, so moving
  // focus there too would skip that initial announcement and the skip-link.
  let hasRoutedOnce = false;
  function announceRouteChange(){
    const heading = app.querySelector("h1");
    const label = heading ? heading.textContent.trim() : (document.title || "Page");
    const announcer = document.getElementById("routeAnnouncer");
    if (announcer) announcer.textContent = label;
    // Skip while the search input itself has focus — the debounced input
    // handler above triggers this same route change on every keystroke, and
    // moving focus to #app mid-typing blurs the field, which dismisses the
    // on-screen keyboard on mobile.
    if (hasRoutedOnce && document.activeElement !== searchInput) app.focus({ preventScroll: true });
    hasRoutedOnce = true;
  }

  function route(){
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    window.scrollTo(0, 0);

    if (parts[0] !== "search") searchInput.value = "";
    updateTabbar(parts);

    if (parts.length === 0) renderHome();
    else if (parts[0] === "specialty" && !parts[1]) renderSpecialtyIndex();
    else if (parts[0] === "specialty" && parts[1]) renderList("specialty", parts[1], parts[2]);
    else if (parts[0] === "county" && !parts[1]) renderCountyIndex();
    else if (parts[0] === "county" && parts[1]) renderList("county", parts[1]);
    else if (parts[0] === "search" && parts[1]) renderSearch(decodeURIComponent(parts.slice(1).join("/")));
    else if (parts[0] === "entry" && parts[1]) renderEntry(parts[1]);
    else if (parts[0] === "advocacy") renderAdvocacy(parts[1] || "guide");
    else if (parts[0] === "out-of-hours") renderOutOfHours();
    else if (parts[0] === "prep") renderPrep();
    else if (parts[0] === "passport") renderPassport();
    else if (parts[0] === "log") renderLog();
    else renderHome();

    announceRouteChange();
  }

  // Script tags sit at the end of body with no defer/async, so the DOM is
  // already parsed by the time this runs — calling route() once here is
  // enough. (A DOMContentLoaded listener used to also be registered here,
  // which fired a split second later and ran route() a second time on
  // every load — harmless for rendering, but it broke the "only move focus
  // on the second-and-later navigation" check in announceRouteChange.)
  window.addEventListener("hashchange", route);
  route();

  // Register service worker for offline use
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
