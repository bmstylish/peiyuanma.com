---
project: ctf-winter-break-2026
day: 12
week: 2
title: nmap basic port scan
description: "Complete TryHackMe basic port scan room "
status: complete
date: 2026-07-12
draft: false
---
## Challenges completed

Complete TryHackMe basic port scan room 

## What I learned

* TCP Flags 
* TCP Connect Scans 
* TCP SYN Scan 
* UDP Scan

## Commands, tools, and techniques

* TCP Connect Scan - nmap -sT 10.146.169.240
* TCP SYN Scan - sudo nmap -sS 10.146.169.240
* UDP Scan - sudo nmap -sU 10.146.169.240
* \-p- : all ports
* \-p1-1023 : scan ports 1 to 1023
* \-F : 100 most common ports
* \-r : scan ports in consecutive order
* \-T<0-5> : T0 being the slowest and T5 the fastest
* \--max-rate 50 : rate <= 50 packets/sec
* \--min-rate 15 : rate >= 15 packets/sec
* \--min-parallelism 100 : at least 100 probes in parallel

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
