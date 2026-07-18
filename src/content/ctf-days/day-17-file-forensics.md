---
project: ctf-winter-break-2026
day: 17
week: 3
title: "Web Server Attacks "
description: "Complete THM rooms Web Server Attacks I, and II "
status: complete
date: 2026-07-17
draft: false
---
## Challenges completed

Completed THM rooms Web Server Attacks I, II 

Walk through on different types of web servers such as Python, Apache2, Node.js (Express), Nginx and IIS on how to identify and utilize flaws in misconfiguration in these webservers.

## What I learned

* Response headers can quickly reveal the server technology and sometimes its version.
* Python’s built-in HTTP server may expose every file in its working directory, including hidden files such as `.env`.
* Apache servers should be checked for exposed status pages and directory listings.
* Express applications running in development mode may reveal stack traces, routes, and environment information.
* Nginx can expose similar information through `autoindex` and `stub_status`.
* Important security headers are often missing unless they are configured manually.
* A quick `curl -sI` check is an effective way to review headers during a web server assessment.
* IIS fingerprinting identifies the server version and enabled features, helping determine applicable CVEs and potential attack paths such as WebDAV
* IIS misconfigurations can be exploitable without a CVE, including:

  * Directory listing enabled
  * Unauthenticated WebDAV
  * Exposed 

    `web.config`
  * Publicly accessible 

    `trace.axd`

## Commands, tools, and techniques

*Record useful commands, payloads, filters, or problem-solving techniques.*

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
