---
title: "title: Static Completion on Cybersecurity Portfolio"
description: "The journey to setting up the website "
date: 2026-01-15
tags: []
draft: false
---
# Project Goals

1. Professional and minimal

2. Static First 

3. Esay to update

4. CGNAT-safe

5. Future proof 

### Phase 1: Building with Astro

I built the site using Astro with the help of AI designing the site, keeping everything fully static: 

1. Astro layouts and components

2. Plain CSS with custom properties

3. Content collection for blog posts

4. No SSR, no database, no backend. 

The structure included: 

1. / - home 

2. /about

3. /labs with future subdomain labs.peiyuanma.com

4. blog

5. blog/\[slug]

### Challenge 1: 

The first challenge came about when setting up /blog/slug. 

I ran into repeated runtime errors such as:

`TypeError: post.render is not a function`

The issue was a combination of: 

* Using \[...slug].astro to catch all routes unnecessarily
* Treating slug as a string when Astro expected an array
* Accidently losing the acutal Content Collection entry

Astro is very strict: \
if route params, content loader, and file structure don't match exactly, it will fail in confusing ways. But once I simplified the route to \[slug].astro and ensured I was passing the actual collection entry, the blog finally rendered correctly.
