---
project: ctf-winter-break-2026
day: 15
week: 3
title: Content Discovery
description: "Complete THM room Content Discovery "
status: complete
date: 2026-07-15
draft: false
---
## Challenges completed

Completed THM Room Content Discovery

## What I learned

*  Manual discovery through HTTP headers and common files such as 

  * Robots.txt 
  * sitemap.xml 
* OSINT discovery through search engine with google dorking and wappalyzer and using sites such as 

  * Wayback Machine 
  * Git version control 
  * S3 Buckets 
* Automated discovery through Gobuster

## Commands, tools, and techniques

* directory mode brute-forces direcotires and files on a webserver 

  * `gobuster dir -u "http://MACHINE_IP" -w /path/to/wordlist`
* dns mode performs dns lookups using wordlists as subdomain candidates 

  * `gobuster dns -d example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --wildcard`
* vhost doesnt use DNS, uses HTTP requests to target cycling through wordlist as Host: header value 

  * `gobuster vhost -u "http://MACHINE_IP" --domain example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain --exclude-length 250-320`

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
