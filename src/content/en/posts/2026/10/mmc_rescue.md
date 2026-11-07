---
title: How to Rescue a Memory Card with Bad Sectors
description: I damaged a memory card while copying photos and had to get them back!
pubDate: "2026-10-31"
slug: mmc_rescue
category: Technology
tags:
  - Linux
  - memoryCard
cover: /assets/image/2026/10/mmc-rescue/cover.webp
licenseName: CC-BY-SA 4.0
---

A while ago, I accidentally interrupted the process of copying photos off my camera. When I tried copying them again, the card started showing bad sectors!
So I learned how to rescue my own photos using a Linux computer. ~~Come join the Linux community!~~

To follow this tutorial, you'll need a memory card with bad sectors and a Linux computer, preferably Ubuntu or one of its derivatives.

## Identify the Device
Before checking whether this is a software problem, check the side of the memory card for a write-protect switch. If it's on, the card itself may be fine. Once you've ruled out a hardware issue, you can start checking it in software.
```bash
lsblk -f
```
First, check the memory card's filesystem[^1]. If you haven't wiped it, it'll usually be exFAT or FAT32. Also note its device name (e.g. `/dev/sdX`), since you'll need it later.

[^1]: If you don't know what this is, see [this guide by Bird](https://linux.vbird.org/linux_basic/centos7/0230filesystem.php#indexed_allocation).

## Create a Disk Image
Working directly on a damaged device is very risky. If something goes wrong, your data could be lost for good! So before doing anything to the card, make a copy of it.
### Install the Package
```bash
sudo apt update
sudo apt install gddrescue
sudo ddrescue -d -r3 /dev/sdX image.img mapfile.log
```
**ddrescue** is a tool for rescuing storage devices. It ignores the filesystem and copies the data sector by sector. When it encounters a bad sector, it skips it automatically and tries to copy as much of the readable data as possible. The downside is that the image will be as large as the device. I tested this for you: a 128 GB memory card takes eight hours. ~~Sleep soundly after a nerve-racking wait.~~

Here's what the options and arguments mean:
- `-d`: Use direct disk access when reading the input device, in this case `/dev/sdX`.
- `-r3`: Retry three times when an area can't be read.
- `/dev/sdX`: Your drive.
- `image.img`: The output image.
- `mapfile.log`: The log file for the process.

After waiting eight hours, you can finally start trying to rescue your data.

## Attach the Disk Image
You can't attach this the same way you normally would a physical drive. It's not a normal drive; as far as the operating system is concerned, it's just a regular file.
```bash
sudo losetup -fP image.img
```
Once the image is attached, you can check the data and run a repair tool.
```bash
sudo fsck.exfat /dev/loopXXpX
```
But things are never that easy. My repair tool returned an error:
> exfatprogs version : 1.2.9
> Bad fs_name in boot sector, which does not describe a valid exfat filesystem

In other words, the boot sector is damaged, and the filesystem can't be found. The memory card's metadata is damaged, so the tool can't identify the filesystem or figure out how to repair it. That's why it throws an error.

## Try to Rebuild the Filesystem
```bash
sudo testdisk /dev/loopXXpX
```
It'll then ask you to choose some options:
1. Set the partition type to `[None] Non partitioned media`.
2. Go to `[Advanced]`, then use `[Type]` to set the filesystem to its actual type (FAT32, exFAT, ext4, etc.).
3. Go to the `[Boot]` menu.

From here, there are two possible paths. One tries to recover the data from the backup boot sector; if it says `OK`, there's hope. The other tries to rebuild the boot sector through reverse engineering; if it says `OK`, there's hope there too. I was unlucky and neither path worked for me!! So, on to another tool.

## PhotoRec
This software bypasses the filesystem and reads the raw data on the drive. It looks for file signatures and salvages files from the dead drive.
```bash
sudo photorec /dev/loopXXpX
```
Once you've recovered your data, remember to release the loop device.
```bash
sudo losetup -d /dev/loopXX
```
