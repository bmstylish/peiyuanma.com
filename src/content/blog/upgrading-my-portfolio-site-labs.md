---
title: Upgrading My Portfolio Site (Labs)
description: Converted Labs from a static list into dynamic, blog-style write-ups
date: 2026-02-09
category: site-building
tags:
  - astro
  - static sites
  - learning
  - homelab
draft: false
---
I've been busy with uni recently, as we are coming to the end of my summer term, so it's exam season, but I've been consistently working on the labs. 

The write-up for the first lab has been completed, but there is nowhere on the site currently to put it. Therefore, I've updated the labs section so each lab card now links to its own dedicated write-up page. 

### Making Labs Clickable (Like Blog Posts) 

Originally, the labs page was just a static overview. That worked visually, but it didn’t scale. There was nowhere to properly document the process, tooling, and lessons learned for each lab. I restructured the routing so labs now behave like blog posts. With future upgrades incoming that let you actually deploy such a machine and do everything on the site (fingers crossed), I still have the labs domain reserved for that activity, but for now, I've removed that notification. This meant:

* Moving `labs.astro` to `labs/index.astro `
* Adding dynamic routes `(labs[slug].astro)`
* Updating lab cards to behave as links 
* Reused the same layout and styling patterns as blog posts for consistency 

This keeps navigation intuitive while making the labs section much more useful as documentation rather than just a list for now.  

Each lab can now have: 

* A full write-up (objectives, setup, findings, lessons) 
* Its own URL for sharing 
* Incremental updates as the lab evolves 

This turns the labs section into a proper technical record instead of a static showcase. 

### Next Steps:

* Publish lab 1 write-up
* Implement more labs
* Fix discord bot (the same issue with startup-alert)
