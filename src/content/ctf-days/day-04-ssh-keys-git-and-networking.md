---
project: ctf-winter-break-2026
day: 4
week: 1
title: SSH keys, Git, and networking
description: Complete Bandit levels 25–29, focusing on SSH keys, Git, and networking.
status: complete
date: 2026-07-04
draft: true
---
## Challenges completed

Level 25: Logging in to bandit26 from bandit25 should be fairly easy… The shell for user bandit26 is not /bin/bash, but something else. Find out what it is, how it works and how to break out of it

using `grep bandit26 /etc/passwd`

`bandit26:x:11026:11026:bandit level 26:/home/bandit26:/usr/bin/showtext`

inside `/usr/bin/showtext`

`#!/bin/sh`

`export TERM=linux`

`exec more ~/text.txt`

`exit 0`

Downloading bandit26.ssh key then making the terminal window small, so that more does not finish executing immediately, then pressing v to enter vim 

`:set shell=/bin/bash`

`:shell`

Level 26: contains bandit27-do, used 

`./bandit27-do cat /etc/bandit_pass/bandit27`

to obtain password

STJLJBRRphMxKB392CT4iOr5CbzPU9ER

Level 27: There is a git repository at `ssh://bandit27-git@bandit.labs.overthewire.org/home/bandit27-git/repo` via the port `2220`. The password for the user `bandit27-git` is the same as for the user `bandit27`

y8Yd2ssKcpHpud7UvOSOxwamRMzIGIeQ

## What I learned

* `/etc/passwd` shows shell used too

## Commands, tools, and techniques

*Record useful commands, payloads, filters, or problem-solving techniques.*

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
