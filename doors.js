// The four doors: the single list of where every feature lives. Each feature is under exactly one door.
// app.js renders the four hub pages (reached from Home; the bottom tab bar is separate and unchanged) from
// this file; scripts/test-doors.js checks it against the routes in app.js and tools.js. Navigation only: no facts, figures or contact details here.
// Existing hash routes are unchanged; this file only decides which door lists each one.
(function(root){
  const DOORS = [
    {
      id: "find", href: "#/find", title: "Find care",
      blurb: "Services, places and conditions.",
      intro: "Look up services by type of care, by where you live, or by condition.",
      groups: [
        { title: "Look something up", items: [
          { label: "Services by specialty", desc: "Browse by the kind of care you need.", href: "#/specialty" },
          { label: "Services by area", desc: "Browse by county or area.", href: "#/county" },
          { label: "Search a condition", desc: "Links to official condition information.", href: "#/conditions" },
          { label: "Search medicine leaflets", desc: "Find the leaflet for a medicine.", href: "#/medicines" },
          { label: "Find a facility", desc: "Hospitals and care centres on the HIQA and RQIA registers.", href: "#/facilities" },
        ] },
        { title: "Urgent care and checks", items: [
          { label: "Pregnancy information", desc: "Choices, tests and scans.", href: "#/pregnancy" },
          { label: "Out-of-hours and urgent care", desc: "Where to go when your GP is closed.", href: "#/out-of-hours" },
          { label: "Vaccines: what's covered", desc: "Which vaccines are covered, by region.", href: "#/vaccines" },
          { label: "Screening: who is invited", desc: "Who is invited to screening programmes.", href: "#/screening" },
          { label: "National cancer screening programmes", desc: "Who is invited, and where to check.", href: "#/about/screening" },
        ] },
        { title: "Waiting lists", items: [
          { label: "Where waiting list data is published", desc: "Links to the official publishers.", href: "#/about/waiting-lists" },
        ] },
      ],
    },
    {
      id: "rights", href: "#/rights-hub", title: "What applies to you",
      blurb: "Entitlements, costs and guides.",
      intro: "What may apply to you: entitlements, schemes, costs and plain-language guides.",
      groups: [
        { title: "Your entitlements", items: [
          { label: "The rights guide", desc: "Self-advocacy basics, with sources.", href: "#/advocacy/guide" },
          { label: "Entitlements", desc: "Official scheme pages, Republic of Ireland and Northern Ireland.", href: "#/advocacy/schemes" },
          { label: "Schemes and cards selector", desc: "Which medical card, GP visit card or cross-border scheme pages apply.", href: "#/tools/schemes" },
          { label: "What you pay", desc: "Medicines, GP visits and cross-border costs, scheme by scheme.", href: "#/costs" },
        ] },
        { title: "Guides", items: [
          { label: "Children's disability services explained", desc: "How CDNTs, Assessment of Need and payments fit together.", href: "#/rights/disability-children" },
          { label: "Interpreter or sign language at an appointment", desc: "What to ask for and how.", href: "#/guide/interpreting" },
        ] },
      ],
    },
    {
      id: "act", href: "#/act", title: "Take action",
      blurb: "Complain, ask for records, prepare.",
      intro: "Step-by-step tools and letters. Nothing you type is sent anywhere.",
      groups: [
        { title: "Complain and ask", items: [
          { label: "Complaints navigator", desc: "The right body, stage and time limit, then a letter.", href: "#/tools/complaints" },
          { label: "Records-request builder", desc: "FOI or subject access request, with a deadline tracker.", href: "#/tools/records" },
          { label: "Build a SAR letter", desc: "A guided form for a subject access request.", href: "#/advocacy/sar-builder" },
          { label: "Write to your elected representative", desc: "A short, neutral letter asking a TD, councillor, MLA or MP to raise a problem.", href: "#/advocacy/rep-letter" },
          { label: "FOI by hospital", desc: "Where to send a request, hospital by hospital.", href: "#/advocacy/hospitals" },
          { label: "Letter templates", desc: "Letters you can copy and edit.", href: "#/advocacy/templates" },
        ] },
        { title: "Waiting and leaving hospital", items: [
          { label: "While you wait", desc: "What waiting list letters and statuses mean, and how to ask.", href: "#/tools/waiting" },
          { label: "Assessment of Need toolkit", desc: "Deadline calculator, letters and escalation steps (Republic of Ireland).", href: "#/tools/aon" },
          { label: "Discharge passport", desc: "A page to print before you leave hospital.", href: "#/tools/discharge" },
        ] },
        { title: "Prepare and keep track", items: [
          { label: "Prep for an appointment", desc: "A checklist and a message to take in.", href: "#/prep" },
          { label: "My Patient Passport", desc: "Keep key details together.", href: "#/passport" },
          { label: "My call and referral log", desc: "Note who you spoke to and when.", href: "#/log" },
          { label: "All guided tools", desc: "The full list of step-by-step tools.", href: "#/tools" },
        ] },
      ],
    },
    {
      id: "support", href: "#/support", title: "Get support",
      blurb: "Crisis help and who to contact.",
      intro: "If you need help now, start with crisis support.",
      groups: [
        { title: "Help now", items: [
          { label: "Crisis support", desc: "Mental health crisis services.", href: "#/specialty/crisis" },
          { label: "Domestic and sexual violence", desc: "Support services.", href: "#/specialty/dsv" },
        ] },
        { title: "Practical help", items: [
          { label: "After a death", desc: "Registering, the coroner and money help.", href: "#/guide/after-a-death" },
        ] },
        { title: "People and organisations", items: [
          { label: "Who to contact", desc: "Official bodies for complaints and advice.", href: "#/advocacy/contacts" },
          { label: "Support organisations", desc: "Charities and groups by topic.", href: "#/advocacy/orgs" },
          { label: "General support", desc: "National bodies for disability, LGBTQ+, older age and migrant support.", href: "#/advocacy/general" },
        ] },
      ],
    },
  ];

  // Routes that do not need a door row: deliberately not listed, with the reason.
  const OTHER_ROUTES = {
    "": "Home",
    "find": "hub page", "rights-hub": "hub page", "act": "hub page", "support": "hub page",
    "search": "search results", "search-results": "private search results (privacy layer)",
    "entry": "a single directory entry, reached from lists",
    "install": "footer link only, by design",
    "start": "Where do I start? (guided path), linked from Home and from an empty search",
  };

  // Old bookmarks that have no row of their own, mapped to the row that carries them.
  const ALIASES = { "#/advocacy": "#/advocacy/guide" };

  const items = [];
  DOORS.forEach(d => d.groups.forEach(g => g.items.forEach(it => items.push({ door: d.id, ...it }))));

  // Which door a hash belongs to: exact match first, then the longest listed route it sits under.
  function doorForHash(hash){
    const h = (ALIASES[hash] || hash || "#/").replace(/\/+$/, "") || "#/";
    if (h === "#" || h === "#/") return "home";
    const hub = DOORS.find(d => h === d.href);
    if (hub) return hub.id;
    let best = null;
    items.forEach(it => {
      if ((h === it.href || h.startsWith(it.href + "/")) && (!best || it.href.length > best.href.length)) best = it;
    });
    if (best) return best.door;
    // Everything else under a directory route, including entries, belongs to Find care.
    return /^#\/(specialty|county|facilities|conditions|entry)/.test(h) ? "find" : null;
  }

  const api = { DOORS, OTHER_ROUTES, ALIASES, items, doorForHash };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HH_DOORS = api;
})(typeof window !== "undefined" ? window : globalThis);
