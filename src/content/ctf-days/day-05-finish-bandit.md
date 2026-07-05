---
project: ctf-winter-break-2026
day: 5
week: 1
title: Finish Bandit
description: Complete Bandit levels 30–33 and revisit any level solved mainly
  through a walkthrough.
status: complete
date: 2026-07-05
draft: false
---
## Challenges completed

Level 30: There is a git repository at `ssh://bandit30-git@bandit.labs.overthewire.org/home/bandit30-git/repo` via the port `2220`

Cloning repo then checking the tags with: 

`git tag`

82NkymblpGBYmIXG6ZQ8YldBYstHpfUf

Level 31: There is a git repository at `ssh://bandit31-git@bandit.labs.overthewire.org/home/bandit31-git/repo` via the port `2220`

The README.md contained instructions to push a file named `key.txt` with the content `'May I come in?'` into branch master

`echo 'May I come in?' > key.txt`

`git add -f key.txt `

`git commit -m "added key" `

`git push origin master`

pWuj5jBQ6IgV0NXwiH6g1pXRF8S1YvbT

Level 32: After all this `git` stuff, it’s time for another escape. Good luck!

This level forces every character we type into uppercase which do is not executed

however `$0` does not contain any alphabetic characters, so its unchanged, and as it holds the name of the file or process that is running the script, it creates another shell inside the uppercase shell that we can use to find the password

u4P2CyPOwPGLe94RdD9Uo2FxFwvnFswM

## What I learned

* Using positional characters such as `$0` to create interactive shell sessions 

## Commands, tools, and techniques

* `git add -f` - forces git to stage and track a file, override and ignores .gitignore 
* `git commit -m ` - saves staged changes locally into repo history with mandatory message 
* `$0` - references the name of currently running script or shell, which spawns a fresh interactive sub shell when executed directly

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
