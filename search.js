// Search matching, shared by app.js (browser) and scripts/search-audit.js (Node), so the audit
// tests exactly what people get. Pure functions, no DOM. Reads SEARCH_ALIASES and SEARCH_US_UK
// from data.js at call time (load data.js first).
//
// Rules (see CLAUDE_CODE_SEARCH_ALIASES.md, 7 Oct 2026):
//  - One normalise() is applied to the query and to every haystack: lower case, no apostrophes,
//    no diacritics (fadas), "&" becomes "and", hyphens and slashes become spaces, other punctuation
//    is dropped, whitespace collapsed.
//  - US spellings in the query are mapped to UK spellings word by word.
//  - A query of 3 characters or fewer only matches at the start of a word.
//  - A longer query matches as a phrase, or when every word (ignoring one-letter words) is present.
//  - Aliases apply on the exact normalised key, and also when a key of 4+ characters appears as a
//    phrase inside a longer query. Alias targets only route people to words that already appear in
//    the data; they never add a claim.
(function (root) {
  function normalise(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[‘’'`]/g, "")
      .replace(/&/g, " and ")
      .replace(/[-\/]/g, " ")
      .replace(/[^a-z0-9+ ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Prepares a raw query. `notes` lists what the spelling map and aliases added, for the
  // "Also searched" line.
  function prepare(raw) {
    const plain = normalise(raw);
    const us = (typeof SEARCH_US_UK !== "undefined") ? SEARCH_US_UK : {};
    const respelt = plain.split(" ").map(function (w) { return us[w] || w; });
    const q = respelt.join(" ");
    const aliases = (typeof SEARCH_ALIASES !== "undefined") ? SEARCH_ALIASES : {};
    const padded = " " + q + " ";
    const targets = [];
    Object.keys(aliases).forEach(function (key) {
      const hit = key === q || (key.length >= 4 && padded.indexOf(" " + key + " ") !== -1);
      if (hit) aliases[key].forEach(function (t) {
        const nt = normalise(t);
        if (nt && targets.indexOf(nt) === -1) targets.push(nt);
      });
    });
    return {
      raw: raw, q: q, terms: q ? q.split(" ") : [], targets: targets,
      respelled: q !== plain ? q : "",
    };
  }

  function hit(hay, term) {
    if (term.length <= 3) return new RegExp("(^| )" + escapeRe(term)).test(hay);
    return hay.indexOf(term) !== -1;
  }

  // Returns a function that tests an already-normalised haystack.
  function matcher(p) {
    if (!p.q) return function () { return false; };
    const words = p.terms.filter(function (t) { return t.length > 1; });
    return function (hay) {
      if (hit(hay, p.q)) return true;
      if (p.targets.some(function (t) { return hit(hay, t); })) return true;
      return words.length > 1 && words.every(function (t) { return hit(hay, t); });
    };
  }

  // One line for under the search box, or "" when nothing extra was searched.
  function alsoSearched(p) {
    const parts = [];
    if (p.respelled) parts.push(p.respelled);
    p.targets.forEach(function (t) { parts.push(t); });
    return parts.join(", ");
  }

  const api = { normalise: normalise, prepare: prepare, matcher: matcher, alsoSearched: alsoSearched, contains: hit };
  root.HHSearch = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : this);
