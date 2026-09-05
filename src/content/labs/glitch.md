---
source: tryhackme
title: GLITCH
description: Challenge showcasing a web app and simple privilege escalation. Can
  you find the glitch?
date: 2026-09-05
difficulty: beginner
tags:
  - easy
  - web
  - boot2root
  - node
  - firefox
status: complete
draft: true
---
## Overview

This is a simple challenge in which you need to exploit a vulnerable web application and root the machine. It is beginner oriented, some basic JavaScript knowledge would be helpful, but not mandatory.

Objective:

1. What is your access token?
2. What is the content of user.txt?
3. What is the content of root.txt?

## Initial Enumeration

I started this challenge with a quick nmap service and default script scan. 

![](/uploads/glitch_nmap.png)

Where it revealed a website deployed on port 80 with nginx 1.14.0. Upon visiting the website, there is nothing to see but just a glitched background image. Visiting the page source revealed and API end point, which when called, reveals the access token encoded in base64. We can tell that its encoded in base64 because of the signature == at the end of the encryption. 

![](/uploads/pagesource.png)

Upon discovering an this API endpoint /api/access, I have decided to try some fuzzing on this endpoint to see if anything interesting would show up. 

While that was running, I also did some vulnerability research around nginx 1.14.0, nothing turned out to be too interesting or worthy to look into however.

![](/uploads/glitch_ffuf.png)

The fuzzing results turned out to be good atleast finding another API endpoint items.

## API Investigation

Requesting /api/items returned a JSON object containing several arrays. Using the hint provided to the second question, where it told me to investigate into what other methods was accepted by the API, I went to check what other HTTP methods the endpoint accepted. 

![](/uploads/glitch_burp_access.png)

![](/uploads/glitch_burp_items.png)

Just GET for access, but we see GET and POST for items. POST is particularly interesting here as it means that this endpoint could process user-supplied data. 

Another thing to note from these headers is X-POWERED-BY: Express header, as this tells us that we are interacting with Node.js. This becomes very useful in a second.

Sending a basic POST request to the /api/items endpoint returned the message there_is_a_glitch_in_the_matrix.
