---
project: ctf-winter-break-2026
day: 22
week: 4
title: "Session management and broken authentication"
description: "Complete Session Management and Broken Authentication, then compare how the application handles identity across requests."
status: planned
draft: false
---

## TryHackMe rooms

- [ ] [Session Management](https://tryhackme.com/room/sessionmanagement)
- [ ] [Broken Authentication](https://tryhackme.com/room/brokenauthentication)

## Corresponding practice

- [ ] On the authorised targets, capture requests before login, after login, and after logout.
- [ ] Compare cookies or tokens for flags, lifetime, rotation, and invalidation behaviour.
- [ ] Use two test users to verify whether identity and authorisation are enforced server-side.
- [ ] Build a table separating authentication failures from session-management failures.

## Evidence to capture

- [ ] Sanitised session lifecycle table
- [ ] One Burp request comparison
- [ ] Recommended control for each confirmed weakness

## What I learned

_Explain the difference between proving identity and maintaining an authenticated session._

## Problems and dead ends

_Record any result that could not be reproduced consistently._

## What I will revisit

_Choose one session test to repeat from memory._
