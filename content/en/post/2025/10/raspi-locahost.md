+++
title = 'Raspberry Pi 5 Self-Hosting'
date = 2025-10-15T17:51:42+08:00
draft = false
url = "/post/raspiLocalhost/"
tags = ["Raspberry Pi" ,"Self-hosting"]
categories = ["Technology"]
layout = "post"

image = "/images/2025/10/raspi-localhost/raspi.webp"
+++

A few days ago, Each’s server had some issues, which suddenly made me realize — it’s best to host your own stuff.  
And well… once I started, I couldn’t stop. I ended up setting up quite a few things. ~~I’ve dug myself another deep hole again.~~
<!--more-->
***
## Equipment  
I didn’t have a spare computer at home, since I still need my laptop for classes, so heavy modifications were out of the question. That made the **Raspberry Pi** the best choice. I originally thought it would either overheat or fail to keep up, but so far it’s been running surprisingly well.

### ⚠️ Warn: Under-Voltage  
The Raspberry Pi runs on **5V/5A**. In the dorm, the outlets only provide **1A or 2.1A**, and every time I try to launch a Minecraft server, it’s basically a gamble. Because the power supply isn’t strong enough, there’s about a 50% chance the Pi will **shut down** instead of rebooting. This is a pain when I’m trying to start services remotely — if it shuts off, I have to physically go back to the dorm to rescue it. Later, I brought a phone power adapter from home. It’s still not 5V/5A, so the *under-voltage* warning constantly pops up,  
but at least it doesn’t shut down anymore.  

### The Little Pi’s Home  
When I first got the Pi, I debated buying a case.  
The conclusion? *“Why not just build one myself?”*  

So I dug out all my LEGO pieces and found that my **first LEGO set — the pizza shop** — was the best candidate.

![](/images/2025/10/raspi-localhost/Lego-pizza.webp)  

Most of the materials came from that set, and if you look closely, the roofs are exactly the same. After heavily remodeling the pizza shop, it became what you see now. The only downside is poor cooling — even with a heatsink, temperatures still reach **70°C** during use.

### How to Start with Raspberry Pi  
When you first get your Raspberry Pi, you’ll need some **storage** for its OS — I used a microSD card. Then go to [the official website](https://www.raspberrypi.com/software/) and download the image based on your operating system. Installation takes about an hour (~~maybe my SD card just reads and writes too slowly~~).  

After that comes the big problem: **the Pi 5 only supports micro HDMI**. Without that cable, things can get messy. I connected via SSH only, but since it was the first boot, I didn’t know its IP.  
Even after using `ip nei`, I had to test every device on my network one by one. Once connected, I enabled its VNC server through the CLI. If I’d had that HDMI cable, I could’ve saved myself two hours.

***
## What Did I Host?
### AFFiNE
This was the **first server** I hosted — a powerful, open-source note-taking app.  
It supports **Markdown**, **LaTeX**, and even infinite canvases similar to iOS Notes.  
It’s cross-platform with both app and web versions, and it syncs across devices, making it great for studying.

![Affine](/images/2025/10/raspi-localhost/affine.webp)

### Syncthing  
As the name suggests, Syncthing is for **file synchronization**.  
Since installation and setup can be tricky, it’s mainly suitable for personal use. With it, I can sync files to my server instead of uploading them to large platforms — no file size limits or dependency on cloud providers. However, exposing it to the internet without proper security is **dangerous**. It does have a login interface, but I don’t use it — I rely on **tunneling through the local network** instead.

![Syncthing](/images/2025/10/raspi-localhost/sync.webp)  

### Immich  
This is an **open-source photo management service** that looks a lot like Google Photos. Hosting it myself means I don’t need to rely on Google or iCloud, and I can have as much space as my drives allow — no subscriptions, no storage caps.  

However, while setting it up, the **power supply was insufficient**, and the **HDD motor couldn’t spin up**, corrupting the **superblock**. So here’s a lesson: never use your hard drive under under-voltage conditions — it can damage data. You might only recover part of it. You’ll need **at least a 20W power supply** (I’m using 20W now, and so far, so good).

![immich](/images/2025/10/raspi-localhost/immich.webp)

*** 
## Docker  
Docker is an incredibly powerful container tool, but for now, I just *know how to use it* — I’m far from mastering it. All the services above were deployed using Docker.　　

*** 
## Cloudflare Tunnel
This is how I expose my local services to the internet —  
by building a **tunnel** to Cloudflare, writing a routing config locally, and setting up **DNS** through the Cloudflare dashboard. Of course, this only works if you have your **own domain**;  otherwise, you’ll have to stick with local network tunneling.
