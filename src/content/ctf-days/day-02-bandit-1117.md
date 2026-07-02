---
project: ctf-winter-break-2026
day: 2
week: 1
title: Bandit 11–17
description: Complete Bandit levels 11–17 and solve two or three picoCTF General
  Skills challenges.
status: complete
date: 2026-07-02
draft: false
---
## Challenges completed

Level 11: retrieve password form data.txt where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

`cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'`

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`GROozWPO8QyN0mGrjUkID0WCYkZiQxrN`

</details>

Level 12: retrieve password from data.txt, which is a hex dump of a file that has been repeatedly compressed

`xxd -r data.txt > pswd`

`mv pswd pswd.gz && gunzip pswd.gz`

`mv pswd pswd.bz2 && bunzip2 pswd.bz2`

`tar -xf pswd`

`file pswd`

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`qQYQiHOBPR8zR61qxYqX45quvihF2uzk`

</details>

Level 13: For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level.

From my own computer: `scp -P 2220 bandit13@bandit.labs.overthewire.org /home/bandit13/sshkey.private`

Then load the private key into ~/.ssh

Level 14: The password for the next level can be retrieved by submitting the password of the current level 

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`aaWecNkG4FhxJQxz07uiwzVP6bJiYS65`

</details>

to port 30000 on localhost

`nc localhost 30000`

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`pbLYuZtTg4MgaqfJx8jbA9gKKGqM68A7`

</details>

Level 15: The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL/TLS encryption.

`nc --ssl localhost 30001` 

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`kS0Hf0u5HiXFwKMKFqXvPdOTNGGa0X8V`

</details>

Level 16: The password of the current level toa port on localhost in the range 31000 to 32000. First find out which of these ports have a server listening on them. Then find out which of those speak SSL/TLS and which don’t

`nmap -sV -p 31000-32000 localhost && ncat --ssl localhost <port>`

Level 17: There are 2 files in the homedirectory: passwords.old and passwords.new. The password for the next level is in passwords.new and is the only line that has been changed between passwords.old and passwords.new

`diff passwords.old passwords.new` 

<details>
<summary><code>••••••••••••••••••••••••••••••••</code></summary>

`OQxXZjELndr90zuhOTDYBEomI0SZITXI`

</details>

## What I learned

*Document the main concepts from this session.*

## Commands, tools, and techniques

`tr 'A-Za-z' 'N-ZA-Mn-za-m'` - Selecting all characters, mapping A-M to N-Z and the same for lowercase

`xxd -r` - xxd reads binary and outputs to hex, with -r, it reverses and reads hex and outputs binary

`mv` - can be used to move files from directories as well as renaming files

`gunzip` - decompression tool for gzip

`bunzip2` - decompression tool for bzip2 files 

`tar -xf` - Tape archive ultility tool used to bundle multiple files into one; -x tells it to extract; -f tells it its a file rather than tape drive device

`scp -P` - Allow secure transfer files and directories between computers, runs over SSH, -P specifies the port

`nc` - can be used for port scanning, file transfers, network debugging, or chat and connectivity through p2p

`nmap -sV -p 31000-32000`- network scanning tool, -sV is a service scan, -p specifies the ports scanned 

## Problems and dead ends

Having some trouble with when to use nc and ncat when working with the SSL connections, as sometimes nc would not be able to resolve --ssl

## What I will revisit

* nmap
* nc vs ncat 
* hex dumps
