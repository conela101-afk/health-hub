#!/usr/bin/env bash
# Fails if any HTML/CSS/JS file in this repo would cause the browser to
# fetch a resource from another origin: <script src>, <link href> (for
# stylesheets/icons/manifest etc.), <img src>, <iframe>, <source>, <video>,
# <audio>, CSS @import / url(), or fetch()/XHR/sendBeacon/WebSocket/
# EventSource/importScripts pointed at an http(s):// or protocol-relative
# URL. Plain <a href="https://..."> links (user-initiated navigation, never
# preloaded) are allowed and listed separately for review.
#
# vendor/ is excluded — third-party code we vendor verbatim and don't want
# to lint. assets/fonts/*.woff2 and icons/*.png are binary, not scanned.
set -uo pipefail
cd "$(dirname "$0")/.."

FILES=$(find . \
  -type d \( -name .git -o -name vendor -o -name node_modules \) -prune -o \
  -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -print \
  | sort)

fail=0
findings=""
allowed_links=""

# Resource-loading patterns that must never point off-origin.
RESOURCE_PATTERNS=(
  '<script[^>]+src=["'"'"']((https?:)?//)'
  '<link[^>]+href=["'"'"']((https?:)?//)'
  '<img[^>]+src=["'"'"']((https?:)?//)'
  '<iframe[^>]+src=["'"'"']((https?:)?//)'
  '<source[^>]+src=["'"'"']((https?:)?//)'
  '<video[^>]+src=["'"'"']((https?:)?//)'
  '<audio[^>]+src=["'"'"']((https?:)?//)'
  'url\(\s*["'"'"']?((https?:)?//)'
  '@import[^;]*((https?:)?//)'
  '\bfetch\(\s*[`"'"'"']((https?:)?//)'
  '\bXMLHttpRequest\b'
  '\bsendBeacon\b'
  '\bnew WebSocket\('
  '\bnew EventSource\('
  '\bimportScripts\('
)

for f in $FILES; do
  for pat in "${RESOURCE_PATTERNS[@]}"; do
    hits=$(grep -nE "$pat" "$f" 2>/dev/null || true)
    if [ -n "$hits" ]; then
      fail=1
      while IFS= read -r line; do
        findings="${findings}${f}:${line}"$'\n'
      done <<< "$hits"
    fi
  done
  # Plain <a href="http...">, or ="http..."-style outbound links generally
  # (excluding the resource tags already checked above) — informational only.
  links=$(grep -noE '<a [^>]*href=["'"'"'](https?:)?//[^"'"'"']+' "$f" 2>/dev/null || true)
  if [ -n "$links" ]; then
    while IFS= read -r line; do
      allowed_links="${allowed_links}${f}:${line}"$'\n'
    done <<< "$links"
  fi
done

echo "=== check-third-party.sh ==="
echo
if [ "$fail" -eq 1 ]; then
  echo "FAIL — third-party resource references found:"
  echo "$findings"
else
  echo "PASS — no third-party <script>/<link>/<img>/<iframe>/<source>/<video>/<audio>, CSS url()/@import, or fetch()/XHR/sendBeacon/WebSocket/EventSource/importScripts references found."
fi
echo
echo "--- Outbound <a href> links found (user-initiated, not preloaded — listed for review only, not a failure) ---"
if [ -n "$allowed_links" ]; then
  echo "$allowed_links"
else
  echo "(none)"
fi

exit $fail
