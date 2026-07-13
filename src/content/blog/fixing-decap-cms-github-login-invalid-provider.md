---
title: Fixing Decap CMS GitHub Login Invalid Provider
description: Debugging a broken Decap CMS GitHub OAuth flow, fixing a malformed
  auth endpoint, and cleaning up an unused local OAuth experiment.
date: 2026-07-13
tags:
  - decap cms
  - github
  - cloudflare
  - web security
draft: false
---
This was a small bug that turned into a useful reminder about static sites, OAuth proxies, and unpinned frontend dependencies.

My Decap CMS login had been working fine for months. Then, when I tried to log into the `/admin` page with GitHub, the OAuth flow failed with:

`Invalid provider`

At first, it looked like a GitHub OAuth issue or a Cloudflare Worker problem. The site itself was still loading, and the Decap admin page still opened, but the login flow broke before I could authenticate.

## What Broke

The broken login URL looked like this:

`https://decap-auth.peiyuanma.com/auth?provider=github?provider=github&site_id=peiyuanma.com&scope=repo`

The important part is the duplicated query string:

`auth?provider=github?provider=github`

That is not a valid way to build the URL. The first `?` starts the query string, but the second `?provider=github` gets treated as part of the first provider value instead of as a new parameter.

So instead of the Worker receiving:

`provider=github`

it effectively received a malformed provider value. The Worker rejected it and returned `Invalid provider`.

## Checking the Live Config

The Decap config being served by the site was:

```yaml
backend:
  name: github
  repo: bmstylish/peiyuanma.com
  branch: main
  base_url: https://decap-auth.peiyuanma.com
  auth_endpoint: auth?provider=github
```

That looked reasonable at first because the endpoint needed to tell the OAuth proxy that the provider was GitHub. But Decap CMS was already adding its own query parameters when the login button was clicked.

Because my config already included `?provider=github`, Decap appended another provider parameter and generated the broken URL.

The correct config is:

```yaml
backend:
  name: github
  repo: bmstylish/peiyuanma.com
  branch: main
  base_url: https://decap-auth.peiyuanma.com
  auth_endpoint: auth
```

This lets Decap own the query string.

After the fix, the generated login URL became:

`https://decap-auth.peiyuanma.com/auth?provider=github&site_id=peiyuanma.com&scope=repo`

That endpoint returned a `302` redirect to GitHub, which is the expected first step of the OAuth flow.

## Why It Worked Before

The confusing part was that this setup had worked before.

The bad `auth_endpoint` line was not added recently. It had been in the config since the original Decap setup in January:

`auth_endpoint: auth?provider=github`

Recent content updates were not the cause. The newer CTF journal posts and Decap-written commits changed content, not the auth setup.

The more likely cause was the Decap CMS script itself.

My admin page loaded Decap from an unpinned CDN URL:

```html
<script src="https://unpkg.com/decap-cms@^3/dist/decap-cms.js"></script>
```

That means the site can receive newer Decap 3.x versions without changing my repository. Around the original setup, the current Decap release was older. When I checked during the incident, the CDN resolved to Decap CMS `3.14.1`.

The best explanation is that the old config was always fragile, but the newer Decap behavior exposed it by appending its own `provider`, `site_id`, and `scope` parameters.

## Pulling Before Fixing

Before changing anything, I pulled from GitHub.

This mattered because Decap CMS commits content directly to the repo. My local copy can fall behind the deployed site if I write posts through the CMS and then later work locally.

The safe workflow was:

* Check the local Git status
* Stash the one local auth config edit
* Pull the latest `origin/main`
* Reapply the fix on top of the latest content
* Build the site locally
* Commit and push the single config change

The pull brought in newer CTF journal content. The final commit only changed one line in `public/admin/config.yml`.

## Verifying the Fix

After updating the config, I ran the Astro build:

```bash
npm run build
```

The build completed successfully and generated the site.

Astro still showed duplicate content ID warnings for several existing content files. Those warnings were unrelated to the OAuth issue, so I left them alone instead of mixing cleanup work into the auth fix.

After pushing to GitHub, Cloudflare Pages deployed the new config. I verified the live config by checking:

`https://peiyuanma.com/admin/config.yml`

The live file showed:

```yaml
auth_endpoint: auth
```

Then I tested the corrected OAuth URL directly. It returned a redirect to GitHub instead of `Invalid provider`.

## Cleaning Up an Old OAuth Experiment

During the investigation, I also found an old local folder:

`/home/mpy2005/services/decap-oauth`

This contained a Docker Compose file for `decaporg/oauth-server`. It looked like an earlier attempt to run Decap OAuth as a local Docker service before I moved the final auth setup to a Cloudflare Worker.

I checked whether it was safe to delete:

* No `decap-oauth` Docker container existed
* No Compose project was using the file
* Nothing was listening on port `9999`
* No other files referenced the old service
* The live site was using `https://decap-auth.peiyuanma.com`, not the old local service

Since it was unused and contained an OAuth secret, I deleted the local folder.

This did not affect the live site because production auth goes through the Cloudflare Worker.

## Final Result

The fix was small:

```yaml
auth_endpoint: auth
```

But the incident was useful because it clarified the actual Decap auth flow:

* Decap CMS is loaded in the browser
* Decap builds the OAuth URL and appends the provider parameters
* The Cloudflare Worker handles the secure GitHub token exchange
* The Worker redirects back to Decap after GitHub authentication
* The static site remains backend-free

The main lesson is that config values should match the ownership boundary. Decap owns the OAuth query string, so the config should only provide the endpoint path.

The second lesson is to be careful with CDN version ranges. Loading `decap-cms@^3` is convenient, but it also means behavior can change without a repo commit. Pinning the Decap script to a known version would make future debugging easier.

For now, GitHub login is working again, the unused local OAuth experiment is gone, and the Decap setup is cleaner than before.
