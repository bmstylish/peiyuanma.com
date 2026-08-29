---
title: Turning an Old HP Pavilion into an Immich Home Server
description: How I repurposed an old gaming laptop into an always-on Ubuntu
  Server running Immich, Docker, GPU acceleration and private remote access
  through Tailscale
date: 2026-08-30
category: homelab
tags:
  - immich
  - ubuntu-server
  - docker
  - tailscale
  - self-hosting
  - homelab
  - nvidia
draft: false
---
I recently repurposed an old HP Pavilion gaming laptop as a dedicated home server for Immich. Immich was previously running on my NUC alongside other services, but the laptop offered better storage options and an NVIDIA GPU while allowing the NUC to remain focused on Proxmox and my cybersecurity lab.

## Hardware

The laptop has:

- Intel Core i5-8300H processor
- 8 GB RAM
- NVIDIA GeForce GTX 1050 Ti with 4 GB VRAM
- 128 GB NVMe SSD
- 1 TB internal hard drive
- 2 TB external hard drive containing my Immich library

It is now a stationary, Ethernet-connected server without a desktop interface.

## Storage design

I divided the storage according to workload:

| Storage | Purpose |
|---|---|
| 128 GB NVMe SSD | Ubuntu, Docker and the Immich PostgreSQL database |
| 1 TB internal HDD | Future Jellyfin media, backups and general server storage |
| 2 TB external HDD | Existing Immich photos, videos, thumbnails and database backups |

Keeping PostgreSQL on the SSD provides better database performance, while the larger mechanical drives handle media storage.

The internal 1 TB disk was wiped, formatted as ext4 and mounted permanently at:

```text
/srv/storage
```

The external Immich disk is mounted at:

```text
/mnt/external
```

## Installing the server

I performed a clean installation of Ubuntu Server 26.04 LTS without a graphical interface. The laptop was assigned a static Ethernet address, given the hostname `mpylaptopserver`, and configured for SSH administration.

I also expanded Ubuntu’s LVM volume so the operating system could use the entire 128 GB SSD rather than leaving half of it unallocated.

Docker Engine and the Docker Compose plugin were installed from Docker’s official repository. The Docker service was enabled at boot so containers can restart automatically whenever the laptop is powered on.

## Migrating Immich

The existing Immich installation stored approximately 46 GB of photos and videos on the external drive. The PostgreSQL database and machine-learning cache were stored on the NUC’s system disk.

To avoid losing data during migration, I:

1. Copied the Immich Compose file and environment configuration to the external drive.
2. Stopped the Immich server container to prevent new uploads or database changes.
3. Created and validated a final compressed PostgreSQL backup.
4. Stopped the remaining Immich containers.
5. Kept an additional copy of the original PostgreSQL directory as a rollback option.
6. Safely unmounted the external drive before moving it to the laptop.

On the laptop, I mounted the external drive using its filesystem UUID so it reconnects at the same location after every reboot.

I deployed a clean copy of Immich v3.1.0 under:

```text
/opt/immich
```

The environment configuration points uploaded content to the external drive and PostgreSQL to the NVMe SSD. I then used Immich’s onboarding restoration feature to restore the final database backup.

This recovered the existing users, albums, metadata and media library without having to re-upload the original files.

## NVIDIA GPU acceleration

The laptop’s GTX 1050 Ti is one of the main advantages over the NUC.

I installed Ubuntu’s recommended NVIDIA driver and the NVIDIA Container Toolkit. I confirmed that Docker could access the GPU by running an NVIDIA CUDA container and checking its output with `nvidia-smi`.

The test successfully detected:

```text
NVIDIA GeForce GTX 1050 Ti
4096 MiB GPU memory
NVIDIA driver 580.173.02
```

This makes the GPU available for Immich machine-learning workloads and potentially Jellyfin video transcoding later.

## Private remote access with Tailscale

Instead of forwarding Immich’s port directly through the router, I installed Tailscale on the laptop.

Tailscale Serve provides a private HTTPS reverse proxy to the local Immich service:

```bash
sudo tailscale serve --bg http://127.0.0.1:2283
```

Immich is now accessible through an encrypted HTTPS address from my phone and computers whenever they are connected to my Tailscale network.

The service reports itself as `tailnet only`, meaning Tailscale Funnel is disabled and Immich is not exposed to the public internet.

## Running as an always-on laptop server

Because the laptop will remain powered on overnight, I configured it so that:

- The physical display blanks after five minutes.
- Docker and Tailscale continue running when the display is off.
- Closing the lid does not suspend Ubuntu.
- Sleep, hibernation and hybrid sleep are disabled.
- Docker, Immich and Tailscale start automatically after reboot.

The laptop remains ventilated even though the display is off, as gaming laptops can generate considerable heat under sustained workloads.

## Result

The final setup separates my home-lab responsibilities more clearly:

- The NUC remains responsible for Proxmox, Wazuh and vulnerable lab machines.
- The HP Pavilion handles Immich and future media services.
- Immich’s database benefits from SSD performance.
- The existing 2 TB media library remains intact.
- The GTX 1050 Ti is available to Docker workloads.
- Remote access is private and encrypted through Tailscale.
- No public Immich port forwarding is required.

My next steps are to add Jellyfin, install a Wazuh agent on the laptop, monitor disk health and create a proper second backup of the Immich library. The external drive is currently the active copy of the media, so it should not be treated as a backup by itself.
