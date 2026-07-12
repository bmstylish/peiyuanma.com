---
project: ctf-winter-break-2026
day: 11
week: 2
title: nmap host discovery
description: "Complete TryHackMe nmap host discovery "
status: complete
date: 2026-07-11
draft: false
---
## Challenges completed

Completed nmap host discovery room

## What I learned

* Refreshed knowledge around OSI layers, and what protocols, such as ARP, TCP, UDP, ICMP belongs in what layer 
* Host discoverying using:

  * ARP
  * ICMP 
  * TCP and UDP
* Reverse DNS look up

## Commands, tools, and techniques

* host discovery only: -sn
* ARP Scan - sudo nmap -PR -sn 10.200.6.0/24
* ICMP Echo Scan - sudo nmap -PE -sn 10.200.6.0/24
* ICMP Timestamp Scan - sudo nmap -PP -sn 10.200.6.0/24
* ICMP Address Mask Scan - sudo nmap -PM -sn 10.200.6.0/24
* TCP SYN Ping Scan - sudo nmap -PS22,80,443 -sn 10.200.6.0/30
* TCP ACK Ping Scan - sudo nmap -PA22,80,443 -sn 10.200.6.0/30
* UDP Ping Scan - sudo nmap -PU53,161,162 -sn 10.200.6.0/30
* no DNS look up: -n
* reverse DNS look up: -R 

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

* Subnets
