---
title: "Self-Hosted n8n cybersecurity daily digest "
description: >-
  CyberSignal is a self-hosted n8n automation that collects cybersecurity news,
  vulnerability updates, threat research, and security technology stories each
  morning, ranks them by relevance, removes repeated stories, and posts a
  concise daily digest into Discord.


  I built it to solve a real student workflow problem: staying current with cybersecurity news without spending hours reading every article. The automation helps me quickly skim important stories, identify topics worth deeper research, and keep up with threat activity relevant to my homelab and learning goals.
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
lessons: >-
  This project taught me how important workflow design is in automation. Early
  versions sent duplicate Discord messages because parallel RSS branches
  triggered downstream nodes separately, so I redesigned the workflow to merge
  sources before normalization and delivery.


  I also learned that persistent memory matters for useful daily automation. A digest that repeats the same links quickly becomes noise, so I added file-backed seen-item memory to filter old stories and surface the next best unseen items.


  The biggest lesson was balancing reliability with usefulness: native n8n RSS/HTTP nodes were more reliable than custom fetch logic, while custom Code nodes were better for normalization, scoring, formatting, and memory.
writeup: false
order: 0
draft: false
---
## Overview

CyberSignal is a self-hosted cybersecurity daily digest built with n8n, Docker, and Discord webhooks. It runs every morning at 7:00 AM and posts a concise cybersecurity update into a Discord channel.

The goal was to create a practical learning tool for a cybersecurity student. Instead of manually checking multiple news sites, vulnerability feeds, and research blogs, CyberSignal collects the information automatically, ranks it, removes repeated stories, and formats the result into a readable Discord digest.

## What It Does

CyberSignal collects from multiple sources including cybersecurity news feeds, threat intelligence sources, Google Project Zero, SANS ISC, and CISA KEV. The workflow then normalizes each item into a common format, scores it against my interests and homelab technologies, deduplicates repeated links, and sends a short daily summary to Discord.

The digest is grouped into sections:

- Threat Watch
- Learn This Week
- Vulnerabilities To Know
- Worth A Skim

This keeps the automation from becoming only a CVE alert feed. It includes vulnerabilities, but also highlights attack campaigns, research, defensive techniques, and security technology.

## Technical Implementation

The project runs in Docker using n8n Community Edition. The workflow uses native n8n RSS and HTTP nodes for reliable source fetching, then merges the source branches before processing.

The main workflow stages are:

1. Scheduled trigger at 7:00 AM
2. RSS and HTTP source fetching
3. Source merge
4. Normalization and scoring
5. Seen-item filtering
6. Discord message formatting
7. Discord webhook delivery
8. Seen-item memory update

I added file-backed memory using a mounted `data/seen-items.json` file so the workflow can remember which URLs and CVEs were already sent. This prevents the digest from repeating the same stories every day.

## Challenges

One of the main challenges was understanding how n8n executes parallel branches. An early version connected multiple RSS branches directly into the downstream processing path, which caused multiple Discord messages to be sent. I fixed this by introducing a merge stage before normalization.

Another challenge was persistent memory. n8n workflow static data was not reliable enough during manual testing, so I moved to a simple JSON file mounted into the container. This made the behavior easier to test, debug, migrate, and back up.

## Outcome

CyberSignal now runs as a practical cybersecurity news assistant. It gives me a short, relevant daily update while preserving source links for deeper reading. It is designed to be migrated from my local PC Docker environment to a homelab server so it can run continuously.
