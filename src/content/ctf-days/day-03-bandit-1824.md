---
project: ctf-winter-break-2026
day: 3
week: 1
title: Bandit 18–24
description: Complete Bandit levels 18–24 and solve two or three picoCTF General
  Skills challenges.
status: complete
date: 2026-07-03
draft: true
---
## Challenges completed

Level 18: The password for the next level is stored in a file readme in the homedirectory. Unfortunately, someone has modified .bashrc to log you out when you log in with SSH

`ssh -p 2220 bandit18@bandit.labs.overthewire.org "cat ~/readme"`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

KpsOfPkcP7i1FlIExk2QEjyt6dw8dxZI

Level 19: To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary

`./bandit20-do cat /etc/bandit_pass/bandit20`

where bandit20-do is a setuid ELF executable that was provided in the homedirectory

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

4pIjcunZ0fK2vmp3IwfG8Vf7VhxD6pOA

Level 20: There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a command line argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21)

`echo "password" | nc -lvnp 53921 &`

`./suconnect 53921`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

bW9kBv5WC3P4yoDyf12LSdGuNz5ka6hY

## What I learned

* You can execute single commands directly via SSH 
*

## Commands, tools, and techniques

`echo "password" | nc -lvnp 53921 &` - takes the password and pipes it into nc, where it has the flag: -l for listen, -v for verbose, -n for numeric where it prevents nc for doing DNS lookups to find host names,  and -p for specifying the ports. the & sends the entire pipeline intothe background 

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

*List anything that needs more practice or a second attempt.*
