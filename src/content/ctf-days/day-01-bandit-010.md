---
project: ctf-winter-break-2026
day: 1
week: 1
title: Bandit 0–10
description: Complete OverTheWire Bandit levels 0–10, then solve picoCTF General
  Skills challenges until time expires.
status: complete
date: 2026-07-01
draft: true
---
## Challenges completed

Level 0: simply logging into the game using SSH using the credentials provided 

Level 1: retrieving plain-text password from readme

`cat readme` :: 6y2kwnwK6grgvwvpvLaa2T1cpFEKOhNR

Level 2: retrieving plain-text password from file named "-" 

`cat ./-`:: PK8fYLZg2hnHSz83plBL1iEPKdD3QToB

Level 3: retrieving plain-text password from file named "--spaces\ in\ this\filename--" 

`cat ./--spaces\ in\ this\ filename--` :: 7ZZ2LFrykP2zEyvBl4m3clcL7tGYJPME

Level 4: retrieving plain-text password from only human-readable file 

`file ./* | grep "text"` :: 6C7h9GD8M6ai5nr7wo1RonrzFjj9yIrG

Level 5: retrieving plain-text password from a file that is

* human-readable 
* 1033 bytes in size 
* not executable 

`find . -type f -size 1033c ! -executable` :: pXa26xhMWaC2SvDotA4r9EgZkulOeSBW

Level 6: retrieving plain-text password from a file that is

* owned by user bandit7
* owned by group bandit6 
* 33 bytes in size

`find / -user bandit7 -group bandit6 -size 33c 2>/dev/null` :: Bmnnvf82KzQlfxgAI2d1zYbr1u9pr3E3

## What I learned

*Document the main concepts from this session.*

## Commands, tools, and techniques

*`ssh -p` -* specifying what port for SSH to connect to

`cat` - print file on standard output 

`file ./*` - inspects all file and see what type of data they contain

`-type f` - restricts the search to regular files 

`-size 1033c` - matches files for 1033 (c for bytes)

`! -executable` - ! invertes the matches 

`-user bandit7` - matching to user bandit7

`-group bandit6` - matching to group bandit6

`2>/dev/null` - hides permission denied from errors 

## Problems and dead ends

why `su` didn't work, had to reconnect with new user inbetween every level.

## What I will revisit

*List anything that needs more practice or a second attempt.*
