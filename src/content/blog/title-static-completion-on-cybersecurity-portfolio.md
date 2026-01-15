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

### Challenge 1: Astroblog Routing 

The first challenge came about when setting up /blog/slug. 

I ran into repeated runtime errors such as:

`TypeError: post.render is not a function`

The issue was a combination of: 

* Using \[...slug].astro to catch all routes unnecessarily
* Treating slug as a string when Astro expected an array
* Accidently losing the actual Content Collection entry

Astro is very strict: \
if route params, content loader, and file structure don't match exactly, it will fail in confusing ways. But once I simplified the route to \[slug].astro and ensured I was passing the actual collection entry, the blog finally rendered correctly.

### Phase 2: Deployment

Deployment went back and forth as I initally was just hosting from the home server, but then I discovered Cloudflare Pages, which gave me: 

* Free static hosting
* Autoimatic HTTPS
* Git-based depolyments
* Zero server maintenance

As mentioned just before, I was hosting from my home server so I still had a Cloudflare Tunnel running. However, I did not close that tunnel for future dynamic services and labs. But a lot of time were put into getting the home server to work with hosting and then having to move everything to Cloudflare pages and getting that to work. Didn't run into any challenges, as most things were straight forward, just time consuming. 

At this point, the site worked, but the workflow didn't.

Every blog post requried: 

1. Writing a .md file 
2. Commiting it 
3. Pushing to Github
4. Triggering a new deployment  

For my own sake I needed to find a way to update the blog easier. Database + Admin UI or Custom Backend are both too much work, so Headless CMS was an easy choice. 

### Challenge 2: Docker Deadend 

My first instinct was to run Decap CMS via Docker, as docker is set up on my server and is not being used. 

This was a mistake. 

Problems encoutered: 

* The Docker image I found was private/inaccessible 
* Even when it ran, it didn't actually solve OAuth 
* Decap CMS isn't meant to run as a traditional backend 

Decap CMS is a frontend tool, not a server. Docker was the wrong mental model ;-; 

### Challenge 3: GitHub OAuth on Cloudflare Pages 

Decap CMS requires Github OAuth, but: 

* Cloudflare Pages can't store secrets like a backend 
* Github OAuth needs a secure token exchange 
* You can't expose secrets to the browser

This meant I needed an OAuth proxy 

### Breakthrough: Cloudflare worker OAuth Proxy

The solution was using a Cloudflare Worker as an OAuth proxy. 

I based the approach on a reference implementation by [sterlingwes](https://github.com/sterlingwes/decap-proxy), but adapted it to my setup: 

* Implemented OAuth endpoints
* Deployed it as a Cloudflare Worker 
* Attached it to a subdomain 
* Wired Decap CMS to use this proxy 

No server. No Ports. No Docker 

### Security Requirement: Admin Access

I enforced authorization inside the Worker: 

* After OAuth, the worker calls `https://api.github.com/user`
* Extracts the Github username 
* Compares it to `ALLOWED_GITHUB_USER`
* If it doesn't match, authentication fails immediately

Everything happens before Decap ever receives a token.

This results: 

* Anyone else is rejected instantly 
* No UI tricks 
* No client-side checks 
* Security enforced at the auth layer 

### Final Architecture

What I ended up with: 

* Frontend: Astro 
* Hosting: Cloudflare Pages 
* Blog CMS: Decap CMS 
* Auth: Cloudflare Worker OAuth proxy
* Security: Github username allowlist
* Future Labs: Cloudflare Tunnel + Docker

## What's Next

With content editing solved, the focus shifts to: 

* Discord bot for server management 
* Writing real technical blog posts
* Expanding labs subdomain
