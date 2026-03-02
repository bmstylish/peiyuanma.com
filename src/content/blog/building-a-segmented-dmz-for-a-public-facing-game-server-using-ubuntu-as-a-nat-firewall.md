---
title: Building A Segmented DMZ for a Public-Facing Game Server Using Ubuntu as
  A NAT Firewall
description: Isolating Windows server to protect the LAN
date: 2026-03-02
tags:
  - network_security
  - network_segmentation
  - homelab
draft: false
---
I've taken a little break after the last blog, due to finishing my summer term and O-week coming up, so not as active as before. Nevertheless, I still had projects on the side, working with my University's Esport club, setting up a Minecraft server from my home network. 

When exposing a service from a home network to the internet, these risks extend beyond just service compromise; we also have to consider lateral movement into the rest of the network. For the MC server (hosted on a windows machine), direct port forwarding would have exposed the Windows host to the public internet. Instead of relying solely on host-level hardening, I implemented a segmented architecture using my own Ubuntu server (as I've hardened it, see previous blog) as an ingress firewall and NAT gateway. My objective is that if the game server is compromised, it does not affect my home network. 

Original Architecture (Insecure): 

Internet -> Router (Port Forward) -> Windows Server (Minecraft) -> Entire LAN (192.168.1.0/24) 

Risks: 

* Windows directly internet-facing
* Potential RCE -> attacker lands inside LAN 
* Lateral movement possible to NAS, router, personal devices 

Target Architecture (Segmented):

Internet -> Router (Port Forward -> Ubuntu) -> Ubuntu Server (NAT + Forwarding) -> Windows Server (Minecraft) 

Security Objectives: 

* Remove direct exposure from Windows 
* Force all ingress through the controlled Ubuntu firewall 
* Restrict Windows to only accept traffic from Ubuntu 
* Block LAN-to-Window access
* Prevent Windows from pivoting into LAN 

### Implementation Details 

#### 1. Router Reconfiguration

Removed all port forwarding to Windows 

Forwarded only required ports to Ubuntu 

#### 2. Ubuntu as a Stateful Forwarding Layer

Enabled IP forwarding: 

`sudo sysctl -w net.ipv4.ip_forward=1`

Added DNAT rules, and similar rules for all other ports: 

`sudo iptables -t nat -A PREROUTING -p tcp --dport 25565 -j DNAT --to-destination WINDOWS_IP:25565`

### 3. Critical Challenge - Return Path Failure

I run into some trouble here as inital connections timed out. 

Investigation showed: 

* DNAT worked 
* FORWARD rules worked 
* But Windows responded directly to client 
* TCP handshake failed 

Root cause: 

Missing SNAT (MASQUERADE), which was fixed: 

`sudo iptables -t nat -A POSTROUTING -d WINOWS_IP -j MASQUERADE`

#### 4. Windows Firewall Segmentation 

Objective: 

* Allow traffic only from Ubuntu 
* Block all other LAN devices 

Initial attempt used: 

`Allow UBUNTU_IP`

`Block 192.168.1.0/24`

Problem: 

Windows Firewall blocks rules that override allow rules when overlapping

The UBUNTU_IP is inside 192.168.1.0/24

Result: connection dropped.

Final solution: 

Split subnet exclusion: 

`Allow UBUNTU_IP `

`Block 192.168.1.0-UBUNTU_IP-1`

`Block UBUNTU_IP+1-192.168.1.254`

### Verification 

* Confirmed via: netstat on Windows showing Established from UBUNTU_IP 
* iptables -t nat -L -v counters increasing 
* External clients connecting successfully 
* LAN devices blocked from direct access 

### Security Outcome

If Minecraft is compromised: 

* Attacker lands on Windows 
* Windows cannot access LAN 
* LAN cannot directly access Windows 
* Router admin unreachable 
* Ubuntu control ingress path 

### Lessons Learned

1. DNAT without SNAT breaks return path ;-;
2. Windows Firewall prioritizes block rules when overlapping 
3. Subnet exclusion requires explicit range splitting 
4. Rules order in GUI does not determine precedence 
5. Always verify with packet counters, not assumptions 
6. Network segmentation is more powerful than host hardening alone. 

### Final Architecture Benefits 

* Reduced attack surface 
* Layered defense 
* Service isolation 
* Real-world NAT + firewall experience 
* Practical threat modeling
