---
title: Server Manager Discord Bot
description: "Deploying a Discord bot on Ubuntu Server and further bug fixes with the bot "
date: 2026-01-22
tags:
  - linux
  - git
  - discord-bot
draft: false
---
Haven't updated in the last few days due to (1) MST, I was doing revision and preparing to sit my MST. (2) Writing and debugging the code for the discord bot. There is not a lot of issues that I ran into when writing the code for the discord bot, as it is in python and with help of AI, its a rather simple but a tedious task. However, I've had issues uploading the bot to github as I run my discord bot under a dedicated Linux user, so when I tried to commit the project, Git failed with: `fatal: detected dubious ownership in repository at '/srv/server-bot'.`

After research, this happens because newer Git versions block repositories that aren't owned by the current user. This prevents privilege-escalation attacks and is common on servers with multiple users. 

This is an easy fix as I control the server and trust the path, I explicitly marked the repo as safe: 

`git config --global --add safe.directory /srv/server-bot`

After finishing the discord bot, I've also discovered through `/status` and `/logs` that one of my services was broken. `boot-alert.service` was failing because when `systemd` started the service during boot. HTTPS requests require: 

* A working network connection
* Correct system time (for TLS certificate validation 
* Installed CA certificates

As I went through the process to make sure that my CA certificates were installed and up to date correctly, I discovered that because the service ran too early, `curl` failed its TLS handshake and exited with an error, which cause `systemd` to mark the service as failed. 

The solution was rather simple, I just have to make the service wait for the network and time synchronization before running.
