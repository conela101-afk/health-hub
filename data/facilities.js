// "Find a Facility" layer — Phase D of MASTER-BUILD-PLAN.md.
//
// This is a SEPARATE, STANDALONE data source from ../data.js. It is not
// imported into, cross-referenced against, or deduped with the specialty
// directory in ENTRIES — that's an explicit later step (see the Phase D
// spec's "Revisit checklist"), not done here.
//
// Scope: regulated RESIDENTIAL centres only — nursing homes and disability
// residential centres inspected by HIQA (Republic of Ireland), and services
// registered with RQIA (Northern Ireland). This does NOT cover acute
// hospitals, private clinics, or outpatient specialists — those stay in
// data.js's manually-curated model, which HIQA/RQIA registers don't help
// with (see "Explicitly out of scope" in the Phase D spec).
//
// STATUS: seed only, not the full register. The Phase D spec calls for
// ingesting the live CSV exports below, but this session's network egress
// blocks fetching them (confirmed against multiple unrelated domains, not
// HIQA-specific — see CHANGELOG.md 2026-09-06). The entries below are a
// small number of real, individually verified facilities (name/address/
// phone confirmed via web search against each facility's own listings),
// standing in for the full bulk ingest until the CSVs can be fetched or
// uploaded directly.
//
// Data sources (for the eventual full ingest):
//   - Older persons (nursing homes): https://www.hiqa.ie/centre/export/older_persons_register.csv?_format=csv
//   - Disability residential:        https://www.hiqa.ie/centre/export/disability_register.csv?_format=csv
//   - RQIA registered services (NI): via data.gov.uk / OpenDataNI (Open Government Licence)
//
// Note on disability-residential coverage: this seed has none. Unlike
// nursing homes (commercial businesses that advertise their own address and
// phone number), individual disability designated centres are often small
// group homes, and their exact addresses generally aren't surfaced through
// public search — reasonably, for resident privacy/safety. The full HIQA
// CSV export will have this data (it's the official regulator's register),
// but we won't fabricate a placeholder address here. Filled in once the
// real CSV is available.
//
// Attribution:
//   - HIQA data © Health Information and Quality Authority. Re-use terms
//     should be confirmed on hiqa.ie before this seed is expanded from the
//     full CSV export (not yet done — blocked on the same network issue).
//   - RQIA / OpenDataNI data is Open Government Licence (OGL) — standard
//     OGL attribution required once the real RQIA export is ingested.
const FACILITIES_ATTRIBUTION = {
  hiqa: "Data on regulated centres for older persons and people with disabilities is drawn from the Health Information and Quality Authority (HIQA) register. Re-use terms to be confirmed against hiqa.ie before the full register is ingested.",
  rqia: "Northern Ireland data is drawn from RQIA registered services (via OpenDataNI), used under the Open Government Licence v3.0.",
};

// Each entry: id, name, type, county_or_trust, sector, address, phone,
// source_url, last_checked. `type` is "older_persons" | "disability_residential" | "ni_registered_service".
const FACILITIES = [
  {
    id: "ashford-house-nursing-home",
    name: "Ashford House Nursing Home",
    type: "older_persons",
    county_or_trust: "Dublin",
    sector: "private",
    address: "6 Tivoli Terrace East, Dun Laoghaire, Co. Dublin, A96 T853",
    phone: "01 280 9877",
    source_url: "https://www.hiqa.ie/areas-we-work/find-a-centre/ashford-house-nursing-home-0",
    last_checked: "6 Sep 2026"
  },
  {
    id: "maryborough-nursing-home",
    name: "Maryborough Nursing Home",
    type: "older_persons",
    county_or_trust: "Cork",
    sector: "private",
    address: "Maryborough Hill, Douglas, Co. Cork, T12 AX28",
    phone: "021 489 1586",
    source_url: "https://www.hiqa.ie/areas-we-work/find-a-centre/maryborough-nursing-home",
    last_checked: "6 Sep 2026"
  },
  {
    id: "kilcolgan-nursing-home",
    name: "Kilcolgan Nursing Home",
    type: "older_persons",
    county_or_trust: "Galway",
    sector: "private",
    address: "Killeely More, Kilcolgan, Co. Galway, H91 Y7N3",
    phone: "091 776 446",
    source_url: "https://www.hiqa.ie/areas-we-work/find-a-centre/kilcolgan-nursing-home",
    last_checked: "6 Sep 2026"
  },
  {
    id: "daleview-house-nursing",
    name: "Daleview House Nursing (Apex Housing Association)",
    type: "ni_registered_service",
    county_or_trust: "Western Trust",
    sector: "voluntary",
    address: "Dungiven Road, Waterside, Derry/Londonderry, BT47 5GW",
    phone: "028 7114 0148",
    source_url: "https://www.apex.org.uk/accommodation/daleview-house/",
    last_checked: "6 Sep 2026"
  },
];
