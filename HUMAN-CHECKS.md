# Human checks

**Row checks.** Run `node scripts/list-unverified.js`. It prints every row marked `verify: true` as `id | name | source_url`. Open the link in your browser (not a search result), read the page against the row, then send back the OK ids and any changes. A Claude Code PR then clears `verify`, sets `checked` and sets `urlStatus: "opened"`.

**Open items that are not row checks** (from the list kept until 25 Nov 2026; the full old list is in `docs/archive/HUMAN-CHECKS-to-2026-11-25.md`):

- [ ] Pregnancy page (23 Oct 2026): approve the privacy callout, the "law" box ("As of 23 October 2026 none had become law"; confirm on oireachtas.ie) and the "no official statement on how private scan providers are regulated" line (keep or remove).
- [ ] Pregnancy page: confirm the "9 weeks 6 days" wording (the HSE medical-abortion page says "more than 9 weeks").
- [ ] Pregnancy page, Blackrock row: confirm the early-pregnancy wording, the referral requirement and the county (set to Dublin; the page gives no address).
- [ ] `my-options` row still shows `myoptions.ie` as its web address; decide whether to repoint it to www2.hse.ie.
- [ ] Decisions on about.hse.ie (fetal anomaly booklet) and Hermitage Clinic / blackrockhealth.com.
- [ ] On a phone: typing "abortion" lands on the pregnancy page with an empty search box.
- [ ] `hse-adhd-adults-moc` is on about.hse.ie, which the register accepts as an hse.ie subdomain. Confirm that is fine (same for the fetal anomaly booklet).
- [ ] Decide whether the DSGBV, SATU and trafficking searches should also skip the address bar like the pregnancy terms do. Not built.
- [ ] Re-read the Citizens Information temporary protection page before anyone states an end date (4 March 2027 versus 2028 in the brief).
- [ ] Approve copy on `#/guide/after-a-death` and `#/guide/interpreting` (fill `CHECKED` in `data/guides.js` after opening each linked page). The interpreting page says "Partial"; confirm that framing.
- [ ] On a phone: typing "domestic violence" lands on the support page with an empty search box and a neutral tab title.
