# Find-it test: Four doors PR 4 (old design against new)

For Elaine to run. Purpose: show that the new colours and flat cards do not make anything harder to find. This is three people, not a research sample, and it is not a merge blocker. Record on paper only. Nothing is recorded in the app, and the app collects nothing.

## 1. Set up

Old version (`28027c2` is `main` before this PR. The tag `pre-pr4` points at it, but the proxy refused the tag push from Code, so push it by hand with `git push origin pre-pr4`, or just use the commit):

```bash
git fetch origin --tags
git worktree add ../health-hub-old 28027c2   # or pre-pr4, once the tag is pushed
cd ../health-hub-old && python3 -m http.server 8001
```

New version (this PR's branch, or `main` after merge):

```bash
cd health-hub && python3 -m http.server 8002
```

Open `http://localhost:8001/` (old) and `http://localhost:8002/` (new) on the same phone-sized window or a real phone on the same network. Use a private window so no saved state or service worker carries over, and clear site data between people. No hosted second copy.

## 2. People and order

Three people who have not seen the app. Alternate which version each starts with: person 1 old first, person 2 new first, person 3 old first. Each person tries the same six tasks on both versions. The second time round they will find things faster because they have seen the app; so compare mainly the first pass of each version across people, and note the second pass separately.

## 3. What to say

Read this out, then say nothing else except "go ahead" and, if they are stuck for a full minute, "what would you try next?". Do not point at anything.

> This is a free guide to health services and your rights in Ireland. I am testing the app, not you. There are no wrong answers. I will give you a job to do and I would like you to find the page that does it. Think out loud if you can. Tell me when you think you have found the right page. If you get stuck, that is useful for me to know.

## 4. Tasks (draft, Elaine to edit)

1. Find how to make a complaint about a hospital.
2. Find out whether you can get a copy of your records.
3. Find a late-night GP service near you.
4. Find what a medical card might cover.
5. Find help if you are in crisis.
6. Find the page about your child's Assessment of Need.

Start each task from the Home page. Stop a task at 2 minutes and mark it "not found".

## 5. Sheet (one per person per version; print or copy to paper)

Person: ___  Version (old / new): ___  Pass (1st / 2nd): ___  Date: ___

| Task | Found it? (yes / no) | Taps | Seconds | Wrong turns (where they went first) |
|---|---|---|---|---|
| 1 Complaint | | | | |
| 2 Records | | | | |
| 3 Late-night GP | | | | |
| 4 Medical card | | | | |
| 5 Crisis help | | | | |
| 6 Assessment of Need | | | | |

Anything they said out loud, or could not read or tell apart:

## 6. Report

Add the totals to `REVIEW.md` under "Four doors PR 4 find-it test", with the date and "3 people, not a research sample", then update `MASTER-BUILD-PLAN.md` P1 with the result. One line per version is enough: tasks found out of 18, median taps, median seconds, number of wrong turns, and anything colour-related people said (for example a card that did not look tappable).

A fair reading: the new version is no worse if, for first passes, it finds the same number of tasks and the median taps and seconds are within a few seconds of the old one. If people missed things in the new version that they found in the old one, note which screen and what they said, and bring it back before the next colour change.
