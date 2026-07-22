---
title: "Building a 30-Day CTF Training Journal + Improving Portfolio Navigation "
description: Turning a winter break CTF plan into a structured, Decap-editable
  project journal while safely reconciling local and deployed site changes.
date: 2026-07-01
tags:
  - ctf
  - astro
  - decap cms
  - github
  - documentation
draft: false
---
> **Update — July 22, 2026:** This post documents the journal's original 30-day format. The project is now an open-ended [TryHackMe Jr Penetration Tester daily journal](/blog/pivoting-my-30-day-ctf-plan-to-the-tryhackme-jr-pentester-path.md) with no maximum day or week.

It's been 3 months since the last update to my portfolio due to university work and exams, so I've decided to use the winter breaks to work on my CTF skills. I've added a new project for a 30-day CTF training sprint over the winter break. The goal is to sharpen the skills I already have, improve in areas where I have less experience, and document the process each day instead of only recording the final result.

The project itself sounds simple: create a page, add the schedule, and update it daily. Before I could build it properly, I had to fix a larger issue with how my local repository and deployed website had drifted apart.

## Reconciling the Local and Deployed Site

My site is deployed through Cloudflare whenever changes are pushed to GitHub. Decap CMS also writes new posts directly to GitHub, which meant the deployed repository contained newer blog and lab content that was missing from my local copy.

At the same time, my local branch contained UI and tagging updates that had not been pushed yet. Pushing my local branch without checking the remote history could have caused conflicts or overwritten content.

The safe approach was to:

* Create a complete Git recovery bundle of the local history
* Fetch the latest `main` branch from GitHub
* Compare the local and remote commits
* Merge both histories instead of replacing either version
* Resolve the one overlapping lab file manually
* Build the full Astro site before pushing

The only conflict was in my SSH brute-force lab. The deployed version contained the complete write-up, while the local version had updated its metadata from `tools` to the new `tags` field. The correct resolution was to keep the complete article and convert its metadata to the new tag schema.

This preserved both the newer posts written through Decap CMS and the UI work completed locally.

## Improving Portfolio Navigation with Tags

As part of the same update, I also improved how projects, blogs, and labs are grouped across the site.

Previously, content was harder to browse because related work was spread across different sections. I added a shared tag system so that projects, blog posts, and lab write-ups can be connected by topic.

Tags are now clickable. When a visitor selects a tag, the site groups together all content with that same tag, regardless of whether it is a project, blog post, or lab. This makes the portfolio easier to explore and gives each topic its own lightweight index.

For example, a tag such as `linux`, `web`, `ctf`, or `ssh` can now surface every related post across the site instead of forcing the user to search through each section manually.

This also makes the portfolio more scalable. As I add more CTF journal entries, lab write-ups, and technical posts, the tag pages will automatically become better topic-based collections.

## Planning the CTF Project

The original CTF plan contains four main training weeks:

* Linux and general CTF skills
* Web exploitation
* Crypto, forensics, reversing, and pwn
* Independent CTF solving

Each session is designed to take between 60 and 90 minutes. The time is split between learning, solving challenges, and documenting the result.

The end targets are:

* At least 60 completed levels or challenges
* 10–15 write-ups
* One complete beginner machine
* One simulated or live CTF

My first implementation placed the entire plan and all 30 daily logs on one project page. Everything was technically present, but the page was too long and difficult to navigate. It also did not give each daily entry enough room to become a proper write-up.

## Moving from One Page to a Journal Structure

I reorganised the project into three levels:

* A project overview explaining the goal and end target
* A separate page for each week
* A separate Markdown page for every daily entry

The overview now shows four week cards with a short description and completion count. Because four seven-day weeks only account for 28 days, Days 29 and 30 are kept in a separate finale section instead of being removed from the original plan.

Each week page contains seven daily cards. A card shows the day number, topic, plan, and current status. Opening a card leads to a dedicated daily page with space for:

* Challenges completed
* What I learned
* Commands, tools, and techniques
* Problems and dead ends
* Topics I need to revisit

This structure is much cleaner than one long page and should make the project easier to maintain as the write-ups become longer.

## Making Daily Entries Editable Through Decap CMS

I did not want updating the journal to require manually editing files and running Git commands every day. To keep the same workflow as my existing blog, I added a new CTF Daily Journal collection to Decap CMS.

Each entry can now be updated through the admin page with:

* Day and week number
* Title and planned activity
* Status: planned, in progress, or complete
* Completion date
* Full Markdown notes

Decap commits those changes to GitHub, which then triggers Cloudflare to rebuild the static site. This keeps the public site fully static while still giving me a practical editing interface.

## Astro Routing and Content Collections

The final route structure is: 

`/projects/30-days-of-ctf-winter-break-2026`

`/projects/30-days-of-ctf-winter-break-2026/weeks/week-1`

`/projects/30-days-of-ctf-winter-break-2026/days/day-01-bandit-010`

The daily entries live in their own Astro content collection. I initially ran into a collection-path mismatch because the collection was named `ctfDays` while the content folder was named `ctf-days`.

Astro tried to infer a folder called `ctfDays`, so the collection appeared empty even though all the Markdown files existed.

The fix was to define an explicit glob loader for `src/content/ctf-days`. Entries loaded through the newer content loader also need Astro’s `render(entry)` function instead of calling `entry.render()` directly.

Once these two details were corrected, Astro generated all week and daily routes successfully.

## Final Result

The portfolio now has a structured project journal that supports a 30-day training plan while still leaving enough room for detailed daily notes.

It now includes:

* A project card accessible from the main Projects page
* A clean project overview instead of one oversized document
* Four focused week pages and a finale section
* 30 independent daily writing pages
* Status and completion tracking
* Decap CMS editing through the existing GitHub authentication flow
* Automatic deployment through Cloudflare
* Clickable tags across projects, blogs, and labs
* Tag pages that group related content across the whole site

This update improved both the CTF project structure and the overall portfolio navigation. The site is now easier to maintain, easier to browse, and better prepared for future technical write-ups.
