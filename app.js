(function(){
  const app = document.getElementById("app");
  const searchInput = document.getElementById("searchInput");
  const tabbar = document.getElementById("tabbar");

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
  };
  const PIN_ICON = '<path d="M12 21s-6.5-6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>';

  function iconSvg(pathData, size){
    return `<svg width="${size||18}" height="${size||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
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

  // Finds bare domain mentions inside free text ("check cuidiu.ie for...")
  // and turns them into real links, since most of the site's prose bullets
  // mention a website by name rather than storing it as a separate field.
  function linkifyText(text){
    if (!text) return text;
    const urlPattern = /\b((?:[a-z0-9-]+\.)+(?:ie|com|org|net|uk|info|ca)(?:\/[^\s)]*)?)/gi;
    return text.replace(urlPattern, (match) => {
      const trailing = (match.match(/[.,;:!?]+$/) || [""])[0];
      const clean = trailing ? match.slice(0, -trailing.length) : match;
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

  function crisisBannerHtml(){
    const chips = CRISIS_RESOURCES.map(c => `
      <span class="crisis-contact">
        <span class="cc-name">${c.name}</span>
        <span class="cc-value">${c.contact}</span>
      </span>
    `).join("");
    return `
      <div class="crisis-banner">
        <div class="crisis-banner-head">
          <span class="crisis-icon">${iconSvg(ICON_PATHS.crisis, 18)}</span>
          <div>
            <h2>In a mental health crisis right now?</h2>
            <p>Free, confidential, 24/7 support. You don't need a referral or a diagnosis to use any of these.</p>
          </div>
        </div>
        <div class="crisis-contacts">${chips}</div>
        <a class="crisis-more" href="#/specialty/crisis">More crisis support &amp; details ›</a>
      </div>
    `;
  }

  function renderHome(){
    app.innerHTML = `
      ${crisisBannerHtml()}

      <div class="hero">
        <p class="hero-eyebrow">Ireland &amp; Northern Ireland</p>
        <h1>Navigating women's health, <em>wherever you are</em>.</h1>
        <p>A free directory for all women's health needs — growing to cover every specialty, not just maternity. Plus your rights: how to complain, get a second opinion, or request your records. Everywhere in Ireland and Northern Ireland.</p>
      </div>

      <div class="index-grid">
        <a class="index-tile tile-a" href="#/specialty">
          <span class="tile-icon">${iconSvg(ICON_PATHS.gynae, 28)}</span>
          <h2>By specialty</h2>
          <p>Obs &amp; gynae, urology, mental health, and more</p>
        </a>
        <a class="index-tile tile-b" href="#/county">
          <span class="tile-icon">${iconSvg(PIN_ICON, 28)}</span>
          <h2>By area</h2>
          <p>All 32 counties, plus national programmes across Ireland &amp; NI</p>
        </a>
      </div>

      <div class="quick-links">
        <h3>Often searched</h3>
        <div class="quick-link-row">
          <a class="pill" href="#/specialty/neurodiversity">Autism &amp; ADHD support</a>
          <a class="pill" href="#/specialty/parenting">Parenting &amp; new motherhood</a>
          <a class="pill" href="#/specialty/dsv">Domestic &amp; sexual violence</a>
          <a class="pill" href="#/specialty/feeding">Breastfeeding support</a>
          <a class="pill" href="#/advocacy">Know your rights &amp; how to complain</a>
        </div>
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

  function renderList(kind, id){
    const label = kind === "specialty" ? specialtyLabel(id) : countyLabel(id);
    const results = ENTRIES.filter(e => kind === "specialty" ? e.specialty.includes(id) : e.county.includes(id));
    const backHref = kind === "specialty" ? "#/specialty" : "#/county";
    const cards = results.length
      ? results.map(entryCardHtml).join("")
      : `<div class="empty-state">Nothing listed here yet.</div>`;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="${backHref}">‹ ${kind === "specialty" ? "Specialties" : "Areas"}</a>
        <h1>${label}</h1>
        <p class="count">${results.length} service${results.length === 1 ? "" : "s"}</p>
      </div>
      ${cards}
    `;
  }

  function renderSearch(query){
    const q = query.toLowerCase();
    const results = ENTRIES.filter(e => {
      const hay = [e.name, e.blurb, ...(e.details||[]), ...e.specialty.map(specialtyLabel), ...e.county.map(countyLabel)]
        .join(" ").toLowerCase();
      return hay.includes(q);
    });
    const orgResults = SUPPORT_ORGS.filter(o => {
      const hay = [o.name, o.remit, o.offer, ...(o.tags||[])].join(" ").toLowerCase();
      return hay.includes(q);
    });
    const totalCount = results.length + orgResults.length;
    const cards = results.length ? results.map(entryCardHtml).join("") : "";
    const orgCards = orgResults.length
      ? `<p class="section-title">Support &amp; advocacy organisations</p><div class="org-grid">${orgResults.map(orgCardHtml).join("")}</div>`
      : "";
    const body = totalCount
      ? `${cards}${orgCards}`
      : `<div class="empty-state">No matches for "${query}". Try a broader term, like a condition, area, or organisation name.</div>`;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Search: "${query}"</h1>
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

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="javascript:history.back()">‹ Back</a>
      </div>
      <div class="detail-card">
        <h1>${e.name}</h1>
        <p class="blurb">${linkifyText(e.blurb)}</p>
        ${tagsHtml(e)}
        ${contactLines.length ? `<div class="contact-block">${contactLines.join("")}</div>` : ""}
        ${detailsHtml}
        ${e.referral ? `<div class="referral-note"><strong>How to get in:</strong> ${linkifyText(e.referral)}</div>` : ""}
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
    { id: "hospitals", label: "FOI by hospital" },
    { id: "contacts", label: "Who to contact" },
    { id: "orgs", label: "Support orgs" },
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
        <strong>Why this page exists:</strong> being dismissed or not believed is a well-documented pattern in Irish healthcare, not something you're imagining — most recently confirmed by the Department of Health's own 2025 listening forum with 142 women, and a peer-reviewed 2024 Irish study on pain dismissal. This page exists to make the practical steps easier to find.
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

  function renderAdvocacyContacts(){
    const rightsHtml = RIGHTS_BODIES.map(r => {
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
    }).join("");
    return `<div class="rights-ladder">${rightsHtml}</div>`;
  }

  function renderAdvocacyOrgs(){
    return `<div class="org-grid">${SUPPORT_ORGS.map(orgCardHtml).join("")}</div>`;
  }

  function renderAdvocacy(section){
    const sectionRenderers = { guide: renderAdvocacyGuide, hospitals: renderAdvocacyHospitals, contacts: renderAdvocacyContacts, orgs: renderAdvocacyOrgs };
    const active = sectionRenderers[section] ? section : "guide";

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Know your rights</h1>
        <p class="count">Self-advocacy, complaints &amp; support — Ireland &amp; Northern Ireland</p>
      </div>

      ${advocacySegmentedHtml(active)}

      ${sectionRenderers[active]()}

      <div class="callout" style="margin-top:24px;">
        Contact details and processes change — this page was last reviewed September 2026. Confirm current details on the organisation's own site before relying on them. This is signposting, not legal or medical advice.
      </div>
    `;
  }

  function route(){
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    window.scrollTo(0, 0);

    if (parts[0] !== "search") searchInput.value = "";
    updateTabbar(parts);

    if (parts.length === 0) return renderHome();
    if (parts[0] === "specialty" && !parts[1]) return renderSpecialtyIndex();
    if (parts[0] === "specialty" && parts[1]) return renderList("specialty", parts[1]);
    if (parts[0] === "county" && !parts[1]) return renderCountyIndex();
    if (parts[0] === "county" && parts[1]) return renderList("county", parts[1]);
    if (parts[0] === "search" && parts[1]) return renderSearch(decodeURIComponent(parts.slice(1).join("/")));
    if (parts[0] === "entry" && parts[1]) return renderEntry(parts[1]);
    if (parts[0] === "advocacy") return renderAdvocacy(parts[1] || "guide");
    return renderHome();
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("DOMContentLoaded", route);
  route();

  // Register service worker for offline use
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
