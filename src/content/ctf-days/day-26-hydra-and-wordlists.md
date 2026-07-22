---
project: ctf-winter-break-2026
day: 26
week: 4
title: "Hydra and targeted wordlists"
description: "Complete Hydra and Introduction to Wordlists, then compare a small targeted list with a generic list on the authorised lab."
status: planned
draft: false
---

## TryHackMe rooms

- [ ] [Hydra](https://tryhackme.com/room/hydra)
- [ ] [Introduction to Wordlists](https://tryhackme.com/room/introductiontowordlists)

## Corresponding practice

- [ ] Build a small wordlist from clues supplied inside the room and deduplicate it.
- [ ] Capture the authorised login request and identify the protocol, fields, failure indicator, and rate-limit behaviour.
- [ ] Run the smallest effective Hydra test against the room target and record the exact scope and stop condition.
- [ ] Compare attempts, time, and result quality between the targeted and generic lists.

## Evidence to capture

- [ ] Wordlist-generation and cleanup commands
- [ ] Sanitised Hydra command with target placeholders
- [ ] Notes on lockout, throttling, MFA, and recommended defences

## What I learned

_Explain why context and rate control matter more than blindly using a large list._

## Problems and dead ends

_Record false failure strings, incorrect form syntax, or connection issues._

## What I will revisit

_Rebuild the Hydra command from the captured request without copying it._
