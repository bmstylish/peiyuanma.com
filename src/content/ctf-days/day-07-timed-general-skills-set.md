---
project: ctf-winter-break-2026
day: 7
week: 1
title: Timed general-skills set
description: Attempt six unseen easy picoCTF challenges under time pressure and
  write up two solutions.
status: complete
date: 2026-07-07
draft: false
---
## Challenges completed

### [FANTASY CTF](https://learn.cylabacademy.org/library/471)

Introduction to the site?

### **[bytemancy 0](https://learn.cylabacademy.org/library/742)**

The challenge wants us to send the ASCII DECIMAL 101 3 times, side-by-side, no space

The hardest thing in this challenge was getting the input into nc as nc takes exactly what we type

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

`python3 -c 'print(chr(101) * 3)' | nc ip port`

</details>

### **[bytemancy 1](https://learn.cylabacademy.org/library/762)**

The challenge wants us to send the ASCII DECIMAL 101 1751 times, side-by-side, no space

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

`python3 -c 'print(chr(101) * 1751)' | nc ip port`

</details>

### **[ping-cmd](https://learn.cylabacademy.org/library/757)**

Can you make the server reveal its secrets? It seems to be able to ping Google DNS, but what happens if you get a little creative with your input

It is running the ping command behind nc. As it is passing input into a shell, we can: 

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

`ping 8.8.8.8; ls`

</details>

### **[Piece by Piece](https://learn.cylabacademy.org/library/740)**

\- The flag is split into multiple parts as a zipped file.

\- Use Linux commands to combine the parts into one file.

\- The zip file is password protected. Use this "supersecret" password to extract the zip file.

\- After unzipping, check the extracted text file for the flag.

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

`cat part_aa part_ab part_ac part_ad part_ae > flag`

`unzip flag`

</details>

### **[SUDO MAKE ME A SANDWICH](https://learn.cylabacademy.org/library/735)**

Can you read the flag? I think you can!

Using sudo -l to check for permissions, then leveraging off permission 

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

`sudo -l`

`sudo emacs flag.txt`

</details>

## What I learned

* stat - permissions of a file in both letters and numbers

## Commands, tools, and techniques

* *sudo -l -* Lets you see what permissions you have 

## Problems and dead ends

* bytemancy 0

  * passing the result of e * 3 to the nc terminal 

## What I will revisit

* Piping into nc
