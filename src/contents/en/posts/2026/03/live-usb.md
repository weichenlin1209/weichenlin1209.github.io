---
title: USB "Resurrection"
published: 2026-03-11
slug: "live-usb"
tags: ["Linux"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
---

For Linux users, school computers aren't friendly. ~~Linux is free after all~~, but most school computers only have one OS installed — Windows. If you want to use your familiar interface and environment, you have to carry your laptop everywhere. The better computer labs have an outlet by the wall for laptop users, but usually there isn't one.

In a [general education course](https://frdm.cyut.edu.tw/~ckhung/c/ml262g/), the [professor](https://frdm.cyut.edu.tw/~ckhung/g/) shared how he handles this problem. He made a USB drive into a bootable drive with storage capability. As long as there's a computer to plug into, you can "resurrect" and run your own system on someone else's computer. This way, no matter what device you're using, you can use your familiar Linux. ~~Provided they haven't locked the BIOS, that is~~. The day after that class ended, I made one myself.

## Choosing an Operating System  
Being a KDE enthusiast who also needs easy operation, the first thought was [Kubuntu](https://www.windson.cc/posts/kubuntu/). But regular bootable USB is volatile (meaning once powered off, all changed data disappears, returning to the original boot drive state). To make the USB a portable OS, it needs memory functionality. Thinking about how this involves the Linux kernel, I started skipping class. So I went online ~~to gemini~~ to find a suitable system—one preferably designed for Live USB operation or supporting this feature.

Later I ~~gemini~~ found [Kali](https://www.kali.org/), [Tails](https://tails.net/), [Alpine](https://www.alpinelinux.org/), [Slax](https://www.slax.org/)... actually quite a few. Each OS has its own characteristics—feel free to research yourself. I ultimately chose Kali, ~~can be my mobile artillery~~, because it natively supports Live USB. If you want a system designed for Live USB, you can choose Slax.

## Making a Live USB
Since I installed Kali, I'll only teach how to do Kali. First, download their Live USB image from [official site](https://www.kali.org/get-kali/#kali-live). At this point, you'll notice you downloaded a `.torrent` file, because the official site doesn't directly provide the image—you need to get it via P2P. First install aria2:
```bash
sudo apt update && sudo apt install aria2
aria2c ./kali-linux-*-live-amd64.iso.torrent
```

It's normal for downloads to be slow at first. After downloading, you need to verify the image is really from the official source, not faked. Next to the download button there's a `sum` where you can get the official SHA256. We use it to verify file authenticity.
```bash
echo "21e87900f8464b8ba99ed0b4161388f896fc13cf9af976c0bfd692ffe62931c2  kali-linux-2025.4-live-amd64.iso" | sha256sum -c
```

If the terminal shows OK, the file is fine. Next, set it up with storage functionality.

## Creating Persistence
First, boot into the Live system (amd64). Next, partition space to store data.
```bash
lsblk # Find your USB drive, usually /dev/sdX

```

After finding it, partition out the extra space—this determines how much you can store.
```bash
fdisk /dev/sdX
```
Press `n` to create a new `partition`, choose `p`, press `3` (should be 3 if you haven't created anything else). Then keep pressing `enter` until partition is done, finally enter `w`. If you want to understand what this does, check [Bird Brother](https://linux.vbird.org/linux_basic/centos7/0230filesystem.php). After partitioning, go into `fdisk` again, press `t` to set the `type` of the partition you just made to Linux. If the partition table is GPT, it's called Linux filesystem.
```bash
sudo mkfs.ext4 -L persistence /dev/sdX3
```
Next, create a file system in the partition you just carved out, so it can store data—hence the command above. Give it a label called persistence. Next, write some configuration.
```bash
usb=/dev/sdX
sudo mkdir -pv /mnt/my_usb
sudo mount -v ${usb}3 /mnt/my_usb
echo "/ union" | sudo tee /mnt/my_usb/persistence.conf
sudo umount -v ${usb}3
```
Finally, restart
```bash
sudo reboot
```
Select "Live system with USB persistence" to boot—done!

***
## Postscript
I haven't tested this at my school yet—only succeeded on my own computer. I installed termux and nvim in it. These are tools I use often, hoping to have them available on school computers too.