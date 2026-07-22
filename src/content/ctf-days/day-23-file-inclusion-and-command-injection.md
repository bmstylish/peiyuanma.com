---
project: ctf-winter-break-2026
day: 23
week: 4
title: "File inclusion and command injection"
description: "Complete File Inclusion and Command Injection, then practise distinguishing file-path handling from shell execution."
status: planned
draft: false
---

## TryHackMe rooms

- [ ] [File Inclusion](https://tryhackme.com/room/fileinc)
- [ ] [Command Injection](https://tryhackme.com/room/oscommandinjection)

## Corresponding practice

- [ ] On each room target, identify the input, processing context, and evidence of server-side impact.
- [ ] Build a comparison table for traversal, local file inclusion, remote file inclusion, and command injection.
- [ ] Confirm findings with the least disruptive room-provided test and avoid unnecessary commands.
- [ ] Add one prevention note for canonicalisation, allowlisting, safe APIs, and least privilege.

## Evidence to capture

- [ ] Source/sink or input/impact notes
- [ ] Sanitised request and response evidence
- [ ] A concise remediation checklist

## What I learned

_Explain how the observed behaviour showed file access or command execution rather than a generic error._

## Problems and dead ends

_Record failed encodings, paths, or separators and what the response revealed._

## What I will revisit

_Repeat one validation technique without the room walkthrough._
