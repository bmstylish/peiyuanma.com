---
title: Building a Reproducible SSH Attack Lab with KVM and Linked Clones
description: Building a Reproducible SSH Attack Lab with KVM and Linked Clones
date: 2026-01-31
tags: []
draft: true
---
Over the 2 weeks I wanted to build a repeatable, low-overhead home lab to practise and document real security scenarios, starting with a basic but realistic one: SSH brute-force attacks and detection. 

While the first lab itself is small, the underlying infrastructure needed to be solid. This lab is meant to be the foudnation for more complex and longer-running labs in the future. 

The key requirement wasn't just "make it work once", but 

* Reset and rerun attacks cleanly
* Storage usage must stay minimal due to limited storage on my server 
* The setup should scale to future labs 
* Everything should be controllable over SSH only as my server is headless 

This leads to the constraints and goals for the Lab

* One clean golden state machine 
* Multiple dispoable lab machines dervied from it 
* Isolated networking 
* No GUI dependency after install 
* Easy teardown and rebuild
* Lab accessed and managed entirely via SSH
* Snapshots must be efficient due to limited space

Which lead to the final design:

* KVM/libvirt as the hypervisor
* One Ubuntu Server (minimal) golden image 
* External qcow2 overlays for each lab VM as linked clones to golden image
* A dedicated isolated libvirt network
* One attacker VM

Although everything looks so easy and clear now when I'm writing this down, getting this final design was a long and difficult journey. 

### Challenge 1: Snapshot confusion

Early on, I created snapshots using the default `virsh snapshot-create-as` command.

It works but it creates internal snapshots which: 

* Live inside the same qcow2 file
* Permantly grow disk usage 
* Get messy over time

This was just a conceptual mistake, but it took a lot of research to identify, although its not a hard fix. 

#### The Fix 

The correct appraoch should've been, which is what has been implemented: 

* Disk-only external snapshots
* No metadata stored in libvirt 
* Each clone writes only its changes 

Which whould result the following layout: 

* golden.qcow2

  * lab-1.qcow2 

    * lab-1.pre-attack.qcow2

### Challenge 2: Networking issues and cleanup

The biggest challange in this lab was getting the network to work. However, the root cause wasn't libvirt not working. It was a flawed inital foundation.

The current working setup is my second attempt. In my first attempt: 

* The golden image itself had a clean snapshot 
* All snapshots were external, but stacked incorrectly 
* Mulitple lab VMs were already derived from that polluted base 
* VM state, disk layering, and network configuration were tightly coupled in ways that were no longer predictable. 

At that point, the system worked, but it was architecturally unsound. Any fix would have been a patch on top of broken assumptions. Thats when I made the call to just restart everything from fresh. Reinstall the OS and rebuild all from scratch. This choice hid a mine that would be the biggest issue in networks.

#### Console access limitation

The key contributor to the networking issues was console access, as none of the VMs had a usable serial console, which meant that `virsh console` was unavailable, so all inital installation and recovery had to be done via VNC. Because of this: 

* A temporary libvirt network was created in my first attempt 
* VNC access depended on that network 
* Once SSH-only access was established, that network was no longer necessary. 

However, because the early setup phase and the later clean architecture phase overlapped, this resulted in leftover libvirt networking definitions that didn't match the final design. 

This is not an issue but a limitation. VNC was used only to perform the inital OS install and enable SSH. After that, all management moved to SSH and the temporary network became irrelevant. The leftover libvirt network definitions were not a functional problem, just an artefact of the early set up phase. 

#### The fix 

The fix was simple and was already mentioned before, rebuild the environment with correct assumptions from the start. Sure, untangling and surgically repairing the existing network state could work but I think that would be more draining and time consuming than just restarting. 

### Lessons Learned

* Design the network before creating the VMs 
* Decide snapshot strategy upfront 
* Write a short 'lab invariant' checklist before touching libvirt 

#### Next Step

* Update Lab page to contain write ups of Labs 
* Implement more labs 
* Fix discord bot (the same issue with startup-alert)
