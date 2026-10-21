# Claude Code brief: label-gated auto-merge (7 Oct 2026)

> **Status: dropped 9 Oct 2026.** Auto-merge was decided against; no workflow will be added and the rule in `AI_RULES.md` stands. Kept for the record. See `MASTER-BUILD-PLAN.md` §4.

**Goal.** Safe, code-only and docs-only PRs merge themselves once CI is green. Content PRs stay manual, because only a person opening a page may clear `verify` or set `checked`.

**Why not a worker on GitHub Pages.** Pages only serves static files and cannot run code. GitHub Actions can, and GitHub's built-in auto-merge does the waiting for checks.

## Part 1: Elaine does these in GitHub (web, one time; Claude Code cannot do them)
1. **Settings → General → Pull Requests:** tick **Allow auto-merge**. Optionally tick **Automatically delete head branches**.
2. **Settings → Rules → Rulesets → New branch ruleset** for `main`:
   - Require a pull request before merging (0 required approvals, so you are not blocked as sole owner).
   - Require status checks to pass: add **`validate`** (the job in "Data integrity check"; it only appears in the list after one run has happened).
   - Block force pushes and deletions.
   - Without required checks, `--auto` merges immediately, so this step is what makes auto-merge safe. It also blocks direct pushes to `main` (the cause of the 6 Sep wipe).
3. **Issues → Labels:** create a label named **`automerge`**.
4. Ruleset availability: free plans support rulesets on **public** repos. If the repo is private, tell Claude Code; the design changes.

## Part 2: workflow file (Elaine adds this by hand in the GitHub web editor)
**Update 7 Oct 2026:** Claude Code's token has no `workflow` scope, so GitHub rejects any push that touches `.github/workflows/`. Claude Code should NOT try to push this file. Elaine pastes it via GitHub: Add file > Create new file > `.github/workflows/automerge.yml`. Do this BEFORE turning on the ruleset in Part 1 step 2, because the ruleset will block direct commits to `main`. Claude Code's only job from this brief is Part 3 (the `AI_RULES.md` line), via a normal PR.
File `.github/workflows/automerge.yml`:

```yaml
name: Auto-merge labelled PRs

# A PR merges itself only when ALL of these hold:
#  - Elaine added the `automerge` label (Claude Code never adds it)
#  - the branch is `claude/*` and from this repo (not a fork)
#  - the PR does not touch human-only verification fields (guard below)
#  - the required `validate` check passes (enforced by the main ruleset)

on:
  pull_request:
    types: [labeled, synchronize, reopened, ready_for_review]

permissions:
  contents: write
  pull-requests: write

jobs:
  automerge:
    if: >
      contains(github.event.pull_request.labels.*.name, 'automerge') &&
      github.event.pull_request.draft == false &&
      github.event.pull_request.head.repo.full_name == github.repository &&
      startsWith(github.event.pull_request.head.ref, 'claude/')
    runs-on: ubuntu-latest
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      PR_URL: ${{ github.event.pull_request.html_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Block PRs that change human-only verification fields
        run: |
          git fetch origin main
          if git diff -U0 origin/main...HEAD -- data.js data/ \
            | grep -E '^\+[^+].*(checked:|urlStatus: "opened")|^-[^-].*verify: true'; then
            echo "::error::This PR sets checked/opened or clears verify. Only a person who opened the page may do that, so it needs a manual merge."
            gh pr edit "$PR_URL" --remove-label automerge
            exit 1
          fi

      - name: Enable auto-merge (waits for required checks)
        run: gh pr merge --auto --merge "$PR_URL"
```

Notes for Claude Code:
- Merge style is `--merge` to match the repo's existing "Merge pull request #N" history.
- Run `node --check` on nothing here; this file is YAML only. Validate the YAML parses (`python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/automerge.yml'))"`).
- Do not weaken the existing `data-integrity.yml` job names: the ruleset depends on the `validate` name.

## Part 3: Rules to add to `AI_RULES.md`
> Claude Code never adds the `automerge` label and never enables auto-merge itself. Elaine labels a PR when she has decided it needs no further review. PRs that set `checked`, set `urlStatus: "opened"`, or clear `verify` are always merged by hand.

## Known caveats (verify after the first auto-merge)
1. Merges done with the built-in `GITHUB_TOKEN` do not trigger other workflows. The PR already ran `validate`, so the data-integrity check is covered; but confirm the **Pages deployment** still runs after an auto-merge. If it does not, replace `GITHUB_TOKEN` with a fine-grained personal access token (Contents and Pull requests read/write, this repo only) stored as a repository secret, and use that in the `GH_TOKEN` line.
2. The guard greps only `data.js` and `data/`. If verification fields live elsewhere, widen the path list.
3. The label is the control. Do not label a PR you have not read.

## First test
Open a docs-only PR from a `claude/*` branch (for example a CHANGELOG line), add `automerge`, and watch it merge after `validate` goes green. Then open a throwaway PR that changes a `checked:` value and confirm the guard blocks it and removes the label.
