---
title: Building a 30-Day CTF Training Journal
description: Turning a winter break CTF plan into a structured, Decap-editable project journal while safely reconciling local and deployed site changes.
date: 2026-07-01
tags:
  - ctf
  - astro
  - decap cms
  - github
  - documentation
draft: false
---

Today I added a new project to my portfolio for a 30-day CTF training sprint over the winter break. The goal is to polish the skills I already have, learn the areas I have less experience in, and document what I learn each day instead of only recording the final result.

The project sounds simple: create a page, add the schedule, and update it every day. However, before I could build it, I had to fix a problem with how my local repository and deployed website had drifted apart.

## Reconciling the local and deployed site

My site is deployed through Cloudflare whenever a change is pushed to GitHub. Decap CMS also writes new posts directly to GitHub, which meant the deployed repository contained newer blog and lab content that was not available in my local copy.

At the same time, my local branch contained a UI and tagging update that had not been pushed. Pushing the local branch without checking the remote history could have caused conflicts or lost content.

The safe approach was:

* Create a complete Git recovery bundle of the local history
* Fetch the latest `main` branch from GitHub
* Compare the local and remote commits
* Merge both histories instead of replacing either version
* Resolve the one overlapping lab file manually
* Build the full Astro site before pushing

The conflict was in my SSH brute-force lab. The deployed version contained the complete write-up, while the local version had changed its metadata from `tools` to the new `tags` field. The correct resolution was to keep the complete article while converting its metadata to the new tag schema.

This preserved both the new posts written through Decap and the UI work completed locally.

## Planning the CTF project

The original plan contains four main training weeks:

1. Linux and general CTF skills
2. Web exploitation
3. Crypto, forensics, reversing, and pwn
4. Independent CTF solving

Each session is designed to take between 60 and 90 minutes. The time is split between learning, solving challenges, and documenting the result. The end target is at least 60 completed levels or challenges, 10–15 write-ups, one complete beginner machine, and one simulated or live CTF.

My first implementation placed the entire plan and all 30 daily logs on one project page. Everything was technically there, but the page was too long and difficult to navigate. It also did not give each daily entry enough space to become a proper write-up.

## Moving from one page to a journal structure

I reorganised the project into three levels:

* A project overview explaining the goal and end target
* A separate page for each week
* A separate Markdown page for every daily entry

The overview now shows four week cards with a short description and completion count. Because four seven-day weeks only account for 28 days, Days 29 and 30 are kept in a separate finale section rather than being removed from the original plan.

Each week page contains its seven daily cards. A card shows the day number, topic, plan, and current status. Opening a card leads to a dedicated daily page with space for:

* Challenges completed
* What I learned
* Commands, tools, and techniques
* Problems and dead ends
* Topics I need to revisit

This is much cleaner than one long page and should make the project easier to maintain as the write-ups become longer.

## Making daily entries editable through Decap

I did not want updating the journal to require manually editing files and running Git commands every day. To keep the same workflow as my existing blog, I added a new **CTF Daily Journal** collection to Decap CMS.

Each entry can now be updated through the admin page with:

* Day and week number
* Title and planned activity
* Status: planned, in progress, or complete
* Completion date
* Full Markdown notes

Decap commits those changes to GitHub, which then triggers Cloudflare to rebuild the static site. This keeps the public site fully static while still giving me a practical editing interface.

## Astro routing and content collections

The final route structure is:

* `/projects/30-days-of-ctf-winter-break-2026`
* `/projects/30-days-of-ctf-winter-break-2026/weeks/week-1`
* `/projects/30-days-of-ctf-winter-break-2026/days/day-01-bandit-010`

The daily entries live in their own Astro content collection. I initially ran into a collection-path mismatch because the collection was named `ctfDays` while the content folder was named `ctf-days`. Astro tried to infer a folder called `ctfDays`, so the collection appeared empty even though all the Markdown files existed.

The fix was to define an explicit glob loader for `src/content/ctf-days`. Entries loaded through the newer content loader also need Astro's `render(entry)` function instead of calling `entry.render()` directly. Once these two details were corrected, Astro generated all week and daily routes successfully.

## Final result

The portfolio now has a project journal that is structured enough for a 30-day plan but flexible enough for detailed daily notes. It includes:

* A project card accessible from the main Projects page
* A clean overview rather than one oversized document
* Four focused week pages and a finale
* 30 independent daily writing pages
* Status and completion tracking
* Decap CMS editing through the existing GitHub authentication flow
* Automatic deployment through Cloudflare

The next step is to begin Day 1, work through Bandit levels 0–10, and replace the writing prompts with the first real daily entry.
