---
title: "Deploying Pi-Hole alongside KVM/libvirt in Homelab "
description: "Setting up a DNS sinkhole (Pi-hole) on home server "
date: 2026-04-28
category: homelab
tags:
  - pi-hole
  - DNS
  - homelab
  - network
draft: false
---
## **Goal**

The objective was to deploy a network-wide DNS sinkhole using Pi-hole on an existing Ubuntu server without breaking any existing services.

Key constraints included preserving a working port-forwarded Minecraft server, maintaining a libvirt-based lab environment, avoiding port and service conflicts, and building a foundation for DNS-based monitoring for future SOC-style analysis.

## **Initial Architecture**

Before introducing Pi-hole, the system was structured as follows:

Internet traffic flowed through the router to an Ubuntu server. This server handled multiple roles. It forwarded traffic using iptables to a Windows machine hosting a Minecraft server. It also hosted a libvirt-based virtual lab network on the 192.168.200.0/24 subnet, and ran nginx for web services.

DNS resolution was handled externally via ISP or public resolvers, meaning there was no visibility into DNS activity and no filtering capability.

## Design Decision

Pi-hole was chosen over alternatives such as AdGuard primarily due to its simplicity and transparency.

It provides a straightforward DNS filtering mechanism that is easier to reason about from a networking perspective. It is also widely used in homelabs and security-focused environments, making it more relevant for learning and future SOC integration.

## Major Problems Encountered

### Port 53 Conflict

The initial Pi-hole deployment failed with an error indicating that port 53 was already in use.

The root cause was libvirt’s internal dnsmasq service, which binds to the lab network gateway address (192.168.200.1) on port 53. Even though this was scoped to the virtual network, it still prevented Pi-hole from binding correctly.

The fix was to disable DNS within the libvirt network configuration. This was done by editing the lab-net definition and explicitly disabling DNS, then restarting the network.

The key takeaway here is that DHCP and DNS are separate services, and libvirt quietly runs both unless explicitly configured otherwise.

### Nginx Blocking the Pi-hole UI

After resolving the DNS issue, the Pi-hole web interface was still inaccessible. Requests were being served by nginx instead.

This occurred because nginx was already bound to port 80, preventing Pi-hole’s web server (lighttpd) from binding to the same port.

The fix was to stop and disable nginx temporarily, then reinstall Pi-hole cleanly so it could correctly configure its own web server.

## Final Architecture

After resolving all issues, the system architecture became:

All LAN devices use the router for DHCP, and the router advertises Pi-hole as the DNS server. Pi-hole then forwards queries to an upstream resolver such as 1.1.1.1.

The libvirt lab network remains isolated and can optionally be configured to use Pi-hole for monitoring.

The Minecraft server architecture remains unchanged, with traffic flowing from the internet through the router, into the Ubuntu server, and being forwarded via iptables to the Windows host.

## Lessons Learned 

* Services frequently compete for ports, and conflicts are not always obvious. It is important to check bindings before deploying new services.
* Broken installations are often faster to reset than to repair incrementally.
* Virtualization platforms introduce hidden infrastructure components such as dnsmasq that can interfere with other services.
* Modern Linux DNS is layered and managed, so manual edits to resolv.conf are ineffective.
* Separating responsibilities across services (DNS, routing, web hosting) makes debugging significantly easier.

## Extra Note

DHCP was deliberately removed when fixing the port 53 problem to enforce a deterministic lab environment. By assigning static IPs and automating VM provisioning, each machine becomes predictable, reproducible, and immediately accessible without relying on IP discovery mechanisms. A script was put in place to automate VM creation with static networking.
