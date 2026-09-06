#!/usr/bin/env python3
"""Regenerate ../facilities.js from ireland_healthcare_master_scaffold.csv.

Run from anywhere: python3 data/sources/build-facilities.py

The master scaffold is a pre-merged snapshot of five regulator/registry
sources (see README.md in this directory for what each one is and its
known gaps). This script's only real job is de-duplicating ids -- the
scaffold's own id column collides for a handful of rows sharing a
truncated name prefix (e.g. three "Hillview Lodge ... Ballymoney /
Omagh / Strabane" branches) even though the underlying records are
genuinely distinct -- everything else is a straight column mapping.

Re-run this whenever a fresher master scaffold CSV is dropped in this
directory, rather than hand-editing facilities.js.
"""
import csv
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "ireland_healthcare_master_scaffold.csv")
OUT = os.path.join(HERE, "..", "facilities.js")

HEADER = '''// "Find a Facility" layer -- Phase D of MASTER-BUILD-PLAN.md.
//
// GENERATED FILE -- do not hand-edit. Regenerate with
// data/sources/build-facilities.py from data/sources/ireland_healthcare_master_scaffold.csv
// (see data/sources/README.md for what that file is and how it was built).
//
// This is a SEPARATE, STANDALONE data source from ../data.js. It is NOT
// imported into, cross-referenced against, or deduped with the specialty
// directory in ENTRIES -- that is an explicit later step (see the Phase D
// decision doc's "Revisit checklist"), not done here.
//
// Attribution:
//   - HIQA data (c) Health Information and Quality Authority. Re-use terms
//     have not been independently confirmed against hiqa.ie's own footer/
//     licence page -- do that before treating this as cleared for reuse
//     beyond this app.
//   - RQIA / OpenDataNI data is Open Government Licence (OGL) -- standard
//     OGL attribution included below.
//   - HIA Definitive Hospital List and HSE GeoHive/Health Atlas: supplied
//     directly for this project; re-use terms not independently verified.
const FACILITIES_ATTRIBUTION = {
  hiqa: "Data on regulated centres for older persons and people with disabilities is drawn from the Health Information and Quality Authority (HIQA) register. Re-use terms not independently confirmed against hiqa.ie.",
  rqia: "Northern Ireland data (nursing homes, residential care, domiciliary care, day care, dental practices, independent hospitals/clinics, nursing agencies, hospices, adult placement, adoption agencies) is drawn from RQIA registered services (via OpenDataNI), used under the Open Government Licence v3.0.",
  hospitals: "Republic of Ireland hospital listings are drawn from the HSE GeoHive/Health Atlas open dataset and a supplied \\"HIA Definitive Hospital List\\" (Aug 2025). Re-use terms not independently verified.",
};

// Each entry: id, name, type, sector (public/private/voluntary),
// jurisdiction (ROI/NI), county_or_trust, address, postcode, phone,
// max_occupancy (number or null), provider, person_in_charge, url,
// source, source_id, last_checked, notes.
const FACILITIES = '''


def build():
    with open(SRC, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    seen = {}
    out = []
    for r in rows:
        base_id = r["id"].strip()
        if base_id in seen:
            seen[base_id] += 1
            rid = f"{base_id}-{seen[base_id]}"
        else:
            seen[base_id] = 1
            rid = base_id

        max_occ = r["max_occupancy"].strip()
        max_occ_val = int(max_occ) if max_occ.isdigit() else None

        out.append({
            "id": rid,
            "name": r["name"].strip(),
            "type": r["type"].strip(),
            "sector": r["sector"].strip(),
            "jurisdiction": r["jurisdiction"].strip(),
            "county_or_trust": r["county_or_trust"].strip(),
            "address": r["address"].strip(),
            "postcode": r["postcode"].strip(),
            "phone": r["phone"].strip(),
            "max_occupancy": max_occ_val,
            "provider": r["provider"].strip(),
            "person_in_charge": r["person_in_charge"].strip(),
            "url": r["url"].strip(),
            "source": r["source"].strip(),
            "source_id": r["source_id"].strip(),
            "last_checked": r["last_inspected_or_registered"].strip(),
            "notes": r["notes"].strip(),
        })

    ids = [o["id"] for o in out]
    assert len(ids) == len(set(ids)), "duplicate ids remain after dedup -- investigate before shipping"

    with open(OUT, "w", encoding="utf-8") as f:
        f.write(HEADER)
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    print(f"wrote {len(out)} rows to {OUT}")


if __name__ == "__main__":
    build()
