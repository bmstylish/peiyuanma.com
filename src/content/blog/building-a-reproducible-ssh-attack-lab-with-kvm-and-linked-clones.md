---
title: Building a Reproducible SSH Attack Lab with KVM and Linked Clones
description: Building a Reproducible SSH Attack Lab with KVM and Linked Clones
date: 2026-01-31
tags: []
draft: true
---
Over the 2 weeks I wanted to build a repeatable, low-overhead home lab to practise and document real security scenarios, starting with a basic but realistic one: SSH brute-force attacks and detection. 

The first lab is very simple and quick, but I will need a good set up for more complicated and long labs in the future. 

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
