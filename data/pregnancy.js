// Pregnancy information page (#/pregnancy). Static, administrative only: it points to the
// official HSE pages and lists questions to ask. Source: research brief of 23 Oct 2026.
//
// Privacy rules for this page (see README):
//  - Nothing here reads or writes storage, cookies or the URL. There is no form, no save button,
//    no favourites and no share button.
//  - The route and the page title are neutral ("Pregnancy information"); no search wording is
//    ever put in the address.
//  - Outbound links open in a new tab with noopener and noreferrer.
//
// CHECKED holds the date a person last opened each official page. A section shows "Last checked"
// only once a date is filled in, so nothing here claims a check that has not happened.
(function(){
  const CHECKED = {
    termination: "",
    anomaly: "",
    screening: "",
    scans: "",
  };

  function render(app, h){
    const esc = h.escapeHtml;
    const ext = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
    const checked = key => CHECKED[key] ? `<p class="ooh-source">Last checked: ${esc(CHECKED[key])}</p>` : "";
    const list = items => `<ul class="steps">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    const asks = items => `<p><strong>Questions you could ask</strong></p>${list(items)}`;

    const HSE = "https://www2.hse.ie";

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">‹ Home</a>
        <h1>Pregnancy information</h1>
        <p class="count">Choices, tests and scans in the Republic of Ireland: public and private routes.</p>
      </div>

      <p>This page explains how the public and private routes work. It does not give medical advice. Each section links to the official page, which is the place to confirm anything before you act on it.</p>

      <div class="callout callout-spaced">
        <strong>Privacy.</strong> Health Hub does not record what you look at, and nothing on this page is saved. Your browser may still keep its own history. A private or incognito window avoids that. The Exit button at the top leaves this site straight away.
      </div>

      <p class="section-title">Unplanned pregnancy and termination of pregnancy</p>
      <p><strong>Who to contact.</strong> The HSE says you can contact the ${ext(HSE + "/services/unplanned-pregnancy/support-services/my-options-freephone/", "My Options service")}, a GP surgery that provides abortion services, a family planning clinic or a women's health clinic that provides them. If your usual GP does not provide the service, My Options can give you the details of one who does. A doctor who does not provide it should refer you to someone who does.</p>
      <p><strong>Timeframes, in the HSE's words.</strong></p>
      ${list([
        "You can have an abortion if your pregnancy is no more than 12 weeks. This means 84 days since the first day of your last period.",
        "The consultation before the abortion has to be at least 3 days before the abortion.",
        "You must have the abortion in hospital if you are more than 9 weeks and 6 days pregnant, or have certain medical conditions. Your GP refers you.",
      ])}
      <p><strong>After 12 weeks.</strong> The HSE says an abortion is possible only in exceptional circumstances: when continuing the pregnancy puts your life at risk, will cause serious harm to your health, or is likely to lead to the death of the fetus either before or within 28 days of birth.</p>
      <p><strong>Cost.</strong> The HSE says an abortion is free if you live in the Republic of Ireland and have a PPS number. If you live outside the Republic, you can have an abortion here but you will have to pay for it.</p>
      <p><strong>Afterwards.</strong> The HSE describes a pregnancy test at home about 2 weeks after a medical abortion and an optional, free check-up. It also says post-abortion counselling and support is free, and that the HSE funds counselling for you, a partner or a family member. My Options also lists nurse support after an abortion.</p>
      <p><strong>Privacy.</strong> The HSE says: "Your abortion is private. We will not share information with your GP or any other doctors without your consent."</p>
      <div class="callout callout-spaced">
        <strong>The law.</strong> The Health (Regulation of Termination of Pregnancy) Act 2018 is the law that applies. Bills to change the 3-day wait have been put before the Oireachtas. As of 23 October 2026 none had become law. For the current stage, see the ${ext("https://www.oireachtas.ie/en/bills/bill/2026/47/", "bill page on oireachtas.ie")}.
      </div>
      <p>Official pages: ${ext(HSE + "/conditions/abortion/where-to-go/", "where to go")}, ${ext(HSE + "/conditions/abortion/when-you-can-have/", "when you can have an abortion")}, ${ext(HSE + "/conditions/abortion/medical/", "medical abortion")}, ${ext(HSE + "/conditions/abortion/after/", "after an abortion")}, ${ext(HSE + "/services/unplanned-pregnancy/support-services/booking-a-counselling-session/", "counselling")} and ${ext(HSE + "/services/unplanned-pregnancy/continued-pregnancy-supports/continued-pregnancy-supports/", "supports if you continue the pregnancy")}. The where-to-go page also lists the hospitals that provide the service.</p>
      ${checked("termination")}
      ${asks([
        "Does this GP or clinic provide abortion services? If not, who will you refer me to?",
        "Will my first consultation be in person, by phone or by video?",
        "How will my weeks of pregnancy be confirmed, and do I need a scan?",
        "If I need hospital care, which hospital, and how will the referral be made?",
        "Is there any charge for me? For example, if I do not live in the Republic of Ireland or have no PPS number.",
        "Who do I contact after the abortion, and when is the check-up?",
        "What counselling is available to me, a partner or a family member, and is it HSE-funded?",
        "Who will be told about my care, and what needs my consent?",
      ])}

      <p class="section-title">If a scan shows a possible fetal anomaly</p>
      <p>A suspected anomaly is referred to a fetal medicine centre. The law covers a fetal condition that is likely to lead to the death of the fetus before or within 28 days of birth. It does not list particular diagnoses, so the doctors treating you explain what applies in your case. The HSE page on ${ext(HSE + "/conditions/abortion/when-you-can-have/", "when you can have an abortion")} uses the same 28-day wording. The HSE booklet ${ext("https://about.hse.ie/api/v2/download-file/healthcare_professional_publications/Termination_of_pregnancy_for_fetal_anomaly_booklet.pdf/", "Termination of Pregnancy for Fetal Anomaly")} was developed with the HSE's National Women and Infants Health Programme. It covers diagnosis, referral to fetal medicine, care in Ireland and care pathways outside Ireland.</p>
      ${checked("anomaly")}
      ${asks([
        "Who is my main contact in the fetal medicine team?",
        "What tests are being offered, and when will results be available?",
        "What options are available to me under Irish law for this diagnosis?",
        "What written information can I have?",
        "What bereavement or counselling supports are available?",
      ])}

      <p class="section-title">Antenatal screening and NIPT</p>
      <p>The HSE says you will be offered routine screening tests during pregnancy, for example blood tests and a fetal anatomy scan, and that screening tests are usually free. It says non-invasive prenatal screening (NIPS, also called NIPT) is not offered as part of free public maternity services, and that you will have to pay for it. It involves a blood test and an ultrasound scan and is usually done after 9 to 10 weeks. Health Hub shows no prices.</p>
      <p>The HSE explains that screening tests find out whether you or your baby are at a low or high risk, and that a low risk result does not mean no risk. Diagnostic tests such as amniocentesis and CVS are normally offered only if you are more at risk or have had a positive screening test.</p>
      <p>Official pages: ${ext(HSE + "/pregnancy-birth/scans-tests/screening-tests-during-pregnancy/", "screening tests during pregnancy")} and ${ext(HSE + "/pregnancy-birth/scans-tests/diagnostic-tests-during-pregnancy/", "diagnostic tests during pregnancy")}.</p>
      ${checked("screening")}
      ${asks([
        "Do I need this test? What is it for?",
        "Is it part of my free public care, or will I have to pay?",
        "Does my maternity hospital offer NIPS? If not, how would a private result be shared with my maternity team?",
        "What does a high risk result mean, and what happens next?",
        "What could happen if I do not have the test?",
      ])}

      <p class="section-title">Routine and private scans</p>
      <p>The HSE says the two most common scans are a dating scan, usually before 15 weeks, and a fetal anatomy scan, usually at 18 to 22 weeks. Extra scans are only done when there is a medical reason.</p>
      <p>The HSE also says you may choose to pay for extra scans, that they may not give you much more information than your regular scans, and that they can be expensive. If a concern is found on a private scan, follow-on services may not be available there. You would need to contact your maternity hospital, so keep a copy of the scan report.</p>
      <p>We did not find an official statement on how private scan providers are regulated in Ireland.</p>
      <p>Official pages: ${ext(HSE + "/pregnancy-birth/scans-tests/ultrasound-scans/ultrasound-scans/", "ultrasound scans")} and ${ext(HSE + "/pregnancy-birth/pregnancy-care/care-options/", "antenatal and maternity care options")}.</p>
      ${checked("scans")}
      ${asks([
        "Is this scan part of my public, semi-private or private care?",
        "Do I need a referral letter?",
        "Who performs and reports the scan, and will I get a written report?",
        "If a concern is found, what follow-on care does this provider offer, and how do I contact my maternity hospital?",
        "Will the result be sent to my GP or maternity team, and does that need my consent?",
      ])}

      <p class="ooh-source">Information only. Not medical or legal advice. More at ${ext("https://www.citizensinformation.ie/en/health/health-services/reproductive-health/unplanned-pregnancy/", "Citizens Information")}. You can also find the services in the <a href="#/specialty/obs">Maternity &amp; Obstetrics</a> and <a href="#/specialty/contraception">Contraception &amp; Reproductive Health</a> lists.</p>
    `;
  }

  window.HH_PREGNANCY = { render };
})();
