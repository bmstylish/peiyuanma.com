---
title: "CyberSignal: Self-Hosted Cybersecurity Daily Digest"
description: A self-hosted n8n workflow that reads security news, threat
  intelligence and CISA KEV every morning and posts a triaged digest to Discord.
date: 2026-08-13
tags:
  - n8n
  - Docker
  - Automation
  - Cybersecurity
  - Discord Webhook
  - RSS
  - Threat Intelligence
  - Homelab
  - Workflow Automation
  - JavaScript
github: https://github.com/bmstylish/CyberSignal
status: active
lessons: Parallel branches in n8n do not merge themselves, and state you
  cannot inspect is state you cannot debug.
writeup: true
order: 0
draft: false
---
## Why I built it

Every morning I was checking the same handful of places - security news, CISA KEV, SANS ISC, Project Zero - and still missing things. The bigger problem was that most of what I found was either irrelevant to anything I actually run, or a CVE number with no indication of whether it mattered.

CyberSignal is an n8n workflow that does that reading for me and posts a short digest to Discord at 7:00 every morning. It is deliberately not a CVE alert feed. What I wanted was triage: what changed overnight, and which one thing is worth an hour today.

## How it works

It runs on n8n Community Edition in Docker. Eight stages:

1. Schedule trigger at 07:00
2. RSS and HTTP nodes fetch each source
3. Merge the branches
4. Normalize every item into one shape, then score it
5. Drop anything already sent
6. Format the Discord message
7. Post to the webhook
8. Write the new items back to memory

Sources are security news feeds, threat intelligence, Google Project Zero, SANS ISC, and CISA KEV. Scoring is weighted toward the technologies in my own homelab, so something affecting Docker or a service I actually run outranks a product I will never touch.

The digest is split into four sections:

- Threat Watch
- Learn This Week
- Vulnerabilities To Know
- Worth A Skim

The split is the part I care about most. If the whole thing is a vulnerability list it becomes noise and I stop reading it after a week. Keeping a section for research and defensive technique means it is still worth opening on a quiet day.

## Problem 1: one digest per source

The first working version posted several Discord messages every morning instead of one.

I had connected each RSS branch straight into the downstream processing path. I assumed n8n would collect the parallel branches for me before the next node ran. It does not. Each branch carries its own execution all the way to the end, so the format-and-post stage ran once per source.

The fix was an explicit merge stage before normalization, so everything arrives as one item set and the Discord node runs once. Obvious in hindsight. It cost me time because the workflow looked correct on the canvas and only misbehaved at the very last node.

## Problem 2: memory that did not survive testing

Deduplication has to remember what it already sent, or the same story reappears every morning until it falls off the feed.

I first used n8n's workflow static data. On scheduled runs it mostly worked. During manual testing it was not reliable enough to trust, and if I cannot trust the memory while developing then I cannot tell whether a filter change worked or the memory just lost state.

I moved it to a JSON file, `data/seen-items.json`, mounted into the container. Less elegant than static data, but I can read it, edit it, back it up, and carry it to another host. Being able to `cat` the state file and see exactly which URLs and CVEs were recorded turned the filtering logic into something I could debug instead of guess at.

## Where it is now

It now runs in Docker on my homelab server, which stays on, so the digest lands every morning whether or not my PC is awake. Moving it off my desktop was the last thing standing between this being a script I ran and a service I rely on.

Current limitations:

- Scoring is hand-tuned keyword weighting, not anything clever, and it needs adjusting whenever my homelab changes.
- Deduplication keys on URL and CVE, so the same story republished under a different link can still get through.

## What I would do differently

Design the branch topology before building nodes. Both problems came from the same habit: wiring something that worked for one source and assuming it would scale to six. Neither showed up until the workflow ran for real.
