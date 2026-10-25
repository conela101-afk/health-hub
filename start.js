// "Where do I start?" (#/start): two questions, a topic and a location, then one next step and up to two
// "Also useful". A static lookup table: nothing is asked about health, nothing is stored or sent, and the
// result is not kept in the address. Navigation only: every step is a page that already exists, and its
// wording is the wording already used on its hub row in doors.js (no new facts, numbers or services).
// scripts/test-start.js checks the table against doors.js and that no Republic of Ireland page can appear
// in a Northern Ireland result.
(function(root){
  const REGIONS = [
    { id: "roi", label: "Republic of Ireland" },
    { id: "ni", label: "Northern Ireland" },
  ];

  // Pages that only apply in the Republic of Ireland. They must never appear in a Northern Ireland result.
  const ROI_ONLY = ["#/tools/aon", "#/rights/disability-children", "#/guide/after-a-death", "#/pregnancy", "#/about/screening"];

  // Topics are the everyday tasks the app already has a tool or page for.
  const TOPICS = [
    { id: "complain", label: "I want to make a complaint", hint: "Which body to go to, the stages and the time limits, then a letter." },
    { id: "records", label: "I want a copy of my records", hint: "Freedom of information or a subject access request, and how to track the deadline." },
    { id: "waiting", label: "I'm on a waiting list", hint: "What the letters and statuses mean, and how to ask where you are." },
    { id: "discharge", label: "I'm leaving hospital, or someone I know is", hint: "A page to print with medicines, appointments, contacts and questions to ask." },
    { id: "schemes", label: "I want to know which card or scheme applies", hint: "Medical cards, GP visit cards and cross-border treatment schemes, with links to the official pages." },
    { id: "costs", label: "I want to know what I might pay", hint: "Medicines, GP visits and cross-border costs, scheme by scheme." },
    { id: "aon", label: "My child is waiting for an Assessment of Need", hint: "A deadline calculator, letters and the steps to escalate (Republic of Ireland only)." },
    { id: "find", label: "I want to find a service near me", hint: "Browse by county, or by the kind of service." },
  ];

  // topic -> the primary step and up to two also-useful pages (hrefs from doors.js). `only` limits a topic to
  // one region; `elsewhere` is what the other region sees instead.
  const TABLE = {
    complain: { primary: "#/tools/complaints", also: ["#/advocacy/templates", "#/advocacy/contacts"] },
    records: { primary: "#/tools/records", also: ["#/advocacy/sar-builder", "#/advocacy/hospitals"] },
    waiting: { primary: "#/tools/waiting", also: ["#/about/waiting-lists", "#/tools/schemes"] },
    discharge: { primary: "#/tools/discharge", also: ["#/passport", "#/prep"] },
    schemes: { primary: "#/tools/schemes", also: ["#/advocacy/schemes", "#/costs"] },
    costs: { primary: "#/costs", also: ["#/tools/schemes", "#/advocacy/schemes"] },
    aon: {
      only: "roi", primary: "#/tools/aon", also: ["#/rights/disability-children"],
      elsewhere: {
        message: "The Assessment of Need is a Republic of Ireland process, so there is no step for it here.",
        also: ["#/advocacy/contacts", "#/advocacy/orgs"],
      },
    },
    find: { primary: "#/county", also: ["#/specialty", "#/out-of-hours"] },
  };

  function step(href){
    const item = root.HH_DOORS && root.HH_DOORS.items.find(i => i.href === href);
    return item ? { href, label: item.label, desc: item.desc } : null;
  }

  // Returns { primary: step | null, message?: string, also: step[] } or null for an unknown topic or region.
  function lookup(topicId, regionId){
    const row = TABLE[topicId];
    if (!row || !REGIONS.some(r => r.id === regionId)) return null;
    if (row.only && row.only !== regionId){
      return { primary: null, message: row.elsewhere.message, also: row.elsewhere.also.map(step).filter(Boolean).slice(0, 2) };
    }
    return { primary: step(row.primary), also: row.also.map(step).filter(Boolean).slice(0, 2) };
  }

  const api = { REGIONS, ROI_ONLY, TOPICS, TABLE, lookup };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HH_START = api;
})(typeof window !== "undefined" ? window : globalThis);
