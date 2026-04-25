---
title: USB "Resurrection" 2
published: 2026-04-17
slug: "live-usb-2"
tags: ["Linux"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
---
> [Last time](https://www.windson.cc/posts/live-usb/) I made a Persistence Live USB (bootable flash drive with persistent storage), I carefully selected the operating system. Searched for半天 only to find Kali which is easy to set up and played with it a bit, ~~and ended up breaking it~~. So today I made a new one—this time using [Linux Mint](https://www.linuxmint.com). Originally I wanted to use Ubuntu, but its iso is way bigger than Mint, I'd probably fall asleep waiting for the write to complete.

This time the goal is the same: make a flash drive with persistent storage. When making a bootable USB, the first thing everyone thinks of is `dd` command, right? Just write the image with `dd`, then carve out the unused space as storage, seems like that solves the problem?

But after writing with `dd`, the flash drive gets completely overwritten into a read-only file system. Modifying `grub` parameters directly is impossible.

This causes the following errors:
1. `dd`'s **Bit-stream copy** writes a hybrid partition table, causing structural anomalies in unallocated space at the back due to incorrect **GUID Partition Table (GPT)** header positions.
2. Since the file system is read-only, we can't directly modify `grub.cfg` to inject persistence parameters, nor elegantly create partitions (unless you want to manually enter boot parameters every time).

The fastest way to avoid these issues is relying on closed-source GUI tools (like Rufus), but as a terminal enthusiast, I refuse to surrender. So this adds another constraint—I must complete this with CLI. Here's the complete tutorial for a handcrafted Linux Mint persistence USB. Replace `/dev/sdX` in all commands with your actual flash drive identifier (check with `lsblk`).

### 1. Wipe and Rebuild Partition Table (Partitioning)

We need to create two partitions: one **EFI System Partition (ESP)** for the Live ISO files, and one for persistent storage to write changes. Use `parted`:

```bash
# Create GPT partition table
sudo parted /dev/sdX --script mklabel gpt

# Create P1: FAT32 format, allocate 4GB for system files
sudo parted /dev/sdX --script mkpart ESP fat32 1MiB 4GiB
sudo parted /dev/sdX --script set 1 boot on

# Create P2: EXT4 format, allocate remaining space for persistence
sudo parted /dev/sdX --script mkpart PERSISTENCE ext4 4GiB 100%
```

### 2. Format and Label (Formatting and Labeling)
Ubuntu and its derivatives' (like Linux Mint) initramfs scripts find the persistence space by disk label. Modern versions require the label to be precisely named `writable`.

```bash
# Format P1 (boot and system area)
sudo mkfs.vfat -F 32 -n BOOT /dev/sdX1

# Format P2, strictly label as writable
sudo mkfs.ext4 -L writable /dev/sdX2
```

### 3. Extract and Sync System Files (Data Extraction)
Abandon `dd`, use `rsync` to mirror-copy ISO contents to the USB's P1 partition.

```bash
# Create mount points
sudo mkdir -p /mnt/usb /mnt/iso

# Mount P1 and downloaded Mint ISO as Loop Devices
sudo mount /dev/sdX1 /mnt/usb
sudo mount -o loop linuxmint-22.3-cinnamon-64bit.iso /mnt/iso

# Sync files, excluding useless Windows executables
sudo rsync -av --info=progress2 --exclude='wubi.exe' /mnt/iso/ /mnt/usb/
```

### 4. Deploy Bootloader (Bootloader Deployment)
Manually install GRUB to the USB. Before executing this step, wait because Page Cache from the previous step might still be writing data to the USB in the background (especially slow NAND flash)—don't rush.

```bash
sudo grub-install \
    --target=x86_64-efi \
    --efi-directory=/mnt/usb \
    --boot-directory=/mnt/usb/boot \
    --removable \
    /dev/sdX
```
### 5. Inject Persistence Kernel Parameters (Kernel Parameter Injection)

Open `/mnt/usb/boot/grub/grub.cfg` with your preferred editor. Modify boot parameters—add `persistent` at the end of the `linux` line, before `--`. Additionally, to bypass the common Live USB shutdown PID 1 termination error (Kernel Panic freeze issue), strongly recommend adding `noprompt` and `panic=-1` together. If you don't modify the config file, you'll need to press `e` at the boot menu to enter **GRUB** edit mode and manually add these parameters.

```bash
menuentry "Start Linux Mint 22.3 Cinnamon 64-bit (Persistent Mode)" --class linuxmint {
	set gfxpayload=keep
	linux	/casper/vmlinuz  boot=casper uuid=here-should-be-your-id username=mint hostname=mint iso-scan/filename=${iso_path} quiet splash persistent noprompt panic=-1 --
	initrd	/casper/initrd.lz
}
```

### 6. Force Sync and Safe Unmount
Before removing the USB, ensure all dirty pages in memory are physically written to disk.

```bash
# Force data sync
sudo sync
sudo sync

# Unmount mount points
sudo umount /mnt/usb
sudo umount /mnt/iso
```

After completion, you have a flash drive that can "possess" any computer you plug it into.