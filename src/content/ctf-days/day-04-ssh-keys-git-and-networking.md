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

`git pull ssh://bandit27-git@bandit.labs.overthewire.org:2220/home/bandit27-git/repo`

y8Yd2ssKcpHpud7UvOSOxwamRMzIGIeQ

Level 28: There is a git repository at `ssh://bandit28-git@bandit.labs.overthewire.org/home/bandit28-git/repo` via the port `2220`. The password for the user `bandit28-git` is the same as for the user `bandit28`

The same process as bandit27, however, the passwords are redacted, we can access the log to access the password using:

`git log -p README.md`

Em7eGtqaMySwNFjCpwzzHhLhospOcdt0

Level 29: There is a git repository at `ssh://bandit29-git@bandit.labs.overthewire.org/home/bandit29-git/repo` via the port `2220`. The password for the user `bandit29-git` is the same as for the user `bandit29`

`git clone ssh://bandit29-git@bandit.labs.overthewire.org:2220/home/bandit29-git/repo`

`git branch -a`

`git checkout dev`

jq9Dfg2rXsfYsWMgFuKlXhphjdH7USgX

## What I learned

* `/etc/passwd` shows shell used too

## Commands, tools, and techniques

* `git log -p` - forces line by line different from patches with -p flag
* `git branch -a` - lists all branches with the -a flag
* `git checkout dev` - switches active terminal workspace to branch dev

## Problems and dead ends

I used git pull for bandit 27 and 28, it worked out fine. However, I could find the flag for bandit 29 using git pull as it was hidden in different branches, git pull only combines git fetch and merge, so it does not know other branches exist, which lead to git branch -a coming up as empty

## What I will revisit

* git
