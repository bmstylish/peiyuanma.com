---
title: Server Manager Discord Bot
description: Server Manager Discord Bot
date: 2026-01-18
tags: []
draft: true
---
After finishing the discord bot, I've also discovered through `/status` and `/logs` that one of my services was broken. `boot-alert.service` was failing because when `systemd` started the service during boot. HTTPS requests require: 

* A working network connection
* Correct system time (for TLS certificate validation 
* Installed CA certificates

As I went through the process to make sure that my CA certificates were installed and up to date correctly, I discovered that because the service ran too early, `curl` failed its TLS handshake and exited with an error, which cause `systemd` to mark the service as failed. 

The solution was rather simple, I just have to make the service wait for the network and time synchronization before running.
