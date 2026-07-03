---
project: ctf-winter-break-2026
day: 3
week: 1
title: Bandit 18–24
description: Complete Bandit levels 18–24 and solve two or three picoCTF General
  Skills challenges.
status: complete
date: 2026-07-03
draft: false
---
## Challenges completed

Level 18: The password for the next level is stored in a file readme in the homedirectory. Unfortunately, someone has modified .bashrc to log you out when you log in with SSH

`ssh -p 2220 bandit18@bandit.labs.overthewire.org "cat ~/readme"`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

KpsOfPkcP7i1FlIExk2QEjyt6dw8dxZI

</details>

Level 19: To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary

`./bandit20-do cat /etc/bandit_pass/bandit20`

where bandit20-do is a setuid ELF executable that was provided in the homedirectory

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

4pIjcunZ0fK2vmp3IwfG8Vf7VhxD6pOA

</details>

Level 20: There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a command line argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21)

`echo "password" | nc -lvnp 53921 &`

`./suconnect 53921`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

bW9kBv5WC3P4yoDyf12LSdGuNz5ka6hY

</details>

Level 21: A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed

`ls /etc/cron.d`

`cat /etc/cron.d/cronjob_bandit22`

revealed to us the location of the script the cron job was running

`cat /usr/bin/cronjob_bandit22.sh`

showed us that this cronjob was copying the password of bandit22 into a public readable file inside /tmp

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

RYVux2rHEm9tiXHmLFzuR7Vhx6AZQMEz

</details>

Level 22: A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed

`cat /etc/con.d/cronjob_bandit23.sh`

reveals a script:

`#!/bin/bash`

`myname=$(whoami)`

`mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)`

`echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"`

that is run every minute that is copying the password of bandit23 into a folder that named after a modified md5 checksum version of the file, reading that gives the password

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

gKXDTAXnIz3OBxiPjRZ2uqutUlPZrBsw

</details>

Level 23: A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

Repeating the same process as level 22 reveals this script that runs every minute: 

`#!/bin/bash`

`shopt -s nullglob`

`myname=$(whoami)`

`cd /var/spool/"$myname"/foo || exit`

`echo "Executing and deleting all scripts in /var/spool/$myname/foo:"`

`for i in * .*;`

`do`

`if [ "$i" != "." ] && [ "$i" != ".." ];`

`then`

`echo "Handling $i"`

`owner="$(stat --format "%U" "./$i")"`

`if [ "${owner}" = "bandit23" ] && [ -f "$i" ]; then`

`timeout -s 9 60 "./$i"`

`fi`

`rm -rf "./$i"`

`fi`

Which executes all scripts owned by bandit23 in the folder /var/spool/bandit24/foo 

Writing our own script `steal.sh`: 

`#!/bin/bash`

`cat /etc/bandit_pass/bandit24 > /tmp/my_secret_spot/password.txt`

and giving the right permission to run it: 

`chmod 777 /tmp/my_secret_spot`

`chmod 777 /tmp/my_secret_spot/steal.sh`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

hVQMk3lJNsmQ7VF3ubyrNNBom7BOgVXv

</details>

Level 24: A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing. You do not need to create new connections each time

Script used as we do not have to create new connections each time: 

`#!/bin/bash`

`printf "hVQMk3lJNsmQ7VF3ubyrNNBom7BOgVXv %s\n" {0000..9999} | nc localhost 30002 > output.log`

Then grepped output.log with:

`grep -v "Wrong" output.log`

<details><summary><code>••••••••••••••••••••••••••••••••</code></summary>

SoHfqMOEqIX2IYKVciZxvgpR9a2Djx4P

</details>

## What I learned

* You can execute single commands directly via SSH 
* Background processes cannot read your keyboard 

  * When you push a process to the bg using &, it forfeits its connection to stdin. If a background program needs input to function, we must supply it at the moment using a pipe ( | ) or redirect (<)

## Commands, tools, and techniques

* `echo "password" | nc -lvnp 53921 &` - takes the password and pipes it into nc, where it has the flag: -l for listen, -v for verbose, -n for numeric where it prevents nc for doing DNS lookups to find host names,  and -p for specifying the ports. the & sends the entire pipeline intothe background 
* `#!/bin/bash` - the declearation of every bash script 
* `chmod 777` - allowing all permission across owner, group, and public
* `grep -v "Wrong"` - Selects lines that do not match the string "Wrong" 

## Problems and dead ends

*Explain what did not work and why.*

## What I will revisit

* Bash Scripts
