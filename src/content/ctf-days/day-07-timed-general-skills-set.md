---
project: ctf-winter-break-2026
day: 7
week: 1
title: Timed general-skills set
description: Attempt eight unseen easy picoCTF challenges under time pressure
  and write up two solutions.
status: complete
date: 2026-07-07
draft: true
---
## Challenges completed

### **[bytemancy 1](https://learn.cylabacademy.org/library/762)**

The challenge wants us to send the ASCII DECIMAL 101 1751 times, side-by-side, no space

The hardest thing in this challenge was getting the input into nc as nc takes exactly what we type

`python3 -c 'print(chr(101) * 1751)' | nc foggy-cliff.picoctf.net 57324`

### **[ping-cmd](https://learn.cylabacademy.org/library/757)**

Can you make the server reveal its secrets? It seems to be able to ping Google DNS, but what happens if you get a little creative with your input

It is running the ping command behind nc. As it is passing input into a shell, we can: 

`ping 8.8.8.8; ls`

``

## What I learned

*Document the main concepts from this session.*

## Commands, tools, and techniques

*Record useful commands, payloads, filters, or problem-solving techniques.*

## Problems and dead ends

* bytemancy 1

  * passing the result of e * 1751 to the nc terminal 

## What I will revisit

*List anything that needs more practice or a second attempt.*
