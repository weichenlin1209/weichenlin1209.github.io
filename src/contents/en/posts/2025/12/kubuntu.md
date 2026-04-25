---
title: Kubuntu Installation Pitfalls
published: 2025-12-05
tags: [NCHU]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
slug: "kubuntu"
cover: "https://img.windson.cc/images/2025/12/kubuntu/cover.webp"
---

## Preface
A few days ago I suddenly wanted to play Steam games. Elden Ring? Computer specs not enough. The Wuya Sixteen Voices? Still not enough. How about Monster Hunter—original version definitely won't work, but if Rise can somehow get the dedicated GPU running, there might be hope. **Time to install Nvidia drivers!** After that, my computer wouldn't boot anymore, because Nvidia's drivers have terrible Linux compatibility. Could only enter rescue mode to get my data out, then reinstall. Choosing Kubuntu is just because I like using KDE—I think it looks great.

## Bootable USB Drive
First, go to the [official website](https://www.kubuntu.com/download/) and download the version you want.
> Legend has it that to master reinstalling, you need to reinstall as many times as the version number, ~~so don't pick a big number~~

I picked the latest Kubuntu 25.10. For Linux users, making a bootable USB is a piece of cake. Since I borrowed a Windows computer to make the boot drive, I'll only explain how to do it on Windows.

In short, download software called [Rufus](https://rufus.ie/zh_TW/)—it's an open-source bootable USB maker for Windows. Use this to write the ISO file you just downloaded to your prepared boot drive. 16GB should be enough (if you can find one).  

## Reinstall
Plug the bootable USB in, turn on your computer, and open BIOS. Every brand opens it differently, so usually you hammer ```del``` and ```F2``` together. Once inside, go to ```BOOT```, change the boot order so the USB drive is first and the original system is second. If you don't know which is which, just try them all. Next, you'll enter the system on the boot drive, and following the prompts basically completes the installation.

## Graphics Card Troubleshooting  
If you can reboot and smoothly enter the system, congratulations! If you only see something like the image below, then you, like me, got got by the graphics card.

![stuck](https://img.windson.cc/images/2025/12/kubuntu/stuck.webp)  

At this point, you need to find a way into Grub first, so you can enter safe mode, then into the system. The moment you see the computer manufacturer's logo during startup, press del once. If successful, you'll go straight into Grub. If not, reboot.
Once in Grub, press e. There you can modify the boot parameters. On the second-to-last line, you'll see ```quiet splash```—add ```nomodeset``` after it, press ```F10```, and you can enter the system.

### Add to Blacklist
After getting in, open the shell
```shell
sudo vim /etc/modprobe.d/blacklist-nvidia.conf
```
Add Nvidia packages to the blacklist to prevent the system from constantly trying to load them and failing, getting stuck outside.
```text
blacklist nvidia
blacklist nvidia-drm
blacklist nvidia-modset
blacklist nouveau
```
### Remove Drivers
```bash
sudo apt remove nvidia*
sudo apt autoremove
sudo apt autoclean

```
Finally restart the system
```bash
sudo update-initramfs -u
sudo reboot
```
After all this, you can enter the system. Kubuntu really is a huge坑.