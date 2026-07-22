---
title: "TryHackMe Jr Penetration Tester: Daily Learning Journal"
description: "An open-ended, day-by-day practical journal following TryHackMe's Jr Penetration Tester path, with completed rooms, authorised practice, and reproducible notes."
tags:
  - "ctf"
  - "linux"
  - "web security"
  - "tryhackme"
  - "penetration testing"
  - "burp suite"
status: "active"
lessons: "A structured methodology, deliberate practice, and reproducible notes turn individual challenges into transferable penetration-testing skills."
writeup: true
journal: "ctf-winter-break-2026"
order: 0
draft: false
---

## Project goal

This project began as a broad 30-day CTF sprint. The first week built useful Linux, Git, networking, and problem-solving foundations through Bandit and short challenges. As the journal continued, the work naturally moved into TryHackMe rooms covering SQL injection, XSS, CSRF, IDOR, Nmap, web enumeration, web-server attacks, and Burp Suite.

The journal is no longer limited to thirty days. I am continuing through the current [TryHackMe Jr Penetration Tester learning path](https://tryhackme.com/path/outline/jrpenetrationtester) one study day at a time. The goal is to connect each room to the next stage of a realistic assessment: reconnaissance, enumeration, vulnerability identification, exploitation, post-exploitation, privilege escalation, and reporting.

## Why the plan changed

- **Depth over scattered coverage:** a connected workflow is more useful for my pentesting goals than briefly sampling crypto, forensics, reversing, and binary exploitation in the same sprint.
- **The completed work still counts:** Days 1–18 already cover prerequisites and shared rooms, so restarting would discard useful progress instead of building on it.
- **Every room now has an output:** each future day pairs TryHackMe rooms with a practical artifact such as an attack-surface map, request comparison, scan triage table, exploitation log, or report finding.
- **Progress is not tied to an arbitrary deadline:** the path is large enough that rushing to finish by Day 30 would reduce the time available for repetition, troubleshooting, and useful documentation.
- **The journal can grow with the path:** Day 31 and later entries will appear as I continue into Windows, Active Directory, Python, specialised-domain, reporting, and capstone rooms.

## Daily format

Most sessions are designed for **90–150 minutes**, depending on room length:

- 45–90 minutes completing the primary TryHackMe room or rooms
- 30–45 minutes repeating the technique on the room's authorised lab target
- 15 minutes recording evidence, commands, failed attempts, and remediation notes
- An optional stretch room only when the primary work and journal entry are complete

### Ongoing milestones

- Preserve every dated entry as an honest record of what I completed that day
- A repeatable workflow from Nmap and web enumeration through exploitation and privilege escalation
- Practical evidence for each study day, not only room-completion badges
- Independent completion of the Recruit, Support, Checkmate, and Jump challenge rooms where time allows
- One concise pentest-style finding with evidence, impact, remediation, and reproduction steps
- Continue adding entries until the Jr Penetration Tester path and its capstone work are complete

The sections below track the original foundation work and the ongoing TryHackMe plan. Each study day has its own page, and new weeks are added automatically as the journal grows.
