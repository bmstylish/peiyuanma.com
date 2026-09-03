---
title: "TryHackMe Jr Penetration Tester: Daily Learning Journal"
description: A day-by-day journal of learning practical pentesting. Days 1 to
  18 are written up, dead ends included; the rest follows TryHackMe's Jr
  Penetration Tester path.
date: 2026-07-01
tags:
  - ctf
  - linux
  - web security
  - tryhackme
  - penetration testing
  - burp suite
status: archived
lessons: Writing down the dead ends turned out to be worth more than
  recording the solutions.
writeup: true
journal: ctf-winter-break-2026
order: 0
draft: false
---
## What this is

A day-by-day journal of learning practical penetration testing. Each entry records the rooms I finished, the commands that worked, and - more usefully - the things that did not.

Days 1 to 18 are written up. Day 19 onward is planned but not done yet; those entries exist as checklists so I know what the next session is before I sit down to it.

## It started as something else

The original plan was a 30-day CTF sprint over winter break: OverTheWire Bandit, then short general-skills challenges, then a branch out into web exploitation, cryptography, forensics, reverse engineering, binary exploitation, and a timed CTF at the end.

The first week did its job. Bandit forced daily Linux and Git practice, and getting the journal format right mattered more than the flags did.

By Day 18 the plan and the journal had stopped agreeing. What I was actually doing was SQL injection, XSS, CSRF, IDOR, Nmap, content discovery, web-server attacks and my first Burp Suite sessions - nearly all of which belongs to TryHackMe's Jr Penetration Tester path. The schedule still said I should context-switch into reverse engineering next.

So I changed the plan instead of the work.

## Why a path instead of scattered CTF

CTF challenges are still worth doing. They teach persistence and how to work with incomplete information. My problem was not the challenges, it was the switching cost.

Jumping from web exploitation to classical cryptography to file forensics gives breadth. It does not give practice at joining the stages of a real assessment together: recon, enumeration, finding something, proving it, escalating, then writing it up so someone else can reproduce it. That sequence is what I want to be able to do, and it is easier to show in a portfolio than a list of flags.

I did not go back and rewrite Days 1 to 18 to look like this was always the plan. Days 1 to 7 are the CTF and Linux foundation, Days 8 to 18 are the drift into web and network testing. The drift is the interesting part.

## What actually tripped me up

The dead ends are the entries I go back and reread.

`nc` and `ncat` are not interchangeable. Working through SSL connections on Day 2, `nc` would not resolve `--ssl`, and I lost time before working out that I needed `ncat`.

`git pull` hides branches. On Bandit 27 and 28, `git pull` was enough to get the flag. On 29 it was not - the flag was in a different branch and `git branch -a` came back empty. `git pull` is `git fetch` plus `git merge` for the current branch, so it never learns the other branches exist. Cloning first, then `git branch -a` and `git checkout dev`, did.

Two machines on TryHackMe is slow. Running a target and the browser AttackBox together is painful enough that it changes how many times you are willing to retry something, which is the wrong reason to stop testing. Connecting over OpenVPN from my own machine is the better setup and I should have moved sooner.

## How a day works now

A room on its own is not a day's work. Each entry pairs the room with practice on its authorised lab target:

- 45 to 90 minutes on the room itself
- 30 to 45 minutes repeating the technique on the target until it is reproducible
- 15 minutes recording commands, evidence, and the attempts that failed

The last 15 minutes are the part I skip when I am tired and the part I regret skipping.

Every day also has to produce something: an attack-surface map, a Repeater request comparison, a scan triage table separating confirmed findings from false positives, or an exploitation log. A Metasploit day is not finished until the module, options, payload, session evidence and cleanup steps are written down.

## Where it goes

Through the rest of the path: Burp workflow, SSRF, session management, file inclusion and command injection, API testing, vulnerability research, wordlists and Hydra, Metasploit and post-exploitation, Linux privilege escalation. The goal at the end is one report-quality finding with evidence, impact, reproduction steps and remediation, written the way someone else would need to read it.
