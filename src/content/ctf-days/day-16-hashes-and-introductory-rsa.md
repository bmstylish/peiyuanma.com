---
project: ctf-winter-break-2026
day: 16
week: 3
title: Webstacks
description: "Walkthrough of vulnerabilities of MERN, React/Next, Django and LAMP "
status: complete
date: 2026-07-16
draft: false
---
## Challenges completed

Walk through of the following 4 CVEs on vulnerably machines in THM rooms:

* MERN / Express CVE-2020-8203 

  * Prototype pollution → auth bypass 

    * 7.4 High
* Next.js Middleware CVE-2025-29927

  * Single header → full middleware bypass 

    * 9.1 Critical
* Django ORM CVE-2021-35042 

  * SQL injection via unparameterised `ORDER BY `

    * 9.8 Critical
* Apache LAMP CVE-2021-41773

  * Path traversal + `mod_cgi` RCE

    * 9.8 Critical

## What I learned

Identify the technology stack and confirm evidence before exploiting, so attacks are targeted rather than based on guessing or noisy automated scans.

## Commands, tools, and techniques

* Nikito 

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
