#!/usr/bin/env bash
# Checks that check-third-party.sh still fails (exit 1) on a bad shipped file
# and ignores scripts/. Runs the checker against throwaway fixture trees.
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
checker="$here/check-third-party.sh"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
rc=0

expect() { # name want_exit dir
  CHECK_ROOT="$3" bash "$checker" >/dev/null 2>&1
  got=$?
  if [ "$got" -eq "$2" ]; then echo "ok   $1 (exit $got)"; else echo "FAIL $1: wanted exit $2, got $got"; rc=1; fi
}

mk() { mkdir -p "$tmp/$1/data" "$tmp/$1/scripts"; echo '<p>ok</p>' > "$tmp/$1/index.html"; echo 'var a=1;' > "$tmp/$1/app.js"; }

mk clean;   expect "clean tree passes" 0 "$tmp/clean"

mk bad_html; echo '<script src="https://cdn.example.com/x.js"></script>' > "$tmp/bad_html/index.html"
expect "third-party <script src> in index.html fails" 1 "$tmp/bad_html"

mk bad_js;  echo 'new XMLHttpRequest();' > "$tmp/bad_js/app.js"
expect "XMLHttpRequest in root js fails" 1 "$tmp/bad_js"

mk bad_beacon; echo 'navigator.sendBeacon("/x");' > "$tmp/bad_beacon/sw.js"
expect "sendBeacon in sw.js fails" 1 "$tmp/bad_beacon"

mk bad_data; echo 'fetch("https://example.com/a");' > "$tmp/bad_data/data/x.js"
expect "fetch to external URL in data/ fails" 1 "$tmp/bad_data"

mk bad_css; echo '@import url("https://fonts.example.com/a.css");' > "$tmp/bad_css/styles.css"
expect "external @import in styles.css fails" 1 "$tmp/bad_css"

mk tooling; echo 'const re = /XMLHttpRequest|sendBeacon/;' > "$tmp/tooling/scripts/t.js"
expect "XHR/sendBeacon regex in scripts/ is ignored" 0 "$tmp/tooling"

exit $rc
