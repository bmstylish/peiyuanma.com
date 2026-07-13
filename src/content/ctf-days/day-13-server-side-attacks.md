---
project: ctf-winter-break-2026
day: 13
week: 2
title: "nmap advanced "
description: Complete nmap port scan advanced and post port scans
status: complete
date: 2026-07-13
draft: true
---
## Challenges completed

Complete THM nmap port scan advanced and post port scans

## What I learned

* TCP Null Scan, FIN scan, Xmas Scan 
* TCP Maimon Scan 
* TCP ACK, Window and Custom Scan 
* Spoofing and decoys 
* Fragmented Packets 
* Idle/Zombie scan 

## Commands, tools, and techniques

* Null scan: nmap -sN
* FIN scan: nmap -sF
* Xmas scan: nmap -sX
* ACK scan: nmap -sA
* Maimon scan: nmap -sA
* Window scan: nmap -sW
* Custom TCP scan: nmap --scanflags
* Deocy Scan: nmap -D decoyIP,decoyIP,ME target_IP
* Idle scan: nmap -sl 
* for mac spoofing: --spoof-mac 
* for detailed reasons and conclusions: --reason 

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
