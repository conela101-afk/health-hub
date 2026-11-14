// Two short information pages from the 23 Oct 2026 gap-register brief:
//   #/guide/after-a-death   registering a death, the coroner, and money help
//   #/guide/interpreting    asking for an interpreter or sign language
//   #/guide/where-to-go     official pages for urgent and emergency care, both jurisdictions (14 Nov 2026)
// Static and administrative. Each section links to the official page and quotes it; no amounts,
// rates, fees or phone numbers. Nothing here reads or writes storage or the address.
// CHECKED holds the date a person last opened each official page; "Last checked" shows only once filled in.
(function(){
  const CHECKED = { death: "", money: "", interpreting: "", whereToGo: "" };
  const CI = "https://www.citizensinformation.ie/en";
  const HSE = "https://www2.hse.ie";

  function helpers(h){
    const esc = h.escapeHtml;
    return {
      esc,
      ext: (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`,
      checked: key => CHECKED[key] ? `<p class="ooh-source">Last checked: ${esc(CHECKED[key])}</p>` : "",
      // Shown until a person has opened the official pages and filled in CHECKED for the guide.
      unchecked: key => CHECKED[key] ? "" : `<p class="checked-note">Not yet checked against the official pages, so read them before you rely on this.</p>`,
      list: items => `<ul class="steps">${items.map(i => `<li>${i}</li>`).join("")}</ul>`,
    };
  }

  function afterADeath(app, h){
    const { ext, checked, list } = helpers(h);
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>After a death: registering, the coroner and money help</h1>
        <p class="count">Republic of Ireland. Information, not legal advice.</p>
      </div>
      <p>This page points to the official steps. Each section links to the Citizens Information page, which is where to confirm details before you act.</p>

      <p class="section-title">Registering the death</p>
      <p>Citizens Information says a death is registered using a Death Notification Form from the doctor. It also explains when the coroner is involved.</p>
      ${list([
        ext(CI + "/death/practical-arrangements-after-a-death/registering-a-death/", "Registering a death"),
        ext(CI + "/death/when-someone-dies-in-ireland/", "When someone dies in Ireland"),
        ext(CI + "/death/sudden-or-unexplained-death/coroners/", "Coroners"),
        ext(CI + "/death/sudden-or-unexplained-death/when-someone-dies-unexpectedly/", "When someone dies unexpectedly"),
        ext(CI + "/birth-family-relationships/getting-birth-marriage-or-death-certificate/", "Getting a death certificate"),
      ])}
      ${checked("death")}
      <p><strong>Questions you could ask</strong></p>
      ${list([
        "Has the doctor given me the Death Notification Form, and who registers the death?",
        "Is the coroner involved? If so, who is my contact there, and when can the funeral go ahead?",
        "How do I get copies of the death certificate, and how many might I need?",
      ])}

      <p class="section-title">Payments and help with funeral costs</p>
      <p>Citizens Information says the old Bereavement Grant is no longer available. Help with funeral costs now goes through the Additional Needs Payment, which is means-tested. Other supports depend on your situation, for example a Bereaved Partner's pension, the Bereaved Parent Grant, and Occupational Injuries death benefits. Some of these payments were renamed in 2025, and Citizens Information explains the current names and rules.</p>
      <p>This page shows no amounts or rates. Read the pages below for current figures.</p>
      ${list([
        ext(CI + "/social-welfare/death-related-benefits/benefits-and-entitlements-following-a-death/", "Benefits and entitlements following a death"),
        ext(CI + "/death/practical-arrangements-after-a-death/funeral-arrangements-and-costs/", "Funeral arrangements and costs"),
        ext(CI + "/social-welfare/supplementary-welfare-schemes/additional-needs-payment/", "Additional Needs Payment"),
        ext(CI + "/death/financial-concerns-following-a-death/", "Financial concerns following a death"),
        ext(CI + "/social-welfare/death-related-benefits/death-benefits-under-oib/", "Death benefits under Occupational Injuries Benefit"),
      ])}
      ${checked("money")}
      <p>See also: <a href="#/rights-hub">Other costs and entitlements</a> (in What applies to you).</p>
      <p><strong>Questions you could ask</strong></p>
      ${list([
        "Which payments could I qualify for, and are there deadlines to apply?",
        "Can the Additional Needs Payment help with funeral costs in my situation, and what do I need to bring?",
        "Does it matter whether the person who died was my spouse, civil partner or cohabitant?",
      ])}

      <p class="ooh-source">Information only. Not legal advice. Free information on rights and entitlements: ${ext("https://www.citizensinformation.ie/", "Citizens Information")}.</p>
    `;
  }

  function interpreting(app, h){
    const { ext, checked, list } = helpers(h);
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Asking for an interpreter or sign language at an appointment</h1>
        <p class="count">Republic of Ireland. Partial: there is no single HSE page on this.</p>
      </div>
      <div class="callout callout-spaced">
        <strong>What we found.</strong> We did not find one HSE page that sets out interpreting for patients. A few individual service pages mention it, and they are quoted below. Ask early, and ask for it by name.
      </div>

      <p class="section-title">What the HSE pages say</p>
      ${list([
        `Emergency department: the HSE says "We can arrange an interpreter, but there may be a wait". ${ext(HSE + "/emergencies/the-emergency-department-ed/", "Emergency department page")}`,
        `ENT appointments: the HSE says "Tell a member of staff if you need them to arrange an interpreter". ${ext(HSE + "/services/audiology/services-supports/ent-appointment/", "ENT appointment page")}`,
        `CervicalCheck: the HSE page on booking an appointment describes an access officer who can help with sign-language and language interpreters, Braille and easy read. ${ext(HSE + "/conditions/cervical-screening/appointment/book/", "Booking a cervical screening appointment")}`,
      ])}
      ${checked("interpreting")}

      <p class="section-title">What you could say</p>
      <p>When you book, or as soon as you get an appointment letter: "I need an interpreter for [your language, or Irish Sign Language]. Can you arrange one for my appointment?"</p>
      <p>Interpreting can take time to arrange, so ask when you book rather than on the day. If you can, ask for it to be written on your appointment record.</p>
      <p><strong>Questions you could ask</strong></p>
      ${list([
        "Can you arrange an interpreter for my appointment? Is it in person, by phone or by video?",
        "Will there be a wait for the interpreter, and can the appointment be set for when one is available?",
        "Can the written information I am given be in my language, or in an easy-read format?",
        "Who is the best person to contact if the interpreter does not arrive?",
      ])}
      <p>If a service does not arrange one, you can raise it through the <a href="#/tools/complaints">complaints navigator</a>.</p>
      <p class="ooh-source">Information only. Not legal advice. Until the HSE publishes a single page on interpreting, this page stays marked partial.</p>
    `;
  }

  function whereToGo(app, h){
    const { ext, checked, unchecked, list } = helpers(h);
    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Not sure where to go?</h1>
        <p class="count">Republic of Ireland and Northern Ireland. Links to the official pages.</p>
      </div>
      <div class="callout callout-spaced">
        <strong>If a life is at risk, call 112 or 999.</strong>
      </div>
      ${unchecked("whereToGo")}

      <p class="section-title">Republic of Ireland</p>
      ${list([
        `The HSE has a directory of emergency departments, injury units and GP out-of-hours services. Use it to see what is near you. ${ext(HSE + "/services/find-urgent-emergency-care/", "HSE urgent and emergency care directory")}`,
        `The HSE says injury units treat recent injuries that are not life-threatening and unlikely to need a hospital stay, such as broken bones, sprains, wounds and minor burns. You do not need an appointment. Each unit has its own age limit and opening hours. The HSE lists injuries that should go to an emergency department instead, and says to call 112 or 999 if a life is at risk. A charge may apply; the HSE page explains when it does not. ${ext(HSE + "/emergencies/when-to-visit-an-injury-unit/", "When to visit an injury unit")}`,
        "If your GP surgery is closed and you need a GP urgently, the HSE says to use a GP out-of-hours service.",
      ])}

      <p class="section-title">Northern Ireland</p>
      ${list([
        `nidirect says Phone First is for urgent care that is not immediately life-threatening. A health professional assesses you by phone and may direct you to an emergency department, urgent care centre, minor injury unit, GP, pharmacist or another service. It does not replace 999. Each Trust organises minor injury care differently. ${ext("https://www.nidirect.gov.uk/articles/urgent-and-emergency-care-services", "nidirect: urgent and emergency care services")}`,
      ])}

      <p class="section-title">If a GP thinks you need a hospital medical assessment</p>
      <p>Some HSE hospitals have a medical assessment unit for medical (not injury) problems. The pages found say patients are referred by a GP, GP out-of-hours service or injury unit doctor. If you think you may need one, speak to your GP. (Pages found so far are for Mid West hospitals.)</p>
      ${checked("whereToGo")}

      <p class="ooh-source">Information only, not clinical or legal advice.</p>
    `;
  }

  window.HH_GUIDES = {
    render(name, app, h){
      if (name === "after-a-death"){ afterADeath(app, h); return true; }
      if (name === "interpreting"){ interpreting(app, h); return true; }
      if (name === "where-to-go"){ whereToGo(app, h); return true; }
      return false;
    },
  };
})();
