---
project: ctf-winter-break-2026
day: 2
week: 1
title: Bandit 11–17
description: Complete Bandit levels 11–17 and solve two or three picoCTF General
  Skills challenges.
status: in-progress
date: 2026-07-02
draft: true
---
## Challenges completed

Level 11: retrieve password form data.txt where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

`cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'` :: GROozWPO8QyN0mGrjUkID0WCYkZiQxrN

Level 12: retrieve password from data.txt, which is a hex dump of a file that has been repeatedly compressed

`xxd -r data.txt > pswd`

`mv pswd pswd.gz && gunzip pswd.gz`

`mv pswd pswd.bz2 && bunzip2 pswd.bz2`

`tar -xf pswd`

`file pswd`

qQYQiHOBPR8zR61qxYqX45quvihF2uzk

## What I learned

`tr 'A-Za-z' 'N-ZA-Mn-za-m'` - Selecting all characters, mapping A-M to N-Z and the same for lowercase

`xxd -r` - xxd reads binary and outputs to hex, with -r, it reverses and reads hex and outputs binary

`mv` - can be used to move files from directories as well as renaming files

`gunzip` - decompression tool for gzip

`bunzip2` - decompression tool for bzip2 files 

`tar -xf` - Tape archive ultility tool used to bundle multiple files into one; -x tells it to extract; -f tells it its a file rather than tape drive device

## Commands, tools, and techniques

*Record useful commands, payloads, filters, or problem-solving techniques.*

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
