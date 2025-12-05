+++
title = 'Traps When Installing Kubuntu'
date = 2025-12-05T14:30:00+08:00
draft = false
url = "/en/post/kubuntu/"
categories = ["Technology"]
layout = "post"

image = "/images/2025/12/kubuntu/cover.webp"
+++  

## Preface
A few days ago, I suddenly wanted to play some games on Steam. I checked Elden Ring—my hardware wasn’t good enough; checked Where Winds Meet—still not good enough. Maybe Monster Hunter? The base game surely wouldn’t run well, but Monster Hunter Rise might have hope if I could get the dedicated GPU running. **So I decided to install the Nvidia driver**, and after installing it, my computer refused to boot. Nvidia drivers have pretty poor compatibility with Linux. I had to enter recovery mode to retrieve my files and reinstall the system. I chose Kubuntu simply because I like KDE—I think it looks great.

## Bootable USB
First, go to the [official website](https://www.kubuntu.com/download/) and download the version you want.
> Legend says: to master reinstalling an OS, the version number is the number of times you must reinstall it. ~~So don’t pick a number too big.~~

I chose the latest Kubuntu 25.10. Creating a bootable USB is extremely easy for Linux users. And since I borrowed a Windows machine to create the USB this time, I’ll only explain how to do it on Windows.

Simply download a tool called [Rufus](https://rufus.ie/zh_TW/), an open-source bootable USB creator for Windows. Use it to write the ISO you downloaded into the prepared USB stick. A 16GB drive is enough (if you can still find one).

## Reinstallation
Plug in the bootable USB, power on your machine, and enter the BIOS. The key varies by manufacturer, so usually you just spam `del` and `F2`. Once inside, find the `BOOT` tab and change the boot order so the USB boots first and your original system later. If you don’t know which entry is the USB, try them one by one. After that, you’ll enter the live system on the USB and following the prompts should install Kubuntu for you.

## Troubleshooting GPU Issues
If you can reboot and enter the system normally at this point, congratulations! If you reboot and see something like the screenshot below, it means you got hit by the same GPU issue I did.

![stuck](/images/2025/12/kubuntu/stuck.webp)  

You’ll need to get into GRUB first—only then can you enter recovery mode and access your system. Right when the manufacturer logo appears at boot, press `del` once. If successful, you’ll enter GRUB; if not, reboot and try again.

Once inside GRUB, press `e` to edit the boot parameters. On the second-to-last line you’ll find `quiet splash`; append `nomodeset` after it, then press `F10` to boot.

### Add to Blacklist
After entering the system, open a shell and edit the blacklist:

    sudo vim /etc/modprobe.d/blacklist-nvidia.conf

Add Nvidia-related modules to the blacklist to prevent the system from trying to load non-existent drivers and getting stuck:

    blacklist nvidia
    blacklist nvidia-drm
    blacklist nvidia-modset
    blacklist nouveau

### Remove Drivers
    sudo apt remove nvidia*
    sudo apt autoremove
    sudo apt autoclean

Then regenerate initramfs and reboot:

    sudo update-initramfs -u
    sudo reboot

After this series of steps, you should be able to enter your system. Kubuntu really is a huge pitfall.
