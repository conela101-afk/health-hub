(function(){
  const app = document.getElementById("app");
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");

  searchToggle.addEventListener("click", () => {
    searchBar.classList.toggle("open");
    if (searchBar.classList.contains("open")) searchInput.focus();
  });

  let searchDebounce;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      const q = searchInput.value.trim();
      if (q.length > 0) location.hash = "#/search/" + encodeURIComponent(q);
      else if (location.hash.startsWith("#/search")) location.hash = "#/";
    }, 180);
  });

  function specialtyLabel(id){ return (SPECIALTIES.find(s => s.id === id) || {}).label || id; }
  function countyLabel(id){ return (COUNTIES.find(c => c.id === id) || {}).label || id; }

  function tagsHtml(entry){
    const specTags = entry.specialty.map(s => `<span class="tag tag-berry">${specialtyLabel(s)}</span>`).join("");
    const countyTags = entry.county.map(c => `<span class="tag tag-sage">${countyLabel(c)}</span>`).join("");
    return `<div class="tag-row">${specTags}${countyTags}</div>`;
  }

  function entryCardHtml(entry){
    return `<a class="entry-card" href="#/entry/${entry.id}">
      <h3>${entry.name}</h3>
      <p class="blurb">${entry.blurb}</p>
      ${tagsHtml(entry)}
    </a>`;
  }

  function renderHome(){
    app.innerHTML = `
      <div class="hero">
        <p class="hero-eyebrow">Cork edition</p>
        <h1>Navigating women's health, in one place.</h1>
        <p>A free directory of maternity, gynaecology, mental health, and community supports across Cork — built so you can find the right door on the first try.</p>
      </div>

      <div class="index-grid">
        <a class="index-tile" href="#/specialty">
          <span class="ref">Browse A</span>
          <h2>By specialty</h2>
          <p>Obs &amp; gynae, urology, mental health, and more</p>
        </a>
        <a class="index-tile" href="#/county">
          <span class="ref">Browse B</span>
          <h2>By area</h2>
          <p>Cork City, North Cork, West Cork</p>
        </a>
      </div>

      <div class="quick-links">
        <h3>Often searched</h3>
        <div class="quick-link-row">
          <a class="pill" href="#/specialty/mh">Perinatal mental health</a>
          <a class="pill" href="#/specialty/dsv">Domestic &amp; sexual violence</a>
          <a class="pill" href="#/specialty/feeding">Breastfeeding support</a>
          <a class="pill" href="#/advocacy">How to advocate for yourself</a>
        </div>
      </div>
    `;
  }

  function renderSpecialtyIndex(){
    const rows = SPECIALTIES.map(s => {
      const n = ENTRIES.filter(e => e.specialty.includes(s.id)).length;
      return `<a class="row" href="#/specialty/${s.id}">
        <h2>${s.label}</h2>
        <span class="n">${n} &nbsp;<span class="arrow">›</span></span>
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
      return `<a class="row" href="#/county/${c.id}">
        <h2>${c.label}</h2>
        <span class="n">${n} &nbsp;<span class="arrow">›</span></span>
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
    const cards = results.length
      ? results.map(entryCardHtml).join("")
      : `<div class="empty-state">No matches for "${query}". Try a broader term, like a condition or an area name.</div>`;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Search: "${query}"</h1>
        <p class="count">${results.length} result${results.length === 1 ? "" : "s"}</p>
      </div>
      ${cards}
    `;
    searchBar.classList.add("open");
    searchInput.value = query;
  }

  function renderEntry(id){
    const e = ENTRIES.find(x => x.id === id);
    if (!e){ app.innerHTML = `<div class="empty-state">Not found.</div>`; return; }
    const c = e.contact || {};
    const contactLines = [];
    if (c.phone) contactLines.push(`<div class="line"><span class="k">Phone</span><span>${c.phone}</span></div>`);
    if (c.extra) contactLines.push(`<div class="line"><span class="k"></span><span>${c.extra}</span></div>`);
    if (c.email) contactLines.push(`<div class="line"><span class="k">Email</span><span>${c.email}</span></div>`);
    if (c.web) contactLines.push(`<div class="line"><span class="k">Web</span><span>${c.web}</span></div>`);
    if (c.address) contactLines.push(`<div class="line"><span class="k">Address</span><span>${c.address}</span></div>`);

    const detailsHtml = (e.details && e.details.length)
      ? `<p class="detail-section-title">Good to know</p><ul class="detail-list">${e.details.map(d => `<li>${d}</li>`).join("")}</ul>`
      : "";

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="javascript:history.back()">‹ Back</a>
      </div>
      <div class="detail-card">
        <h1>${e.name}</h1>
        <p class="blurb">${e.blurb}</p>
        ${tagsHtml(e)}
        ${contactLines.length ? `<div class="contact-block">${contactLines.join("")}</div>` : ""}
        ${detailsHtml}
        ${e.referral ? `<div class="referral-note"><strong>How to get in:</strong> ${e.referral}</div>` : ""}
      </div>
    `;
  }

  function renderAdvocacy(){
    const tips = ADVOCACY_TIPS.map(t => `<li>${t}</li>`).join("");
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>How to advocate for yourself</h1>
        <p class="count">Practical steps, not theory</p>
      </div>
      <ol class="tip-list">${tips}</ol>
    `;
  }

  function route(){
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    window.scrollTo(0, 0);

    if (parts.length === 0) return renderHome();
    if (parts[0] === "specialty" && !parts[1]) return renderSpecialtyIndex();
    if (parts[0] === "specialty" && parts[1]) return renderList("specialty", parts[1]);
    if (parts[0] === "county" && !parts[1]) return renderCountyIndex();
    if (parts[0] === "county" && parts[1]) return renderList("county", parts[1]);
    if (parts[0] === "search" && parts[1]) return renderSearch(decodeURIComponent(parts.slice(1).join("/")));
    if (parts[0] === "entry" && parts[1]) return renderEntry(parts[1]);
    if (parts[0] === "advocacy") return renderAdvocacy();
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
