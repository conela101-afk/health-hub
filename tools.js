// Guided tools: complaints navigator, records-request builder, schemes &
// cards selector, "while you wait", discharge passport (and the optional
// AON explainer). Loaded before app.js; app.js's router calls
// HH_TOOLS.render(name, app, utils) for #/tools/<name>.
//
// All content comes from data.js (TOOL_FACTS, TOOL_UI_TEXT, COMPLAINT_NAV,
// TOOL_LETTERS and friends). This file only holds logic. Nothing typed here
// is sent anywhere. Storage is used only where the person ticks "Save on
// this device", and every read/write goes through utils.readStore /
// writeStore (both wrapped in try/catch in app.js), so an empty or blocked
// localStorage just means an empty form.
//
// Scope, deliberately: administrative and statutory routes only. These
// tools don't assess symptoms, give clinical or legal advice, work out
// whether someone is eligible for a scheme, or predict outcomes. The date
// helper only adds a published time period to a date the person enters, and
// labels the result approximate.
window.HH_TOOLS = (function(){
  "use strict";

  const FACT_BY_ID = {};
  (typeof TOOL_FACTS !== "undefined" ? TOOL_FACTS : []).forEach(f => { FACT_BY_ID[f.id] = f; });

  let u = null; // utils from app.js, set on each render

  function esc(s){ return u.escapeHtml(s == null ? "" : String(s)); }
  function fact(id){ return FACT_BY_ID[id] || null; }

  // ---------- Shared rendering ----------

  function headHtml(title, sub){
    return `
      <div class="page-head">
        <a class="back-link" href="#/tools">‹ Guided tools</a>
        <h1>${esc(title)}</h1>
        ${sub ? `<p class="count">${esc(sub)}</p>` : ""}
      </div>
      <div class="callout">
        <strong>${esc(TOOL_UI_TEXT.disclaimer)}</strong> ${esc(TOOL_UI_TEXT.privacy)}
      </div>
    `;
  }

  function footHtml(){
    return `<p class="checked-note">${esc(TOOL_UI_TEXT.howChecked)}</p>`;
  }

  function verifyTagHtml(f){
    return f && f.verify ? ` <span class="tag tag-coral">${esc(TOOL_UI_TEXT.verifyLabel)}</span>` : "";
  }

  function factLiHtml(id){
    const f = fact(id);
    if (!f) return "";
    const often = f.volatility === "high" ? ` <span class="tag tag-sand">Changes often (checked ${esc(f.last_verified)})</span>` : "";
    return `<li>${esc(f.text)}${verifyTagHtml(f)}${often}<br><a href="${esc(f.source_url)}" target="_blank" rel="noopener">${esc(f.source_name)} ↗</a></li>`;
  }

  function factListHtml(ids){
    const items = (ids || []).map(factLiHtml).filter(Boolean).join("");
    return items ? `<ul class="detail-list">${items}</ul>` : "";
  }

  function moduleHtml(title, inner){
    return `<div class="guide-module"><h2>${esc(title)}</h2>${inner}</div>`;
  }

  // Radio group rendered as the existing .check-list/.check-row pattern.
  function radiosHtml(name, options, selected){
    return `<div class="check-list" role="radiogroup">${options.map(o => `
      <label class="check-row">
        <input type="radio" name="${esc(name)}" value="${esc(o.id)}" ${o.id === selected ? "checked" : ""}>
        <span>${esc(o.label)}</span>
      </label>`).join("")}</div>`;
  }

  function onRadio(root, name, fn){
    root.querySelectorAll(`input[name="${name}"]`).forEach(el => {
      el.addEventListener("change", () => { if (el.checked) fn(el.value); });
    });
  }

  // ---------- Dates ----------
  // Inputs are "YYYY-MM-DD" from <input type="date">, parsed as a local date
  // so time zones can't shift the day.

  function parseIso(iso){
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return isNaN(d.getTime()) ? null : d;
  }

  function niceDate(d){
    if (!d) return "";
    return d.toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
  }

  // Letters read better without the weekday.
  function letterDate(iso){
    const d = parseIso(iso);
    return d ? d.toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" }) : "";
  }

  function addPeriod(start, calc){
    if (!start || !calc) return null;
    const d = new Date(start.getTime());
    if (calc.unit === "calendar_days"){
      d.setDate(d.getDate() + calc.amount);
    } else if (calc.unit === "working_days"){
      let left = calc.amount;
      while (left > 0){
        d.setDate(d.getDate() + 1);
        const day = d.getDay();
        if (day !== 0 && day !== 6) left--;
      }
    } else if (calc.unit === "months"){
      const dayOfMonth = d.getDate();
      d.setDate(1);
      d.setMonth(d.getMonth() + calc.amount);
      const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(dayOfMonth, lastDay));
    } else {
      return null;
    }
    return d;
  }

  function periodLabel(calc){
    if (!calc) return "";
    const n = calc.amount;
    if (calc.unit === "working_days") return `${n} working day${n === 1 ? "" : "s"}`;
    if (calc.unit === "calendar_days") return `${n} day${n === 1 ? "" : "s"}`;
    if (calc.unit === "months") return `${n} month${n === 1 ? "" : "s"}`;
    return "";
  }

  function todayNice(){
    return new Date().toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
  }

  // ---------- Letters ----------

  function fillLetter(templateId, values, placeholders){
    const t = TOOL_LETTERS[templateId];
    if (!t) return "";
    return t.body.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const v = values[key];
      if (v != null && v !== "") return v;
      return placeholders[key] != null ? placeholders[key] : `[${key}]`;
    }).replace(/\n{3,}/g, "\n\n");
  }

  function letterButtonsHtml(outputId){
    return `
      <button type="button" class="copy-btn" data-copy-target="${outputId}">Copy letter text</button>
      <button type="button" class="copy-btn" data-print-target="${outputId}">Print / save PDF</button>
    `;
  }

  // app.js's print CSS hides the app shell and other .prep-cards, but not
  // the result modules these tools add. Hide every top-level block that
  // doesn't contain the target for the duration of the print, then restore
  // it, so only the letter prints. (JS-only on purpose: styling is out of
  // this lane.)
  function wirePrint(root){
    root.querySelectorAll("[data-print-target]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.printTarget);
        const hiddenNow = [];
        Array.from(root.children).forEach(el => {
          if (!el.hidden && target && !el.contains(target)){ el.hidden = true; hiddenNow.push(el); }
        });
        const restore = () => { hiddenNow.forEach(el => { el.hidden = false; }); window.removeEventListener("afterprint", restore); };
        window.addEventListener("afterprint", restore);
        u.printOnly(btn.dataset.printTarget);
      });
    });
  }

  // Opt-in "Save on this device" wiring, same pattern as Passport/Log.
  function saveToggleHtml(id, isSaving, clearLabel){
    return `
      <label class="save-toggle">
        <input type="checkbox" id="${id}Toggle" ${isSaving ? "checked" : ""}>
        <span>Save on this device</span>
      </label>
      <button type="button" class="danger-btn" id="${id}Clear" ${isSaving ? "" : "hidden"}>${esc(clearLabel)}</button>
    `;
  }

  // ======================================================================
  // Index: #/tools
  // ======================================================================

  const TOOL_LIST = [
    { id: "complaints", name: "Complaints navigator", blurb: "Find the right body, stage and time limit for a health complaint, then build a letter." },
    { id: "records", name: "Records-request builder", blurb: "Choose between FOI and a subject access request, build the letter, and track the deadline." },
    { id: "schemes", name: "Schemes and cards selector", blurb: "Cross-border treatment schemes, medical cards and GP visit cards: which official pages apply to you." },
    { id: "waiting", name: "While you wait", blurb: "Validation letters, \"suspended\" and \"planned procedure\" explained, how to ask about your status, and where the official figures are." },
    { id: "discharge", name: "Discharge passport", blurb: "A printable page for medicines, appointments, contacts and questions to ask before you leave hospital." },
    { id: "aon", name: "Assessment of Need explainer", blurb: "Your rights and the statutory timeline under the Disability Act 2005 (Republic of Ireland)." },
  ];

  function renderIndex(app){
    const list = TOOL_LIST;
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Guided tools</h1>
        <p class="count">Step-by-step help with complaints, records and schemes, across Ireland and Northern Ireland</p>
      </div>
      <div class="callout"><strong>${esc(TOOL_UI_TEXT.disclaimer)}</strong> ${esc(TOOL_UI_TEXT.privacy)}</div>
      <div class="simple-list">
        ${list.map(t => `<a class="row" href="#/tools/${t.id}"><span class="row-body"><h2>${esc(t.name)}</h2><p>${esc(t.blurb)}</p></span><span class="arrow">›</span></a>`).join("")}
      </div>
    `;
  }

  // ======================================================================
  // Tool 1: Complaints navigator — #/tools/complaints
  // jurisdiction -> service -> stage -> body & next step -> deadline -> letter
  // ======================================================================

  const CN_FIELDS = [
    { id: "name", label: "Your name", type: "text", ph: "[Your name]" },
    { id: "contact", label: "Your address, phone or email", type: "textarea", ph: "[Your address / phone / email]" },
    { id: "service", label: "Service, hospital or practice (and department)", type: "text", ph: "[Service name and department]" },
    { id: "ref", label: "Complaint reference number (if you have one)", type: "text", ph: "" },
    { id: "dates", label: "Date it happened (or the first date, if it went on over several days)", type: "date", ph: "[Date(s)]" },
    { id: "datesTo", label: "Last date (only if it happened over more than one day)", type: "date", ph: "" },
    { id: "responseDate", label: "Date of the last response you received (if any)", type: "date", ph: "[date of response]" },
    { id: "what", label: "What happened (facts, in order)", type: "textarea", ph: "[Describe what happened, in order, sticking to facts]" },
    { id: "tried", label: "What you've already tried", type: "textarea", ph: "[Who you spoke to or wrote to, and when]" },
    { id: "outcome", label: "What you'd like to happen", type: "textarea", ph: "[For example: an explanation, an apology, a review of a decision, a change in practice]" },
  ];

  function renderComplaints(app){
    const state = { j: null, service: null, stage: null };

    app.innerHTML = `
      ${headHtml("Complaints navigator", "Who to complain to, what stage you're at, and the time limits")}

      <div class="prep-card">
        <h2>1. Where was the service?</h2>
        ${radiosHtml("cnJ", [{ id: "ROI", label: COMPLAINT_NAV.ROI.label }, { id: "NI", label: COMPLAINT_NAV.NI.label }], null)}
      </div>
      <div class="prep-card" id="cnService" hidden></div>
      <div class="prep-card" id="cnStage" hidden></div>
      <div id="cnResult" hidden></div>
      <div class="prep-card" id="cnDeadline" hidden></div>

      <div class="prep-card" id="cnLetter" hidden>
        <h2 id="cnLetterTitle">Your letter</h2>
        <p class="save-note">Fill in what you can. Blank fields show as [brackets] in the letter. Nothing here is saved.</p>
        ${CN_FIELDS.map(f => `
          <label class="prep-label" for="cn-${f.id}">${esc(f.label)}</label>
          ${f.type === "textarea"
            ? `<textarea id="cn-${f.id}" class="prep-input" rows="3"></textarea>`
            : `<input type="${f.type}" id="cn-${f.id}" class="prep-input">`}
        `).join("")}
        <pre class="template-text" id="cnOutput"></pre>
        ${letterButtonsHtml("cnOutput")}
      </div>

      ${footHtml()}
    `;

    const serviceEl = document.getElementById("cnService");
    const stageEl = document.getElementById("cnStage");
    const resultEl = document.getElementById("cnResult");
    const deadlineEl = document.getElementById("cnDeadline");
    const letterEl = document.getElementById("cnLetter");

    function currentOutcome(){
      if (!state.j || !state.service || !state.stage) return null;
      const stages = COMPLAINT_NAV[state.j].stages[state.service] || [];
      return stages.find(s => s.id === state.stage) || null;
    }

    function drawService(){
      const nav = COMPLAINT_NAV[state.j];
      serviceEl.innerHTML = `<h2>2. What kind of service?</h2>${radiosHtml("cnSvc", nav.services, state.service)}`;
      serviceEl.hidden = false;
      onRadio(serviceEl, "cnSvc", v => { state.service = v; state.stage = null; drawStage(); });
    }

    function drawStage(){
      const stages = COMPLAINT_NAV[state.j].stages[state.service] || [];
      stageEl.innerHTML = `<h2>3. Where are you up to?</h2>${radiosHtml("cnStg", stages, state.stage)}`;
      stageEl.hidden = false;
      onRadio(stageEl, "cnStg", v => { state.stage = v; drawResult(); });
      drawResult();
    }

    function drawResult(){
      const o = currentOutcome();
      if (!o){
        resultEl.hidden = true; deadlineEl.hidden = true; letterEl.hidden = true;
        return;
      }
      const link = o.link
        ? `<div class="quick-link-row callout-pill-row"><a class="pill" href="${esc(o.link.href)}" ${o.link.external ? 'target="_blank" rel="noopener"' : ""}>${esc(o.link.label)}${o.link.external ? " ↗" : ""}</a></div>`
        : "";
      resultEl.innerHTML = `
        <div class="guide-list">
          ${moduleHtml("4. Who to contact", `<p>${esc(o.body)}</p>`)}
          ${moduleHtml("Next step", `<p>${esc(o.next)}</p>${link}`)}
          ${moduleHtml("What the official sources say", factListHtml(o.facts))}
          ${o.also && o.also.length ? moduleHtml("Free help and other routes", factListHtml(o.also)) : ""}
        </div>
      `;
      resultEl.hidden = false;
      drawDeadline(o);
      drawLetter(o);
    }

    function drawDeadline(o){
      const f = o.deadline ? fact(o.deadline.fact) : null;
      if (!f || !f.calc){
        deadlineEl.innerHTML = `<h2>5. Time limit</h2><p class="save-note">There's no single published time limit for this step. Check with the organisation, and act promptly.</p>`;
        deadlineEl.hidden = false;
        return;
      }
      deadlineEl.innerHTML = `
        <h2>5. Time limit</h2>
        <p>${esc(f.text)}${verifyTagHtml(f)}</p>
        <label class="prep-label" for="cnDate">${esc(o.deadline.from)}</label>
        <input type="date" id="cnDate" class="prep-input">
        <p id="cnDateOut" aria-live="polite"></p>
        <p class="save-note">${esc(TOOL_UI_TEXT.dateApprox)}</p>
      `;
      deadlineEl.hidden = false;
      const input = document.getElementById("cnDate");
      input.addEventListener("input", () => {
        const start = parseIso(input.value);
        const end = addPeriod(start, f.calc);
        document.getElementById("cnDateOut").innerHTML = end
          ? `<strong>About ${esc(periodLabel(f.calc))} from that date: ${esc(niceDate(end))}</strong>`
          : "";
      });
    }

    function letterValues(){
      const v = {};
      CN_FIELDS.forEach(f => { v[f.id] = (document.getElementById("cn-" + f.id).value || "").trim(); });
      v.responseDate = letterDate(v.responseDate);
      // "dates" is now a calendar input plus an optional end date; join them
      // back into the single {{dates}} value the letter templates expect.
      const first = letterDate(v.dates), last = letterDate(v.datesTo);
      v.dates = first && last && last !== first ? first + " to " + last : first;
      v.refLine = v.ref ? ` (your reference: ${v.ref})` : "";
      v.processLine = (state.j === "ROI" && state.service === "hse") ? ", under the HSE's Your Service Your Say process (Stage 2)" : "";
      v.today = todayNice();
      return v;
    }

    function refreshLetter(){
      const o = currentOutcome();
      if (!o || !o.letter) return;
      const placeholders = {};
      CN_FIELDS.forEach(f => { placeholders[f.id] = f.ph; });
      placeholders.refLine = ""; placeholders.processLine = "";
      document.getElementById("cnOutput").textContent = fillLetter(o.letter, letterValues(), placeholders);
    }

    function drawLetter(o){
      if (!o.letter || !TOOL_LETTERS[o.letter]){
        letterEl.hidden = true;
        return;
      }
      document.getElementById("cnLetterTitle").textContent = "6. Optional: build your letter (" + TOOL_LETTERS[o.letter].title + ")";
      letterEl.hidden = false;
      refreshLetter();
    }

    CN_FIELDS.forEach(f => document.getElementById("cn-" + f.id).addEventListener("input", refreshLetter));
    onRadio(app, "cnJ", v => {
      state.j = v; state.service = null; state.stage = null;
      stageEl.hidden = true;
      drawService();
      drawResult();
    });
    wirePrint(app);
  }

  // ======================================================================
  // Tool 2: Records-request builder — #/tools/records
  // ======================================================================

  const RR_TRACK_KEY = "hh-records-tracker";
  const RR_TRACK_SAVE_KEY = "hh-records-tracker-save-on";

  // Which fact holds each route's timings, for the tracker.
  const RR_ROUTES = [
    { id: "foi-roi", label: "FOI (Republic of Ireland)", ack: "rr-roi-foi-ack", decision: "rr-roi-foi-decision" },
    { id: "sar-roi", label: "SAR (Republic of Ireland)", ack: null, decision: "rr-roi-sar-decision" },
    { id: "sar-ni", label: "SAR (Northern Ireland)", ack: null, decision: "rr-ni-sar" },
  ];

  // Recommendation logic. Returns { route: "foi"|"sar"|"either"|"ni-sar"|
  // "ni-deceased"|"ask", facts: [...], note }. It maps the person's answers
  // to the published guidance; it doesn't decide anything for them.
  function recommendRoute(a){
    if (a.j === "NI"){
      if (a.whose === "deceased") return { route: "ni-deceased", facts: ["rr-ni-deceased"], note: "Requests for a deceased person's records in Northern Ireland use a separate process. Ask the Trust or GP practice for its application form." };
      return { route: "ni-sar", facts: ["rr-ni-sar"].concat(a.whose === "child" ? ["rr-ni-child"] : []), note: "Use a subject access request." };
    }
    const foiPossible = a.where === "hse" || a.where === "voluntary" || a.where === "gp-mc";
    const base = ["rr-roi-where", "rr-roi-default-sar"];
    if (a.where === "private") return { route: "sar", facts: ["rr-roi-private"].concat(base), note: "FOI doesn't apply to private providers, so a SAR is the route here." + (a.whose === "deceased" || a.whose === "child" ? " For a child's or a deceased person's records, ask the provider's data protection officer how they handle it." : "") };
    if (a.where === "gp-private") return { route: "sar", facts: ["rr-roi-gp-foi"].concat(base), note: "Private GP patients can't use FOI for GP-held records. Use a SAR to the practice." };
    const sensitive = a.whose === "child" || a.whose === "deceased" || a.type === "psych";
    const extra = a.where === "voluntary" ? ["rr-roi-voluntary"] : [];
    if (foiPossible && sensitive) return { route: "foi", facts: ["rr-roi-foi-sensitive", "rr-roi-foi-free", "rr-roi-foi-ack", "rr-roi-foi-decision"].concat(extra, base), note: "The HSE recommends FOI for this kind of record." };
    return { route: "either", facts: ["rr-roi-foi-free", "rr-roi-foi-ack", "rr-roi-foi-decision", "rr-roi-sar-decision"].concat(a.where === "gp-mc" ? ["rr-roi-gp-foi"] : [], extra, base, ["rr-roi-extensions"]), note: "Either route can work for your own records. Pick one and say which in your letter. If you don't, the HSE treats it as a SAR." };
  }

  const RR_FIELDS = [
    { id: "name", label: "Your name", type: "text", ph: "[Your name]" },
    { id: "address", label: "Your address", type: "textarea", ph: "[Your address]" },
    { id: "dob", label: "Your date of birth", type: "date", ph: "[Date of birth]" },
    { id: "contact", label: "Phone or email (optional)", type: "text", ph: "" },
    { id: "service", label: "Hospital, service or practice that holds the records", type: "text", ph: "[Hospital / service / practice]" },
    { id: "records", label: "Which records", type: "textarea", ph: "[For example: all records, including clinical notes, test results, imaging reports and correspondence]" },
    { id: "period", label: "Period covered", type: "text", ph: "[For example: all dates, or January 2024 to now]" },
    { id: "chartNumber", label: "Hospital / chart number (optional)", type: "text", ph: "[not known]" },
    { id: "forWhom", label: "If the records aren't yours: whose, and your relationship (FOI letters only)", type: "textarea", ph: "" },
  ];

  function renderRecords(app){
    const a = { j: null, whose: null, type: null, where: null };
    const isSaving = u.readStore(RR_TRACK_SAVE_KEY) === true;
    let tracked = isSaving ? (u.readStore(RR_TRACK_KEY) || []) : [];
    if (!Array.isArray(tracked)) tracked = [];

    app.innerHTML = `
      ${headHtml("Records-request builder", "FOI or subject access request: pick a route, build the letter, track the deadline")}

      <div class="prep-card">
        <h2>1. Where are the records held?</h2>
        ${radiosHtml("rrJ", [{ id: "ROI", label: "Republic of Ireland" }, { id: "NI", label: "Northern Ireland" }], null)}
      </div>
      <div class="prep-card" id="rrQ2" hidden></div>
      <div id="rrResult" hidden></div>

      <div class="prep-card" id="rrLetter" hidden>
        <h2>Build your request letter</h2>
        <span class="prep-label">Route</span>
        <div id="rrRouteChoice"></div>
        <label class="prep-label" for="rrFormat">Format</label>
        <select id="rrFormat" class="prep-input">
          <option value="digital">By secure email (PDF)</option>
          <option value="paper">On paper, by post</option>
        </select>
        ${RR_FIELDS.map(f => `
          <label class="prep-label" for="rr-${f.id}">${esc(f.label)}</label>
          ${f.type === "textarea"
            ? `<textarea id="rr-${f.id}" class="prep-input" rows="2"></textarea>`
            : `<input type="${f.type}" id="rr-${f.id}" class="prep-input">`}
        `).join("")}
        <p class="save-note">Nothing typed in this letter form is saved.</p>
        <pre class="template-text" id="rrOutput"></pre>
        ${letterButtonsHtml("rrOutput")}
      </div>

      <div class="prep-card">
        <h2>Deadline tracker</h2>
        <p class="save-note">Add a request you've sent. The dates below are worked out from the date you enter and the published time limits. By default this list disappears when you leave the page. Tick "Save on this device" to keep it; it's then stored in plain text in this browser.</p>
        ${saveToggleHtml("rrTrack", isSaving, "Clear saved tracker from this device")}
        <label class="prep-label" for="rrTOrg">Sent to</label>
        <input type="text" id="rrTOrg" class="prep-input" placeholder="e.g. Cork University Hospital FOI office">
        <label class="prep-label" for="rrTRoute">Route</label>
        <select id="rrTRoute" class="prep-input">${RR_ROUTES.map(r => `<option value="${r.id}">${esc(r.label)}</option>`).join("")}</select>
        <label class="prep-label" for="rrTDate">Date they received it</label>
        <input type="date" id="rrTDate" class="prep-input">
        <button type="button" class="copy-btn" id="rrTAdd">Add to tracker</button>
        <div class="log-list" id="rrTList"></div>
        <p class="save-note">${esc(TOOL_UI_TEXT.dateApprox)}</p>
      </div>

      ${footHtml()}
    `;

    const q2 = document.getElementById("rrQ2");
    const resultEl = document.getElementById("rrResult");
    const letterEl = document.getElementById("rrLetter");
    let chosenRoute = null;

    function drawQuestions(){
      const whose = [
        { id: "self", label: "My own records" },
        { id: "child", label: "My child's records" },
        { id: "deceased", label: "A deceased person's records" },
      ];
      const roiWhere = [
        { id: "hse", label: "HSE hospital or HSE service" },
        { id: "voluntary", label: "Voluntary hospital (for example the Mater, St Vincent's, St James's)" },
        { id: "gp-mc", label: "GP practice, and I have a medical card" },
        { id: "gp-private", label: "GP practice, as a private patient" },
        { id: "private", label: "Private hospital or clinic" },
      ];
      q2.innerHTML = `
        <h2>2. Whose records?</h2>
        ${radiosHtml("rrWhose", whose, a.whose)}
        ${a.j === "ROI" ? `
          <h2>3. What kind of records?</h2>
          ${radiosHtml("rrType", [{ id: "general", label: "General medical records" }, { id: "psych", label: "Psychiatric or mental health records" }], a.type)}
          <h2>4. Who holds them?</h2>
          ${radiosHtml("rrWhere", roiWhere, a.where)}
        ` : ""}
      `;
      q2.hidden = false;
      onRadio(q2, "rrWhose", v => { a.whose = v; drawResult(); });
      onRadio(q2, "rrType", v => { a.type = v; drawResult(); });
      onRadio(q2, "rrWhere", v => { a.where = v; drawResult(); });
    }

    function ready(){
      return a.j === "NI" ? !!a.whose : !!(a.whose && a.type && a.where);
    }

    function drawResult(){
      if (!ready()){ resultEl.hidden = true; letterEl.hidden = true; return; }
      const r = recommendRoute(a);
      const routeName = { foi: "Freedom of Information (FOI) request", sar: "Subject access request (SAR)", either: "FOI or SAR: your choice", "ni-sar": "Subject access request (UK GDPR)", "ni-deceased": "Access to Health Records (NI) Order 1993 application", ask: "Ask the provider" }[r.route];
      resultEl.innerHTML = `
        <div class="guide-list">
          ${moduleHtml("Suggested route: " + routeName, `<p>${esc(r.note)}</p>`)}
          ${moduleHtml("What the official sources say", factListHtml(r.facts))}
        </div>
      `;
      resultEl.hidden = false;

      if (r.route === "ni-deceased"){ letterEl.hidden = true; return; }
      const options = a.j === "NI"
        ? [{ id: "sar-ni", label: "Subject access request (UK GDPR)" }]
        : r.route === "sar"
          ? [{ id: "sar-roi", label: "Subject access request (GDPR)" }]
          : [{ id: "foi-roi", label: "FOI request" }, { id: "sar-roi", label: "Subject access request (GDPR)" }];
      if (!options.some(o => o.id === chosenRoute)) chosenRoute = options[0].id;
      document.getElementById("rrRouteChoice").innerHTML = radiosHtml("rrRoute", options, chosenRoute);
      onRadio(letterEl, "rrRoute", v => { chosenRoute = v; refreshLetter(); });
      letterEl.hidden = false;
      refreshLetter();
    }

    function refreshLetter(){
      if (letterEl.hidden) return;
      const v = {};
      RR_FIELDS.forEach(f => { v[f.id] = (document.getElementById("rr-" + f.id).value || "").trim(); });
      v.dob = letterDate(v.dob);
      v.today = todayNice();
      v.format = document.getElementById("rrFormat").value === "paper" ? "on paper, by post" : "electronically, by secure email";
      v.gdprRef = chosenRoute === "sar-ni" ? "Article 15 of the UK GDPR" : "Article 15 of the GDPR";
      v.forWhom = v.forWhom ? `These records are not my own. ${v.forWhom}` : "";
      const placeholders = {};
      RR_FIELDS.forEach(f => { placeholders[f.id] = f.ph; });
      placeholders.forWhom = ""; placeholders.contact = "";
      const template = chosenRoute === "foi-roi" ? "rr-foi-roi" : "rr-sar";
      document.getElementById("rrOutput").textContent = fillLetter(template, v, placeholders);
    }

    RR_FIELDS.forEach(f => document.getElementById("rr-" + f.id).addEventListener("input", refreshLetter));
    document.getElementById("rrFormat").addEventListener("change", refreshLetter);
    onRadio(app, "rrJ", v => { a.j = v; a.whose = null; a.type = null; a.where = null; drawQuestions(); drawResult(); });

    // ---- Tracker ----
    function trackRowHtml(t){
      const route = RR_ROUTES.find(r => r.id === t.route) || RR_ROUTES[0];
      const start = parseIso(t.date);
      const line = (label, factId) => {
        const f = fact(factId);
        if (!f || !f.calc || !start) return "";
        return `<p class="log-line"><strong>${esc(label)}:</strong> about ${esc(niceDate(addPeriod(start, f.calc)))} (${esc(periodLabel(f.calc))})</p>`;
      };
      return `
        <div class="log-entry">
          <div class="log-entry-head">
            <span class="log-date">${esc(start ? niceDate(start) : "(no date)")}</span>
            <span class="log-service">${esc(t.org || "(organisation not given)")}</span>
            <button type="button" class="log-delete" data-id="${esc(t.id)}" aria-label="Delete this request">✕</button>
          </div>
          <p class="log-line">${esc(route.label)}</p>
          ${route.ack ? line("Acknowledgement due", route.ack) : ""}
          ${line("Decision / response due", route.decision)}
        </div>
      `;
    }

    function persist(){
      if (document.getElementById("rrTrackToggle").checked) u.writeStore(RR_TRACK_KEY, tracked);
    }

    function drawTracker(){
      const listEl = document.getElementById("rrTList");
      listEl.innerHTML = tracked.length
        ? tracked.map(trackRowHtml).join("")
        : `<div class="empty-state">No requests tracked yet.</div>`;
      listEl.querySelectorAll(".log-delete").forEach(btn => btn.addEventListener("click", () => {
        tracked = tracked.filter(t => t.id !== btn.dataset.id);
        persist();
        drawTracker();
      }));
    }

    document.getElementById("rrTAdd").addEventListener("click", () => {
      const date = document.getElementById("rrTDate").value;
      if (!parseIso(date)) { document.getElementById("rrTDate").focus(); return; }
      tracked.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        org: document.getElementById("rrTOrg").value.trim(),
        route: document.getElementById("rrTRoute").value,
        date,
      });
      persist();
      drawTracker();
      document.getElementById("rrTOrg").value = "";
      document.getElementById("rrTDate").value = "";
    });

    document.getElementById("rrTrackToggle").addEventListener("change", e => {
      const clearBtn = document.getElementById("rrTrackClear");
      if (e.target.checked){
        u.writeStore(RR_TRACK_SAVE_KEY, true);
        u.writeStore(RR_TRACK_KEY, tracked);
        clearBtn.hidden = false;
      } else {
        u.writeStore(RR_TRACK_SAVE_KEY, false);
        u.clearStore(RR_TRACK_KEY);
        clearBtn.hidden = true;
      }
    });
    document.getElementById("rrTrackClear").addEventListener("click", () => {
      tracked = [];
      u.clearStore(RR_TRACK_KEY);
      u.writeStore(RR_TRACK_SAVE_KEY, false);
      document.getElementById("rrTrackToggle").checked = false;
      document.getElementById("rrTrackClear").hidden = true;
      drawTracker();
    });

    drawTracker();
    wirePrint(app);
  }

  // ======================================================================
  // Tool 3: Schemes and cards selector — #/tools/schemes
  // Lists which official schemes and pages are relevant. Never works out
  // eligibility and never shows income limits.
  // ======================================================================

  function crossBorderFacts(a){
    if (a.live === "NI") return ["sc-ni-wlrs", "sc-ni-roi-scheme-closed"];
    if (!a.where || !a.ref) return null;
    const out = [];
    if (a.where === "NI"){
      out.push("sc-niphs", "sc-niphs-referral", "sc-niphs-temporary", "sc-directive-uk");
      if (a.ref === "consultant") out.push("sc-tas", "sc-tas-vs-directive");
    } else if (a.where === "GB"){
      out.push("sc-directive-uk", "sc-tas");
    } else {
      out.push("sc-directive-how");
      out.push("sc-tas", "sc-tas-vs-directive");
    }
    out.push("sc-roi-options");
    return out;
  }

  function referralNote(a){
    if (a.live !== "ROI" || !a.ref) return "";
    if (a.ref === "gp") return "Only a public hospital consultant can refer you to the Treatment Abroad Scheme. A GP referral alone isn't enough for TAS.";
    if (a.ref === "private") return "The Northern Ireland Planned Healthcare Scheme needs a referral from a GP or from a consultant you saw as a public patient. The Treatment Abroad Scheme needs a public hospital consultant. Check each scheme's page for what a private referral means for you.";
    return "";
  }

  function cardFacts(c){
    if (!c.age) return null;
    const out = [c.age === "70plus" ? "sc-card-over70" : "sc-card-under70"];
    if (c.age === "under8" || c.age === "70plus" || c.carer === "yes") out.push("sc-gpvc-auto");
    out.push("sc-card-limits", "sc-cards-printing");
    return out;
  }

  function renderSchemes(app){
    const a = { live: null, where: null, ref: null };
    const c = { age: null, carer: null };

    app.innerHTML = `
      ${headHtml("Schemes and cards selector", "Cross-border treatment schemes, medical cards and GP visit cards")}

      <div class="callout"><strong>No commercial links.</strong> ${esc(TOOL_UI_TEXT.neutrality)}</div>

      <p class="detail-section-title">Treatment in another jurisdiction</p>
      <div class="prep-card">
        <h2>Where do you live?</h2>
        ${radiosHtml("scLive", [{ id: "ROI", label: "Republic of Ireland" }, { id: "NI", label: "Northern Ireland" }], null)}
        <div id="scRoiQs" hidden>
          <h2>Where would the treatment be?</h2>
          ${radiosHtml("scWhere", [{ id: "NI", label: "Northern Ireland" }, { id: "GB", label: "England, Scotland or Wales" }, { id: "EU", label: "Another EU/EEA country" }], null)}
          <h2>Who is referring you?</h2>
          ${radiosHtml("scRef", [{ id: "gp", label: "My GP" }, { id: "consultant", label: "A consultant I see as a public patient" }, { id: "private", label: "A private consultant, or no referral yet" }], null)}
        </div>
      </div>
      <div id="scResult" hidden></div>

      <p class="detail-section-title">Medical card and GP visit card (Republic of Ireland)</p>
      <div class="prep-card">
        <h2>Age of the person applying</h2>
        ${radiosHtml("scAge", [{ id: "under8", label: "Under 8" }, { id: "8to69", label: "8 to 69" }, { id: "70plus", label: "70 or over" }], null)}
        <h2>Do they get Carer's Allowance or Carer's Benefit?</h2>
        ${radiosHtml("scCarer", [{ id: "yes", label: "Yes" }, { id: "no", label: "No, or not sure" }], null)}
      </div>
      <div id="scCardResult" hidden></div>

      ${footHtml()}
    `;

    function drawCross(){
      document.getElementById("scRoiQs").hidden = a.live !== "ROI";
      const ids = a.live ? crossBorderFacts(a) : null;
      const el = document.getElementById("scResult");
      if (!ids){ el.hidden = true; return; }
      const note = referralNote(a);
      el.innerHTML = `<div class="guide-list">
        ${moduleHtml("Schemes and official pages that may apply", (note ? `<p>${esc(note)}</p>` : "") + factListHtml(ids))}
        ${moduleHtml("What this doesn't do", "<p>This lists schemes to look at. It doesn't decide whether you qualify or whether a treatment is covered. The scheme's own page and application process decide that.</p>")}
      </div>`;
      el.hidden = false;
    }

    function drawCards(){
      const ids = cardFacts(c);
      const el = document.getElementById("scCardResult");
      if (!ids){ el.hidden = true; return; }
      el.innerHTML = `<div class="guide-list">
        ${moduleHtml("Which rules apply", factListHtml(ids))}
        ${moduleHtml("Check your own situation", `<p>Only the HSE can assess an application. Use its official page and online check. We don't estimate eligibility or show income limits here.</p>
          <div class="quick-link-row callout-pill-row">
            <a class="pill" href="https://www2.hse.ie/services/schemes-allowances/medical-cards/applying/how-much-you-can-earn/" target="_blank" rel="noopener">HSE: How much you can earn ↗</a>
            <a class="pill" href="https://www.mymedicalcard.ie/" target="_blank" rel="noopener">Apply online (HSE PCRS) ↗</a>
          </div>`)}
      </div>`;
      el.hidden = false;
    }

    onRadio(app, "scLive", v => { a.live = v; drawCross(); });
    onRadio(app, "scWhere", v => { a.where = v; drawCross(); });
    onRadio(app, "scRef", v => { a.ref = v; drawCross(); });
    onRadio(app, "scAge", v => { c.age = v; drawCards(); });
    onRadio(app, "scCarer", v => { c.carer = v; drawCards(); });
  }

  // ======================================================================
  // Shared: a date helper for several fact periods from one start date.
  // ======================================================================

  function multiDateHtml(idPrefix, label){
    return `
      <label class="prep-label" for="${idPrefix}Date">${esc(label)}</label>
      <input type="date" id="${idPrefix}Date" class="prep-input">
      <ul class="detail-list" id="${idPrefix}Out" aria-live="polite"></ul>
      <p class="save-note">${esc(TOOL_UI_TEXT.dateApprox)}</p>
    `;
  }

  function wireMultiDate(idPrefix, rows){
    const input = document.getElementById(idPrefix + "Date");
    input.addEventListener("input", () => {
      const start = parseIso(input.value);
      document.getElementById(idPrefix + "Out").innerHTML = start ? rows.map(r => {
        const f = fact(r.fact);
        if (!f || !f.calc) return "";
        return `<li><strong>${esc(r.label)}:</strong> about ${esc(niceDate(addPeriod(start, f.calc)))} (${esc(periodLabel(f.calc))})${verifyTagHtml(f)}</li>`;
      }).join("") : "";
    });
  }

  // ======================================================================
  // Tool 4: "While you wait" — #/tools/waiting
  // ======================================================================

  const WY_FIELDS = [
    { id: "name", label: "Your name", type: "text", ph: "[Your name]" },
    { id: "address", label: "Your address", type: "textarea", ph: "[Your address]" },
    { id: "dob", label: "Date of birth", type: "date", ph: "[Date of birth]" },
    { id: "contact", label: "Phone or email (optional)", type: "text", ph: "" },
    { id: "ref", label: "Hospital / chart number (if known)", type: "text", ph: "" },
    { id: "consultant", label: "Consultant or specialty", type: "text", ph: "[Consultant name / specialty]" },
    { id: "hospital", label: "Hospital", type: "text", ph: "[Hospital]" },
    { id: "referred", label: "Date you were referred (approximate is fine)", type: "date", ph: "[date of referral]" },
  ];

  function renderWaiting(app){
    let j = null;
    app.innerHTML = `
      ${headHtml("While you wait", "Waiting-list terms, how to ask about your status, and where the official figures are")}
      <div class="prep-card">
        <h2>Where is the hospital?</h2>
        ${radiosHtml("wyJ", [{ id: "ROI", label: "Republic of Ireland" }, { id: "NI", label: "Northern Ireland" }], null)}
      </div>
      <div id="wyBody" hidden></div>
      <div class="prep-card" id="wyValidation" hidden>
        <h2>Got a validation letter?</h2>
        ${multiDateHtml("wyVal", "Date on the validation letter")}
      </div>
      <div class="prep-card" id="wyLetter" hidden>
        <h2>Optional: letter asking about your status</h2>
        <p class="save-note">Nothing typed here is saved.</p>
        ${WY_FIELDS.map(f => `
          <label class="prep-label" for="wy-${f.id}">${esc(f.label)}</label>
          ${f.type === "textarea" ? `<textarea id="wy-${f.id}" class="prep-input" rows="2"></textarea>` : `<input type="${f.type}" id="wy-${f.id}" class="prep-input">`}
        `).join("")}
        <pre class="template-text" id="wyOutput"></pre>
        ${letterButtonsHtml("wyOutput")}
      </div>
      ${footHtml()}
    `;

    function draw(){
      const roi = j === "ROI";
      const body = document.getElementById("wyBody");
      body.innerHTML = `<div class="guide-list">
        ${roi ? moduleHtml("Words you might see", factListHtml(["wy-validation", "wy-validation-noreply", "wy-removed", "wy-suspended", "wy-suspension-rules", "wy-planned"])) : ""}
        ${moduleHtml("Asking about your status", factListHtml([roi ? "wy-ask-status-roi" : "wy-ask-status-ni"]))}
        ${moduleHtml("Targets and official figures", factListHtml(roi ? ["wy-roi-targets", "wy-roi-latest", "wy-ntpf-data"] : ["wy-ni-target", "wy-ni-latest", "wy-ni-data"]))}
        ${moduleHtml("Other options while waiting", `<p>Some people look at cross-border or treatment-abroad schemes. The Schemes selector lists the official pages without recommending any provider.</p>
          <div class="quick-link-row callout-pill-row"><a class="pill" href="#/tools/schemes">Schemes and cards selector</a></div>`)}
      </div>`;
      body.hidden = false;
      document.getElementById("wyValidation").hidden = !roi;
      document.getElementById("wyLetter").hidden = false;
      refreshLetter();
    }

    function refreshLetter(){
      const v = {};
      WY_FIELDS.forEach(f => { v[f.id] = (document.getElementById("wy-" + f.id).value || "").trim(); });
      v.dob = letterDate(v.dob);
      v.referred = letterDate(v.referred);
      v.refLine = v.ref ? ` (hospital number: ${v.ref})` : "";
      v.today = todayNice();
      const ph = {};
      WY_FIELDS.forEach(f => { ph[f.id] = f.ph; });
      ph.refLine = "";
      document.getElementById("wyOutput").textContent = fillLetter("wy-status", v, ph);
    }

    WY_FIELDS.forEach(f => document.getElementById("wy-" + f.id).addEventListener("input", refreshLetter));
    wireMultiDate("wyVal", [{ fact: "wy-validation-noreply", label: "14 days from the letter date" }]);
    onRadio(app, "wyJ", v => { j = v; draw(); });
    wirePrint(app);
  }

  // ======================================================================
  // Tool 5: Discharge passport — #/tools/discharge
  // Printable, device-only, prompts only. The person types every answer;
  // nothing is suggested, inferred or autocompleted.
  // ======================================================================

  const DP_KEY = "hh-discharge-passport";
  const DP_SAVE_KEY = "hh-discharge-passport-save-on";

  const DP_SECTIONS = [
    { id: "meds", title: "Medications", cols: [
      { id: "name", label: "Medicine" }, { id: "how", label: "How and when to take it (as the team told you)" }, { id: "change", label: "New, changed or stopped?" } ] },
    { id: "appts", title: "Appointments and follow-up", cols: [
      { id: "what", label: "What" }, { id: "when", label: "When" }, { id: "where", label: "Where" } ] },
    { id: "contacts", title: "Contacts", cols: [
      { id: "who", label: "Who (ward, team, GP, public health nurse…)" }, { id: "number", label: "Phone / hours" } ] },
  ];

  function emptyPassport(){
    return {
      meds: [{}], appts: [{}], contacts: [{}],
      questions: DISCHARGE_PROMPTS.map(q => ({ q, a: "" })),
      extraQ: "", notes: "",
    };
  }

  function normalisePassport(p){
    const base = emptyPassport();
    if (!p || typeof p !== "object") return base;
    DP_SECTIONS.forEach(s => { base[s.id] = Array.isArray(p[s.id]) && p[s.id].length ? p[s.id].map(r => (r && typeof r === "object") ? r : {}) : [{}]; });
    if (Array.isArray(p.questions)) base.questions = p.questions.filter(x => x && typeof x.q === "string").map(x => ({ q: x.q, a: String(x.a || "") }));
    base.extraQ = String(p.extraQ || "");
    base.notes = String(p.notes || "");
    return base;
  }

  function passportText(p){
    const out = ["MY DISCHARGE PASSPORT", `Printed ${todayNice()}`, ""];
    DP_SECTIONS.forEach(s => {
      const rows = p[s.id].filter(r => s.cols.some(c => (r[c.id] || "").trim()));
      out.push(s.title.toUpperCase());
      if (!rows.length) out.push("  (none written)");
      rows.forEach(r => out.push("  - " + s.cols.map(c => (r[c.id] || "").trim()).filter(Boolean).join(" | ")));
      out.push("");
    });
    out.push("QUESTIONS TO ASK BEFORE I GO HOME");
    p.questions.forEach(x => { out.push("  Q: " + x.q); out.push("  A: " + (x.a.trim() || "________________________________")); });
    if (p.extraQ.trim()) { out.push("  My own questions:"); p.extraQ.trim().split("\n").forEach(l => out.push("    " + l)); }
    out.push("");
    if (p.notes.trim()){ out.push("NOTES"); out.push(p.notes.trim()); out.push(""); }
    out.push("Written by me from what the team told me. It's not a medical record.");
    return out.join("\n");
  }

  function renderDischarge(app){
    const isSaving = u.readStore(DP_SAVE_KEY) === true;
    let p = normalisePassport(isSaving ? u.readStore(DP_KEY) : null);

    function sectionHtml(s){
      return `
        <div class="prep-card">
          <h2>${esc(s.title)}</h2>
          ${p[s.id].map((r, i) => `
            <div class="log-entry">
              ${s.cols.map(c => `
                <label class="prep-label" for="dp-${s.id}-${i}-${c.id}">${esc(c.label)}</label>
                <input type="text" class="prep-input" id="dp-${s.id}-${i}-${c.id}" data-sec="${s.id}" data-row="${i}" data-col="${c.id}" value="${esc(r[c.id] || "")}">
              `).join("")}
            </div>`).join("")}
          <button type="button" class="copy-btn" data-add="${s.id}">Add another</button>
        </div>`;
    }

    function draw(){
      app.innerHTML = `
        ${headHtml("Discharge passport", "Write down what the team tells you before you leave hospital, then print or copy it")}
        <div class="callout">This page only prompts you with questions to ask. It never suggests answers or medical content. Write down what the team tells you, in your own words.</div>
        <div class="prep-card">
          ${saveToggleHtml("dp", u.readStore(DP_SAVE_KEY) === true, "Clear saved passport from this device")}
          <p class="save-note">If you tick this, the passport is stored in plain text in this browser, and anyone who can unlock this device can read it.</p>
        </div>
        ${DP_SECTIONS.map(sectionHtml).join("")}
        <div class="prep-card">
          <h2>Questions to ask before you go home</h2>
          <ul class="detail-list">${factLiHtml("dp-nies")}</ul>
          ${p.questions.map((x, i) => `
            <label class="prep-label" for="dp-q-${i}">${esc(x.q)}</label>
            <textarea id="dp-q-${i}" class="prep-input" rows="2" data-q="${i}">${esc(x.a)}</textarea>
          `).join("")}
          <label class="prep-label" for="dp-extraQ">My own questions</label>
          <textarea id="dp-extraQ" class="prep-input" rows="3">${esc(p.extraQ)}</textarea>
          <label class="prep-label" for="dp-notes">Other notes</label>
          <textarea id="dp-notes" class="prep-input" rows="3">${esc(p.notes)}</textarea>
        </div>
        <div class="prep-card">
          <h2>Your printable passport</h2>
          <pre class="template-text" id="dpOutput"></pre>
          <button type="button" class="copy-btn" data-copy-target="dpOutput">Copy passport text</button>
          <button type="button" class="copy-btn" data-print-target="dpOutput">Print / save PDF</button>
        </div>
        ${footHtml()}
      `;
      wire();
      refresh();
    }

    function persist(){
      const t = document.getElementById("dpToggle");
      if (t && t.checked) u.writeStore(DP_KEY, p);
    }

    function refresh(){
      document.getElementById("dpOutput").textContent = passportText(p);
    }

    function wire(){
      app.querySelectorAll("input[data-sec]").forEach(el => el.addEventListener("input", () => {
        p[el.dataset.sec][Number(el.dataset.row)][el.dataset.col] = el.value;
        persist(); refresh();
      }));
      app.querySelectorAll("textarea[data-q]").forEach(el => el.addEventListener("input", () => {
        p.questions[Number(el.dataset.q)].a = el.value;
        persist(); refresh();
      }));
      document.getElementById("dp-extraQ").addEventListener("input", e => { p.extraQ = e.target.value; persist(); refresh(); });
      document.getElementById("dp-notes").addEventListener("input", e => { p.notes = e.target.value; persist(); refresh(); });
      app.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => {
        p[btn.dataset.add].push({});
        persist();
        const y = window.scrollY;
        draw();
        window.scrollTo(0, y);
      }));
      document.getElementById("dpToggle").addEventListener("change", e => {
        const clearBtn = document.getElementById("dpClear");
        if (e.target.checked){ u.writeStore(DP_SAVE_KEY, true); u.writeStore(DP_KEY, p); clearBtn.hidden = false; }
        else { u.writeStore(DP_SAVE_KEY, false); u.clearStore(DP_KEY); clearBtn.hidden = true; }
      });
      document.getElementById("dpClear").addEventListener("click", () => {
        u.clearStore(DP_KEY);
        u.writeStore(DP_SAVE_KEY, false);
        p = emptyPassport();
        draw();
      });
      wirePrint(app);
    }

    draw();
  }

  // ======================================================================
  // Tool 6 (optional): Assessment of Need explainer — #/tools/aon
  // ======================================================================

  function renderAon(app){
    app.innerHTML = `
      ${headHtml("Assessment of Need explainer", "Your statutory rights under the Disability Act 2005 (Republic of Ireland)")}
      <div class="guide-list">
        ${moduleHtml("Your rights", factListHtml(["aon-right", "aon-not-required"]))}
        ${moduleHtml("Statutory timeline", factListHtml(["aon-ack", "aon-start", "aon-complete"]))}
        ${moduleHtml("If the timeline isn't met", factListHtml(["aon-complaint", "aon-appeal"]))}
        ${moduleHtml("Proposed changes", factListHtml(["aon-bill"]))}
      </div>
      <div class="prep-card">
        <h2>Work out the statutory dates</h2>
        ${multiDateHtml("aonApp", "Date the HSE received your completed application")}
      </div>
      <div class="prep-card">
        <h2>Complaint time limit</h2>
        ${multiDateHtml("aonCmp", "Date the cause of the complaint arose (for example, the date the 6 months ran out)")}
      </div>
      <div class="callout">This page explains the statutory process only. It doesn't assess needs or say whether someone has a disability, and it doesn't predict how long your own assessment will take.</div>
      ${footHtml()}
    `;
    wireMultiDate("aonApp", [
      { fact: "aon-ack", label: "Acknowledgement due" },
      { fact: "aon-start", label: "Assessment should have started by" },
      { fact: "aon-complete", label: "Assessment report due by" },
    ]);
    wireMultiDate("aonCmp", [{ fact: "aon-complaint", label: "Complain no later than" }]);
  }

  // ======================================================================

  const RENDERERS = {
    "": renderIndex,
    complaints: renderComplaints,
    records: renderRecords,
    schemes: renderSchemes,
    waiting: renderWaiting,
    discharge: renderDischarge,
    aon: renderAon,
  };

  return {
    // For app.js's TOOL_PAGES search index.
    pages: TOOL_LIST,
    has(name){ return Object.prototype.hasOwnProperty.call(RENDERERS, name || ""); },
    render(name, app, utils){
      u = utils;
      const fn = RENDERERS[name || ""] || renderIndex;
      fn(app);
    },
    register(id, meta, fn){
      RENDERERS[id] = fn;
      if (meta) TOOL_LIST.push(Object.assign({ id }, meta));
    },
    _internal: { addPeriod, parseIso, recommendRoute, crossBorderFacts, cardFacts, fact, fillLetter },
  };
})();
